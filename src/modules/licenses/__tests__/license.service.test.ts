process.env['PHONE_ENCRYPTION_KEY'] = 'a'.repeat(64)

import { AppError } from '../../../lib/AppError'
import { licenseService } from '../license.service'

jest.mock('../../../lib/prisma', () => {
  const prismaMock = {
    $transaction: jest.fn(),
    $queryRaw: jest.fn().mockResolvedValue([]),
    license: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    licenseAssignment: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    software: {
      findMany: jest.fn(),
    },
    softwareLicenseLink: {
      createMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    asset: {
      findUnique: jest.fn(),
    },
    licenseRequest: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  }
  // tx === prismaMock 이므로 기존 mock assertions(mockLicenseCreate 등) 그대로 동작
  prismaMock.$transaction.mockImplementation((fn: (tx: typeof prismaMock) => unknown) =>
    fn(prismaMock),
  )
  return { prisma: prismaMock }
})

jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

jest.mock('../../notifications/notification.service', () => ({
  notificationService: {
    createLicenseFullNotification: jest.fn(),
    createLicensePendingManagerNotification: jest.fn(),
    createLicensePendingDeptNotification: jest.fn(),
    createLicensePendingSecurityNotification: jest.fn(),
    createLicenseRequestedNotification: jest.fn(),
    createLicensePendingAdminNotification: jest.fn(),
    createLicenseApprovedNotification: jest.fn(),
    createLicenseRejectedNotification: jest.fn(),
  },
}))

import { prisma } from '../../../lib/prisma'
import { notificationService } from '../../notifications/notification.service'

const mockLicenseFindUnique = prisma.license.findUnique as jest.Mock
const mockLicenseCreate = prisma.license.create as jest.Mock
const mockLicenseUpdate = prisma.license.update as jest.Mock
const mockLicenseDelete = prisma.license.delete as jest.Mock
const mockLAFindFirst = prisma.licenseAssignment.findFirst as jest.Mock
const mockLAFindUnique = prisma.licenseAssignment.findUnique as jest.Mock
const mockLACount = prisma.licenseAssignment.count as jest.Mock
const mockLACreate = prisma.licenseAssignment.create as jest.Mock
const mockLAUpdate = prisma.licenseAssignment.update as jest.Mock
const mockUserFindUnique = prisma.user.findUnique as jest.Mock
const mockUserFindMany = prisma.user.findMany as jest.Mock
const mockAssetFindUnique = prisma.asset.findUnique as jest.Mock
const mockLRFindFirst = prisma.licenseRequest.findFirst as jest.Mock
const mockLRFindUnique = prisma.licenseRequest.findUnique as jest.Mock
const mockLRFindMany = prisma.licenseRequest.findMany as jest.Mock
const mockLRCount = prisma.licenseRequest.count as jest.Mock
const mockLRCreate = prisma.licenseRequest.create as jest.Mock
const mockLRUpdate = prisma.licenseRequest.update as jest.Mock

const adminCtx = { id: 'admin-1', role: 'ADMIN' as const }
const managerCtx = { id: 'mgr-1', role: 'TEAM_LEAD' as const }
const userCtx = { id: 'user-1', role: 'USER' as const }

const baseLicense = {
  id: 'lic-1',
  name: 'Microsoft Office 365',
  productKey: null,
  productKeyMask: null,
  vendorId: null,
  vendor: null,
  seatsTotal: 100,
  purchaseDate: new Date('2026-01-01'),
  expiryDate: new Date('2027-01-01'),
  cost: null,
  coreDepartmentIds: [],
  assignments: [],
  softwareLinks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

beforeEach(() => {
  jest.clearAllMocks()
})

// ── create ───────────────────────────────────────────────────────────────────
describe('licenseService.create', () => {
  it('관리자가 라이선스를 등록한다', async () => {
    mockLicenseCreate.mockResolvedValue({ id: 'lic-1' })
    mockLicenseFindUnique.mockResolvedValue(baseLicense)

    const result = await licenseService.create(
      {
        name: 'Microsoft Office 365',
        seatsTotal: 100,
        purchaseDate: new Date('2026-01-01'),
      },
      adminCtx,
    )

    expect(mockLicenseCreate).toHaveBeenCalled()
    expect(result.id).toBe('lic-1')
  })

  it('productKey 제공 시 암호화 + 마스크 저장', async () => {
    mockLicenseCreate.mockResolvedValue({ id: 'lic-1' })
    mockLicenseFindUnique.mockResolvedValue(baseLicense)

    await licenseService.create(
      {
        name: 'Office 365',
        productKey: 'XXXX-XXXX-XXXX-1234',
        seatsTotal: 50,
        purchaseDate: new Date(),
      },
      adminCtx,
    )

    const createArgs = mockLicenseCreate.mock.calls[0]?.[0]
    expect(createArgs?.data?.productKey).not.toBe('XXXX-XXXX-XXXX-1234') // 암호화됨
    expect(createArgs?.data?.productKey).toContain(':') // iv:data 포맷
    expect(createArgs?.data?.productKeyMask).toMatch(/1234$/)
  })

  it('coreDepartmentIds를 저장한다', async () => {
    mockLicenseCreate.mockResolvedValue({ id: 'lic-1' })
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, coreDepartmentIds: ['dept-it'] })

    await licenseService.create(
      {
        name: 'Zoom Pro',
        seatsTotal: 5,
        purchaseDate: new Date('2026-01-01'),
        coreDepartmentIds: ['dept-it'],
      },
      adminCtx,
    )

    const createArgs = mockLicenseCreate.mock.calls[0]?.[0]
    expect(createArgs?.data?.coreDepartmentIds).toEqual(['dept-it'])
  })

  it('coreDepartmentIds 미지정 시 빈 배열로 저장', async () => {
    mockLicenseCreate.mockResolvedValue({ id: 'lic-1' })
    mockLicenseFindUnique.mockResolvedValue(baseLicense)

    await licenseService.create(
      { name: 'Zoom Pro', seatsTotal: 5, purchaseDate: new Date('2026-01-01') },
      adminCtx,
    )

    const createArgs = mockLicenseCreate.mock.calls[0]?.[0]
    expect(createArgs?.data?.coreDepartmentIds).toEqual([])
  })

  it('USER 권한이면 403', async () => {
    await expect(
      licenseService.create(
        { name: 'X', seatsTotal: 1, purchaseDate: new Date() },
        userCtx,
      ),
    ).rejects.toThrow(new AppError(403, '관리자 권한이 필요합니다.'))
  })
})

