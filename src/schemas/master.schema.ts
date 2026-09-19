import { z } from 'zod'
import { validateKrBusinessNumber } from '../lib/krBusinessNumber'

const assetClass = z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET'])
const assetSubType = z.enum(['HARDWARE', 'SOFTWARE', 'PERIPHERAL'])

const requireOneField = <T extends z.ZodTypeAny>(schema: T) =>
  schema.refine((data: unknown) => typeof data === 'object' && data !== null && Object.keys(data).length > 0, {
    message: '수정할 필드가 최소 1개 필요합니다.',
  })

// ── Department ──────────────────────────────────────────────────────────────
export const createDepartmentSchema = z.object({
  name: z.string().min(1, '부서명은 필수입니다.'),
  code: z.string().min(1, '부서 코드는 필수입니다.'),
  locationId: z.string().optional(),
  officeBuilding: z.string().optional(),
  officeFloor: z.string().optional(),
  officeRoom: z.string().optional(),
})

export const updateDepartmentSchema = requireOneField(
  z
    .object({
      name: z.string().min(1).optional(),
      code: z.string().min(1).optional(),
      locationId: z.string().nullable().optional(),
      officeBuilding: z.string().nullable().optional(),
      officeFloor: z.string().nullable().optional(),
      officeRoom: z.string().nullable().optional(),
    })
    .strict(),
)

// ── Team ─────────────────────────────────────────────────────────────────────
export const createTeamSchema = z.object({
  name: z.string().min(1, '팀명은 필수입니다.'),
  code: z.string().min(1, '팀 코드는 필수입니다.'),
  departmentId: z.string().min(1, '부서 ID는 필수입니다.'),
  teamLeadId: z.string().optional(),
  locationId: z.string().optional(),
})

export const updateTeamSchema = requireOneField(
  z
    .object({
      name: z.string().min(1).optional(),
      code: z.string().min(1).optional(),
      departmentId: z.string().min(1).optional(),
      teamLeadId: z.string().nullable().optional(),
      locationId: z.string().nullable().optional(),
    })
    .strict(),
)

// ── Location ─────────────────────────────────────────────────────────────────
export const createLocationSchema = z.object({
  name: z.string().min(1, '위치명은 필수입니다.'),
  building: z.string().min(1, '건물명은 필수입니다.'),
  floor: z.string().optional(),
  room: z.string().optional(),
})

export const updateLocationSchema = requireOneField(
  z
    .object({
      name: z.string().min(1).optional(),
      building: z.string().min(1).optional(),
      floor: z.string().nullable().optional(),
      room: z.string().nullable().optional(),
    })
    .strict(),
)

const paymentTerms = z.enum(['MONTH_END', 'PER_CASE', 'DAYS_AFTER'])
const taxInvoiceMethod = z.enum(['EMAIL', 'FAX', 'POST'])

// ── Vendor ───────────────────────────────────────────────────────────────────
const vendorType = z.enum(['REPAIR', 'SOFTWARE'])
const repairProcessStep = z.enum(['RECEIVED', 'DIAGNOSING', 'REPAIRING', 'COMPLETED'])

const businessRegistrationNumberSchema = z
  .string()
  .min(1, '사업자등록번호는 필수입니다.')
  .refine(validateKrBusinessNumber, { message: '사업자등록번호 체크섬이 유효하지 않습니다.' })

const vendorProductSchema = z.object({
  name: z.string().min(1),
  sku: z.string().optional(),
  category: z.string().optional(),
  demoUrl: z.string().url().optional(),
})

const vendorCertificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().optional(),
  issuedAt: z.string().optional(),
  expiresAt: z.string().optional(),
})

const vendorTechnicianSchema = z.object({
  name: z.string().min(1),
  certifications: z.array(z.string()).optional().default([]),
  yearsOfExp: z.number().int().nonnegative().optional(),
})

const vendorEquipmentSchema = z.object({
  name: z.string().min(1),
  model: z.string().optional(),
  photoUrl: z.string().optional(),
})

export const createVendorSchema = z.object({
  name: z.string().min(1, '공급업체명은 필수입니다.'),
  type: vendorType.optional(),
  contactName: z.string().optional(),
  email: z.string().email('올바른 이메일 형식이 아닙니다.').optional(),
  phone: z.string().optional(),
  supportedClasses: z.array(assetClass).optional(),
  serviceRegion: z.string().optional(),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),
  slaHours: z.number().int().positive().optional(),
  canVisitOnSite: z.boolean().optional(),
  canReceiveDevice: z.boolean().optional(),
  // 기본정보
  businessRegistrationNumber: businessRegistrationNumberSchema.optional(),
  ceoName: z.string().optional(),
  businessType: z.string().optional(),
  businessItem: z.string().optional(),
  addressHeadOffice: z.string().optional(),
  addressDetail: z.string().optional(),
  addressBusiness: z.string().optional(),
  contactDepartment: z.string().optional(),
  contactPosition: z.string().optional(),
  // 서비스범위
  operatingHoursStart: z.string().optional(),
  operatingHoursEnd: z.string().optional(),
  operatesOnWeekend: z.boolean().optional(),
  canHandleUrgent: z.boolean().optional(),
  urgentConditionNote: z.string().optional(),
  brandModelNote: z.string().optional(),
  // 정산정보
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankAccountHolder: z.string().optional(),
  paymentTerms: paymentTerms.optional(),
  paymentDaysAfter: z.number().int().optional(),
  taxInvoiceEmail: z.string().email().optional(),
  taxInvoiceMethod: taxInvoiceMethod.optional(),
  faxNumber: z.string().optional(),
  postalAddress: z.string().optional(),
  isVatIncluded: z.boolean().optional(),
  isWithholdingTax: z.boolean().optional(),
  // SLA/계약
  slaCompletionDays: z.number().int().optional(),
  penaltyTerms: z.string().optional(),
  repairWarrantyDays: z.number().int().optional(),
  unitPriceNote: z.string().optional(),
  // 수리업체 프로세스
  supportedSteps: z.array(repairProcessStep).optional(),
  stepSlaHours: z.record(repairProcessStep, z.number().int().positive()).optional(),
  // 자식 모델
  products: z.array(vendorProductSchema).optional(),
  certifications: z.array(vendorCertificationSchema).optional(),
  technicians: z.array(vendorTechnicianSchema).optional(),
  equipment: z.array(vendorEquipmentSchema).optional(),
})

