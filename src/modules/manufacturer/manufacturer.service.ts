import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import { logger } from '../../lib/logger'
import { paginate } from '../../lib/pagination'
import type {
  ManufacturerListItem,
  ManufacturerDetail,
  CreateManufacturerInput,
  UpdateManufacturerInput,
  ListManufacturerQuery,
} from './manufacturer.types'
import type { RequesterContext } from '../../lib/requestHelpers'

const requireAdmin = (requester: RequesterContext) => {
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, '관리자(ADMIN) 권한이 필요합니다.')
  }
}

const list = async (
  query: ListManufacturerQuery,
  _requester: RequesterContext,
): Promise<{
  items: ManufacturerListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}> => {
  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const skip = (page - 1) * pageSize

  const where: Record<string, unknown> = {}
  if (typeof query.isActive === 'boolean') where['isActive'] = query.isActive
  if (query.q) {
    where['OR'] = [ // 조건부 검색
      { name: { contains: query.q, mode: 'insensitive' } },
      { aliases: { has: query.q } },
    ]
  }

  const [rows, total] = await Promise.all([
    prisma.manufacturer.findMany({
      where,
      include: { _count: { select: { catalogs: true } } },
      orderBy: { name: 'asc' },
      skip,
      take: pageSize,
    }),
    prisma.manufacturer.count({ where }),
  ])

  return paginate(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      aliases: r.aliases,
      isActive: r.isActive,
      catalogCount: r._count.catalogs,
      createdAt: r.createdAt,
    })),
    total,
    page,
    pageSize,
  )
}

const getById = async (
  id: string,
  _requester: RequesterContext,
): Promise<ManufacturerDetail> => {
  const row = await prisma.manufacturer.findUnique({
    where: { id },
    include: { _count: { select: { catalogs: true } } },
  })
  if (!row) throw new AppError(404, '제조사를 찾을 수 없습니다.')
  return {
    id: row.id,
    name: row.name,
    aliases: row.aliases,
    isActive: row.isActive,
    catalogCount: row._count.catalogs,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

const create = async (
  input: CreateManufacturerInput,
  requester: RequesterContext,
): Promise<ManufacturerDetail> => {
  requireAdmin(requester)
  const existing = await prisma.manufacturer.findUnique({ where: { name: input.name } })
  if (existing) throw new AppError(409, '이미 등록된 제조사 이름입니다.')

  const created = await prisma.manufacturer.create({
    data: {
      name: input.name,
      aliases: input.aliases ?? [],
    },
  })
  logger.info(
    { event: 'manufacturer_created', id: created.id, name: created.name },
    '제조사 등록',
  )
  return getById(created.id, requester)
}

const update = async (
  id: string,
  input: UpdateManufacturerInput,
  requester: RequesterContext,
): Promise<ManufacturerDetail> => {
  requireAdmin(requester)
  const existing = await prisma.manufacturer.findUnique({ where: { id } })
  if (!existing) throw new AppError(404, '제조사를 찾을 수 없습니다.')

  if (input.name !== undefined && input.name !== existing.name) {
    const conflict = await prisma.manufacturer.findUnique({ where: { name: input.name } })
    if (conflict) throw new AppError(409, '이미 등록된 제조사 이름입니다.')
  }

  const data: Record<string, unknown> = {}
  if (input.name !== undefined) data['name'] = input.name
  if (input.aliases !== undefined) data['aliases'] = input.aliases
  if (input.isActive !== undefined) data['isActive'] = input.isActive

  await prisma.manufacturer.update({ where: { id }, data })
  return getById(id, requester)
}

const remove = async (id: string, requester: RequesterContext): Promise<void> => {
  requireAdmin(requester)
  const used = await prisma.assetCatalog.count({ where: { manufacturerId: id } })
  if (used > 0) {
    throw new AppError(
      400,
      `이 제조사를 사용하는 카탈로그가 ${used}건 있어 삭제할 수 없습니다. (isActive=false 로 비활성화하세요)`,
    )
  }
  await prisma.manufacturer.delete({ where: { id } })
  logger.info({ event: 'manufacturer_deleted', id }, '제조사 삭제')
}

export const manufacturerService = { list, getById, create, update, remove }