// ── update ───────────────────────────────────────────────────────────────────
describe('licenseService.update', () => {
  it('seatsTotal 을 활성 할당수보다 작게 줄이려 하면 거부', async () => {
    mockLicenseFindUnique.mockResolvedValue(baseLicense)
    mockLACount.mockResolvedValue(80)
    mockLRCount.mockResolvedValue(0)

    await expect(
      licenseService.update('lic-1', { seatsTotal: 50 }, managerCtx),
    ).rejects.toThrow(/현재 할당된 시트/)
  })

  it('seatsTotal 을 활성 할당수 이상으로는 허용', async () => {
    mockLicenseFindUnique
      .mockResolvedValueOnce(baseLicense)
      .mockResolvedValueOnce({ ...baseLicense, seatsTotal: 150 })
    mockLACount.mockResolvedValue(80)
    mockLicenseUpdate.mockResolvedValue({ id: 'lic-1' })

    const result = await licenseService.update('lic-1', { seatsTotal: 150 }, managerCtx)
    expect(result.id).toBe('lic-1')
  })

  it('coreDepartmentIds를 갱신한다', async () => {
    mockLicenseFindUnique
      .mockResolvedValueOnce(baseLicense)
      .mockResolvedValueOnce({ ...baseLicense, coreDepartmentIds: ['dept-sales'] })
    mockLicenseUpdate.mockResolvedValue({ id: 'lic-1' })

    await licenseService.update('lic-1', { coreDepartmentIds: ['dept-sales'] }, managerCtx)

    const updateArgs = mockLicenseUpdate.mock.calls[0]?.[0]
    expect(updateArgs?.data?.coreDepartmentIds).toEqual(['dept-sales'])
  })

  it('USER 권한 거부', async () => {
    await expect(
      licenseService.update('lic-1', { name: 'X' }, userCtx),
    ).rejects.toThrow(/관리자 권한/)
  })
})

// ── delete ───────────────────────────────────────────────────────────────────
describe('licenseService.remove', () => {
  it('활성 할당이 남아있으면 삭제 거부', async () => {
    mockLACount.mockResolvedValue(5)
    mockLRCount.mockResolvedValue(0)
    await expect(licenseService.remove('lic-1', adminCtx)).rejects.toThrow(
      /활성 할당이 5건/,
    )
  })

  it('활성 할당 0건이면 삭제', async () => {
    mockLACount.mockResolvedValue(0)
    mockLicenseDelete.mockResolvedValue({})
    await expect(licenseService.remove('lic-1', adminCtx)).resolves.toBeUndefined()
  })
})

