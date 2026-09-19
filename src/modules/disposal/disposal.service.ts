import ExcelJS from 'exceljs'
import { prisma } from '../../lib/prisma'
import type { Prisma } from '../../generated/prisma/client'
import { AppError } from '../../lib/AppError'
import { paginate, fetchPage } from '../../lib/pagination'
import { logger } from '../../lib/logger'
import { notificationService } from '../notifications/notification.service'
import type { DisposalStatus, LoanStatus } from '../../generated/prisma/enums'
import type {
  DisposalListItem,
  DisposalDetail,
  PaginatedResult,
  RequesterContext,
} from './disposal.types'
import type {
  CreateDisposalBody,
  ApproveAdminDisposalBody,
  RejectDisposalBody,
  CompleteDisposalBody,
  ListDisposalsQuery,
} from '../../schemas/disposal.schema'

// ADR 0005 — 알림 best-effort 호출. disposal 자체는 이미 commit 된 상태라 실패해도 무시(log).
const fireAndForgetNotify = async (label: string, send: () => Promise<void>): Promise<void> => {
  try {
    await send()
  } catch (err) {
    logger.warn({ event: 'disposal_notification_failed', label, err }, '폐기 알림 발송 실패')
  }
}

// ADR 0005 — 2단계 결재 전이 매트릭스
// 기존 PENDING 은 데이터 마이그레이션으로 모두 PENDING_MANAGER 로 이관되므로 전이 없음(빈 배열).
const ALLOWED_TRANSITIONS: Record<DisposalStatus, DisposalStatus[]> = {
  PENDING: [],
  PENDING_MANAGER: ['PENDING_ADMIN', 'REJECTED', 'CANCELLED'],
  PENDING_ADMIN: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['COMPLETED'],
  COMPLETED: [],
  REJECTED: [],
  CANCELLED: [],
}

// ADR 0005 — 폐기 신청을 차단해야 하는 Loan 상태(= 종료 상태가 아닌 모든 Loan).
// LoanStatus 에서 종료 상태(RETURNED, REJECTED, CANCELLED, RECALLED) 외 전부.
const ACTIVE_LOAN_STATUSES: LoanStatus[] = [
  'PENDING_MANAGER',
  'PENDING_DEPT',
  'PENDING_ADMIN',
  'APPROVED',
  'CHECKED_OUT',
  'RECEIVED',
  'PENDING_INSPECTION',
  'INSPECTED',
  'PENDING_RETURN_DEPT',
  'PENDING_RETURN_ADMIN',
]

const DISPOSAL_INCLUDE = {
  asset: { select: { id: true, assetCode: true, name: true, status: true, category: { select: { class: true } } } },
  requestedBy: { select: { id: true, name: true } },
  managerApprovedBy: { select: { id: true, name: true } },
  approvedBy: { select: { id: true, name: true } },
  rejectedBy: { select: { id: true, name: true } },
  evidences: true,
} as const

type DisposalWithRelations = Awaited<
  ReturnType<typeof prisma.disposal.findFirstOrThrow<{ include: typeof DISPOSAL_INCLUDE }>>
>

function toListItem(d: DisposalWithRelations): DisposalListItem {
  return {
    id: d.id,
    status: d.status,
    reason: d.reason,
    note: d.note,
    journalEntryNumber: d.journalEntryNumber,
    assetId: d.asset.id,
    assetCode: d.asset.assetCode,
    assetName: d.asset.name,
    requestedById: d.requestedBy.id,
    requestedByName: d.requestedBy.name,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }
}

