"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetCodeSchema = exports.requestPasswordResetSchema = exports.inviteUserSchema = exports.changePasswordSchema = exports.acceptInviteSchema = exports.loginSchema = exports.passwordResetSchema = exports.passwordSchema = void 0;
const zod_1 = require("zod");
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const ALPHANUMERIC_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
exports.passwordSchema = zod_1.z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(SPECIAL_CHAR_REGEX, '특수문자를 1자 이상 포함해야 합니다.');
exports.passwordResetSchema = zod_1.z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(ALPHANUMERIC_REGEX, '영문과 숫자를 조합하여 입력해주세요.');
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: exports.passwordSchema,
});
exports.acceptInviteSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, '토큰이 필요합니다.'),
    password: exports.passwordSchema,
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    newPassword: exports.passwordSchema,
});
exports.inviteUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('올바른 이메일 형식이 아닙니다.'),
    name: zod_1.z.string().min(1, '이름은 1자 이상이어야 합니다.').trim().min(1, '이름은 공백만으로 구성할 수 없습니다.'),
    role: zod_1.z.enum(['ADMIN', 'TEAM_LEAD', 'ASSET_MANAGER', 'USER']).optional(),
    teamId: zod_1.z.string().optional(),
    phoneNumber: zod_1.z
        .string()
        .regex(/^01[0-9]{8,9}$/, '올바른 휴대폰 번호 형식이 아닙니다. (예: 01012345678)')
        .optional(),
});
exports.requestPasswordResetSchema = zod_1.z.object({
    email: zod_1.z.string().email('올바른 이메일 형식이 아닙니다.'),
});
exports.verifyResetCodeSchema = zod_1.z
    .object({
    email: zod_1.z.string().email('올바른 이메일 형식이 아닙니다.'),
    code: zod_1.z.string().regex(/^\d{6}$/, '인증코드는 6자리 숫자입니다.'),
    newPassword: exports.passwordResetSchema,
    confirmPassword: zod_1.z.string(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
});
//# sourceMappingURL=auth.schema.js.map