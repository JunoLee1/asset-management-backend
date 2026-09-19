process.env['PHONE_ENCRYPTION_KEY'] = 'a'.repeat(64)
process.env['PHONE_HASH_SECRET'] = 'test-hash-secret'

import { AppError } from '../../../lib/AppError'
import { adminService } from '../admin.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), debug: jest.fn(), error: jest.fn() },
}))

jest.mock('../../../lib/mailer', () => ({
  sendMail: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('../../../config/env', () => ({
  env: { frontendUrl: 'http://localhost:5173' },
}))

import { prisma } from '../../../lib/prisma'
import { sendMail } from '../../../lib/mailer'

const mockFindUnique = prisma.user.findUnique as jest.Mock
const mockFindFirst = prisma.user.findFirst as jest.Mock
const mockCreate = prisma.user.create as jest.Mock
const mockSendMail = sendMail as jest.Mock

const baseUser = {
  id: 'user-1',
  email: 'hong@company.com',
  name: '홍길동',
  password: null,
  role: 'USER' as const,
  isActive: false,
  phoneNumber: null,
  phoneNumberHash: null,
  inviteToken: 'token-abc',
  inviteTokenExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
  teamId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('adminService.inviteUser', () => {
  it('신규 사원을 초대하면 inviteToken을 반환한다', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue(null)
    mockCreate.mockResolvedValue(baseUser)

    const result = await adminService.inviteUser({
      email: 'hong@company.com',
      name: '홍길동',
      role: 'USER',
      hireDate: new Date('2026-01-15'),
    })

    expect(result.inviteToken).toBeTruthy()
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'hong@company.com', isActive: false }),
      }),
    )
  })

  it('전화번호를 포함해 초대하면 암호화된 값이 저장된다', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue(null)
    mockCreate.mockResolvedValue(baseUser)

    await adminService.inviteUser({
      email: 'hong@company.com',
      name: '홍길동',
      phoneNumber: '01012345678',
      hireDate: new Date('2026-01-15'),
    })

    const callArg = mockCreate.mock.calls[0][0].data
    // 저장되는 phoneNumber는 원본이 아닌 암호화된 값
    expect(callArg.phoneNumber).not.toBe('01012345678')
    // phoneNumberHash는 결정론적 HMAC 값
    expect(callArg.phoneNumberHash).toBeTruthy()
  })

  it('중복 전화번호가 있으면 AppError(409)를 throw한다', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue({ ...baseUser, phoneNumberHash: 'existing-hash' })

    await expect(
      adminService.inviteUser({
        email: 'hong@company.com',
        name: '홍길동',
        phoneNumber: '01012345678',
        hireDate: new Date('2026-01-15'),
      }),
    ).rejects.toThrow(new AppError(409, '이미 등록된 전화번호입니다.'))
  })

  it('이미 활성화된 이메일이면 AppError(409)를 throw한다', async () => {
    mockFindUnique.mockResolvedValue({ ...baseUser, isActive: true })

    await expect(
      adminService.inviteUser({ email: 'hong@company.com', name: '홍길동', hireDate: new Date('2026-01-15') }),
    ).rejects.toThrow(new AppError(409, '이미 등록된 이메일입니다.'))
  })

  it('초대 대기 중인 이메일이면 AppError(409)를 throw한다', async () => {
    mockFindUnique.mockResolvedValue({ ...baseUser, isActive: false, inviteToken: 'pending' })

    await expect(
      adminService.inviteUser({ email: 'hong@company.com', name: '홍길동', hireDate: new Date('2026-01-15') }),
    ).rejects.toThrow(new AppError(409, '이미 초대가 발송된 이메일입니다.'))
  })

  it('hireDate를 포함해 초대하면 DB에 hireDate가 저장된다', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue(null)
    mockCreate.mockResolvedValue(baseUser)

    const hireDate = new Date('2026-01-15')
    await adminService.inviteUser({
      email: 'hong@company.com',
      name: '홍길동',
      hireDate,
    })

    const callArg = mockCreate.mock.calls[0][0].data
    expect(callArg.hireDate).toEqual(hireDate)
  })

  it('hireDate 없이 초대하면 AppError(400)를 throw한다', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue(null)

    const noHireDate = { email: 'hong@company.com', name: '홍길동' } as unknown as Parameters<typeof adminService.inviteUser>[0]
    const err = await adminService.inviteUser(noHireDate).catch((e) => e)
    expect(err).toBeInstanceOf(AppError)
    expect(err.statusCode).toBe(400)
  })

  it('메일 발송이 실패해도 계정은 생성되고 inviteToken을 반환한다', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue(null)
    mockCreate.mockResolvedValue(baseUser)
    mockSendMail.mockRejectedValueOnce(new Error('SMTP 429 Rate Limited'))

    const result = await adminService.inviteUser({
      email: 'hong@company.com',
      name: '홍길동',
      hireDate: new Date('2026-01-15'),
    })

    expect(result.inviteToken).toBeTruthy()
    expect(mockCreate).toHaveBeenCalled()
  })

  it('메일 발송이 끝나기 전에도 응답한다 (fire-and-forget)', async () => {
    mockFindUnique.mockResolvedValue(null)
    mockFindFirst.mockResolvedValue(null)
    mockCreate.mockResolvedValue(baseUser)

    let resolveSendMail: () => void = () => {}
    mockSendMail.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          resolveSendMail = resolve
        }),
    )

    const resultPromise = adminService.inviteUser({
      email: 'hong@company.com',
      name: '홍길동',
      hireDate: new Date('2026-01-15'),
    })

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout: sendMail을 기다리느라 응답이 지연됨')), 50),
    )
    const result = (await Promise.race([resultPromise, timeout])) as { inviteToken: string }

    expect(result.inviteToken).toBeTruthy()
    resolveSendMail()
  })
})
