import { AppError } from '../../../lib/AppError'
import { Prisma } from '../../../generated/prisma/client'
import { catalogService } from '../catalog.service'

// P2002 에러 시뮬레이션용 — 실 Prisma 인스턴스로 instanceof 매칭
const makeP2002 = (target: string[]): Prisma.PrismaClientKnownRequestError =>
  new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
    code: 'P2002',
    clientVersion: '0.0.0',
    meta: { target },
  })

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    assetCatalog: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    assetCategory: {
      findUnique: jest.fn(),
    },
    manufacturer: {
      findUnique: jest.fn(),
    },
    asset: {
      count: jest.fn(),
    },
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

import { prisma } from '../../../lib/prisma'

const mockCatFindUnique = prisma.assetCatalog.findUnique as jest.Mock
const mockCatCreate = prisma.assetCatalog.create as jest.Mock
const mockCatUpdate = prisma.assetCatalog.update as jest.Mock
const mockCatDelete = prisma.assetCatalog.delete as jest.Mock
const mockCategoryFindUnique = prisma.assetCategory.findUnique as jest.Mock
const mockMfrFindUnique = (prisma as any).manufacturer.findUnique as jest.Mock
const mockAssetCount = prisma.asset.count as jest.Mock

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const managerCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }
const userCtx = { id: 'user-1', role: 'USER' as const }

