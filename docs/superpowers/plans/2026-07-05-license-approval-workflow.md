# License Approval Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 라이선스 할당을 TEAM_LEAD 요청 → SECURITY_OFFICER 검토 → ADMIN 최종 승인 2단계 결재 흐름으로 교체한다.

**Architecture:** 새 `LicenseRequest` 모델이 결재 상태를 관리하며, APPROVED 시점에만 `LicenseAssignment`를 생성한다. PENDING 상태의 요청도 시트 잠금에 포함시켜 초과 할당을 방지한다.

**Tech Stack:** TypeScript, Prisma (PostgreSQL), Express, Jest

**Spec:** `docs/superpowers/specs/2026-07-05-license-approval-design.md`

---

## File Map

| 파일 | 변경 |
|------|------|
| `prisma/schema.prisma` | `LicenseRequestStatus` enum, `LicenseRequest` 모델, `NotificationType` 값 4개 추가 |
| `src/modules/licenses/license.types.ts` | 신규 타입 5개 추가 |
| `src/schemas/license.schema.ts` | 신규 Zod 스키마 3개 추가 |
| `src/modules/licenses/license.service.ts` | `countActiveSeats()` 수정, `assign()` 제거, 함수 6개 추가 |
| `src/modules/licenses/license.controller.ts` | 핸들러 6개 추가, `assign` 제거 |
| `src/modules/licenses/license.router.ts` | 신규 라우트 추가, `POST /:id/assign` 제거 |
| `src/modules/notifications/notification.service.ts` | 알림 헬퍼 4개 추가 |
| `src/modules/licenses/__tests__/license.service.test.ts` | 신규 describe 블록 추가, assign 테스트 제거 |

---

## Task 1: Prisma 스키마 변경 + 마이그레이션

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: schema.prisma에 `LicenseRequestStatus` enum 추가**

`NotificationType` enum 닫는 `}` 아래 (빈 줄 하나 띄고) 추가:

```prisma
enum LicenseRequestStatus {
  PENDING_SECURITY // SECURITY_OFFICER 검토 대기
  PENDING_ADMIN    // ADMIN 최종 승인 대기
  APPROVED         // 승인 완료 — LicenseAssignment 생성됨
  REJECTED         // 거절 (어느 단계든) 또는 요청자 취소
}
```

- [ ] **Step 2: `NotificationType` enum에 라이선스 알림 값 추가**

`DISALLOWED_APP_DETECTED` 줄 바로 뒤에 추가:

```prisma
  // 라이선스 승인 결재 알림
  LICENSE_PENDING_SECURITY // 요청 생성 시 → SECURITY_OFFICER 전원 (없으면 ADMIN)
  LICENSE_PENDING_ADMIN    // 보안 검토 완료 시 → ADMIN 전원
  LICENSE_APPROVED         // 최종 승인 시 → 요청자
  LICENSE_REJECTED         // 거절/취소 시 → 요청자
```

- [ ] **Step 3: `License` 모델에 relation 추가**

`License` 모델 내 `createdAt` 줄 위에 추가:

```prisma
  requests LicenseRequest[]
```

- [ ] **Step 4: `LicenseRequest` 모델 추가**

`License` 모델 닫는 `}` 바로 뒤에 추가:

```prisma
model LicenseRequest {
  id        String @id @default(cuid())
  licenseId String
  license   License @relation(fields: [licenseId], references: [id], onDelete: Cascade)

  requestedById String
  requestedBy   User   @relation("LicenseRequestRequester", fields: [requestedById], references: [id])

  targetUserId String
  targetUser   User   @relation("LicenseRequestTarget", fields: [targetUserId], references: [id])

  assetId String?
  asset   Asset?  @relation("LicenseRequestAsset", fields: [assetId], references: [id])

  status LicenseRequestStatus @default(PENDING_SECURITY)

  securityReviewedById String?
  securityReviewedBy   User?    @relation("LicenseRequestSecurityReviewer", fields: [securityReviewedById], references: [id])
  securityReviewedAt   DateTime?

  adminApprovedById String?
  adminApprovedBy   User?   @relation("LicenseRequestAdminApprover", fields: [adminApprovedById], references: [id])
  adminApprovedAt   DateTime?

  rejectedById String?
  rejectedBy   User?   @relation("LicenseRequestRejecter", fields: [rejectedById], references: [id])
  rejectedAt   DateTime?
  rejectReason String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([licenseId])
  @@index([targetUserId])
  @@index([status])
  @@map("license_requests")
}
```

- [ ] **Step 5: `Asset` 모델에 relation 추가**

`Asset` 모델 내 기존 relation 목록 끝에 추가:

```prisma
  licenseRequests LicenseRequest[] @relation("LicenseRequestAsset")
```

- [ ] **Step 6: `User` 모델에 relation 4개 추가**

`User` 모델 내 기존 relation 목록 끝에 추가:

