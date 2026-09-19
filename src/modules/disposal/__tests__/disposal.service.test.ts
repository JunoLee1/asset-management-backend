import { AppError } from '../../../lib/AppError'
import { disposalService } from '../disposal.service'
import type { RequesterContext } from '../../../lib/requestHelpers'

// ADR 0005 — disposal.service 가 알림을 best-effort 로 호출. 호출 자체만 검증하면 충분.
jest.mock('../../notifications/notification.service', () => ({
  notificationService: {
    createDisposalPendingManagerNotifications: jest.fn().mockResolvedValue(undefined),
    createDisposalPendingAdminNotifications: jest.fn().mockResolvedValue(undefined),
    createDisposalApprovedNotification: jest.fn().mockResolvedValue(undefined),
    createDisposalRejectedNotification: jest.fn().mockResolvedValue(undefined),
    createDisposalCompletedNotification: jest.fn().mockResolvedValue(undefined),
  },
}))

jest.mock('../../../lib/prisma', () => {
  const txMock = {
    disposal: {
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      findUniqueOrThrow: jest.fn(),
    },
    asset: {
      update: jest.fn(),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    disposalEvidence: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
  }
  return {
    prisma: {
      asset: { findUnique: jest.fn() },
      disposal: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      loan: { findFirst: jest.fn() },
      $transaction: jest.fn((cb: (tx: typeof txMock) => unknown) => cb(txMock)),
      __tx: txMock,
    },
  }
})

import { prisma } from '../../../lib/prisma'
import { notificationService } from '../../notifications/notification.service'

const prismaMock = prisma as unknown as {
  asset: { findUnique: jest.Mock }
  disposal: { findUnique: jest.Mock; findFirst: jest.Mock; update: jest.Mock }
  loan: { findFirst: jest.Mock }
  $transaction: jest.Mock
  __tx: {
    disposal: { create: jest.Mock; update: jest.Mock; updateMany: jest.Mock; findUniqueOrThrow: jest.Mock }
    asset: { update: jest.Mock; updateMany: jest.Mock }
    disposalEvidence: { deleteMany: jest.Mock; createMany: jest.Mock }
  }
}

const REQUESTER_AM_A: RequesterContext = { id: 'am-a', role: 'ASSET_MANAGER' }
const REQUESTER_AM_B: RequesterContext = { id: 'am-b', role: 'ASSET_MANAGER' }
const REQUESTER_ADMIN: RequesterContext = { id: 'admin-1', role: 'ADMIN' }

const baseDisposal = {
  id: 'd-1',
  status: 'PENDING_MANAGER',
  reason: 'SCRAP',
  note: null,
  previousStatus: 'IDLE',
  journalEntryNumber: null,
  assetId: 'asset-1',
  asset: { id: 'asset-1', assetCode: 'IT-0001', name: 'MBP', status: 'PENDING_DISPOSAL' },
  requestedById: 'am-a',
  requestedBy: { id: 'am-a', name: 'Manager A' },
  managerApprovedAt: null,
  managerApprovedById: null,
  managerApprovedBy: null,
  approvedAt: null,
  approvedById: null,
  approvedBy: null,
  completedAt: null,
  rejectedAt: null,
  rejectedById: null,
  rejectedBy: null,
  rejectReason: null,
  cancelledAt: null,
  evidences: [],
  createdAt: new Date('2026-06-29'),
  updatedAt: new Date('2026-06-29'),
}

const baseAsset = { id: 'asset-1', status: 'IDLE' as const }

beforeEach(() => {
  jest.clearAllMocks()
})

describe('disposal.service.create', () => {
  it('정상 신청: PENDING_MANAGER 로 생성하고 asset.status 를 PENDING_DISPOSAL 로 잠근다', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
    prismaMock.disposal.findFirst.mockResolvedValue(null)
    prismaMock.loan.findFirst.mockResolvedValue(null)
    prismaMock.__tx.disposal.create.mockResolvedValue(baseDisposal)

    const result = await disposalService.create(
      { assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } },
      REQUESTER_AM_A,
    )

    expect(result.status).toBe('PENDING_MANAGER')
    expect(prismaMock.__tx.asset.updateMany).toHaveBeenCalledWith({
      where: { id: 'asset-1', status: { notIn: ['RETIRED', 'REPAIR', 'PENDING_DISPOSAL'] } },
      data: { status: 'PENDING_DISPOSAL' },
    })

    // ADR 0005 — 신청 시 다른 ASSET_MANAGER 전원에게 1차 승인 요청 알림
    expect(notificationService.createDisposalPendingManagerNotifications).toHaveBeenCalledWith(
      expect.objectContaining({
        disposalId: 'd-1',
        assetCode: 'IT-0001',
        requesterId: 'am-a',
      }),
    )
  })

  it('활성 Loan(CHECKED_OUT) 자산은 폐기 신청 차단 (409)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
    prismaMock.disposal.findFirst.mockResolvedValue(null)
    prismaMock.loan.findFirst.mockResolvedValue({ id: 'loan-1', status: 'CHECKED_OUT' })

    await expect(
      disposalService.create({ assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } }, REQUESTER_AM_A),
    ).rejects.toMatchObject({ statusCode: 409 } satisfies Partial<AppError>)
  })

  it('PENDING_INSPECTION 단계 Loan 도 활성으로 간주해 차단', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
    prismaMock.disposal.findFirst.mockResolvedValue(null)
    prismaMock.loan.findFirst.mockResolvedValue({ id: 'loan-2', status: 'PENDING_INSPECTION' })

    await expect(
      disposalService.create({ assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } }, REQUESTER_AM_A),
    ).rejects.toMatchObject({ statusCode: 409 })
  })

  it('종료된 Loan(RETURNED)만 있는 자산은 정상 신청', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
    prismaMock.disposal.findFirst.mockResolvedValue(null)
    // findFirst with where status: { in: ACTIVE_LOAN_STATUSES } — RETURNED 는 active 가 아니므로 null
    prismaMock.loan.findFirst.mockResolvedValue(null)
    prismaMock.__tx.disposal.create.mockResolvedValue(baseDisposal)

    const result = await disposalService.create(
      { assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } },
      REQUESTER_AM_A,
    )
    expect(result.status).toBe('PENDING_MANAGER')
  })

  it('동시에 같은 자산으로 두 번 신청되면 두 번째는 409로 거부된다 (원자적 점유)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
    prismaMock.disposal.findFirst.mockResolvedValue(null) // 사전 체크는 통과
    prismaMock.loan.findFirst.mockResolvedValue(null)
    // 다른 동시 요청이 이미 asset.status를 PENDING_DISPOSAL로 선점 → 이 updateMany는 0건 매치
    prismaMock.__tx.asset.updateMany.mockResolvedValueOnce({ count: 0 })

    await expect(
      disposalService.create(
        { assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } },
        REQUESTER_AM_A,
      ),
    ).rejects.toMatchObject({ statusCode: 409 })
    expect(prismaMock.__tx.disposal.create).not.toHaveBeenCalled()
  })

  it('진행 중 폐기 신청 중복 차단 (409)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
    prismaMock.disposal.findFirst.mockResolvedValue({ id: 'd-existing', status: 'PENDING_MANAGER' })

    await expect(
      disposalService.create({ assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } }, REQUESTER_AM_A),
    ).rejects.toMatchObject({ statusCode: 409 })
    expect(prismaMock.loan.findFirst).not.toHaveBeenCalled() // 중복 체크가 먼저 끊는다
  })

  it('자산 미존재 시 404', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(null)
    await expect(
      disposalService.create({ assetId: 'missing', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } }, REQUESTER_AM_A),
    ).rejects.toMatchObject({ statusCode: 404 })
  })

  it('RETIRED 자산은 폐기 신청 차단 (400)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue({ ...baseAsset, status: 'RETIRED' })
    await expect(
      disposalService.create({ assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } }, REQUESTER_AM_A),
    ).rejects.toMatchObject({ statusCode: 400 })
    expect(prismaMock.disposal.findFirst).not.toHaveBeenCalled()
  })

  it('수리중(REPAIR) 자산은 폐기 신청 차단 (400)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue({ ...baseAsset, status: 'REPAIR' })
    await expect(
      disposalService.create({ assetId: 'asset-1', reason: 'SCRAP', criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false } }, REQUESTER_AM_A),
    ).rejects.toMatchObject({ statusCode: 400 })
    expect(prismaMock.disposal.findFirst).not.toHaveBeenCalled()
  })
})

