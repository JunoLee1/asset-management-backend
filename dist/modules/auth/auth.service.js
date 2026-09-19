"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const env_1 = require("../../config/env");
const logger_1 = require("../../lib/logger");
const sms_service_1 = require("../../services/sms.service");
const SALT_ROUNDS = 12;
const toUserDto = (user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isOutOfOffice: user.isOutOfOffice,
    teamId: user.team?.id ?? null,
    teamName: user.team?.name ?? null,
    departmentId: user.team?.department.id ?? null,
    departmentName: user.team?.department.name ?? null,
});
// Refresh token 은 평문이 아닌 SHA-256 해시로 DB에 저장 (DB 유출 대비)
const hashToken = (token) => crypto_1.default.createHash('sha256').update(token).digest('hex');
// 단일 세션 정책: 새 로그인 시 해당 user의 기존 활성 RT를 모두 revoke
// → 이전 기기/브라우저는 다음 refresh 시점에 401, 자동 로그아웃됨
const revokeAllUserSessions = async (userId) => {
    const result = await prisma_1.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    });
    if (result.count > 0) {
        logger_1.logger.info({ event: 'session_replaced', userId, revokedCount: result.count }, '신규 로그인으로 기존 세션 종료');
    }
    return result.count;
};
const issueTokenPair = async (payload, meta = {}) => {
    // 단일 세션 강제: 기존 활성 RT 먼저 revoke
    await revokeAllUserSessions(payload.sub);
    const accessToken = jsonwebtoken_1.default.sign(payload, env_1.env.jwt.secret, {
        expiresIn: env_1.env.jwt.expiresIn,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ sub: payload.sub }, env_1.env.jwt.refreshSecret, {
        expiresIn: env_1.env.jwt.refreshExpiresIn,
    });
    const decoded = jsonwebtoken_1.default.decode(refreshToken);
    if (!decoded?.exp)
        throw new AppError_1.AppError(500, '토큰 발급 중 오류가 발생했습니다.');
    await prisma_1.prisma.refreshToken.create({
        data: {
            tokenHash: hashToken(refreshToken),
            userId: payload.sub,
            userAgent: meta.userAgent ?? null,
            ipAddress: meta.ipAddress ?? null,
            expiresAt: new Date(decoded.exp * 1000),
        },
    });
    return { accessToken, refreshToken };
};
const login = async (dto, meta = {}) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email: dto.email },
        include: { team: { include: { department: true } } },
    });
    if (!user?.password)
        throw new AppError_1.AppError(401, '이메일 또는 비밀번호가 올바르지 않습니다.');
    const valid = await bcrypt_1.default.compare(dto.password, user.password);
    if (!valid)
        throw new AppError_1.AppError(401, '이메일 또는 비밀번호가 올바르지 않습니다.');
    if (!user.isActive)
        throw new AppError_1.AppError(403, '비활성화된 계정입니다.');
    const tokens = await issueTokenPair({ sub: user.id, email: user.email, role: user.role }, meta);
    return { user: toUserDto(user), tokens };
};
const acceptInvite = async (dto, meta = {}) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { inviteToken: dto.token } });
    if (!user)
        throw new AppError_1.AppError(400, '유효하지 않은 초대 링크입니다.');
    if (user.isActive)
        throw new AppError_1.AppError(400, '이미 활성화된 계정입니다.');
    if (!user.inviteTokenExpiresAt || user.inviteTokenExpiresAt < new Date()) {
        throw new AppError_1.AppError(400, '초대 링크가 만료되었습니다.');
    }
    const hashed = await bcrypt_1.default.hash(dto.password, SALT_ROUNDS);
    const activated = await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { password: hashed, isActive: true, inviteToken: null, inviteTokenExpiresAt: null },
    });
    const tokens = await issueTokenPair({ sub: activated.id, email: activated.email, role: activated.role }, meta);
    return { user: toUserDto(activated), tokens };
};
const changePassword = async (userId, dto, meta = {}) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError_1.AppError(404, '사용자를 찾을 수 없습니다.');
    if (!user.password) {
        throw new AppError_1.AppError(400, '소셜 로그인 계정은 비밀번호 변경을 사용할 수 없습니다.');
    }
    const validCurrent = await bcrypt_1.default.compare(dto.currentPassword, user.password);
    if (!validCurrent)
        throw new AppError_1.AppError(401, '현재 비밀번호가 일치하지 않습니다.');
    // 6개월 내 사용 이력 확인 (마이그레이션 시 user.password → password_histories 백필됨)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const recentHistories = await prisma_1.prisma.passwordHistory.findMany({
        where: { userId, createdAt: { gte: sixMonthsAgo } },
        select: { passwordHash: true },
    });
    for (const h of recentHistories) {
        const reused = await bcrypt_1.default.compare(dto.newPassword, h.passwordHash);
        if (reused) {
            throw new AppError_1.AppError(400, '최근 6개월 내 사용한 비밀번호는 다시 사용할 수 없습니다.');
        }
    }
    const newHash = await bcrypt_1.default.hash(dto.newPassword, SALT_ROUNDS);
    const action = 'PROFILE_UPDATED';
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.user.update({
            where: { id: userId },
            data: { password: newHash },
        });
        await tx.passwordHistory.create({
            data: { userId, passwordHash: newHash },
        });
        await tx.userHistory.create({
            data: {
                userId,
                performedById: userId,
                action,
                reason: '본인 비밀번호 변경',
                ipAddress: meta.ipAddress ?? null,
                userAgent: meta.userAgent ?? null,
            },
        });
    });
    logger_1.logger.info({ event: 'password_changed', userId, ipAddress: meta.ipAddress }, '비밀번호 변경 완료');
};
// refresh: 새 access token 만 발급. refresh token 자체는 그대로 유지 (rotation X)
const refresh = async (token) => {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, env_1.env.jwt.refreshSecret);
    }
    catch {
        throw new AppError_1.AppError(401, '유효하지 않은 리프레시 토큰입니다.');
    }
    const userId = payload['sub'];
    if (typeof userId !== 'string')
        throw new AppError_1.AppError(401, '유효하지 않은 리프레시 토큰입니다.');
    // DB에서 RT 검증
    const stored = await prisma_1.prisma.refreshToken.findUnique({ where: { tokenHash: hashToken(token) } });
    if (!stored)
        throw new AppError_1.AppError(401, '유효하지 않은 리프레시 토큰입니다.');
    if (stored.revokedAt)
        throw new AppError_1.AppError(401, '폐기된 리프레시 토큰입니다.');
    if (stored.expiresAt < new Date())
        throw new AppError_1.AppError(401, '만료된 리프레시 토큰입니다.');
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.isActive)
        throw new AppError_1.AppError(401, '사용자를 찾을 수 없습니다.');
    const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, email: user.email, role: user.role }, env_1.env.jwt.secret, { expiresIn: env_1.env.jwt.expiresIn });
    return { accessToken, refreshToken: token };
};
// 단일 기기 로그아웃: 해당 refresh token만 revoke (멱등)
const logout = async (token, meta = {}) => {
    const tokenHash = hashToken(token);
    const stored = await prisma_1.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!stored || stored.revokedAt)
        return;
    await prisma_1.prisma.refreshToken.update({
        where: { tokenHash },
        data: { revokedAt: new Date() },
    });
    logger_1.logger.info({ event: 'logout', userId: stored.userId, ipAddress: meta.ipAddress, userAgent: meta.userAgent }, '사용자 로그아웃');
};
// 전체 기기 로그아웃: 해당 user의 모든 활성 refresh token revoke
const logoutAll = async (userId, meta = {}) => {
    const result = await prisma_1.prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    });
    logger_1.logger.info({ event: 'logout_all', userId, revokedCount: result.count, ipAddress: meta.ipAddress }, '전체 기기 로그아웃');
    return { revokedCount: result.count };
};
const findOrCreateOAuthUser = async (provider, profile, accessToken, refreshToken, meta = {}) => {
    const existing = await prisma_1.prisma.oAuthAccount.findUnique({
        where: { provider_providerId: { provider, providerId: profile.providerId } },
        include: { user: true },
    });
    if (existing) {
        await prisma_1.prisma.oAuthAccount.update({
            where: { id: existing.id },
            data: { accessToken, refreshToken: refreshToken ?? null },
        });
        if (!existing.user.isActive)
            throw new AppError_1.AppError(403, '비활성화된 계정입니다.');
        const tokens = await issueTokenPair({ sub: existing.user.id, email: existing.user.email, role: existing.user.role }, meta);
        return { user: toUserDto(existing.user), tokens };
    }
    const user = await prisma_1.prisma.user.upsert({
        where: { email: profile.email },
        update: {},
        create: { email: profile.email, name: profile.name, hireDate: new Date() },
    });
    await prisma_1.prisma.oAuthAccount.create({
        data: { provider, providerId: profile.providerId, accessToken, refreshToken: refreshToken ?? null, userId: user.id },
    });
    const tokens = await issueTokenPair({ sub: user.id, email: user.email, role: user.role }, meta);
    return { user: toUserDto(user), tokens };
};
const requestPasswordReset = async (dto) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user)
        throw new AppError_1.AppError(400, '등록되지 않은 이메일입니다.');
    if (!user.phoneNumber) {
        throw new AppError_1.AppError(400, '휴대폰 번호가 등록되지 않았습니다. 관리자에게 문의하세요.');
    }
    const code = String(Math.floor(Math.random() * 900000) + 100000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const resetRecord = await prisma_1.prisma.passwordReset.create({
        data: {
            email: dto.email,
            code,
            expiresAt,
        },
    });
    const message = `[자산관리 ERP] 비밀번호 리셋 인증코드: ${code}`;
    const sent = await sms_service_1.SmsService.sendSms(user.phoneNumber, message);
    if (!sent) {
        await prisma_1.prisma.passwordReset.delete({ where: { id: resetRecord.id } });
        throw new AppError_1.AppError(500, 'SMS 발송에 실패했습니다. 다시 시도해주세요.');
    }
    logger_1.logger.info({ email: dto.email }, '비밀번호 리셋 요청 - SMS 발송 완료');
};
const verifyResetCode = async (dto) => {
    const reset = await prisma_1.prisma.passwordReset.findFirst({
        where: { email: dto.email, code: dto.code },
    });
    if (!reset)
        throw new AppError_1.AppError(400, '올바르지 않은 인증코드입니다.');
    if (reset.usedAt)
        throw new AppError_1.AppError(400, '이미 사용된 인증코드입니다.');
    if (reset.expiresAt < new Date())
        throw new AppError_1.AppError(400, '인증코드가 만료되었습니다.');
    if (reset.attempts >= 5) {
        throw new AppError_1.AppError(400, '인증코드 재시도 횟수를 초과했습니다. 새 인증코드를 요청해주세요.');
    }
    const user = await prisma_1.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user)
        throw new AppError_1.AppError(404, '사용자를 찾을 수 없습니다.');
    const newHash = await bcrypt_1.default.hash(dto.newPassword, SALT_ROUNDS);
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.passwordReset.update({
            where: { id: reset.id },
            data: { usedAt: new Date() },
        });
        await tx.user.update({
            where: { id: user.id },
            data: { password: newHash },
        });
        await tx.passwordHistory.create({
            data: { userId: user.id, passwordHash: newHash },
        });
        await tx.userHistory.create({
            data: {
                userId: user.id,
                performedById: user.id,
                action: 'PROFILE_UPDATED',
                reason: '비밀번호 리셋',
            },
        });
    });
    logger_1.logger.info({ email: dto.email }, '비밀번호 리셋 완료');
};
exports.authService = {
    login,
    acceptInvite,
    changePassword,
    refresh,
    logout,
    logoutAll,
    findOrCreateOAuthUser,
    issueTokenPair,
    requestPasswordReset,
    verifyResetCode,
};
//# sourceMappingURL=auth.service.js.map