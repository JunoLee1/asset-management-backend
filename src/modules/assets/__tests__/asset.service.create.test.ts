import { AppError } from '../../../lib/AppError'
import { Prisma } from '../../../generated/prisma/client'
import { assetService } from '../asset.service'
import type { CreateAssetInput } from '../../../schemas/asset.schema'

// Prisma $transaction mock
jest.mock('../../../lib/prisma', () => {
  const txMock = {
    asset: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    hardwareAsset: { create: jest.fn() },
    softwareAsset: { create: jest.fn() },
    peripheralAsset: { create: jest.fn() },
    officeAsset: { create: jest.fn() },
    depreciation: { create: jest.fn() },
    depreciationRecord: { createMany: jest.fn() },
    assetHistory: { create: jest.fn() },
    assetCodeCounter: { upsert: jest.fn() },
    assetCategory: { findUnique: jest.fn() },
  }
  return {
    prisma: {
      asset: { findUnique: jest.fn() },
      department: { findUnique: jest.fn() },
      location: { findUnique: jest.fn() },
      assetCategory: { findUnique: jest.fn() },
      $transaction: jest.fn((cb: (tx: typeof txMock) => unknown) => cb(txMock)),
      __tx: txMock,
    },
  }
})

import { prisma } from '../../../lib/prisma'

const prismaWithTx = prisma as unknown as {
  asset: { findUnique: jest.Mock }
  department: { findUnique: jest.Mock }
  location: { findUnique: jest.Mock }
  assetCategory: { findUnique: jest.Mock }
  $transaction: jest.Mock
  __tx: {
    asset: { create: jest.Mock; findUnique: jest.Mock; update: jest.Mock }
    hardwareAsset: { create: jest.Mock }
    softwareAsset: { create: jest.Mock }
    peripheralAsset: { create: jest.Mock }
    depreciation: { create: jest.Mock }
    depreciationRecord: { createMany: jest.Mock }
    assetHistory: { create: jest.Mock }
    assetCategory: { findUnique: jest.Mock }
    assetCodeCounter: { upsert: jest.Mock }
  }
}

const REQUESTER_ID = 'admin-1'

// IT_ASSET class + category.subType = HARDWARE 로 전용 테이블 분기
// LAPTOP 카테고리는 cpu/ramGb/storageGb 필수 → 세 필드 모두 포함
const baseHardwareInput: CreateAssetInput = {
  assetCode: 'IT-0001',
  name: 'MacBook Pro 16',
  class: 'IT_ASSET',
  categoryId: 'cat-1',
  catalogId: 'catalog-1',
  departmentId: 'dept-1',
  locationId: 'loc-1',
  purchaseDate: '2024-01-01T00:00:00.000Z',
  purchasePrice: 1500000,
  purchaseCurrency: 'KRW',
  hardware: { serialNo: 'MBP123', cpu: 'M3', ramGb: 32, storageGb: 512 },
}

// category mock: subType = 'HARDWARE', code = 'LAPTOP' → hardwareAsset 분기 + 스펙 필수 검증
const hardwareCategory = { id: 'cat-1', code: 'LAPTOP', subType: 'HARDWARE' }

const createdAsset = {
  id: 'asset-1',
  assetCode: 'IT-0001',
  name: 'MacBook Pro 16',
  class: 'IT_ASSET' as const,
  status: 'IDLE',
  condition: 'GOOD',
  categoryId: 'cat-1',
  departmentId: 'dept-1',
  locationId: 'loc-1',
}

