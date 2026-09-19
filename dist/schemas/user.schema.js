"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserHistoryQuerySchema = exports.reinviteUserSchema = exports.activateUserSchema = exports.deactivateUserSchema = exports.updateUserSchema = exports.listUsersQuerySchema = void 0;
const zod_1 = require("zod");
const roleEnum = zod_1.z.enum(['ADMIN', 'TEAM_LEAD', 'ASSET_MANAGER', 'USER']);
const numericString = zod_1.z
    .union([zod_1.z.string(), zod_1.z.number()])
    .transform((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
    .pipe(zod_1.z.number().int());
exports.listUsersQuerySchema = zod_1.z.object({
    page: numericString.pipe(zod_1.z.number().int().positive()).default(1),
    pageSize: numericString.pipe(zod_1.z.number().int().positive().max(100)).default(20),
    role: roleEnum.optional(),
    isActive: zod_1.z
        .union([zod_1.z.string(), zod_1.z.boolean()])
        .transform((v) => (typeof v === 'boolean' ? v : v === 'true'))
        .optional(),
    teamId: zod_1.z.string().optional(),
    q: zod_1.z.string().optional(),
});
// audit 정책: role 변경 / 활성-비활성 시 reason 필수 (회사 정책)
exports.updateUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    role: roleEnum.optional(),
    teamId: zod_1.z.string().nullable().optional(),
    reason: zod_1.z.string().min(1, 'reason 은 비어있을 수 없습니다.').max(500).optional(),
})
    .strict()
    .refine((d) => {
    const { reason: _r, ...changes } = d;
    return Object.keys(changes).length > 0;
}, { message: '수정할 필드가 최소 1개 필요합니다.' })
    .refine((d) => !d.role || (d.reason && d.reason.trim().length > 0), {
    message: 'role 변경 시 reason 은 필수입니다.',
    path: ['reason'],
});
// deactivate / activate 전용 입력 (reason 필수)
exports.deactivateUserSchema = zod_1.z
    .object({
    reason: zod_1.z.string().min(1, 'reason 은 필수입니다.').max(500),
})
    .strict();
exports.activateUserSchema = zod_1.z
    .object({
    reason: zod_1.z.string().min(1, 'reason 은 필수입니다.').max(500),
})
    .strict();
// reinvite 는 reason 선택 (단순 재발송 케이스 포함)
exports.reinviteUserSchema = zod_1.z
    .object({
    reason: zod_1.z.string().min(1).max(500).optional(),
})
    .strict();
// 이력 조회 페이지네이션
exports.listUserHistoryQuerySchema = zod_1.z.object({
    page: numericString.pipe(zod_1.z.number().int().positive()).default(1),
    pageSize: numericString.pipe(zod_1.z.number().int().positive().max(100)).default(20),
});
//# sourceMappingURL=user.schema.js.map