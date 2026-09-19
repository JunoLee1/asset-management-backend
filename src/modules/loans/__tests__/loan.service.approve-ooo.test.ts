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
const mockDeptFindMany = prisma.team.findMany as jest.Mock

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const managerCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }

const makeLoan = (teamId: string | null = 'dept-1') => ({
  id: 'loan-1',
  status: 'PENDING_MANAGER',
  userId: 'user-1',
  assetId: 'asset-1',
  user: { teamId },
})

describe('approveManager() — ADMIN OOO 대행 규칙', () => {
  afterEach(() => jest.clearAllMocks())

  it('ADMIN + 팀장 없는 부서 → 승인 진행 가능 (403 아님)', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan('dept-no-manager'))
    mockDeptFindMany.mockResolvedValue([]) // ADMIN이면 dept 조회 안 함

    // prisma.$transaction 미mock이라 다른 에러 발생하지만 403이 아님을 확인
    try {
      await loanService.approveManager('loan-1', {}, adminCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('ADMIN + 팀장 있고 재직 중(isOutOfOffice=false) → 403', async () => {
    const loan = makeLoan('dept-1')
    // loan에 department 정보 포함 (manager 재직 중)
    ;(loan as Record<string, unknown>).user = {
      teamId: 'dept-1',
      team: {
        teamLeadId: 'mgr-1',
        teamLead: { id: 'mgr-1', isOutOfOffice: false },
      },
    }
    mockLoanFindUnique.mockResolvedValue(loan)

    await expect(
      loanService.approveManager('loan-1', {}, adminCtx),
    ).rejects.toMatchObject({ statusCode: 403 })
  })

  it('ADMIN + 팀장 있지만 OOO(isOutOfOffice=true) → 승인 진행 가능 (403 아님)', async () => {
    const loan = makeLoan('dept-1')
    ;(loan as Record<string, unknown>).user = {
      teamId: 'dept-1',
      team: {
        teamLeadId: 'mgr-1',
        teamLead: { id: 'mgr-1', isOutOfOffice: true },
      },
    }
    mockLoanFindUnique.mockResolvedValue(loan)

    try {
      await loanService.approveManager('loan-1', {}, adminCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('ADMIN + 부서 없는 사용자 → 승인 진행 가능 (403 아님)', async () => {
    const loan = makeLoan(null)
    ;(loan as Record<string, unknown>).user = { teamId: null, department: null }
    mockLoanFindUnique.mockResolvedValue(loan)

    try {
      await loanService.approveManager('loan-1', {}, adminCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('MANAGER + 담당 부서 대여 → 승인 진행 가능 (403 아님)', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan('dept-1'))
    mockDeptFindMany.mockResolvedValue([{ id: 'dept-1' }])

    try {
      await loanService.approveManager('loan-1', {}, managerCtx)
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).not.toBe(403)
    }
  })

  it('MANAGER + 타 부서 대여 → 403', async () => {
    mockLoanFindUnique.mockResolvedValue(makeLoan('dept-other'))
    mockDeptFindMany.mockResolvedValue([{ id: 'dept-1' }]) // mgr-1은 dept-1만 담당

    await expect(
      loanService.approveManager('loan-1', {}, managerCtx),
    ).rejects.toMatchObject({ statusCode: 403 })
  })
})