function toDetail(d: DisposalWithRelations): DisposalDetail {
  return {
    ...toListItem(d),
    previousStatus: d.previousStatus,
    managerApprovedAt: d.managerApprovedAt,
    managerApprovedById: d.managerApprovedById,
    managerApprovedByName: d.managerApprovedBy?.name ?? null,
    approvedAt: d.approvedAt,
    approvedById: d.approvedById,
    approvedByName: d.approvedBy?.name ?? null,
    completedAt: d.completedAt,
    rejectedAt: d.rejectedAt,
    rejectedById: d.rejectedById,
    rejectedByName: d.rejectedBy?.name ?? null,
    rejectReason: d.rejectReason,
    cancelledAt: d.cancelledAt,
    evidences: d.evidences.map((e) => ({
      id: e.id,
      url: e.url,
      label: e.label,
      uploadedAt: e.uploadedAt,
    })),
    // ADR 0006 — JsonValue 를 DisposalCriteria shape 로 좁힘 (validation 은 신청 시 zod 가 보장)
    criteria: (d.criteria as unknown as import('./disposal.types').DisposalCriteria | null) ?? null,
    assetClass: d.asset.category?.class ?? null,
  }
}

function assertTransition(current: DisposalStatus, next: DisposalStatus): void {
  if (!ALLOWED_TRANSITIONS[current].includes(next)) {
    throw new AppError(409, `상태 전이 불가: ${current} → ${next}`)
  }
}

// 원자적 상태 전이 — assertTransition은 락 없는 사전 체크일 뿐이라, 동시에 같은
// 건을 여러 번 전이시키는 요청이 전부 통과해버릴 수 있음(loans/licenses/maintenance와
// 동일한 클래스). updateMany(where: {id, status: fromStatus})로 조건부 갱신하고,
// 실제로 갱신된 건이 없으면(이미 다른 요청이 선점) 409로 거부해 트랜잭션을 롤백한다.
async function claimTransition(
  tx: Prisma.TransactionClient,
  id: string,
  fromStatus: DisposalStatus,
  data: Record<string, unknown>,
): Promise<void> {
  const claimed = await tx.disposal.updateMany({ where: { id, status: fromStatus }, data })
  if (claimed.count === 0) {
    throw new AppError(409, '이미 다른 요청으로 처리된 폐기 건입니다.')
  }
}

async function findOrThrow(id: string): Promise<DisposalWithRelations> {
  const disposal = await prisma.disposal.findUnique({
    where: { id },
    include: DISPOSAL_INCLUDE,
  })
  if (!disposal) throw new AppError(404, '폐기 기록을 찾을 수 없습니다.')
  return disposal
}

const list = async (
  query: ListDisposalsQuery,
  _requester: RequesterContext,
): Promise<PaginatedResult<DisposalListItem>> => {
  const where = {
    ...(query.status && { status: query.status }),
    ...(query.assetId && { assetId: query.assetId }),
  }
  /*
  const where : Record<string, any> = {}
  if (query.status) where.status = query.status
  if (query.assetId) where.assetId = query.assetId
  */

  /*
    upsert 를 transaction 내에 쓰면 데이터 불일치 404 에러를 숨기는 현상이 발생됨.
  */
  const skip = (query.page - 1) * query.pageSize
  const { rows, total } = await fetchPage(
    () =>
      prisma.disposal.findMany({
        where,
        include: DISPOSAL_INCLUDE,
        orderBy: { createdAt: 'desc' },
        skip,
        take: query.pageSize,
      }),
    () => prisma.disposal.count({ where }),
  )
  return paginate(rows.map(toListItem), total, query.page, query.pageSize)
}

const getById = async (id: string, _requester: RequesterContext): Promise<DisposalDetail> => {
  return toDetail(await findOrThrow(id))
}

