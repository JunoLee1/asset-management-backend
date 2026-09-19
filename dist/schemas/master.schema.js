"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssetCategorySchema = exports.createAssetCategorySchema = exports.blacklistVendorSchema = exports.rejectVendorSchema = exports.submitVendorSchema = exports.updateVendorSchema = exports.createVendorSchema = exports.updateLocationSchema = exports.createLocationSchema = exports.updateTeamSchema = exports.createTeamSchema = exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
const assetClass = zod_1.z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET']);
const assetSubType = zod_1.z.enum(['HARDWARE', 'SOFTWARE', 'PERIPHERAL']);
const requireOneField = (schema) => schema.refine((data) => typeof data === 'object' && data !== null && Object.keys(data).length > 0, {
    message: '수정할 필드가 최소 1개 필요합니다.',
});
// ── Team ───────────────────────────────────────────────────────────────
exports.createDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, '부서명은 필수입니다.'),
    code: zod_1.z.string().min(1, '부서 코드는 필수입니다.'),
});
exports.updateDepartmentSchema = requireOneField(zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    code: zod_1.z.string().min(1).optional(),
})
    .strict());
// ── Team ─────────────────────────────────────────────────────────────────────
exports.createTeamSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, '팀명은 필수입니다.'),
    code: zod_1.z.string().min(1, '팀 코드는 필수입니다.'),
    departmentId: zod_1.z.string().min(1, '부서 ID는 필수입니다.'),
    teamLeadId: zod_1.z.string().optional(),
});
exports.updateTeamSchema = requireOneField(zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    code: zod_1.z.string().min(1).optional(),
    departmentId: zod_1.z.string().min(1).optional(),
    teamLeadId: zod_1.z.string().nullable().optional(),
})
    .strict());
// ── Location ─────────────────────────────────────────────────────────────────
exports.createLocationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, '위치명은 필수입니다.'),
    building: zod_1.z.string().min(1, '건물명은 필수입니다.'),
    floor: zod_1.z.string().optional(),
    room: zod_1.z.string().optional(),
});
exports.updateLocationSchema = requireOneField(zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    building: zod_1.z.string().min(1).optional(),
    floor: zod_1.z.string().nullable().optional(),
    room: zod_1.z.string().nullable().optional(),
})
    .strict());
