import { AppError } from '../../../lib/AppError'
import { loanService } from '../loan.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    loan: { findUnique: jest.fn(), update: jest.fn() },
    asset: { findUnique: jest.fn() },
    user: { findUnique: jest.fn() },
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
}))

jest.mock('../../notifications/notification.service', () => ({
  notificationService: {
    createLoanApprovedNotification: jest.fn().mockResolvedValue(undefined),
  },
}))

import { prisma } from '../../../lib/prisma'

const mockLoanFindUnique = prisma.loan.findUnique as jest.Mock
const mockLoanUpdate = prisma.loan.update as jest.Mock
const mockAssetFindUnique = prisma.asset.findUnique as jest.Mock
const mockUserFindUnique = (prisma as unknown as { user: { findUnique: jest.Mock } }).user.findUnique

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const assetMgrCtx = { id: 'asset-mgr-1', role: 'ASSET_MANAGER' as const }
const otherAssetMgrCtx = { id: 'asset-mgr-2', role: 'ASSET_MANAGER' as const }

// 자산관리자가 신청한 대여 (PENDING_ADMIN 상태)
const selfLoan = {
  id: 'loan-1',
  userId: 'asset-mgr-1',   // ASSET_MANAGER가 신청자
  assetId: 'asset-1',
  status: 'PENDING_ADMIN',
  checkoutLocationId: null,
  checkoutMemo: null,
  managerApprovedAt: null,
  adminApprovedAt: null,
  cancelledAt: null,
  rejectedAt: null,
  recalledAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const assetMgrUser = { id: 'asset-mgr-1', role: 'ASSET_MANAGER' }

const fullLoanDetail = {
  ...selfLoan,
  status: 'APPROVED',
  purpose: null,
  dueDate: null,
  checkedOutAt: null,
  receivedAt: null,
  rejectReason: null,
  recallReason: null,
  managerApprovedAt: null,
  adminApprovedAt: new Date(),
  managerApprovedBy: null,
  adminApprovedBy: null,
  cancelledAt: null,
  rejectedAt: null,
  recalledAt: null,
  rejectedBy: null,
  recalledBy: null,
  inspectedBy: null,
  checkoutLocation: null,
  loanReturn: null,
  extensions: [],
  user: { id: 'asset-mgr-1', name: '자산관리자', email: 'mgr@co.com', role: 'ASSET_MANAGER' },
  asset: { id: 'asset-1', assetCode: 'A-001', name: '맥북', status: 'OPERATING', condition: 'GOOD', class: 'IT_ASSET', currentValue: null, imageUrl: null, departmentId: 'dept-1', department: { name: '개발팀' }, location: { name: '본사' } },
}

beforeEach(() => {
  jest.clearAllMocks()
  // 첫 번째 findUnique(단순 loan), 두 번째는 getById용 fullDetail
  mockLoanFindUnique
    .mockResolvedValueOnce(selfLoan)
    .mockResolvedValue(fullLoanDetail)
  mockAssetFindUnique.mockResolvedValue({ assetCode: 'A-001', name: '맥북' })
  mockLoanUpdate.mockResolvedValue({ ...selfLoan, status: 'APPROVED' })
  mockUserFindUnique.mockResolvedValue(assetMgrUser)
})

describe('자산관리자 본인 대여 — 2차 승인 ADMIN 전용', () => {
  it('ASSET_MANAGER가 신청한 대여를 다른 ASSET_MANAGER가 승인하면 AppError(403)', async () => {
    const err = await loanService.approveAdmin('loan-1', {}, otherAssetMgrCtx).catch(e => e)
    expect(err).toBeInstanceOf(AppError)
    expect(err.statusCode).toBe(403)
  })

  it('ASSET_MANAGER가 신청한 대여를 ADMIN이 승인하면 통과', async () => {
    await expect(
      loanService.approveAdmin('loan-1', {}, adminCtx),
    ).resolves.toBeDefined()
  })

  it('일반 USER가 신청한 대여는 ASSET_MANAGER가 승인 가능 (기존 동작 유지)', async () => {
    const userLoan = { ...selfLoan, userId: 'user-1' }
    const userFullDetail = { ...fullLoanDetail, userId: 'user-1', user: { id: 'user-1', name: '사원', email: 'u@co.com', role: 'USER' } }
    mockLoanFindUnique.mockReset()
    mockLoanFindUnique
      .mockResolvedValueOnce(userLoan)
      .mockResolvedValue(userFullDetail)
    mockUserFindUnique.mockResolvedValue({ id: 'user-1', role: 'USER' })

    await expect(
      loanService.approveAdmin('loan-1', {}, assetMgrCtx),
    ).resolves.toBeDefined()
  })
})