const create = async (
  body: CreateDisposalBody,
  requester: RequesterContext,
): Promise<DisposalDetail> => {
  const asset = await prisma.asset.findUnique({ where: { id: body.assetId } })
  if (!asset) throw new AppError(404, '자산을 찾을 수 없습니다.')
  if (asset.status === 'RETIRED') throw new AppError(400, '이미 폐기(RETIRED)된 자산입니다.')
  if (asset.status === 'REPAIR') throw new AppError(400, '수리 중인 자산은 폐기 신청할 수 없습니다. 수리 완료 후 신청하세요.')

  // ADR 0005 — 진행 중 폐기 신청 중복 차단 (PENDING_MANAGER/PENDING_ADMIN/APPROVED)
  const existing = await prisma.disposal.findFirst({
    where: {
      assetId: body.assetId,
      status: { in: ['PENDING', 'PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED'] },
    },
  })
  if (existing) throw new AppError(409, '이미 진행 중인 폐기 신청이 있습니다.')

  // ADR 0005 — 활성 Loan 자산은 폐기 신청 차단 (반납 또는 RECALLED 먼저)
  const activeLoan = await prisma.loan.findFirst({
    where: { assetId: body.assetId, status: { in: ACTIVE_LOAN_STATUSES } },
    select: { id: true, status: true },
  })
  if (activeLoan) {
    throw new AppError(
      409,
      `대여 중(또는 진행 중)인 자산은 폐기 신청할 수 없습니다. (Loan 상태: ${activeLoan.status}) 먼저 반납 또는 강제 회수(RECALLED) 처리하세요.`,
    )
  }

  const disposal = await prisma.$transaction(async (tx) => {
    // 원자적 점유 — 위 existing 체크는 락 없는 사전 체크일 뿐이라, 동시에 같은
    // 자산으로 여러 폐기 신청이 들어오면 전부 통과해버릴 수 있음. asset.status를
    // 조건부로 PENDING_DISPOSAL로 바꾸는 UPDATE 자체가 원자적 락 역할을 한다 —
    // 0건이면 그 사이 다른 요청이 이미 선점한 것.
    const claimed = await tx.asset.updateMany({
      where: { id: body.assetId, status: { notIn: ['RETIRED', 'REPAIR', 'PENDING_DISPOSAL'] } },
      data: { status: 'PENDING_DISPOSAL' },
    })
    if (claimed.count === 0) {
      throw new AppError(409, '이미 진행 중인 폐기 신청이 있거나 폐기 신청이 불가능한 자산입니다.')
    }
    return tx.disposal.create({
      data: {
        assetId: body.assetId,
        reason: body.reason,
        note: body.note,
        previousStatus: asset.status,
        requestedById: requester.id,
        // ADR 0006 — zod 가 1개 이상 true 보장
        criteria: body.criteria,
        // status 는 prisma default(PENDING_MANAGER) 사용
      },
      include: DISPOSAL_INCLUDE,
    })
  })

  // ADR 0005 — 다른 ASSET_MANAGER 전원에게 1차 승인 요청 알림 (best-effort)
  await fireAndForgetNotify('pending_manager', () =>
    notificationService.createDisposalPendingManagerNotifications({
      disposalId: disposal.id,
      assetCode: disposal.asset.assetCode,
      assetName: disposal.asset.name,
      requesterId: disposal.requestedById,
      requesterName: disposal.requestedBy.name,
    }),
  )

  return toDetail(disposal)
}

// ADR 0005 — 1차 승인 (다른 ASSET_MANAGER). 신청자 본인은 차단.
const approveManager = async (id: string, requester: RequesterContext): Promise<DisposalDetail> => {
  const disposal = await findOrThrow(id)
  assertTransition(disposal.status, 'PENDING_ADMIN')

  if (disposal.requestedById === requester.id) {
    throw new AppError(403, '본인이 신청한 폐기는 1차 승인할 수 없습니다 (자기결재 금지).')
  }

  const updated = await prisma.$transaction(async (tx) => {
    await claimTransition(tx, id, disposal.status, {
      status: 'PENDING_ADMIN',
      managerApprovedAt: new Date(),
      managerApprovedById: requester.id,
    })
    return tx.disposal.findUniqueOrThrow({ where: { id }, include: DISPOSAL_INCLUDE })
  })

  // ADR 0005 — ADMIN 전원에게 최종 승인 요청 알림
  await fireAndForgetNotify('pending_admin', () =>
    notificationService.createDisposalPendingAdminNotifications({
      disposalId: updated.id,
      assetCode: updated.asset.assetCode,
      assetName: updated.asset.name,
      requesterName: updated.requestedBy.name,
    }),
  )

  return toDetail(updated)
}

