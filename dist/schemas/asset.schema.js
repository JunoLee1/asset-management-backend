"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAssetsQuerySchema = exports.updateAssetSchema = exports.createAssetSchema = void 0;
const zod_1 = require("zod");
// ── Enums ─────────────────────────────────────────────────────────────────────
const assetClassEnum = zod_1.z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET']);
const assetStatusEnum = zod_1.z.enum([
    'OPERATING',
    'IDLE',
    'STANDBY',
    'REPAIR',
    'PENDING_DISPOSAL',
    'UNDER_CONSTRUCTION',
    'RETIRED',
]);
const assetConditionEnum = zod_1.z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']);
const ownershipTypeEnum = zod_1.z.enum(['COMPANY_OWNED', 'PERSONAL']);
// ── 전용테이블 입력 ────────────────────────────────────────────────────────────
const hardwareInputSchema = zod_1.z.object({
    serialNo: zod_1.z.string().min(1, '시리얼 번호는 필수입니다.'),
    macAddr: zod_1.z.string().optional(),
    ipAddr: zod_1.z.string().optional(),
    cpu: zod_1.z.string().optional(),
    ramGb: zod_1.z.number().int().positive().optional(),
    storageGb: zod_1.z.number().int().positive().optional(),
    warrantyEnd: zod_1.z.string().datetime().optional(),
});
const softwareInputSchema = zod_1.z.object({
    licenseKey: zod_1.z.string().min(1, '라이선스 키는 필수입니다.'),
    licenseSeats: zod_1.z.number().int().positive(),
    installedCount: zod_1.z.number().int().nonnegative().optional(),
    expiryDate: zod_1.z.string().datetime().optional(),
    version: zod_1.z.string().optional(),
});
const peripheralInputSchema = zod_1.z.object({
    serialNo: zod_1.z.string().min(1).optional(),
    quantity: zod_1.z.number().int().positive().optional(),
});
const officeInputSchema = zod_1.z.object({
    modelName: zod_1.z.string().min(1, '모델명은 필수입니다.'),
});
const facilityInputSchema = zod_1.z.object({
    installLocationDetail: zod_1.z.string().min(1, '설치 위치는 필수입니다.'),
    installDate: zod_1.z.string().datetime({ message: '설치 일자는 필수입니다.' }),
    inspectionCycleMonths: zod_1.z
        .number({ message: '점검 주기는 필수입니다.' })
        .int()
        .positive('점검 주기는 1 이상이어야 합니다.'),
    nextInspectionDate: zod_1.z.string().datetime({ message: '다음 점검 예정일은 필수입니다.' }),
});
const networkInputSchema = zod_1.z.object({
    ipAddress: zod_1.z.string().optional(),
    macAddress: zod_1.z.string().optional(),
    vlan: zod_1.z.string().optional(),
    port: zod_1.z.string().optional(),
});
// ── 코어 입력 (공통) ──────────────────────────────────────────────────────────
// assetCode는 빈 문자열/누락 시 서버에서 자동 채번 (HAR-0001 형식)
const coreCreateSchema = zod_1.z.object({
    assetCode: zod_1.z.string().default(''),
    name: zod_1.z.string().min(1, '자산명은 필수입니다.'),
    description: zod_1.z.string().optional(),
    status: assetStatusEnum.optional(),
    condition: assetConditionEnum.optional(),
    conditionAssessedAt: zod_1.z.string().datetime().optional(),
    ownershipType: ownershipTypeEnum.optional(),
    purchaseDate: zod_1.z.string().datetime({ message: '구매일은 필수입니다.' }),
    purchasePrice: zod_1.z
        .number({ message: '구매가는 필수입니다.' })
        .nonnegative('구매가는 0 이상이어야 합니다.'),
    currentValue: zod_1.z.number().nonnegative().optional(),
    imageUrl: zod_1.z.string().url().optional(),
    categoryId: zod_1.z.string().min(1),
    departmentId: zod_1.z.string().min(1),
    locationId: zod_1.z.string().min(1),
    vendorId: zod_1.z.string().optional(),
    assignedUserId: zod_1.z.string().optional(),
});
// ── createAssetSchema ────────────────────────────────────────────────────────
// 전용 필드(hardware/software/peripheral)는 category.subType 기준으로 서비스에서 검증
exports.createAssetSchema = coreCreateSchema.extend({
    class: assetClassEnum,
    hardware: hardwareInputSchema.optional(),
    software: softwareInputSchema.optional(),
    peripheral: peripheralInputSchema.optional(),
    office: officeInputSchema.optional(),
    facility: facilityInputSchema.optional(),
    network: networkInputSchema.optional(),
});
// ── 전용 필드 부분 업데이트 (모든 필드 옵션) ────────────────────────────────
const hardwareUpdateSchema = zod_1.z
    .object({
    serialNo: zod_1.z.string().min(1).optional(),
    macAddr: zod_1.z.string().nullable().optional(),
    ipAddr: zod_1.z.string().nullable().optional(),
    cpu: zod_1.z.string().nullable().optional(),
    ramGb: zod_1.z.number().int().positive().nullable().optional(),
    storageGb: zod_1.z.number().int().positive().nullable().optional(),
    warrantyEnd: zod_1.z.string().datetime().nullable().optional(),
})
    .strict();
