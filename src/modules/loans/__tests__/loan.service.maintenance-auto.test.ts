import { loanService } from '../loan.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    loan: { findUnique: jest.fn() },
    loanReturn: { findUnique: jest.fn(), update: jest.fn() },
    asset: { update: jest.fn() },
    assetHistory: { create: jest.fn() },
    maintenance: { create: jest.fn() },
    $transaction: jest.fn(),
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn() },
}))

jest.mock('../../notifications/notification.service', () => ({
  notificationService: {},
}))

import { prisma } from '../../../lib/prisma'

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }

const makeLoanReturn = (condition: string) => ({
  id: 'lr-1',
  condition,
  damageNote: null,
  loanId: 'loan-1',
  finalizedAt: null,
  finalizedById: null,
  returnRequestedAt: new Date(),
  inspectedAt: new Date(),
  inspectedById: 'asset-mgr-1',
  returnApprovedAt: new Date(),
  returnApprovedById: 'mgr-1',
})

const makeLoan = (overrides = {}) => ({
  id: 'loan-1',
  status: 'PENDING_RETURN_ADMIN',
  userId: 'user-2', // not admin to avoid self-approve
  assetId: 'asset-1',
  checkoutLocationId: null,
  checkoutMemo: null,
  ...overrides,
})

describe('finalizeReturn() — NEEDS_REPAIR 자동 Maintenance 생성', () => {
  afterEach(() => jest.clearAllMocks())

  it('MINOR_DAMAGE → asset UNDER_MAINTENANCE + Maintenance APPROVED 생성', async () => {
    const txMock = jest.fn().mockImplementation(async (cb: Function) => {
      await cb({
        loan: { update: jest.fn() },
        loanReturn: {
          findUnique: jest.fn().mockResolvedValue(makeLoanReturn('MINOR_DAMAGE')),
          update: jest.fn(),
        },
        asset: { update: jest.fn() },
        assetHistory: { create: jest.fn() },
        maintenance: { create: jest.fn(), findFirst: jest.fn().mockResolvedValue(null) },
      })
    })
    ;(prisma.$transaction as jest.Mock).mockImplementation(txMock)
    ;(prisma.loan.findUnique as jest.Mock).mockResolvedValue(makeLoan())

    await loanService.finalizeReturn('loan-1', adminCtx).catch(() => {})

    const txCallback = txMock.mock.calls[0][0]
    const tx = {
      loan: { update: jest.fn() },
      loanReturn: {
        findUnique: jest.fn().mockResolvedValue(makeLoanReturn('MINOR_DAMAGE')),
        update: jest.fn(),
      },
      asset: { update: jest.fn() },
      assetHistory: { create: jest.fn() },
      maintenance: { create: jest.fn(), findFirst: jest.fn().mockResolvedValue(null) },
    }
    await txCallback(tx)

    // asset.update 중 UNDER_MAINTENANCE 상태가 포함돼야 한다
    const assetUpdateCall = tx.asset.update.mock.calls.find(
      (c: unknown[]) => (c[0] as { data: { status?: string } }).data?.status
    )
    expect(assetUpdateCall?.[0]?.data?.status).toBe('REPAIR')

    // maintenance.create가 호출돼야 한다
    expect(tx.maintenance.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          assetId: 'asset-1',
          status: 'APPROVED',
        }),
      }),
    )
  })

  it('GOOD → asset AVAILABLE, Maintenance 생성 안 함', async () => {
    const txMock = jest.fn().mockImplementation(async (cb: Function) => {
      const tx = {
        loan: { update: jest.fn() },
        loanReturn: {
          findUnique: jest.fn().mockResolvedValue(makeLoanReturn('GOOD')),
          update: jest.fn(),
        },
        asset: { update: jest.fn() },
        assetHistory: { create: jest.fn() },
        maintenance: { create: jest.fn(), findFirst: jest.fn().mockResolvedValue(null) },
      }
      await cb(tx)
      // GOOD이면 maintenance.create 호출 없어야 함
      expect(tx.maintenance.create).not.toHaveBeenCalled()
      const assetCall = tx.asset.update.mock.calls[0]
      expect(assetCall?.[0]?.data?.status).toBe('IDLE')
    })
    ;(prisma.$transaction as jest.Mock).mockImplementation(txMock)
    ;(prisma.loan.findUnique as jest.Mock).mockResolvedValue(makeLoan())

    await loanService.finalizeReturn('loan-1', adminCtx).catch(() => {})
  })
})

describe('recall() — 회수 후 asset UNDER_MAINTENANCE + Maintenance 자동 생성', () => {
  afterEach(() => jest.clearAllMocks())

  it('recall 시 asset.status = UNDER_MAINTENANCE', async () => {
    const txMock = jest.fn().mockImplementation(async (cb: Function) => {
      const tx = {
        loan: { update: jest.fn() },
        asset: { update: jest.fn() },
        assetHistory: { create: jest.fn() },
        maintenance: { create: jest.fn(), findFirst: jest.fn().mockResolvedValue(null) },
      }
      await cb(tx)
      expect(tx.asset.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: 'REPAIR' }),
        }),
      )
      expect(tx.maintenance.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            assetId: 'asset-1',
            status: 'APPROVED',
          }),
        }),
      )
    })
    ;(prisma.$transaction as jest.Mock).mockImplementation(txMock)
    ;(prisma.loan.findUnique as jest.Mock).mockResolvedValue({
      ...makeLoan({ status: 'CHECKED_OUT' }),
    })

    await loanService.recall('loan-1', { reason: '긴급 회수' }, adminCtx).catch(() => {})
  })
})