const paymentTerms = zod_1.z.enum(['MONTH_END', 'PER_CASE', 'DAYS_AFTER']);
const taxInvoiceMethod = zod_1.z.enum(['EMAIL', 'FAX', 'POST']);
// ── Vendor ───────────────────────────────────────────────────────────────────
const vendorType = zod_1.z.enum(['REPAIR', 'SOFTWARE']);
exports.createVendorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, '공급업체명은 필수입니다.'),
    type: vendorType.optional(),
    contactName: zod_1.z.string().optional(),
    email: zod_1.z.string().email('올바른 이메일 형식이 아닙니다.').optional(),
    phone: zod_1.z.string().optional(),
    supportedClasses: zod_1.z.array(assetClass).optional(),
    serviceRegion: zod_1.z.string().optional(),
    contractStartDate: zod_1.z.string().optional(),
    contractEndDate: zod_1.z.string().optional(),
    slaHours: zod_1.z.number().int().positive().optional(),
    canVisitOnSite: zod_1.z.boolean().optional(),
    canReceiveDevice: zod_1.z.boolean().optional(),
    // 기본정보
    businessRegistrationNumber: zod_1.z.string().optional(),
    ceoName: zod_1.z.string().optional(),
    businessType: zod_1.z.string().optional(),
    businessItem: zod_1.z.string().optional(),
    addressHeadOffice: zod_1.z.string().optional(),
    addressDetail: zod_1.z.string().optional(),
    addressBusiness: zod_1.z.string().optional(),
    contactDepartment: zod_1.z.string().optional(),
    contactPosition: zod_1.z.string().optional(),
    // 서비스범위
    operatingHoursStart: zod_1.z.string().optional(),
    operatingHoursEnd: zod_1.z.string().optional(),
    operatesOnWeekend: zod_1.z.boolean().optional(),
    canHandleUrgent: zod_1.z.boolean().optional(),
    urgentConditionNote: zod_1.z.string().optional(),
    brandModelNote: zod_1.z.string().optional(),
    // 정산정보
    bankName: zod_1.z.string().optional(),
    bankAccountNumber: zod_1.z.string().optional(),
    bankAccountHolder: zod_1.z.string().optional(),
    paymentTerms: paymentTerms.optional(),
    paymentDaysAfter: zod_1.z.number().int().optional(),
    taxInvoiceEmail: zod_1.z.string().email().optional(),
    taxInvoiceMethod: taxInvoiceMethod.optional(),
    faxNumber: zod_1.z.string().optional(),
    postalAddress: zod_1.z.string().optional(),
    isVatIncluded: zod_1.z.boolean().optional(),
    isWithholdingTax: zod_1.z.boolean().optional(),
    // SLA/계약
    slaCompletionDays: zod_1.z.number().int().optional(),
    penaltyTerms: zod_1.z.string().optional(),
    repairWarrantyDays: zod_1.z.number().int().optional(),
    unitPriceNote: zod_1.z.string().optional(),
});
exports.updateVendorSchema = requireOneField(zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    type: vendorType.optional(),
    contactName: zod_1.z.string().nullable().optional(),
    email: zod_1.z.string().email().nullable().optional(),
    phone: zod_1.z.string().nullable().optional(),
    supportedClasses: zod_1.z.array(assetClass).nullable().optional(),
    serviceRegion: zod_1.z.string().nullable().optional(),
    contractStartDate: zod_1.z.string().nullable().optional(),
    contractEndDate: zod_1.z.string().nullable().optional(),
    slaHours: zod_1.z.number().int().positive().nullable().optional(),
    canVisitOnSite: zod_1.z.boolean().optional(),
    canReceiveDevice: zod_1.z.boolean().optional(),
    // 기본정보
    businessRegistrationNumber: zod_1.z.string().nullable().optional(),
    ceoName: zod_1.z.string().nullable().optional(),
    businessType: zod_1.z.string().nullable().optional(),
    businessItem: zod_1.z.string().nullable().optional(),
    addressHeadOffice: zod_1.z.string().nullable().optional(),
    addressDetail: zod_1.z.string().nullable().optional(),
    addressBusiness: zod_1.z.string().nullable().optional(),
    contactDepartment: zod_1.z.string().nullable().optional(),
    contactPosition: zod_1.z.string().nullable().optional(),
    // 서비스범위
    operatingHoursStart: zod_1.z.string().nullable().optional(),
    operatingHoursEnd: zod_1.z.string().nullable().optional(),
    operatesOnWeekend: zod_1.z.boolean().optional(),
    canHandleUrgent: zod_1.z.boolean().optional(),
    urgentConditionNote: zod_1.z.string().nullable().optional(),
    brandModelNote: zod_1.z.string().nullable().optional(),
    // 정산정보
    bankName: zod_1.z.string().nullable().optional(),
    bankAccountNumber: zod_1.z.string().nullable().optional(),
    bankAccountHolder: zod_1.z.string().nullable().optional(),
    paymentTerms: paymentTerms.nullable().optional(),
    paymentDaysAfter: zod_1.z.number().int().nullable().optional(),
    taxInvoiceEmail: zod_1.z.string().email().nullable().optional(),
    taxInvoiceMethod: taxInvoiceMethod.nullable().optional(),
    faxNumber: zod_1.z.string().nullable().optional(),
    postalAddress: zod_1.z.string().nullable().optional(),
    isVatIncluded: zod_1.z.boolean().optional(),
    isWithholdingTax: zod_1.z.boolean().optional(),
    // SLA/계약
    slaCompletionDays: zod_1.z.number().int().nullable().optional(),
    penaltyTerms: zod_1.z.string().nullable().optional(),
    repairWarrantyDays: zod_1.z.number().int().nullable().optional(),
    unitPriceNote: zod_1.z.string().nullable().optional(),
})
    .strict());
exports.submitVendorSchema = zod_1.z.object({});
exports.rejectVendorSchema = zod_1.z.object({ reason: zod_1.z.string().min(1) });
exports.blacklistVendorSchema = zod_1.z.object({ reason: zod_1.z.string().min(1) });
// ── AssetCategory ────────────────────────────────────────────────────────────
exports.createAssetCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, '카테고리명은 필수입니다.'),
    code: zod_1.z.string().min(1, '카테고리 코드는 필수입니다.'),
    class: assetClass.optional(),
    subType: assetSubType.optional(), // IT_ASSET 카테고리에서만 유효
    parentId: zod_1.z.string().optional(),
});
// class/subType 변경은 위험 (전용테이블 분기점) → 수정 불가
exports.updateAssetCategorySchema = requireOneField(zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    code: zod_1.z.string().min(1).optional(),
    parentId: zod_1.z.string().nullable().optional(),
})
    .strict());
//# sourceMappingURL=master.schema.js.map