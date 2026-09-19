import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import type { ListOptions } from './master.helpers'
import { buildSoftDeleteWhere } from './master.helpers'
import type { RequesterContext } from '../../lib/requestHelpers'

const list = async (options?: ListOptions & { requester?: RequesterContext }) => {
  const where: Record<string, unknown> = buildSoftDeleteWhere(options)
  if (options?.requester?.role === 'DEPT_LEAD' || options?.requester?.role === 'REPAIR_OWNER') {
    where['department'] = { leaderId: options.requester.id }
  }
  return prisma.team.findMany({
    where,
    orderBy: { name: 'asc' },
    include: { department: { select: { name: true } } },
  })
}

const getById = async (id: string) => {
  const row = await prisma.team.findUnique({
    where: { id },
    include: { department: { select: { name: true } } },
  })
  if (!row) throw new AppError(404, '팀을 찾을 수 없습니다.')
  return row
}

// 팀은 부서와 별개로 생성/수정 가능하도록 (하지만 현재는 부서 생성 시 기본 팀 생성됨)
const create = async (dto: { name: string; code: string; departmentId: string; locationId?: string | null }) => {
  const existing = await prisma.team.findUnique({ where: { code: dto.code } })
  if (existing) throw new AppError(409, '이미 사용 중인 팀 코드입니다.')

  return prisma.team.create({
    data: {
      name: dto.name,
      code: dto.code,
      departmentId: dto.departmentId,
      locationId: dto.locationId ?? null,
    },
  })
}

const update = async (id: string, dto: { name?: string; code?: string; departmentId?: string; teamLeadId?: string | null; locationId?: string | null }) => {
  const current = await prisma.team.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '팀을 찾을 수 없습니다.')

  if (dto.code && dto.code !== current.code) {
    const duplicate = await prisma.team.findUnique({ where: { code: dto.code } })
    if (duplicate) throw new AppError(409, '이미 사용 중인 팀 코드입니다.')
  }

  return prisma.team.update({ where: { id }, data: dto })
}

const softDelete = async (id: string) => {
  const current = await prisma.team.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '팀을 찾을 수 없습니다.')
  if (current.deletedAt) throw new AppError(400, '이미 삭제된 팀입니다.')

  const userCount = await prisma.user.count({ where: { teamId: id, isActive: true } })
  if (userCount > 0) {
    throw new AppError(409, `이 팀에 소속된 사용자 ${userCount}명이 있어 삭제할 수 없습니다.`)
  }

  return prisma.team.update({ where: { id }, data: { deletedAt: new Date() } })
}

const restore = async (id: string) => {
  const current = await prisma.team.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '팀을 찾을 수 없습니다.')
  if (!current.deletedAt) throw new AppError(400, '이미 활성 상태인 팀입니다.')

  return prisma.team.update({ where: { id }, data: { deletedAt: null } })
}

export const teamService = { list, getById, create, update, softDelete, restore }