```prisma
  licenseRequestsMade         LicenseRequest[] @relation("LicenseRequestRequester")
  licenseRequestsTargeted     LicenseRequest[] @relation("LicenseRequestTarget")
  licenseRequestsSecurityReviewed LicenseRequest[] @relation("LicenseRequestSecurityReviewer")
  licenseRequestsAdminApproved    LicenseRequest[] @relation("LicenseRequestAdminApprover")
  licenseRequestsRejected         LicenseRequest[] @relation("LicenseRequestRejecter")
```

- [ ] **Step 7: 마이그레이션 생성 및 적용**

```bash
cd /Users/juno/asset-erp-backend
npx prisma migrate dev --name add_license_request
```

Expected output:
```
Applying migration `..._add_license_request`
Your database is now in sync with your schema.
```

- [ ] **Step 8: Prisma 클라이언트 재생성 확인**

마이그레이션이 자동으로 `generate`를 실행한다. 확인:

```bash
npx prisma generate
```

- [ ] **Step 9: 커밋**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: add LicenseRequest model and NotificationType values"
```

---

## Task 2: 타입 + Zod 스키마

**Files:**
- Modify: `src/modules/licenses/license.types.ts`
- Modify: `src/schemas/license.schema.ts`

- [ ] **Step 1: `license.types.ts`에 신규 타입 추가**

파일 끝(마지막 `export type { PaginatedResult }` 아래)에 추가:

```typescript
export type LicenseRequestStatus = 'PENDING_SECURITY' | 'PENDING_ADMIN' | 'APPROVED' | 'REJECTED'

export interface LicenseRequestItem {
  id: string
  licenseId: string
  licenseName: string
  requestedById: string
  requestedByName: string
  targetUserId: string
  targetUserName: string
  assetId: string | null
  assetCode: string | null
  status: LicenseRequestStatus
  securityReviewedById: string | null
  securityReviewedByName: string | null
  securityReviewedAt: Date | null
  adminApprovedById: string | null
  adminApprovedByName: string | null
  adminApprovedAt: Date | null
  rejectedById: string | null
  rejectedByName: string | null
  rejectedAt: Date | null
  rejectReason: string | null
  createdAt: Date
}

export interface CreateLicenseRequestInput {
  targetUserId: string
  assetId?: string
}

export interface RejectLicenseRequestInput {
  reason?: string
}

export interface ListLicenseRequestsQuery {
  status?: LicenseRequestStatus
}
```

- [ ] **Step 2: `license.schema.ts`에 신규 Zod 스키마 추가**

파일 끝(마지막 `export type AssignLicenseBody` 아래)에 추가:

```typescript
export const createLicenseRequestSchema = z.object({
  targetUserId: z.string().min(1, '대상 사용자는 필수입니다.'),
  assetId: z.string().optional(),
})

export const rejectLicenseRequestSchema = z.object({
  reason: z.string().max(500).optional(),
})

export const listLicenseRequestsQuerySchema = z.object({
  status: z.enum(['PENDING_SECURITY', 'PENDING_ADMIN', 'APPROVED', 'REJECTED']).optional(),
})

