import { AppError } from '../../../lib/AppError'
import { assetService } from '../asset.service'
import type { RequesterContext } from '../asset.types'

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
      asset: { findUnique: jest.fn(), update: jest.fn() },
      $transaction: jest.fn((cb: (tx: typeof txMock) => unknown) => cb(txMock)),
      __tx: txMock,
    },
  }
})

import { prisma } from '../../../lib/prisma'

const prismaMock = prisma as unknown as {
  asset: { findUnique: jest.Mock; update: jest.Mock }
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

const admin: RequesterContext = { id: 'admin-1', role: 'ADMIN' }
const user: RequesterContext = { id: 'user-1', role: 'USER' }
const otherUser: RequesterContext = { id: 'user-2', role: 'USER' }

const sampleAsset = {
  id: 'asset-1',
  assetCode: 'IT-0001',
  name: 'MacBook Pro',
  class: 'IT_ASSET',
  status: 'OPERATING',
  condition: 'GOOD',
  description: null,
  conditionAssessedAt: null,
  ownershipType: 'COMPANY_OWNED',
  purchaseDate: null,
  purchasePrice: null,
  currentValue: null,
  imageUrl: null,
  categoryId: 'cat-1',
  teamId: 'dept-1',
  locationId: 'loc-1',
  vendorId: null,
  assignedUserId: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  category: { id: 'cat-1', name: 'Laptop', code: 'LAPTOP' },
  team: { id: 'dept-1', name: '개발팀', code: 'DEV' },
  location: { id: 'loc-1', name: '본사 5층', building: '본사' },
  vendor: null,
  assignedUser: { id: 'user-1', name: '홍길동', email: 'hong@company.com' },
  hardware: { serialNo: 'MBP1', macAddr: null, ipAddr: null, cpu: 'M3', ramGb: 32, storageGb: null, warrantyEnd: null },
  software: null,
  peripheral: null,
}

// ── getById ──────────────────────────────────────────────────────────────────
describe('assetService.getById', () => {
  beforeEach(() => jest.clearAllMocks())

  it('자산을 찾아 detail로 반환한다 (ADMIN)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(sampleAsset)
    const result = await assetService.getById('asset-1', admin)
    expect(result.id).toBe('asset-1')
    expect(result.hardware?.serialNo).toBe('MBP1')
  })

  it('존재하지 않으면 AppError(404)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(null)
    await expect(assetService.getById('none', admin)).rejects.toThrow(
      new AppError(404, '자산을 찾을 수 없습니다.'),
    )
  })

  it('USER가 본인 배정 자산이 아니면 AppError(403)', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(sampleAsset)
    await expect(assetService.getById('asset-1', otherUser)).rejects.toThrow(
      new AppError(403, '본인 할당 또는 대여 가능 자산만 조회할 수 있습니다.'),
    )
  })

  it('USER가 본인 배정 자산이면 정상 조회', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(sampleAsset)
    const result = await assetService.getById('asset-1', user)
    expect(result.id).toBe('asset-1')
  })
})

