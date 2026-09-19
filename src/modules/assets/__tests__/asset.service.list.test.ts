import { assetService } from '../asset.service'
import type { ListAssetsQuery } from '../../../schemas/asset.schema'
import type { RequesterContext } from '../asset.types'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    asset: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

import { prisma } from '../../../lib/prisma'

const mockFindMany = prisma.asset.findMany as jest.Mock
const mockCount = prisma.asset.count as jest.Mock

const sampleAssetRow = {
  id: 'asset-1',
  assetCode: 'IT-0001',
  name: 'MacBook Pro',
  class: 'IT_ASSET',
  status: 'OPERATING',
  condition: 'GOOD',
  updatedAt: new Date('2026-06-01'),
  category: { name: 'Laptop' },
  department: { name: '개발팀' },
  location: { name: '본사 5층' },
  assignedUser: { id: 'user-1', name: '홍길동' },
}

const adminRequester: RequesterContext = { id: 'admin-1', role: 'ADMIN' }
const userRequester: RequesterContext = { id: 'user-1', role: 'USER' }

const emptyQuery: ListAssetsQuery = { page: 1, pageSize: 20 }

describe('assetService.list', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFindMany.mockResolvedValue([sampleAssetRow])
    mockCount.mockResolvedValue(1)
  })

  it('페이지네이션 메타(total, page, pageSize, totalPages)를 반환한다', async () => {
    mockCount.mockResolvedValue(45)
    const result = await assetService.list(emptyQuery, adminRequester)
    expect(result.total).toBe(45)
    expect(result.page).toBe(1)
    expect(result.pageSize).toBe(20)
    expect(result.totalPages).toBe(3) // ceil(45/20) = 3
  })

  it('ADMIN은 모든 자산을 조회한다 (assignedUserId 필터 없음)', async () => {
    await assetService.list(emptyQuery, adminRequester)
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.assignedUserId).toBeUndefined()
  })

  it('MANAGER도 모든 자산을 조회한다', async () => {
    await assetService.list(emptyQuery, { id: 'mgr-1', role: 'TEAM_LEAD' })
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.assignedUserId).toBeUndefined()
  })

  it('USER는 본인 배정 자산만 조회한다 (assignedUserId === self)', async () => {
    await assetService.list(emptyQuery, userRequester)
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.assignedUserId).toBe('user-1')
  })

  it('필터(class, status, condition)를 where 조건에 반영한다', async () => {
    await assetService.list(
      { ...emptyQuery, class: 'IT_ASSET', status: 'OPERATING', condition: 'GOOD' },
      adminRequester,
    )
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.class).toBe('IT_ASSET')
    expect(whereArg.status).toBe('OPERATING')
    expect(whereArg.condition).toBe('GOOD')
  })

  it('q 파라미터는 name/assetCode 부분 일치(or)로 검색한다', async () => {
    await assetService.list({ ...emptyQuery, q: 'macbook' }, adminRequester)
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.OR).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: expect.any(Object) }),
        expect.objectContaining({ assetCode: expect.any(Object) }),
      ]),
    )
  })

  it('skip/take가 page/pageSize에서 계산된다 (page=3, pageSize=10 → skip=20)', async () => {
    await assetService.list({ page: 3, pageSize: 10 }, adminRequester)
    const callArg = mockFindMany.mock.calls[0][0]
    expect(callArg.skip).toBe(20)
    expect(callArg.take).toBe(10)
  })

  it('items는 flat한 DTO 형태(categoryName, departmentName 등)로 변환된다', async () => {
    const result = await assetService.list(emptyQuery, adminRequester)
    expect(result.items[0]).toEqual(
      expect.objectContaining({
        id: 'asset-1',
        categoryName: 'Laptop',
        departmentName: '개발팀',
        locationName: '본사 5층',
        assignedUserName: '홍길동',
      }),
    )
  })

  it('RETIRED 자산은 기본 목록에서 제외한다', async () => {
    await assetService.list(emptyQuery, adminRequester)
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.status).toEqual({ not: 'RETIRED' })
  })

  it('status 필터가 명시되면 RETIRED 자동 제외를 덮어쓴다', async () => {
    await assetService.list({ ...emptyQuery, status: 'RETIRED' }, adminRequester)
    const whereArg = mockFindMany.mock.calls[0][0].where
    expect(whereArg.status).toBe('RETIRED')
  })
})
