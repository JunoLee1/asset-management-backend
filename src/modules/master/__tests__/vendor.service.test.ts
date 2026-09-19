import { AppError } from '../../../lib/AppError'
import { vendorService } from '../vendor.service'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    vendor: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    vendorDocument: {
      findMany: jest.fn(),
      updateMany: jest.fn(),
      create: jest.fn(),
    },
    asset: { count: jest.fn() },
    maintenance: { count: jest.fn() },
  },
}))

jest.mock('../ntsClient', () => ({
  verifyBusinessRegistration: jest.fn(),
}))

jest.mock('../../../lib/fieldEncryption', () => ({
  encryptField: jest.fn((v: string) => `enc:${v}`),
  maskBankAccount: jest.fn((v: string) => `***${v.slice(-4)}`),
}))

import { prisma } from '../../../lib/prisma'
import { verifyBusinessRegistration } from '../ntsClient'
import { validateKrBusinessNumber } from '../../../lib/krBusinessNumber'

const mockVendor = prisma.vendor as unknown as {
  findMany: jest.Mock
  findUnique: jest.Mock
  findFirst: jest.Mock
  create: jest.Mock
  update: jest.Mock
}
const mockVendorDoc = prisma.vendorDocument as unknown as {
  findMany: jest.Mock
  updateMany: jest.Mock
  create: jest.Mock
}
const mockAssetCount = prisma.asset.count as jest.Mock
const mockMaintenanceCount = prisma.maintenance.count as jest.Mock
const mockVerify = verifyBusinessRegistration as jest.Mock

const sample = {
  id: 'v-1',
  name: 'Apple Korea',
  contactName: null,
  email: null,
  phone: null,
  status: 'PENDING' as const,
  deletedAt: null,
}

beforeEach(() => jest.clearAllMocks())

describe('vendorService.approve', () => {
  it('존재하지 않으면 AppError(404)', async () => {
    mockVendor.findUnique.mockResolvedValue(null)
    await expect(vendorService.approve('v-1', 'admin-1')).rejects.toThrow(
      new AppError(404, '공급업체를 찾을 수 없습니다.'),
    )
  })

  it('이미 APPROVED면 AppError(400)', async () => {
    mockVendor.findUnique.mockResolvedValue({ ...sample, status: 'APPROVED' })
    await expect(vendorService.approve('v-1', 'admin-1')).rejects.toThrow(
      new AppError(400, '이미 승인된 공급업체입니다.'),
    )
  })

  it('삭제된 업체면 AppError(400)', async () => {
    mockVendor.findUnique.mockResolvedValue({ ...sample, deletedAt: new Date() })
    await expect(vendorService.approve('v-1', 'admin-1')).rejects.toThrow(
      new AppError(400, '삭제된 공급업체는 승인할 수 없습니다.'),
    )
  })

  it('PENDING → APPROVED 전이, approvedById 기록', async () => {
    mockVendor.findUnique.mockResolvedValue(sample)
    mockVendor.update.mockResolvedValue({ ...sample, status: 'APPROVED', approvedById: 'admin-1' })

    await vendorService.approve('v-1', 'admin-1')

    expect(mockVendor.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'v-1' },
        data: expect.objectContaining({ status: 'APPROVED', approvedById: 'admin-1' }),
      }),
    )
  })
})

describe('vendorService.inactivate', () => {
  it('존재하지 않으면 AppError(404)', async () => {
    mockVendor.findUnique.mockResolvedValue(null)
    await expect(vendorService.inactivate('v-1')).rejects.toThrow(
      new AppError(404, '공급업체를 찾을 수 없습니다.'),
    )
  })

  it('APPROVED가 아니면 AppError(400)', async () => {
    mockVendor.findUnique.mockResolvedValue({ ...sample, status: 'PENDING' })
    await expect(vendorService.inactivate('v-1')).rejects.toThrow(
      new AppError(400, '승인된 업체만 비활성화할 수 있습니다.'),
    )
  })

  it('APPROVED → INACTIVE 전이', async () => {
    mockVendor.findUnique.mockResolvedValue({ ...sample, status: 'APPROVED' })
    mockVendor.update.mockResolvedValue({ ...sample, status: 'INACTIVE' })

    await vendorService.inactivate('v-1')

    expect(mockVendor.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'v-1' },
        data: { status: 'INACTIVE' },
      }),
    )
  })
})