// ── unassign ─────────────────────────────────────────────────────────────────
describe('licenseService.unassign', () => {
  it('이미 회수된 할당이면 거부', async () => {
    mockLAFindUnique.mockResolvedValue({
      id: 'a-1',
      licenseId: 'lic-1',
      unassignedAt: new Date(),
    })
    await expect(
      licenseService.unassign('lic-1', 'a-1', adminCtx),
    ).rejects.toThrow(/이미 회수된/)
  })

  it('정상 회수', async () => {
    mockLAFindUnique.mockResolvedValue({
      id: 'a-1',
      licenseId: 'lic-1',
      unassignedAt: null,
    })
    mockLAUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue(baseLicense)

    await licenseService.unassign('lic-1', 'a-1', adminCtx)
    expect(mockLAUpdate).toHaveBeenCalledWith({
      where: { id: 'a-1' },
      data: { unassignedAt: expect.any(Date) },
    })
  })
})

// ── getById (권한) ───────────────────────────────────────────────────────────
describe('licenseService.getById', () => {
  it('USER 가 할당된 라이선스만 조회 가능', async () => {
    mockLicenseFindUnique.mockResolvedValue({
      ...baseLicense,
      assignments: [{ id: 'a-1', userId: 'other', user: { id: 'other', name: 'X', email: 'x@x' }, asset: null, assignedAt: new Date(), unassignedAt: null }],
    })
    await expect(licenseService.getById('lic-1', userCtx)).rejects.toThrow(
      new AppError(403, '조회 권한이 없습니다.'),
    )
  })

  it('ADMIN 은 productKey 평문 reveal', async () => {
    // 미리 암호화한 키를 productKey 필드에 저장
    const { encryptLicenseKey } = await import('../../../lib/licenseKey')
    const encrypted = encryptLicenseKey('PLAIN-KEY-1234')

    mockLicenseFindUnique.mockResolvedValue({
      ...baseLicense,
      productKey: encrypted,
      productKeyMask: '**********1234',
      assignments: [],
    })

    const result = await licenseService.getById('lic-1', adminCtx)
    expect(result.productKey).toBe('PLAIN-KEY-1234')
  })

  it('MANAGER 는 productKey 평문 X (마스킹만)', async () => {
    const { encryptLicenseKey } = await import('../../../lib/licenseKey')
    const encrypted = encryptLicenseKey('PLAIN-KEY-1234')

    mockLicenseFindUnique.mockResolvedValue({
      ...baseLicense,
      productKey: encrypted,
      productKeyMask: '**********1234',
      assignments: [],
    })

    const result = await licenseService.getById('lic-1', managerCtx)
    expect(result.productKey).toBeNull()
    expect(result.productKeyMask).toBe('**********1234')
  })

  it('없는 라이선스는 404', async () => {
    mockLicenseFindUnique.mockResolvedValue(null)
    await expect(licenseService.getById('x', adminCtx)).rejects.toThrow(
      new AppError(404, '라이선스를 찾을 수 없습니다.'),
    )
  })

  it('coreDepartmentIds를 반환한다', async () => {
    mockLicenseFindUnique.mockResolvedValue({
      ...baseLicense,
      coreDepartmentIds: ['dept-it', 'dept-design'],
      assignments: [],
    })

    const result = await licenseService.getById('lic-1', adminCtx)
    expect(result.coreDepartmentIds).toEqual(['dept-it', 'dept-design'])
  })
})

const baseRequestRow = {
  id: 'req-1',
  licenseId: 'lic-1',
  status: 'PENDING_SECURITY',
  requestedById: 'mgr-1',
  targetUserId: 'user-2',
  assetId: null,
  managerApprovedById: null,
  managerApprovedAt: null,
  deptApprovedById: null,
  deptApprovedAt: null,
  securityReviewedById: null,
  securityReviewedAt: null,
  adminApprovedById: null,
  adminApprovedAt: null,
  rejectedById: null,
  rejectedAt: null,
  rejectReason: null,
  createdAt: new Date(),
  license: { name: 'Microsoft Office 365' },
  requestedBy: { name: 'Manager' },
  targetUser: { name: 'Lee' },
  asset: null,
  managerApprovedBy: null,
  deptApprovedBy: null,
  securityReviewedBy: null,
  adminApprovedBy: null,
  rejectedBy: null,
}

// requester 가 팀 없는 경우 → PENDING_SECURITY 로 직행
const requesterNoTeam = { id: 'mgr-1', name: 'Manager', teamId: null, team: null }