export type CreateLicenseRequestBody = z.infer<typeof createLicenseRequestSchema>
export type RejectLicenseRequestBody = z.infer<typeof rejectLicenseRequestSchema>
export type ListLicenseRequestsQuery = z.infer<typeof listLicenseRequestsQuerySchema>
```

- [ ] **Step 3: 커밋**

```bash
git add src/modules/licenses/license.types.ts src/schemas/license.schema.ts
git commit -m "feat: add LicenseRequest types and Zod schemas"
```

---

## Task 3: `countActiveSeats()` 수정 + `request()` — TDD

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 테스트 파일 mock에 `licenseRequest` 추가**

테스트 파일 상단 `jest.mock('../../../lib/prisma', ...)` 블록 내 `prisma` 객체에 추가:

```typescript
licenseRequest: {
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
},
```

그리고 mock 변수 선언부에 추가:

```typescript
const mockLRFindFirst = prisma.licenseRequest.findFirst as jest.Mock
const mockLRFindUnique = prisma.licenseRequest.findUnique as jest.Mock
const mockLRCount = prisma.licenseRequest.count as jest.Mock
const mockLRCreate = prisma.licenseRequest.create as jest.Mock
const mockLRUpdate = prisma.licenseRequest.update as jest.Mock
```

그리고 notification mock 추가 (파일 상단):

```typescript
jest.mock('../../notifications/notification.service', () => ({
  notificationService: {
    createLicenseFullNotification: jest.fn(),
    createLicenseRequestedNotification: jest.fn(),
    createLicensePendingAdminNotification: jest.fn(),
    createLicenseApprovedNotification: jest.fn(),
    createLicenseRejectedNotification: jest.fn(),
  },
}))
```

- [ ] **Step 2: `countActiveSeats` 관련 실패 테스트 작성**

테스트 파일에 새 describe 블록 추가:

```typescript
describe('licenseService.request', () => {
  const secCtx = { id: 'sec-1', role: 'SECURITY_OFFICER' as const }

  it('PENDING 요청이 있으면 시트 잠금에 포함된다', async () => {
    // seatsTotal=2, 활성 할당 1, PENDING 요청 1 → 잔여 0
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 2 })
    mockLACount.mockResolvedValue(1)       // 활성 할당
    mockLRCount.mockResolvedValue(1)       // PENDING 요청
    mockUserFindUnique.mockResolvedValue({ id: 'user-2', name: 'Kim' })

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/잔여 시트가 없습니다/)
  })

  it('USER 권한이면 403', async () => {
    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, userCtx),
    ).rejects.toThrow(/관리자 권한이 필요합니다/)
  })

  it('존재하지 않는 라이선스면 404', async () => {
    mockLicenseFindUnique.mockResolvedValue(null)
    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/라이선스를 찾을 수 없습니다/)
  })

  it('이미 활성 할당된 사용자면 400', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique.mockResolvedValue({ id: 'user-2', name: 'Kim' })
    // 이미 활성 할당 존재
    mockLAFindFirst.mockResolvedValue({ id: 'a-1', unassignedAt: null })

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/이미 할당된 사용자/)
  })

  it('이미 PENDING 요청이 있는 사용자면 400', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique.mockResolvedValue({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue({ id: 'req-1', status: 'PENDING_SECURITY' })

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/이미 진행 중인 요청/)
  })

  it('정상 요청 생성', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(5)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique.mockResolvedValue({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)
    mockLRCreate.mockResolvedValue({ id: 'req-1' })
    // getRequestById 내부 findUnique 호출용 mock
    mockLRFindUnique.mockResolvedValue({
      id: 'req-1',
      licenseId: 'lic-1',
      status: 'PENDING_SECURITY',
      requestedById: 'mgr-1',
      targetUserId: 'user-2',
      assetId: null,
      securityReviewedById: null,
      securityReviewedAt: null,
      adminApprovedById: null,
      adminApprovedAt: null,
      rejectedById: null,
      rejectedAt: null,
      rejectReason: null,
      createdAt: new Date(),
      license: { name: 'Microsoft Office 365' },
      requestedBy: { name: 'Kim' },
      targetUser: { name: 'Lee' },
      asset: null,
      securityReviewedBy: null,
      adminApprovedBy: null,
      rejectedBy: null,
    })

    const result = await licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx)
    expect(mockLRCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          licenseId: 'lic-1',
          requestedById: 'mgr-1',
          targetUserId: 'user-2',
          status: 'PENDING_SECURITY',
        }),
      }),
    )
    expect(result.id).toBe('req-1')
  })
})
```

- [ ] **Step 3: 테스트 실행 — 실패 확인**

```bash
cd /Users/juno/asset-erp-backend
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `licenseService.request` describe 블록 전체 FAIL (함수 없음)

- [ ] **Step 4: `countActiveSeats()` 수정 및 `request()` 구현**

`license.service.ts` 상단 import에 추가:

```typescript
import { notificationService } from '../notifications/notification.service'
```

`countActiveSeats` 함수를 아래로 교체:

```typescript
const countActiveSeats = async (licenseId: string): Promise<number> => {
  const [assignments, pendingRequests] = await Promise.all([
    prisma.licenseAssignment.count({ where: { licenseId, unassignedAt: null } }),
    prisma.licenseRequest.count({
      where: { licenseId, status: { in: ['PENDING_SECURITY', 'PENDING_ADMIN'] } },
    }),
  ])
  return assignments + pendingRequests
}
```

`remove` 함수 앞에 `request` 함수 추가:

```typescript
const request = async (
  licenseId: string,
  input: CreateLicenseRequestInput,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  requireManager(requester)

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  const active = await countActiveSeats(licenseId)
  if (active >= license.seatsTotal) {
    throw new AppError(400, `잔여 시트가 없습니다. (${active}/${license.seatsTotal})`)
  }

  const user = await prisma.user.findUnique({ where: { id: input.targetUserId } })
  if (!user) throw new AppError(404, '사용자를 찾을 수 없습니다.')

  const existingAssignment = await prisma.licenseAssignment.findFirst({
    where: { licenseId, userId: input.targetUserId, unassignedAt: null },
  })
  if (existingAssignment) throw new AppError(400, '이미 할당된 사용자입니다.')

  const existingRequest = await prisma.licenseRequest.findFirst({
    where: {
      licenseId,
      targetUserId: input.targetUserId,
      status: { in: ['PENDING_SECURITY', 'PENDING_ADMIN'] },
    },
  })
  if (existingRequest) throw new AppError(400, '이미 진행 중인 요청이 있습니다.')

  const created = await prisma.licenseRequest.create({
    data: {
      licenseId,
      requestedById: requester.id,
      targetUserId: input.targetUserId,
      assetId: input.assetId ?? null,
      status: 'PENDING_SECURITY',
    },
  })

  await notificationService.createLicenseRequestedNotification({
    requestId: created.id,
    licenseId,
    licenseName: license.name,
    requestedByName: user.name,
  })

  return getRequestById(created.id)
}
```

