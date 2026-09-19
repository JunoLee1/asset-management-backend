import { AppError } from '../../../lib/AppError'
import { assetService } from '../asset.service'

jest.mock('../../../lib/prisma', () => {
  const txMock = {
    asset: { findUnique: jest.fn(), update: jest.fn() },
    hardwareAsset: { findUnique: jest.fn(), update: jest.fn() },
    softwareAsset: { findUnique: jest.fn(), update: jest.fn() },
    peripheralAsset: { findUnique: jest.fn(), update: jest.fn() },
    assetHistory: { create: jest.fn() },
    assetCategory: { findUnique: jest.fn() },
  }
  return {
    prisma: {
      asset: { findUnique: jest.fn() },
      $transaction: jest.fn((cb: (tx: typeof txMock) => unknown) => cb(txMock)),
      __tx: txMock,
    },
  }
})

import { prisma } from '../../../lib/prisma'

const prismaMock = prisma as unknown as {
  asset: { findUnique: jest.Mock }
  $transaction: jest.Mock
  __tx: {
    asset: { findUnique: jest.Mock; update: jest.Mock }
    hardwareAsset: { findUnique: jest.Mock; update: jest.Mock }
    softwareAsset: { findUnique: jest.Mock; update: jest.Mock }
    peripheralAsset: { findUnique: jest.Mock; update: jest.Mock }
    assetHistory: { create: jest.Mock }
    assetCategory: { findUnique: jest.Mock }
  }
}

const REQUESTER_ID = 'admin-1'

const baseAsset = {
  id: 'asset-1',
  assetCode: 'IT-0001',
  name: 'MacBook Pro',
  class: 'IT_ASSET',
  status: 'OPERATING',
  condition: 'GOOD',
  locationId: 'loc-1',
  assignedUserId: 'user-1',
  departmentId: 'dept-1',
  categoryId: 'cat-1',
  description: null,
  conditionAssessedAt: null,
  ownershipType: 'COMPANY_OWNED',
  purchaseDate: new Date(),
  purchasePrice: 1000000,
  currentValue: null,
  imageUrl: null,
  vendorId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

beforeEach(() => {
  jest.clearAllMocks()
  prismaMock.__tx.asset.findUnique.mockResolvedValue(baseAsset)
  prismaMock.__tx.asset.update.mockResolvedValue({ ...baseAsset })
  prismaMock.__tx.assetHistory.create.mockResolvedValue({})
  // update 서비스가 category.subType으로 전용 필드 검증 — 기본: subType 없음(코어 필드만)
  prismaMock.__tx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-1', code: 'IT_ASSET', subType: null })
})

describe('asset.service.update — TRANSFERRED 태깅 (H1)', () => {
  it('locationId 변경 + reason 입력 → action=TRANSFERRED, metadata에 reason 저장', async () => {
    await assetService.update('asset-1', { locationId: 'loc-2', reason: '부서 이동' }, REQUESTER_ID)

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('TRANSFERRED')
    expect(historyCall.data.metadata).toMatchObject({ reason: '부서 이동' })
    expect(historyCall.data.metadata.changes).toMatchObject({
      locationId: { from: 'loc-1', to: 'loc-2' },
    })
  })

  it('locationId 변경 + reason 미입력 → AppError 400', async () => {
    await expect(
      assetService.update('asset-1', { locationId: 'loc-2' }, REQUESTER_ID),
    ).rejects.toThrow(AppError)

    const err = await assetService.update('asset-1', { locationId: 'loc-2' }, REQUESTER_ID).catch((e) => e)
    expect(err.statusCode).toBe(400)
  })

  it('assignedUserId 변경 + reason 입력 → action=ASSIGNED', async () => {
    await assetService.update(
      'asset-1',
      { assignedUserId: 'user-2', reason: '담당자 변경' },
      REQUESTER_ID,
    )

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('ASSIGNED')
    expect(historyCall.data.metadata).toMatchObject({ reason: '담당자 변경' })
  })

  it('assignedUserId null(반납) + reason 입력 → action=UNASSIGNED', async () => {
    await assetService.update(
      'asset-1',
      { assignedUserId: null, status: 'IDLE', reason: '반납 처리' },
      REQUESTER_ID,
    )

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('UNASSIGNED')
  })

  it('assignedUserId 변경 + reason 미입력 → AppError 400', async () => {
    const err = await assetService
      .update('asset-1', { assignedUserId: 'user-2' }, REQUESTER_ID)
      .catch((e) => e)
    expect(err).toBeInstanceOf(AppError)
    expect(err.statusCode).toBe(400)
  })

  it('일반 필드만 변경 → action=UPDATED, reason 불필요', async () => {
    await assetService.update('asset-1', { name: '새 이름' }, REQUESTER_ID)

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('UPDATED')
  })

  it('locationId + assignedUserId 동시 변경 → TRANSFERRED 1건 (위치 우선)', async () => {
    await assetService.update(
      'asset-1',
      { locationId: 'loc-2', assignedUserId: 'user-2', reason: '부서 이동 + 담당자 변경' },
      REQUESTER_ID,
    )

    expect(prismaMock.__tx.assetHistory.create).toHaveBeenCalledTimes(1)
    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('TRANSFERRED')
  })

  it('locationId 값이 동일하면 TRANSFERRED 아님 (실제 변경 없음)', async () => {
    // loc-1 → loc-1 (no change)
    await assetService.update('asset-1', { locationId: 'loc-1', name: '새 이름' }, REQUESTER_ID)

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('UPDATED')
  })
})
