# License Request Priority Tier Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 라이선스별로 "핵심 부서"를 지정하고, 관리자가 라이선스 요청 대기열을 조회할 때 핵심 부서 소속 대상자(target user)의 요청이 먼저 보이도록 정렬한다.

**Architecture:** `License` 모델에 `coreDepartmentIds: String[]` 필드를 추가한다. `listRequests()`가 각 요청의 target user 소속 부서를 라이선스의 핵심 부서 목록과 비교해 `priorityTier`('CORE' | 'DEFAULT')를 계산하고, CORE를 먼저 오도록 정렬해서 반환한다. 승인/거절 로직 자체는 변경하지 않는다 — 순수하게 조회 시 정렬/표시만 바뀐다.

**Tech Stack:** Express, Prisma (PostgreSQL), Zod, Jest, TypeScript

**Spec:** `docs/superpowers/specs/2026-09-23-license-priority-tier-design.md`

---

## File Structure

- Modify: `prisma/schema.prisma` — `License` 모델에 필드 추가
- Modify: `src/modules/licenses/license.types.ts` — 타입 추가/확장
- Modify: `src/schemas/license.schema.ts` — zod 검증 추가
- Modify: `src/modules/licenses/license.service.ts` — `create`, `update`, `getById`, `listRequests` 수정
- Modify: `src/modules/licenses/__tests__/license.service.test.ts` — 위 변경에 대한 테스트

컨트롤러(`license.controller.ts`)와 라우터는 변경 없음 — 둘 다 스키마로 파싱한 body를 그대로 서비스에 넘기는 얇은 레이어라, 타입/스키마 변경이 자동으로 흘러간다.

---

### Task 1: Prisma 스키마 + 마이그레이션

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: License 모델에 필드 추가**

`prisma/schema.prisma`에서 `License` 모델의 `currency` 필드 다음 줄에 추가:

```prisma
model License {
  id             String  @id @default(cuid())
  name           String // "Microsoft Office 365 Business"
  productKey     String? // AES-256-CBC 암호화 저장
  productKeyMask String? // UI 표시용 (예: "****-1234")

  vendorId String?
  vendor   Vendor? @relation(fields: [vendorId], references: [id])

  seatsTotal Int @default(1)

  purchaseDate DateTime
  expiryDate   DateTime?
  cost         Decimal?  @db.Decimal(15, 2)
  currency     Currency  @default(KRW)

  // 이 라이선스가 "직무 필수"로 취급되는 핵심 부서 목록 — license 요청 대기열
  // 정렬(priorityTier)에만 쓰이고, 좌석 할당 로직 자체에는 관여하지 않는다.
  coreDepartmentIds String[] @default([])

  assignments LicenseAssignment[]
  requests    LicenseRequest[]
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  // ADR 0002 — Software 카탈로그와 N:M 다리
  softwareLinks SoftwareLicenseLink[]

  @@index([expiryDate])
  @@map("licenses")
```

(위는 `License` 모델 전체를 보여준 것 — 실제로 바꾸는 건 `currency` 줄과 `assignments` 줄 사이에 `coreDepartmentIds` 필드 한 줄과 주석을 끼워 넣는 것뿐이다.)

- [ ] **Step 2: 로컬 개발 DB에 마이그레이션 적용**

Run: `cd /Users/juno/asset-erp-backend && npx prisma migrate dev --name add_license_core_departments`

Expected: `prisma/migrations/<timestamp>_add_license_core_departments/migration.sql`가 생성되고, 다음과 비슷한 SQL이 포함됨:
```sql
ALTER TABLE "licenses" ADD COLUMN "coreDepartmentIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
```
콘솔에 `Your database is now in sync with your schema.` 출력 확인.

- [ ] **Step 3: Prisma Client 재생성 확인**

`prisma migrate dev`가 자동으로 `prisma generate`도 실행한다. 확인:

Run: `grep -n "coreDepartmentIds" src/generated/prisma/client/*.d.ts 2>/dev/null | head -3`