describe('licenseService.request', () => {
  it('PENDING 요청이 있으면 시트 잠금에 포함된다', async () => {
    // seatsTotal=2, 활성 할당 1, PENDING 요청 1 → 잔여 0 (user 조회 전에 throw)
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 2 })
    mockLACount.mockResolvedValue(1)
    mockLRCount.mockResolvedValue(1)

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/잔여 시트가 없습니다/)
  })

  it('바깥쪽 사전 체크는 통과했지만 트랜잭션 안에서 다시 센 시트가 꽉 찼으면 생성하지 않고 거부한다 (동시 요청 방어)', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 1 })
    // 1번째 호출(바깥 사전 체크) = 0/1 → 통과, 2번째 호출(트랜잭션 안 재확인) = 1/1 → 이미 다른 동시 요청이 선점
    mockLACount.mockResolvedValueOnce(0).mockResolvedValueOnce(1)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce(requesterNoTeam)
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/잔여 시트가 없습니다/)
    expect(mockLRCreate).not.toHaveBeenCalled()
    expect(prisma.$queryRaw).toHaveBeenCalled() // license row를 잠근 뒤 재확인했어야 함
  })

  it('존재하지 않는 라이선스면 404', async () => {
    mockLicenseFindUnique.mockResolvedValue(null)
    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/라이선스를 찾을 수 없습니다/)
  })

  it('이미 활성 할당된 사용자면 400', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce(requesterNoTeam)
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue({ id: 'a-1', unassignedAt: null })

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/이미 할당된 사용자/)
  })

  it('이미 PENDING 요청이 있는 사용자면 400', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce(requesterNoTeam)
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue({ id: 'req-1', status: 'PENDING_SECURITY' })

    await expect(
      licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx),
    ).rejects.toThrow(/이미 진행 중인 요청/)
  })

  it('팀 없는 requester → PENDING_SECURITY 로 요청 생성', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(5)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce(requesterNoTeam)
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)
    mockLRCreate.mockResolvedValue({ id: 'req-1' })
    mockLRFindUnique.mockResolvedValue({ ...baseRequestRow, status: 'PENDING_SECURITY' })

    const result = await licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx)
    expect(mockLRCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_SECURITY' }),
      }),
    )
    expect(result.id).toBe('req-1')
  })

  it('requester가 팀장이면 PENDING_MANAGER 스킵', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    // requester = 팀장 본인
    mockUserFindUnique
      .mockResolvedValueOnce({
        id: 'mgr-1', name: 'Manager', teamId: 'team-1',
        team: {
          teamLeadId: 'mgr-1',
          department: { leaderId: 'dept-lead-1', leader: { id: 'dept-lead-1', isOutOfOffice: false } },
        },
      })
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)
    mockLRCreate.mockResolvedValue({ id: 'req-1' })
    mockLRFindUnique.mockResolvedValue({ ...baseRequestRow, status: 'PENDING_DEPT' })

    const result = await licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx)
    expect(mockLRCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_DEPT' }),
      }),
    )
    expect(result.id).toBe('req-1')
  })

  it('팀은 있지만 팀장이 미배정이면 PENDING_MANAGER 스킵 (팀장에게 알림 보낼 수 없으므로)', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce({
        id: 'user-1', name: 'User', teamId: 'team-1',
        team: {
          teamLeadId: null,
          department: { leaderId: 'dept-lead-1', leader: { id: 'dept-lead-1', isOutOfOffice: false } },
        },
      })
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)
    mockLRCreate.mockResolvedValue({ id: 'req-1' })
    mockLRFindUnique.mockResolvedValue({ ...baseRequestRow, status: 'PENDING_DEPT' })

    const result = await licenseService.request('lic-1', { targetUserId: 'user-2' }, userCtx)
    expect(mockLRCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_DEPT' }),
      }),
    )
    expect(result.id).toBe('req-1')
  })

  it('알림 발송이 실패해도 요청 생성은 성공한다', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce(requesterNoTeam)
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)
    mockLRCreate.mockResolvedValue({ id: 'req-1' })
    mockLRFindUnique.mockResolvedValue({ ...baseRequestRow, status: 'PENDING_SECURITY' })
    ;(notificationService.createLicensePendingSecurityNotification as jest.Mock).mockRejectedValueOnce(
      new Error('notify down'),
    )

    const result = await licenseService.request('lic-1', { targetUserId: 'user-2' }, managerCtx)
    expect(result.id).toBe('req-1')
  })

  it('일반 팀원은 PENDING_MANAGER 로 시작', async () => {
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(0)
    mockLRCount.mockResolvedValue(0)
    mockUserFindUnique
      .mockResolvedValueOnce({
        id: 'user-1', name: 'User', teamId: 'team-1',
        team: {
          teamLeadId: 'mgr-1',
          department: { leaderId: 'dept-lead-1', leader: { id: 'dept-lead-1', isOutOfOffice: false } },
        },
      })
      .mockResolvedValueOnce({ id: 'user-2', name: 'Kim' })
    mockLAFindFirst.mockResolvedValue(null)
    mockLRFindFirst.mockResolvedValue(null)
    mockLRCreate.mockResolvedValue({ id: 'req-1' })
    mockLRFindUnique.mockResolvedValue({ ...baseRequestRow, status: 'PENDING_MANAGER' })

    const result = await licenseService.request('lic-1', { targetUserId: 'user-2' }, userCtx)
    expect(mockLRCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_MANAGER' }),
      }),
    )
    expect(result.id).toBe('req-1')
  })
})