그리고 `getRequestById` 헬퍼도 추가 (내부 전용, export 안 함):

```typescript
const getRequestById = async (id: string): Promise<LicenseRequestItem> => {
  const row = await prisma.licenseRequest.findUnique({
    where: { id },
    include: {
      license: { select: { name: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true } },
      asset: { select: { assetCode: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
  })
  if (!row) throw new AppError(404, '요청을 찾을 수 없습니다.')
  return {
    id: row.id,
    licenseId: row.licenseId,
    licenseName: row.license.name,
    requestedById: row.requestedById,
    requestedByName: row.requestedBy.name,
    targetUserId: row.targetUserId,
    targetUserName: row.targetUser.name,
    assetId: row.assetId,
    assetCode: row.asset?.assetCode ?? null,
    status: row.status as LicenseRequestStatus,
    securityReviewedById: row.securityReviewedById,
    securityReviewedByName: row.securityReviewedBy?.name ?? null,
    securityReviewedAt: row.securityReviewedAt,
    adminApprovedById: row.adminApprovedById,
    adminApprovedByName: row.adminApprovedBy?.name ?? null,
    adminApprovedAt: row.adminApprovedAt,
    rejectedById: row.rejectedById,
    rejectedByName: row.rejectedBy?.name ?? null,
    rejectedAt: row.rejectedAt,
    rejectReason: row.rejectReason,
    createdAt: row.createdAt,
  }
}
```

`import` 타입 목록에 추가 (license.types.ts에서):

```typescript
import type {
  CreateLicenseInput,
  UpdateLicenseInput,
  ListLicensesQuery,
  AssignLicenseInput,
  LicenseListItem,
  LicenseDetail,
  RequesterContext,
  PaginatedResult,
  LicenseRequestItem,       // 추가
  LicenseRequestStatus,     // 추가
  CreateLicenseRequestInput, // 추가
  RejectLicenseRequestInput, // 추가
  ListLicenseRequestsQuery,  // 추가
} from './license.types'
```

- [ ] **Step 5: 테스트 실행 — 통과 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `licenseService.request` 5개 PASS, 기존 테스트 모두 유지

- [ ] **Step 6: 커밋**

```bash
git add src/modules/licenses/license.service.ts \
        src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat: add countActiveSeats seat-locking and request()"
```

---

## Task 4: `approveSecurity()` — TDD

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

```typescript
describe('licenseService.approveSecurity', () => {
  const secCtx = { id: 'sec-1', role: 'SECURITY_OFFICER' as const }
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_SECURITY',
    targetUserId: 'user-2',
    requestedById: 'mgr-1',
  }

  it('PENDING_SECURITY 아닌 요청이면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'PENDING_ADMIN' })
    await expect(
      licenseService.approveSecurity('lic-1', 'req-1', secCtx),
    ).rejects.toThrow(/PENDING_SECURITY 상태가 아닙니다/)
  })

  it('USER 권한이면 403', async () => {
    await expect(
      licenseService.approveSecurity('lic-1', 'req-1', userCtx),
    ).rejects.toThrow(/권한이 없습니다/)
  })

  it('licenseId 불일치면 404', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, licenseId: 'other-lic' })
    await expect(
      licenseService.approveSecurity('lic-1', 'req-1', secCtx),
    ).rejects.toThrow(/요청을 찾을 수 없습니다/)
  })

  it('SECURITY_OFFICER 가 1단계 승인', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })   // 조회
      .mockResolvedValueOnce({                      // getRequestById 내부
        ...baseRequest,
        status: 'PENDING_ADMIN',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        securityReviewedBy: { name: 'Security' },
        adminApprovedBy: null,
        rejectedBy: null,
      })
    mockLRUpdate.mockResolvedValue({})

    const result = await licenseService.approveSecurity('lic-1', 'req-1', secCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'PENDING_ADMIN',
          securityReviewedById: 'sec-1',
        }),
      }),
    )
    expect(result.status).toBe('PENDING_ADMIN')
  })

  it('ADMIN 도 1단계 대행 가능', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequest,
        status: 'PENDING_ADMIN',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        securityReviewedBy: { name: 'Admin' },
        adminApprovedBy: null,
        rejectedBy: null,
      })
    mockLRUpdate.mockResolvedValue({})

    const result = await licenseService.approveSecurity('lic-1', 'req-1', adminCtx)
    expect(result.status).toBe('PENDING_ADMIN')
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `approveSecurity` describe 블록 전체 FAIL

- [ ] **Step 3: `approveSecurity()` 구현**

`license.service.ts`에 `request` 함수 뒤에 추가:

```typescript
const approveSecurity = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  if (requester.role !== 'SECURITY_OFFICER' && requester.role !== 'ADMIN') {
    throw new AppError(403, '보안 검토 권한이 없습니다. (SECURITY_OFFICER 또는 ADMIN)')
  }

  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_SECURITY') {
    throw new AppError(400, 'PENDING_SECURITY 상태가 아닙니다.')
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'PENDING_ADMIN',
      securityReviewedById: requester.id,
      securityReviewedAt: new Date(),
    },
  })

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  await notificationService.createLicensePendingAdminNotification({
    requestId,
    licenseId,
    licenseName: license?.name ?? '',
  })

  return getRequestById(requestId)
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `approveSecurity` 5개 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/modules/licenses/license.service.ts \
        src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat: add approveSecurity()"
