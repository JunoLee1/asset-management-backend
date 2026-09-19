import { loanService } from '../loan.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    loan: { findMany: jest.fn() },
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

const mockFindMany = prisma.loan.findMany as jest.Mock
const mockDeptFindMany = prisma.team.findMany as jest.Mock

const makeRow = (overrides: Record<string, unknown> = {}) => ({
  id: 'loan-1',
  status: 'CHECKED_OUT',
  assetId: 'asset-1',
  userId: 'user-1',
  purpose: null,
  dueDate: new Date('2026-01-01'),
  checkedOutAt: new Date('2026-01-10'),
  receivedAt: null,
  rejectReason: null,
  recallReason: null,
  checkoutMemo: null,
  checkoutLocationId: null,
  managerApprovedAt: null,
  adminApprovedAt: null,
  cancelledAt: null,
  rejectedAt: null,
  recalledAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  asset: { id: 'asset-1', assetCode: 'A-001', name: '맥북', class: 'IT_ASSET', condition: 'GOOD', status: 'OPERATING', assignedUserId: 'user-1', category: { name: '노트북' } },
  user: { id: 'user-1', name: '홍길동', email: 'hong@co.com', department: null },
  checkoutLocation: null,
  loanReturn: null,
  ...overrides,
})

const managerCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }
const userCtx = { id: 'user-1', role: 'USER' as const }

describe('loanService.overdue — 상태 필터', () => {
  afterEach(() => jest.clearAllMocks())

  it('CHECKED_OUT + 기한 초과 → 포함', async () => {
    const row = makeRow({ status: 'CHECKED_OUT' })
    mockDeptFindMany.mockResolvedValue([{ id: 'dept-1' }])
    mockFindMany.mockResolvedValue([row])

    const result = await loanService.overdue(managerCtx)

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { in: ['CHECKED_OUT', 'RECEIVED'] },
        }),
      }),
    )
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('CHECKED_OUT')
  })

  it('RECEIVED + 기한 초과 → 포함 (수령했지만 반납 안 한 경우)', async () => {
    const row = makeRow({ status: 'RECEIVED', receivedAt: new Date('2026-01-15') })
    mockDeptFindMany.mockResolvedValue([{ id: 'dept-1' }])
    mockFindMany.mockResolvedValue([row])

    const result = await loanService.overdue(managerCtx)

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { in: ['CHECKED_OUT', 'RECEIVED'] },
        }),
      }),
    )
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('RECEIVED')
  })

  it('USER 역할 → where에 OR(userId | assignedUserId) 필터 추가', async () => {
    mockFindMany.mockResolvedValue([])

    await loanService.overdue(userCtx)

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { in: ['CHECKED_OUT', 'RECEIVED'] },
          OR: [{ userId: 'user-1' }, { asset: { assignedUserId: 'user-1' } }],
        }),
      }),
    )
  })

  it('USER 역할 — 할당된 자산의 연체 대여도 포함(assignedUserId 기준)', async () => {
    // 신청자는 user-2이지만 자산이 user-1에게 할당된 연체 건
    const row = makeRow({
      userId: 'user-2',
      asset: { id: 'asset-1', assetCode: 'A-001', name: '맥북', class: 'IT_ASSET', condition: 'GOOD', status: 'OPERATING', assignedUserId: 'user-1', category: { name: '노트북' } },
    })
    mockFindMany.mockResolvedValue([row])

    const result = await loanService.overdue(userCtx)

    // OR 조건으로 쿼리했으므로 결과에 포함됨
    expect(result).toHaveLength(1)
    const calledWith = mockFindMany.mock.calls[0][0]
    expect(calledWith.where.OR).toContainEqual({ asset: { assignedUserId: 'user-1' } })
  })

  it('TEAM_LEAD 역할 → 신청자 OR 할당자가 담당 부서인 연체 대여 필터', async () => {
    mockDeptFindMany.mockResolvedValue([{ id: 'dept-1' }])
    mockFindMany.mockResolvedValue([])

    await loanService.overdue(managerCtx)

    expect(mockDeptFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { teamLeadId: 'mgr-1' } }),
    )
    const calledWith = mockFindMany.mock.calls[0][0]
    expect(calledWith.where.OR).toEqual([
      { user: { teamId: { in: ['dept-1'] } } },
      { asset: { assignedUser: { teamId: { in: ['dept-1'] } } } },
    ])
  })

  it('ADMIN 역할 → 부서 필터 없이 전체 조회', async () => {
    mockFindMany.mockResolvedValue([])

    await loanService.overdue({ id: 'admin-1', role: 'ADMIN' })

    expect(mockDeptFindMany).not.toHaveBeenCalled()
    const calledWith = mockFindMany.mock.calls[0][0]
    expect(calledWith.where).not.toHaveProperty('user')
  })

  it('부서 없는 사용자 연체 → TEAM_LEAD 큐에 미포함 (OR 조건 빈 배열)', async () => {
    mockDeptFindMany.mockResolvedValue([])
    mockFindMany.mockResolvedValue([])

    await loanService.overdue(managerCtx)

    const calledWith = mockFindMany.mock.calls[0][0]
    expect(calledWith.where.OR).toEqual([
      { user: { teamId: { in: [] } } },
      { asset: { assignedUser: { teamId: { in: [] } } } },
    ])
  })
})
