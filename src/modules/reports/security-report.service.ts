import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'

export interface SecurityStats {
  detectedCount: number
  allowedCount: number
  disallowedCount: number
  blockedCount: number
  disallowedDetectionCount: number
  blockEventCount: number
}

export interface SecurityReportListItem {
  id: string
  status: string
  year: number
  month: number
  title: string
  authorName: string
  submittedAt: Date | null
  ackedAt: Date | null
  createdAt: Date
}

export interface SecurityReportDetail extends SecurityReportListItem {
  comment: string | null
  stats: SecurityStats
}

function monthRange(year: number, month: number) {
  const from = new Date(year, month - 1, 1)
  const to = new Date(year, month, 1)
  return { from, to }
}

export async function buildSecurityStats(year: number, month: number): Promise<SecurityStats> {
  const { from, to } = monthRange(year, month)

  const [
    detectedCount,
    allowedCount,
    disallowedCount,
    blockedCount,
    disallowedDetectionCount,
    blockEventCount,
  ] = await Promise.all([
    prisma.detectedSoftware.count({ where: { createdAt: { gte: from, lt: to } } }),
    prisma.auditLog.count({ where: { action: 'PERMISSION_GRANT', createdAt: { gte: from, lt: to } } }),
    prisma.auditLog.count({ where: { action: 'PERMISSION_REVOKE', createdAt: { gte: from, lt: to } } }),
    prisma.auditLog.count({ where: { action: 'BLOCK_SET', createdAt: { gte: from, lt: to } } }),
    prisma.disallowedDetection.count({ where: { detectedAt: { gte: from, lt: to } } }),
    prisma.blockEvent.count({ where: { occurredAt: { gte: from, lt: to } } }),
  ])

  return { detectedCount, allowedCount, disallowedCount, blockedCount, disallowedDetectionCount, blockEventCount }
}

export const securityReportService = {
  async list(authorId: string, role: string) {
    const where = role === 'ADMIN' ? {} : { authorId }
    const rows = await prisma.securityReport.findMany({
      where,
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
      include: { author: { select: { name: true } } },
    })
    return rows.map((r): SecurityReportListItem => ({
      id: r.id, status: r.status, year: r.year, month: r.month,
      title: r.title, authorName: r.author.name,
      submittedAt: r.submittedAt, ackedAt: r.ackedAt, createdAt: r.createdAt,
    }))
  },

  async getById(id: string): Promise<SecurityReportDetail> {
    const r = await prisma.securityReport.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    })
    if (!r) throw new AppError(404, '보안 보고서를 찾을 수 없습니다.')
    const stats = await buildSecurityStats(r.year, r.month)
    return {
      id: r.id, status: r.status, year: r.year, month: r.month,
      title: r.title, comment: r.comment, authorName: r.author.name,
      submittedAt: r.submittedAt, ackedAt: r.ackedAt, createdAt: r.createdAt,
      stats,
    }
  },

  async create(input: { year: number; month: number; title: string; comment?: string }, authorId: string) {
    const existing = await prisma.securityReport.findUnique({
      where: { year_month_authorId: { year: input.year, month: input.month, authorId } },
    })
    if (existing) throw new AppError(409, '해당 월의 보안 보고서가 이미 존재합니다.')
    return prisma.securityReport.create({ data: { ...input, authorId } })
  },

  async update(id: string, input: { title?: string; comment?: string | null }, requesterId: string) {
    const r = await prisma.securityReport.findUnique({ where: { id } })
    if (!r) throw new AppError(404, '보안 보고서를 찾을 수 없습니다.')
    if (r.authorId !== requesterId) throw new AppError(403, '본인 보고서만 수정할 수 있습니다.')
    if (r.status !== 'DRAFT') throw new AppError(400, '임시저장 상태에서만 수정할 수 있습니다.')
    return prisma.securityReport.update({ where: { id }, data: input })
  },

  async submit(id: string, requesterId: string) {
    const r = await prisma.securityReport.findUnique({ where: { id } })
    if (!r) throw new AppError(404, '보안 보고서를 찾을 수 없습니다.')
    if (r.authorId !== requesterId) throw new AppError(403, '본인 보고서만 제출할 수 있습니다.')
    if (r.status !== 'DRAFT') throw new AppError(400, '임시저장 상태에서만 제출 가능합니다.')
    return prisma.securityReport.update({ where: { id }, data: { status: 'SUBMITTED', submittedAt: new Date() } })
  },

  async ack(id: string, adminId: string) {
    const r = await prisma.securityReport.findUnique({ where: { id } })
    if (!r) throw new AppError(404, '보안 보고서를 찾을 수 없습니다.')
    if (r.status !== 'SUBMITTED') throw new AppError(400, '제출된 보고서만 확인할 수 있습니다.')
    return prisma.securityReport.update({ where: { id }, data: { status: 'ACKED', ackedAt: new Date(), ackedById: adminId } })
  },

  async remove(id: string, requesterId: string) {
    const r = await prisma.securityReport.findUnique({ where: { id } })
    if (!r) throw new AppError(404, '보안 보고서를 찾을 수 없습니다.')
    if (r.authorId !== requesterId) throw new AppError(403, '본인 보고서만 삭제할 수 있습니다.')
    if (r.status !== 'DRAFT') throw new AppError(400, '임시저장 상태에서만 삭제 가능합니다.')
    return prisma.securityReport.delete({ where: { id } })
  },
}