```

---

## Task 5: `approveAdmin()` — TDD

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

```typescript
describe('licenseService.approveAdmin', () => {
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_ADMIN',
    targetUserId: 'user-2',
    requestedById: 'mgr-1',
    assetId: null,
  }

  it('ADMIN 아니면 403', async () => {
    await expect(
      licenseService.approveAdmin('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/ADMIN 권한이 필요합니다/)
  })

  it('PENDING_ADMIN 아닌 요청이면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'PENDING_SECURITY' })
    await expect(
      licenseService.approveAdmin('lic-1', 'req-1', adminCtx),
    ).rejects.toThrow(/PENDING_ADMIN 상태가 아닙니다/)
  })

  it('승인 시점에 시트 초과면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest })
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 3 })
    mockLACount.mockResolvedValue(3)
    mockLRCount.mockResolvedValue(0)

    await expect(
      licenseService.approveAdmin('lic-1', 'req-1', adminCtx),
    ).rejects.toThrow(/시트가 부족합니다/)
  })

  it('정상 승인 — LicenseAssignment 생성', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequest,
        status: 'APPROVED',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        securityReviewedBy: null,
        adminApprovedBy: { name: 'Admin' },
        rejectedBy: null,
      })
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(5)
    mockLRCount.mockResolvedValue(1) // 현재 이 요청 자체가 PENDING_ADMIN 으로 카운트됨
    mockLRUpdate.mockResolvedValue({})
    mockLACreate.mockResolvedValue({})

    const result = await licenseService.approveAdmin('lic-1', 'req-1', adminCtx)
    expect(mockLACreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ licenseId: 'lic-1', userId: 'user-2' }),
      }),
    )
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'APPROVED' }),
      }),
    )
    expect(result.status).toBe('APPROVED')
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `approveAdmin` describe 블록 전체 FAIL

- [ ] **Step 3: `approveAdmin()` 구현**

`approveSecurity` 함수 뒤에 추가:

```typescript
const approveAdmin = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, 'ADMIN 권한이 필요합니다.')
  }

  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_ADMIN') {
    throw new AppError(400, 'PENDING_ADMIN 상태가 아닙니다.')
  }

  // race condition 방어: 최종 승인 시점에 시트 재확인
  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  // 이 요청 자체는 PENDING_ADMIN → countActiveSeats 에 포함되어 있으므로 seatsTotal 초과 기준은 >
  const active = await countActiveSeats(licenseId)
  if (active > license.seatsTotal) {
    throw new AppError(400, `시트가 부족합니다. 현재 잠금 수(${active}) > 총 시트(${license.seatsTotal})`)
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'APPROVED',
      adminApprovedById: requester.id,
      adminApprovedAt: new Date(),
    },
  })

  await prisma.licenseAssignment.create({
    data: {
      licenseId,
      userId: req.targetUserId,
      assetId: req.assetId ?? null,
    },
  })

  await notificationService.createLicenseApprovedNotification({
    requestId,
    licenseId,
    licenseName: license.name,
    requestedById: req.requestedById,
  })

  return getRequestById(requestId)
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `approveAdmin` 4개 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/modules/licenses/license.service.ts \
        src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat: add approveAdmin() with seat race-condition guard"
```

---

## Task 6: `reject()` + `cancel()` — TDD

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

