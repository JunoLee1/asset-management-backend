# 라이선스 승인 대기열 가중치 기반 우선순위 + 자동 배정 — 설계

## 배경

[2026-09-23-license-priority-tier-design.md](./2026-09-23-license-priority-tier-design.md)에서
`License.coreDepartmentIds` 기반의 이진(CORE/DEFAULT) 우선순위 티어를 도입했다. 하지만
그 설계는 명시적으로 "정렬은 보조 표시일 뿐, 실제 승인은 관리자가 계속 수동으로 판단"으로
스코프를 한정했고, 구현 과정에서 그 정렬 자체도 빠진 채 `priorityTier` 필드만 계산되어
API 응답에 붙는 상태로 남았다 (`listRequests()`가 `createdAt desc` 순서를 그대로 반환).

또한 `docs/TROUBLESHOOTING.md` #9는 "라이선스 대여시 직무와 연관없는 라이선스 대여가 되어서
다른 직원들 불편함 증가"라는 실사용 문제를 기록하며, 해결책으로 "우선순위를 가중치로 계산한
다음 잔여석 대기 항목 추가 후 큐로 잔여석 수만큼(가치 높은 순으로) POP()"하는 자동 배정을
제시했다. 이번 설계는 이 요구를 실제로 구현한다.

## 문제 정의

1. 부서 일치 여부만으로는 우선순위를 표현하기 부족하다 — 같은 CORE 부서 안에서도, 또는
   CORE가 아니더라도 실제 업무 직종상 반드시 필요한 사람과 오래 기다린 사람을 구분할 방법이 없다.
2. `priorityTier`가 계산은 되지만 실제 정렬/배정에 쓰이지 않아, 관리자가 대기열을 봐도
   누구를 먼저 승인해야 하는지 여전히 판단 근거가 없다.
