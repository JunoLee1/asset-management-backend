import { z } from 'zod'

// ── Enums ─────────────────────────────────────────────────────────────────────
const assetClassEnum = z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET'])
const currencyEnum = z.enum(['KRW', 'USD', 'EUR', 'GBP', 'JPY'])
const assetStatusEnum = z.enum([
  'OPERATING',
  'IDLE',
  'STANDBY',
  'REPAIR',
  'PENDING_DISPOSAL',
  'UNDER_CONSTRUCTION',
  'RETIRED',
])
const assetConditionEnum = z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR'])
const ownershipTypeEnum = z.enum(['COMPANY_OWNED', 'PERSONAL'])

// ── 전용테이블 입력 ────────────────────────────────────────────────────────────
const hardwareInputSchema = z.object({
  serialNo: z.string().min(1, '시리얼 번호는 필수입니다.'),
  macAddr: z.string().optional(),
  ipAddr: z.string().optional(),
  cpu: z.string().optional(),
  ramGb: z.number().int().positive().optional(),
  storageGb: z.number().int().positive().optional(),
  warrantyEnd: z.string().datetime().optional(),
})

const softwareInputSchema = z.object({
  licenseKey: z.string().min(1, '라이선스 키는 필수입니다.'),
  licenseSeats: z.number().int().positive(),
  installedCount: z.number().int().nonnegative().optional(),
  expiryDate: z.string().datetime().optional(),
  version: z.string().optional(),
})

const peripheralInputSchema = z.object({
  serialNo: z.string().min(1).optional(),
  quantity: z.number().int().positive().optional(),
})

const officeInputSchema = z.object({
  modelName: z.string().min(1, '모델명은 필수입니다.'),
})

const facilityInputSchema = z.object({
  installLocationDetail: z.string().min(1, '설치 위치는 필수입니다.'),
  installDate: z.string().datetime({ message: '설치 일자는 필수입니다.' }),
  inspectionCycleMonths: z
    .number({ message: '점검 주기는 필수입니다.' })
    .int()
    .positive('점검 주기는 1 이상이어야 합니다.'),
  nextInspectionDate: z.string().datetime({ message: '다음 점검 예정일은 필수입니다.' }),
})

const networkInputSchema = z.object({
  ipAddress: z.string().optional(),
  macAddress: z.string().optional(),
  vlan: z.string().optional(),
  port: z.string().optional(),
})

// ── 코어 입력 (공통) ──────────────────────────────────────────────────────────
// assetCode는 빈 문자열/누락 시 서버에서 자동 채번 (HAR-0001 형식)
const coreCreateSchema = z.object({
  assetCode: z.string().default(''),
  name: z.string().min(1, '자산명은 필수입니다.'),
  description: z.string().optional(),
  status: assetStatusEnum.optional(),
  condition: assetConditionEnum.optional(),
  conditionAssessedAt: z.string().datetime().optional(),
  ownershipType: ownershipTypeEnum.optional(),
  purchaseDate: z.string().datetime({ message: '구매일은 필수입니다.' }),
  purchasePrice: z
    .number({ message: '구매가는 필수입니다.' })
    .nonnegative('구매가는 0 이상이어야 합니다.'),
  purchaseCurrency: currencyEnum.default('KRW'),
  currentValue: z.number().nonnegative().optional(),
  imageUrl: z.string().url().optional(),
  categoryId: z.string().min(1),
  catalogId: z.string().min(1, '모델(catalog) 선택은 필수입니다.'),
  departmentId: z.string().min(1),
  locationId: z.string().min(1),
  vendorId: z.string().optional(),
  assignedUserId: z.string().optional(),
})

// ── createAssetSchema ────────────────────────────────────────────────────────
// 전용 필드(hardware/software/peripheral)는 category.subType 기준으로 서비스에서 검증
export const createAssetSchema = coreCreateSchema.extend({
  class: assetClassEnum,
  hardware: hardwareInputSchema.optional(),
  software: softwareInputSchema.optional(),
  peripheral: peripheralInputSchema.optional(),
  office: officeInputSchema.optional(),
  facility: facilityInputSchema.optional(),
  network: networkInputSchema.optional(),
})

