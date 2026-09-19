import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError } from '../../../lib/AppError'
import { authService } from '../auth.service'

// ── Prisma mock ──────────────────────────────────────────────────────────────
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
    oAuthAccount: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}))

// ── env mock ─────────────────────────────────────────────────────────────────
jest.mock('../../../config/env', () => ({
  env: {
    jwt: {
      secret: 'test-access-secret',
      refreshSecret: 'test-refresh-secret',
      expiresIn: '15m',
      refreshExpiresIn: '7d',
    },
  },
}))

// ── logger mock (감사 로그 noise 제거) ───────────────────────────────────────
jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

import { prisma } from '../../../lib/prisma'

const mockUserFindUnique = prisma.user.findUnique as jest.Mock
const mockUserUpdate = prisma.user.update as jest.Mock
const mockOAuthFindUnique = prisma.oAuthAccount.findUnique as jest.Mock
const mockOAuthCreate = prisma.oAuthAccount.create as jest.Mock
const mockOAuthUpdate = prisma.oAuthAccount.update as jest.Mock
const mockRTCreate = prisma.refreshToken.create as jest.Mock
const mockRTFindUnique = prisma.refreshToken.findUnique as jest.Mock
const mockRTUpdate = prisma.refreshToken.update as jest.Mock
const mockRTUpdateMany = prisma.refreshToken.updateMany as jest.Mock

const HASHED_PW = bcrypt.hashSync('password123', 1)

const baseUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: '홍길동',
  password: HASHED_PW,
  role: 'USER' as const,
  isActive: true,
  inviteToken: null,
  inviteTokenExpiresAt: null,
  teamId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const pendingUser = {
  ...baseUser,
  password: null,
  isActive: false,
  inviteToken: 'valid-invite-token',
  inviteTokenExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
}

const hashToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex')

beforeEach(() => {
  jest.clearAllMocks()
  // 기본적으로 RT 발급은 성공
  mockRTCreate.mockResolvedValue({})
  // 단일 세션 정책에 의한 사전 revoke (기본은 기존 세션 0개)
  mockRTUpdateMany.mockResolvedValue({ count: 0 })
})