Expected: 최소 1줄 이상 매치 (생성된 타입에 필드가 반영됨). 매치가 없으면 `npx prisma generate`를 수동으로 실행.

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "feat(db): add coreDepartmentIds to License for request priority"
```

---

### Task 2: 타입 + 검증 스키마

**Files:**
- Modify: `src/modules/licenses/license.types.ts`
- Modify: `src/schemas/license.schema.ts`

- [ ] **Step 1: `license.types.ts`에 우선순위 티어 타입과 필드 추가**

`src/modules/licenses/license.types.ts`에서:

`LicenseDetail` 인터페이스에 `coreDepartmentIds` 추가 (파일 26-32행 부근):
```ts
export interface LicenseDetail extends LicenseListItem {
  vendorId: string | null
  productKey: string | null // 평문 (ADMIN 만 reveal)
  updatedAt: Date
  assignments: LicenseAssignmentDetail[]
  softwares: SoftwareLinkItem[]
  coreDepartmentIds: string[]
}
```

`CreateLicenseInput` 인터페이스에 추가 (63-73행 부근):
```ts
export interface CreateLicenseInput {
  name: string
  productKey?: string
  vendorId?: string
  seatsTotal: number
  purchaseDate: Date
  expiryDate?: Date
  cost?: number
  currency?: Currency
  softwareIds?: string[]
  coreDepartmentIds?: string[]
}
```

`UpdateLicenseInput` 인터페이스에 추가 (75-84행 부근):
```ts
export interface UpdateLicenseInput {
  name?: string
  productKey?: string | null
  vendorId?: string | null
  seatsTotal?: number
  purchaseDate?: Date
  expiryDate?: Date | null
  cost?: number | null
  currency?: Currency
  coreDepartmentIds?: string[]
}
```

파일 맨 아래(`LicenseRequestItem` 인터페이스 앞, 105행 부근)에 새 타입과 필드 추가:
```ts
export type LicensePriorityTier = 'CORE' | 'DEFAULT'

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
  priorityTier: LicensePriorityTier
  managerApprovedById: string | null
  managerApprovedByName: string | null
  managerApprovedAt: Date | null
  deptApprovedById: string | null
  deptApprovedByName: string | null
  deptApprovedAt: Date | null
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
```
(바뀐 건 `status` 다음 줄에 `priorityTier: LicensePriorityTier` 한 줄 추가, 그리고 파일 위쪽에 `export type LicensePriorityTier = 'CORE' | 'DEFAULT'` 추가.)

- [ ] **Step 2: zod 스키마에 필드 추가**

`src/schemas/license.schema.ts`의 `createLicenseSchema` object에 추가:
```ts
export const createLicenseSchema = z
  .object({
    name: z.string().min(1, '라이선스 이름은 필수입니다.'),
    productKey: z.string().min(1).optional(),
    vendorId: z.string().optional(),
    seatsTotal: z.number().int().positive(),
    purchaseDate: z.string().datetime(),
    expiryDate: z.string().datetime().optional(),
    cost: z.number().nonnegative().optional(),
    currency: currencyEnum.default('KRW'),
    softwareIds: z.string().array().optional(),
    coreDepartmentIds: z.string().array().optional(),
  })
  .refine((d) => !d.expiryDate || d.expiryDate >= d.purchaseDate, {
    message: '만료일은 구매일 이전일 수 없습니다.',
    path: ['expiryDate'],
  })
```

`updateLicenseSchema` object에 추가:
```ts
export const updateLicenseSchema = z
  .object({
    name: z.string().min(1).optional(),
    productKey: z.string().nullable().optional(),
    vendorId: z.string().nullable().optional(),
    seatsTotal: z.number().int().positive().optional(),
    purchaseDate: z.string().datetime().optional(),
    expiryDate: z.string().datetime().nullable().optional(),
    cost: z.number().nonnegative().nullable().optional(),
    currency: currencyEnum.optional(),
    coreDepartmentIds: z.string().array().optional(),
  })
  // 둘 다 입력된 경우에만 zod 단에서 비교. 한 쪽만 변경되는 경우는 service 가 기존 값과 비교.
  .refine((d) => !d.purchaseDate || !d.expiryDate || d.expiryDate >= d.purchaseDate, {
    message: '만료일은 구매일 이전일 수 없습니다.',
    path: ['expiryDate'],
  })
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `cd /Users/juno/asset-erp-backend && npx tsc --noEmit -p tsconfig.test.json`

