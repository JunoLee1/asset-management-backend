import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import { notificationService } from '../notifications/notification.service'
import type {
  CreateRepairReportInput,
  UpdateRepairReportInput,
  ListRepairReportsQuery,
  RepairStats,
  RepairReportListItem,
  RepairReportDetail,
} from './report.types'

function periodFilter(year: number, month?: number | null, startDate?: Date | null, endDate?: Date | null) {
  if (startDate && endDate) {
    return { createdAt: { gte: startDate, lte: endDate } }
  }
  if (month) {
    const from = new Date(year, month - 1, 1)
    const to = new Date(year, month, 1)
    return { createdAt: { gte: from, lt: to } }
  }
  const from = new Date(year, 0, 1)
  const to = new Date(year + 1, 0, 1)
  return { createdAt: { gte: from, lt: to } }
}

async function buildStats(
  year: number,
  month?: number | null,
  startDate?: Date | null,
  endDate?: Date | null,
): Promise<RepairStats> {
  const where = periodFilter(year, month, startDate, endDate)

  const all = await prisma.maintenance.findMany({
    where,
    select: {
      status: true,
      completedAt: true,
      createdAt: true,
      cost: true,
      payerType: true,
      serviceType: true,
      vendor: { select: { name: true } },
    },
  })

  const completed = all.filter((m) => m.status === 'COMPLETED')
  const inProgress = all.filter((m) => m.status === 'IN_PROGRESS').length
  const cancelled = all.filter((m) => m.status === 'CANCELLED').length

  const totalCost = completed.reduce((s, m) => s + Number(m.cost ?? 0), 0)

  const avgDays =
    completed.length > 0
      ? Math.round(
          completed.reduce((s, m) => {
            if (!m.completedAt) return s
            return s + (m.completedAt.getTime() - m.createdAt.getTime()) / (1000 * 60 * 60 * 24)
          }, 0) / completed.length,
        )
      : 0

  const byPayer = { COMPANY: 0, USER: 0, SHARED: 0, NONE: 0 }
  for (const m of completed) {
    const k = (m.payerType as keyof typeof byPayer) ?? 'NONE'
    byPayer[k] = (byPayer[k] ?? 0) + 1
  }

  const byServiceType = { PAID_REPAIR: 0, FREE_REPAIR: 0, REPLACEMENT: 0, RETURN: 0, NONE: 0 }
  for (const m of all) {
    const k = (m.serviceType as keyof typeof byServiceType) ?? 'NONE'
    byServiceType[k] = (byServiceType[k] ?? 0) + 1
  }

  // 업체별: 기간 내 건수 + 완료 건수
  const vendorMap = new Map<string, { total: number; completed: number }>()
  for (const m of all) {
    if (!m.vendor?.name) continue
    const entry = vendorMap.get(m.vendor.name) ?? { total: 0, completed: 0 }
    entry.total++
    if (m.status === 'COMPLETED') entry.completed++
    vendorMap.set(m.vendor.name, entry)
  }
  const byVendor = Array.from(vendorMap.entries())
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.total - a.total)

  // 월별 (최근 6개월 or 기간 내 월별)
  const byMonth = buildMonthlyBuckets(all, year, month, startDate, endDate)

  return {
    totalReceived: all.length,
    completed: completed.length,
    inProgress,
    cancelled,
    avgDays,
    totalCost,
    byPayer,
    byServiceType,
    byVendor,
    byMonth,
  }
}