// ── login ────────────────────────────────────────────────────────────────────
describe('authService.login', () => {
  it('올바른 자격증명으로 로그인 시 user와 tokens를 반환하고 RT를 DB에 저장한다', async () => {
    mockUserFindUnique.mockResolvedValue(baseUser)

    const result = await authService.login(
      { email: 'test@example.com', password: 'password123' },
      { userAgent: 'jest', ipAddress: '127.0.0.1' },
    )

    expect(result.user.id).toBe('user-1')
    expect(result.tokens.accessToken).toBeTruthy()
    expect(mockRTCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: 'user-1',
          userAgent: 'jest',
          ipAddress: '127.0.0.1',
          tokenHash: hashToken(result.tokens.refreshToken),
        }),
      }),
    )
  })

  it('존재하지 않는 이메일이면 AppError(401)를 throw한다', async () => {
    mockUserFindUnique.mockResolvedValue(null)
    await expect(
      authService.login({ email: 'none@example.com', password: 'pw' }),
    ).rejects.toThrow(new AppError(401, '이메일 또는 비밀번호가 올바르지 않습니다.'))
  })

  it('비밀번호가 틀리면 AppError(401)를 throw한다', async () => {
    mockUserFindUnique.mockResolvedValue(baseUser)
    await expect(
      authService.login({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow(new AppError(401, '이메일 또는 비밀번호가 올바르지 않습니다.'))
  })

  it('초대 수락 전(isActive: false) 계정이면 AppError(403)를 throw한다', async () => {
    mockUserFindUnique.mockResolvedValue({ ...baseUser, isActive: false })
    await expect(
      authService.login({ email: 'test@example.com', password: 'password123' }),
    ).rejects.toThrow(new AppError(403, '비활성화된 계정입니다.'))
  })

  it('같은 초에 로그인해도 refresh token이 매번 달라진다 (동시 로그인 충돌 방지)', async () => {
    mockUserFindUnique.mockResolvedValue(baseUser)
    jest.spyOn(Date, 'now').mockReturnValue(1700000000000)

    const result1 = await authService.login({ email: 'test@example.com', password: 'password123' })
    const result2 = await authService.login({ email: 'test@example.com', password: 'password123' })

    expect(result1.tokens.refreshToken).not.toBe(result2.tokens.refreshToken)

    jest.restoreAllMocks()
  })
})

// ── acceptInvite ─────────────────────────────────────────────────────────────
describe('authService.acceptInvite', () => {
  it('유효한 토큰으로 수락하면 계정을 활성화하고 tokens를 반환한다', async () => {
    mockUserFindUnique.mockResolvedValue(pendingUser)
    mockUserUpdate.mockResolvedValue({ ...pendingUser, isActive: true, password: HASHED_PW })

    const result = await authService.acceptInvite({
      token: 'valid-invite-token',
      password: 'newpassword123',
    })

    expect(mockUserUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user-1' },
        data: expect.objectContaining({ isActive: true, inviteToken: null }),
      }),
    )
    expect(result.tokens.accessToken).toBeTruthy()
    expect(mockRTCreate).toHaveBeenCalled()
  })

  it('존재하지 않는 토큰이면 AppError(400)를 throw한다', async () => {
    mockUserFindUnique.mockResolvedValue(null)
    await expect(
      authService.acceptInvite({ token: 'wrong-token', password: 'pw' }),
    ).rejects.toThrow(new AppError(400, '유효하지 않은 초대 링크입니다.'))
  })

  it('만료된 토큰이면 AppError(400)를 throw한다', async () => {
    mockUserFindUnique.mockResolvedValue({
      ...pendingUser,
      inviteTokenExpiresAt: new Date(Date.now() - 1000),
    })
    await expect(
      authService.acceptInvite({ token: 'expired-token', password: 'pw' }),
    ).rejects.toThrow(new AppError(400, '초대 링크가 만료되었습니다.'))
  })

  it('이미 활성화된 계정의 토큰이면 AppError(400)를 throw한다', async () => {
    mockUserFindUnique.mockResolvedValue({ ...baseUser, inviteToken: 'used-token' })
    await expect(
      authService.acceptInvite({ token: 'used-token', password: 'pw' }),
    ).rejects.toThrow(new AppError(400, '이미 활성화된 계정입니다.'))
  })
})

