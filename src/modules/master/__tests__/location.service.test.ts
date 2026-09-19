import { AppError } from '../../../lib/AppError'
import { locationService } from '../location.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    location: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    asset: { count: jest.fn() },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockLoc = prisma.location as unknown as {
  findMany: jest.Mock
  findUnique: jest.Mock
  create: jest.Mock
  update: jest.Mock
}
const mockAssetCount = prisma.asset.count as jest.Mock

const sample = {
  id: 'loc-1',
  name: '본사 5층',
  building: '본사',
  floor: '5F',
  room: null,
  deletedAt: null,
}

beforeEach(() => jest.clearAllMocks())

describe('locationService.create', () => {
  it('신규 위치를 생성한다', async () => {
    mockLoc.create.mockResolvedValue(sample)
    const result = await locationService.create({ name: '본사 5층', building: '본사' })
    expect(result.id).toBe('loc-1')
  })
})

describe('locationService.softDelete', () => {
  it('연결된 자산이 있으면 AppError(409)', async () => {
    mockLoc.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(2)
    await expect(locationService.softDelete('loc-1')).rejects.toThrow(
      new AppError(409, '이 위치에 연결된 자산 2건이 있어 삭제할 수 없습니다.'),
    )
  })

  it('연결 없으면 soft delete', async () => {
    mockLoc.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(0)
    mockLoc.update.mockResolvedValue({ ...sample, deletedAt: new Date() })
    await locationService.softDelete('loc-1')
    expect(mockLoc.update).toHaveBeenCalled()
  })
})