describe('disposal.service.approveManager', () => {
  it('다른 ASSET_MANAGER 가 승인 → PENDING_ADMIN, managerApprovedAt/ById 기록', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({
      ...baseDisposal,
      status: 'PENDING_ADMIN',
      managerApprovedAt: new Date(),
      managerApprovedById: 'am-b',
      managerApprovedBy: { id: 'am-b', name: 'Manager B' },
    })

    const result = await disposalService.approveManager('d-1', REQUESTER_AM_B)

    expect(result.status).toBe('PENDING_ADMIN')
    expect(result.managerApprovedById).toBe('am-b')
    expect(prismaMock.__tx.disposal.updateMany).toHaveBeenCalledWith({
      where: { id: 'd-1', status: 'PENDING_MANAGER' },
      data: expect.objectContaining({
        status: 'PENDING_ADMIN',
        managerApprovedById: 'am-b',
      }),
    })
  })

  it('신청자 본인이 승인 시도 → 403 (자기결재 차단)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)

    await expect(disposalService.approveManager('d-1', REQUESTER_AM_A)).rejects.toMatchObject({
      statusCode: 403,
    })
    expect(prismaMock.__tx.disposal.updateMany).not.toHaveBeenCalled()
  })

  it('PENDING_ADMIN 단계에서 1차 승인 재시도 → 409 전이 불가', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })

    await expect(disposalService.approveManager('d-1', REQUESTER_AM_B)).rejects.toMatchObject({
      statusCode: 409,
    })
  })

  it('동시에 두 번 승인되면 두 번째는 409로 거부된다 (원자적 갱신)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)
    // 다른 동시 요청이 이미 선점해서 이 updateMany는 0건 매치
    prismaMock.__tx.disposal.updateMany.mockResolvedValueOnce({ count: 0 })

    await expect(disposalService.approveManager('d-1', REQUESTER_AM_B)).rejects.toMatchObject({
      statusCode: 409,
    })
  })
})