describe('licenseService.approveManager', () => {
  const baseReq = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_MANAGER',
    requestedById: 'user-1',
    targetUserId: 'user-2',
    requestedBy: {
      id: 'user-1',
      teamId: 'team-1',
      team: {
        teamLeadId: 'mgr-1',
        department: { leaderId: 'dept-1', leader: { id: 'dept-1', isOutOfOffice: false } },
      },
    },
  }

  it('PENDING_MANAGER 아닌 요청이면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseReq, status: 'PENDING_SECURITY' })
    await expect(
      licenseService.approveManager('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/PENDING_MANAGER 상태가 아닙니다/)
  })

  it('팀장이 아니면 403', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseReq })
    // approver가 이끄는 팀이 없음
    mockUserFindUnique.mockResolvedValue({ id: 'mgr-1', ledTeams: [] })
    await expect(
      licenseService.approveManager('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/팀장이 아닙니다/)
  })

  it('팀장이 승인 → 부서장 있으면 PENDING_DEPT', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseReq })
      .mockResolvedValueOnce({ ...baseRequestRow, status: 'PENDING_DEPT', managerApprovedById: 'mgr-1' })
    mockUserFindUnique.mockResolvedValue({ id: 'mgr-1', ledTeams: [{ id: 'team-1' }] })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.approveManager('lic-1', 'req-1', managerCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_DEPT', managerApprovedById: 'mgr-1' }),
      }),
    )
    expect(result.status).toBe('PENDING_DEPT')
  })

  it('부서장 OOO이면 PENDING_SECURITY 로 스킵', async () => {
    const reqOOO = {
      ...baseReq,
      requestedBy: {
        ...baseReq.requestedBy,
        team: {
          teamLeadId: 'mgr-1',
          department: { leaderId: 'dept-1', leader: { id: 'dept-1', isOutOfOffice: true } },
        },
      },
    }
    // 1st Once: 실제 요청 데이터 (OOO=true), 2nd Once: getRequestById 결과
    mockLRFindUnique
      .mockResolvedValueOnce(reqOOO)
      .mockResolvedValueOnce({ ...baseRequestRow, status: 'PENDING_SECURITY', managerApprovedById: 'mgr-1' })
    mockUserFindUnique.mockResolvedValue({ id: 'mgr-1', ledTeams: [{ id: 'team-1' }] })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.approveManager('lic-1', 'req-1', managerCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_SECURITY' }),
      }),
    )
    expect(result.status).toBe('PENDING_SECURITY')
  })

  it('ADMIN 은 팀장 체크 없이 승인 가능', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseReq })
      .mockResolvedValueOnce({ ...baseRequestRow, status: 'PENDING_DEPT', managerApprovedById: 'admin-1' })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.approveManager('lic-1', 'req-1', adminCtx)
    expect(result.status).toBe('PENDING_DEPT')
  })
})

describe('licenseService.approveDept', () => {
  const baseReq = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_DEPT',
    requestedById: 'user-1',
    targetUserId: 'user-2',
    requestedBy: {
      id: 'user-1',
      team: { department: { leaderId: 'dept-1' } },
    },
  }

  it('PENDING_DEPT 아닌 요청이면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseReq, status: 'PENDING_SECURITY' })
    await expect(
      licenseService.approveDept('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/PENDING_DEPT 상태가 아닙니다/)
  })

  it('부서장이 아니면 403', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseReq })
    await expect(
      licenseService.approveDept('lic-1', 'req-1', { id: 'other-1', role: 'TEAM_LEAD' as const }),
    ).rejects.toThrow(/부서장이 아닙니다/)
  })

  it('부서장이 승인 → PENDING_SECURITY', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseReq })
      .mockResolvedValueOnce({ ...baseRequestRow, status: 'PENDING_SECURITY', deptApprovedById: 'dept-1' })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.approveDept('lic-1', 'req-1', { id: 'dept-1', role: 'TEAM_LEAD' as const })
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'PENDING_SECURITY', deptApprovedById: 'dept-1' }),
      }),
    )
    expect(result.status).toBe('PENDING_SECURITY')
  })
})

