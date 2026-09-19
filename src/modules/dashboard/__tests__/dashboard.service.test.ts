import { dashboardService } from '../dashboard.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    asset: { count: jest.fn() },
    assetCategory: { findMany: jest.fn() },
    department: { findMany: jest.fn() },
    team: { findMany: jest.fn() },
    loan: { count: jest.fn() },
    maintenance: { findMany: jest.fn() },
    assetHistory: { findMany: jest.fn() },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockAssetCount = prisma.asset.count as jest.Mock
const mockCategoryFindMany = prisma.assetCategory.findMany as jest.Mock
const mockDeptFindMany = prisma.department.findMany as jest.Mock
const mockTeamFindMany = prisma.team.findMany as jest.Mock
const mockLoanCount = prisma.loan.count as jest.Mock
const mockMaintenanceFindMany = prisma.maintenance.findMany as jest.Mock
const mockHistoryFindMany = prisma.assetHistory.findMany as jest.Mock

const ADMIN = { id: 'admin-1', role: 'ADMIN' } as const
const TEAM_LEAD = { id: 'lead-1', role: 'TEAM_LEAD' } as const

beforeEach(() => {
  jest.clearAllMocks()

  mockAssetCount
    .mockResolvedValueOnce(100)  // total
    .mockResolvedValueOnce(80)   // active
    .mockResolvedValueOnce(10)   // underMaintenance
    .mockResolvedValueOnce(5)    // thisMonth

  mockLoanCount
    .mockResolvedValueOnce(3)    // pendingApprovalCount
    .mockResolvedValueOnce(2)    // pendingInspectionCount

  mockCategoryFindMany.mockResolvedValue([
    { id: 'c1', name: 'IT 기기', _count: { assets: 40 } },
    { id: 'c2', name: '사무 가구', _count: { assets: 30 } },
  ])

  mockDeptFindMany.mockResolvedValue([
    { id: 'd1', name: '개발팀', _count: { assets: 25 } },
    { id: 'd2', name: '마케팅팀', _count: { assets: 20 } },
  ])

  mockMaintenanceFindMany.mockResolvedValue([
    {
      id: 'm1',
      title: '노트북 점검',
      scheduledAt: new Date('2026-06-10'),
      status: 'PENDING',
      asset: { assetCode: 'IT-001', name: 'MacBook Pro' },
    },
  ])

  mockHistoryFindMany.mockResolvedValue([
    {
      id: 'h1',
      action: 'ASSIGNED',
      createdAt: new Date('2026-06-01'),
      asset: { assetCode: 'IT-001', name: 'MacBook Pro' },
      performedBy: { name: '관리자' },
    },
  ])
})

