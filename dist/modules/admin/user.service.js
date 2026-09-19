"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const logger_1 = require("../../lib/logger");
const mailer_1 = require("../../lib/mailer");
const emailTemplates_1 = require("../../lib/emailTemplates");
const env_1 = require("../../config/env");
const sensitiveAuditLog_1 = require("../../lib/sensitiveAuditLog");
const INVITE_EXPIRES_HOURS = 24;
const list = async (query, requester) => {
    const where = {};
    if (query.role)
        where.role = query.role;
    if (typeof query.isActive === 'boolean')
        where.isActive = query.isActive;
    if (query.teamId)
        where.teamId = query.teamId;
    // TEAM_LEAD는 자기 팀 소속 사원만 조회
    if (requester?.role === 'TEAM_LEAD') {
        where.team = { teamLeadId: requester.id };
    }
    if (query.q) {
        where.OR = [
            { name: { contains: query.q, mode: 'insensitive' } },
            { email: { contains: query.q, mode: 'insensitive' } },
        ];
    }
    const skip = (query.page - 1) * query.pageSize;
    const [rows, total] = await Promise.all([
        prisma_1.prisma.user.findMany({
            where,
            skip,
            take: query.pageSize,
            orderBy: { createdAt: 'desc' },
            include: { team: { select: { name: true } } },
        }),
        prisma_1.prisma.user.count({ where }),
    ]);
    const items = rows.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        isActive: u.isActive,
        departmentName: u.team?.name ?? null,
        inviteTokenExpiresAt: u.inviteTokenExpiresAt,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    }));
    return {
        items,
        total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(total / query.pageSize),
    };
};
const getById = async (id) => {
    const u = await prisma_1.prisma.user.findUnique({
        where: { id },
        include: { team: { select: { name: true } } },
    });
    if (!u)
        throw new AppError_1.AppError(404, '사원을 찾을 수 없습니다.');
    return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        isActive: u.isActive,
        departmentName: u.team?.name ?? null,
        inviteTokenExpiresAt: u.inviteTokenExpiresAt,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    };
};
// audit 헬퍼 — userHistory row 한 줄 작성. tx 인자 받아 변경과 같은 트랜잭션에서 기록.
// reason 미기재 시 placeholder (zod 단에서 role/deactivate/activate 는 이미 강제됨)
async function writeAudit(tx, args) {
    await tx.userHistory.create({
        data: {
            userId: args.userId,
            performedById: args.performedById,
            action: args.action,
            reason: args.reason?.trim() || '(사유 미기재)',
            before: (args.before ?? undefined),
            after: (args.after ?? undefined),
            ipAddress: args.audit.ipAddress,
            userAgent: args.audit.userAgent,
        },
    });
}
const update = async (id, dto, requester, audit) => {
    const current = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '사원을 찾을 수 없습니다.');
    const { reason, ...changes } = dto;
    if (changes.role && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, 'Role 변경은 ADMIN만 가능합니다.');
    }
    // before/after 스냅샷 — 실제 바뀌는 필드만
    const before = {};
    const after = {};
    for (const key of Object.keys(changes)) {
        before[key] = current[key];
        after[key] = changes[key];
    }
    const action = 'role' in changes ? 'ROLE_CHANGED' : 'PROFILE_UPDATED';
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const updated = await tx.user.update({ where: { id }, data: changes });
        await writeAudit(tx, {
            userId: id,
            performedById: requester.id,
            action,
            reason,
            before,
            after,
            audit,
        });
        return updated;
    });
    if ('role' in changes && changes.role) {
        (0, sensitiveAuditLog_1.logSensitiveAction)({
            action: 'ROLE_CHANGE',
            performedById: requester.id,
            performedByRole: requester.role,
            targetId: id,
            targetType: 'User',
            detail: `role → ${changes.role}`,
            timestamp: new Date().toISOString(),
        });
    }
    return result;
};
const deactivate = async (id, dto, requester, audit) => {
    if (requester.id === id) {
        throw new AppError_1.AppError(400, '본인 계정은 비활성화할 수 없습니다.');
    }
    const current = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '사원을 찾을 수 없습니다.');
    if (!current.isActive)
        throw new AppError_1.AppError(400, '이미 비활성 상태인 사원입니다.');
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const updated = await tx.user.update({ where: { id }, data: { isActive: false } });
        await writeAudit(tx, {
            userId: id,
            performedById: requester.id,
            action: 'DEACTIVATED',
            reason: dto.reason,
            before: { isActive: true },
            after: { isActive: false },
            audit,
        });
        return updated;
    });
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: 'USER_DEACTIVATE',
        performedById: requester.id,
        performedByRole: requester.role,
        targetId: id,
        targetType: 'User',
        timestamp: new Date().toISOString(),
    });
    return result;
};
const activate = async (id, dto, requester, audit) => {
    const current = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '사원을 찾을 수 없습니다.');
    if (current.isActive)
        throw new AppError_1.AppError(400, '이미 활성 상태인 사원입니다.');
    if (!current.password) {
        throw new AppError_1.AppError(400, '초대 미수락 상태입니다. 초대 재발송을 사용하세요.');
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const updated = await tx.user.update({ where: { id }, data: { isActive: true } });
        await writeAudit(tx, {
            userId: id,
            performedById: requester.id,
            action: 'ACTIVATED',
            reason: dto.reason,
            before: { isActive: false },
            after: { isActive: true },
            audit,
        });
        return updated;
    });
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: 'USER_ACTIVATE',
        performedById: requester.id,
        performedByRole: requester.role,
        targetId: id,
        targetType: 'User',
        timestamp: new Date().toISOString(),
    });
    return result;
};
const reinvite = async (id, dto, requester, audit) => {
    const current = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '사원을 찾을 수 없습니다.');
    if (current.isActive)
        throw new AppError_1.AppError(400, '이미 활성화된 사원입니다.');
    const inviteToken = crypto_1.default.randomBytes(32).toString('hex');
    const inviteTokenExpiresAt = new Date(Date.now() + INVITE_EXPIRES_HOURS * 60 * 60 * 1000);
    const updated = await prisma_1.prisma.$transaction(async (tx) => {
        const u = await tx.user.update({
            where: { id },
            data: { inviteToken, inviteTokenExpiresAt },
        });
        await writeAudit(tx, {
            userId: id,
            performedById: requester.id,
            action: 'REINVITED',
            reason: dto.reason,
            before: null,
            after: { inviteTokenExpiresAt },
            audit,
        });
        return u;
    });
    const inviteUrl = `${env_1.env.frontendUrl}/accept-invite?token=${inviteToken}`;
    const { subject, html } = (0, emailTemplates_1.inviteEmailTemplate)(updated.name, inviteUrl);
    try {
        await (0, mailer_1.sendMail)({ to: updated.email, subject, html });
    }
    catch (err) {
        logger_1.logger.error({ err }, '[Reinvite] 메일 발송 실패');
    }
    return updated;
};
// 권한 변경 이력 조회 — 대상 사용자 기준, 최신순
const listHistory = async (userId, query) => {
    const skip = (query.page - 1) * query.pageSize;
    const [rows, total] = await Promise.all([
        prisma_1.prisma.userHistory.findMany({
            where: { userId },
            skip,
            take: query.pageSize,
            orderBy: { createdAt: 'desc' },
            include: {
                performedBy: { select: { id: true, name: true, email: true } },
            },
        }),
        prisma_1.prisma.userHistory.count({ where: { userId } }),
    ]);
    return {
        items: rows,
        total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(total / query.pageSize),
    };
};
exports.userService = {
    list,
    getById,
    update,
    deactivate,
    activate,
    reinvite,
    listHistory,
};
//# sourceMappingURL=user.service.js.map