describe('licenseService.approveAdmin', () => {
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_ADMIN',
    targetUserId: 'user-2',
    requestedById: 'mgr-1',
    assetId: null,
  }

  it('ADMIN 아니면 403', async () => {
    await expect(
      licenseService.approveAdmin('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/ADMIN 권한이 필요합니다/)
  })

  it('PENDING_ADMIN 아닌 요청이면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'PENDING_SECURITY' })
    await expect(
      licenseService.approveAdmin('lic-1', 'req-1', adminCtx),
    ).rejects.toThrow(/PENDING_ADMIN 상태가 아닙니다/)
  })

  it('승인 시점에 시트 초과면 거부 — 트랜잭션(FOR UPDATE) 안에서 재확인 후 승인·할당 롤백', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest })
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 3 })
    mockLACount.mockResolvedValue(3)
    mockLRCount.mockResolvedValue(1) // 이 요청 자체가 PENDING_ADMIN 으로 카운트됨 → 3+1=4 > 3

    await expect(
      licenseService.approveAdmin('lic-1', 'req-1', adminCtx),
    ).rejects.toThrow(/시트가 부족합니다/)
    expect(mockLACreate).not.toHaveBeenCalled()
    expect(mockLRUpdate).not.toHaveBeenCalled()
    expect(prisma.$queryRaw).toHaveBeenCalled() // license row를 잠근 뒤 재확인했어야 함
  })

  it('정상 승인 — LicenseAssignment 생성', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequest,
        status: 'APPROVED',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        managerApprovedBy: null,
        deptApprovedBy: null,
        securityReviewedBy: null,
        adminApprovedBy: { name: 'Admin' },
        rejectedBy: null,
      })
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense, seatsTotal: 100 })
    mockLACount.mockResolvedValue(5)
    mockLRCount.mockResolvedValue(1) // 현재 이 요청 자체가 PENDING_ADMIN 으로 카운트됨
    mockLRUpdate.mockResolvedValue({})
    mockLACreate.mockResolvedValue({})

    const result = await licenseService.approveAdmin('lic-1', 'req-1', adminCtx)
    expect(mockLACreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ licenseId: 'lic-1', userId: 'user-2' }),
      }),
    )
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'APPROVED' }),
      }),
    )
    expect(result.status).toBe('APPROVED')
  })
})

describe('licenseService.approveSecurity', () => {
  const secCtx = { id: 'sec-1', role: 'SECURITY_OFFICER' as const }
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_SECURITY',
    targetUserId: 'user-2',
    requestedById: 'mgr-1',
  }

  it('PENDING_SECURITY 아닌 요청이면 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'PENDING_ADMIN' })
    await expect(
      licenseService.approveSecurity('lic-1', 'req-1', secCtx),
    ).rejects.toThrow(/PENDING_SECURITY 상태가 아닙니다/)
  })

  it('USER 권한이면 403', async () => {
    await expect(
      licenseService.approveSecurity('lic-1', 'req-1', userCtx),
    ).rejects.toThrow(/권한이 없습니다/)
  })

  it('licenseId 불일치면 404', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, licenseId: 'other-lic' })
    await expect(
      licenseService.approveSecurity('lic-1', 'req-1', secCtx),
    ).rejects.toThrow(/요청을 찾을 수 없습니다/)
  })

  it('SECURITY_OFFICER 가 1단계 승인', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })   // 조회
      .mockResolvedValueOnce({                      // getRequestById 내부
        ...baseRequest,
        status: 'PENDING_ADMIN',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        managerApprovedBy: null,
        deptApprovedBy: null,
        securityReviewedBy: { name: 'Security' },
        adminApprovedBy: null,
        rejectedBy: null,
      })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.approveSecurity('lic-1', 'req-1', secCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'PENDING_ADMIN',
          securityReviewedById: 'sec-1',
        }),
      }),
    )
    expect(result.status).toBe('PENDING_ADMIN')
  })

  it('ADMIN 도 1단계 대행 가능', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequest,
        status: 'PENDING_ADMIN',
        license: { name: 'Office 365' },
        requestedBy: { name: 'Kim' },
        targetUser: { name: 'Lee' },
        asset: null,
        managerApprovedBy: null,
        deptApprovedBy: null,
        securityReviewedBy: { name: 'Admin' },
        adminApprovedBy: null,
        rejectedBy: null,
      })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.approveSecurity('lic-1', 'req-1', adminCtx)
    expect(result.status).toBe('PENDING_ADMIN')
  })
})

