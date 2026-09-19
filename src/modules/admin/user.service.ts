import crypto from 'crypto'
import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import { logger } from '../../lib/logger'
import { sendMail } from '../../lib/mailer'
import { inviteEmailTemplate } from '../../lib/emailTemplates'
import { env } from '../../config/env'
import { logSensitiveAction } from '../../lib/sensitiveAuditLog'
import type {
  ListUsersQuery,
  UpdateUserInput,
  DeactivateUserInput,
  ActivateUserInput,
  ReinviteUserInput,
  ListUserHistoryQuery,
} from '../../schemas/user.schema'
import type { Role, UserHistoryAction } from '../../generated/prisma/enums'
import type * as Prisma from '../../generated/prisma/internal/prismaNamespace'
import type { AuditContext } from '../../lib/requestHelpers'
import { maskName, maskEmail } from '../../lib/maskPii'

const INVITE_EXPIRES_HOURS = 24

import type { RequesterContext } from '../../lib/requestHelpers'

export interface UserListItem {
  id: string
  email: string
  name: string
  role: Role
  isActive: boolean
  departmentName: string | null
  inviteTokenExpiresAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const list = async (query: ListUsersQuery, requester?: RequesterContext) => {
  const where: Prisma.UserWhereInput = {}
  if (query.role) where.role = query.role
  if (typeof query.isActive === 'boolean') where.isActive = query.isActive
  if (query.teamId) where.teamId = query.teamId
  // TEAM_LEAD: 자기 팀 소속 사원만
  if (requester?.role === 'TEAM_LEAD') {
    where.team = { teamLeadId: requester.id }
  }
  // DEPT_LEAD / REPAIR_OWNER: 자기 부서 소속 전체 사원
  if (requester?.role === 'DEPT_LEAD' || requester?.role === 'REPAIR_OWNER') {
    where.team = { department: { leaderId: requester.id } }
  }
  if (query.q) {
    where.OR = [
      { name: { contains: query.q, mode: 'insensitive' } },
      { email: { contains: query.q, mode: 'insensitive' } },
    ]
  }

  const skip = (query.page - 1) * query.pageSize

  const [rows, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: query.pageSize,
      orderBy: { createdAt: 'desc' },
      include: { team: { select: { name: true } } },
    }),
    prisma.user.count({ where }),
  ])

  const shouldMask = requester?.role !== 'ADMIN'
  const items: UserListItem[] = rows.map((u) => ({
    id: u.id,
    email: shouldMask ? maskEmail(u.email) : u.email,
    name: shouldMask ? maskName(u.name) : u.name,
    role: u.role,
    isActive: u.isActive,
    departmentName: u.team?.name ?? null,
    inviteTokenExpiresAt: u.inviteTokenExpiresAt,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }))

  return {
    items,
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil(total / query.pageSize),
  }
}

const getById = async (id: string, requester?: RequesterContext): Promise<UserListItem> => {
  const u = await prisma.user.findUnique({
    where: { id },
    include: { team: { select: { name: true } } },
  })
  if (!u) throw new AppError(404, '사원을 찾을 수 없습니다.')
  const shouldMask = requester?.role !== 'ADMIN'
  return {
    id: u.id,
    email: shouldMask ? maskEmail(u.email) : u.email,
    name: shouldMask ? maskName(u.name) : u.name,
    role: u.role,
    isActive: u.isActive,
    departmentName: u.team?.name ?? null,
    inviteTokenExpiresAt: u.inviteTokenExpiresAt,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

// audit 헬퍼 — userHistory row 한 줄 작성. tx 인자 받아 변경과 같은 트랜잭션에서 기록.
// reason 미기재 시 placeholder (zod 단에서 role/deactivate/activate 는 이미 강제됨)
async function writeAudit(
  tx: Prisma.TransactionClient,
  args: {
    userId: string
    performedById: string
    action: UserHistoryAction
    reason: string | undefined | null
    before: Record<string, unknown> | null
    after: Record<string, unknown> | null
    audit: AuditContext
  },
) {
  await tx.userHistory.create({
    data: {
      userId: args.userId,
      performedById: args.performedById,
      action: args.action,
      reason: args.reason?.trim() || '(사유 미기재)',
      before: (args.before ?? undefined) as Prisma.InputJsonValue | undefined,
      after: (args.after ?? undefined) as Prisma.InputJsonValue | undefined,
      ipAddress: args.audit.ipAddress,
      userAgent: args.audit.userAgent,
    },
  })
}

const update = async (
  id: string,
  dto: UpdateUserInput,
  requester: RequesterContext,
  audit: AuditContext,
) => {
  const current = await prisma.user.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '사원을 찾을 수 없습니다.')

  const { reason, ...changes } = dto

  if (changes.role && requester.role !== 'ADMIN') {
    throw new AppError(403, 'Role 변경은 ADMIN만 가능합니다.')
  }

  // before/after 스냅샷 — 실제 바뀌는 필드만
  const before: Record<string, unknown> = {}
  const after: Record<string, unknown> = {}
  for (const key of Object.keys(changes) as Array<keyof typeof changes>) {
    before[key] = (current as Record<string, unknown>)[key]
    after[key] = changes[key]
  }

  const action: UserHistoryAction = 'role' in changes ? 'ROLE_CHANGED' : 'PROFILE_UPDATED'

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({ where: { id }, data: changes })
    await writeAudit(tx, {
      userId: id,
      performedById: requester.id,
      action,
      reason,
      before,
      after,
      audit,
    })
    return updated
  })

  if ('role' in changes && changes.role) {
    logSensitiveAction({
      action: 'ROLE_CHANGE',
      performedById: requester.id,
      performedByRole: requester.role,
      targetId: id,
      targetType: 'User',
      detail: `role → ${changes.role}`,
      timestamp: new Date().toISOString(),
    })
  }

  return result
}

