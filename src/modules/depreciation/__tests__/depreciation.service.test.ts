import { AppError } from '../../../lib/AppError'
import { depreciationService } from '../depreciation.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    asset: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    depreciation: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
    },
    depreciationRecord: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    assetHistory: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

import { prisma } from '../../../lib/prisma'

const mockAssetFindUnique = prisma.asset.findUnique as jest.Mock
const mockDepFindUnique = prisma.depreciation.findUnique as jest.Mock
const mockDepDelete = prisma.depreciation.delete as jest.Mock
const mockTransaction = prisma.$transaction as unknown as jest.Mock
const mockAssetHistoryCreate = (prisma as unknown as { assetHistory: { create: jest.Mock } }).assetHistory.create

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const userCtx = { id: 'user-1', role: 'USER' as const }

const baseAsset = {
  id: 'asset-1',
  assetCode: 'A-001',
  name: '노트북',
  purchasePrice: 1500000,
  purchaseDate: new Date('2026-01-01'),
}

beforeEach(() => {
  jest.clearAllMocks()
})

// ── simulate (정액법/정률법) ────────────────────────────────────────────────
describe('depreciationService.simulate', () => {
  it('정액법: (1,500,000 - 100,000) / 5 = 280,000 매년', () => {
    const records = depreciationService.simulate({
      method: 'STRAIGHT_LINE',
      usefulLifeYears: 5,
      purchasePrice: 1_500_000,
      salvageValue: 100_000,
      annualRate: 0.2, // 정액법에선 사용 안 됨
      startYear: 2026,
    })
    expect(records).toHaveLength(5)
    expect(records[0]).toEqual({ fiscalYear: 2026, depreciationAmount: 280_000, bookValue: 1_220_000 })
    expect(records[4]).toEqual({ fiscalYear: 2030, depreciationAmount: 280_000, bookValue: 100_000 })
  })

  it('정률법: 매년 이전 장부가 × annualRate (잔존가 이하로 안 내려감)', () => {
    const records = depreciationService.simulate({
      method: 'DECLINING_BALANCE',
      usefulLifeYears: 5,
      purchasePrice: 1_000_000,
      salvageValue: 100_000,
      annualRate: 0.4,
      startYear: 2026,
    })
    expect(records).toHaveLength(5)
    // Y1: 1,000,000 * 0.4 = 400,000 → bookValue 600,000
    expect(records[0]?.depreciationAmount).toBe(400_000)
    expect(records[0]?.bookValue).toBe(600_000)
    // Y2: 600,000 * 0.4 = 240,000 → bookValue 360,000
    expect(records[1]?.bookValue).toBe(360_000)
    // 마지막은 salvageValue 이하로 안 내려감
    expect(records[4]!.bookValue).toBeGreaterThanOrEqual(100_000)
  })
})

// ── defaultAnnualRate ───────────────────────────────────────────────────────
describe('depreciationService.defaultAnnualRate', () => {
  it('정액법 = 1 / N', () => {
    expect(depreciationService.defaultAnnualRate('STRAIGHT_LINE', 5)).toBeCloseTo(0.2)
  })

  it('정률법 = 2 / N (200% 정률법, 0.9999 cap)', () => {
    expect(depreciationService.defaultAnnualRate('DECLINING_BALANCE', 5)).toBeCloseTo(0.4)
  })
})

// ── upsert ──────────────────────────────────────────────────────────────────
describe('depreciationService.upsert', () => {
  it('USER 권한이면 403', async () => {
    await expect(
      depreciationService.upsert(
        { assetId: 'asset-1', method: 'STRAIGHT_LINE', usefulLifeYears: 5, salvageValue: 100_000 },
        userCtx,
      ),
    ).rejects.toThrow(new AppError(403, '관리자 권한이 필요합니다.'))
  })

  it('자산이 없으면 404', async () => {
    mockAssetFindUnique.mockResolvedValue(null)
    await expect(
      depreciationService.upsert(
        { assetId: 'asset-x', method: 'STRAIGHT_LINE', usefulLifeYears: 5, salvageValue: 100_000 },
        adminCtx,
      ),
    ).rejects.toThrow(new AppError(404, '자산을 찾을 수 없습니다.'))
  })

  it('자산에 구매가/구매일이 없으면 400', async () => {
    mockAssetFindUnique.mockResolvedValue({ ...baseAsset, purchasePrice: null })
    await expect(
      depreciationService.upsert(
        { assetId: 'asset-1', method: 'STRAIGHT_LINE', usefulLifeYears: 5, salvageValue: 100_000 },
        adminCtx,
      ),
    ).rejects.toThrow(/구매가\/구매일/)
  })

  it('잔존가액이 구매가 이상이면 400', async () => {
    mockAssetFindUnique.mockResolvedValue(baseAsset)
    await expect(
      depreciationService.upsert(
        { assetId: 'asset-1', method: 'STRAIGHT_LINE', usefulLifeYears: 5, salvageValue: 1_500_000 },
        adminCtx,
      ),
    ).rejects.toThrow(/잔존가액은 구매가액보다/)
  })
})

