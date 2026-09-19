import { prisma } from '../../lib/prisma'
import { Prisma } from '../../generated/prisma/client'
import { AppError } from '../../lib/AppError'
import { logger } from '../../lib/logger'
import { paginate } from '../../lib/pagination'
import type {
  CatalogListItem,
  CreateCatalogInput,
  UpdateCatalogInput,
  ListCatalogQuery,
} from './catalog.types'
import type { RequesterContext } from '../../lib/requestHelpers'

const requireAdmin = (requester: RequesterContext) => {
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, '관리자(ADMIN) 권한이 필요합니다.')
  }
}

const list = async (
  query: ListCatalogQuery,
  _requester: RequesterContext,
): Promise<{ items: CatalogListItem[]; total: number; page: number; pageSize: number; totalPages: number }> => {
  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const skip = (page - 1) * pageSize

  const where: Record<string, unknown> = {}
  if (query.class) where['class'] = query.class
  if (query.categoryId) where['categoryId'] = query.categoryId
  if (typeof query.isActive === 'boolean') where['isActive'] = query.isActive
  if (query.q) {
    where['OR'] = [
      { name: { contains: query.q, mode: 'insensitive' } },
      { manufacturer: { contains: query.q, mode: 'insensitive' } },
      { modelCode: { contains: query.q, mode: 'insensitive' } },
    ]
  }

  const [rows, total] = await Promise.all([
    prisma.assetCatalog.findMany({
      where,
      include: {
        category: { select: { name: true, code: true } },
        manufacturerMaster: { select: { name: true } },
      },
      orderBy: [{ class: 'asc' }, { name: 'asc' }],
      skip,
      take: pageSize,
    }),
    prisma.assetCatalog.count({ where }),
  ])

  return paginate(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      manufacturerId: r.manufacturerId,
      manufacturerName: r.manufacturerMaster?.name ?? null,
      modelCode: r.modelCode,
      class: r.class,
      categoryId: r.categoryId,
      categoryName: r.category?.name ?? null,
      categoryCode: r.category?.code ?? null,
      specs: (r.specs as Record<string, unknown>) ?? {},
      imageUrl: r.imageUrl,
      isActive: r.isActive,
      createdAt: r.createdAt,
    })),
    total,
    page,
    pageSize,
  )
}

const getById = async (id: string, _requester: RequesterContext): Promise<CatalogListItem> => {
  const row = await prisma.assetCatalog.findUnique({
    where: { id },
    include: {
      category: { select: { name: true, code: true } },
      manufacturerMaster: { select: { name: true } },
    },
  })
  if (!row) throw new AppError(404, '카탈로그를 찾을 수 없습니다.')
  return {
    id: row.id,
    name: row.name,
    manufacturerId: row.manufacturerId,
    manufacturerName: row.manufacturerMaster?.name ?? null,
    modelCode: row.modelCode,
    class: row.class,
    categoryId: row.categoryId,
    categoryName: row.category?.name ?? null,
    categoryCode: row.category?.code ?? null,
    specs: (row.specs as Record<string, unknown>) ?? {},
    imageUrl: row.imageUrl,
    isActive: row.isActive,
    createdAt: row.createdAt,
  }
}

const validateManufacturer = async (manufacturerId: string): Promise<void> => {
  const master = await prisma.manufacturer.findUnique({ where: { id: manufacturerId } })
  if (!master) throw new AppError(404, '제조사 마스터를 찾을 수 없습니다.')
}

// uniq_catalog_name_mfr_model unique 위반(P2002) 을 한국어 400 으로 변환.
// 그 외 Prisma 에러는 그대로 throw.
const rethrowAsDuplicate = (err: unknown): never => {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    throw new AppError(
      400,
      '이미 같은 모델이 등록되어 있습니다. (이름·제조사·모델코드 조합이 동일)',
    )
  }
  throw err
}