```typescript
describe('licenseService.reject', () => {
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_SECURITY',
    requestedById: 'mgr-1',
    targetUserId: 'user-2',
  }
  const secCtx = { id: 'sec-1', role: 'SECURITY_OFFICER' as const }

  it('SECURITY_OFFICER 또는 ADMIN 아니면 403', async () => {
    await expect(
      licenseService.reject('lic-1', 'req-1', { reason: '' }, managerCtx),
    ).rejects.toThrow(/권한이 없습니다/)
  })

  it('PENDING 아닌 요청 거절 시도 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'APPROVED' })
    await expect(
      licenseService.reject('lic-1', 'req-1', {}, secCtx),
    ).rejects.toThrow(/이미 처리된 요청/)
  })

  it('정상 거절 — REJECTED 로 변경', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequest,
        status: 'REJECTED',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        securityReviewedBy: null,
        adminApprovedBy: null,
        rejectedBy: { name: 'Security' },
      })
    mockLRUpdate.mockResolvedValue({})

    const result = await licenseService.reject('lic-1', 'req-1', { reason: '정책 위반' }, secCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'REJECTED',
          rejectedById: 'sec-1',
          rejectReason: '정책 위반',
        }),
      }),
    )
    expect(result.status).toBe('REJECTED')
  })
})

describe('licenseService.cancel', () => {
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_SECURITY',
    requestedById: 'mgr-1',
    targetUserId: 'user-2',
  }

  it('요청자 본인만 취소 가능 (또는 ADMIN)', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest })
    const otherMgr = { id: 'other-mgr', role: 'TEAM_LEAD' as const }
    await expect(
      licenseService.cancel('lic-1', 'req-1', otherMgr),
    ).rejects.toThrow(/취소 권한이 없습니다/)
  })

  it('PENDING 아닌 요청 취소 시도 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'APPROVED' })
    await expect(
      licenseService.cancel('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/이미 처리된 요청/)
  })

  it('요청자가 직접 취소', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequest,
        status: 'REJECTED',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        securityReviewedBy: null,
        adminApprovedBy: null,
        rejectedBy: { name: 'Kim' },
      })
    mockLRUpdate.mockResolvedValue({})

    const result = await licenseService.cancel('lic-1', 'req-1', managerCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'REJECTED',
          rejectReason: '요청자 취소',
        }),
      }),
    )
    expect(result.status).toBe('REJECTED')
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `reject` + `cancel` describe 전체 FAIL

- [ ] **Step 3: `reject()` + `cancel()` 구현**

`approveAdmin` 뒤에 추가:

```typescript
const reject = async (
  licenseId: string,
  requestId: string,
  input: RejectLicenseRequestInput,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  if (requester.role !== 'SECURITY_OFFICER' && requester.role !== 'ADMIN') {
    throw new AppError(403, '거절 권한이 없습니다. (SECURITY_OFFICER 또는 ADMIN)')
  }

  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_SECURITY' && req.status !== 'PENDING_ADMIN') {
    throw new AppError(400, '이미 처리된 요청입니다.')
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'REJECTED',
      rejectedById: requester.id,
      rejectedAt: new Date(),
      rejectReason: input.reason ?? null,
    },
  })

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  await notificationService.createLicenseRejectedNotification({
    requestId,
    licenseId,
    licenseName: license?.name ?? '',
    requestedById: req.requestedById,
    rejectReason: input.reason ?? null,
  })

  return getRequestById(requestId)
}

const cancel = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_SECURITY' && req.status !== 'PENDING_ADMIN') {
    throw new AppError(400, '이미 처리된 요청입니다.')
  }
  if (req.requestedById !== requester.id && requester.role !== 'ADMIN') {
    throw new AppError(403, '취소 권한이 없습니다. (요청자 본인 또는 ADMIN)')
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'REJECTED',
      rejectedById: requester.id,
      rejectedAt: new Date(),
      rejectReason: '요청자 취소',
    },
  })

  return getRequestById(requestId)
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: `reject` 3개 + `cancel` 3개 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/modules/licenses/license.service.ts \
        src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat: add reject() and cancel()"
