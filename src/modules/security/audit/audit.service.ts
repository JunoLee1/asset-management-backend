// ADR 0002 결정 5 — AuditLog 하이브리드 (DB row + logger 영구백업)
//
// 호출 규약:
//   Permission/LicenseLink 변경 service 가 트랜잭션 안에서 logAudit() 호출.
//   tx 를 넘기면 같은 트랜잭션 일관성 보장, 안 넘기면 신규 트랜잭션.

import { AuditAction } from '../../../generated/prisma/enums'
import type { Role } from '../../../generated/prisma/enums'
import type * as Prisma from '../../../generated/prisma/internal/prismaNamespace'
import { prisma } from '../../../lib/prisma'
import { logSensitiveAction, type SensitiveAction } from '../../../lib/sensitiveAuditLog'

type Tx = Prisma.TransactionClient

export interface LogAuditParams {
  action: AuditAction
  targetType: string
  targetId: string
  performedById?: string | null
  performedByRole?: Role | null
  detail?: Record<string, unknown> | null
  ipAddress?: string | null
  tx?: Tx
}

// AuditAction enum 중 기존 sensitiveAuditLog 와 겹치는 action 만 추려서
// logger 호환 cast. Shadow IT 신규 action 도 plain string 으로 logger 에 남김.
const SENSITIVE_ACTION_PASSTHROUGH = new Set<AuditAction>([
  AuditAction.ROLE_CHANGE,
  AuditAction.VENDOR_APPROVE,
  AuditAction.VENDOR_REJECT,
  AuditAction.VENDOR_BLACKLIST,
  AuditAction.LICENSE_KEY_ACCESS,
  AuditAction.BANK_ACCOUNT_ACCESS,
  AuditAction.USER_DEACTIVATE,
  AuditAction.USER_ACTIVATE,
  AuditAction.ASSET_RETIRE,
])

export async function logAudit(params: LogAuditParams): Promise<void> {
  const client = params.tx ?? prisma

  await client.auditLog.create({
    data: {
      action: params.action,
      targetType: params.targetType,
      targetId: params.targetId,
      performedById: params.performedById ?? null,
      performedByRole: params.performedByRole ?? null,
      detail: (params.detail ?? undefined) as Prisma.InputJsonValue | undefined,
      ipAddress: params.ipAddress ?? null,
    },
  })

  // logger 영구백업 — HMAC 서명 보존
  logSensitiveAction({
    action: SENSITIVE_ACTION_PASSTHROUGH.has(params.action)
      ? (params.action as unknown as SensitiveAction)
      : (params.action as unknown as SensitiveAction), // Shadow IT action 도 그대로 string 으로 기록
    performedById: params.performedById ?? 'system',
    performedByRole: params.performedByRole ?? 'SYSTEM',
    targetId: params.targetId,
    targetType: params.targetType,
    detail: params.detail ? JSON.stringify(params.detail) : undefined,
    timestamp: new Date().toISOString(),
    ipAddress: params.ipAddress ?? null,
  })
}
