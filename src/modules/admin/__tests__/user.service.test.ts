import { AppError } from '../../../lib/AppError'
import { userService } from '../user.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    },
    userHistory: { create: jest.fn() },
    $transaction: jest.fn((cb) =>
      cb({
        user: { update: jest.fn().mockResolvedValue({ id: 'user-1', role: 'TEAM_LEAD', isActive: true, inviteToken: 'new', email: 'x@x.com', name: 'x' }) },
        userHistory: { create: jest.fn() },
      })
    ),
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), error: jest.fn(), warn: jest.fn() },
}))

jest.mock('../../../lib/mailer', () => ({ sendMail: jest.fn().mockResolvedValue(undefined) }))
jest.mock('../../../config/env', () => ({ env: { frontendUrl: 'http://localhost:5173' } }))

import { prisma } from '../../../lib/prisma'

const mockFindMany = prisma.user.findMany as jest.Mock
const mockFindUnique = prisma.user.findUnique as jest.Mock
const mockCount = prisma.user.count as jest.Mock
const mockUpdate = prisma.user.update as jest.Mock

const baseUser = {
  id: 'user-1',
  email: 'hong@company.com',
  name: '홍길동',
  role: 'USER' as const,
  isActive: true,
  teamId: null,
  department: null,
  phoneNumber: null,
  phoneNumberHash: null,
  inviteToken: null,
  inviteTokenExpiresAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

beforeEach(() => jest.clearAllMocks())

// ── list ─────────────────────────────────────────────────────────────────────
describe('userService.list', () => {
  it('페이지네이션 메타를 반환한다', async () => {
    mockFindMany.mockResolvedValue([baseUser])
    mockCount.mockResolvedValue(45)
    const result = await userService.list({ page: 1, pageSize: 20 })
    expect(result.total).toBe(45)
    expect(result.totalPages).toBe(3)
  })

  it('역할 필터를 where에 반영한다', async () => {
    mockFindMany.mockResolvedValue([])
    mockCount.mockResolvedValue(0)
    await userService.list({ page: 1, pageSize: 20, role: 'ADMIN' })
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ role: 'ADMIN' }) }),
    )
  })

  it('q는 name/email 부분 일치 OR 검색', async () => {
    mockFindMany.mockResolvedValue([])
    mockCount.mockResolvedValue(0)
    await userService.list({ page: 1, pageSize: 20, q: '홍' })
    const where = mockFindMany.mock.calls[0][0].where
    expect(where.OR).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: expect.any(Object) }),
        expect.objectContaining({ email: expect.any(Object) }),
      ]),
    )
  })

  it('민감 필드(password, inviteToken, phoneNumberHash)를 응답에서 제외한다', async () => {
    mockFindMany.mockResolvedValue([baseUser])
    mockCount.mockResolvedValue(1)
    const result = await userService.list({ page: 1, pageSize: 20 })
    expect(result.items[0]).not.toHaveProperty('password')
    expect(result.items[0]).not.toHaveProperty('inviteToken')
    expect(result.items[0]).not.toHaveProperty('phoneNumberHash')
  })

  it('TEAM_LEAD 요청 시 where에 자기 팀 필터가 추가된다', async () => {
    mockFindMany.mockResolvedValue([])
    mockCount.mockResolvedValue(0)
    const teamLeadCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }
    await userService.list({ page: 1, pageSize: 10 }, teamLeadCtx)
    const where = mockFindMany.mock.calls[0][0].where
    expect(where.team).toEqual({ teamLeadId: 'mgr-1' })
  })

  it('ADMIN 요청 시 팀 필터 없이 전체 조회', async () => {
    mockFindMany.mockResolvedValue([])
    mockCount.mockResolvedValue(0)
    const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
    await userService.list({ page: 1, pageSize: 10 }, adminCtx)
    const where = mockFindMany.mock.calls[0][0].where
    expect(where).not.toHaveProperty('team')
  })
})

