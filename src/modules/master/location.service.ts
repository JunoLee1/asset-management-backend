import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import type { CreateLocationInput, UpdateLocationInput } from '../../schemas/master.schema'
import { buildSoftDeleteWhere, type ListOptions } from './master.helpers'

const list = async (options?: ListOptions) =>
  prisma.location.findMany({
    where: buildSoftDeleteWhere(options),
    orderBy: [{ building: 'asc' }, { name: 'asc' }],
  })

const getById = async (id: string) => {
  const row = await prisma.location.findUnique({ where: { id } })
  if (!row) throw new AppError(404, '위치를 찾을 수 없습니다.')
  return row
}

const create = async (dto: CreateLocationInput) => prisma.location.create({ data: dto })

const update = async (id: string, dto: UpdateLocationInput) => {
  const current = await prisma.location.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '위치를 찾을 수 없습니다.')
  return prisma.location.update({ where: { id }, data: dto })
}

const softDelete = async (id: string) => {
  const current = await prisma.location.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '위치를 찾을 수 없습니다.')
  if (current.deletedAt) throw new AppError(400, '이미 삭제된 위치입니다.')

  const assetCount = await prisma.asset.count({ where: { locationId: id } })
  if (assetCount > 0) {
    throw new AppError(409, `이 위치에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`)
  }

  return prisma.location.update({ where: { id }, data: { deletedAt: new Date() } })
}

const restore = async (id: string) => {
  const current = await prisma.location.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '위치를 찾을 수 없습니다.')
  if (!current.deletedAt) throw new AppError(400, '이미 활성 상태인 위치입니다.')
  return prisma.location.update({ where: { id }, data: { deletedAt: null } })
}

export const locationService = { list, getById, create, update, softDelete, restore }