describe('assetService.create', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // 기본적으로 category mock에 subType을 설정
    prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue(hardwareCategory)
    // FK pre-check (service가 트랜잭션 진입 전 부서/위치/카테고리 존재 검증)
    prismaWithTx.department.findUnique.mockResolvedValue({ id: 'dept-1' })
    prismaWithTx.location.findUnique.mockResolvedValue({ id: 'loc-1' })
    prismaWithTx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-1' })
    // depreciationRecord.createMany 와 asset.update(currentValue 동기화)는 HARDWARE 생성 시 호출됨
    prismaWithTx.__tx.depreciation.create.mockResolvedValue({ id: 'dep-1' })
    prismaWithTx.__tx.depreciationRecord.createMany.mockResolvedValue({ count: 0 })
    prismaWithTx.__tx.asset.update.mockResolvedValue({})
  })

  it('IT_ASSET(subType=HARDWARE) 자산을 코어 + hardware_assets 트랜잭션으로 생성한다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
    prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
    prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.create(baseHardwareInput, REQUESTER_ID)

    expect(prismaWithTx.__tx.asset.create).toHaveBeenCalled()
    expect(prismaWithTx.__tx.hardwareAsset.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ assetId: 'asset-1', serialNo: 'MBP123' }),
      }),
    )
  })

  it('IT_ASSET(subType=SOFTWARE) 자산은 software_assets 트랜잭션에 기록한다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-sw', code: 'LICENSE', subType: 'SOFTWARE' })
    prismaWithTx.__tx.asset.create.mockResolvedValue({ ...createdAsset, class: 'IT_ASSET', assetCode: 'IT-0002' })
    prismaWithTx.__tx.softwareAsset.create.mockResolvedValue({})
    prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.create(
      {
        ...baseHardwareInput,
        assetCode: 'IT-0002',
        class: 'IT_ASSET',
        hardware: undefined,
        software: { licenseKey: 'X-Y-Z', licenseSeats: 5 },
      } as CreateAssetInput,
      REQUESTER_ID,
    )

    expect(prismaWithTx.__tx.softwareAsset.create).toHaveBeenCalled()
    expect(prismaWithTx.__tx.hardwareAsset.create).not.toHaveBeenCalled()
  })

  it('생성 시 AssetHistory에 CREATED 액션을 자동 기록한다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
    prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
    prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.create(baseHardwareInput, REQUESTER_ID)

    expect(prismaWithTx.__tx.assetHistory.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: 'CREATED',
          assetId: 'asset-1',
          performedById: REQUESTER_ID,
        }),
      }),
    )
  })

  it('중복된 assetCode면 AppError(409)를 throw한다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue({ id: 'existing-1' })

    await expect(assetService.create(baseHardwareInput, REQUESTER_ID)).rejects.toThrow(
      new AppError(409, '이미 사용 중인 자산 코드입니다.'),
    )

    expect(prismaWithTx.$transaction).not.toHaveBeenCalled()
  })

  it('트랜잭션에서 serialNo unique 위반(P2002) 발생 시 AppError(409, 일련번호)로 변환된다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
    // hardwareAsset.create 가 P2002 (serialNo unique) 던지도록 mock
    const p2002 = new Prisma.PrismaClientKnownRequestError('serialNo unique', {
      code: 'P2002',
      clientVersion: 'x',
      meta: { target: ['serialNo'] },
    })
    prismaWithTx.__tx.hardwareAsset.create.mockRejectedValue(p2002)

    const err = await assetService.create(baseHardwareInput, REQUESTER_ID).catch((e) => e)
    expect(err).toBeInstanceOf(AppError)
    expect(err.statusCode).toBe(409)
    expect(err.message).toContain('일련번호')
  })

  it('IT_ASSET(subType=HARDWARE) 자산 생성 시 감가상각이 자동 생성된다 (정액법·5년·잔존 0원)', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
    prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
    prismaWithTx.__tx.depreciation.create.mockResolvedValue({})
    prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.create(baseHardwareInput, REQUESTER_ID)

    expect(prismaWithTx.__tx.depreciation.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          assetId: 'asset-1',
          method: 'STRAIGHT_LINE',
          usefulLifeYears: 5,
          salvageValue: 0,
          annualRate: 0.2,
        }),
      }),
    )
  })

  it('IT_ASSET(subType=SOFTWARE) 자산 생성 시 감가상각이 생성되지 않는다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-sw', code: 'LICENSE', subType: 'SOFTWARE' })
    prismaWithTx.__tx.asset.create.mockResolvedValue({ ...createdAsset, class: 'IT_ASSET' })
    prismaWithTx.__tx.softwareAsset.create.mockResolvedValue({})
    prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.create(
      {
        ...baseHardwareInput,
        class: 'IT_ASSET',
        hardware: undefined,
        software: { licenseKey: 'X', licenseSeats: 1 },
      } as CreateAssetInput,
      REQUESTER_ID,
    )

    expect(prismaWithTx.__tx.depreciation.create).not.toHaveBeenCalled()
  })

  it('OFFICE_ASSET 자산은 전용 상세 테이블 없이 코어만 생성한다', async () => {
    prismaWithTx.asset.findUnique.mockResolvedValue(null)
    prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-office', code: 'FURNITURE', subType: null })
    prismaWithTx.__tx.asset.create.mockResolvedValue({ ...createdAsset, class: 'OFFICE_ASSET', assetCode: 'OFF-0001' })
    prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.create(
      { ...baseHardwareInput, assetCode: 'OFF-0001', class: 'OFFICE_ASSET', hardware: undefined, office: { modelName: 'Desk Chair X' } } as CreateAssetInput,
      REQUESTER_ID,
    )

    expect(prismaWithTx.__tx.asset.create).toHaveBeenCalled()
    expect(prismaWithTx.__tx.hardwareAsset.create).not.toHaveBeenCalled()
    expect(prismaWithTx.__tx.softwareAsset.create).not.toHaveBeenCalled()
    expect(prismaWithTx.__tx.peripheralAsset.create).not.toHaveBeenCalled()
    expect(prismaWithTx.__tx.assetHistory.create).toHaveBeenCalled()
  })

  // ── LAPTOP/DESKTOP/SERVER 스펙 필수화 ───────────────────────────────────────
  describe('노트북·데스크탑·서버 cpu/ramGb/storageGb 필수 검증', () => {
    const laptopCategory = { id: 'cat-1', code: 'LAPTOP', subType: 'HARDWARE' }
    const monitorCategory = { id: 'cat-2', code: 'MONITOR', subType: 'HARDWARE' }

    it('LAPTOP 카테고리에서 cpu 없으면 AppError(400)', async () => {
      prismaWithTx.asset.findUnique.mockResolvedValue(null)
      prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue(laptopCategory)

      await expect(
        assetService.create(
          { ...baseHardwareInput, hardware: { serialNo: 'S1' } },
          REQUESTER_ID,
        ),
      ).rejects.toThrow(AppError)
      const err = await assetService.create(
        { ...baseHardwareInput, hardware: { serialNo: 'S1' } }, REQUESTER_ID,
      ).catch(e => e)
      expect(err.statusCode).toBe(400)
    })

    it('LAPTOP 카테고리에서 cpu·ramGb·storageGb 모두 있으면 통과', async () => {
      prismaWithTx.asset.findUnique.mockResolvedValue(null)
      prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue(laptopCategory)
      prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
      prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
      prismaWithTx.__tx.depreciation.create.mockResolvedValue({})
      prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

      await expect(
        assetService.create(
          { ...baseHardwareInput, hardware: { serialNo: 'S1', cpu: 'M3', ramGb: 16, storageGb: 512 } },
          REQUESTER_ID,
        ),
      ).resolves.toBeDefined()
    })

    it('MONITOR 카테고리에서 cpu 없어도 통과', async () => {
      prismaWithTx.asset.findUnique.mockResolvedValue(null)
      prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue(monitorCategory)
      prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
      prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
      prismaWithTx.__tx.depreciation.create.mockResolvedValue({})
      prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

      await expect(
        assetService.create(
          { ...baseHardwareInput, hardware: { serialNo: 'S1' } },
          REQUESTER_ID,
        ),
      ).resolves.toBeDefined()
    })
  })

  // ── 자산 코드 자동 채번 ────────────────────────────────────────────────────
  describe('자동 채번 (assetCode 빈 입력)', () => {
    it('assetCode가 빈 문자열이면 카운터에서 발급한다 (IT_ASSET → IT-0001)', async () => {
      prismaWithTx.__tx.assetCodeCounter.upsert.mockResolvedValue({ class: 'IT_ASSET', nextNumber: 2 })
      prismaWithTx.__tx.asset.create.mockResolvedValue({ ...createdAsset, assetCode: 'IT-0001' })
      prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
      prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

      await assetService.create({ ...baseHardwareInput, assetCode: '' }, REQUESTER_ID)

      expect(prismaWithTx.__tx.assetCodeCounter.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { class: 'IT_ASSET' } }),
      )
      // asset.create에 자동 발급된 코드가 전달됐는지
      const createArg = prismaWithTx.__tx.asset.create.mock.calls[0][0]
      expect(createArg.data.assetCode).toBe('IT-0001')
    })

    it('assetCode가 있으면 카운터를 건드리지 않는다 (수동 입력 보존)', async () => {
      prismaWithTx.asset.findUnique.mockResolvedValue(null)
      prismaWithTx.__tx.asset.create.mockResolvedValue(createdAsset)
      prismaWithTx.__tx.hardwareAsset.create.mockResolvedValue({})
      prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

      await assetService.create(baseHardwareInput, REQUESTER_ID) // assetCode: 'IT-0001'

      expect(prismaWithTx.__tx.assetCodeCounter.upsert).not.toHaveBeenCalled()
    })

    it('자동 채번 시 중복 검사를 건너뛴다 (트랜잭션 내 atomic)', async () => {
      prismaWithTx.__tx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-sw', code: 'LICENSE', subType: 'SOFTWARE' })
      prismaWithTx.__tx.assetCodeCounter.upsert.mockResolvedValue({ class: 'IT_ASSET', nextNumber: 2 })
      prismaWithTx.__tx.asset.create.mockResolvedValue({ ...createdAsset, assetCode: 'IT-0001' })
      prismaWithTx.__tx.softwareAsset.create.mockResolvedValue({})
      prismaWithTx.__tx.assetHistory.create.mockResolvedValue({})

      await assetService.create(
        {
          ...baseHardwareInput,
          assetCode: '',
          class: 'IT_ASSET',
          hardware: undefined,
          software: { licenseKey: 'X', licenseSeats: 1 },
        } as CreateAssetInput,
        REQUESTER_ID,
      )

      // 자동 채번 시 사전 findUnique 호출 없음
      expect(prismaWithTx.asset.findUnique).not.toHaveBeenCalled()
    })
  })
})
