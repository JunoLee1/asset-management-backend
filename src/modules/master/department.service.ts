import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import type { CreateDepartmentInput, UpdateDepartmentInput } from '../../schemas/master.schema'
import { buildSoftDeleteWhere, type ListOptions } from './master.helpers'
import type { RequesterContext } from '../../lib/requestHelpers'

const list = async (options?: ListOptions & { requester?: RequesterContext }) => {
  const where: Record<string, unknown> = buildSoftDeleteWhere(options)
  if (options?.requester?.role === 'DEPT_LEAD' || options?.requester?.role === 'REPAIR_OWNER') {
    where['leaderId'] = options.requester.id
  }
  return prisma.department.findMany({
    where,
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { teams: true } },
    },
  })
}

const getById = async (id: string) => {
  const row = await prisma.department.findUnique({
    where: { id },
    include: {
      _count: { select: { teams: true } },
    },
  })
  if (!row) throw new AppError(404, '부서를 찾을 수 없습니다.')
  return row
}

const create = async (dto: CreateDepartmentInput) => {
  const existing = await prisma.department.findUnique({ where: { code: dto.code } })
  if (existing) throw new AppError(409, '이미 사용 중인 부서 코드입니다.')

  return prisma.department.create({
    data: {
      name: dto.name,
      code: dto.code,
      locationId: dto.locationId ?? null,
      officeBuilding: dto.officeBuilding ?? null,
      officeFloor: dto.officeFloor ?? null,
      officeRoom: dto.officeRoom ?? null,
    },
  })
}

const update = async (id: string, dto: UpdateDepartmentInput) => {
  const current = await prisma.department.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '부서를 찾을 수 없습니다.')

  if (dto.code && dto.code !== current.code) {
    const duplicate = await prisma.department.findUnique({ where: { code: dto.code } })
    if (duplicate) throw new AppError(409, '이미 사용 중인 부서 코드입니다.')
  }

  return prisma.department.update({ where: { id }, data: dto })
}

const softDelete = async (id: string) => {
  const current = await prisma.department.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '부서를 찾을 수 없습니다.')
  if (current.deletedAt) throw new AppError(400, '이미 삭제된 부서입니다.')

  const [assetCount, teamCount] = await Promise.all([
    prisma.asset.count({ where: { departmentId: id } }),
    prisma.team.count({ where: { departmentId: id, deletedAt: null } }),
  ])

  if (assetCount > 0) {
    throw new AppError(409, `이 부서에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`)
  }
  if (teamCount > 0) {
    throw new AppError(
      409,
      `이 부서에 소속된 팀 ${teamCount}개가 있어 삭제할 수 없습니다. 팀을 먼저 정리해 주세요.`,
    )
  }

  return prisma.department.update({ where: { id }, data: { deletedAt: new Date() } })
}

const restore = async (id: string) => {
  const current = await prisma.department.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '부서를 찾을 수 없습니다.')
  if (!current.deletedAt) throw new AppError(400, '이미 활성 상태인 부서입니다.')

  return prisma.department.update({ where: { id }, data: { deletedAt: null } })
}

export const departmentService = { list, getById, create, update, softDelete, restore }