const deactivate = async (
  id: string,
  dto: DeactivateUserInput,
  requester: RequesterContext,
  audit: AuditContext,
) => {
  if (requester.id === id) {
    throw new AppError(400, '본인 계정은 비활성화할 수 없습니다.')
  }
  const current = await prisma.user.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '사원을 찾을 수 없습니다.')
  if (!current.isActive) throw new AppError(400, '이미 비활성 상태인 사원입니다.')

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({ where: { id }, data: { isActive: false } })
    await writeAudit(tx, {
      userId: id,
      performedById: requester.id,
      action: 'DEACTIVATED',
      reason: dto.reason,
      before: { isActive: true },
      after: { isActive: false },
      audit,
    })
    return updated
  })

  logSensitiveAction({
    action: 'USER_DEACTIVATE',
    performedById: requester.id,
    performedByRole: requester.role,
    targetId: id,
    targetType: 'User',
    timestamp: new Date().toISOString(),
  })

  return result
}

const activate = async (
  id: string,
  dto: ActivateUserInput,
  requester: RequesterContext,
  audit: AuditContext,
) => {
  const current = await prisma.user.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '사원을 찾을 수 없습니다.')
  if (current.isActive) throw new AppError(400, '이미 활성 상태인 사원입니다.')
  if (!current.password) {
    throw new AppError(400, '초대 미수락 상태입니다. 초대 재발송을 사용하세요.')
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({ where: { id }, data: { isActive: true } })
    await writeAudit(tx, {
      userId: id,
      performedById: requester.id,
      action: 'ACTIVATED',
      reason: dto.reason,
      before: { isActive: false },
      after: { isActive: true },
      audit,
    })
    return updated
  })

  logSensitiveAction({
    action: 'USER_ACTIVATE',
    performedById: requester.id,
    performedByRole: requester.role,
    targetId: id,
    targetType: 'User',
    timestamp: new Date().toISOString(),
  })

  return result
}

const reinvite = async (
  id: string,
  dto: ReinviteUserInput,
  requester: RequesterContext,
  audit: AuditContext,
) => {
  const current = await prisma.user.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '사원을 찾을 수 없습니다.')
  if (current.isActive) throw new AppError(400, '이미 활성화된 사원입니다.')

  const inviteToken = crypto.randomBytes(32).toString('hex')
  const inviteTokenExpiresAt = new Date(Date.now() + INVITE_EXPIRES_HOURS * 60 * 60 * 1000)

  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.user.update({
      where: { id },
      data: { inviteToken, inviteTokenExpiresAt },
    })
    await writeAudit(tx, {
      userId: id,
      performedById: requester.id,
      action: 'REINVITED',
      reason: dto.reason,
      before: null,
      after: { inviteTokenExpiresAt },
      audit,
    })
    return u
  })

  const inviteUrl = `${env.frontendUrl}/accept-invite?token=${inviteToken}`
  const { subject, html } = inviteEmailTemplate(updated.name, inviteUrl)
  try {
    await sendMail({ to: updated.email, subject, html })
  } catch (err) {
    logger.error({ err }, '[Reinvite] 메일 발송 실패')
  }

  return updated
}

// 권한 변경 이력 조회 — 대상 사용자 기준, 최신순
const listHistory = async (userId: string, query: ListUserHistoryQuery) => {
  const skip = (query.page - 1) * query.pageSize
  const [rows, total] = await Promise.all([
    prisma.userHistory.findMany({
      where: { userId },
      skip,
      take: query.pageSize,
      orderBy: { createdAt: 'desc' },
      include: {
        performedBy: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.userHistory.count({ where: { userId } }),
  ])

  return {
    items: rows,
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil(total / query.pageSize),
  }
}

export const userService = {
  list,
  getById,
  update,
  deactivate,
  activate,
  reinvite,
  listHistory,
}