Expected: `license.service.ts`에서 아직 새 필드를 안 썼기 때문에 에러 없이 통과해야 함 (인터페이스에 optional로 추가했으므로 기존 코드와 충돌 없음). 에러가 나면 위 스텝에서 오타/괄호 짝을 확인.

- [ ] **Step 4: Commit**

```bash
git add src/modules/licenses/license.types.ts src/schemas/license.schema.ts
git commit -m "feat(licenses): add coreDepartmentIds and priorityTier types"
```

---

### Task 3: `create()` / `update()` — coreDepartmentIds 저장

**Files:**
- Modify: `src/modules/licenses/license.service.ts:181-225` (`create`), `:227-271` (`update`)
- Test: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성 — create**

`src/modules/licenses/__tests__/license.service.test.ts`의 `describe('licenseService.create', ...)` 블록 안, `'USER 권한이면 403'` 테스트 앞에 추가:

```ts
  it('coreDepartmentIds를 저장한다', async () => {
    mockLicenseCreate.mockResolvedValue({ id: 'lic-1' })
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, coreDepartmentIds: ['dept-it'] })

    await licenseService.create(
      {
        name: 'Zoom Pro',
        seatsTotal: 5,
        purchaseDate: new Date('2026-01-01'),
        coreDepartmentIds: ['dept-it'],
      },
      adminCtx,
    )

    const createArgs = mockLicenseCreate.mock.calls[0]?.[0]
    expect(createArgs?.data?.coreDepartmentIds).toEqual(['dept-it'])
  })

  it('coreDepartmentIds 미지정 시 빈 배열로 저장', async () => {
    mockLicenseCreate.mockResolvedValue({ id: 'lic-1' })
    mockLicenseFindUnique.mockResolvedValue(baseLicense)

    await licenseService.create(
      { name: 'Zoom Pro', seatsTotal: 5, purchaseDate: new Date('2026-01-01') },
      adminCtx,
    )

    const createArgs = mockLicenseCreate.mock.calls[0]?.[0]
    expect(createArgs?.data?.coreDepartmentIds).toEqual([])
  })
```

또한 공유 fixture `baseLicense`(파일 상단, 97-112행 부근)에 필드 추가:
```ts
const baseLicense = {
  id: 'lic-1',
  name: 'Microsoft Office 365',
  productKey: null,
  productKeyMask: null,
  vendorId: null,
  vendor: null,
  seatsTotal: 100,
  purchaseDate: new Date('2026-01-01'),
  expiryDate: new Date('2027-01-01'),
  cost: null,
  coreDepartmentIds: [],
  assignments: [],
  softwareLinks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts -t "coreDepartmentIds"`

Expected: 2개 테스트 모두 FAIL — `createArgs?.data?.coreDepartmentIds`가 `undefined`라 `toEqual(['dept-it'])`/`toEqual([])`와 불일치.

- [ ] **Step 3: `create()` 구현 수정**

`src/modules/licenses/license.service.ts`의 `create()` 함수(197-210행) 중 `tx.license.create` 호출부:

```ts
  const created = await prisma.$transaction(async (tx) => {
    const license = await tx.license.create({
      data: {
        name: input.name,
        productKey: input.productKey ? encryptLicenseKey(input.productKey) : null,
        productKeyMask: input.productKey ? maskLicenseKey(input.productKey) : null,
        vendorId: input.vendorId ?? null,
        seatsTotal: input.seatsTotal,
        purchaseDate: input.purchaseDate,
        expiryDate: input.expiryDate ?? null,
        cost: input.cost ?? null,
        currency: input.currency ?? 'KRW',
        coreDepartmentIds: input.coreDepartmentIds ?? [],
      },
    })
```
(바뀐 건 `currency` 줄 다음에 `coreDepartmentIds: input.coreDepartmentIds ?? [],` 한 줄 추가.)

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts -t "coreDepartmentIds"`

Expected: PASS (2 tests)

- [ ] **Step 5: 실패하는 테스트 작성 — update**

`describe('licenseService.update', ...)` 블록 안, `'USER 권한 거부'` 테스트 앞에 추가:

```ts
  it('coreDepartmentIds를 갱신한다', async () => {
    mockLicenseFindUnique
      .mockResolvedValueOnce(baseLicense)
      .mockResolvedValueOnce({ ...baseLicense, coreDepartmentIds: ['dept-sales'] })
    mockLicenseUpdate.mockResolvedValue({ id: 'lic-1' })

    await licenseService.update('lic-1', { coreDepartmentIds: ['dept-sales'] }, managerCtx)

    const updateArgs = mockLicenseUpdate.mock.calls[0]?.[0]
    expect(updateArgs?.data?.coreDepartmentIds).toEqual(['dept-sales'])
  })