describe('disposal.service.approveAdmin', () => {
  it('PENDING_ADMIN → APPROVED, approvedAt/ById 기록 + 신청자에게 승인 알림', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({
      ...baseDisposal,
      status: 'APPROVED',
      approvedAt: new Date(),
      approvedById: 'admin-1',
      approvedBy: { id: 'admin-1', name: 'Admin' },
    })

    const result = await disposalService.approveAdmin('d-1', {}, REQUESTER_ADMIN)
    expect(result.status).toBe('APPROVED')
    expect(result.approvedById).toBe('admin-1')

    // ADR 0005 — 신청자에게 승인 알림
    expect(notificationService.createDisposalApprovedNotification).toHaveBeenCalledWith(
      expect.objectContaining({ disposalId: 'd-1', recipientUserId: 'am-a' }),
    )
  })

  it('PENDING_MANAGER 상태에서 admin 승인 시도 → 409 (단계 건너뜀 차단)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal) // PENDING_MANAGER

    await expect(disposalService.approveAdmin('d-1', {}, REQUESTER_ADMIN)).rejects.toMatchObject({
      statusCode: 409,
    })
  })

  it('journalEntryNumber 옵션은 그대로 저장된다', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({
      ...baseDisposal,
      status: 'APPROVED',
      journalEntryNumber: 'JE-2026-0001',
    })

    await disposalService.approveAdmin('d-1', { journalEntryNumber: 'JE-2026-0001' }, REQUESTER_ADMIN)

    expect(prismaMock.__tx.disposal.updateMany).toHaveBeenCalledWith({
      where: { id: 'd-1', status: 'PENDING_ADMIN' },
      data: expect.objectContaining({ journalEntryNumber: 'JE-2026-0001' }),
    })
  })

  it('동시에 두 번 최종 승인되면 두 번째는 409로 거부된다 (원자적 갱신)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })
    prismaMock.__tx.disposal.updateMany.mockResolvedValueOnce({ count: 0 })

    await expect(disposalService.approveAdmin('d-1', {}, REQUESTER_ADMIN)).rejects.toMatchObject({
      statusCode: 409,
    })
  })
})