// ── 전용 필드 부분 업데이트 (모든 필드 옵션) ────────────────────────────────
const hardwareUpdateSchema = z
  .object({
    serialNo: z.string().min(1).optional(),
    macAddr: z.string().nullable().optional(),
    ipAddr: z.string().nullable().optional(),
    cpu: z.string().nullable().optional(),
    ramGb: z.number().int().positive().nullable().optional(),
    storageGb: z.number().int().positive().nullable().optional(),
    warrantyEnd: z.string().datetime().nullable().optional(),
  })
  .strict()

const softwareUpdateSchema = z
  .object({
    licenseKey: z.string().min(1).optional(),
    licenseSeats: z.number().int().positive().optional(),
    installedCount: z.number().int().nonnegative().optional(),
    expiryDate: z.string().datetime().nullable().optional(),
    version: z.string().nullable().optional(),
  })
  .strict()

const peripheralUpdateSchema = z
  .object({
    serialNo: z.string().min(1).nullable().optional(),
    quantity: z.number().int().positive().optional(),
  })
  .strict()

// ── updateAssetSchema ────────────────────────────────────────────────────────
// class, assetCode는 수정 불가
// hardware/software/peripheral는 자산의 현재 class와 일치해야 함 (service에서 검증)
export const updateAssetSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().nullable().optional(),
    status: assetStatusEnum.optional(),
    condition: assetConditionEnum.optional(),
    conditionAssessedAt: z.string().datetime().nullable().optional(),
    ownershipType: ownershipTypeEnum.optional(),
    purchaseDate: z.string().datetime().optional(),
    purchasePrice: z.number().nonnegative().optional(),
    purchaseCurrency: currencyEnum.optional(),
    currentValue: z.number().nonnegative().nullable().optional(),
    imageUrl: z.string().url().nullable().optional(),
    categoryId: z.string().min(1).optional(),
    catalogId: z.string().min(1).optional(),
    departmentId: z.string().min(1).optional(),
    locationId: z.string().min(1).optional(),
    vendorId: z.string().nullable().optional(),
    assignedUserId: z.string().nullable().optional(),
    hardware: hardwareUpdateSchema.optional(),
    software: softwareUpdateSchema.optional(),
    peripheral: peripheralUpdateSchema.optional(),
    reason: z.string().min(1).optional(),
  })
  .strict() // class, assetCode 등 알려지지 않은 키 거부
  .refine((data) => Object.keys(data).length > 0, {
    message: '수정할 필드가 최소 1개 필요합니다.',
  })

// ── listAssetsQuerySchema ────────────────────────────────────────────────────
const numericString = z
  .union([z.string(), z.number()])
  .transform((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
  .pipe(z.number().int())

export const listAssetsQuerySchema = z.object({
  page: numericString.pipe(z.number().int().positive()).default(1),
  pageSize: numericString.pipe(z.number().int().positive().max(100)).default(20),
  class: assetClassEnum.optional(),
  status: assetStatusEnum.optional(),
  condition: assetConditionEnum.optional(),
  categoryId: z.string().optional(),
  catalogId: z.string().optional(),
  departmentId: z.string().optional(),
  locationId: z.string().optional(),
  assignedUserId: z.string().optional(),
  q: z.string().optional(),
  // P3-B: USER 가 대여 가능 자산 목록 보기 위해 본인 필터 우회 + AVAILABLE 만
  available: z
    .union([z.string(), z.boolean()])
    .transform((v) => (typeof v === 'boolean' ? v : v === 'true'))
    .optional(),
})

export type CreateAssetInput = z.infer<typeof createAssetSchema>
export type UpdateAssetInput = z.infer<typeof updateAssetSchema>
export type ListAssetsQuery = z.infer<typeof listAssetsQuerySchema>