export const updateVendorSchema = requireOneField(
  z
    .object({
      name: z.string().min(1).optional(),
      type: vendorType.optional(),
      contactName: z.string().nullable().optional(),
      email: z.string().email().nullable().optional(),
      phone: z.string().nullable().optional(),
      supportedClasses: z.array(assetClass).nullable().optional(),
      serviceRegion: z.string().nullable().optional(),
      contractStartDate: z.string().nullable().optional(),
      contractEndDate: z.string().nullable().optional(),
      slaHours: z.number().int().positive().nullable().optional(),
      canVisitOnSite: z.boolean().optional(),
      canReceiveDevice: z.boolean().optional(),
      // 기본정보
      businessRegistrationNumber: z.string().nullable().optional(),
      ceoName: z.string().nullable().optional(),
      businessType: z.string().nullable().optional(),
      businessItem: z.string().nullable().optional(),
      addressHeadOffice: z.string().nullable().optional(),
      addressDetail: z.string().nullable().optional(),
      addressBusiness: z.string().nullable().optional(),
      contactDepartment: z.string().nullable().optional(),
      contactPosition: z.string().nullable().optional(),
      // 서비스범위
      operatingHoursStart: z.string().nullable().optional(),
      operatingHoursEnd: z.string().nullable().optional(),
      operatesOnWeekend: z.boolean().optional(),
      canHandleUrgent: z.boolean().optional(),
      urgentConditionNote: z.string().nullable().optional(),
      brandModelNote: z.string().nullable().optional(),
      // 서비스범위 — ADR 0007 note 필드
      supportedSteps: z.array(repairProcessStep).nullable().optional(),
      stepSlaHours: z.record(repairProcessStep, z.number().int().positive()).nullable().optional(),
      repairableItemsNote: z.string().nullable().optional(),
      referenceNote: z.string().nullable().optional(),
      techCertificationNote: z.string().nullable().optional(),
      equipmentNote: z.string().nullable().optional(),
      processNote: z.string().nullable().optional(),
      disposalProcedureNote: z.string().nullable().optional(),
      insuranceNote: z.string().nullable().optional(),
      softwareDomain: z.string().nullable().optional(),
      productListNote: z.string().nullable().optional(),
      skuNote: z.string().nullable().optional(),
      deliveryNote: z.string().nullable().optional(),
      maintenancePolicyNote: z.string().nullable().optional(),
      techStaffCount: z.number().int().nonnegative().nullable().optional(),
      certificationNote: z.string().nullable().optional(),
      financialNote: z.string().nullable().optional(),
      canDemo: z.boolean().optional(),
      demoNote: z.string().nullable().optional(),
      // 정산정보
      bankName: z.string().nullable().optional(),
      bankAccountNumber: z.string().nullable().optional(),
      bankAccountHolder: z.string().nullable().optional(),
      paymentTerms: paymentTerms.nullable().optional(),
      paymentDaysAfter: z.number().int().nullable().optional(),
      taxInvoiceEmail: z.string().email().nullable().optional(),
      taxInvoiceMethod: taxInvoiceMethod.nullable().optional(),
      faxNumber: z.string().nullable().optional(),
      postalAddress: z.string().nullable().optional(),
      isVatIncluded: z.boolean().optional(),
      isWithholdingTax: z.boolean().optional(),
      // SLA/계약
      slaCompletionDays: z.number().int().nullable().optional(),
      penaltyTerms: z.string().nullable().optional(),
      repairWarrantyDays: z.number().int().nullable().optional(),
      unitPriceNote: z.string().nullable().optional(),
    })
    .strict(),
)

export const submitVendorSchema = z.object({})
export const rejectVendorSchema = z.object({ reason: z.string().min(1) })
export const blacklistVendorSchema = z.object({ reason: z.string().min(1) })

// ── AssetCategory ────────────────────────────────────────────────────────────
export const createAssetCategorySchema = z.object({
  name: z.string().min(1, '카테고리명은 필수입니다.'),
  code: z.string().min(1, '카테고리 코드는 필수입니다.'),
  class: assetClass.optional(),
  subType: assetSubType.optional(), // IT_ASSET 카테고리에서만 유효
  parentId: z.string().optional(),
})

// class/subType 변경은 위험 (전용테이블 분기점) → 수정 불가
export const updateAssetCategorySchema = requireOneField(
  z
    .object({
      name: z.string().min(1).optional(),
      code: z.string().min(1).optional(),
      parentId: z.string().nullable().optional(),
    })
    .strict(),
)

// ── Types ────────────────────────────────────────────────────────────────────
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>
export type CreateLocationInput = z.infer<typeof createLocationSchema>
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>
export type CreateVendorInput = z.infer<typeof createVendorSchema>
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>
export type RejectVendorInput = z.infer<typeof rejectVendorSchema>
export type BlacklistVendorInput = z.infer<typeof blacklistVendorSchema>
export type CreateAssetCategoryInput = z.infer<typeof createAssetCategorySchema>
export type UpdateAssetCategoryInput = z.infer<typeof updateAssetCategorySchema>
