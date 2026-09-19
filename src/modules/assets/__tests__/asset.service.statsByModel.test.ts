import { assetService } from '../asset.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    assetCatalog: {
      findMany: jest.fn(),
    },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockFindMany = prisma.assetCatalog.findMany as jest.Mock

const sampleCatalog = {
  id: 'cat-1',
  name: 'iPhone 14 Pro Max',
  modelCode: 'A2894',
  class: 'IT_ASSET',
  manufacturer: null,
  manufacturerMaster: { name: 'Apple' },
  category: { name: '스마트폰' },
  _count: { assets: 1 },
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('assetService.statsByModel — RETIRED 제외', () => {
  it('_count.assets 쿼리에 status != RETIRED where 가 들어간다', async () => {
    mockFindMany.mockResolvedValue([sampleCatalog])
    await assetService.statsByModel()

    const calledArg = mockFindMany.mock.calls[0][0]
    expect(calledArg.select._count.select.assets).toEqual({
      where: { status: { not: 'RETIRED' } },
    })
  })

  it('count 가 0 인 모델은 includeZero=false 면 제외', async () => {
    mockFindMany.mockResolvedValue([
      { ...sampleCatalog, _count: { assets: 0 } },
    ])
    const result = await assetService.statsByModel(false)
    expect(result).toHaveLength(0)
  })

  it('count > 0 모델만 정상 반환', async () => {
    mockFindMany.mockResolvedValue([sampleCatalog])
    const result = await assetService.statsByModel()
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      catalogId: 'cat-1',
      name: 'iPhone 14 Pro Max',
      count: 1,
    })
  })
})