describe('vendorService.softDelete', () => {
  it('연결된 자산이 있으면 AppError(409)', async () => {
    mockVendor.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(3)
    mockMaintenanceCount.mockResolvedValue(0)

    await expect(vendorService.softDelete('v-1')).rejects.toThrow(
      new AppError(409, '이 공급업체에 연결된 자산 3건이 있어 삭제할 수 없습니다.'),
    )
  })

  it('연결된 유지보수가 있으면 AppError(409)', async () => {
    mockVendor.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(0)
    mockMaintenanceCount.mockResolvedValue(2)

    await expect(vendorService.softDelete('v-1')).rejects.toThrow(
      new AppError(409, '이 공급업체에 연결된 유지보수 이력 2건이 있어 삭제할 수 없습니다.'),
    )
  })

  it('연결이 없으면 soft delete', async () => {
    mockVendor.findUnique.mockResolvedValue(sample)
    mockAssetCount.mockResolvedValue(0)
    mockMaintenanceCount.mockResolvedValue(0)
    mockVendor.update.mockResolvedValue({ ...sample, deletedAt: new Date() })

    await vendorService.softDelete('v-1')
    expect(mockVendor.update).toHaveBeenCalled()
  })
})

describe('vendorService.submit', () => {
  const draft = {
    id: 'v-draft',
    name: '테스트업체',
    businessRegistrationNumber: '123-45-67890',
    addressBusiness: '서울시 강남구',
    status: 'DRAFT' as const,
    deletedAt: null,
  }

  beforeEach(() => {
    mockVerify.mockReset()
    // 기본: 필수 증빙 충족 (중복체크·NTS 검증이 주 관심사인 기존 테스트용)
    mockVendorDoc.findMany.mockResolvedValue([
      { documentType: 'BUSINESS_REGISTRATION' },
      { documentType: 'BANKBOOK' },
    ])
  })

  it('공급업체가 없으면 AppError(404)', async () => {
    mockVendor.findUnique.mockResolvedValue(null)
    await expect(vendorService.submit('v-draft')).rejects.toThrow(
      new AppError(404, '공급업체를 찾을 수 없습니다.'),
    )
  })

  it('DRAFT가 아니면 AppError(400)', async () => {
    mockVendor.findUnique.mockResolvedValue({ ...draft, status: 'PENDING' })
    await expect(vendorService.submit('v-draft')).rejects.toThrow(
      new AppError(400, '임시저장 상태에서만 제출 가능합니다.'),
    )
  })

  it('국세청 API에 없는 사업자등록번호면 AppError(404)', async () => {
    mockVendor.findUnique.mockResolvedValue(draft)
    mockVerify.mockRejectedValue(new AppError(404, '국세청에 등록되지 않은 사업자등록번호입니다.'))
    await expect(vendorService.submit('v-draft')).rejects.toThrow(
      new AppError(404, '국세청에 등록되지 않은 사업자등록번호입니다.'),
    )
  })

  it('이미 활성 등록된 사업자등록번호면 AppError(409)', async () => {
    mockVendor.findUnique.mockResolvedValue(draft)
    mockVerify.mockResolvedValue(undefined)
    mockVendor.findFirst.mockResolvedValue({ id: 'v-existing' })
    await expect(vendorService.submit('v-draft')).rejects.toThrow(
      new AppError(409, '이미 등록된 사업자등록번호입니다.'),
    )
  })
})

// ── V2: KR 사업자번호 체크섬 ───────────────────────────────────────────────────
describe('validateKrBusinessNumber (V2, V3)', () => {
  it('V2: 유효한 사업자번호는 true 반환', () => {
    // 1010101013 — 직접 계산: 가중합 17, floor(1*5/10)=0, check=(10-7)%10=3
    expect(validateKrBusinessNumber('101-01-01013')).toBe(true)
    expect(validateKrBusinessNumber('1010101013')).toBe(true)
  })

  it('V2: 잘못된 체크섬은 false 반환', () => {
    expect(validateKrBusinessNumber('1010101014')).toBe(false)
  })

  it('V3: 10자리 미만은 false 반환', () => {
    expect(validateKrBusinessNumber('123456789')).toBe(false)
  })
})

// ── V5: REPAIR_VENDOR 보험증서 누락 시 submit 거부 ────────────────────────────
describe('vendorService.submit — 필수 증빙 (V5, V6)', () => {
  const repairDraft = {
    id: 'v-repair',
    name: '수리업체',
    businessRegistrationNumber: '120-81-00433',
    addressBusiness: '서울시',
    type: 'REPAIR' as const,
    status: 'DRAFT' as const,
    deletedAt: null,
  }

  beforeEach(() => {
    mockVerify.mockResolvedValue(undefined)
    mockVendor.findFirst.mockResolvedValue(null)
  })

  it('V5: REPAIR 업체에 INSURANCE 누락 시 AppError(422)', async () => {
    mockVendor.findUnique.mockResolvedValue(repairDraft)
    mockVendorDoc.findMany.mockResolvedValue([
      { documentType: 'BUSINESS_REGISTRATION' },
      { documentType: 'BANKBOOK' },
    ])
    await expect(vendorService.submit('v-repair')).rejects.toMatchObject({
      statusCode: 422,
      message: expect.stringContaining('INSURANCE'),
    })
  })

  it('V6: REPAIR 업체에 필수 3종 모두 있으면 submit 성공', async () => {
    mockVendor.findUnique.mockResolvedValue(repairDraft)
    mockVendorDoc.findMany.mockResolvedValue([
      { documentType: 'BUSINESS_REGISTRATION' },
      { documentType: 'BANKBOOK' },
      { documentType: 'INSURANCE' },
    ])
    mockVendor.update.mockResolvedValue({ ...repairDraft, status: 'PENDING' })
    await expect(vendorService.submit('v-repair')).resolves.toBeDefined()
  })
})

