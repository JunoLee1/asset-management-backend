# License Weighted Priority + BulkAssign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `JobType` enum을 도입해 라이선스 요청 대기열에 부서(+100) + 직종(+50) + 대기일(+1/일) 가중치 점수를 부여하고, 관리자 트리거 일괄 자동배정(`bulkAssign`)을 구현한다.

**Architecture:** Prisma enum(`JobType`)을 User와 License에 추가하고, `license.service.ts`의 `countActiveSeats()` 의미를 활성 할당만 세도록 바꾼 뒤 `priorityScore` 계산 헬퍼를 서비스 상단에 정의한다. `listRequests()`는 점수 기준 정렬, `getRequestById()`는 단건 점수 반환, 신규 `bulkAssign()`은 PENDING_ADMIN 대기열을 점수 순으로 잔여석만큼 일괄 승인한다.

**Tech Stack:** TypeScript, Prisma (PostgreSQL), Zod, Jest

---

### Task 1: Prisma 스키마 — JobType enum + 필드 추가 + 마이그레이션

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: `JobType` enum 및 필드 추가**

`prisma/schema.prisma`의 기존 `Role` enum 블록 바로 아래에 추가:

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
```

`User` 모델에 추가 (`role` 필드 바로 아래):
```prisma
  jobType JobType? // nullable — 미설정 시 직종 가중치 0점 처리
```

`License` 모델에 추가 (`coreDepartmentIds` 필드 바로 아래, line ~516):
```prisma
  coreJobTypes JobType[] @default([])
```

- [ ] **Step 2: 마이그레이션 생성·적용**

```bash
npx prisma migrate dev --name add_job_type_and_core_job_types
```

Expected: `migrations/YYYYMMDDHHMMSS_add_job_type_and_core_job_types/migration.sql` 생성, DB 적용 성공.

- [ ] **Step 3: Prisma 클라이언트 재생성 확인**

```bash
npx prisma generate
grep -n "JobType" src/generated/prisma/enums.ts
```

Expected: `JobType` enum이 `src/generated/prisma/enums.ts`에 존재.

---

### Task 2: User 스키마 — `jobType` 필드 추가

**Files:**
- Modify: `src/schemas/user.schema.ts`

- [ ] **Step 1: `jobType` 필드를 `updateUserSchema`에 추가하는 테스트 작성**

`src/modules/admin/__tests__/user.service.test.ts` (또는 schema 단위테스트가 없다면 기존 user.service 테스트에 추가):

```ts
import { updateUserSchema } from '../../../schemas/user.schema'

