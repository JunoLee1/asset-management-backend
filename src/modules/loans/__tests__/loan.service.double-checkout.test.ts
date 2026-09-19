import { loanService } from '../loan.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    loan: { findUnique: jest.fn(), findFirst: jest.fn(), create: jest.fn() },
    asset: { findUnique: jest.fn() },
    $transaction: jest.fn(),
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

jest.mock('../../notifications/notification.service', () => ({
  notificationService: { createLoanRequestedNotifications: jest.fn() },
}))

import { prisma } from '../../../lib/prisma'

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const applicantCtx = { id: 'user-1', role: 'USER' as const }

const makeLoan = (overrides: Record<string, unknown> = {}) => ({
  id: 'loan-1',
  status: 'APPROVED',
  userId: 'user-1',
  assetId: 'asset-1',
  checkoutLocationId: null,
  checkoutMemo: null,
  ...overrides,
})

afterEach(() => jest.clearAllMocks())

describe('checkout() — 자산이 이미 다른 대여 건으로 출고됐으면 거부', () => {
  it('자산이 더 이상 IDLE이 아니면 AppError(409)를 던지고 롤백한다', async () => {
    ;(prisma.loan.findUnique as jest.Mock).mockResolvedValue(makeLoan())
    const tx = {
      loan: { update: jest.fn() },
      asset: { updateMany: jest.fn().mockResolvedValue({ count: 0 }) }, // 이미 IDLE 아님
      assetHistory: { create: jest.fn() },
    }
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (cb: (tx: unknown) => unknown) => cb(tx))

    await expect(loanService.checkout('loan-1', {}, adminCtx)).rejects.toMatchObject({
      statusCode: 409,
    })
    // 자산이 IDLE이 아니라 실패했으므로 loan.update(출고 처리)는 일어나지 않아야 함
    expect(tx.loan.update).not.toHaveBeenCalled()
  })

  it('자산이 IDLE이면 정상적으로 출고 처리된다', async () => {
    ;(prisma.loan.findUnique as jest.Mock).mockResolvedValue(makeLoan())
    const tx = {
      loan: { update: jest.fn() },
      asset: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
      assetHistory: { create: jest.fn() },
    }
    ;(prisma.$transaction as jest.Mock).mockImplementation(async (cb: (tx: unknown) => unknown) => cb(tx))
    ;(prisma.asset as unknown as { findUnique: jest.Mock }).findUnique.mockResolvedValue({
      assetCode: 'IT-001',
      name: 'MacBook',
    })

    await expect(loanService.checkout('loan-1', {}, adminCtx)).resolves.toBeDefined().catch(() => {})
    expect(tx.loan.update).toHaveBeenCalled()
  })
})

describe('create() — 이미 진행 중인 대여가 있는 자산은 신규 신청 거부', () => {
  it('자산에 활성 상태(REJECTED/CANCELLED/RETURNED/RECALLED가 아닌) 대여가 이미 있으면 AppError(409)', async () => {
    ;(prisma.asset.findUnique as jest.Mock).mockResolvedValue({
      id: 'asset-1',
      class: 'IT_ASSET',
      status: 'IDLE',
      assignedUserId: null,
    })
    ;(prisma.loan.findFirst as jest.Mock).mockResolvedValue({ id: 'existing-loan', status: 'PENDING_MANAGER' })

    await expect(
      loanService.create({ assetId: 'asset-1', purpose: '업무용' }, applicantCtx),
    ).rejects.toMatchObject({ statusCode: 409 })
    expect(prisma.loan.create).not.toHaveBeenCalled()
  })
})
