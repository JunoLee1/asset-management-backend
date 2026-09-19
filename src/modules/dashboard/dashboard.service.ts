import { prisma } from '../../lib/prisma'
import type { DashboardData } from './dashboard.types'

const getDashboard = async (requester: { id: string; role: string }): Promise<DashboardData> => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  // TEAM_LEAD: 자기 팀 전부 조회 — 한 사람이 여러 팀의 팀장을 겸임할 수 있음
  // (loan.service.ts의 승인 권한 체크도 동일하게 findMany로 겸임을 전제함)
  const ledTeams =
    requester.role === 'TEAM_LEAD'
      ? await prisma.team.findMany({
          where: { teamLeadId: requester.id },
          include: { department: { select: { id: true, name: true } } },
        })
      : []

  // DEPT_LEAD / REPAIR_OWNER: 자기 부서 조회
  const ledDept =
    requester.role === 'DEPT_LEAD' || requester.role === 'REPAIR_OWNER'
      ? await prisma.department.findFirst({
          where: { leaderId: requester.id },
          include: { teams: { select: { id: true, name: true } } },
        })
      : null

  // 자산 필터: TEAM_LEAD → 겸임 중인 팀들의 부서 전체, DEPT_LEAD → 본인 부서, 나머지 → 전사
  const ledTeamDeptIds = [...new Set(ledTeams.map((t) => t.departmentId))]
  const scopeDeptIds = ledTeamDeptIds.length > 0 ? ledTeamDeptIds : ledDept ? [ledDept.id] : []
  const deptFilter = scopeDeptIds.length > 0 ? { departmentId: { in: scopeDeptIds } } : {}
  const scopeLabel =
    ledTeams.length > 0
      ? [...new Set(ledTeams.map((t) => t.department.name))].join(', ')
      : (ledDept?.name ?? null)

  const [
    totalAssets,
    activeAssets,
    underMaintenance,
    thisMonthRegistered,
    pendingApprovalCount,
    pendingInspectionCount,
  ] = await Promise.all([
    prisma.asset.count({ where: { status: { not: 'RETIRED' }, ...deptFilter } }),
    prisma.asset.count({ where: { status: { in: ['IDLE', 'OPERATING'] }, ...deptFilter } }),
    // REPAIR — 정비 승인됨/작업 중 자산 (이전 PENDING_MAINTENANCE + UNDER_MAINTENANCE 통합)
    prisma.asset.count({
      where: { status: 'REPAIR', ...deptFilter },
    }),
    prisma.asset.count({
      where: { status: { not: 'RETIRED' }, createdAt: { gte: startOfMonth }, ...deptFilter },
    }),
    // TEAM_LEAD: 내 팀 PENDING_MANAGER / DEPT_LEAD·REPAIR_OWNER: 내 부서 PENDING_DEPT + PENDING_RETURN_DEPT / 나머지: 전사
    requester.role === 'TEAM_LEAD'
      ? ledTeams.length > 0
        ? prisma.loan.count({
            where: {
              status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] },
              user: { teamId: { in: ledTeams.map((t) => t.id) } },
            },
          })
        : Promise.resolve(0)
      : requester.role === 'DEPT_LEAD' || requester.role === 'REPAIR_OWNER'
        ? ledDept
          ? prisma.loan.count({
              where: {
                status: { in: ['PENDING_DEPT', 'PENDING_RETURN_DEPT'] },
                user: { team: { departmentId: ledDept.id } },
              },
            })
          : Promise.resolve(0)
        : prisma.loan.count({ where: { status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] } } }),
    prisma.loan.count({ where: { status: 'PENDING_INSPECTION' } }),
  ])

  const historyInclude = {
    asset: { select: { assetCode: true, name: true } },
    performedBy: { select: { name: true } },
  } as const

  const [categories, departments, maintenances, histories] = await Promise.all([
    prisma.assetCategory.findMany({
      where: { assets: { some: {} } },
      include: { _count: { select: { assets: true } } },
      orderBy: { assets: { _count: 'desc' } },
    }),
    prisma.department.findMany({
      where: { assets: { some: {} } },
      include: { _count: { select: { assets: true } } },
      orderBy: { assets: { _count: 'desc' } },
    }),
    prisma.maintenance.findMany({
      where: {
        status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED', 'IN_PROGRESS'] },
        scheduledAt: { lte: sevenDaysLater },
        ...(scopeDeptIds.length > 0 ? { asset: { departmentId: { in: scopeDeptIds } } } : {}),
      },
      include: { asset: { select: { assetCode: true, name: true } } },
      orderBy: { scheduledAt: 'asc' },
      take: 5,
    }),
    prisma.assetHistory.findMany({
      where: scopeDeptIds.length > 0 ? { asset: { departmentId: { in: scopeDeptIds } } } : {},
      include: historyInclude,
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  // DEPT_LEAD 전용: 팀별 배정 자산 수
  const byTeam = ledDept
    ? await Promise.all(
        ledDept.teams.map(async (team) => {
          const assignedCount = await prisma.asset.count({
            where: {
              status: { not: 'RETIRED' },
              assignedUser: { teamId: team.id },
            },
          })
          return { id: team.id, name: team.name, assignedCount, totalCount: assignedCount }
        }),
      )
    : undefined

  // REPAIR_OWNER 전용: 전사 수리 현황
  const repairData =
    requester.role === 'REPAIR_OWNER'
      ? await (async () => {
          const [pendingAdminCount, inProgressCount, thisMonthCompletedCount, maintenancesWithVendor, recentRepairs] =
            await Promise.all([
              prisma.maintenance.count({ where: { status: 'PENDING_ADMIN' } }),
              prisma.maintenance.count({ where: { status: 'IN_PROGRESS' } }),
              prisma.maintenance.count({
                where: { status: 'COMPLETED', completedAt: { gte: startOfMonth } },
              }),
              prisma.maintenance.findMany({
                where: { vendorId: { not: null } },
                select: { vendorId: true, vendor: { select: { id: true, name: true } } },
              }),
              prisma.maintenance.findMany({
                where: { status: { in: ['PENDING_ADMIN', 'APPROVED', 'IN_PROGRESS', 'COMPLETED'] } },
                include: {
                  asset: { select: { assetCode: true, name: true } },
                  vendor: { select: { name: true } },
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
              }),
            ])

          const vendorCountMap = new Map<string, { vendorId: string; vendorName: string; count: number }>()
          for (const m of maintenancesWithVendor) {
            if (!m.vendorId || !m.vendor) continue
            const entry = vendorCountMap.get(m.vendorId)
            if (entry) {
              entry.count++
            } else {
              vendorCountMap.set(m.vendorId, { vendorId: m.vendorId, vendorName: m.vendor.name, count: 1 })
            }
          }
          const byVendor = [...vendorCountMap.values()].sort((a, b) => b.count - a.count).slice(0, 10)

          return {
            repairStats: { pendingAdminCount, inProgressCount, thisMonthCompletedCount },
            byVendor,
            recentRepairHistory: recentRepairs.map((r) => ({
              id: r.id,
              assetCode: r.asset.assetCode,
              assetName: r.asset.name,
              title: r.title,
              status: r.status,
              vendorName: r.vendor?.name ?? null,
              scheduledAt: r.scheduledAt,
              completedAt: r.completedAt,
            })),
          }
        })()
      : null

  // DEPT_LEAD 전용: 부서원 배정 자산 카테고리별 집계
  const byCategoryDeptRaw = ledDept
    ? await prisma.assetCategory.findMany({
        where: {
          assets: {
            some: {
              status: { not: 'RETIRED' },
              assignedUser: { team: { departmentId: ledDept.id } },
            },
          },
        },
        include: {
          _count: {
            select: {
              assets: {
                where: {
                  status: { not: 'RETIRED' },
                  assignedUser: { team: { departmentId: ledDept.id } },
                },
              },
            },
          },
        },
        orderBy: { assets: { _count: 'desc' } },
      })
    : null

  // TEAM_LEAD 전용: 내 팀원이 수행한 이력 (histories와 동일 타입)
  const teamHistories = ledTeams.length > 0
    ? await prisma.assetHistory.findMany({
        where: { performedBy: { teamId: { in: ledTeams.map((t) => t.id) } } },
        include: historyInclude,
        orderBy: { createdAt: 'desc' },
        take: 5,
      })
    : null

  const mapHistory = (h: (typeof histories)[number]) => ({
    id: h.id,
    assetCode: h.asset.assetCode,
    assetName: h.asset.name,
    action: h.action,
    performedBy: h.performedBy.name,
    createdAt: h.createdAt,
  })

  return {
    stats: {
      totalAssets,
      activeAssets,
      underMaintenance,
      thisMonthRegistered,
      pendingApprovalCount,
      pendingInspectionCount,
    },
    byCategory: categories.map((c) => ({
      name: c.name,
      count: c._count.assets,
      class: c.class,
    })),
    byDepartment: departments.map((d) => ({ name: d.name, count: d._count.assets })),
    alerts: maintenances.map((m) => ({
      id: m.id,
      assetCode: m.asset.assetCode,
      assetName: m.asset.name,
      title: m.title,
      status: m.status,
      scheduledAt: m.scheduledAt,
    })),
    recentHistory: histories.map(mapHistory),
    ...(teamHistories && { recentHistoryMyTeam: teamHistories.map(mapHistory) }),
    ...(byTeam && { byTeam }),
    ...(byCategoryDeptRaw && {
      byCategoryDept: byCategoryDeptRaw.map((c) => ({
        name: c.name,
        count: c._count.assets,
        class: c.class,
      })),
    }),
    ...(scopeLabel && { scopeLabel }),
    ...(repairData && repairData),
  }
}

export const dashboardService = { getDashboard }