// ADR 0005 — 최종 승인 (ADMIN). PENDING_ADMIN 단계에서만 가능.
const approveAdmin = async (
  id: string,
  body: ApproveAdminDisposalBody,
  requester: RequesterContext,
): Promise<DisposalDetail> => {
  const disposal = await findOrThrow(id)
  assertTransition(disposal.status, 'APPROVED')

  const updated = await prisma.$transaction(async (tx) => {
    await claimTransition(tx, id, disposal.status, {
      status: 'APPROVED',
      approvedAt: new Date(),
      approvedById: requester.id,
      journalEntryNumber: body.journalEntryNumber ?? disposal.journalEntryNumber,
    })
    return tx.disposal.findUniqueOrThrow({ where: { id }, include: DISPOSAL_INCLUDE })
  })

  // ADR 0005 — 신청자에게 승인 완료 알림
  await fireAndForgetNotify('approved', () =>
    notificationService.createDisposalApprovedNotification({
      disposalId: updated.id,
      assetCode: updated.asset.assetCode,
      assetName: updated.asset.name,
      recipientUserId: updated.requestedById,
    }),
  )

  return toDetail(updated)
}

const reject = async (
  id: string,
  body: RejectDisposalBody,
  requester: RequesterContext,
): Promise<DisposalDetail> => {
  const disposal = await findOrThrow(id)
  assertTransition(disposal.status, 'REJECTED')

  const updated = await prisma.$transaction(async (tx) => {
    await claimTransition(tx, id, disposal.status, {
      status: 'REJECTED',
      rejectedAt: new Date(),
      rejectedById: requester.id,
      rejectReason: body.rejectReason,
    })
    await tx.asset.update({
      where: { id: disposal.assetId },
      data: { status: disposal.previousStatus },
    })
    return tx.disposal.findUniqueOrThrow({ where: { id }, include: DISPOSAL_INCLUDE })
  })

  // ADR 0005 — 신청자에게 반려 알림
  await fireAndForgetNotify('rejected', () =>
    notificationService.createDisposalRejectedNotification({
      disposalId: updated.id,
      assetCode: updated.asset.assetCode,
      assetName: updated.asset.name,
      recipientUserId: updated.requestedById,
      rejectReason: body.rejectReason,
    }),
  )

  return toDetail(updated)
}

const cancel = async (id: string, requester: RequesterContext): Promise<DisposalDetail> => {
  const disposal = await findOrThrow(id)
  assertTransition(disposal.status, 'CANCELLED')

  if (disposal.requestedById !== requester.id) {
    throw new AppError(403, '신청자 본인만 취소할 수 있습니다.')
  }

  const updated = await prisma.$transaction(async (tx) => {
    await claimTransition(tx, id, disposal.status, { status: 'CANCELLED', cancelledAt: new Date() })
    await tx.asset.update({
      where: { id: disposal.assetId },
      data: { status: disposal.previousStatus },
    })
    return tx.disposal.findUniqueOrThrow({ where: { id }, include: DISPOSAL_INCLUDE })
  })
  return toDetail(updated)
}

const complete = async (
  id: string,
  body: CompleteDisposalBody,
  _requester: RequesterContext,
): Promise<DisposalDetail> => {
  const disposal = await findOrThrow(id)
  assertTransition(disposal.status, 'COMPLETED')

  const updated = await prisma.$transaction(async (tx) => {
    await claimTransition(tx, id, disposal.status, {
      status: 'COMPLETED',
      completedAt: new Date(),
      journalEntryNumber: body.journalEntryNumber ?? disposal.journalEntryNumber,
    })
    if (body.evidences?.length) {
      await tx.disposalEvidence.deleteMany({ where: { disposalId: id } })
      await tx.disposalEvidence.createMany({
        data: body.evidences.map((e) => ({ disposalId: id, url: e.url, label: e.label })),
      })
    }
    await tx.asset.update({
      where: { id: disposal.assetId },
      data: { status: 'RETIRED' },
    })
    return tx.disposal.findUniqueOrThrow({ where: { id }, include: DISPOSAL_INCLUDE })
  })

  // ADR 0005 — 신청자에게 완료 알림
  await fireAndForgetNotify('completed', () =>
    notificationService.createDisposalCompletedNotification({
      disposalId: updated.id,
      assetCode: updated.asset.assetCode,
      assetName: updated.asset.name,
      recipientUserId: updated.requestedById,
    }),
  )

  return toDetail(updated)
}