const baseCatalog = {
  id: 'cat-1',
  name: 'MacBook Pro 16',
  manufacturer: 'Apple',       // DB 컬럼 — P1c 에서 DROP
  manufacturerId: 'mfr-1',
  manufacturerMaster: { name: 'Apple' },
  modelCode: 'MK1H3KH/A',
  class: 'IT_ASSET' as const,
  categoryId: 'category-1',
  category: { name: '노트북' },
  specs: { cpu: 'M3 Pro', ramGb: 18, storageGb: 512 },
  imageUrl: null,
  isActive: true,
  createdAt: new Date(),
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('catalogService.create', () => {
  it('ADMIN 만 등록 가능', async () => {
    await expect(
      catalogService.create({ name: 't', class: 'IT_ASSET' }, userCtx),
    ).rejects.toThrow(new AppError(403, '관리자(ADMIN) 권한이 필요합니다.'))
    await expect(
      catalogService.create({ name: 't', class: 'IT_ASSET' }, managerCtx),
    ).rejects.toThrow(/관리자\(ADMIN\)/)
  })

  it('ADMIN 정상 등록', async () => {
    mockCategoryFindUnique.mockResolvedValue({ id: 'category-1', name: '노트북', class: 'IT_ASSET' })
    mockCatCreate.mockResolvedValue({ id: 'cat-1' })
    mockCatFindUnique.mockResolvedValue(baseCatalog)

    const result = await catalogService.create(
      {
        name: 'MacBook Pro 16',
        class: 'IT_ASSET',
        categoryId: 'category-1',
        specs: { cpu: 'M3 Pro', ramGb: 18, storageGb: 512 },
      },
      adminCtx,
    )
    expect(result.name).toBe('MacBook Pro 16')
    expect(mockCatCreate).toHaveBeenCalled()
  })

  it('존재하지 않는 카테고리면 404', async () => {
    mockCategoryFindUnique.mockResolvedValue(null)
    await expect(
      catalogService.create(
        { name: 't', class: 'IT_ASSET', categoryId: 'cat-x' },
        adminCtx,
      ),
    ).rejects.toThrow(new AppError(404, '카테고리를 찾을 수 없습니다.'))
  })

  it('categoryId 없이 등록하면 AppError(400)', async () => {
    await expect(
      catalogService.create({ name: 't', class: 'IT_ASSET' }, adminCtx),
    ).rejects.toThrow(AppError)
    const err = await catalogService.create({ name: 't', class: 'IT_ASSET' }, adminCtx).catch(e => e)
    expect(err.statusCode).toBe(400)
  })

  it('카탈로그.class 와 카테고리.class 가 다르면 400', async () => {
    // 카테고리는 IT_ASSET(스마트폰) 인데 카탈로그 body 에 OFFICE_ASSET 으로 들어오는 케이스
    mockCategoryFindUnique.mockResolvedValue({ id: 'category-1', name: '스마트폰', class: 'IT_ASSET' })
    await expect(
      catalogService.create(
        { name: 'IPhone 14 Pro Max', class: 'OFFICE_ASSET', categoryId: 'category-1' },
        adminCtx,
      ),
    ).rejects.toThrow(/카테고리 분류/)
    expect(mockCatCreate).not.toHaveBeenCalled()
  })
})

describe('catalogService.update — class/category 일관성', () => {
  it('class 만 patch 했는데 기존 카테고리.class 와 어긋나면 400', async () => {
    // 기존: class=IT_ASSET, categoryId=category-1 (IT 카테고리)
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    mockCategoryFindUnique.mockResolvedValue({ id: 'category-1', name: '노트북', class: 'IT_ASSET' })
    await expect(
      catalogService.update('cat-1', { class: 'OFFICE_ASSET' }, adminCtx),
    ).rejects.toThrow(/카테고리 분류/)
    expect(mockCatUpdate).not.toHaveBeenCalled()
  })

  it('categoryId 만 patch 했는데 기존 class 와 어긋나면 400', async () => {
    // 기존: class=IT_ASSET → categoryId 를 OFFICE 카테고리로 바꾸려 함
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    mockCategoryFindUnique.mockResolvedValue({ id: 'cat-office', name: '의자', class: 'OFFICE_ASSET' })
    await expect(
      catalogService.update('cat-1', { categoryId: 'cat-office' }, adminCtx),
    ).rejects.toThrow(/카테고리 분류/)
    expect(mockCatUpdate).not.toHaveBeenCalled()
  })

  it('class 와 categoryId 를 함께 새 값으로 patch + 일치 → 정상', async () => {
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    mockCategoryFindUnique.mockResolvedValue({ id: 'cat-office', name: '의자', class: 'OFFICE_ASSET' })
    mockCatUpdate.mockResolvedValue({})
    mockCatFindUnique.mockResolvedValueOnce({ ...baseCatalog, class: 'OFFICE_ASSET', categoryId: 'cat-office' })
    await catalogService.update(
      'cat-1',
      { class: 'OFFICE_ASSET', categoryId: 'cat-office' },
      adminCtx,
    )
    expect(mockCatUpdate).toHaveBeenCalled()
  })

  it('class/categoryId 미변경 patch 는 카테고리 fetch 도 하지 않는다', async () => {
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    mockCatUpdate.mockResolvedValue({})
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    await catalogService.update('cat-1', { name: '새 이름' }, adminCtx)
    expect(mockCategoryFindUnique).not.toHaveBeenCalled()
    expect(mockCatUpdate).toHaveBeenCalled()
  })

  it('categoryId === null 로 해제하는 patch 는 400 (create 가 categoryId 필수라 update 도 일관성 유지)', async () => {
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    await expect(
      catalogService.update('cat-1', { categoryId: null }, adminCtx),
    ).rejects.toThrow(/해제할 수 없습니다/)
    expect(mockCategoryFindUnique).not.toHaveBeenCalled()
    expect(mockCatUpdate).not.toHaveBeenCalled()
  })
})

describe('catalogService — 중복 등록 차단 (P2002 → 400)', () => {
  it('create 중 P2002 → 한국어 400 으로 변환', async () => {
    mockCategoryFindUnique.mockResolvedValue({ id: 'category-1', name: '스마트폰', class: 'IT_ASSET' })
    mockMfrFindUnique.mockResolvedValue({ id: 'mfg_apple', name: 'Apple' })
    mockCatCreate.mockRejectedValue(makeP2002(['name', 'manufacturerId', 'modelCode']))
    await expect(
      catalogService.create(
        { name: 'iPhone 14 Pro Max', class: 'IT_ASSET', categoryId: 'category-1', manufacturerId: 'mfg_apple', modelCode: 'A2894' },
        adminCtx,
      ),
    ).rejects.toThrow(/이미 같은 모델이 등록/)
  })

  it('create 중 P2002 가 아닌 Prisma 에러는 그대로 throw', async () => {
    mockCategoryFindUnique.mockResolvedValue({ id: 'category-1', name: '스마트폰', class: 'IT_ASSET' })
    const otherErr = new Error('DB connection lost')
    mockCatCreate.mockRejectedValue(otherErr)
    await expect(
      catalogService.create(
        { name: 'x', class: 'IT_ASSET', categoryId: 'category-1' },
        adminCtx,
      ),
    ).rejects.toBe(otherErr)
  })

  it('update 중 P2002 → 한국어 400 으로 변환', async () => {
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)
    mockCatUpdate.mockRejectedValue(makeP2002(['name', 'manufacturerId', 'modelCode']))
    await expect(
      catalogService.update('cat-1', { name: '다른 카탈로그와 같은 이름' }, adminCtx),
    ).rejects.toThrow(/이미 같은 모델이 등록/)
  })
})