```

---

## Task 7: `listRequests()` — TDD

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

```typescript
describe('licenseService.listRequests', () => {
  const mockLRFindMany = prisma.licenseRequest.findMany as jest.Mock

  it('USER 권한이면 403', async () => {
    await expect(
      licenseService.listRequests('lic-1', {}, userCtx),
    ).rejects.toThrow(/조회 권한이 없습니다/)
  })

  it('status 필터 없이 전체 반환', async () => {
    mockLRFindMany.mockResolvedValue([])
    const result = await licenseService.listRequests('lic-1', {}, adminCtx)
    expect(mockLRFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ licenseId: 'lic-1' }),
      }),
    )
    expect(result).toEqual([])
  })

  it('status 필터 적용', async () => {
    mockLRFindMany.mockResolvedValue([])
    await licenseService.listRequests('lic-1', { status: 'PENDING_SECURITY' }, adminCtx)
    expect(mockLRFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: 'PENDING_SECURITY' }),
      }),
    )
  })
})
```

- [ ] **Step 2: mock에 `findMany` 추가**

테스트 파일 mock 변수 선언부에:

```typescript
const mockLRFindMany = prisma.licenseRequest.findMany as jest.Mock
```

prisma mock 블록에 `licenseRequest` 안에 `findMany: jest.fn()` 추가.

- [ ] **Step 3: 테스트 실행 — 실패 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

- [ ] **Step 4: `listRequests()` 구현**

`cancel` 뒤에 추가:

```typescript
const listRequests = async (
  licenseId: string,
  query: ListLicenseRequestsQuery,
  requester: RequesterContext,
): Promise<LicenseRequestItem[]> => {
  if (requester.role === 'USER') throw new AppError(403, '조회 권한이 없습니다.')

  const rows = await prisma.licenseRequest.findMany({
    where: {
      licenseId,
      ...(query.status ? { status: query.status } : {}),
    },
    include: {
      license: { select: { name: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true } },
      asset: { select: { assetCode: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return rows.map((row) => ({
    id: row.id,
    licenseId: row.licenseId,
    licenseName: row.license.name,
    requestedById: row.requestedById,
    requestedByName: row.requestedBy.name,
    targetUserId: row.targetUserId,
    targetUserName: row.targetUser.name,
    assetId: row.assetId,
    assetCode: row.asset?.assetCode ?? null,
    status: row.status as LicenseRequestStatus,
    securityReviewedById: row.securityReviewedById,
    securityReviewedByName: row.securityReviewedBy?.name ?? null,
    securityReviewedAt: row.securityReviewedAt,
    adminApprovedById: row.adminApprovedById,
    adminApprovedByName: row.adminApprovedBy?.name ?? null,
    adminApprovedAt: row.adminApprovedAt,
    rejectedById: row.rejectedById,
    rejectedByName: row.rejectedBy?.name ?? null,
    rejectedAt: row.rejectedAt,
    rejectReason: row.rejectReason,
    createdAt: row.createdAt,
  }))
}
```

`licenseService` export에 추가:

```typescript
export const licenseService = {
  list, getById, create, update, remove,
  assign, unassign,           // Task 9에서 assign 제거
  request, approveSecurity, approveAdmin, reject, cancel, listRequests,
}
```

- [ ] **Step 5: 테스트 실행 — 통과 확인**

```bash
npx jest license.service --no-coverage 2>&1 | tail -20
```

Expected: 전체 PASS

- [ ] **Step 6: 커밋**

```bash
git add src/modules/licenses/license.service.ts \
        src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat: add listRequests()"
```

---

## Task 8: 알림 헬퍼 추가

**Files:**
- Modify: `src/modules/notifications/notification.service.ts`

- [ ] **Step 1: 알림 헬퍼 4개 추가**

파일 내 `createLicenseFullNotification` 함수 뒤에 추가:

```typescript
// 라이선스 승인 워크플로 알림 (LICENSE_PENDING_SECURITY / LICENSE_PENDING_ADMIN / LICENSE_APPROVED / LICENSE_REJECTED)

export const createLicenseRequestedNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedByName: string
}): Promise<void> => {
  // 활성 SECURITY_OFFICER 없으면 ADMIN 에게
  const recipients = await prisma.user.findMany({
    where: { role: 'SECURITY_OFFICER', isActive: true },
    select: { id: true },
  })
  const targets =
    recipients.length > 0
      ? recipients
      : await prisma.user.findMany({ where: { role: 'ADMIN', isActive: true }, select: { id: true } })

  if (targets.length === 0) return

  await createInAppMany(
    targets.map((t) => ({
      type: 'LICENSE_PENDING_SECURITY' as NotificationType,
      title: '라이선스 할당 요청 — 보안 검토 필요',
      body: `${params.requestedByName}이(가) [${params.licenseName}] 라이선스 할당을 요청했습니다.`,
      metadata: { requestId: params.requestId, licenseId: params.licenseId },
      recipientId: t.id,
    })),
  )
}

export const createLicensePendingAdminNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
}): Promise<void> => {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN', isActive: true },
    select: { id: true },
  })
  if (admins.length === 0) return

  await createInAppMany(
    admins.map((a) => ({
      type: 'LICENSE_PENDING_ADMIN' as NotificationType,
      title: '라이선스 할당 요청 — 최종 승인 필요',
      body: `[${params.licenseName}] 라이선스 할당 요청이 보안 검토를 완료했습니다.`,
      metadata: { requestId: params.requestId, licenseId: params.licenseId },
      recipientId: a.id,
    })),
  )
}

export const createLicenseApprovedNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedById: string
}): Promise<void> => {
  await createInApp({
    type: 'LICENSE_APPROVED' as NotificationType,
    title: '라이선스 할당 승인 완료',
    body: `[${params.licenseName}] 라이선스 할당 요청이 최종 승인되었습니다.`,
    metadata: { requestId: params.requestId, licenseId: params.licenseId },
    recipientId: params.requestedById,
  })
}

export const createLicenseRejectedNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedById: string
  rejectReason: string | null
}): Promise<void> => {
  await createInApp({
    type: 'LICENSE_REJECTED' as NotificationType,
    title: '라이선스 할당 요청 거절',
    body: `[${params.licenseName}] 라이선스 할당 요청이 거절되었습니다.${params.rejectReason ? ` 사유: ${params.rejectReason}` : ''}`,
    metadata: { requestId: params.requestId, licenseId: params.licenseId },
    recipientId: params.requestedById,
  })
}
```

- [ ] **Step 2: `notificationService` export 객체에 추가**

파일 하단 `export const notificationService = { ... }` 블록에 추가:

```typescript
createLicenseRequestedNotification,
createLicensePendingAdminNotification,
createLicenseApprovedNotification,
createLicenseRejectedNotification,
```

- [ ] **Step 3: 타입 체크**

```bash
npx tsc --noEmit 2>&1 | grep notification
```

Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/modules/notifications/notification.service.ts
git commit -m "feat: add license approval notification helpers"
```

