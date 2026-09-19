import { AppError } from '../../../lib/AppError'
import { assetCategoryService } from '../assetCategory.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    assetCategory: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    asset: { count: jest.fn() },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockCat = prisma.assetCategory as unknown as {
  findMany: jest.Mock
  findUnique: jest.Mock
  create: jest.Mock
  update: jest.Mock
  count: jest.Mock
}
const mockAssetCount = prisma.asset.count as jest.Mock

const sample = {
  id: 'cat-1',
  name: 'Server',
  code: 'SERVER',
  class: 'IT_ASSET',
  parentId: null,
  deletedAt: null,
}

beforeEach(() => jest.clearAllMocks())

describe('assetCategoryService.create', () => {
  it('parentId의 class와 자식 class가 다르면 AppError(400)', async () => {
    mockCat.findUnique
      .mockResolvedValueOnce(null) // code 중복 검사
      .mockResolvedValueOnce({ ...sample, class: 'OFFICE_ASSET' }) // parent 검사
    await expect(
      assetCategoryService.create({
        name: '서버',
        code: 'SRV',
        class: 'IT_ASSET',
        parentId: 'cat-1',
      }),
    ).rejects.toThrow(
      new AppError(400, '부모 카테고리의 분류(OFFICE_ASSET)와 다릅니다.'),
    )
  })

  it('parent가 없으면 생성 가능', async () => {
    mockCat.findUnique.mockResolvedValueOnce(null)
    mockCat.create.mockResolvedValue(sample)
    const result = await assetCategoryService.create({ name: 'Server', code: 'SERVER', class: 'IT_ASSET' })
    expect(result.id).toBe('cat-1')
  })
})

describe('assetCategoryService.softDelete', () => {
  it('자식 카테고리가 있으면 AppError(409)', async () => {
    mockCat.findUnique.mockResolvedValue(sample)
    mockCat.count.mockResolvedValue(2)
    mockAssetCount.mockResolvedValue(0)
    await expect(assetCategoryService.softDelete('cat-1')).rejects.toThrow(
      new AppError(409, '이 카테고리에 자식 카테고리 2개가 있어 삭제할 수 없습니다. 먼저 자식을 삭제하세요.'),
    )
  })

  it('연결된 자산이 있으면 AppError(409)', async () => {
    mockCat.findUnique.mockResolvedValue(sample)
    mockCat.count.mockResolvedValue(0)
    mockAssetCount.mockResolvedValue(5)
    await expect(assetCategoryService.softDelete('cat-1')).rejects.toThrow(
      new AppError(409, '이 카테고리에 연결된 자산 5건이 있어 삭제할 수 없습니다.'),
    )
  })

  it('자식/자산 모두 없으면 soft delete', async () => {
    mockCat.findUnique.mockResolvedValue(sample)
    mockCat.count.mockResolvedValue(0)
    mockAssetCount.mockResolvedValue(0)
    mockCat.update.mockResolvedValue({ ...sample, deletedAt: new Date() })
    await assetCategoryService.softDelete('cat-1')
    expect(mockCat.update).toHaveBeenCalled()
  })
})
