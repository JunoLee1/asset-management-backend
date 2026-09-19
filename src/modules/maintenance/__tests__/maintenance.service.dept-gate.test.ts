import { maintenanceService } from '../maintenance.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    maintenance: { findUnique: jest.fn() },
    asset: { findUnique: jest.fn() },
    team: { findMany: jest.fn() },
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn() },
}))

import { prisma } from '../../../lib/prisma'

const mockMaintFindUnique = prisma.maintenance.findUnique as jest.Mock
const mockAssetFindUnique = (prisma as unknown as { asset: { findUnique: jest.Mock } }).asset.findUnique
const mockTeamFindMany = prisma.team.findMany as jest.Mock

const teamLeadCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }
const otherLeadCtx = { id: 'mgr-2', role: 'TEAM_LEAD' as const }
const adminCtx    = { id: 'admin-1', role: 'ADMIN' as const }

const makeMaint = () => ({
  id: 'maint-1',
  status: 'PENDING_MANAGER',
  assetId: 'asset-1',
  requestedById: 'user-1',
})

afterEach(() => jest.clearAllMocks())

describe('maintenanceService.approve() PENDING_MANAGER — 부서 게이팅 (옵션3)', () => {
  it('TEAM_LEAD가 자산 소속 부서 팀장 → 승인 가능 (403 아님)', async () => {
    mockMaintFindUnique.mockResolvedValue(makeMaint())
    mockAssetFindUnique.mockResolvedValue({ departmentId: 'dept-1' })
    mockTeamFindMany.mockResolvedValue([{ teamLeadId: 'mgr-1' }])

    try {
      await maintenanceService.approve('maint-1', teamLeadCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('TEAM_LEAD가 다른 부서 팀장 → 403', async () => {
    mockMaintFindUnique.mockResolvedValue(makeMaint())
    mockAssetFindUnique.mockResolvedValue({ departmentId: 'dept-1' })
    mockTeamFindMany.mockResolvedValue([{ teamLeadId: 'mgr-99' }]) // 다른 팀장

    await expect(
      maintenanceService.approve('maint-1', otherLeadCtx),
    ).rejects.toMatchObject({ statusCode: 403 })
  })

  it('ADMIN → 부서 게이팅 없이 승인 가능 (403 아님)', async () => {
    mockMaintFindUnique.mockResolvedValue(makeMaint())
    mockAssetFindUnique.mockResolvedValue({ departmentId: 'dept-1' })
    mockTeamFindMany.mockResolvedValue([{ teamLeadId: 'mgr-1' }])

    try {
      await maintenanceService.approve('maint-1', adminCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })
})
