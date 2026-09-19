import { AppError } from '../../../lib/AppError'
import { departmentService } from '../department.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    department: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    team: { count: jest.fn() },
    asset: { count: jest.fn() },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockDept = prisma.department as unknown as {
  findMany: jest.Mock
  findUnique: jest.Mock
  create: jest.Mock
  update: jest.Mock
}
const mockAssetCount = prisma.asset.count as jest.Mock
const mockTeamCount = prisma.team.count as jest.Mock

const sample = {
  id: 'dept-1',
  name: '개발팀',
  code: 'DEV',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}

beforeEach(() => jest.clearAllMocks())

// ── list ─────────────────────────────────────────────────────────────────────
describe('departmentService.list', () => {
  it('soft delete된 항목을 기본 제외한다', async () => {
    mockDept.findMany.mockResolvedValue([sample])
    await departmentService.list()
    expect(mockDept.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { deletedAt: null } }),
    )
  })

  it('includeDeleted=true이면 모두 반환한다', async () => {
    mockDept.findMany.mockResolvedValue([sample])
    await departmentService.list({ includeDeleted: true })
    expect(mockDept.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: {} }))
  })

  it('list 응답에 활성 팀 수(_count.teams)가 포함된다', async () => {
    mockDept.findMany.mockResolvedValue([sample])
    await departmentService.list()
    expect(mockDept.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: { _count: { select: { teams: true } } },
      }),
    )
  })
})

// ── create ──────────────────────────────────────────────────────────────────
describe('departmentService.create', () => {
  it('신규 부서를 생성한다 (기본 팀 자동 생성 없음)', async () => {
    mockDept.findUnique.mockResolvedValue(null)
    mockDept.create.mockResolvedValue(sample)
    const result = await departmentService.create({ name: '개발팀', code: 'DEV' })
    expect(result.code).toBe('DEV')
    expect(mockDept.create).toHaveBeenCalledWith({
      data: { name: '개발팀', code: 'DEV' },
    })
  })

  it('code가 중복이면 AppError(409)', async () => {
    mockDept.findUnique.mockResolvedValue(sample)
    await expect(departmentService.create({ name: '신규', code: 'DEV' })).rejects.toThrow(
      new AppError(409, '이미 사용 중인 부서 코드입니다.'),
    )
  })
})

// ── softDelete ──────────────────────────────────────────────────────────────
describe('departmentService.softDelete', () => {
  it('자산·활성 팀이 모두 없으면 deletedAt을 채운다', async () => {
    mockDept.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(0)
    mockTeamCount.mockResolvedValue(0)
    mockDept.update.mockResolvedValue({ ...sample, deletedAt: new Date() })

    await departmentService.softDelete('dept-1')
    expect(mockDept.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'dept-1' },
        data: { deletedAt: expect.any(Date) },
      }),
    )
  })

  it('연결된 자산이 있으면 AppError(409)', async () => {
    mockDept.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(5)
    mockTeamCount.mockResolvedValue(0)

    await expect(departmentService.softDelete('dept-1')).rejects.toThrow(
      new AppError(409, '이 부서에 연결된 자산 5건이 있어 삭제할 수 없습니다.'),
    )
  })

  it('활성 팀이 있으면 AppError(409)', async () => {
    mockDept.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(0)
    mockTeamCount.mockResolvedValue(2)

    await expect(departmentService.softDelete('dept-1')).rejects.toThrow(
      new AppError(
        409,
        '이 부서에 소속된 팀 2개가 있어 삭제할 수 없습니다. 팀을 먼저 정리해 주세요.',
      ),
    )
  })

  it('이미 삭제된 부서면 AppError(400)', async () => {
    mockDept.findUnique.mockResolvedValue({ ...sample, deletedAt: new Date() })
    await expect(departmentService.softDelete('dept-1')).rejects.toThrow(
      new AppError(400, '이미 삭제된 부서입니다.'),
    )
  })

  it('존재하지 않으면 AppError(404)', async () => {
    mockDept.findUnique.mockResolvedValue(null)
    await expect(departmentService.softDelete('none')).rejects.toThrow(
      new AppError(404, '부서를 찾을 수 없습니다.'),
    )
  })
})

// ── restore ─────────────────────────────────────────────────────────────────
describe('departmentService.restore', () => {
  it('deletedAt을 null로 되돌린다', async () => {
    mockDept.findUnique.mockResolvedValue({ ...sample, deletedAt: new Date() })
    mockDept.update.mockResolvedValue(sample)

    await departmentService.restore('dept-1')
    expect(mockDept.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'dept-1' }, data: { deletedAt: null } }),
    )
  })

  it('이미 활성 상태면 AppError(400)', async () => {
    mockDept.findUnique.mockResolvedValue(sample)
    await expect(departmentService.restore('dept-1')).rejects.toThrow(
      new AppError(400, '이미 활성 상태인 부서입니다.'),
    )
  })
})
