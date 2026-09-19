"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignMaintenanceSchema = exports.rejectMaintenanceSchema = exports.approveMaintenanceSchema = exports.listMaintenancesQuerySchema = exports.updateMaintenanceSchema = exports.createMaintenanceSchema = void 0;
const zod_1 = require("zod");
const statusEnum = zod_1.z.enum([
    'PENDING_MANAGER',
    'PENDING_ADMIN',
    'APPROVED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'REJECTED',
]);
const payerEnum = zod_1.z.enum(['COMPANY', 'USER', 'SHARED']);
const maintenanceTypeEnum = zod_1.z.enum(['REPAIR', 'INSPECTION', 'UPGRADE']);
exports.createMaintenanceSchema = zod_1.z.object({
    assetId: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1, '제목은 필수입니다.'),
    description: zod_1.z.string().min(1, '설명은 필수입니다.'),
    scheduledAt: zod_1.z.string().datetime(),
    vendorId: zod_1.z.string().optional(),
    // 정비 유형 — REPAIR 면 자산 컨디션 자동 강등(FAIR), INSPECTION/UPGRADE 는 변경 X
    type: maintenanceTypeEnum.default('REPAIR'),
});
exports.updateMaintenanceSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    scheduledAt: zod_1.z.string().datetime().optional(),
    vendorId: zod_1.z.string().nullable().optional(),
    // 처리자(기술자) — APPROVED → IN_PROGRESS 전이 시 함께 지정. 단독 변경도 허용.
    managerId: zod_1.z.string().nullable().optional(),
    status: statusEnum.optional(),
    cost: zod_1.z.number().nonnegative().nullable().optional(),
    payerType: payerEnum.nullable().optional(),
    payerUserId: zod_1.z.string().nullable().optional(),
    payerNote: zod_1.z.string().nullable().optional(),
    // COMPLETED 처리 시 자산관리자·수리기술자가 최종 컨디션 평가
    conditionAfter: zod_1.z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']).optional(),
});
exports.listMaintenancesQuerySchema = zod_1.z.object({
    assetId: zod_1.z.string().optional(),
    status: statusEnum.optional(),
    managerId: zod_1.z.string().optional(),
    vendorId: zod_1.z.string().optional(),
    keyword: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
exports.approveMaintenanceSchema = zod_1.z.object({
    // ADMIN 2차 승인 시 현장 확인 후 컨디션 정정 가능 (선택)
    // 자동 강등은 신청 시점에 이미 일어났지만, 실제로 더 나쁘거나/멀쩡한 경우 ADMIN이 정정
    conditionOverride: zod_1.z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']).optional(),
});
exports.rejectMaintenanceSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1, '거절 사유는 필수입니다.').max(500),
});
// REPAIR_OWNER 가 PENDING_ADMIN 단계에서 외부 업체 배정 + 자동 APPROVED 전이.
// 내부 기술자(managerId) 배정은 IN_PROGRESS 전이 시 update 로 처리.
exports.assignMaintenanceSchema = zod_1.z.object({
    vendorId: zod_1.z.string().min(1, 'vendorId는 필수입니다.'),
});
//# sourceMappingURL=maintenance.schema.js.map