// 폐기 사유 한글 레이블 (FE DISPOSAL_REASON_LABEL 과 동일)
const REASON_LABEL: Record<string, string> = {
  WEAR_AND_TEAR: '노후화',
  DAMAGE: '파손',
  LOST: '분실',
  SECURITY_RISK: '보안 위협',
  TECHNOLOGY_OBSOLESCENCE: '기술 노후화',
  COST_INEFFICIENCY: '비용 비효율',
  END_OF_SUPPORT: '지원 종료',
}

function formatDate(d: Date | null | undefined): string {
  if (!d) return '-'
  return d.toISOString().slice(0, 10)
}

export async function exportDisposalsExcel(): Promise<Buffer> {
  const rows = await prisma.disposal.findMany({
    where: { status: 'COMPLETED' },
    include: {
      asset: {
        include: {
          category: { select: { name: true } },
          assignedUser: { select: { name: true } },
          // depreciation 은 Asset 당 1개 (1:1), records 는 회계연도별 복수
          depreciation: {
            include: {
              records: {
                orderBy: { recordedAt: 'desc' },
                take: 1,
                select: { bookValue: true, recordedAt: true },
              },
            },
          },
        },
      },
      requestedBy: { select: { name: true } },
      approvedBy: { select: { name: true } },
    },
    orderBy: { completedAt: 'desc' },
  })

  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('폐기자산대장')

  ws.columns = [
    { header: '자산코드',    key: 'assetCode',     width: 14 },
    { header: '자산명',      key: 'name',          width: 24 },
    { header: '카테고리',    key: 'category',      width: 16 },
    { header: '취득일',      key: 'purchaseDate',  width: 14 },
    { header: '취득원가',    key: 'purchasePrice', width: 16 },
    { header: '잔존가액',    key: 'bookValue',     width: 16 },
    { header: '폐기 사유',   key: 'reason',        width: 20 },
    { header: '폐기 완료일', key: 'completedAt',   width: 14 },
    { header: '담당자',      key: 'assignedUser',  width: 16 },
    { header: '최종 승인자', key: 'approvedBy',    width: 16 },
  ]

  // 헤더 행 스타일
  const headerRow = ws.getRow(1)
  headerRow.eachCell((cell) => {
    cell.font = { bold: true }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE5E7EB' },
    }
  })

  for (const d of rows) {
    const latestRecord = d.asset.depreciation?.records[0]
    ws.addRow({
      assetCode:    d.asset.assetCode,
      name:         d.asset.name,
      category:     d.asset.category?.name ?? '-',
      purchaseDate: formatDate(d.asset.purchaseDate),
      purchasePrice: d.asset.purchasePrice.toNumber(),
      bookValue:    latestRecord ? latestRecord.bookValue.toNumber() : 0,
      reason:       REASON_LABEL[d.reason] ?? d.reason,
      completedAt:  formatDate(d.completedAt),
      assignedUser: d.asset.assignedUser?.name ?? '-',
      approvedBy:   d.approvedBy?.name ?? '-',
    })
  }

  // 취득원가·잔존가액 열 통화 포맷
  ws.getColumn('purchasePrice').numFmt = '#,##0'
  ws.getColumn('bookValue').numFmt = '#,##0'

  const arrayBuffer = await wb.xlsx.writeBuffer()
  return Buffer.from(arrayBuffer)
}

export const disposalService = {
  list,
  getById,
  create,
  approveManager,
  approveAdmin,
  reject,
  cancel,
  complete,
}