describe('dashboardService.getDashboard', () => {
  it('KPI 통계를 반환한다', async () => {
    const result = await dashboardService.getDashboard(ADMIN)
    expect(result.stats.totalAssets).toBe(100)
    expect(result.stats.activeAssets).toBe(80)
    expect(result.stats.underMaintenance).toBe(10)
    expect(result.stats.thisMonthRegistered).toBe(5)
  })

  it('카테고리별 자산 현황을 반환한다', async () => {
    const result = await dashboardService.getDashboard(ADMIN)
    expect(result.byCategory).toHaveLength(2)
    expect(result.byCategory[0]).toEqual({ name: 'IT 기기', count: 40 })
  })

  it('부서별 자산 현황을 반환한다', async () => {
    const result = await dashboardService.getDashboard(ADMIN)
    expect(result.byDepartment).toHaveLength(2)
    expect(result.byDepartment[0]).toEqual({ name: '개발팀', count: 25 })
  })

  it('주의 필요 항목(유지보수 예정)을 반환한다', async () => {
    const result = await dashboardService.getDashboard(ADMIN)
    expect(result.alerts).toHaveLength(1)
    expect(result.alerts[0]?.assetCode).toBe('IT-001')
    expect(result.alerts[0]?.title).toBe('노트북 점검')
  })

  it('최근 이력을 반환한다', async () => {
    const result = await dashboardService.getDashboard(ADMIN)
    expect(result.recentHistory).toHaveLength(1)
    expect(result.recentHistory[0]?.action).toBe('ASSIGNED')
    expect(result.recentHistory[0]?.performedBy).toBe('관리자')
  })

  it('totalAssets 카운트는 RETIRED 상태를 제외한다', async () => {
    await dashboardService.getDashboard(ADMIN)
    expect(mockAssetCount).toHaveBeenCalledWith({ where: { status: { not: 'RETIRED' } } })
  })

  it('activeAssets 카운트는 AVAILABLE + IN_USE 두 상태를 합산한다', async () => {
    await dashboardService.getDashboard(ADMIN)
    expect(mockAssetCount).toHaveBeenCalledWith({
      where: { status: { in: ['IDLE', 'OPERATING'] } },
    })
  })

  it('underMaintenance 카운트는 UNDER_MAINTENANCE 상태를 사용한다', async () => {
    await dashboardService.getDashboard(ADMIN)
    expect(mockAssetCount).toHaveBeenCalledWith({ where: { status: 'REPAIR' } })
  })

  describe('ADMIN — pendingApprovalCount', () => {
    it('PENDING_MANAGER + PENDING_ADMIN 전사 합산을 사용한다', async () => {
      await dashboardService.getDashboard(ADMIN)
      expect(mockLoanCount).toHaveBeenCalledWith({
        where: { status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] } },
      })
    })
  })

  describe('TEAM_LEAD — 부서 필터 + pendingApprovalCount', () => {
    it('자기 팀이 있으면 자산 카운트에 부서 필터가 적용된다', async () => {
      mockTeamFindMany.mockResolvedValue([
        { id: 'team-dev', teamLeadId: 'lead-1', departmentId: 'dept-dev', department: { id: 'dept-dev', name: '개발본부' } },
      ])
      mockLoanCount.mockReset().mockResolvedValueOnce(1).mockResolvedValueOnce(0)

      await dashboardService.getDashboard(TEAM_LEAD)

      expect(mockAssetCount).toHaveBeenCalledWith({
        where: { status: { not: 'RETIRED' }, departmentId: { in: ['dept-dev'] } },
      })
      expect(mockAssetCount).toHaveBeenCalledWith({
        where: { status: { in: ['IDLE', 'OPERATING'] }, departmentId: { in: ['dept-dev'] } },
      })
      expect(mockAssetCount).toHaveBeenCalledWith({
        where: { status: 'REPAIR', departmentId: { in: ['dept-dev'] } },
      })
    })

    it('자기 팀이 있으면 해당 팀의 PENDING_MANAGER 건만 카운트한다', async () => {
      mockTeamFindMany.mockResolvedValue([
        { id: 'team-dev', teamLeadId: 'lead-1', departmentId: 'dept-dev', department: { id: 'dept-dev', name: '개발본부' } },
      ])
      mockLoanCount
        .mockReset()
        .mockResolvedValueOnce(2)  // 내 팀 PENDING_MANAGER
        .mockResolvedValueOnce(1)  // pendingInspection

      const result = await dashboardService.getDashboard(TEAM_LEAD)

      expect(mockTeamFindMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { teamLeadId: 'lead-1' } }),
      )
      expect(mockLoanCount).toHaveBeenCalledWith({
        where: { status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] }, user: { teamId: { in: ['team-dev'] } } },
      })
      expect(result.stats.pendingApprovalCount).toBe(2)
    })

    it('담당 팀이 없으면 pendingApprovalCount = 0 이다', async () => {
      mockTeamFindMany.mockResolvedValue([])
      mockLoanCount
        .mockReset()
        .mockResolvedValueOnce(1)  // pendingInspection (approval은 0으로 처리)

      const result = await dashboardService.getDashboard(TEAM_LEAD)

      expect(result.stats.pendingApprovalCount).toBe(0)
    })

    it('두 팀의 팀장이면 두 팀의 PENDING_MANAGER 건을 합산하고, 두 부서 전체로 자산을 필터링한다', async () => {
      mockTeamFindMany.mockResolvedValue([
        { id: 'team-a', teamLeadId: 'lead-1', departmentId: 'dept-a', department: { id: 'dept-a', name: 'A본부' } },
        { id: 'team-b', teamLeadId: 'lead-1', departmentId: 'dept-b', department: { id: 'dept-b', name: 'B본부' } },
      ])
      mockLoanCount.mockReset().mockResolvedValueOnce(5).mockResolvedValueOnce(0)

      const result = await dashboardService.getDashboard(TEAM_LEAD)

      expect(mockLoanCount).toHaveBeenCalledWith({
        where: {
          status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] },
          user: { teamId: { in: ['team-a', 'team-b'] } },
        },
      })
      expect(mockAssetCount).toHaveBeenCalledWith({
        where: { status: { not: 'RETIRED' }, departmentId: { in: ['dept-a', 'dept-b'] } },
      })
      expect(result.scopeLabel).toBe('A본부, B본부')
    })
  })
})
