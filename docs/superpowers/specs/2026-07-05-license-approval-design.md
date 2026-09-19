# License Approval Workflow Design

**Date:** 2026-07-05  
**Status:** Approved  
**Scope:** `src/modules/licenses/`

---

## 배경 및 목표

현재 라이선스 할당은 ADMIN/TEAM_LEAD가 즉시 실행(`assign()`). 비용·보안 통제를 위해 SECURITY_OFFICER 검토 → ADMIN 최종 승인 2단계 결재 흐름을 추가한다.

---

## 승인 흐름

```
TEAM_LEAD  →  [PENDING_SECURITY]  →  [PENDING_ADMIN]  →  [APPROVED]
                     ↓ reject              ↓ reject
                 [REJECTED]            [REJECTED]
```

- SECURITY_OFFICER가 없으면 ADMIN이 1단계 대행 가능
- 어느 단계에서든 SECURITY_OFFICER 또는 ADMIN이 거절 가능
- 요청자(requestedById) 본인 또는 ADMIN이 PENDING 중 취소 가능

---

## 데이터 모델

### 새 Enum: `LicenseRequestStatus`

```prisma
enum LicenseRequestStatus {
  PENDING_SECURITY  // SECURITY_OFFICER 검토 대기
  PENDING_ADMIN     // ADMIN 최종 승인 대기
  APPROVED          // 승인 완료 — LicenseAssignment 생성됨
  REJECTED          // 거절 (어느 단계든)
}
```

### 새 모델: `LicenseRequest`

```prisma
model LicenseRequest {
  id          String               @id @default(cuid())
  licenseId   String
  license     License              @relation(fields: [licenseId], references: [id], onDelete: Cascade)

  requestedById  String
  requestedBy    User   @relation("LicenseRequestRequester", fields: [requestedById], references: [id])

  targetUserId   String
  targetUser     User   @relation("LicenseRequestTarget", fields: [targetUserId], references: [id])

  assetId     String?
  asset       Asset?  @relation("LicenseRequestAsset", fields: [assetId], references: [id])

  status      LicenseRequestStatus @default(PENDING_SECURITY)

  securityReviewedById  String?
  securityReviewedBy    User?    @relation("LicenseRequestSecurityReviewer", fields: [securityReviewedById], references: [id])
  securityReviewedAt    DateTime?

  adminApprovedById  String?
  adminApprovedBy    User?   @relation("LicenseRequestAdminApprover", fields: [adminApprovedById], references: [id])
  adminApprovedAt    DateTime?

  rejectedById  String?
  rejectedBy    User?   @relation("LicenseRequestRejecter", fields: [rejectedById], references: [id])
  rejectedAt    DateTime?
  rejectReason  String?

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([licenseId])
  @@index([targetUserId])
  @@index([status])
  @@map("license_requests")
}
```

### `License` 모델 변경

`requests LicenseRequest[]` relation 추가.

### `countActiveSeats()` 변경

```ts
// 기존: LicenseAssignment(unassignedAt: null) 카운트
// 변경: + LicenseRequest(PENDING_SECURITY | PENDING_ADMIN) 합산
const countActiveSeats = async (licenseId: string) => {
  const [assignments, pendingRequests] = await Promise.all([
    prisma.licenseAssignment.count({ where: { licenseId, unassignedAt: null } }),
    prisma.licenseRequest.count({
      where: { licenseId, status: { in: ['PENDING_SECURITY', 'PENDING_ADMIN'] } },
    }),
  ])
  return assignments + pendingRequests
}
```

---

## 서비스 레이어

### 권한 규칙

| 액션 | 허용 역할 |
|------|-----------|
| `request()` | ADMIN, TEAM_LEAD |
| `approveSecurity()` | SECURITY_OFFICER, ADMIN |
| `approveAdmin()` | ADMIN |
| `reject()` | SECURITY_OFFICER, ADMIN |
| `cancel()` | 요청자 본인, ADMIN |
| `listRequests()` | ADMIN, TEAM_LEAD, SECURITY_OFFICER |

### `request(licenseId, input, requester)`

1. TEAM_LEAD 또는 ADMIN 권한 확인
2. 라이선스 존재 확인
3. `countActiveSeats()` ≥ `seatsTotal` 이면 400
4. `targetUserId` 기준 이미 활성 할당(`unassignedAt: null`) 또는 PENDING 요청 있으면 400
5. `LicenseRequest` 생성 (status: PENDING_SECURITY)
6. 알림: 활성 SECURITY_OFFICER 전원, 없으면 ADMIN 전원