---

## Task 9: 컨트롤러 + 라우터 + assign 제거

**Files:**
- Modify: `src/modules/licenses/license.controller.ts`
- Modify: `src/modules/licenses/license.router.ts`
- Modify: `src/modules/licenses/license.service.ts`

- [ ] **Step 1: 컨트롤러에 핸들러 6개 추가**

`license.controller.ts` import에 스키마 추가:

```typescript
import {
  createLicenseSchema,
  updateLicenseSchema,
  listLicensesQuerySchema,
  assignLicenseSchema,
  createLicenseRequestSchema,
  rejectLicenseRequestSchema,
  listLicenseRequestsQuerySchema,
} from '../../schemas/license.schema'
```

`unassign` 핸들러 뒤에 추가:

```typescript
const createRequest = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const body = createLicenseRequestSchema.parse(req.body)
  const result = await licenseService.request(licenseId, body, getRequester(req))
  res.status(201).json(result)
}

const listRequests = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const query = listLicenseRequestsQuerySchema.parse(req.query)
  const result = await licenseService.listRequests(licenseId, query, getRequester(req))
  res.json(result)
}

const approveSecurityHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.approveSecurity(licenseId, requestId, getRequester(req))
  res.json(result)
}

const approveAdminHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.approveAdmin(licenseId, requestId, getRequester(req))
  res.json(result)
}

const rejectHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const body = rejectLicenseRequestSchema.parse(req.body)
  const result = await licenseService.reject(licenseId, requestId, body, getRequester(req))
  res.json(result)
}

const cancelHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.cancel(licenseId, requestId, getRequester(req))
  res.json(result)
}
```

`licenseController` export 업데이트:

```typescript
export const licenseController = {
  list, getById, create, update, remove,
  assign, unassign,
  createRequest, listRequests,
  approveSecurityHandler, approveAdminHandler,
  rejectHandler, cancelHandler,
}
```

- [ ] **Step 2: 라우터 업데이트**

`license.router.ts` 전체를 아래로 교체:

```typescript
import { Router } from 'express'
import { licenseController } from './license.controller'
import { authenticate } from '../../middlewares/authenticate'

const router = Router()

router.use(authenticate)

router.get('/', licenseController.list)
router.get('/:id', licenseController.getById)
router.post('/', licenseController.create)
router.patch('/:id', licenseController.update)
router.delete('/:id', licenseController.remove)

// 직접 회수는 유지 (긴급 회수용)
router.post('/:id/assignments/:assignmentId/unassign', licenseController.unassign)

// 승인 결재 흐름
router.post('/:id/requests', licenseController.createRequest)
router.get('/:id/requests', licenseController.listRequests)
router.post('/:id/requests/:requestId/approve-security', licenseController.approveSecurityHandler)
router.post('/:id/requests/:requestId/approve-admin', licenseController.approveAdminHandler)
router.post('/:id/requests/:requestId/reject', licenseController.rejectHandler)
router.post('/:id/requests/:requestId/cancel', licenseController.cancelHandler)

export { router as licenseRouter }
```

- [ ] **Step 3: `assign()` 제거**

`license.service.ts`에서 `assign` 함수 전체 삭제.

`licenseService` export에서 `assign` 제거:

```typescript
export const licenseService = {
  list, getById, create, update, remove, unassign,
  request, approveSecurity, approveAdmin, reject, cancel, listRequests,
}
```

컨트롤러에서 `assign` 핸들러 삭제, `licenseController` export에서도 제거.

테스트 파일에서 `describe('licenseService.assign', ...)` 블록 전체 삭제.

- [ ] **Step 4: 전체 타입 체크**

```bash
npx tsc --noEmit 2>&1
```

Expected: 에러 없음

- [ ] **Step 5: 전체 테스트 실행**

```bash
npx jest --no-coverage 2>&1 | tail -30
```

Expected: 전체 PASS

- [ ] **Step 6: 커밋**

```bash
git add src/modules/licenses/
git commit -m "feat: wire license approval flow into controller and router, remove assign()"
```

---

## Task 10: 최종 정리 커밋

- [ ] **Step 1: 전체 빌드 확인**

```bash
npx tsc --noEmit && npx jest --no-coverage
```

Expected: 컴파일 에러 0, 테스트 전체 PASS

- [ ] **Step 2: 스펙 문서 커밋**

```bash
git add docs/
git commit -m "docs: add license approval workflow spec and plan"
```

- [ ] **Step 3: 브랜치 상태 확인**

```bash
git log --oneline feat/license-approval-workflow ^main
```

Expected: Task 1~9의 커밋 9개 노출