describe('updateUserSchema — jobType', () => {
  it('유효한 JobType 값은 통과', () => {
    const result = updateUserSchema.safeParse({ jobType: 'DEVELOPER' })
    expect(result.success).toBe(true)
  })

  it('null 은 통과 (jobType 초기화)', () => {
    const result = updateUserSchema.safeParse({ jobType: null })
    expect(result.success).toBe(true)
  })

  it('잘못된 값은 실패', () => {
    const result = updateUserSchema.safeParse({ jobType: 'WIZARD' })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest src/modules/admin/__tests__/user.service.test.ts --testNamePattern="updateUserSchema" -t "jobType" 2>&1 | tail -10
```

Expected: FAIL — `jobType` 필드가 없어 unknown key로 거부됨.

- [ ] **Step 3: `src/schemas/user.schema.ts` 수정**

파일 상단에 import 추가:
```ts
import { Role, JobType } from '../generated/prisma/enums'
```
(기존 `import { Role } from '../generated/prisma/enums'` 라인을 교체)

`updateUserSchema` 객체에 추가:
```ts
    jobType: z.nativeEnum(JobType).nullable().optional(),
```

`.strict()` 스키마이므로 이 필드를 추가해야 통과됨.

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx jest src/modules/admin/__tests__/user.service.test.ts --testNamePattern="jobType" 2>&1 | tail -5
```

Expected: PASS.

---

### Task 3: License 타입 — `priorityScore`, `coreJobTypes` 추가

**Files:**
- Modify: `src/modules/licenses/license.types.ts`

- [ ] **Step 1: 타입 파일 수정**

파일 상단 import에 추가:
```ts
import type { LicenseRequestStatus, JobType } from '../../generated/prisma/enums'
export type { LicenseRequestStatus, JobType }
```
(기존 `import type { LicenseRequestStatus }` 라인 교체)

`LicenseDetail`에 `coreJobTypes` 필드 추가:
```ts
export interface LicenseDetail extends LicenseListItem {
  vendorId: string | null
  productKey: string | null
  updatedAt: Date
  assignments: LicenseAssignmentDetail[]
  softwares: SoftwareLinkItem[]
  coreDepartmentIds: string[]
  coreJobTypes: JobType[]        // ← 추가
}
```

`CreateLicenseInput`에 추가:
```ts
  coreJobTypes?: JobType[]
```

`UpdateLicenseInput`에 추가:
```ts
  coreJobTypes?: JobType[]
```

`LicenseRequestItem`에 `priorityScore` 추가 (`priorityTier` 바로 아래):
```ts
  priorityTier: LicensePriorityTier
  priorityScore: number           // ← 추가
```

- [ ] **Step 2: TypeScript 컴파일 확인**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: `license.types.ts` 관련 에러 없음 (service/schema 아직 미수정이라 다른 에러는 있을 수 있음).

---

### Task 4: License 스키마 — `coreJobTypes` 추가

**Files:**
- Modify: `src/schemas/license.schema.ts`

- [ ] **Step 1: import 추가 및 필드 추가**

파일 상단에 추가:
```ts
import { JobType } from '../generated/prisma/enums'
```

`createLicenseSchema`에 추가 (`coreDepartmentIds` 바로 아래):
```ts
    coreJobTypes: z.array(z.nativeEnum(JobType)).optional(),
```

`updateLicenseSchema`에 추가 (`coreDepartmentIds` 바로 아래):
```ts
    coreJobTypes: z.array(z.nativeEnum(JobType)).optional(),
```

- [ ] **Step 2: 스키마 동작 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts --testNamePattern="coreDepartmentIds" 2>&1 | tail -5
```

Expected: 기존 테스트 여전히 PASS (additive 변경이므로 회귀 없음).

---

### Task 5: `countActiveSeats()` 의미 변경 + `approveAdmin()` 연산자 수정

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: `countActiveSeats` 변경 테스트 작성**

`license.service.test.ts`의 `describe('licenseService.request')` 블록에 추가:

```ts
it('countActiveSeats는 활성 할당만 센다 — PENDING 요청은 제외', async () => {
  // 라이선스: seatsTotal=1, 활성 할당 1개 → 사전 체크는 통과 (좌석 초과 체크 제거 후)
  // 이 테스트는 Task 6 이후에 의미가 생김 — 여기서는 countActiveSeats 의 쿼리 인자 확인
  mockLFindUnique.mockResolvedValueOnce({ id: 'lic1', seatsTotal: 1, name: 'L' })
  mockLACount.mockResolvedValueOnce(1) // 활성 할당 1
  mockLRFindFirst.mockResolvedValueOnce(null)
  mockLRFindFirst.mockResolvedValueOnce(null)

  await expect(
    licenseService.request('lic1', { targetUserId: 'u1' }, { id: 'req1', role: 'USER' }),
  ).resolves.toBeDefined() // Task 6 이후 좌석 초과 차단이 없어서 생성 시도까지 감
  // licenseAssignment.count 가 { where: { licenseId: 'lic1', unassignedAt: null } } 로 호출됐는지 확인
  expect(mockLACount).toHaveBeenCalledWith({ where: { licenseId: 'lic1', unassignedAt: null } })
})
```

`describe('licenseService.approveAdmin')` 블록에 새 케이스 추가:

```ts
it('활성 할당이 seatsTotal과 같으면 거부 (>=)', async () => {
  const mockReq = { id: 'req1', licenseId: 'lic1', status: 'PENDING_ADMIN', targetUserId: 'u1', requestedById: 'r1', assetId: null }
  mockLRFindUnique.mockResolvedValueOnce(mockReq)
  mockLFindUnique.mockResolvedValueOnce({ id: 'lic1', seatsTotal: 2, name: 'L' })

  const mockTx = {
    $queryRaw: jest.fn().mockResolvedValue([]),
    licenseAssignment: { count: jest.fn().mockResolvedValue(2) }, // 활성 할당 = seatsTotal
    licenseRequest: { update: jest.fn() },
  }
  ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx))

  await expect(
    licenseService.approveAdmin('lic1', 'req1', { id: 'admin1', role: 'ADMIN' }),
  ).rejects.toThrow('시트가 부족합니다')
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts -t "활성 할당이 seatsTotal과 같으면 거부" 2>&1 | tail -10
```

Expected: FAIL — 현재 `>` 연산자라 `2 > 2` = false, 거부 안 됨.

- [ ] **Step 3: `countActiveSeats()` 수정** (`license.service.ts` L34-45)

```ts
const countActiveSeats = async (licenseId: string, client: PrismaOrTx = prisma): Promise<number> => {
  return client.licenseAssignment.count({ where: { licenseId, unassignedAt: null } })
}
```

- [ ] **Step 4: `approveAdmin()` 비교 연산자 수정** (L613)

```ts
    if (activeInTx >= license.seatsTotal) {
      throw new AppError(409, `시트가 부족합니다. 현재 활성 할당(${activeInTx}) >= 총 시트(${license.seatsTotal})`)
    }
```

그리고 L609 주석도 교체:
```ts
  // countActiveSeats()는 이제 활성 할당만 셈 — 이 요청은 카운트에 포함되지 않으므로
  // 기준은 >= (seatsTotal 이상이면 거부)
```

- [ ] **Step 5: 기존 approveAdmin 테스트 수정**

기존 `'승인 시점에 시트 초과면 거부'` 테스트를 새 의미에 맞게 수정:

```ts
it('승인 시점에 활성 할당이 seatsTotal 이상이면 거부 (트랜잭션 내 재확인)', async () => {
  const mockReq = { id: 'req1', licenseId: 'lic1', status: 'PENDING_ADMIN', targetUserId: 'u1', requestedById: 'r1', assetId: null }
  mockLRFindUnique.mockResolvedValueOnce(mockReq)
  mockLFindUnique.mockResolvedValueOnce({ id: 'lic1', seatsTotal: 2, name: 'L' })

  const mockTx = {
    $queryRaw: jest.fn().mockResolvedValue([]),
    licenseAssignment: { count: jest.fn().mockResolvedValue(2) }, // 활성 할당 = seatsTotal
    licenseRequest: { update: jest.fn() },
  }
  ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx))

  await expect(
    licenseService.approveAdmin('lic1', 'req1', { id: 'admin1', role: 'ADMIN' }),
  ).rejects.toThrow('시트가 부족합니다')
})
```

- [ ] **Step 6: 전체 테스트 통과 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts 2>&1 | tail -10
```

Expected: 모든 테스트 PASS.

---

### Task 6: `request()` — 좌석 초과 차단 제거

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 기존 좌석 차단 테스트를 새 동작 테스트로 교체**

기존 테스트 두 건 (`'PENDING 요청이 있으면 시트 잠금에 포함된다'`, `'바깥쪽 사전 체크는 통과했지만 트랜잭션 안에서...'`)을 아래로 교체:

```ts
it('좌석이 꽉 찬 상태에서도 요청 생성이 허용된다 (좌석 초과 차단 제거)', async () => {
  const mockLicense = { id: 'lic1', seatsTotal: 1, name: 'Adobe', coreDepartmentIds: [] }
  mockLFindUnique.mockResolvedValueOnce(mockLicense)
  mockLACount.mockResolvedValueOnce(1) // 활성 할당 1 = seatsTotal

  const mockRequester = { id: 'u1', name: 'User', role: 'USER', teamId: null }
  const mockTarget = { id: 'u2', name: 'Target' }
  ;(prisma.user.findUnique as jest.Mock)
    .mockResolvedValueOnce({ ...mockRequester, team: null })
    .mockResolvedValueOnce(mockTarget)
  ;(prisma.licenseAssignment.findFirst as jest.Mock).mockResolvedValueOnce(null)
  mockLRFindFirst.mockResolvedValueOnce(null)

  const createdReq = {
    id: 'req1', licenseId: 'lic1', requestedById: 'u1', targetUserId: 'u2',
    assetId: null, status: 'PENDING_SECURITY',
  }
  const mockTx = {
    $queryRaw: jest.fn().mockResolvedValue([]),
    licenseRequest: { create: jest.fn().mockResolvedValue(createdReq) },
  }
  ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx))

  const fullReq = {
    ...createdReq,
    license: { name: 'Adobe', coreDepartmentIds: [], coreJobTypes: [] },
    requestedBy: { name: 'User' },
    targetUser: { name: 'Target', jobType: null, team: null },
    asset: null,
    managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
    adminApprovedBy: null, rejectedBy: null,
    managerApprovedById: null, managerApprovedAt: null,
    deptApprovedById: null, deptApprovedAt: null,
    securityReviewedById: null, securityReviewedAt: null,
    adminApprovedById: null, adminApprovedAt: null,
    rejectedById: null, rejectedAt: null, rejectReason: null,
    createdAt: new Date(),
  }
  mockLRFindUnique.mockResolvedValueOnce(fullReq)

  const result = await licenseService.request('lic1', { targetUserId: 'u2' }, { id: 'u1', role: 'USER' })
  expect(result.status).toBe('PENDING_SECURITY')
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts -t "좌석이 꽉 찬 상태에서도 요청 생성이 허용" 2>&1 | tail -10
```

Expected: FAIL — 현재 사전 체크(L346-349)에서 400 던짐.

- [ ] **Step 3: `request()` 사전 체크 제거** (L346-349)

아래 블록 삭제:
```ts
  const active = await countActiveSeats(licenseId)
  if (active >= license.seatsTotal) {
    throw new AppError(400, `잔여 시트가 없습니다. (${active}/${license.seatsTotal})`)
  }
```

- [ ] **Step 4: `request()` 트랜잭션 내 재확인 제거** (L401-404)

아래 블록 삭제:
```ts
    const activeInTx = await countActiveSeats(licenseId, tx)
    if (activeInTx >= license.seatsTotal) {
      throw new AppError(409, `잔여 시트가 없습니다. (${activeInTx}/${license.seatsTotal})`)
    }
```

트랜잭션 내에서 `lockLicenseForUpdate` 호출은 유지 (`bulkAssign`과 `approveAdmin`이 직렬화되므로).

- [ ] **Step 5: 전체 테스트 통과 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts 2>&1 | tail -10
```

Expected: 모든 테스트 PASS.

---

### Task 7: `priorityScore` 헬퍼 + `getRequestById()` 수정

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: `getRequestById` priorityScore 테스트 작성**

`describe('licenseService.getById')` 아래에 새 describe 추가:

```ts
describe('licenseService.getRequestById (via approveAdmin return)', () => {
  it('DEVELOPER 직종 일치 시 priorityScore += 50', async () => {
    const createdAt = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2일 전
    const row = {
      id: 'req1', licenseId: 'lic1', requestedById: 'r1', targetUserId: 'u1',
      assetId: null, status: 'PENDING_ADMIN',
      license: { name: 'Adobe', coreDepartmentIds: ['dept1'], coreJobTypes: ['DEVELOPER'] },
      requestedBy: { name: 'Requester' },
      targetUser: { name: 'Target', jobType: 'DEVELOPER', team: { departmentId: 'dept1' } },
      asset: null,
      managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
      adminApprovedBy: null, rejectedBy: null,
      managerApprovedById: null, managerApprovedAt: null,
      deptApprovedById: null, deptApprovedAt: null,
      securityReviewedById: null, securityReviewedAt: null,
      adminApprovedById: null, adminApprovedAt: null,
      rejectedById: null, rejectedAt: null, rejectReason: null,
      createdAt,
    }
    mockLRFindUnique.mockResolvedValueOnce(row)

    const result = await (licenseService as any).getRequestById('req1')
    // dept(100) + jobType(50) + 2일(2) = 152
    expect(result.priorityScore).toBe(152)
    expect(result.priorityTier).toBe('CORE')
  })

  it('직종 불일치 시 priorityScore에 jobType 가중치 없음', async () => {
    const createdAt = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1일 전
    const row = {
      id: 'req2', licenseId: 'lic1', requestedById: 'r1', targetUserId: 'u1',
      assetId: null, status: 'PENDING_ADMIN',
      license: { name: 'Adobe', coreDepartmentIds: ['dept1'], coreJobTypes: ['DEVELOPER'] },
      requestedBy: { name: 'Requester' },
      targetUser: { name: 'Target', jobType: 'DESIGNER', team: { departmentId: 'dept1' } },
      asset: null,
      managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
      adminApprovedBy: null, rejectedBy: null,
      managerApprovedById: null, managerApprovedAt: null,
      deptApprovedById: null, deptApprovedAt: null,
      securityReviewedById: null, securityReviewedAt: null,
      adminApprovedById: null, adminApprovedAt: null,
      rejectedById: null, rejectedAt: null, rejectReason: null,
      createdAt,
    }
    mockLRFindUnique.mockResolvedValueOnce(row)

    const result = await (licenseService as any).getRequestById('req2')
    // dept(100) + jobType(0) + 1일(1) = 101
    expect(result.priorityScore).toBe(101)
  })

  it('jobType null이면 직종 가중치 0', async () => {
    const createdAt = new Date(Date.now() - 0)
    const row = {
      id: 'req3', licenseId: 'lic1', requestedById: 'r1', targetUserId: 'u1',
      assetId: null, status: 'PENDING_ADMIN',
      license: { name: 'Adobe', coreDepartmentIds: [], coreJobTypes: ['DEVELOPER'] },
      requestedBy: { name: 'Requester' },
      targetUser: { name: 'Target', jobType: null, team: null },
      asset: null,
      managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
      adminApprovedBy: null, rejectedBy: null,
      managerApprovedById: null, managerApprovedAt: null,
      deptApprovedById: null, deptApprovedAt: null,
      securityReviewedById: null, securityReviewedAt: null,
      adminApprovedById: null, adminApprovedAt: null,
      rejectedById: null, rejectedAt: null, rejectReason: null,
      createdAt,
    }
    mockLRFindUnique.mockResolvedValueOnce(row)

    const result = await (licenseService as any).getRequestById('req3')
    expect(result.priorityScore).toBe(0)
    expect(result.priorityTier).toBe('DEFAULT')
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts -t "getRequestById" 2>&1 | tail -10
```

Expected: FAIL — `priorityScore` 필드 없음.

- [ ] **Step 3: `license.service.ts` 상단에 가중치 상수 + 헬퍼 추가** (imports 바로 아래)

```ts
const WEIGHT_DEPT = 100
const WEIGHT_JOB_TYPE = 50
const WEIGHT_WAIT_DAY = 1

const calcPriorityScore = (
  targetDeptId: string | null,
  targetJobType: string | null,
  coreDepartmentIds: string[],
  coreJobTypes: string[],
  createdAt: Date,
  now: Date,
): number => {
  const deptScore = targetDeptId && coreDepartmentIds.includes(targetDeptId) ? WEIGHT_DEPT : 0
  const jobScore = targetJobType && coreJobTypes.includes(targetJobType) ? WEIGHT_JOB_TYPE : 0
  const waitDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  return deptScore + jobScore + waitDays * WEIGHT_WAIT_DAY
}
```

- [ ] **Step 4: `getRequestById()` include + 반환값 수정**

include 수정 (L288-300):
```ts
    include: {
      license: { select: { name: true, coreDepartmentIds: true, coreJobTypes: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true, jobType: true, team: { select: { departmentId: true } } } },
      asset: { select: { assetCode: true } },
      managerApprovedBy: { select: { name: true } },
      deptApprovedBy: { select: { name: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
```

`priorityTier` 계산 블록 이후에 `priorityScore` 추가 (L303-305 근처):
```ts
  const now = new Date()
  const targetDeptId = row.targetUser.team?.departmentId ?? null
  const priorityTier: LicensePriorityTier =
    targetDeptId && row.license.coreDepartmentIds.includes(targetDeptId) ? 'CORE' : 'DEFAULT'
  const priorityScore = calcPriorityScore(
    targetDeptId,
    row.targetUser.jobType ?? null,
    row.license.coreDepartmentIds,
    row.license.coreJobTypes as string[],
    row.createdAt,
    now,
  )
```

반환 객체에 `priorityScore` 추가 (`priorityTier` 바로 아래):
```ts
    priorityTier,
    priorityScore,
```

- [ ] **Step 5: 전체 테스트 통과 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts 2>&1 | tail -10
```

Expected: 모든 테스트 PASS.

---

### Task 8: `listRequests()` — `priorityScore` 추가 + 정렬

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: `listRequests` priorityScore + 정렬 테스트 작성**

기존 `describe('licenseService.listRequests')` 블록에 추가:

```ts
it('priorityScore 기준 내림차순, 동점은 createdAt 오름차순 정렬', async () => {
  const now = new Date()
  const day = 24 * 60 * 60 * 1000
  const makeRow = (id: string, deptMatch: boolean, jobMatch: boolean, daysAgo: number) => ({
    id, licenseId: 'lic1', requestedById: 'r1', targetUserId: id,
    assetId: null, status: 'PENDING_ADMIN',
    license: { name: 'Adobe', coreDepartmentIds: ['dept1'], coreJobTypes: ['DEVELOPER'] },
    requestedBy: { name: 'R' },
    targetUser: {
      name: id,
      jobType: jobMatch ? 'DEVELOPER' : 'DESIGNER',
      team: deptMatch ? { departmentId: 'dept1' } : { departmentId: 'dept2' },
    },
    asset: null,
    managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
    adminApprovedBy: null, rejectedBy: null,
    managerApprovedById: null, managerApprovedAt: null,
    deptApprovedById: null, deptApprovedAt: null,
    securityReviewedById: null, securityReviewedAt: null,
    adminApprovedById: null, adminApprovedAt: null,
    rejectedById: null, rejectedAt: null, rejectReason: null,
    createdAt: new Date(now.getTime() - daysAgo * day),
  })

  // A: dept+job(150) + 0일 = 150
  // B: dept(100) + 0일 = 100
  // C: job(50) + 10일 = 60
  // D: nothing + 0일 = 0
  mockLRFindMany.mockResolvedValueOnce([
    makeRow('D', false, false, 0),
    makeRow('B', true, false, 0),
    makeRow('A', true, true, 0),
    makeRow('C', false, true, 10),
  ])

  const result = await licenseService.listRequests('lic1', {}, { id: 'admin', role: 'ADMIN' })
  expect(result.map((r) => r.targetUserId)).toEqual(['A', 'B', 'C', 'D'])
  expect(result[0].priorityScore).toBe(150)
  expect(result[1].priorityScore).toBe(100)
  expect(result[2].priorityScore).toBeGreaterThanOrEqual(60) // 대기일 기준 시 약간 다를 수 있음
})

it('동점일 경우 createdAt 오름차순 (먼저 요청한 쪽 우선)', async () => {
  const now = new Date()
  const day = 24 * 60 * 60 * 1000
  const makeRow = (id: string, daysAgo: number) => ({
    id, licenseId: 'lic1', requestedById: 'r1', targetUserId: id,
    assetId: null, status: 'PENDING_ADMIN',
    license: { name: 'Adobe', coreDepartmentIds: [], coreJobTypes: [] },
    requestedBy: { name: 'R' },
    targetUser: { name: id, jobType: null, team: null },
    asset: null,
    managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
    adminApprovedBy: null, rejectedBy: null,
    managerApprovedById: null, managerApprovedAt: null,
    deptApprovedById: null, deptApprovedAt: null,
    securityReviewedById: null, securityReviewedAt: null,
    adminApprovedById: null, adminApprovedAt: null,
    rejectedById: null, rejectedAt: null, rejectReason: null,
    createdAt: new Date(now.getTime() - daysAgo * day),
  })

  // 모두 0점 — 오래된 순(createdAt asc)으로 정렬돼야 함
  mockLRFindMany.mockResolvedValueOnce([
    makeRow('newer', 1),
    makeRow('oldest', 3),
    makeRow('middle', 2),
  ])

  const result = await licenseService.listRequests('lic1', {}, { id: 'admin', role: 'ADMIN' })
  expect(result.map((r) => r.targetUserId)).toEqual(['oldest', 'middle', 'newer'])
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts -t "priorityScore 기준 내림차순" 2>&1 | tail -10
```

Expected: FAIL — 현재 정렬 없음.

- [ ] **Step 3: `listRequests()` include + 점수 + 정렬 수정** (L736-793)

include 수정 (L741-751):
```ts
    include: {
      license: { select: { name: true, coreDepartmentIds: true, coreJobTypes: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true, jobType: true, team: { select: { departmentId: true } } } },
      asset: { select: { assetCode: true } },
      managerApprovedBy: { select: { name: true } },
      deptApprovedBy: { select: { name: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
```

`items` 매핑 상단에 `now` 추가 (L754):
```ts
  const now = new Date()
  const items = rows.map((row) => {
    const targetDeptId = row.targetUser.team?.departmentId ?? null
    const priorityTier: LicensePriorityTier =
      targetDeptId && row.license.coreDepartmentIds.includes(targetDeptId) ? 'CORE' : 'DEFAULT'
    const priorityScore = calcPriorityScore(
      targetDeptId,
      row.targetUser.jobType ?? null,
      row.license.coreDepartmentIds,
      row.license.coreJobTypes as string[],
      row.createdAt,
      now,
    )
    return {
      // ...기존 필드들 유지
      priorityTier,
      priorityScore,      // ← 추가
      // ...나머지 필드들
    }
  })
```

`return items` → 정렬 후 반환:
```ts
  return items.sort(
    (a, b) => b.priorityScore - a.priorityScore || a.createdAt.getTime() - b.createdAt.getTime(),
  )
```

- [ ] **Step 4: 전체 테스트 통과 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts 2>&1 | tail -10
```

Expected: 모든 테스트 PASS.

---

### Task 9: 신규 `bulkAssign()` 구현

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: `bulkAssign` 테스트 작성**

파일 끝 `describe('licenseService.cancel')` 아래에 추가:

```ts
describe('licenseService.bulkAssign', () => {
  const makeRow = (id: string, score: number, daysAgo = 0) => {
    const now = new Date()
    const day = 24 * 60 * 60 * 1000
    return {
      id, licenseId: 'lic1', requestedById: 'r1', targetUserId: id,
      assetId: null, status: 'PENDING_ADMIN',
      license: { coreDepartmentIds: [], coreJobTypes: [] },
      targetUser: { jobType: null, team: null },
      createdAt: new Date(now.getTime() - daysAgo * day),
    }
  }

  it('ADMIN 아니면 403', async () => {
    await expect(
      licenseService.bulkAssign('lic1', { id: 'u1', role: 'USER' }),
    ).rejects.toThrow('ADMIN')
  })

  it('잔여석 0이면 빈 결과 반환, 에러 아님', async () => {
    mockLFindUnique.mockResolvedValueOnce({ id: 'lic1', seatsTotal: 2, name: 'L' })
    const mockTx = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      licenseAssignment: { count: jest.fn().mockResolvedValue(2), create: jest.fn() },
      licenseRequest: { findMany: jest.fn().mockResolvedValue([]), update: jest.fn() },
    }
    ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx))

    const result = await licenseService.bulkAssign('lic1', { id: 'admin', role: 'ADMIN' })
    expect(result.assigned).toHaveLength(0)
  })

  it('대기 요청 수 > 잔여석: 상위 N개만 APPROVED', async () => {
    mockLFindUnique.mockResolvedValueOnce({ id: 'lic1', seatsTotal: 3, name: 'L' })

    const rows = [makeRow('A', 0), makeRow('B', 0), makeRow('C', 0), makeRow('D', 0), makeRow('E', 0)]
    // A=150점(dept+job), B=100점(dept), C=60점(job+10일), D=0, E=0 이 되도록 license/user 세팅
    rows[0].license = { coreDepartmentIds: ['dept1'], coreJobTypes: ['DEVELOPER'] }
    rows[0].targetUser = { jobType: 'DEVELOPER', team: { departmentId: 'dept1' } } as any
    rows[1].license = { coreDepartmentIds: ['dept1'], coreJobTypes: ['DEVELOPER'] }
    rows[1].targetUser = { jobType: 'DESIGNER', team: { departmentId: 'dept1' } } as any

    const mockUpdate = jest.fn().mockImplementation(({ where }) => Promise.resolve({ id: where.id }))
    const mockCreate = jest.fn().mockResolvedValue({})
    const mockTx = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      licenseAssignment: { count: jest.fn().mockResolvedValue(0), create: mockCreate },
      licenseRequest: { findMany: jest.fn().mockResolvedValue(rows), update: mockUpdate },
    }
    ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx))

    // getRequestById mock for return values
    const approvedIds = ['A', 'B', 'C'] // top 3 (seatsTotal=3, active=0)
    mockLRFindUnique.mockImplementation(({ where }: { where: { id: string } }) =>
      Promise.resolve({
        id: where.id, licenseId: 'lic1', status: 'APPROVED',
        license: { name: 'L', coreDepartmentIds: [], coreJobTypes: [] },
        requestedBy: { name: 'R' }, targetUser: { name: where.id, jobType: null, team: null },
        asset: null,
        managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
        adminApprovedBy: null, rejectedBy: null,
        requestedById: 'r1', targetUserId: where.id, assetId: null,
        managerApprovedById: null, managerApprovedAt: null,
        deptApprovedById: null, deptApprovedAt: null,
        securityReviewedById: null, securityReviewedAt: null,
        adminApprovedById: 'admin', adminApprovedAt: new Date(),
        rejectedById: null, rejectedAt: null, rejectReason: null,
        createdAt: new Date(),
      })
    )

    const result = await licenseService.bulkAssign('lic1', { id: 'admin', role: 'ADMIN' })
    expect(mockUpdate).toHaveBeenCalledTimes(3) // 3개 승인
    expect(mockCreate).toHaveBeenCalledTimes(3) // 3개 할당
    // 2개는 미승인 — update 호출 안 됨
    const updatedIds = mockUpdate.mock.calls.map((c: any[]) => c[0].where.id)
    expect(updatedIds).not.toContain('D')
    expect(updatedIds).not.toContain('E')
  })

  it('대기 요청 수 <= 잔여석: 전원 APPROVED', async () => {
    mockLFindUnique.mockResolvedValueOnce({ id: 'lic1', seatsTotal: 5, name: 'L' })

    const rows = [makeRow('A', 0), makeRow('B', 0)]
    const mockUpdate = jest.fn().mockImplementation(({ where }: { where: { id: string } }) => Promise.resolve({ id: where.id }))
    const mockCreate = jest.fn().mockResolvedValue({})
    const mockTx = {
      $queryRaw: jest.fn().mockResolvedValue([]),
      licenseAssignment: { count: jest.fn().mockResolvedValue(0), create: mockCreate },
      licenseRequest: { findMany: jest.fn().mockResolvedValue(rows), update: mockUpdate },
    }
    ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx))

    mockLRFindUnique.mockResolvedValue({
      id: 'A', licenseId: 'lic1', status: 'APPROVED',
      license: { name: 'L', coreDepartmentIds: [], coreJobTypes: [] },
      requestedBy: { name: 'R' }, targetUser: { name: 'A', jobType: null, team: null },
      asset: null, managerApprovedBy: null, deptApprovedBy: null, securityReviewedBy: null,
      adminApprovedBy: null, rejectedBy: null,
      requestedById: 'r1', targetUserId: 'A', assetId: null,
      managerApprovedById: null, managerApprovedAt: null,
      deptApprovedById: null, deptApprovedAt: null,
      securityReviewedById: null, securityReviewedAt: null,
      adminApprovedById: 'admin', adminApprovedAt: new Date(),
      rejectedById: null, rejectedAt: null, rejectReason: null,
      createdAt: new Date(),
    })

    const result = await licenseService.bulkAssign('lic1', { id: 'admin', role: 'ADMIN' })
    expect(mockUpdate).toHaveBeenCalledTimes(2)
    expect(mockCreate).toHaveBeenCalledTimes(2)
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts -t "bulkAssign" 2>&1 | tail -10
```

Expected: FAIL — `licenseService.bulkAssign` is not a function.

- [ ] **Step 3: `bulkAssign()` 구현 추가** (`listRequests` 함수 바로 뒤, `unassign` 앞에 추가)

```ts
const bulkAssign = async (
  licenseId: string,
  requester: RequesterContext,
): Promise<{ assigned: LicenseRequestItem[]; stillWaiting: LicenseRequestItem[] }> => {
  if (requester.role !== 'ADMIN') throw new AppError(403, 'ADMIN 권한이 필요합니다.')

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  const now = new Date()

  const assignedIds = await prisma.$transaction(async (tx) => {
    await lockLicenseForUpdate(tx, licenseId)

    const activeCount = await tx.licenseAssignment.count({ where: { licenseId, unassignedAt: null } })
    const availableSeats = license.seatsTotal - activeCount
    if (availableSeats <= 0) return []

    const pending = await tx.licenseRequest.findMany({
      where: { licenseId, status: 'PENDING_ADMIN' },
      include: {
        license: { select: { coreDepartmentIds: true, coreJobTypes: true } },
        targetUser: { select: { jobType: true, team: { select: { departmentId: true } } } },
      },
    })

    const scored = pending
      .map((req) => ({
        req,
        score: calcPriorityScore(
          req.targetUser.team?.departmentId ?? null,
          req.targetUser.jobType ?? null,
          req.license.coreDepartmentIds,
          req.license.coreJobTypes as string[],
          req.createdAt,
          now,
        ),
      }))
      .sort((a, b) => b.score - a.score || a.req.createdAt.getTime() - b.req.createdAt.getTime())

    const toAssign = scored.slice(0, availableSeats)

    for (const { req } of toAssign) {
      await tx.licenseRequest.update({
        where: { id: req.id },
        data: { status: 'APPROVED', adminApprovedById: requester.id, adminApprovedAt: now },
      })
      await tx.licenseAssignment.create({
        data: { licenseId, userId: req.targetUserId, assetId: req.assetId ?? null },
      })
    }

    return toAssign.map(({ req }) => req.id)
  })

  for (const id of assignedIds) {
    const req = await prisma.licenseRequest.findUnique({ where: { id } })
    if (req) {
      await notificationService
        .createLicenseApprovedNotification({
          requestId: id,
          licenseId,
          licenseName: license.name,
          requestedById: req.requestedById,
        })
        .catch(() => {})
    }
  }

  const assigned = await Promise.all(assignedIds.map((id) => getRequestById(id)))
  const stillWaiting = await listRequests(licenseId, { status: 'PENDING_ADMIN' }, requester)

  return { assigned, stillWaiting }
}
```

- [ ] **Step 4: `licenseService` export에 `bulkAssign` 추가** (L815)

```ts
export const licenseService = {
  list, getById, create, update, remove,
  unassign,
  request, approveManager, approveDept, approveSecurity, approveAdmin, reject, cancel,
  listRequests, bulkAssign,
}
```

- [ ] **Step 5: 전체 테스트 통과 확인**

```bash
npx jest src/modules/licenses/__tests__/license.service.test.ts 2>&1 | tail -10
```

Expected: 모든 테스트 PASS.

---

### Task 10: `getById()` + `create()` + `update()` + 컨트롤러 + 라우터 연결

**Files:**
- Modify: `src/modules/licenses/license.service.ts`
- Modify: `src/modules/licenses/license.controller.ts`
- Modify: `src/modules/licenses/license.router.ts`

- [ ] **Step 1: `getById()` — `coreJobTypes` 반환 추가**

`getById()` 반환 객체 (L161):
```ts
    coreDepartmentIds: row.coreDepartmentIds,
    coreJobTypes: row.coreJobTypes,   // ← 추가
```

- [ ] **Step 2: `create()` — `coreJobTypes` 저장**

`tx.license.create` data 블록 (L211):
```ts
        coreDepartmentIds: input.coreDepartmentIds ?? [],
        coreJobTypes: input.coreJobTypes ?? [],      // ← 추가
```

- [ ] **Step 3: `update()` — `coreJobTypes` 갱신**

data 빌드 블록 (L267):
```ts
  if (input.coreDepartmentIds !== undefined) data['coreDepartmentIds'] = input.coreDepartmentIds
  if (input.coreJobTypes !== undefined) data['coreJobTypes'] = input.coreJobTypes  // ← 추가
```

- [ ] **Step 4: 컨트롤러에 `bulkAssign` 핸들러 추가** (`src/modules/licenses/license.controller.ts`)

`cancelHandler` 아래에 추가:
```ts
const bulkAssignHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const result = await licenseService.bulkAssign(licenseId, getRequester(req))
  res.json(result)
}
```

`licenseController` export에 추가:
```ts
export const licenseController = {
  list, getById, create, update, remove,
  unassign,
  createRequest, listRequests,
  approveManagerHandler, approveDeptHandler,
  approveSecurityHandler, approveAdminHandler,
  rejectHandler, cancelHandler, bulkAssignHandler,   // ← bulkAssignHandler 추가
}
```

- [ ] **Step 5: 라우터에 경로 추가** (`src/modules/licenses/license.router.ts`)

`router.get('/:id/requests', ...)` 아래에 추가:
```ts
router.post('/:id/requests/bulk-assign', licenseController.bulkAssignHandler)
```

(기존 `/:id/requests/:requestId/...` 경로들보다 **앞에** 위치해야 Express 라우팅 충돌 없음)

- [ ] **Step 6: TypeScript 컴파일 에러 0개 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v "node_modules" | head -20
```

Expected: 출력 없음 (에러 0개).

- [ ] **Step 7: 전체 테스트 통과 확인**

```bash
npx jest --passWithNoTests 2>&1 | tail -15
```

Expected: 모든 테스트 스위트 PASS, 신규 테스트 포함.

---

## 자기검토 (Self-Review)

**스펙 커버리지 체크:**
- ✅ `JobType` enum (DEVELOPER~OPERATIONS) → Task 1
- ✅ `User.jobType JobType?` → Task 1
- ✅ `License.coreJobTypes JobType[]` → Task 1, 10
- ✅ `priorityScore` 공식 (100/50/1) → Task 7 헬퍼
- ✅ `now` 단일 캡처 → Task 8, 9
- ✅ `countActiveSeats` 의미 변경 → Task 5
- ✅ `approveAdmin` `>=` 연산자 → Task 5
- ✅ `request()` 좌석 초과 차단 제거 → Task 6
- ✅ `listRequests` priorityScore + 정렬 → Task 8
- ✅ `getRequestById` priorityScore → Task 7
- ✅ `bulkAssign` → Task 9, 10
- ✅ `POST /:id/requests/bulk-assign` 라우터 → Task 10
- ✅ `updateUserSchema` jobType → Task 2
- ✅ `createLicenseSchema` / `updateLicenseSchema` coreJobTypes → Task 4