// ── V1: 정상 vendor 등록 (SUPPLIER) — create() 자식 모델 cascade ──────────────
describe('vendorService.create (V1)', () => {
  it('products·certifications nested 포함 시 create 호출됨', async () => {
    mockVendor.create.mockResolvedValue({ id: 'v-new' })

    await vendorService.create({
      name: 'TestCo',
      businessRegistrationNumber: '1010101013',
      products: [{ name: '제품A', sku: 'SKU-001' }],
      certifications: [{ name: 'ISO 9001', issuer: 'KAB' }],
    })

    expect(mockVendor.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          products: { create: [expect.objectContaining({ name: '제품A' })] },
          certifications: { create: [expect.objectContaining({ name: 'ISO 9001' })] },
        }),
      }),
    )
  })
})

// ── V4: 중복 사업자번호 → AppError(409) ───────────────────────────────────────
// (기존 submit 테스트 "이미 활성 등록된 사업자등록번호면 AppError(409)"로 커버됨)

// ── V7: VendorTechnician certifications String[] 저장 ─────────────────────────
describe('vendorService.create technicians (V7)', () => {
  it('certifications 배열이 data 그대로 전달됨', async () => {
    mockVendor.create.mockResolvedValue({ id: 'v-new' })

    await vendorService.create({
      name: 'RepairCo',
      businessRegistrationNumber: '1010101013',
      technicians: [{ name: '홍길동', certifications: ['정보처리기사', '전기기사'], yearsOfExp: 5 }],
    })

    expect(mockVendor.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          technicians: {
            create: [
              expect.objectContaining({
                certifications: ['정보처리기사', '전기기사'],
              }),
            ],
          },
        }),
      }),
    )
  })
})

// ── V8: supportedSteps 빈 배열 — REPAIR 업체 submit 정상 통과 ─────────────────
// supportedSteps 는 필수가 아님. 빈 배열이어도 submit 가능.
// (V6 테스트에서 repairDraft 가 supportedSteps 없이 submit 성공하므로 커버됨)

// ── V11: 기존 vendor (null businessNumber) update — 체크섬 강제 없음 ──────────
describe('updateVendorSchema (V11)', () => {
  it('businessRegistrationNumber 없이도 수정 가능', async () => {
    const { updateVendorSchema } = await import('../../../schemas/master.schema')
    const result = updateVendorSchema.safeParse({ name: '수정된업체명' })
    expect(result.success).toBe(true)
  })
})

// ── V13: demoUrl invalid URL → zod 거부 ───────────────────────────────────────
describe('vendorProductSchema URL 검증 (V13)', () => {
  it('demoUrl 이 invalid URL 이면 createVendorSchema 실패', async () => {
    const { createVendorSchema } = await import('../../../schemas/master.schema')
    const result = createVendorSchema.safeParse({
      name: 'TestCo',
      businessRegistrationNumber: '1010101013',
      products: [{ name: '제품A', demoUrl: 'not-a-url' }],
    })
    expect(result.success).toBe(false)
  })

  it('demoUrl 이 valid URL 이면 createVendorSchema 성공', async () => {
    const { createVendorSchema } = await import('../../../schemas/master.schema')
    const result = createVendorSchema.safeParse({
      name: 'TestCo',
      businessRegistrationNumber: '1010101013',
      products: [{ name: '제품A', demoUrl: 'https://demo.example.com' }],
    })
    expect(result.success).toBe(true)
  })
})

// ── V12: Cascade delete — 자식 모델은 DB 제약으로 보장 (schema 확인) ──────────
describe('VendorDocument.saveDocument (V12)', () => {
  it('같은 타입 기존 서류를 soft delete 후 신규 생성', async () => {
    mockVendorDoc.updateMany.mockResolvedValue({ count: 1 })
    mockVendorDoc.create.mockResolvedValue({ id: 'doc-1' })

    await vendorService.saveDocument('v-1', 'user-1', {
      documentType: 'BUSINESS_REGISTRATION',
      publicId: 'pub-1',
      secureUrl: 'https://example.com/doc.pdf',
      originalName: '사업자등록증.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 1024,
    })

    expect(mockVendorDoc.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ vendorId: 'v-1', documentType: 'BUSINESS_REGISTRATION' }),
        data: expect.objectContaining({ deletedAt: expect.any(Date) }),
      }),
    )
    expect(mockVendorDoc.create).toHaveBeenCalled()
  })
})