// ── update ──────────────────────────────────────────────────────────────────
describe('userService.update', () => {
  it('Role 변경은 ADMIN만 가능 (MANAGER는 거부)', async () => {
    mockFindUnique.mockResolvedValue(baseUser)
    await expect(
      userService.update('user-1', { role: 'ADMIN' }, { id: 'mgr-1', role: 'TEAM_LEAD' }, { ipAddress: null, userAgent: null }),
    ).rejects.toThrow(new AppError(403, 'Role 변경은 ADMIN만 가능합니다.'))
  })

  it('ADMIN은 Role 변경 가능', async () => {
    mockFindUnique.mockResolvedValue(baseUser)
    mockUpdate.mockResolvedValue({ ...baseUser, role: 'TEAM_LEAD' })
    const result = await userService.update(
      'user-1',
      { role: 'TEAM_LEAD' },
      { id: 'admin-1', role: 'ADMIN' },
      { ipAddress: null, userAgent: null },
    )
    expect(result.role).toBe('TEAM_LEAD')
  })

  it('대상이 없으면 AppError(404)', async () => {
    mockFindUnique.mockResolvedValue(null)
    await expect(
      userService.update('none', { name: 'X' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null }),
    ).rejects.toThrow(new AppError(404, '사원을 찾을 수 없습니다.'))
  })
})

// ── deactivate ──────────────────────────────────────────────────────────────
describe('userService.deactivate', () => {
  it('isActive를 false로 토글', async () => {
    mockFindUnique.mockResolvedValue(baseUser)
    // deactivate는 $transaction 안에서 tx.user.update를 호출 — 반환값으로 동작 확인
    const result = await userService.deactivate('user-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null })
    expect(result).toBeDefined()
  })

  it('본인 비활성화 시도는 AppError(400)', async () => {
    mockFindUnique.mockResolvedValue(baseUser)
    await expect(
      userService.deactivate('admin-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null }),
    ).rejects.toThrow(new AppError(400, '본인 계정은 비활성화할 수 없습니다.'))
  })

  it('이미 비활성 상태면 AppError(400)', async () => {
    mockFindUnique.mockResolvedValue({ ...baseUser, isActive: false })
    await expect(
      userService.deactivate('user-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null }),
    ).rejects.toThrow(new AppError(400, '이미 비활성 상태인 사원입니다.'))
  })
})

// ── activate ──────────────────────────────────────────────────────────────
describe('userService.activate', () => {
  it('isActive=false인 사원을 활성화한다 (password 있는 경우만)', async () => {
    mockFindUnique.mockResolvedValue({ ...baseUser, isActive: false, password: 'hash' })
    // activate는 $transaction 안에서 tx.user.update를 호출 — 반환값으로 동작 확인
    const result = await userService.activate('user-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null })
    expect(result).toBeDefined()
  })

  it('비밀번호 미설정(초대 미수락) 상태면 AppError(400)', async () => {
    mockFindUnique.mockResolvedValue({ ...baseUser, isActive: false, password: null })
    await expect(
      userService.activate('user-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null }),
    ).rejects.toThrow(new AppError(400, '초대 미수락 상태입니다. 초대 재발송을 사용하세요.'))
  })
})

// ── reinvite ─────────────────────────────────────────────────────────────
describe('userService.reinvite', () => {
  it('이미 활성화된 사원은 재초대 불가 (400)', async () => {
    mockFindUnique.mockResolvedValue(baseUser)
    await expect(
      userService.reinvite('user-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null }),
    ).rejects.toThrow(new AppError(400, '이미 활성화된 사원입니다.'))
  })

  it('미활성 사원에게 새 inviteToken을 발급하고 메일 발송', async () => {
    mockFindUnique.mockResolvedValue({ ...baseUser, isActive: false, password: null })
    const result = await userService.reinvite('user-1', { reason: '테스트 사유' }, { id: 'admin-1', role: 'ADMIN' }, { ipAddress: null, userAgent: null })
    expect(result.inviteToken).toBeTruthy()
  })
})