// ── refresh ──────────────────────────────────────────────────────────────────
describe('authService.refresh', () => {
  const validToken = jwt.sign({ sub: 'user-1' }, 'test-refresh-secret', { expiresIn: '7d' })

  it('유효하고 DB에 살아있는 RT 로 새 access token을 반환한다', async () => {
    mockRTFindUnique.mockResolvedValue({
      tokenHash: hashToken(validToken),
      userId: 'user-1',
      revokedAt: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    mockUserFindUnique.mockResolvedValue(baseUser)

    const result = await authService.refresh(validToken)

    expect(result.accessToken).toBeTruthy()
    expect(result.refreshToken).toBe(validToken) // rotation X
  })

  it('잘못된 token이면 AppError(401)를 throw한다', async () => {
    await expect(authService.refresh('invalid.token.value')).rejects.toThrow(
      new AppError(401, '유효하지 않은 리프레시 토큰입니다.'),
    )
  })

  it('DB에 없는 RT (위조)면 AppError(401)를 throw한다', async () => {
    mockRTFindUnique.mockResolvedValue(null)
    await expect(authService.refresh(validToken)).rejects.toThrow(
      new AppError(401, '유효하지 않은 리프레시 토큰입니다.'),
    )
  })

  it('이미 revoke된 RT면 AppError(401)를 throw한다', async () => {
    mockRTFindUnique.mockResolvedValue({
      tokenHash: hashToken(validToken),
      userId: 'user-1',
      revokedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    await expect(authService.refresh(validToken)).rejects.toThrow(
      new AppError(401, '폐기된 리프레시 토큰입니다.'),
    )
  })

  it('만료된 RT면 AppError(401)를 throw한다', async () => {
    mockRTFindUnique.mockResolvedValue({
      tokenHash: hashToken(validToken),
      userId: 'user-1',
      revokedAt: null,
      expiresAt: new Date(Date.now() - 1000),
    })
    await expect(authService.refresh(validToken)).rejects.toThrow(
      new AppError(401, '만료된 리프레시 토큰입니다.'),
    )
  })
})

// ── logout ───────────────────────────────────────────────────────────────────
describe('authService.logout', () => {
  const token = jwt.sign({ sub: 'user-1' }, 'test-refresh-secret', { expiresIn: '7d' })

  it('유효한 RT를 revoke한다', async () => {
    mockRTFindUnique.mockResolvedValue({
      tokenHash: hashToken(token),
      userId: 'user-1',
      revokedAt: null,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    })
    mockRTUpdate.mockResolvedValue({})

    await authService.logout(token)

    expect(mockRTUpdate).toHaveBeenCalledWith({
      where: { tokenHash: hashToken(token) },
      data: { revokedAt: expect.any(Date) },
    })
  })

  it('DB에 없는 RT면 멱등으로 처리한다 (에러 없음)', async () => {
    mockRTFindUnique.mockResolvedValue(null)
    await expect(authService.logout(token)).resolves.toBeUndefined()
    expect(mockRTUpdate).not.toHaveBeenCalled()
  })

  it('이미 revoke된 RT면 멱등으로 처리한다', async () => {
    mockRTFindUnique.mockResolvedValue({
      tokenHash: hashToken(token),
      userId: 'user-1',
      revokedAt: new Date(),
      expiresAt: new Date(),
    })
    await authService.logout(token)
    expect(mockRTUpdate).not.toHaveBeenCalled()
  })
})

// ── logoutAll ────────────────────────────────────────────────────────────────
describe('authService.logoutAll', () => {
  it('해당 user의 활성 RT를 모두 revoke하고 revokedCount를 반환한다', async () => {
    mockRTUpdateMany.mockResolvedValue({ count: 3 })

    const result = await authService.logoutAll('user-1')

    expect(mockRTUpdateMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', revokedAt: null },
      data: { revokedAt: expect.any(Date) },
    })
    expect(result).toEqual({ revokedCount: 3 })
  })
})

// ── findOrCreateOAuthUser ────────────────────────────────────────────────────
describe('authService.findOrCreateOAuthUser', () => {
  const oauthProfile = { providerId: 'google-123', email: 'oauth@example.com', name: 'OAuth 유저' }

  it('기존 OAuth 계정이 있으면 토큰만 갱신하고 tokens를 반환한다', async () => {
    mockOAuthFindUnique.mockResolvedValue({ id: 'oauth-1', user: baseUser })
    mockOAuthUpdate.mockResolvedValue({})

    const result = await authService.findOrCreateOAuthUser('GOOGLE', oauthProfile, 'at', 'rt')

    expect(mockOAuthUpdate).toHaveBeenCalled()
    expect(result.user.id).toBe('user-1')
  })

  it('신규 OAuth 계정이면 upsert 후 tokens를 반환한다', async () => {
    mockOAuthFindUnique.mockResolvedValue(null)
    const mockUserUpsert = prisma.user.upsert as jest.Mock
    mockUserUpsert.mockResolvedValue(baseUser)
    mockOAuthCreate.mockResolvedValue({})

    const result = await authService.findOrCreateOAuthUser('GOOGLE', oauthProfile, 'at', undefined)

    expect(mockOAuthCreate).toHaveBeenCalled()
    expect(result.tokens.accessToken).toBeTruthy()
  })

  it('비활성 계정이면 AppError(403)를 throw한다', async () => {
    mockOAuthFindUnique.mockResolvedValue({ id: 'oauth-1', user: { ...baseUser, isActive: false } })

    await expect(
      authService.findOrCreateOAuthUser('GOOGLE', oauthProfile, 'at', 'rt'),
    ).rejects.toThrow(new AppError(403, '비활성화된 계정입니다.'))
  })
})