```

- [ ] **Step 6: 테스트 실패 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts -t "coreDepartmentIds를 갱신"`

Expected: FAIL — `update()`가 아직 `coreDepartmentIds`를 `data` 객체에 안 넣어서 `undefined`.

- [ ] **Step 7: `update()` 구현 수정**

`src/modules/licenses/license.service.ts`의 `update()` 함수, `data` object 구성부(256-267행):

```ts
  const data: Record<string, unknown> = {}
  if (input.name !== undefined) data['name'] = input.name
  if (input.vendorId !== undefined) data['vendorId'] = input.vendorId
  if (input.seatsTotal !== undefined) data['seatsTotal'] = input.seatsTotal
  if (input.purchaseDate !== undefined) data['purchaseDate'] = input.purchaseDate
  if (input.expiryDate !== undefined) data['expiryDate'] = input.expiryDate
  if (input.cost !== undefined) data['cost'] = input.cost
  if (input.currency !== undefined) data['currency'] = input.currency
  if (input.coreDepartmentIds !== undefined) data['coreDepartmentIds'] = input.coreDepartmentIds
  if (input.productKey !== undefined) {
    data['productKey'] = input.productKey ? encryptLicenseKey(input.productKey) : null
    data['productKeyMask'] = input.productKey ? maskLicenseKey(input.productKey) : null
  }
```
(바뀐 건 `currency` 줄 다음에 `if (input.coreDepartmentIds !== undefined) ...` 한 줄 추가.)

