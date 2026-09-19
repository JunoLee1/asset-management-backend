"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupLoanQuerySchema = exports.listLoansQuerySchema = exports.inspectLoanSchema = exports.returnLoanSchema = exports.recallLoanSchema = exports.rejectLoanSchema = exports.approveLoanSchema = exports.createLoanSchema = void 0;
const zod_1 = require("zod");
const loanStatusEnum = zod_1.z.enum([
    'PENDING_MANAGER',
    'PENDING_ADMIN',
    'APPROVED',
    'CHECKED_OUT',
    'RECEIVED',
    'PENDING_INSPECTION',
    'INSPECTED',
    'PENDING_RETURN_ADMIN',
    'RETURNED',
    'REJECTED',
    'CANCELLED',
    'RECALLED',
]);
exports.createLoanSchema = zod_1.z.object({
    assetId: zod_1.z.string().min(1, '자산 ID 는 필수입니다.'),
    purpose: zod_1.z.string().max(500).optional(),
    dueDate: zod_1.z.string().datetime().optional(),
});
// FE 의 ApproveBody — 첫 approve 호출에 checkout 정보까지 들어옴.
exports.approveLoanSchema = zod_1.z.object({
    checkoutLocationId: zod_1.z.string().optional(),
    checkoutMemo: zod_1.z.string().max(500).optional(),
});
exports.rejectLoanSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1, '거절 사유는 필수입니다.').max(500),
});
exports.recallLoanSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1, '회수 사유는 필수입니다.').max(500),
});
// FE 의 ReturnBody — S3 절충에 따라 body 형식 검증만, 값은 service 에서 무시.
exports.returnLoanSchema = zod_1.z.object({
    conditionAfter: zod_1.z.string().optional(),
    damageNote: zod_1.z.string().optional(),
    resultAction: zod_1.z.string().optional(),
    maintenanceScheduledAt: zod_1.z.string().datetime().optional(),
});
exports.inspectLoanSchema = zod_1.z.object({
    condition: zod_1.z.enum(['GOOD', 'MINOR_DAMAGE', 'MAJOR_DAMAGE', 'LOST']),
    damageNote: zod_1.z.string().max(1000).optional(),
});
exports.listLoansQuerySchema = zod_1.z.object({
    status: loanStatusEnum.optional(),
    userId: zod_1.z.string().optional(),
    assetId: zod_1.z.string().optional(),
    overdueOnly: zod_1.z.coerce.boolean().optional(),
    // 신청자명·자산명·자산코드 부분일치 검색 (대소문자 무시)
    keyword: zod_1.z.string().trim().min(1).optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
// FE 의 QR 디코드 → lookup endpoint (assetCode 로 active CHECKED_OUT loan 찾기)
exports.lookupLoanQuerySchema = zod_1.z.object({
    assetCode: zod_1.z.string().min(1, 'assetCode 는 필수입니다.'),
});
//# sourceMappingURL=loan.schema.js.map