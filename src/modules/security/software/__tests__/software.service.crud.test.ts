process.env['PHONE_ENCRYPTION_KEY'] = 'a'.repeat(64)

import { softwareService } from '../software.service'
import { prisma } from '../../../../lib/prisma'

jest.mock('../../../../lib/prisma', () => ({
  prisma: {
    software: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    softwarePermission: { create: jest.fn() },
    softwareInstance: { aggregate: jest.fn() },
    auditLog: { create: jest.fn() },
    $transaction: jest.fn(),
  },
}))

const mockSWFindUnique = prisma.software.findUnique as jest.Mock

const mockTx = {
  software: { create: jest.fn(), update: jest.fn() },
  softwarePermission: { create: jest.fn() },
  auditLog: { create: jest.fn() },
}

beforeEach(() => jest.clearAllMocks())

const makeSW = (overrides = {}) => ({
  id: 'sw1', name: 'VS Code', vendor: 'Microsoft', type: 'Other' as const,
  category: '개발도구', description: null, licenseCoverage: null,
  suggestedJobTypes: [] as string[],
  isBlocked: false, processName: null, createdAt: new Date(), updatedAt: new Date(),
  basePermission: { id: 'p1', softwareId: 'sw1', status: 'UNCLASSIFIED', reason: null, reviewedAt: null, reviewedById: null },
  instances: [],
  licenseLinks: [],
  ...overrides,
})

describe('softwareService — suggestedJobTypes', () => {
  it('create 시 suggestedJobTypes 저장', async () => {
    ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => {
      mockTx.software.create.mockResolvedValue(makeSW({ suggestedJobTypes: ['DEVELOPER'] }))
      mockTx.softwarePermission.create.mockResolvedValue({})
      return fn(mockTx)
    })
    mockSWFindUnique.mockResolvedValue(makeSW({ suggestedJobTypes: ['DEVELOPER'] }))

    const result = await softwareService.create(
      { name: 'VS Code', vendor: 'Microsoft', suggestedJobTypes: ['DEVELOPER'] as any },
      { id: 'u1', role: 'ASSET_MANAGER' },
    )

    expect(mockTx.software.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ suggestedJobTypes: ['DEVELOPER'] }),
      }),
    )
    expect(result.suggestedJobTypes).toEqual(['DEVELOPER'])
  })

  it('suggestedJobTypes 미지정 시 빈 배열로 저장', async () => {
    ;(prisma.$transaction as jest.Mock).mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) => {
      mockTx.software.create.mockResolvedValue(makeSW())
      mockTx.softwarePermission.create.mockResolvedValue({})
      return fn(mockTx)
    })
    mockSWFindUnique.mockResolvedValue(makeSW())

    const result = await softwareService.create(
      { name: 'VS Code' },
      { id: 'u1', role: 'ASSET_MANAGER' },
    )

    expect(mockTx.software.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ suggestedJobTypes: [] }),
      }),
    )
    expect(result.suggestedJobTypes).toEqual([])
  })

  it('update 시 suggestedJobTypes 갱신', async () => {
    mockSWFindUnique.mockResolvedValue(makeSW())
    ;(prisma.software.update as jest.Mock).mockResolvedValue(makeSW({ suggestedJobTypes: ['DEVELOPER', 'DESIGNER'] }))
    mockSWFindUnique.mockResolvedValue(makeSW({ suggestedJobTypes: ['DEVELOPER', 'DESIGNER'] }))

    await softwareService.update(
      'sw1',
      { suggestedJobTypes: ['DEVELOPER', 'DESIGNER'] as any },
      { id: 'u1', role: 'ASSET_MANAGER' },
    )

    expect(prisma.software.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ suggestedJobTypes: ['DEVELOPER', 'DESIGNER'] }),
      }),
    )
  })
})