const softwareUpdateSchema = zod_1.z
    .object({
    licenseKey: zod_1.z.string().min(1).optional(),
    licenseSeats: zod_1.z.number().int().positive().optional(),
    installedCount: zod_1.z.number().int().nonnegative().optional(),
    expiryDate: zod_1.z.string().datetime().nullable().optional(),
    version: zod_1.z.string().nullable().optional(),
})
    .strict();
const peripheralUpdateSchema = zod_1.z
    .object({
    serialNo: zod_1.z.string().min(1).nullable().optional(),
    quantity: zod_1.z.number().int().positive().optional(),
})
    .strict();
// ── updateAssetSchema ────────────────────────────────────────────────────────
// class, assetCode는 수정 불가
// hardware/software/peripheral는 자산의 현재 class와 일치해야 함 (service에서 검증)
exports.updateAssetSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().nullable().optional(),
    status: assetStatusEnum.optional(),
    condition: assetConditionEnum.optional(),
    conditionAssessedAt: zod_1.z.string().datetime().nullable().optional(),
    ownershipType: ownershipTypeEnum.optional(),
    purchaseDate: zod_1.z.string().datetime().optional(),
    purchasePrice: zod_1.z.number().nonnegative().optional(),
    currentValue: zod_1.z.number().nonnegative().nullable().optional(),
    imageUrl: zod_1.z.string().url().nullable().optional(),
    categoryId: zod_1.z.string().min(1).optional(),
    departmentId: zod_1.z.string().min(1).optional(),
    locationId: zod_1.z.string().min(1).optional(),
    vendorId: zod_1.z.string().nullable().optional(),
    assignedUserId: zod_1.z.string().nullable().optional(),
    hardware: hardwareUpdateSchema.optional(),
    software: softwareUpdateSchema.optional(),
    peripheral: peripheralUpdateSchema.optional(),
    reason: zod_1.z.string().min(1).optional(),
})
    .strict() // class, assetCode 등 알려지지 않은 키 거부
    .refine((data) => Object.keys(data).length > 0, {
    message: '수정할 필드가 최소 1개 필요합니다.',
});
// ── listAssetsQuerySchema ────────────────────────────────────────────────────
const numericString = zod_1.z
    .union([zod_1.z.string(), zod_1.z.number()])
    .transform((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
    .pipe(zod_1.z.number().int());
exports.listAssetsQuerySchema = zod_1.z.object({
    page: numericString.pipe(zod_1.z.number().int().positive()).default(1),
    pageSize: numericString.pipe(zod_1.z.number().int().positive().max(100)).default(20),
    class: assetClassEnum.optional(),
    status: assetStatusEnum.optional(),
    condition: assetConditionEnum.optional(),
    categoryId: zod_1.z.string().optional(),
    departmentId: zod_1.z.string().optional(),
    locationId: zod_1.z.string().optional(),
    assignedUserId: zod_1.z.string().optional(),
    q: zod_1.z.string().optional(),
    // P3-B: USER 가 대여 가능 자산 목록 보기 위해 본인 필터 우회 + AVAILABLE 만
    available: zod_1.z
        .union([zod_1.z.string(), zod_1.z.boolean()])
        .transform((v) => (typeof v === 'boolean' ? v : v === 'true'))
        .optional(),
});
//# sourceMappingURL=asset.schema.js.map