const create = async (
  input: CreateCatalogInput,
  requester: RequesterContext,
): Promise<CatalogListItem> => {
  requireAdmin(requester)
  if (!input.categoryId) throw new AppError(400, '카탈로그 등록 시 카테고리는 필수입니다.')
  const cat = await prisma.assetCategory.findUnique({ where: { id: input.categoryId } })
  if (!cat) throw new AppError(404, '카테고리를 찾을 수 없습니다.')
  if (cat.class !== input.class) {
    throw new AppError(
      400,
      `카탈로그 분류(${input.class})와 카테고리 분류(${cat.class})가 일치하지 않습니다.`,
    )
  }

  const manufacturerId = input.manufacturerId ?? null
  if (manufacturerId) await validateManufacturer(manufacturerId)

  const created = await prisma.assetCatalog
    .create({
      data: {
        name: input.name,
        manufacturerId,
        modelCode: input.modelCode ?? null,
        class: input.class,
        categoryId: input.categoryId ?? null,
        specs: (input.specs ?? {}) as object,
        imageUrl: input.imageUrl ?? null,
      },
    })
    .catch(rethrowAsDuplicate)
  logger.info({ event: 'catalog_created', id: created.id, name: created.name }, '카탈로그 등록')
  return getById(created.id, requester)
}

const update = async (
  id: string,
  input: UpdateCatalogInput,
  requester: RequesterContext,
): Promise<CatalogListItem> => {
  requireAdmin(requester)
  const existing = await prisma.assetCatalog.findUnique({ where: { id } })
  if (!existing) throw new AppError(404, '카탈로그를 찾을 수 없습니다.')

  // categoryId 는 create 에서 필수라 update 에서도 null 로 해제 불가 — 그러지 않으면
  // 자산등록 모델 드롭다운(`c.categoryId === selectedCategoryId`) 에서 사라지는 ghost 카탈로그가 생김.
  if (input.categoryId === null) {
    throw new AppError(400, '카탈로그의 카테고리는 해제할 수 없습니다.')
  }

  // class 와 categoryId 중 하나라도 바뀌면 effective 값으로 카테고리.class === catalog.class 검증.
  // 한쪽만 patch 해도 기존 값과 결합한 결과가 어긋나면 거부.
  const classChanging = input.class !== undefined
  const categoryChanging = input.categoryId !== undefined
  if (classChanging || categoryChanging) {
    const effectiveClass = classChanging ? input.class! : existing.class
    const effectiveCategoryId = categoryChanging ? input.categoryId : existing.categoryId
    if (effectiveCategoryId) {
      const cat = await prisma.assetCategory.findUnique({ where: { id: effectiveCategoryId } })
      if (!cat) throw new AppError(404, '카테고리를 찾을 수 없습니다.')
      if (cat.class !== effectiveClass) {
        throw new AppError(
          400,
          `카탈로그 분류(${effectiveClass})와 카테고리 분류(${cat.class})가 일치하지 않습니다.`,
        )
      }
    }
  }

  const data: Record<string, unknown> = {}
  if (input.name !== undefined) data['name'] = input.name
  if (input.modelCode !== undefined) data['modelCode'] = input.modelCode
  if (input.class !== undefined) data['class'] = input.class
  if (input.categoryId !== undefined) data['categoryId'] = input.categoryId
  if (input.specs !== undefined) data['specs'] = input.specs
  if (input.imageUrl !== undefined) data['imageUrl'] = input.imageUrl
  if (input.isActive !== undefined) data['isActive'] = input.isActive

  if (input.manufacturerId === null) {
    data['manufacturerId'] = null
  } else if (input.manufacturerId) {
    await validateManufacturer(input.manufacturerId)
    data['manufacturerId'] = input.manufacturerId
  }

  await prisma.assetCatalog.update({ where: { id }, data }).catch(rethrowAsDuplicate)
  return getById(id, requester)
}

const remove = async (id: string, requester: RequesterContext): Promise<void> => {
  requireAdmin(requester)
  const used = await prisma.asset.count({ where: { catalogId: id } })
  if (used > 0) {
    throw new AppError(400, `이 카탈로그를 사용하는 자산이 ${used}건 있어 삭제할 수 없습니다. (isActive=false 로 비활성화하세요)`)
  }
  await prisma.assetCatalog.delete({ where: { id } })
  logger.info({ event: 'catalog_deleted', id }, '카탈로그 삭제')
}

export const catalogService = { list, getById, create, update, remove }
