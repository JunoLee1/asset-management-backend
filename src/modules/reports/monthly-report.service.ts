import ExcelJS from 'exceljs'
import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import type { TeamReportStatus, DeptReportStatus } from '../../generated/prisma/enums'
import type { RequesterContext } from '../../lib/requestHelpers'

// ─────────────────────────────────────────
// 공통 스타일 상수
// ─────────────────────────────────────────

const HEADER_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFE5E7EB' }, // 연회색
}
const HEADER_FONT: Partial<ExcelJS.Font> = { bold: true }

function applyHeaderStyle(row: ExcelJS.Row) {
  row.eachCell((cell) => {
    cell.fill = HEADER_FILL
    cell.font = HEADER_FONT
    cell.alignment = { horizontal: 'center' }
  })
}

function fmtDate(d: Date | null | undefined): string {
  if (!d) return '-'
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function fmtDateTime(d: Date | null | undefined): string {
  if (!d) return '-'
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─────────────────────────────────────────
// 타입
// ─────────────────────────────────────────

export interface TeamMonthlyReportListItem {
  id: string
  teamId: string
  teamName: string
  departmentName: string
  year: number
  month: number
  status: TeamReportStatus
  assetCount: number
  newLoans: number
  returns: number
  overdueCount: number
  maintenanceCount: number
  submittedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface TeamMonthlyReportDetail extends TeamMonthlyReportListItem {
  teamLeadComment: string | null
  deptLeadComment: string | null
  rejectionReason: string | null
  submittedByName: string | null
  reviewedByName: string | null
  reviewedAt: Date | null
  rejectedByName: string | null
  rejectedAt: Date | null
}

export interface DeptMonthlyReportListItem {
  id: string
  departmentId: string
  departmentName: string
  year: number
  month: number
  status: DeptReportStatus
  totalAssets: number
  totalNewLoans: number
  totalReturns: number
  totalOverdue: number
  totalMaintenance: number
  finalizedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface DeptMonthlyReportDetail extends DeptMonthlyReportListItem {
  finalizedByName: string | null
}

// ─────────────────────────────────────────
// 목록·상세 — TeamMonthlyReport
// ─────────────────────────────────────────

export async function listTeamMonthlyReports(opts: {
  role: string
  teamId?: string | null
  departmentId?: string | null
  year?: number
  month?: number
  page?: number
  pageSize?: number
}) {
  const { role, teamId, departmentId, year, month, page = 1, pageSize = 20 } = opts

  const where: Record<string, unknown> = {}

  if (role === 'ADMIN' || role === 'ASSET_MANAGER') {
    // 전체 열람
  } else if (role === 'DEPT_LEAD' && departmentId) {
    // 본인 부서 내 팀 보고서
    where.team = { departmentId }
  } else if (role === 'TEAM_LEAD' && teamId) {
    // 본인 팀만
    where.teamId = teamId
  } else {
    throw new AppError(403, '열람 권한이 없습니다.')
  }

  if (year) where.year = year
  if (month) where.month = month

  const [total, rows] = await Promise.all([
    prisma.teamMonthlyReport.count({ where }),
    prisma.teamMonthlyReport.findMany({
      where,
      include: {
        team: { include: { department: { select: { name: true } } } },
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  return {
    items: rows.map(
      (r): TeamMonthlyReportListItem => ({
        id: r.id,
        teamId: r.teamId,
        teamName: r.team.name,
        departmentName: r.team.department.name,
        year: r.year,
        month: r.month,
        status: r.status,
        assetCount: r.assetCount,
        newLoans: r.newLoans,
        returns: r.returns,
        overdueCount: r.overdueCount,
        maintenanceCount: r.maintenanceCount,
        submittedAt: r.submittedAt,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }),
    ),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getTeamMonthlyReport(id: string, opts: { role: string; teamId?: string | null; departmentId?: string | null }): Promise<TeamMonthlyReportDetail> {
  const record = await prisma.teamMonthlyReport.findUnique({
    where: { id },
    include: {
      team: { include: { department: { select: { name: true } } } },
      submittedBy: { select: { name: true } },
      reviewedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  checkTeamReportAccess(record, opts)

  return {
    id: record.id,
    teamId: record.teamId,
    teamName: record.team.name,
    departmentName: record.team.department.name,
    year: record.year,
    month: record.month,
    status: record.status,
    assetCount: record.assetCount,
    newLoans: record.newLoans,
    returns: record.returns,
    overdueCount: record.overdueCount,
    maintenanceCount: record.maintenanceCount,
    submittedAt: record.submittedAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    teamLeadComment: record.teamLeadComment,
    deptLeadComment: record.deptLeadComment,
    rejectionReason: record.rejectionReason,
    submittedByName: record.submittedBy?.name ?? null,
    reviewedByName: record.reviewedBy?.name ?? null,
    reviewedAt: record.reviewedAt,
    rejectedByName: record.rejectedBy?.name ?? null,
    rejectedAt: record.rejectedAt,
  }
}

// ─────────────────────────────────────────
// 목록·상세 — DeptMonthlyReport
// ─────────────────────────────────────────

export async function listDeptMonthlyReports(opts: {
  role: string
  departmentId?: string | null
  year?: number
  month?: number
  page?: number
  pageSize?: number
}) {
  const { role, departmentId, year, month, page = 1, pageSize = 20 } = opts

  const where: Record<string, unknown> = {}

  if (role === 'ADMIN' || role === 'ASSET_MANAGER') {
    // 전체
  } else if ((role === 'DEPT_LEAD') && departmentId) {
    where.departmentId = departmentId
  } else {
    throw new AppError(403, '열람 권한이 없습니다.')
  }

  if (year) where.year = year
  if (month) where.month = month

  const [total, rows] = await Promise.all([
    prisma.deptMonthlyReport.count({ where }),
    prisma.deptMonthlyReport.findMany({
      where,
      include: { department: { select: { name: true } } },
      orderBy: [{ year: 'desc' }, { month: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  return {
    items: rows.map(
      (r): DeptMonthlyReportListItem => ({
        id: r.id,
        departmentId: r.departmentId,
        departmentName: r.department.name,
        year: r.year,
        month: r.month,
        status: r.status,
        totalAssets: r.totalAssets,
        totalNewLoans: r.totalNewLoans,
        totalReturns: r.totalReturns,
        totalOverdue: r.totalOverdue,
        totalMaintenance: r.totalMaintenance,
        finalizedAt: r.finalizedAt,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }),
    ),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getDeptMonthlyReport(id: string, opts: { role: string; departmentId?: string | null }): Promise<DeptMonthlyReportDetail> {
  const record = await prisma.deptMonthlyReport.findUnique({
    where: { id },
    include: {
      department: { select: { name: true } },
      finalizedBy: { select: { name: true } },
    },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  checkDeptReportAccess(record, opts)

  return {
    id: record.id,
    departmentId: record.departmentId,
    departmentName: record.department.name,
    year: record.year,
    month: record.month,
    status: record.status,
    totalAssets: record.totalAssets,
    totalNewLoans: record.totalNewLoans,
    totalReturns: record.totalReturns,
    totalOverdue: record.totalOverdue,
    totalMaintenance: record.totalMaintenance,
    finalizedAt: record.finalizedAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    finalizedByName: record.finalizedBy?.name ?? null,
  }
}

// ─────────────────────────────────────────
// 권한 체크 헬퍼
// ─────────────────────────────────────────

function checkTeamReportAccess(
  record: { teamId: string; team: { departmentId: string } },
  opts: { role: string; teamId?: string | null; departmentId?: string | null },
) {
  const { role, teamId, departmentId } = opts
  if (role === 'ADMIN' || role === 'ASSET_MANAGER') return
  if (role === 'DEPT_LEAD' && departmentId && record.team.departmentId === departmentId) return
  if (role === 'TEAM_LEAD' && teamId && record.teamId === teamId) return
  throw new AppError(403, '열람 권한이 없습니다.')
}

function checkDeptReportAccess(
  record: { departmentId: string },
  opts: { role: string; departmentId?: string | null },
) {
  const { role, departmentId } = opts
  if (role === 'ADMIN' || role === 'ASSET_MANAGER') return
  if (role === 'DEPT_LEAD' && departmentId && record.departmentId === departmentId) return
  throw new AppError(403, '열람 권한이 없습니다.')
}

function assertTeamReportExportable(status: TeamReportStatus) {
  if (status !== 'REVIEWED') {
    throw new AppError(400, 'REVIEWED 상태의 보고서만 내보낼 수 있습니다.')
  }
}

function assertDeptReportExportable(status: DeptReportStatus) {
  if (status !== 'FINALIZED') {
    throw new AppError(400, 'FINALIZED 상태의 보고서만 내보낼 수 있습니다.')
  }
}

// ─────────────────────────────────────────
// 자산 목록 live 쿼리 헬퍼
// ─────────────────────────────────────────

async function fetchTeamAssets(teamId: string) {
  // 1차: assignedUser.teamId 기준 (팀 소속 담당자)
  const assets = await prisma.asset.findMany({
    where: {
      assignedUser: { teamId },
    },
    include: {
      category: { select: { name: true } },
      assignedUser: { select: { name: true } },
    },
    orderBy: { assetCode: 'asc' },
  })
  return assets
}

async function fetchDeptAssets(departmentId: string) {
  return prisma.asset.findMany({
    where: { departmentId },
    include: {
      category: { select: { name: true } },
      assignedUser: { select: { name: true } },
    },
    orderBy: { assetCode: 'asc' },
  })
}

// ─────────────────────────────────────────
// 상태 전이 — TeamMonthlyReport
// ─────────────────────────────────────────

export async function submitTeamReport(
  id: string,
  requester: RequesterContext,
  body: { comment?: string },
) {
  const record = await prisma.teamMonthlyReport.findUnique({
    where: { id },
    include: { team: { select: { departmentId: true } } },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  // 권한 체크: TEAM_LEAD는 본인 팀만
  if (requester.role !== 'ADMIN') {
    if (requester.role !== 'TEAM_LEAD' || record.teamId !== requester.teamId) {
      throw new AppError(403, '제출 권한이 없습니다.')
    }
  }

  // 허용 상태: DRAFT, REJECTED
  if (record.status !== 'DRAFT' && record.status !== 'REJECTED') {
    throw new AppError(400, `현재 상태(${record.status})에서는 제출할 수 없습니다.`)
  }

  const updated = await prisma.teamMonthlyReport.update({
    where: { id },
    data: {
      status: 'SUBMITTED',
      teamLeadComment: body.comment ?? null,
      submittedById: requester.id,
      submittedAt: new Date(),
      // 재제출 시 반려 정보 초기화
      rejectedById: null,
      rejectedAt: null,
      rejectionReason: null,
    },
  })

  return updated
}

export async function reviewTeamReport(
  id: string,
  requester: RequesterContext,
  body: { comment?: string },
) {
  const record = await prisma.teamMonthlyReport.findUnique({
    where: { id },
    include: { team: { select: { departmentId: true } } },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  // 권한 체크: DEPT_LEAD는 본인 부서 산하 팀만
  if (requester.role !== 'ADMIN') {
    if (
      requester.role !== 'DEPT_LEAD' ||
      record.team.departmentId !== requester.departmentId
    ) {
      throw new AppError(403, '검토 권한이 없습니다.')
    }
  }

  // 허용 상태: SUBMITTED
  if (record.status !== 'SUBMITTED') {
    throw new AppError(400, `현재 상태(${record.status})에서는 검토할 수 없습니다.`)
  }

  const updated = await prisma.teamMonthlyReport.update({
    where: { id },
    data: {
      status: 'REVIEWED',
      reviewedById: requester.id,
      reviewedAt: new Date(),
      deptLeadComment: body.comment ?? null,
    },
  })

  // 부서 보고서 자동 생성 시도
  await maybeCreateDeptReport(record.team.departmentId, record.year, record.month)

  return updated
}

export async function rejectTeamReport(
  id: string,
  requester: RequesterContext,
  body: { reason: string },
) {
  const record = await prisma.teamMonthlyReport.findUnique({
    where: { id },
    include: { team: { select: { departmentId: true } } },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  // 권한 체크: DEPT_LEAD는 본인 부서 산하 팀만
  if (requester.role !== 'ADMIN') {
    if (
      requester.role !== 'DEPT_LEAD' ||
      record.team.departmentId !== requester.departmentId
    ) {
      throw new AppError(403, '반려 권한이 없습니다.')
    }
  }

  // 허용 상태: SUBMITTED
  if (record.status !== 'SUBMITTED') {
    throw new AppError(400, `현재 상태(${record.status})에서는 반려할 수 없습니다.`)
  }

  const updated = await prisma.teamMonthlyReport.update({
    where: { id },
    data: {
      status: 'REJECTED',
      rejectedById: requester.id,
      rejectedAt: new Date(),
      rejectionReason: body.reason,
    },
  })

  return updated
}

export async function finalizeDeptReport(id: string, requester: RequesterContext) {
  const record = await prisma.deptMonthlyReport.findUnique({
    where: { id },
    select: { id: true, departmentId: true, status: true },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  // 권한 체크: DEPT_LEAD는 본인 부서만
  if (requester.role !== 'ADMIN') {
    if (
      requester.role !== 'DEPT_LEAD' ||
      record.departmentId !== requester.departmentId
    ) {
      throw new AppError(403, '확정 권한이 없습니다.')
    }
  }

  // 허용 상태: DRAFT
  if (record.status !== 'DRAFT') {
    throw new AppError(400, `현재 상태(${record.status})에서는 확정할 수 없습니다.`)
  }

  const updated = await prisma.deptMonthlyReport.update({
    where: { id },
    data: {
      status: 'FINALIZED',
      finalizedById: requester.id,
      finalizedAt: new Date(),
    },
  })

  return updated
}

// ─────────────────────────────────────────
// 내부 헬퍼 — 부서 보고서 자동 생성
// ─────────────────────────────────────────

async function maybeCreateDeptReport(
  departmentId: string,
  year: number,
  month: number,
) {
  // 해당 부서의 (year, month) TeamMonthlyReport 전체 조회
  const teamReports = await prisma.teamMonthlyReport.findMany({
    where: { year, month, team: { departmentId } },
    select: {
      status: true,
      assetCount: true,
      newLoans: true,
      returns: true,
      overdueCount: true,
      maintenanceCount: true,
    },
  })

  // 보고서가 없거나 전부 REVIEWED 가 아니면 생성 안 함
  if (teamReports.length === 0) return
  const allReviewed = teamReports.every((r) => r.status === 'REVIEWED')
  if (!allReviewed) return

  // 합산
  const totalAssets = teamReports.reduce((s, r) => s + r.assetCount, 0)
  const totalNewLoans = teamReports.reduce((s, r) => s + r.newLoans, 0)
  const totalReturns = teamReports.reduce((s, r) => s + r.returns, 0)
  const totalOverdue = teamReports.reduce((s, r) => s + r.overdueCount, 0)
  const totalMaintenance = teamReports.reduce((s, r) => s + r.maintenanceCount, 0)

  // 현재 DeptMonthlyReport 확인 (FINALIZED면 status 건드리지 않음)
  const existing = await prisma.deptMonthlyReport.findUnique({
    where: { departmentId_year_month: { departmentId, year, month } },
    select: { status: true },
  })

  await prisma.deptMonthlyReport.upsert({
    where: { departmentId_year_month: { departmentId, year, month } },
    create: {
      departmentId,
      year,
      month,
      status: 'DRAFT',
      totalAssets,
      totalNewLoans,
      totalReturns,
      totalOverdue,
      totalMaintenance,
    },
    update: {
      totalAssets,
      totalNewLoans,
      totalReturns,
      totalOverdue,
      totalMaintenance,
      // FINALIZED 상태라면 status 변경 안 함
      ...(existing?.status !== 'FINALIZED' ? { status: 'DRAFT' } : {}),
    },
  })
}

// ─────────────────────────────────────────
// Excel export — TeamMonthlyReport
// ─────────────────────────────────────────

export async function exportTeamMonthlyReportExcel(
  id: string,
  opts: { role: string; teamId?: string | null; departmentId?: string | null },
): Promise<{ buffer: Buffer; filename: string }> {
  const record = await prisma.teamMonthlyReport.findUnique({
    where: { id },
    include: {
      team: { include: { department: { select: { name: true } } } },
      submittedBy: { select: { name: true } },
      reviewedBy: { select: { name: true } },
    },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  checkTeamReportAccess(record, opts)
  assertTeamReportExportable(record.status)

  const assets = await fetchTeamAssets(record.teamId)

  const wb = new ExcelJS.Workbook()
  wb.creator = record.submittedBy?.name ?? '시스템'

  // ── 시트 1: 보고서 요약 ──
  const summaryWs = wb.addWorksheet('보고서 요약')
  summaryWs.columns = [{ width: 20 }, { width: 30 }, { width: 20 }, { width: 30 }]

  // 헤더 정보
  summaryWs.addRow(['팀명', record.team.name, '부서명', record.team.department.name])
  summaryWs.addRow(['기간', `${record.year}년 ${record.month}월`, '생성일', fmtDate(record.createdAt)])
  summaryWs.addRow([])

  // 집계 수치 테이블
  const statsHeaderRow = summaryWs.addRow(['항목', '수치'])
  applyHeaderStyle(statsHeaderRow)
  summaryWs.addRow(['보유 자산 수', record.assetCount])
  summaryWs.addRow(['신규 대여', record.newLoans])
  summaryWs.addRow(['반납', record.returns])
  summaryWs.addRow(['연체', record.overdueCount])
  summaryWs.addRow(['유지보수', record.maintenanceCount])
  summaryWs.addRow([])

  // 서명 기록
  const sigHeaderRow = summaryWs.addRow(['구분', '담당자', '일시', '코멘트'])
  applyHeaderStyle(sigHeaderRow)
  summaryWs.addRow([
    '제출자',
    record.submittedBy?.name ?? '-',
    fmtDateTime(record.submittedAt),
    record.teamLeadComment ?? '-',
  ])
  summaryWs.addRow([
    '검토자',
    record.reviewedBy?.name ?? '-',
    fmtDateTime(record.reviewedAt),
    record.deptLeadComment ?? '-',
  ])

  // ── 시트 2: 자산 목록 ──
  const assetWs = wb.addWorksheet('자산 목록')
  assetWs.columns = [
    { header: '자산코드', key: 'assetCode', width: 16 },
    { header: '자산명', key: 'name', width: 28 },
    { header: '카테고리', key: 'category', width: 18 },
    { header: '상태', key: 'status', width: 14 },
    { header: '담당자명', key: 'assignedUser', width: 14 },
    { header: '취득일', key: 'purchaseDate', width: 14 },
  ]
  applyHeaderStyle(assetWs.getRow(1))

  for (const a of assets) {
    assetWs.addRow({
      assetCode: a.assetCode,
      name: a.name,
      category: a.category.name,
      status: a.status,
      assignedUser: a.assignedUser?.name ?? '-',
      purchaseDate: fmtDate(a.purchaseDate),
    })
  }

  const buf = await wb.xlsx.writeBuffer()
  const teamName = record.team.name.replace(/\s/g, '_')
  const filename = `팀보고서_${teamName}_${record.year}년${record.month}월.xlsx`

  return { buffer: Buffer.from(buf), filename }
}

// ─────────────────────────────────────────
// Excel export — DeptMonthlyReport
// ─────────────────────────────────────────

export async function exportDeptMonthlyReportExcel(
  id: string,
  opts: { role: string; departmentId?: string | null },
): Promise<{ buffer: Buffer; filename: string }> {
  const record = await prisma.deptMonthlyReport.findUnique({
    where: { id },
    include: {
      department: { select: { name: true } },
      finalizedBy: { select: { name: true } },
    },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  checkDeptReportAccess(record, opts)
  assertDeptReportExportable(record.status)

  const assets = await fetchDeptAssets(record.departmentId)

  // 팀별 현황 집계 (산하 팀 보고서 기준)
  const teamReports = await prisma.teamMonthlyReport.findMany({
    where: {
      year: record.year,
      month: record.month,
      team: { departmentId: record.departmentId },
    },
    include: { team: { select: { name: true } } },
    orderBy: { team: { name: 'asc' } },
  })

  const wb = new ExcelJS.Workbook()
  wb.creator = record.finalizedBy?.name ?? '시스템'

  // ── 시트 1: 보고서 요약 ──
  const summaryWs = wb.addWorksheet('보고서 요약')
  summaryWs.columns = [{ width: 20 }, { width: 30 }, { width: 20 }, { width: 30 }]

  summaryWs.addRow(['부서명', record.department.name, '기간', `${record.year}년 ${record.month}월`])
  summaryWs.addRow(['생성일', fmtDate(record.createdAt), '', ''])
  summaryWs.addRow([])

  const statsHeaderRow = summaryWs.addRow(['항목', '수치'])
  applyHeaderStyle(statsHeaderRow)
  summaryWs.addRow(['총 자산 수', record.totalAssets])
  summaryWs.addRow(['신규 대여', record.totalNewLoans])
  summaryWs.addRow(['반납', record.totalReturns])
  summaryWs.addRow(['연체', record.totalOverdue])
  summaryWs.addRow(['유지보수', record.totalMaintenance])
  summaryWs.addRow([])

  const sigHeaderRow = summaryWs.addRow(['구분', '담당자', '일시', '코멘트'])
  applyHeaderStyle(sigHeaderRow)
  summaryWs.addRow([
    '최종 확정자',
    record.finalizedBy?.name ?? '-',
    fmtDateTime(record.finalizedAt),
    '-',
  ])

  // ── 시트 2: 팀별 현황 ──
  const teamWs = wb.addWorksheet('팀별 현황')
  teamWs.columns = [
    { header: '팀명', key: 'teamName', width: 20 },
    { header: '보유 자산 수', key: 'assetCount', width: 14 },
    { header: '신규 대여', key: 'newLoans', width: 12 },
    { header: '반납', key: 'returns', width: 10 },
    { header: '연체', key: 'overdueCount', width: 10 },
    { header: '유지보수', key: 'maintenanceCount', width: 12 },
    { header: '상태', key: 'status', width: 12 },
  ]
  applyHeaderStyle(teamWs.getRow(1))

  for (const tr of teamReports) {
    teamWs.addRow({
      teamName: tr.team.name,
      assetCount: tr.assetCount,
      newLoans: tr.newLoans,
      returns: tr.returns,
      overdueCount: tr.overdueCount,
      maintenanceCount: tr.maintenanceCount,
      status: tr.status,
    })
  }

  // 합계 행
  if (teamReports.length > 0) {
    const totalRow = teamWs.addRow({
      teamName: '합계',
      assetCount: teamReports.reduce((s, r) => s + r.assetCount, 0),
      newLoans: teamReports.reduce((s, r) => s + r.newLoans, 0),
      returns: teamReports.reduce((s, r) => s + r.returns, 0),
      overdueCount: teamReports.reduce((s, r) => s + r.overdueCount, 0),
      maintenanceCount: teamReports.reduce((s, r) => s + r.maintenanceCount, 0),
      status: '',
    })
    totalRow.font = { bold: true }
  }

  // 팀별 자산 목록도 간략히 (부서 전체 자산)
  const assetWs = wb.addWorksheet('부서 자산 목록')
  assetWs.columns = [
    { header: '자산코드', key: 'assetCode', width: 16 },
    { header: '자산명', key: 'name', width: 28 },
    { header: '카테고리', key: 'category', width: 18 },
    { header: '상태', key: 'status', width: 14 },
    { header: '담당자명', key: 'assignedUser', width: 14 },
    { header: '취득일', key: 'purchaseDate', width: 14 },
  ]
  applyHeaderStyle(assetWs.getRow(1))

  for (const a of assets) {
    assetWs.addRow({
      assetCode: a.assetCode,
      name: a.name,
      category: a.category.name,
      status: a.status,
      assignedUser: a.assignedUser?.name ?? '-',
      purchaseDate: fmtDate(a.purchaseDate),
    })
  }

  const buf = await wb.xlsx.writeBuffer()
  const deptName = record.department.name.replace(/\s/g, '_')
  const filename = `부서보고서_${deptName}_${record.year}년${record.month}월.xlsx`

  return { buffer: Buffer.from(buf), filename }
}

// ─────────────────────────────────────────
// Excel export — TeamAnnualReport
// ─────────────────────────────────────────

export async function exportTeamAnnualReportExcel(
  id: string,
  opts: { role: string; teamId?: string | null; departmentId?: string | null },
): Promise<{ buffer: Buffer; filename: string }> {
  const record = await prisma.teamAnnualReport.findUnique({
    where: { id },
    include: {
      team: { include: { department: { select: { name: true } } } },
      submittedBy: { select: { name: true } },
      reviewedBy: { select: { name: true } },
    },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  // 연간 보고서도 동일 접근 권한 패턴 적용
  checkTeamReportAccess(record, opts)
  assertTeamReportExportable(record.status)

  const assets = await fetchTeamAssets(record.teamId)

  const wb = new ExcelJS.Workbook()
  wb.creator = record.submittedBy?.name ?? '시스템'

  // ── 시트 1: 보고서 요약 ──
  const summaryWs = wb.addWorksheet('보고서 요약')
  summaryWs.columns = [{ width: 20 }, { width: 30 }, { width: 20 }, { width: 30 }]

  summaryWs.addRow(['팀명', record.team.name, '부서명', record.team.department.name])
  summaryWs.addRow(['기간', `${record.year}년 (연간)`, '생성일', fmtDate(record.createdAt)])
  summaryWs.addRow([])

  const statsHeaderRow = summaryWs.addRow(['항목', '수치'])
  applyHeaderStyle(statsHeaderRow)
  summaryWs.addRow(['보유 자산 수', record.assetCount])
  summaryWs.addRow(['신규 대여', record.newLoans])
  summaryWs.addRow(['반납', record.returns])
  summaryWs.addRow(['연체', record.overdueCount])
  summaryWs.addRow(['유지보수', record.maintenanceCount])
  summaryWs.addRow([])

  const sigHeaderRow = summaryWs.addRow(['구분', '담당자', '일시', '코멘트'])
  applyHeaderStyle(sigHeaderRow)
  summaryWs.addRow([
    '제출자',
    record.submittedBy?.name ?? '-',
    fmtDateTime(record.submittedAt),
    record.teamLeadComment ?? '-',
  ])
  summaryWs.addRow([
    '검토자',
    record.reviewedBy?.name ?? '-',
    fmtDateTime(record.reviewedAt),
    record.deptLeadComment ?? '-',
  ])

  // ── 시트 2: 자산 목록 ──
  const assetWs = wb.addWorksheet('자산 목록')
  assetWs.columns = [
    { header: '자산코드', key: 'assetCode', width: 16 },
    { header: '자산명', key: 'name', width: 28 },
    { header: '카테고리', key: 'category', width: 18 },
    { header: '상태', key: 'status', width: 14 },
    { header: '담당자명', key: 'assignedUser', width: 14 },
    { header: '취득일', key: 'purchaseDate', width: 14 },
  ]
  applyHeaderStyle(assetWs.getRow(1))

  for (const a of assets) {
    assetWs.addRow({
      assetCode: a.assetCode,
      name: a.name,
      category: a.category.name,
      status: a.status,
      assignedUser: a.assignedUser?.name ?? '-',
      purchaseDate: fmtDate(a.purchaseDate),
    })
  }

  const buf = await wb.xlsx.writeBuffer()
  const teamName = record.team.name.replace(/\s/g, '_')
  const filename = `팀연간보고서_${teamName}_${record.year}년.xlsx`

  return { buffer: Buffer.from(buf), filename }
}

// ─────────────────────────────────────────
// Excel export — DeptAnnualReport
// ─────────────────────────────────────────

export async function exportDeptAnnualReportExcel(
  id: string,
  opts: { role: string; departmentId?: string | null },
): Promise<{ buffer: Buffer; filename: string }> {
  const record = await prisma.deptAnnualReport.findUnique({
    where: { id },
    include: {
      department: { select: { name: true } },
      finalizedBy: { select: { name: true } },
    },
  })
  if (!record) throw new AppError(404, '보고서를 찾을 수 없습니다.')

  checkDeptReportAccess(record, opts)
  assertDeptReportExportable(record.status)

  const assets = await fetchDeptAssets(record.departmentId)

  // 팀별 연간 현황 집계
  const teamReports = await prisma.teamAnnualReport.findMany({
    where: {
      year: record.year,
      team: { departmentId: record.departmentId },
    },
    include: { team: { select: { name: true } } },
    orderBy: { team: { name: 'asc' } },
  })

  const wb = new ExcelJS.Workbook()
  wb.creator = record.finalizedBy?.name ?? '시스템'

  // ── 시트 1: 보고서 요약 ──
  const summaryWs = wb.addWorksheet('보고서 요약')
  summaryWs.columns = [{ width: 20 }, { width: 30 }, { width: 20 }, { width: 30 }]

  summaryWs.addRow(['부서명', record.department.name, '기간', `${record.year}년 (연간)`])
  summaryWs.addRow(['생성일', fmtDate(record.createdAt), '', ''])
  summaryWs.addRow([])

  const statsHeaderRow = summaryWs.addRow(['항목', '수치'])
  applyHeaderStyle(statsHeaderRow)
  summaryWs.addRow(['총 자산 수', record.totalAssets])
  summaryWs.addRow(['신규 대여', record.totalNewLoans])
  summaryWs.addRow(['반납', record.totalReturns])
  summaryWs.addRow(['연체', record.totalOverdue])
  summaryWs.addRow(['유지보수', record.totalMaintenance])
  summaryWs.addRow([])

  const sigHeaderRow = summaryWs.addRow(['구분', '담당자', '일시', '코멘트'])
  applyHeaderStyle(sigHeaderRow)
  summaryWs.addRow([
    '최종 확정자',
    record.finalizedBy?.name ?? '-',
    fmtDateTime(record.finalizedAt),
    '-',
  ])

  // ── 시트 2: 팀별 현황 ──
  const teamWs = wb.addWorksheet('팀별 현황')
  teamWs.columns = [
    { header: '팀명', key: 'teamName', width: 20 },
    { header: '보유 자산 수', key: 'assetCount', width: 14 },
    { header: '신규 대여', key: 'newLoans', width: 12 },
    { header: '반납', key: 'returns', width: 10 },
    { header: '연체', key: 'overdueCount', width: 10 },
    { header: '유지보수', key: 'maintenanceCount', width: 12 },
    { header: '상태', key: 'status', width: 12 },
  ]
  applyHeaderStyle(teamWs.getRow(1))

  for (const tr of teamReports) {
    teamWs.addRow({
      teamName: tr.team.name,
      assetCount: tr.assetCount,
      newLoans: tr.newLoans,
      returns: tr.returns,
      overdueCount: tr.overdueCount,
      maintenanceCount: tr.maintenanceCount,
      status: tr.status,
    })
  }

  if (teamReports.length > 0) {
    const totalRow = teamWs.addRow({
      teamName: '합계',
      assetCount: teamReports.reduce((s, r) => s + r.assetCount, 0),
      newLoans: teamReports.reduce((s, r) => s + r.newLoans, 0),
      returns: teamReports.reduce((s, r) => s + r.returns, 0),
      overdueCount: teamReports.reduce((s, r) => s + r.overdueCount, 0),
      maintenanceCount: teamReports.reduce((s, r) => s + r.maintenanceCount, 0),
      status: '',
    })
    totalRow.font = { bold: true }
  }

  // 부서 전체 자산 목록
  const assetWs = wb.addWorksheet('부서 자산 목록')
  assetWs.columns = [
    { header: '자산코드', key: 'assetCode', width: 16 },
    { header: '자산명', key: 'name', width: 28 },
    { header: '카테고리', key: 'category', width: 18 },
    { header: '상태', key: 'status', width: 14 },
    { header: '담당자명', key: 'assignedUser', width: 14 },
    { header: '취득일', key: 'purchaseDate', width: 14 },
  ]
  applyHeaderStyle(assetWs.getRow(1))

  for (const a of assets) {
    assetWs.addRow({
      assetCode: a.assetCode,
      name: a.name,
      category: a.category.name,
      status: a.status,
      assignedUser: a.assignedUser?.name ?? '-',
      purchaseDate: fmtDate(a.purchaseDate),
    })
  }

  const buf = await wb.xlsx.writeBuffer()
  const deptName = record.department.name.replace(/\s/g, '_')
  const filename = `부서연간보고서_${deptName}_${record.year}년.xlsx`

  return { buffer: Buffer.from(buf), filename }
}