describe('licenseService.reject', () => {
  const secCtx = { id: 'sec-1', role: 'SECURITY_OFFICER' as const }

  const makeReq = (status: string, extra = {}) => ({
    id: 'req-1',
    licenseId: 'lic-1',
    status,
    requestedById: 'mgr-1',
    targetUserId: 'user-2',
    requestedBy: {
      id: 'mgr-1',
      team: { teamLeadId: 'team-lead-1', department: { leaderId: 'dept-1' } },
    },
    ...extra,
  })

  it('APPROVED 요청 거절 시도 400', async () => {
    mockLRFindUnique.mockResolvedValue(makeReq('APPROVED'))
    await expect(
      licenseService.reject('lic-1', 'req-1', {}, secCtx),
    ).rejects.toThrow(/이미 처리된 요청/)
  })

  it('PENDING_SECURITY 상태에서 TEAM_LEAD 는 403', async () => {
    mockLRFindUnique.mockResolvedValue(makeReq('PENDING_SECURITY'))
    await expect(
      licenseService.reject('lic-1', 'req-1', { reason: '' }, managerCtx),
    ).rejects.toThrow(/반려 권한이 없습니다/)
  })

  it('PENDING_MANAGER 상태에서 팀장이 반려 가능', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce(makeReq('PENDING_MANAGER'))
      .mockResolvedValueOnce({
        ...baseRequestRow, status: 'REJECTED',
        rejectedBy: { name: 'TeamLead' },
      })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const teamLeadCtx = { id: 'team-lead-1', role: 'TEAM_LEAD' as const }
    const result = await licenseService.reject('lic-1', 'req-1', { reason: '사유' }, teamLeadCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'REJECTED', rejectedById: 'team-lead-1' }),
      }),
    )
    expect(result.status).toBe('REJECTED')
  })

  it('PENDING_SECURITY 상태에서 SECURITY_OFFICER 가 반려', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce(makeReq('PENDING_SECURITY'))
      .mockResolvedValueOnce({
        ...baseRequestRow, status: 'REJECTED',
        rejectedBy: { name: 'Security' },
      })
    mockLRUpdate.mockResolvedValue({})
    mockLicenseFindUnique.mockResolvedValue({ ...baseLicense })

    const result = await licenseService.reject('lic-1', 'req-1', { reason: '정책 위반' }, secCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'REJECTED', rejectedById: 'sec-1', rejectReason: '정책 위반' }),
      }),
    )
    expect(result.status).toBe('REJECTED')
  })
})

describe('licenseService.cancel', () => {
  const baseRequest = {
    id: 'req-1',
    licenseId: 'lic-1',
    status: 'PENDING_SECURITY',
    requestedById: 'mgr-1',
    targetUserId: 'user-2',
  }

  it('요청자 본인만 취소 가능 (또는 ADMIN)', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest })
    const otherMgr = { id: 'other-mgr', role: 'TEAM_LEAD' as const }
    await expect(
      licenseService.cancel('lic-1', 'req-1', otherMgr),
    ).rejects.toThrow(/취소 권한이 없습니다/)
  })

  it('APPROVED 요청 취소 시도 400', async () => {
    mockLRFindUnique.mockResolvedValue({ ...baseRequest, status: 'APPROVED' })
    await expect(
      licenseService.cancel('lic-1', 'req-1', managerCtx),
    ).rejects.toThrow(/이미 처리된 요청/)
  })

  it('요청자가 직접 취소', async () => {
    mockLRFindUnique
      .mockResolvedValueOnce({ ...baseRequest })
      .mockResolvedValueOnce({
        ...baseRequestRow,
        status: 'REJECTED',
        rejectedBy: { name: 'Kim' },
      })
    mockLRUpdate.mockResolvedValue({})

    const result = await licenseService.cancel('lic-1', 'req-1', managerCtx)
    expect(mockLRUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'REJECTED',
          rejectReason: '요청자 취소',
        }),
      }),
    )
    expect(result.status).toBe('REJECTED')
  })
})