// ── remove ──────────────────────────────────────────────────────────────────
describe('depreciationService.remove', () => {
  it('없는 설정은 404', async () => {
    mockDepFindUnique.mockResolvedValue(null)
    await expect(depreciationService.remove('asset-1', adminCtx)).rejects.toThrow(
      new AppError(404, '감가상각 설정을 찾을 수 없습니다.'),
    )
  })

  it('USER 권한 거부', async () => {
    await expect(depreciationService.remove('asset-1', userCtx)).rejects.toThrow(
      /관리자 권한/,
    )
  })

  describe('정상 삭제 (transaction)', () => {
    let tx: {
      depreciation: { delete: jest.Mock }
      asset: { update: jest.Mock }
      assetHistory: { create: jest.Mock }
    }

    beforeEach(() => {
      mockDepFindUnique.mockResolvedValue({ id: 'dep-1' })
      mockAssetFindUnique.mockResolvedValue({ ...baseAsset, currentValue: 800000 })
      tx = {
        depreciation: { delete: jest.fn().mockResolvedValue({}) },
        asset: { update: jest.fn().mockResolvedValue({}) },
        assetHistory: { create: jest.fn().mockResolvedValue({}) },
      }
      mockTransaction.mockImplementation(async (cb: (t: typeof tx) => unknown) => cb(tx))
    })

    it('정상 삭제 시 undefined 반환', async () => {
      await expect(depreciationService.remove('asset-1', adminCtx)).resolves.toBeUndefined()
    })

    it('asset.currentValue → null 초기화', async () => {
      await depreciationService.remove('asset-1', adminCtx)
      expect(tx.asset.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'asset-1' }, data: { currentValue: null } }),
      )
    })

    it('AssetHistory에 lastBookValue 기록', async () => {
      await depreciationService.remove('asset-1', adminCtx)
      expect(tx.assetHistory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            assetId: 'asset-1',
            action: 'UPDATED',
            metadata: expect.objectContaining({
              event: 'depreciation_removed',
              lastBookValue: 800000,
            }),
            performedById: adminCtx.id,
          }),
        }),
      )
    })

    it('currentValue가 없던 자산은 lastBookValue: null', async () => {
      mockAssetFindUnique.mockResolvedValue({ ...baseAsset, currentValue: null })
      await depreciationService.remove('asset-1', adminCtx)
      expect(tx.assetHistory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            metadata: expect.objectContaining({ lastBookValue: null }),
          }),
        }),
      )
    })
  })
})

// ── getByAssetId ────────────────────────────────────────────────────────────
describe('depreciationService.getByAssetId', () => {
  it('없으면 null', async () => {
    mockDepFindUnique.mockResolvedValue(null)
    const result = await depreciationService.getByAssetId('asset-x', adminCtx)
    expect(result).toBeNull()
  })

  it('있으면 records + currentBookValue 반환', async () => {
    mockDepFindUnique.mockResolvedValue({
      id: 'dep-1',
      assetId: 'asset-1',
      method: 'STRAIGHT_LINE',
      usefulLifeYears: 3,
      salvageValue: 100_000,
      annualRate: 0.333,
      createdAt: new Date(),
      updatedAt: new Date(),
      asset: {
        assetCode: 'A-001',
        name: '노트북',
        purchasePrice: 1_000_000,
        purchaseDate: new Date('2026-01-01'),
      },
      records: [
        { fiscalYear: 2026, depreciationAmount: 300_000, bookValue: 700_000, recordedAt: new Date() },
        { fiscalYear: 2027, depreciationAmount: 300_000, bookValue: 400_000, recordedAt: new Date() },
        { fiscalYear: 2028, depreciationAmount: 300_000, bookValue: 100_000, recordedAt: new Date() },
      ],
    })

    const result = await depreciationService.getByAssetId('asset-1', adminCtx)
    expect(result?.records).toHaveLength(3)
    expect(result?.assetCode).toBe('A-001')
    expect(result?.currentBookValue).toBe(700_000) // 2026 = 현재년도면
  })
})

// 통합: upsert 가 transaction 안에서 simulate 결과 만큼 records 만들고 자산 currentValue 업데이트
describe('depreciationService.upsert (transaction)', () => {
  it('records 자동 생성 + Asset.currentValue 업데이트', async () => {
    mockAssetFindUnique.mockResolvedValue(baseAsset)

    mockTransaction.mockImplementation(async (cb: (tx: unknown) => unknown) => {
      const tx = {
        depreciation: {
          upsert: jest.fn().mockResolvedValue({ id: 'dep-1' }),
        },
        depreciationRecord: {
          deleteMany: jest.fn().mockResolvedValue({}),
          createMany: jest.fn().mockResolvedValue({}),
        },
        asset: {
          update: jest.fn().mockResolvedValue({}),
        },
      }
      ;(depreciationService as unknown as { __lastTx: typeof tx }).__lastTx = tx
      return cb(tx)
    })

    // 첫번째 getByAssetId 호출 (upsert 끝나고 결과 조회)
    mockDepFindUnique.mockResolvedValue({
      id: 'dep-1',
      assetId: 'asset-1',
      method: 'STRAIGHT_LINE',
      usefulLifeYears: 5,
      salvageValue: 100_000,
      annualRate: 0.2,
      createdAt: new Date(),
      updatedAt: new Date(),
      asset: { ...baseAsset },
      records: [],
    })

    await depreciationService.upsert(
      { assetId: 'asset-1', method: 'STRAIGHT_LINE', usefulLifeYears: 5, salvageValue: 100_000 },
      adminCtx,
    )

    const tx = (depreciationService as unknown as {
      __lastTx: {
        depreciationRecord: { createMany: jest.Mock }
        asset: { update: jest.Mock }
      }
    }).__lastTx
    expect(tx.depreciationRecord.createMany).toHaveBeenCalled()
    const createManyArgs = tx.depreciationRecord.createMany.mock.calls[0]?.[0]
    expect(createManyArgs?.data).toHaveLength(5) // usefulLifeYears = 5
    expect(tx.asset.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'asset-1' },
        data: expect.objectContaining({ currentValue: expect.any(Number) }),
      }),
    )
  })
})