// ── update ───────────────────────────────────────────────────────────────────
describe('assetService.update', () => {
  // sampleAsset의 categoryId = 'cat-1', subType = 'HARDWARE'
  const hardwareCategoryMock = { id: 'cat-1', code: 'LAPTOP', subType: 'HARDWARE' }

  beforeEach(() => {
    jest.clearAllMocks()
    // update 서비스가 category.subType으로 전용 필드 검증하므로 기본 mock 설정
    prismaMock.__tx.assetCategory.findUnique.mockResolvedValue(hardwareCategoryMock)
  })

  it('변경된 필드만 update하고 AssetHistory UPDATED를 기록한다', async () => {
    prismaMock.__tx.asset.findUnique.mockResolvedValue(sampleAsset)
    prismaMock.__tx.asset.update.mockResolvedValue({ ...sampleAsset, name: '새 이름' })
    prismaMock.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.update('asset-1', { name: '새 이름' }, admin.id)

    expect(prismaMock.__tx.asset.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'asset-1' },
        data: { name: '새 이름' },
      }),
    )
    expect(prismaMock.__tx.assetHistory.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: 'UPDATED',
          performedById: admin.id,
          metadata: expect.objectContaining({
            changes: { name: { from: 'MacBook Pro', to: '새 이름' } },
          }),
        }),
      }),
    )
  })

  it('assignedUserId 변경 시 ASSIGNED 액션을 기록한다', async () => {
    prismaMock.__tx.asset.findUnique.mockResolvedValue({ ...sampleAsset, assignedUserId: null })
    prismaMock.__tx.asset.update.mockResolvedValue({ ...sampleAsset, assignedUserId: 'user-9' })
    prismaMock.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.update('asset-1', { assignedUserId: 'user-9', reason: '배정' }, admin.id)

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('ASSIGNED')
  })

  it('assignedUserId가 null로 해제되면 UNASSIGNED 액션', async () => {
    prismaMock.__tx.asset.findUnique.mockResolvedValue(sampleAsset)
    prismaMock.__tx.asset.update.mockResolvedValue({ ...sampleAsset, assignedUserId: null })
    prismaMock.__tx.assetHistory.create.mockResolvedValue({})

    await assetService.update('asset-1', { assignedUserId: null, status: 'IDLE', reason: '반납' }, admin.id)

    const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
    expect(historyCall.data.action).toBe('UNASSIGNED')
  })

  it('존재하지 않는 자산이면 AppError(404)', async () => {
    prismaMock.__tx.asset.findUnique.mockResolvedValue(null)
    await expect(assetService.update('none', { name: 'x' }, admin.id)).rejects.toThrow(
      new AppError(404, '자산을 찾을 수 없습니다.'),
    )
  })

  // ── 전용 필드 업데이트 ────────────────────────────────────────────────────
  describe('전용 필드 업데이트', () => {
    it('HARDWARE 자산의 hardware 필드를 부분 업데이트', async () => {
      prismaMock.__tx.asset.findUnique.mockResolvedValue(sampleAsset)
      prismaMock.__tx.hardwareAsset.findUnique.mockResolvedValue({
        assetId: 'asset-1',
        serialNo: 'MBP1',
        cpu: 'M1',
        ramGb: 16,
        macAddr: null,
        ipAddr: null,
        storageGb: null,
        warrantyEnd: null,
      })
      prismaMock.__tx.asset.update.mockResolvedValue(sampleAsset)
      prismaMock.__tx.hardwareAsset.update.mockResolvedValue({})
      prismaMock.__tx.assetHistory.create.mockResolvedValue({})

      await assetService.update('asset-1', { hardware: { cpu: 'M3', ramGb: 32 } }, admin.id)

      expect(prismaMock.__tx.hardwareAsset.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { assetId: 'asset-1' },
          data: { cpu: 'M3', ramGb: 32 },
        }),
      )
    })

    it('카테고리 subType과 다른 전용 필드를 보내면 AppError(400)', async () => {
      prismaMock.__tx.asset.findUnique.mockResolvedValue(sampleAsset)
      // sampleAsset의 category는 subType=HARDWARE이므로 software 필드는 불일치
      await expect(
        assetService.update('asset-1', { software: { licenseSeats: 10 } }, admin.id),
      ).rejects.toThrow(AppError)
      const err = await assetService.update('asset-1', { software: { licenseSeats: 10 } }, admin.id).catch(e => e)
      expect(err.statusCode).toBe(400)
    })

    it('IT_ASSET(subType=SOFTWARE) 자산의 software 필드 업데이트', async () => {
      const swAsset = { ...sampleAsset, class: 'IT_ASSET' as const }
      prismaMock.__tx.assetCategory.findUnique.mockResolvedValue({ id: 'cat-1', code: 'LICENSE', subType: 'SOFTWARE' })
      prismaMock.__tx.asset.findUnique.mockResolvedValue(swAsset)
      prismaMock.__tx.softwareAsset.findUnique.mockResolvedValue({ assetId: 'asset-1', licenseSeats: 10 })
      prismaMock.__tx.asset.update.mockResolvedValue(swAsset)
      prismaMock.__tx.softwareAsset.update.mockResolvedValue({})
      prismaMock.__tx.assetHistory.create.mockResolvedValue({})

      await assetService.update('asset-1', { software: { licenseSeats: 20 } }, admin.id)

      expect(prismaMock.__tx.softwareAsset.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { licenseSeats: 20 } }),
      )
    })

    it('hardware.serialNo 변경 시 다른 자산과 중복이면 AppError(409)', async () => {
      prismaMock.__tx.asset.findUnique.mockResolvedValue(sampleAsset)
      prismaMock.__tx.hardwareAsset.findUnique.mockResolvedValue({
        assetId: 'other-asset',
        serialNo: 'DUPLICATE',
      })

      await expect(
        assetService.update('asset-1', { hardware: { serialNo: 'DUPLICATE' } }, admin.id),
      ).rejects.toThrow(new AppError(409, '이미 사용 중인 시리얼 번호입니다.'))
    })

    it('전용 필드 변경 metadata에 hardware.* 키로 기록', async () => {
      prismaMock.__tx.asset.findUnique.mockResolvedValue(sampleAsset)
      prismaMock.__tx.hardwareAsset.findUnique.mockResolvedValue({
        assetId: 'asset-1', serialNo: 'X', cpu: 'M1', ramGb: 16,
      })
      prismaMock.__tx.asset.update.mockResolvedValue(sampleAsset)
      prismaMock.__tx.hardwareAsset.update.mockResolvedValue({})
      prismaMock.__tx.assetHistory.create.mockResolvedValue({})

      await assetService.update('asset-1', { hardware: { cpu: 'M3' } }, admin.id)

      const historyCall = prismaMock.__tx.assetHistory.create.mock.calls[0][0]
      expect(historyCall.data.metadata).toEqual({
        changes: { 'hardware.cpu': { from: 'M1', to: 'M3' } },
      })
    })
  })
})

// ADR 0005: assetService.retire 제거됨 — 폐기는 disposalService 결재 흐름을 통과한다.
// 본 describe 블록은 PR ② 에서 의도적으로 삭제 (해당 service 함수 자체가 사라짐).