describe('licenseService.listRequests', () => {
  it('USER 권한이면 403', async () => {
    await expect(
      licenseService.listRequests('lic-1', {}, userCtx),
    ).rejects.toThrow(/조회 권한이 없습니다/)
  })

  it('status 필터 없이 전체 반환', async () => {
    mockLRFindMany.mockResolvedValue([])
    const result = await licenseService.listRequests('lic-1', {}, adminCtx)
    expect(mockLRFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ licenseId: 'lic-1' }),
      }),
    )
    expect(result).toEqual([])
  })

  it('status 필터 적용', async () => {
    mockLRFindMany.mockResolvedValue([])
    await licenseService.listRequests('lic-1', { status: 'PENDING_SECURITY' }, adminCtx)
    expect(mockLRFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: 'PENDING_SECURITY' }),
      }),
    )
  })

  it('target user가 핵심부서 소속이면 CORE, 아니면 DEFAULT — CORE가 먼저 정렬', async () => {
    const baseRow = {
      licenseId: 'lic-1',
      license: { name: 'Zoom Pro', coreDepartmentIds: ['dept-it'] },
      requestedById: 'u-1',
      requestedBy: { name: 'Alice' },
      assetId: null,
      asset: null,
      status: 'PENDING_ADMIN' as const,
      managerApprovedById: null,
      managerApprovedBy: null,
      managerApprovedAt: null,
      deptApprovedById: null,
      deptApprovedBy: null,
      deptApprovedAt: null,
      securityReviewedById: null,
      securityReviewedBy: null,
      securityReviewedAt: null,
      adminApprovedById: null,
      adminApprovedBy: null,
      adminApprovedAt: null,
      rejectedById: null,
      rejectedBy: null,
      rejectedAt: null,
      rejectReason: null,
    }

    // findMany의 orderBy: createdAt desc 를 흉내내서 mock도 최신순으로 준다
    // (req-sales-old가 가장 최근, req-it-old가 가장 오래됨) — 정렬이 진짜로
    // priorityTier를 기준으로 재배치하는지 확인하기 위해 일부러 DEFAULT를 먼저 둔다.
    mockLRFindMany.mockResolvedValue([
      {
        ...baseRow,
        id: 'req-sales',
        targetUserId: 'u-2',
        targetUser: { name: 'Bob', team: { departmentId: 'dept-sales' } },
        createdAt: new Date('2026-01-03'),
      },
      {
        ...baseRow,
        id: 'req-it-new',
        targetUserId: 'u-3',
        targetUser: { name: 'Carol', team: { departmentId: 'dept-it' } },
        createdAt: new Date('2026-01-02'),
      },
      {
        ...baseRow,
        id: 'req-it-old',
        targetUserId: 'u-4',
        targetUser: { name: 'Dave', team: { departmentId: 'dept-it' } },
        createdAt: new Date('2026-01-01'),
      },
    ])

    const result = await licenseService.listRequests('lic-1', {}, adminCtx)

    // CORE(req-it-new, req-it-old, 최신순) 먼저, 그다음 DEFAULT(req-sales)
    expect(result.map((r) => r.id)).toEqual(['req-it-new', 'req-it-old', 'req-sales'])
    expect(result.map((r) => r.priorityTier)).toEqual(['CORE', 'CORE', 'DEFAULT'])
  })

  it('targetUser에 team이 없으면 DEFAULT', async () => {
    mockLRFindMany.mockResolvedValue([
      {
        id: 'req-1',
        licenseId: 'lic-1',
        license: { name: 'Zoom Pro', coreDepartmentIds: ['dept-it'] },
        requestedById: 'u-1',
        requestedBy: { name: 'Alice' },
        targetUserId: 'u-2',
        targetUser: { name: 'Bob', team: null },
        assetId: null,
        asset: null,
        status: 'PENDING_ADMIN' as const,
        managerApprovedById: null,
        managerApprovedBy: null,
        managerApprovedAt: null,
        deptApprovedById: null,
        deptApprovedBy: null,
        deptApprovedAt: null,
        securityReviewedById: null,
        securityReviewedBy: null,
        securityReviewedAt: null,
        adminApprovedById: null,
        adminApprovedBy: null,
        adminApprovedAt: null,
        rejectedById: null,
        rejectedBy: null,
        rejectedAt: null,
        rejectReason: null,
        createdAt: new Date('2026-01-01'),
      },
    ])

    const result = await licenseService.listRequests('lic-1', {}, adminCtx)
    expect(result[0]?.priorityTier).toBe('DEFAULT')
  })
})