### `approveSecurity(licenseId, requestId, requester)`

1. SECURITY_OFFICER 또는 ADMIN 확인
2. request 존재 및 `licenseId` 일치 확인
3. status === PENDING_SECURITY 아니면 400
4. status → PENDING_ADMIN, `securityReviewedById/At` 기록
5. 알림: ADMIN 전원

### `approveAdmin(licenseId, requestId, requester)`

1. ADMIN 확인
2. status === PENDING_ADMIN 아니면 400
3. `countActiveSeats()` 재확인 (race condition 방어) — 초과 시 400
4. `LicenseAssignment` 생성
5. status → APPROVED, `adminApprovedById/At` 기록
6. 알림: 요청자(`requestedById`)

### `reject(licenseId, requestId, reason, requester)`

1. SECURITY_OFFICER 또는 ADMIN 확인
2. status가 PENDING_SECURITY 또는 PENDING_ADMIN 아니면 400
3. status → REJECTED, `rejectedById/At/Reason` 기록
4. 알림: 요청자

### `cancel(licenseId, requestId, requester)`

1. 요청자 본인 또는 ADMIN 확인
2. status가 PENDING_SECURITY 또는 PENDING_ADMIN 아니면 400
3. status → REJECTED (rejectReason: '요청자 취소'), `rejectedById/At` 기록

### `listRequests(licenseId, query, requester)`

- 필터: `status?`
- 정렬: `createdAt desc`
- 반환: 요청 목록 (요청자, 대상 사용자, 단계별 처리자 포함)

---

## 라우터 변경

```
# 신규
POST   /licenses/:id/requests                         → request()
GET    /licenses/:id/requests                         → listRequests()
POST   /licenses/:id/requests/:rid/approve-security   → approveSecurity()
POST   /licenses/:id/requests/:rid/approve-admin      → approveAdmin()
POST   /licenses/:id/requests/:rid/reject             → reject()
POST   /licenses/:id/requests/:rid/cancel             → cancel()

# 제거
POST   /licenses/:id/assign
POST   /licenses/:id/assignments/:assignmentId/unassign  ← 유지 (직접 회수는 남김)
```

> `assign()` 직접 호출은 제거. ADMIN도 request → approve 흐름을 따른다.

---

## 알림 매핑

| 이벤트 | 수신자 | 타입 |
|--------|--------|------|
| request 생성 | SECURITY_OFFICER 전원 (없으면 ADMIN) | `LICENSE_PENDING_SECURITY` |
| approveSecurity | ADMIN 전원 | `LICENSE_PENDING_ADMIN` |
| approveAdmin | 요청자 | `LICENSE_APPROVED` |
| reject | 요청자 | `LICENSE_REJECTED` |

`NotificationType` enum에 4개 값 추가 필요.

---

## 엣지 케이스

- **시트 race condition**: `approveAdmin()` 시점에 `countActiveSeats()` 재확인. 이미 꽉 찼으면 400 반환 (요청은 PENDING_ADMIN 유지 — 관리자가 수동 판단).
- **SECURITY_OFFICER 부재**: `request()` 생성 시 활성 SECURITY_OFFICER 조회, 없으면 ADMIN에게 알림. ADMIN이 `approveSecurity()` 직접 처리.
- **재신청**: REJECTED 상태에서 새 `LicenseRequest` 생성 가능.
- **재할당**: `unassignedAt`이 있는 사용자에게 재요청 가능.

---

## 파일 영향 범위

| 파일 | 변경 유형 |
|------|-----------|
| `prisma/schema.prisma` | `LicenseRequestStatus` enum, `LicenseRequest` 모델 추가 |
| `prisma/migrations/...` | 신규 마이그레이션 |
| `src/modules/licenses/license.service.ts` | `assign()` 제거, 신규 함수 5개 추가, `countActiveSeats()` 수정 |
| `src/modules/licenses/license.controller.ts` | 신규 라우트 핸들러 |
| `src/modules/licenses/license.router.ts` | 라우트 추가/제거 |
| `src/modules/licenses/license.types.ts` | 신규 input/output 타입 |
| `src/schemas/license.schema.ts` | Zod 스키마 추가 |
| `src/modules/notifications/notification.service.ts` | 알림 타입 4개 추가 |
| `prisma/schema.prisma` (NotificationType) | enum 값 4개 추가 |
