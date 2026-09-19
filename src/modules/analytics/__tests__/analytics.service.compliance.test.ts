import { analyticsService } from '../analytics.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    hardwareAsset: { findMany: jest.fn() },
    license: { findMany: jest.fn() },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockHwFindMany = prisma.hardwareAsset.findMany as jest.Mock
const mockLicFindMany = prisma.license.findMany as jest.Mock

beforeEach(() => jest.clearAllMocks())

// ── 회귀 가드: unassignedAt 필터가 _count.assignments 에 반드시 적용되어야 함 ──
//   (analytics.service.ts 가 이 필터를 빠뜨려 회수된 시트까지 컴플라이언스 위반으로 분류한
//    버그의 회귀 방지. license.service 와 일관성 유지.)
describe('getComplianceExpiry — _count.assignments 활성 필터 회귀 가드', () => {
  it('만료 임박 라이선스 조회 시 unassignedAt:null 만 카운트한다', async () => {
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany
      .mockResolvedValueOnce([]) // 만료 임박 쿼리
      .mockResolvedValueOnce([]) // overseated 쿼리

    await analyticsService.getComplianceExpiry()

    // 첫 번째 findMany — 만료 임박 라이선스
    expect(mockLicFindMany).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        include: {
          _count: {
            select: { assignments: { where: { unassignedAt: null } } },
          },
        },
      }),
    )
  })

  it('overseated 판정용 라이선스 조회 시 unassignedAt:null 만 카운트한다', async () => {
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany.mockResolvedValueOnce([]).mockResolvedValueOnce([])

    await analyticsService.getComplianceExpiry()

    // 두 번째 findMany — 전체 라이선스 (overseated 판정)
    expect(mockLicFindMany).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        include: {
          _count: {
            select: { assignments: { where: { unassignedAt: null } } },
          },
        },
      }),
    )
  })
})

// ── 시트 초과(컴플라이언스 위반) 분류 ──
describe('getComplianceExpiry — overseated 분류', () => {
  const baseLicense = (over: { id: string; name: string; seatsTotal: number; used: number }) => ({
    id: over.id,
    name: over.name,
    seatsTotal: over.seatsTotal,
    expiryDate: new Date('2099-01-01'),
    _count: { assignments: over.used },
  })

  it('활성 시트가 계약 시트를 초과한 라이선스만 overseated 에 포함', async () => {
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany
      .mockResolvedValueOnce([]) // 만료 임박: 없음
      .mockResolvedValueOnce([
        baseLicense({ id: 'L1', name: '초과', seatsTotal: 5, used: 7 }),
        baseLicense({ id: 'L2', name: '꽉참', seatsTotal: 5, used: 5 }),
        baseLicense({ id: 'L3', name: '여유', seatsTotal: 5, used: 3 }),
      ])

    const result = await analyticsService.getComplianceExpiry()

    expect(result.overseated).toHaveLength(1)
    expect(result.overseated[0]).toEqual({
      licenseId: 'L1',
      name: '초과',
      seatsTotal: 5,
      seatsUsed: 7,
    })
  })

  it('비활성 할당(회수됨)이 _count 에서 제외되면 overseated 에서 빠진다', async () => {
    // 활성 3 + 비활성(회수) 4 = 누적 7. Prisma 가 unassignedAt:null 필터로 _count=3 만 반환하면
    // seatsTotal 5 미만이라 overseated 가 아니어야 함.
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        baseLicense({ id: 'L1', name: '회수후 여유', seatsTotal: 5, used: 3 }),
      ])

    const result = await analyticsService.getComplianceExpiry()
    expect(result.overseated).toEqual([])
  })
})

// ── 만료 임박 30일 윈도우 ──
describe('getComplianceExpiry — 만료 임박', () => {
  it('warrantyExpiry, licenseExpiry, overseated 가 모두 비어있으면 빈 배열 반환', async () => {
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany.mockResolvedValueOnce([]).mockResolvedValueOnce([])

    const result = await analyticsService.getComplianceExpiry()

    expect(result).toEqual({
      warrantyExpiry: [],
      licenseExpiry: [],
      overseated: [],
    })
  })

  it('hardwareAsset 조회는 30일 내 만료(lte in30, not null) 조건', async () => {
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany.mockResolvedValueOnce([]).mockResolvedValueOnce([])

    await analyticsService.getComplianceExpiry()

    expect(mockHwFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { warrantyEnd: { lte: expect.any(Date), not: null } },
      }),
    )
  })

  it('license 만료 임박 조회도 lte in30, not null 조건', async () => {
    mockHwFindMany.mockResolvedValue([])
    mockLicFindMany.mockResolvedValueOnce([]).mockResolvedValueOnce([])

    await analyticsService.getComplianceExpiry()

    expect(mockLicFindMany).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        where: { expiryDate: { lte: expect.any(Date), not: null } },
      }),
    )
  })
})