function buildMonthlyBuckets(
  items: Array<{ createdAt: Date; completedAt: Date | null; status: string }>,
  year: number,
  month?: number | null,
  startDate?: Date | null,
  endDate?: Date | null,
) {
  const months: Array<{ key: string; label: string; received: number; completed: number }> = []

  let from: Date
  let to: Date
  if (startDate && endDate) {
    from = startDate
    to = endDate
  } else if (month) {
    from = new Date(year, month - 1, 1)
    to = new Date(year, month, 0)
    // single month → weekly breakdown not needed, return single entry
    const received = items.length
    const completed = items.filter((m) => m.status === 'COMPLETED').length
    return [{ key: `${year}-${String(month).padStart(2, '0')}`, label: `${month}월`, received, completed }]
  } else {
    from = new Date(year, 0, 1)
    to = new Date(year, 11, 31)
  }

  // build month keys between from and to
  const cur = new Date(from.getFullYear(), from.getMonth(), 1)
  const end = new Date(to.getFullYear(), to.getMonth() + 1, 1)
  while (cur < end) {
    const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`
    const label = `${cur.getMonth() + 1}월`
    const received = items.filter(
      (m) =>
        m.createdAt.getFullYear() === cur.getFullYear() &&
        m.createdAt.getMonth() === cur.getMonth(),
    ).length
    const completed = items.filter(
      (m) =>
        m.completedAt &&
        m.completedAt.getFullYear() === cur.getFullYear() &&
        m.completedAt.getMonth() === cur.getMonth(),
    ).length
    months.push({ key, label, received, completed })
    cur.setMonth(cur.getMonth() + 1)
  }
  return months
}

export async function listRepairReports(
  query: ListRepairReportsQuery,
): Promise<{ items: RepairReportListItem[]; total: number; page: number; pageSize: number; totalPages: number }> {
  const { type, status, year, page = 1, pageSize = 20 } = query

  const where = {
    ...(type && { type }),
    ...(status && { status }),
    ...(year && { year }),
  }

  const [total, rows] = await Promise.all([
    prisma.repairReport.count({ where }),
    prisma.repairReport.findMany({
      where,
      include: { author: { select: { name: true } } },
      orderBy: [{ year: 'desc' }, { month: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  return {
    items: rows.map((r) => ({
      id: r.id,
      type: r.type,
      status: r.status,
      year: r.year,
      month: r.month,
      startDate: r.startDate,
      endDate: r.endDate,
      title: r.title,
      authorName: r.author.name,
      submittedAt: r.submittedAt,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    })),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getRepairReport(id: string): Promise<RepairReportDetail> {
  const r = await prisma.repairReport.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  })
  if (!r) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  const stats = await buildStats(r.year, r.month, r.startDate, r.endDate)

  return {
    id: r.id,
    type: r.type,
    status: r.status,
    year: r.year,
    month: r.month,
    startDate: r.startDate,
    endDate: r.endDate,
    title: r.title,
    comment: r.comment,
    authorName: r.author.name,
    submittedAt: r.submittedAt,
    adminAckedAt: r.adminAckedAt,
    assetManagerAckedAt: r.assetManagerAckedAt,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    stats,
  }
}

export async function getRepairReportStats(
  year: number,
  month?: number,
  startDate?: Date,
  endDate?: Date,
): Promise<RepairStats> {
  return buildStats(year, month, startDate, endDate)
}

export async function createRepairReport(
  authorId: string,
  input: CreateRepairReportInput,
) {
  return prisma.repairReport.create({
    data: {
      type: input.type,
      year: input.year,
      month: input.month ?? null,
      startDate: input.startDate ?? null,
      endDate: input.endDate ?? null,
      title: input.title,
      comment: input.comment ?? null,
      authorId,
    },
    include: { author: { select: { name: true } } },
  })
}

export async function updateRepairReport(
  id: string,
  requesterId: string,
  requesterRole: string,
  input: UpdateRepairReportInput,
) {
  const r = await prisma.repairReport.findUnique({ where: { id } })
  if (!r) throw new AppError(404, '보고서를 찾을 수 없습니다.')
  if (r.authorId !== requesterId && requesterRole !== 'ADMIN') {
    throw new AppError(403, '본인 보고서만 수정할 수 있습니다.')
  }

  if (r.status !== 'DRAFT') throw new AppError(400, 'DRAFT 상태의 보고서만 수정할 수 있습니다.')

  const data: Record<string, unknown> = {}
  if (input.title !== undefined) data.title = input.title
  if ('comment' in input) data.comment = input.comment ?? null

  return prisma.repairReport.update({ where: { id }, data })
}

export async function deleteRepairReport(id: string, requesterId: string, requesterRole: string) {
  const r = await prisma.repairReport.findUnique({ where: { id } })
  if (!r) throw new AppError(404, '보고서를 찾을 수 없습니다.')
  if (r.status !== 'DRAFT') throw new AppError(400, 'DRAFT 상태의 보고서만 삭제할 수 있습니다.')
  if (r.authorId !== requesterId && requesterRole !== 'ADMIN') {
    throw new AppError(403, '본인 보고서만 삭제할 수 있습니다.')
  }
  await prisma.repairReport.delete({ where: { id } })
}

// ADR 0009 — REPAIR_OWNER가 ADMIN + ASSET_MANAGER에게 제출
export async function submitRepairReport(id: string, requesterId: string) {
  const r = await prisma.repairReport.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  })
  if (!r) throw new AppError(404, '보고서를 찾을 수 없습니다.')
  if (r.authorId !== requesterId) throw new AppError(403, '본인 보고서만 제출할 수 있습니다.')
  if (r.status !== 'DRAFT') throw new AppError(400, 'DRAFT 상태의 보고서만 제출할 수 있습니다.')

  const updated = await prisma.repairReport.update({
    where: { id },
    data: { status: 'SUBMITTED', submittedAt: new Date() },
  })

  // best-effort — 알림 실패가 제출을 취소하지 않음
  notificationService
    .createRepairReportSubmittedNotifications({
      reportId: id,
      title: r.title,
      authorName: r.author.name,
    })
    .catch(() => undefined)

  return updated
}

export async function getReportHubSummary(role: string): Promise<{
  repairPendingAck: number
  teamMonthlyOverdue: number | null
  deptMonthlyOverdue: number | null
}> {
  const where =
    role === 'ADMIN'
      ? { status: 'SUBMITTED' as const, adminAckedAt: null }
      : { status: 'SUBMITTED' as const, assetManagerAckedAt: null }

  const repairPendingAck = await prisma.repairReport.count({ where })

  if (role !== 'ADMIN') {
    return { repairPendingAck, teamMonthlyOverdue: null, deptMonthlyOverdue: null }
  }

  // 이번 달 기준 마감 초과 보고서 수
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-12

  // teamMonthlyOverdue: DRAFT 또는 SUBMITTED 상태이고 이번 달 마감 5일 초과 (당월 5일 이후)
  const teamDeadline = new Date(currentYear, currentMonth - 1, 5)
  const teamMonthlyOverdue =
    now > teamDeadline
      ? await prisma.teamMonthlyReport.count({
          where: {
            year: currentYear,
            month: currentMonth,
            status: { in: ['DRAFT', 'SUBMITTED'] },
          },
        })
      : 0

  // deptMonthlyOverdue: DRAFT 상태이고 당월 10일 초과
  const deptDeadline = new Date(currentYear, currentMonth - 1, 10)
  const deptMonthlyOverdue =
    now > deptDeadline
      ? await prisma.deptMonthlyReport.count({
          where: {
            year: currentYear,
            month: currentMonth,
            status: 'DRAFT',
          },
        })
      : 0

  return { repairPendingAck, teamMonthlyOverdue, deptMonthlyOverdue }
}

// ADR 0009 — ADMIN 또는 ASSET_MANAGER 독립 확인. 둘 다 완료 시 FINALIZED
export async function acknowledgeRepairReport(id: string, ackerId: string, ackerRole: string) {
  const r = await prisma.repairReport.findUnique({ where: { id } })
  if (!r) throw new AppError(404, '보고서를 찾을 수 없습니다.')
  if (r.status === 'DRAFT') throw new AppError(400, '제출된 보고서만 확인할 수 있습니다.')
  if (r.status === 'FINALIZED') throw new AppError(400, '이미 최종 확인된 보고서입니다.')

  const now = new Date()
  const data: Record<string, unknown> = {}

  if (ackerRole === 'ADMIN') {
    if (r.adminAckedAt) throw new AppError(400, '이미 ADMIN 확인이 완료된 보고서입니다.')
    data.adminAckedAt = now
    data.adminAckedById = ackerId
  } else if (ackerRole === 'ASSET_MANAGER') {
    if (r.assetManagerAckedAt) throw new AppError(400, '이미 ASSET_MANAGER 확인이 완료된 보고서입니다.')
    data.assetManagerAckedAt = now
    data.assetManagerAckedById = ackerId
  }

  const adminAcked = ackerRole === 'ADMIN' ? now : r.adminAckedAt
  const assetManagerAcked = ackerRole === 'ASSET_MANAGER' ? now : r.assetManagerAckedAt
  const isFinalized = !!(adminAcked && assetManagerAcked)
  if (isFinalized) {
    data.status = 'FINALIZED'
  }

  const updated = await prisma.repairReport.update({ where: { id }, data })

  // best-effort 알림
  if (ackerRole === 'ADMIN' || ackerRole === 'ASSET_MANAGER') {
    const notifyAck = notificationService
      .createRepairReportAckedNotification({
        reportId: id,
        title: r.title,
        ackerRole: ackerRole as 'ADMIN' | 'ASSET_MANAGER',
        recipientId: r.authorId,
      })
      .catch(() => undefined)

    if (isFinalized) {
      Promise.all([
        notifyAck,
        notificationService
          .createRepairReportFinalizedNotification({ reportId: id, title: r.title, recipientId: r.authorId })
          .catch(() => undefined),
      ]).catch(() => undefined)
    }
  }

  return updated
}
