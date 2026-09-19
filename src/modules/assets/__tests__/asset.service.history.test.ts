import { AppError } from '../../../lib/AppError'
import { assetService } from '../asset.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    asset: { findUnique: jest.fn() },
    assetHistory: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    location: { findMany: jest.fn() },
    user: { findMany: jest.fn() },
  },
}))

import { prisma } from '../../../lib/prisma'

const prismaMock = prisma as unknown as {
  asset: { findUnique: jest.Mock }
  assetHistory: { findMany: jest.Mock; count: jest.Mock }
  location: { findMany: jest.Mock }
  user: { findMany: jest.Mock }
}

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const userCtx = { id: 'user-1', role: 'USER' as const }

const baseAsset = {
  id: 'asset-1',
  assignedUserId: 'user-1',
  status: 'OPERATING',
}

const makeHistoryRow = (overrides = {}) => ({
  id: 'h-1',
  action: 'TRANSFERRED',
  description: '위치 이전: HAR-0001',
  metadata: {
    changes: {
      locationId: { from: 'loc-1', to: 'loc-2' },
    },
    reason: '부서 이동',
  },
  createdAt: new Date('2026-06-11T10:00:00Z'),
  performedBy: { id: 'admin-1', name: '관리자' },
  ...overrides,
})

beforeEach(() => {
  jest.clearAllMocks()
  prismaMock.asset.findUnique.mockResolvedValue(baseAsset)
  prismaMock.assetHistory.findMany.mockResolvedValue([makeHistoryRow()])
  prismaMock.assetHistory.count.mockResolvedValue(1)
  prismaMock.location.findMany.mockResolvedValue([
    { id: 'loc-1', name: '본관 1층' },
    { id: 'loc-2', name: '별관 3층' },
  ])
  prismaMock.user.findMany.mockResolvedValue([])
})

describe('asset.service.getHistory', () => {
  describe('권한', () => {
    it('존재하지 않는 자산 → AppError 404', async () => {
      prismaMock.asset.findUnique.mockResolvedValue(null)
      await expect(assetService.getHistory('no-asset', 1, adminCtx)).rejects.toThrow(AppError)
      const err = await assetService.getHistory('no-asset', 1, adminCtx).catch((e) => e)
      expect(err.statusCode).toBe(404)
    })

    it('USER가 타인 자산(IN_USE) 조회 → AppError 403', async () => {
      const otherUserCtx = { id: 'other-user', role: 'USER' as const }
      await expect(assetService.getHistory('asset-1', 1, otherUserCtx)).rejects.toThrow(AppError)
      const err = await assetService.getHistory('asset-1', 1, otherUserCtx).catch((e) => e)
      expect(err.statusCode).toBe(403)
    })

    it('USER가 본인 자산 조회 → 허용', async () => {
      await expect(assetService.getHistory('asset-1', 1, userCtx)).resolves.toBeDefined()
    })

    it('USER가 AVAILABLE 자산 조회 → 허용', async () => {
      prismaMock.asset.findUnique.mockResolvedValue({ ...baseAsset, status: 'IDLE', assignedUserId: null })
      const otherUserCtx = { id: 'other-user', role: 'USER' as const }
      await expect(assetService.getHistory('asset-1', 1, otherUserCtx)).resolves.toBeDefined()
    })
  })

  describe('페이지네이션', () => {
    it('page=1, 전체 1건 → totalPages=1, total=1', async () => {
      const result = await assetService.getHistory('asset-1', 1, adminCtx)
      expect(result.total).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.page).toBe(1)
      expect(result.pageSize).toBe(20)
    })

    it('전체 21건 → totalPages=2', async () => {
      prismaMock.assetHistory.count.mockResolvedValue(21)
      const result = await assetService.getHistory('asset-1', 1, adminCtx)
      expect(result.totalPages).toBe(2)
    })

    it('page=2 조회 시 skip=20으로 호출', async () => {
      prismaMock.assetHistory.count.mockResolvedValue(25)
      await assetService.getHistory('asset-1', 2, adminCtx)
      const callArgs = prismaMock.assetHistory.findMany.mock.calls[0][0]
      expect(callArgs.skip).toBe(20)
      expect(callArgs.take).toBe(20)
    })
  })

  describe('이름 resolve', () => {
    it('locationId from/to → fromName/toName 채워짐', async () => {
      const result = await assetService.getHistory('asset-1', 1, adminCtx)
      const item = result.items[0]
      const locChange = (item.metadata as { changes: Record<string, { fromName: string | null; toName: string | null }> })
        .changes.locationId
      expect(locChange.fromName).toBe('본관 1층')
      expect(locChange.toName).toBe('별관 3층')
    })

    it('assignedUserId from/to → fromName/toName 채워짐', async () => {
      prismaMock.assetHistory.findMany.mockResolvedValue([
        makeHistoryRow({
          action: 'ASSIGNED',
          metadata: {
            changes: { assignedUserId: { from: null, to: 'user-2' } },
            reason: '신규 배정',
          },
        }),
      ])
      prismaMock.user.findMany.mockResolvedValue([{ id: 'user-2', name: '홍길동' }])
      prismaMock.location.findMany.mockResolvedValue([])

      const result = await assetService.getHistory('asset-1', 1, adminCtx)
      const item = result.items[0]
      const userChange = (item.metadata as { changes: Record<string, { fromName: string | null; toName: string | null }> })
        .changes.assignedUserId
      expect(userChange.fromName).toBeNull()
      expect(userChange.toName).toBe('홍길동')
    })

    it('metadata가 없는 이력(구형 UPDATED) → metadata 그대로 반환', async () => {
      prismaMock.assetHistory.findMany.mockResolvedValue([
        makeHistoryRow({ action: 'UPDATED', metadata: null }),
      ])
      const result = await assetService.getHistory('asset-1', 1, adminCtx)
      expect(result.items[0].metadata).toBeNull()
    })
  })
})