3. 현재 `request()`는 좌석 수(`seatsTotal`)를 초과하는 순간 신규 요청 생성 자체를 거절한다
   ([license.service.ts:346-349](../../../src/modules/licenses/license.service.ts#L346-L349),
   [:401-403](../../../src/modules/licenses/license.service.ts#L401-L403)). 즉 "좌석보다 많은
   요청이 대기"하는 상황 자체가 존재하지 않아, TROUBLESHOOTING #9가 말하는 "5건 요청에
   잔여석 3" 같은 큐잉이 애초에 불가능하다.

## 범위

**포함**
- 라이선스별 "핵심 직무" 지정 (`License.coreJobTypes`) — `coreDepartmentIds`와 동일 패턴
- 부서 일치 + 역할 일치 + 대기시간을 합산한 가중치 점수(`priorityScore`) 계산
- `request()` 생성 시점의 좌석초과 즉시 차단 제거 — 승인 파이프라인(팀장→부서장→보안)은
  좌석 수와 무관하게 진행
- 관리자가 수동으로 트리거하는 일괄 자동배정(`bulkAssign`) — `PENDING_ADMIN` 대기열을
  `priorityScore` 순으로 정렬해 잔여석만큼 POP, 자동 승인
- 기존 개별 승인(`approveAdmin`)은 그대로 유지 (잔여석 있을 때 건별 승인도 가능)

**제외 (이번 스코프 아님)**
- 프론트엔드 (이전 스펙과 동일한 이유로 계속 제외)
- 별도 `WAITING` 상태 신설이나 별도 대기열 테이블 — `PENDING_ADMIN`을 대기열로 재사용하는
  것으로 충분하다고 판단 (아래 "고려한 대안" 참조)
- 가중치 파라미터(100/50/1)를 관리자가 UI에서 조정하는 기능 — 지금은 코드 상수로 고정
- 프로젝트/계약 기반, 사용 빈도 기반 등 3순위 이후 가중치 — 이전 스펙과 동일하게 근거 데이터
  없어 제외

**고려한 대안 (기각)**
- **별도 `WAITING` enum 상태 신설**: `PENDING_ADMIN`을 "좌석 있고 최종 승인만 남음"과
  "좌석 없어 대기"로 명확히 나눌 수 있지만, enum 마이그레이션과 상태 전이 로직이 늘어나
  지금 스코프 대비 과함.
- **별도 `LicenseWaitlist` 테이블**: 좌석 없는 요청은 애초에 승인 파이프라인을 시작하지 않아
  관리자 검토 낭비를 막을 수 있지만, 가장 큰 변경. 요청량이 실제로 많아져 이게 문제가 될 때
  재검토.

## 설계

### 1. 데이터 모델

```prisma
enum JobType {
  DEVELOPER
  DESIGNER
  SALES
  FINANCE
  HR
  SECURITY
  OPERATIONS
}

model User {
  // ...기존 필드
  jobType JobType? // nullable — 미설정 시 직종 가중치 0점으로 처리
}

model License {
  // ...기존 필드
  coreDepartmentIds String[]   @default([])
  coreJobTypes      JobType[]  @default([])
}
```

- `User.jobType`: nullable. 기존 사용자는 null로 마이그레이션 — null이면 직종 가중치 +0.
  `coreDepartmentIds`의 빈 배열 → 전원 DEFAULT 처리와 동일한 논리.
- `License.coreJobTypes`: `coreDepartmentIds`와 동일한 이유로 `@default([])`라 additive
  마이그레이션. 빈 배열이면 직종 가중치 해당 없음(전원 +0).
- 신규 직종 추가 시 enum 마이그레이션 필요 — 자유 문자열 대신 enum을 택한 이유는 오타/대소문자
  불일치로 인한 매칭 실패 방지.

### 2. 우선순위 점수 계산

**기준: `coreDepartmentIds`와 동일하게 신청자가 아니라 대상자(`targetUser`)의 부서/직종.**

```
priorityScore =
  (targetUser.team?.departmentId ∈ license.coreDepartmentIds ? 100 : 0)
  + (targetUser.jobType ∈ license.coreJobTypes ? 50 : 0)
  + floor((now - createdAt) / 1일) × 1
```

- 대기일수는 상한 없음(오래 기다릴수록 계속 증가)
- 동점일 경우 `createdAt` 오름차순(먼저 요청한 쪽이 우선)으로 정렬
- 가중치 상수(100 / 50 / 1)는 서비스 파일 상단에 named constant로 선언 — 매직넘버 금지
- 기존 `priorityTier`('CORE' | 'DEFAULT')는 그대로 유지 — 부서 일치 여부만 반영하는 단순
  UI 배지. `priorityScore`가 실제 정렬/배정에 쓰이는 필드.

### 3. `request()` 변경 — 좌석초과 차단 제거

`src/modules/licenses/license.service.ts`

- [346-349행](../../../src/modules/licenses/license.service.ts#L346-L349)의 사전 체크와
  [401-403행](../../../src/modules/licenses/license.service.ts#L401-L403)의 트랜잭션 내
  재확인 체크를 제거 — 요청 생성은 좌석 수와 무관하게 항상 허용
- `initialStatus` 결정 로직(팀장/부서장 스킵 조건)은 변경 없음 — 좌석 스캐어시티와 무관한
  "누가 승인 권한이 있는가"의 문제이므로 그대로 유지
- `countActiveSeats()`는 삭제하지 않음 — `PENDING_ADMIN` 단계의 실제 잔여석 계산(§4)에는
  여전히 필요. 다만 그 집계 방식이 바뀐다: 지금은 활성 할당 + 모든 pending 상태(4단계 전부)를
  합산했지만, 이제 `bulkAssign`/`approveAdmin`이 참조하는 "잔여석"은 **활성 할당(APPROVED,
  `unassignedAt: null`) 수만 seatsTotal에서 뺀 값**이다 — `PENDING_ADMIN` 자체는 더 이상
  "이미 예약된 좌석"이 아니라 "배정 후보"이기 때문.
- 이미 승인된 사용자 중복 방지(366-369행), 진행 중 요청 중복 방지(371-378행) 로직은 그대로
  유지
- **`approveAdmin()` 비교 연산자 변경 필요**: 현재 `approveAdmin()`의 트랜잭션 내 체크는
  `activeInTx > seatsTotal` (`>`)이다. 이는 PENDING_ADMIN 요청 자체가 `countActiveSeats()`에
  포함되어 있어서 "이미 1 예약됨"으로 취급되기 때문. `countActiveSeats()`가 활성 할당만 세도록
  바뀌면 이 요청은 더 이상 카운트에 포함되지 않으므로, 체크를 **`activeInTx >= seatsTotal`
  (`>=`)으로 변경해야** 좌석 초과가 막힌다. 변경하지 않으면 마지막 잔여석이 동시 승인으로
  초과 배정될 수 있다.

### 4. 신규 `bulkAssign(licenseId, requester)`

```
1. requester.role !== 'ADMIN' → 403
2. 트랜잭션 시작, lockLicenseForUpdate (기존 함수 재사용)
3. availableSeats = license.seatsTotal - 활성 할당 수(APPROVED, unassignedAt: null)
4. availableSeats <= 0 이면 빈 결과 반환 (에러 아님 — "배정할 좌석 없음"은 정상 상태)
5. PENDING_ADMIN 상태의 모든 요청 조회 (license.coreJobTypes, targetUser.team.departmentId, targetUser.jobType 포함)
6. 각 요청에 priorityScore 계산, score desc / tie는 createdAt asc로 정렬
7. 상위 availableSeats개를 순서대로:
   - status: 'APPROVED', adminApprovedById, adminApprovedAt 갱신
   - LicenseAssignment 생성
8. 트랜잭션 커밋
9. 배정된 건마다 기존 createLicenseApprovedNotification 발송 (트랜잭션 밖, 기존 approveAdmin과
   동일 패턴)
10. 반환: { assigned: LicenseRequestItem[], stillWaiting: LicenseRequestItem[] }
```

- 기존 `approveAdmin()`의 레이스 컨디션 방어(row lock + 트랜잭션 내 재확인)와 동일한 패턴을
  따른다 — 동시에 `bulkAssign`이 두 번 호출되거나 `bulkAssign`과 `approveAdmin`이 겹쳐도
  license row lock이 직렬화
- 잔여석보다 대기 요청이 적으면 있는 만큼만 승인(에러 아님)
- 승인되지 못한 나머지는 `PENDING_ADMIN`에 그대로 남아 다음 `bulkAssign` 호출이나 개별
  `approveAdmin` 호출을 기다림
- **`now` 단일 캡처**: `priorityScore`의 대기일 계산(`floor((now - createdAt) / 1일)`)에
  쓰이는 `now`는 함수 진입 시점에 **`const now = new Date()`로 한 번만 캡처**하고 모든
  요청에 동일하게 사용한다. 루프 안에서 매번 `new Date()`를 호출하면 자정을 넘길 때
  동일 배치 내 요청 간 점수가 1 차이가 나 tie-breaking 일관성이 깨진다.
  `listRequests()`의 정렬도 동일하게 단일 `now`를 사용한다.
  (목록 조회 시점과 `bulkAssign` 호출 시점 사이의 점수 차이는 허용 범위 —
  점수는 호출 시점 스냅샷 기준이다.)

### 5. API 계약 변경

- `POST /licenses/:id/requests/bulk-assign` (ADMIN 전용, 신규) — body 없음, 응답:
  `{ assigned: LicenseRequestItem[], stillWaiting: LicenseRequestItem[] }`
- `GET /licenses/:id/requests`: 응답 배열의 각 아이템에 `priorityScore: number` 추가
  (`priorityTier`는 유지)
- `POST /licenses`, `PATCH /licenses/:id`: body에 `coreJobTypes?: JobType[]` 허용

### 6. 검증 스키마

`src/schemas/` 내 라이선스 생성/수정 zod 스키마에 추가:
```ts
coreJobTypes: z.array(z.nativeEnum(JobType)).optional()
```

## 테스트 계획

- `priorityScore` 계산 단위테스트: 부서 일치/직종 일치/대기일수 조합별 점수, 동점 시
  createdAt 오름차순 정렬. targetUser.jobType이 null인 경우 +0으로 처리되는지 확인.
- `bulkAssign`:
  - 대기 요청 수 > 잔여석: 상위 N개(잔여석만큼)만 APPROVED, 나머지는 PENDING_ADMIN 유지
  - 대기 요청 수 <= 잔여석: 전원 APPROVED
  - 잔여석 0: 빈 결과, 에러 아님
  - ADMIN이 아닌 요청자 → 403
  - 동시 호출 시 좌석 초과 배정이 발생하지 않는지 (레이스 컨디션)
- `request()` 회귀: 좌석 초과 상태에서도 요청 생성이 성공하는지 (기존 400/409 차단 테스트는
  제거하고 새 동작으로 교체)
- 기존 `approveAdmin()` 개별 승인 경로 회귀 테스트 유지
- create/update API가 `coreJobTypes`를 정상 저장/갱신하는지
- `listRequests()` 응답이 `priorityScore desc` → 동점 시 `createdAt asc` 순서로 정렬되는지
- `getRequestById()`가 모든 상태(APPROVED, REJECTED 포함)에서 `priorityScore`를 반환하는지
- `PATCH /admin/users/:id`(또는 user 생성/수정 API)가 `jobType`을 정상 저장/갱신하는지

## 미해결 질문 (구현 중 확인 필요)

- `listRequests`가 페이지네이션 없이 전체를 반환하는 현재 구조가 유지된다는 전제(이전 스펙과
  동일). 대기 요청이 무제한으로 쌓일 수 있게 되므로(좌석초과 차단 제거), 향후 페이지네이션
  또는 대기 요청 수 상한이 필요해질 수 있음 — 이번 스코프는 아니지만 기록해둠.
