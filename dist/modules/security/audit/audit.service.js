"use strict";
// ADR 0002 결정 5 — AuditLog 하이브리드 (DB row + logger 영구백업)
//
// 호출 규약:
//   Permission/LicenseLink 변경 service 가 트랜잭션 안에서 logAudit() 호출.
//   tx 를 넘기면 같은 트랜잭션 일관성 보장, 안 넘기면 신규 트랜잭션.
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = logAudit;
const enums_1 = require("../../../generated/prisma/enums");
const prisma_1 = require("../../../lib/prisma");
const sensitiveAuditLog_1 = require("../../../lib/sensitiveAuditLog");
// AuditAction enum 중 기존 sensitiveAuditLog 와 겹치는 action 만 추려서
// logger 호환 cast. Shadow IT 신규 action 도 plain string 으로 logger 에 남김.
const SENSITIVE_ACTION_PASSTHROUGH = new Set([
    enums_1.AuditAction.ROLE_CHANGE,
    enums_1.AuditAction.VENDOR_APPROVE,
    enums_1.AuditAction.VENDOR_REJECT,
    enums_1.AuditAction.VENDOR_BLACKLIST,
    enums_1.AuditAction.LICENSE_KEY_ACCESS,
    enums_1.AuditAction.BANK_ACCOUNT_ACCESS,
    enums_1.AuditAction.USER_DEACTIVATE,
    enums_1.AuditAction.USER_ACTIVATE,
    enums_1.AuditAction.ASSET_RETIRE,
]);
async function logAudit(params) {
    const client = params.tx ?? prisma_1.prisma;
    await client.auditLog.create({
        data: {
            action: params.action,
            targetType: params.targetType,
            targetId: params.targetId,
            performedById: params.performedById ?? null,
            performedByRole: params.performedByRole ?? null,
            detail: (params.detail ?? undefined),
            ipAddress: params.ipAddress ?? null,
        },
    });
    // logger 영구백업 — HMAC 서명 보존
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: SENSITIVE_ACTION_PASSTHROUGH.has(params.action)
            ? params.action
            : params.action, // Shadow IT action 도 그대로 string 으로 기록
        performedById: params.performedById ?? 'system',
        performedByRole: params.performedByRole ?? 'SYSTEM',
        targetId: params.targetId,
        targetType: params.targetType,
        detail: params.detail ? JSON.stringify(params.detail) : undefined,
        timestamp: new Date().toISOString(),
        ipAddress: params.ipAddress ?? null,
    });
}
//# sourceMappingURL=audit.service.js.map