describe('disposal.service.reject', () => {
  it('PENDING_MANAGER 단계 반려 → asset.status 를 previousStatus 로 복원', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({
      ...baseDisposal,
      status: 'REJECTED',
      rejectReason: '폐기 불가',
    })
    prismaMock.__tx.asset.update.mockResolvedValue({ ...baseAsset, status: 'IDLE' })

    await disposalService.reject('d-1', { rejectReason: '폐기 불가' }, REQUESTER_AM_B)

    expect(prismaMock.__tx.disposal.updateMany).toHaveBeenCalledWith({
      where: { id: 'd-1', status: 'PENDING_MANAGER' },
      data: expect.objectContaining({ status: 'REJECTED', rejectReason: '폐기 불가' }),
    })
    expect(prismaMock.__tx.asset.update).toHaveBeenCalledWith({
      where: { id: 'asset-1' },
      data: { status: 'IDLE' }, // previousStatus
    })
  })

  it('PENDING_ADMIN 단계 반려도 가능', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({
      ...baseDisposal,
      status: 'REJECTED',
    })
    prismaMock.__tx.asset.update.mockResolvedValue({ ...baseAsset, status: 'IDLE' })

    await expect(
      disposalService.reject('d-1', { rejectReason: 'r' }, REQUESTER_ADMIN),
    ).resolves.toBeDefined()
  })

  it('이미 종료된 상태(REJECTED)는 재반려 불가 → 409', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'REJECTED' })
    await expect(
      disposalService.reject('d-1', { rejectReason: 'r' }, REQUESTER_AM_B),
    ).rejects.toMatchObject({ statusCode: 409 })
  })

  it('동시에 반려/승인이 겹치면 나중 요청은 409로 거부된다 (원자적 갱신)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)
    prismaMock.__tx.disposal.updateMany.mockResolvedValueOnce({ count: 0 })

    await expect(
      disposalService.reject('d-1', { rejectReason: 'r' }, REQUESTER_AM_B),
    ).rejects.toMatchObject({ statusCode: 409 })
    expect(prismaMock.__tx.asset.update).not.toHaveBeenCalled()
  })
})

describe('disposal.service.cancel', () => {
  it('신청자 본인이 PENDING_MANAGER 에서 취소 → asset.status 복원', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({ ...baseDisposal, status: 'CANCELLED' })
    prismaMock.__tx.asset.update.mockResolvedValue({ ...baseAsset, status: 'IDLE' })

    const result = await disposalService.cancel('d-1', REQUESTER_AM_A)
    expect(result.status).toBe('CANCELLED')
  })

  it('신청자가 아닌 사용자의 취소 시도 → 403', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue(baseDisposal)

    await expect(disposalService.cancel('d-1', REQUESTER_AM_B)).rejects.toMatchObject({
      statusCode: 403,
    })
  })

  it('PENDING_ADMIN 단계에서도 신청자가 취소 가능', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({ ...baseDisposal, status: 'CANCELLED' })
    prismaMock.__tx.asset.update.mockResolvedValue({ ...baseAsset, status: 'IDLE' })

    await expect(disposalService.cancel('d-1', REQUESTER_AM_A)).resolves.toBeDefined()
  })
})

describe('disposal.service.complete', () => {
  it('APPROVED → COMPLETED, asset.status = RETIRED', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'APPROVED' })
    prismaMock.__tx.disposal.findUniqueOrThrow.mockResolvedValue({ ...baseDisposal, status: 'COMPLETED' })
    prismaMock.__tx.asset.update.mockResolvedValue({ ...baseAsset, status: 'RETIRED' })
    prismaMock.__tx.disposalEvidence.deleteMany.mockResolvedValue({ count: 0 })
    prismaMock.__tx.disposalEvidence.createMany.mockResolvedValue({ count: 0 })

    await disposalService.complete('d-1', {}, REQUESTER_ADMIN)

    expect(prismaMock.__tx.disposal.updateMany).toHaveBeenCalledWith({
      where: { id: 'd-1', status: 'APPROVED' },
      data: expect.objectContaining({ status: 'COMPLETED' }),
    })
    expect(prismaMock.__tx.asset.update).toHaveBeenCalledWith({
      where: { id: 'asset-1' },
      data: { status: 'RETIRED' },
    })
  })

  it('PENDING_ADMIN 상태에서 complete 시도 → 409 (APPROVED 단계 필요)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'PENDING_ADMIN' })

    await expect(disposalService.complete('d-1', {}, REQUESTER_ADMIN)).rejects.toMatchObject({
      statusCode: 409,
    })
  })

  it('동시에 두 번 완료 처리되면 두 번째는 409로 거부되고 자산은 건드리지 않는다 (원자적 갱신)', async () => {
    prismaMock.disposal.findUnique.mockResolvedValue({ ...baseDisposal, status: 'APPROVED' })
    prismaMock.__tx.disposal.updateMany.mockResolvedValueOnce({ count: 0 })

    await expect(disposalService.complete('d-1', {}, REQUESTER_ADMIN)).rejects.toMatchObject({
      statusCode: 409,
    })
    expect(prismaMock.__tx.asset.update).not.toHaveBeenCalled()
  })
})
