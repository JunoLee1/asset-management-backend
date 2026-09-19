import { loanService } from '../loan.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    loan: { findUnique: jest.fn() },
    team: { findMany: jest.fn() },
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn() },
}))

jest.mock('../../notifications/notification.service', () => ({
  notificationService: {},
}))

import { prisma } from '../../../lib/prisma'

const mockLoanFindUnique = prisma.loan.findUnique as jest.Mock
const mockTeamFindMany = prisma.team.findMany as jest.Mock

const teamLeadCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }
const otherLeadCtx = { id: 'mgr-2', role: 'TEAM_LEAD' as const }
const adminCtx    = { id: 'admin-1', role: 'ADMIN' as const }

const makeLoan = (overrides: Record<string, unknown> = {}) => ({
  id: 'loan-1',
  status: 'INSPECTED',
  userId: 'user-1',
  assetId: 'asset-1',
  user: {
    teamId: 'team-1',
    team: {
      teamLeadId: 'mgr-1',
      teamLead: { id: 'mgr-1', isOutOfOffice: false },
    },
  },
  ...overrides,
})

afterEach(() => jest.clearAllMocks())

describe('approveReturnManager() — 부서 게이팅', () => {
  it('TEAM_LEAD가 담당 팀 소속 신청자 반납 승인 → 성공 (403 아님)', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan())
    mockTeamFindMany.mockResolvedValue([{ id: 'team-1' }])

    try {
      await loanService.approveReturnManager('loan-1', teamLeadCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('TEAM_LEAD가 담당하지 않는 팀의 반납 승인 시도 → 403', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan())
    mockTeamFindMany.mockResolvedValue([{ id: 'team-99' }]) // 다른 팀 담당

    await expect(
      loanService.approveReturnManager('loan-1', otherLeadCtx),
    ).rejects.toMatchObject({ statusCode: 403 })
  })

  it('ADMIN + 팀장 재직 중(isOutOfOffice=false) → 403', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan())

    await expect(
      loanService.approveReturnManager('loan-1', adminCtx),
    ).rejects.toMatchObject({ statusCode: 403 })
  })

  it('ADMIN + 팀장 OOO(isOutOfOffice=true) → 대행 가능 (403 아님)', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan({
      user: {
        teamId: 'team-1',
        team: { teamLeadId: 'mgr-1', teamLead: { id: 'mgr-1', isOutOfOffice: true } },
      },
    }))

    try {
      await loanService.approveReturnManager('loan-1', adminCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('ADMIN + 팀장 없는 부서 → 대행 가능 (403 아님)', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan({
      user: { teamId: 'team-1', team: { teamLeadId: null, teamLead: null } },
    }))

    try {
      await loanService.approveReturnManager('loan-1', adminCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })
})