describe('catalogService.remove', () => {
  it('USER 거부', async () => {
    await expect(catalogService.remove('cat-1', userCtx)).rejects.toThrow(/관리자/)
  })

  it('자산이 참조 중이면 거부', async () => {
    mockAssetCount.mockResolvedValue(5)
    await expect(catalogService.remove('cat-1', adminCtx)).rejects.toThrow(
      /자산이 5건/,
    )
  })

  it('참조 없으면 삭제', async () => {
    mockAssetCount.mockResolvedValue(0)
    mockCatDelete.mockResolvedValue({})
    await expect(catalogService.remove('cat-1', adminCtx)).resolves.toBeUndefined()
  })
})

describe('catalogService.getById', () => {
  it('없으면 404', async () => {
    mockCatFindUnique.mockResolvedValue(null)
    await expect(catalogService.getById('cat-x', adminCtx)).rejects.toThrow(
      new AppError(404, '카탈로그를 찾을 수 없습니다.'),
    )
  })

  it('있으면 categoryName + categoryCode + specs 반환', async () => {
    mockCatFindUnique.mockResolvedValue({
      ...baseCatalog,
      category: { name: '노트북', code: 'LAPTOP' },
    })
    const result = await catalogService.getById('cat-1', adminCtx)
    expect(result.categoryName).toBe('노트북')
    expect((result as { categoryCode?: string }).categoryCode).toBe('LAPTOP')
    expect(result.specs).toEqual({ cpu: 'M3 Pro', ramGb: 18, storageGb: 512 })
  })
})

// P1b — manufacturer 동기화 제거 검증
describe('P1b: manufacturer legacy 컬럼 동기화 없음', () => {
  it('create() 시 prisma.create 에 manufacturer 필드가 없어야 한다', async () => {
    mockMfrFindUnique.mockResolvedValue({ id: 'mfr-1', name: 'Apple' })
    mockCatCreate.mockResolvedValue({ id: 'cat-1' })
    mockCatFindUnique.mockResolvedValue(baseCatalog)

    mockCategoryFindUnique.mockResolvedValue({ id: 'category-1', name: '노트북', class: 'IT_ASSET' })
    await catalogService.create(
      { name: 'MacBook Pro', class: 'IT_ASSET', manufacturerId: 'mfr-1', categoryId: 'category-1' },
      adminCtx,
    )

    const calledData = mockCatCreate.mock.calls[0][0].data
    expect(calledData).not.toHaveProperty('manufacturer')
  })

  it('update() 시 prisma.update 에 manufacturer 필드가 없어야 한다', async () => {
    mockCatFindUnique.mockResolvedValueOnce(baseCatalog)  // existing check
    mockMfrFindUnique.mockResolvedValue({ id: 'mfr-2', name: 'Samsung' })
    mockCatUpdate.mockResolvedValue({})
    mockCatFindUnique.mockResolvedValueOnce({ ...baseCatalog, manufacturerId: 'mfr-2' })

    await catalogService.update('cat-1', { manufacturerId: 'mfr-2' }, adminCtx)

    const calledData = mockCatUpdate.mock.calls[0][0].data
    expect(calledData).not.toHaveProperty('manufacturer')
  })

  it('getById() 결과에 manufacturer 필드가 없어야 한다', async () => {
    mockCatFindUnique.mockResolvedValue(baseCatalog)
    const result = await catalogService.getById('cat-1', adminCtx)
    expect(result).not.toHaveProperty('manufacturer')
  })

  it('manufacturerName 은 마스터 join 값으로 반환된다', async () => {
    mockCatFindUnique.mockResolvedValue(baseCatalog)
    const result = await catalogService.getById('cat-1', adminCtx)
    expect(result.manufacturerName).toBe('Apple')
  })
})