- [ ] **Step 8: 테스트 통과 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts`

Expected: 전체 PASS (기존 테스트 포함 — `baseLicense`에 필드를 추가했지만 다른 테스트들은 `coreDepartmentIds`를 assert하지 않으므로 깨지지 않아야 함)

- [ ] **Step 9: Commit**

```bash
git add src/modules/licenses/license.service.ts src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat(licenses): persist coreDepartmentIds on create/update"
```

---

### Task 4: `getById()` — coreDepartmentIds 노출

**Files:**
- Modify: `src/modules/licenses/license.service.ts:146-170` (`getById` 리턴부)
- Test: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`describe('licenseService.getById', ...)` 블록 안 아무 위치에 추가:

```ts
  it('coreDepartmentIds를 반환한다', async () => {
    mockLicenseFindUnique.mockResolvedValue({
      ...baseLicense,
      coreDepartmentIds: ['dept-it', 'dept-design'],
      assignments: [],
    })

    const result = await licenseService.getById('lic-1', adminCtx)
    expect(result.coreDepartmentIds).toEqual(['dept-it', 'dept-design'])
  })
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts -t "coreDepartmentIds를 반환"`

Expected: FAIL — `result.coreDepartmentIds`가 `undefined`.

- [ ] **Step 3: `getById()` 리턴 객체에 필드 추가**

`src/modules/licenses/license.service.ts`의 `getById()` 함수 리턴부(146-161행 부근):

```ts
  return {
    id: row.id,
    name: row.name,
    vendorId: row.vendor?.id ?? null,
    vendorName: row.vendor?.name ?? null,
    seatsTotal: row.seatsTotal,
    seatsUsed: row.assignments.length,
    coverage: calculateLicenseCoverage(row.assignments.length, row.seatsTotal, row.expiryDate),
    purchaseDate: row.purchaseDate,
    expiryDate: row.expiryDate,
    cost: row.cost ? Number(row.cost) : null,
    currency: row.currency,
    productKey,
    productKeyMask: row.productKeyMask,
    coreDepartmentIds: row.coreDepartmentIds,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    assignments: row.assignments.map((a) => ({
```
(바뀐 건 `productKeyMask` 줄 다음에 `coreDepartmentIds: row.coreDepartmentIds,` 한 줄 추가.)

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts`

Expected: 전체 PASS

- [ ] **Step 5: Commit**

```bash
git add src/modules/licenses/license.service.ts src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat(licenses): expose coreDepartmentIds via getById"
```

---

### Task 5: `listRequests()` — priorityTier 계산

**Files:**
- Modify: `src/modules/licenses/license.service.ts:721-776` (`listRequests`)
- Test: `src/modules/licenses/__tests__/license.service.test.ts`

이 태스크는 계산만 한다 (정렬은 Task 6). 계산이 맞는지 먼저 확인한 뒤 정렬을 얹는 순서.

- [ ] **Step 1: 실패하는 테스트 작성**

`describe('licenseService.listRequests', ...)` 블록 끝(`'status 필터 적용'` 테스트 다음)에 추가. 이 테스트는 mock row가 `license.coreDepartmentIds`와 `targetUser.team.departmentId`를 포함하도록 전체 row shape을 채운다 (기존 `listRequests` include가 select하는 모든 필드를 mock에도 채워야 매핑 함수가 죽지 않는다):

```ts
  it('target user가 핵심부서 소속이면 CORE, 아니면 DEFAULT', async () => {
    const baseRow = {
      licenseId: 'lic-1',
      license: { name: 'Zoom Pro', coreDepartmentIds: ['dept-it'] },
      requestedById: 'u-1',
      requestedBy: { name: 'Alice' },
      assetId: null,
      asset: null,
      status: 'PENDING_ADMIN' as const,
      managerApprovedById: null,
      managerApprovedBy: null,
      managerApprovedAt: null,
      deptApprovedById: null,
      deptApprovedBy: null,
      deptApprovedAt: null,
      securityReviewedById: null,
      securityReviewedBy: null,
      securityReviewedAt: null,
      adminApprovedById: null,
      adminApprovedBy: null,
      adminApprovedAt: null,
      rejectedById: null,
      rejectedBy: null,
      rejectedAt: null,
      rejectReason: null,
    }

    mockLRFindMany.mockResolvedValue([
      {
        ...baseRow,
        id: 'req-sales',
        targetUserId: 'u-2',
        targetUser: { name: 'Bob', team: { departmentId: 'dept-sales' } },
        createdAt: new Date('2026-01-01'),
      },
      {
        ...baseRow,
        id: 'req-it',
        targetUserId: 'u-4',
        targetUser: { name: 'Dave', team: { departmentId: 'dept-it' } },
        createdAt: new Date('2026-01-02'),
      },
    ])

    const result = await licenseService.listRequests('lic-1', {}, adminCtx)

    const byId = new Map(result.map((r) => [r.id, r.priorityTier]))
    expect(byId.get('req-it')).toBe('CORE')
    expect(byId.get('req-sales')).toBe('DEFAULT')
  })

  it('targetUser에 team이 없으면 DEFAULT', async () => {
    mockLRFindMany.mockResolvedValue([
      {
        id: 'req-1',
        licenseId: 'lic-1',
        license: { name: 'Zoom Pro', coreDepartmentIds: ['dept-it'] },
        requestedById: 'u-1',
        requestedBy: { name: 'Alice' },
        targetUserId: 'u-2',
        targetUser: { name: 'Bob', team: null },
        assetId: null,
        asset: null,
        status: 'PENDING_ADMIN' as const,
        managerApprovedById: null,
        managerApprovedBy: null,
        managerApprovedAt: null,
        deptApprovedById: null,
        deptApprovedBy: null,
        deptApprovedAt: null,
        securityReviewedById: null,
        securityReviewedBy: null,
        securityReviewedAt: null,
        adminApprovedById: null,
        adminApprovedBy: null,
        adminApprovedAt: null,
        rejectedById: null,
        rejectedBy: null,
        rejectedAt: null,
        rejectReason: null,
        createdAt: new Date('2026-01-01'),
      },
    ])

    const result = await licenseService.listRequests('lic-1', {}, adminCtx)
    expect(result[0]?.priorityTier).toBe('DEFAULT')
  })
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts -t "CORE"`

Expected: FAIL — `r.priorityTier`가 `undefined`이거나, `include`에 `team`/`coreDepartmentIds`를 안 가져와서 mock row 자체가 무시됨.

- [ ] **Step 3: `listRequests()` 구현 수정**

`src/modules/licenses/license.service.ts`의 `listRequests()` 함수(721-776행) 전체를 다음으로 교체:

```ts
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
      license: { select: { name: true, coreDepartmentIds: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true, team: { select: { departmentId: true } } } },
      asset: { select: { assetCode: true } },
      managerApprovedBy: { select: { name: true } },
      deptApprovedBy: { select: { name: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const items = rows.map((row) => {
    const targetDeptId = row.targetUser.team?.departmentId ?? null
    const priorityTier: LicensePriorityTier =
      targetDeptId && row.license.coreDepartmentIds.includes(targetDeptId) ? 'CORE' : 'DEFAULT'

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
      priorityTier,
      managerApprovedById: row.managerApprovedById,
      managerApprovedByName: row.managerApprovedBy?.name ?? null,
      managerApprovedAt: row.managerApprovedAt,
      deptApprovedById: row.deptApprovedById,
      deptApprovedByName: row.deptApprovedBy?.name ?? null,
      deptApprovedAt: row.deptApprovedAt,
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
  })

  return items
}
```

(이 스텝에서는 정렬 없이 `items`를 그대로 리턴 — 계산만 검증. Task 6에서 정렬을 추가한다.)

`license.service.ts` 파일 상단 import에 `LicensePriorityTier` 타입 추가 (기존 `LicenseRequestItem` 등을 import하는 구문 근처):
```ts
import type {
  CreateLicenseInput,
  UpdateLicenseInput,
  ListLicensesQuery,
  LicenseListItem,
  LicenseDetail,
  RequesterContext,
  PaginatedResult,
  LicenseRequestItem,
  LicenseRequestStatus,
  LicensePriorityTier,
  CreateLicenseRequestInput,
  RejectLicenseRequestInput,
```
(바뀐 건 `LicenseRequestStatus` 다음 줄에 `LicensePriorityTier,` 추가 — 나머지 줄은 이미 있던 그대로.)

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts`

Expected: 전체 PASS

- [ ] **Step 5: Commit**

```bash
git add src/modules/licenses/license.service.ts src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat(licenses): compute priorityTier in listRequests"
```

---

### Task 6: `listRequests()` — CORE 우선 정렬

**Files:**
- Modify: `src/modules/licenses/license.service.ts` (`listRequests`)
- Test: `src/modules/licenses/__tests__/license.service.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

Task 5의 `'target user가 핵심부서 소속이면 CORE, 아니면 DEFAULT'` 테스트를 아래로 **교체** (정렬 순서까지 검증하도록 확장):

```ts
  it('target user가 핵심부서 소속이면 CORE, 아니면 DEFAULT — CORE가 먼저 정렬', async () => {
    const baseRow = {
      licenseId: 'lic-1',
      license: { name: 'Zoom Pro', coreDepartmentIds: ['dept-it'] },
      requestedById: 'u-1',
      requestedBy: { name: 'Alice' },
      assetId: null,
      asset: null,
      status: 'PENDING_ADMIN' as const,
      managerApprovedById: null,
      managerApprovedBy: null,
      managerApprovedAt: null,
      deptApprovedById: null,
      deptApprovedBy: null,
      deptApprovedAt: null,
      securityReviewedById: null,
      securityReviewedBy: null,
      securityReviewedAt: null,
      adminApprovedById: null,
      adminApprovedBy: null,
      adminApprovedAt: null,
      rejectedById: null,
      rejectedBy: null,
      rejectedAt: null,
      rejectReason: null,
    }

    // findMany의 orderBy: createdAt desc 를 흉내내서 mock도 최신순으로 준다
    // (req-sales-old가 가장 최근, req-it-old가 가장 오래됨) — 정렬이 진짜로
    // priorityTier를 기준으로 재배치하는지 확인하기 위해 일부러 DEFAULT를 먼저 둔다.
    mockLRFindMany.mockResolvedValue([
      {
        ...baseRow,
        id: 'req-sales',
        targetUserId: 'u-2',
        targetUser: { name: 'Bob', team: { departmentId: 'dept-sales' } },
        createdAt: new Date('2026-01-03'),
      },
      {
        ...baseRow,
        id: 'req-it-new',
        targetUserId: 'u-3',
        targetUser: { name: 'Carol', team: { departmentId: 'dept-it' } },
        createdAt: new Date('2026-01-02'),
      },
      {
        ...baseRow,
        id: 'req-it-old',
        targetUserId: 'u-4',
        targetUser: { name: 'Dave', team: { departmentId: 'dept-it' } },
        createdAt: new Date('2026-01-01'),
      },
    ])

    const result = await licenseService.listRequests('lic-1', {}, adminCtx)

    // CORE(req-it-new, req-it-old, 최신순) 먼저, 그다음 DEFAULT(req-sales)
    expect(result.map((r) => r.id)).toEqual(['req-it-new', 'req-it-old', 'req-sales'])
    expect(result.map((r) => r.priorityTier)).toEqual(['CORE', 'CORE', 'DEFAULT'])
  })
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts -t "CORE가 먼저 정렬"`

Expected: FAIL — 현재 구현은 Prisma의 `orderBy: { createdAt: 'desc' }` 순서 그대로 반환하므로 `['req-sales', 'req-it-new', 'req-it-old']` 순서가 나와 `toEqual`이 실패.

- [ ] **Step 3: 정렬 로직 추가**

`src/modules/licenses/license.service.ts`의 `listRequests()` 함수 전체를 다음으로 교체 (Task 5의 버전에서 바뀐 건 `return items` 앞에 `tierRank`/`sort` 두 줄이 추가된 것뿐):

```ts
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
      license: { select: { name: true, coreDepartmentIds: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true, team: { select: { departmentId: true } } } },
      asset: { select: { assetCode: true } },
      managerApprovedBy: { select: { name: true } },
      deptApprovedBy: { select: { name: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const items = rows.map((row) => {
    const targetDeptId = row.targetUser.team?.departmentId ?? null
    const priorityTier: LicensePriorityTier =
      targetDeptId && row.license.coreDepartmentIds.includes(targetDeptId) ? 'CORE' : 'DEFAULT'

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
      priorityTier,
      managerApprovedById: row.managerApprovedById,
      managerApprovedByName: row.managerApprovedBy?.name ?? null,
      managerApprovedAt: row.managerApprovedAt,
      deptApprovedById: row.deptApprovedById,
      deptApprovedByName: row.deptApprovedBy?.name ?? null,
      deptApprovedAt: row.deptApprovedAt,
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
  })

  const tierRank: Record<LicensePriorityTier, number> = { CORE: 0, DEFAULT: 1 }
  items.sort((a, b) => tierRank[a.priorityTier] - tierRank[b.priorityTier])

  return items
}
```

(Prisma 쿼리가 이미 `createdAt desc`로 정렬해서 가져오므로, `items.sort`는 안정 정렬(stable sort — Node.js의 `Array.prototype.sort`는 ES2019부터 표준으로 안정 정렬 보장)이라 같은 tier 안에서는 `createdAt desc` 순서가 그대로 유지된다. 별도로 `createdAt` 기준 재정렬할 필요 없음.)

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx jest src/modules/licenses/__tests__/license.service.test.ts`

Expected: 전체 PASS

- [ ] **Step 5: Commit**

```bash
git add src/modules/licenses/license.service.ts src/modules/licenses/__tests__/license.service.test.ts
git commit -m "feat(licenses): sort request queue with CORE priority first"
```

---

### Task 7: 전체 검증

**Files:** 없음 (검증만)

- [ ] **Step 1: 전체 테스트 스위트 실행**

Run: `cd /Users/juno/asset-erp-backend && npx jest`

Expected: 모든 테스트 스위트 PASS (license 모듈 외 다른 모듈은 이번 변경과 무관하므로 원래 통과 상태 유지되어야 함).

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit -p tsconfig.test.json`

Expected: 에러 없음.

- [ ] **Step 3: lint**

Run: `npx eslint src/modules/licenses src/schemas/license.schema.ts`

Expected: 에러 없음 (경고는 기존 컨벤션에 따라 허용 범위 확인).

- [ ] **Step 4: 최종 커밋 (있다면 정리 커밋)**

```bash
git status --short
```
위 스텝들에서 이미 각 태스크마다 커밋했으므로, 여기서는 빠진 변경사항이 없는지만 확인. 있으면:
```bash
git add -A
git commit -m "chore(licenses): finalize priority tier implementation"
```
