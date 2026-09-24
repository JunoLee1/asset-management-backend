import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import type { CreateVendorInput, UpdateVendorInput } from '../../schemas/master.schema'
import { buildSoftDeleteWhere, type ListOptions } from './master.helpers'
import type { VendorDocumentType, VendorStatus } from '../../generated/prisma/enums'
import { encryptField, maskBankAccount } from '../../lib/fieldEncryption'
import { logSensitiveAction } from '../../lib/sensitiveAuditLog'
import { verifyBusinessRegistration } from './ntsClient'

type VendorRequesterRole = string | undefined

// ADMIN / ASSET_MANAGER / REPAIR_OWNER → 전체 노출
// TEAM_LEAD / DEPT_LEAD → 연락처·SLA 노출, 계약·재무·주소·사업자 마스킹
// 그 외 (USER 등) → 이름·타입·서비스 분야만 노출
function applyVendorMask<T extends Record<string, unknown>>(vendor: T, role: VendorRequesterRole): T {
  const fullAccess = ['ADMIN', 'ASSET_MANAGER', 'REPAIR_OWNER']
  const partialAccess = ['TEAM_LEAD', 'DEPT_LEAD']

  if (role && fullAccess.includes(role)) return vendor

  if (role && partialAccess.includes(role)) {
    return {
      ...vendor,
      // 계약·재무·법인 정보 마스킹
      businessRegistrationNumber: '***-**-*****',
      bankAccountHolder: null,
      bankAccountNumberMask: null,
      bankName: null,
      contractStartDate: null,
      contractEndDate: null,
      penaltyTerms: null,
      paymentTerms: null,
      financialNote: null,
      isVatIncluded: null,
      isWithholdingTax: null,
      paymentDaysAfter: null,
      // 주소 마스킹
      addressBusiness: null,
      addressHeadOffice: null,
      addressDetail: null,
      postalAddress: null,
      // 대표자명 마스킹
      ceoName: null,
    }
  }

  // USER 등 — 최소 정보만 노출
  return {
    id: vendor['id'],
    name: vendor['name'],
    type: vendor['type'],
    status: vendor['status'],
    serviceRegion: vendor['serviceRegion'],
    supportedClasses: vendor['supportedClasses'],
    isBlacklisted: vendor['isBlacklisted'],
  } as unknown as T
}

const REQUIRED_DOCS_COMMON: VendorDocumentType[] = ['BUSINESS_REGISTRATION', 'BANKBOOK']
const REQUIRED_DOCS_REPAIR: VendorDocumentType[] = [...REQUIRED_DOCS_COMMON, 'INSURANCE']

interface VendorListOptions extends ListOptions {
  status?: VendorStatus | 'ALL'
  type?: 'REPAIR' | 'SOFTWARE'
}

const list = async (options?: VendorListOptions & { role?: VendorRequesterRole }) => {
  const baseWhere = buildSoftDeleteWhere(options)
  const statusWhere =
    !options?.status || options.status === 'ALL' ? {} : { status: options.status as VendorStatus }
  const typeWhere = options?.type ? { type: options.type } : {}

  const rows = await prisma.vendor.findMany({
    where: { ...baseWhere, ...statusWhere, ...typeWhere },
    orderBy: { name: 'asc' },
    include: { approvedBy: { select: { id: true, name: true } } },
  })

  // 암호화된 계좌번호 원문은 응답에서 제외 — mask만 반환
  return rows
    .map(({ bankAccountNumber: _omit, ...rest }) => rest)
    .map((v) => applyVendorMask(v, options?.role))
}

const getById = async (id: string, role?: VendorRequesterRole) => {
  const vendorRecord = await prisma.vendor.findUnique({
    where: { id },
    include: { approvedBy: { select: { id: true, name: true } } },
  })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')

  // 암호화된 계좌번호 원문은 응답에서 제외 — mask만 반환
  const { bankAccountNumber: _omit, ...rest } = vendorRecord
  return applyVendorMask(rest, role)
}

const toDateTime = (v: unknown): Date | undefined =>
  typeof v === 'string' && v ? new Date(v.includes('T') ? v : `${v}T00:00:00.000Z`) : undefined

const create = async (dto: CreateVendorInput) => {
  const { products, certifications, technicians, equipment, ...rest } = dto
  const data: Record<string, unknown> = { ...rest }

  if (dto.bankAccountNumber) {
    data['bankAccountNumber'] = encryptField(dto.bankAccountNumber, 'BANK_ACCOUNT_ENCRYPTION_KEY')
    data['bankAccountNumberMask'] = maskBankAccount(dto.bankAccountNumber)
  }
  if (dto.businessRegistrationNumber) {
    data['businessRegistrationNumber'] = encryptField(
      dto.businessRegistrationNumber,
      'BUSINESS_REG_ENCRYPTION_KEY',
    )
  }
  if (dto.contractStartDate) data['contractStartDate'] = toDateTime(dto.contractStartDate)
  if (dto.contractEndDate) data['contractEndDate'] = toDateTime(dto.contractEndDate)

  if (products?.length) data['products'] = { create: products }
  if (certifications?.length) data['certifications'] = { create: certifications }
  if (technicians?.length) data['technicians'] = { create: technicians }
  if (equipment?.length) data['equipment'] = { create: equipment }

  return prisma.vendor.create({ data: data as Parameters<typeof prisma.vendor.create>[0]['data'] })
}

const update = async (id: string, dto: UpdateVendorInput) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')

  // supportedClasses: null → 빈 배열로 초기화
  const { supportedClasses, ...rest } = dto as UpdateVendorInput & {
    supportedClasses?: string[] | null
  }
  const data: Record<string, unknown> =
    supportedClasses === null
      ? { ...rest, supportedClasses: [] }
      : supportedClasses !== undefined
        ? { ...rest, supportedClasses }
        : { ...rest }

  if (dto.bankAccountNumber) {
    data['bankAccountNumber'] = encryptField(dto.bankAccountNumber, 'BANK_ACCOUNT_ENCRYPTION_KEY')
    data['bankAccountNumberMask'] = maskBankAccount(dto.bankAccountNumber)
  }
  if (dto.businessRegistrationNumber) {
    data['businessRegistrationNumber'] = encryptField(
      dto.businessRegistrationNumber,
      'BUSINESS_REG_ENCRYPTION_KEY',
    )
  }
  if (dto.contractStartDate) data['contractStartDate'] = toDateTime(dto.contractStartDate)
  if (dto.contractEndDate) data['contractEndDate'] = toDateTime(dto.contractEndDate)

  return prisma.vendor.update({
    where: { id },
    data: data as Parameters<typeof prisma.vendor.update>[0]['data'],
  })
}

const approve = async (id: string, adminId: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')
  if (vendorRecord.status === 'APPROVED') throw new AppError(400, '이미 승인된 공급업체입니다.')
  if (vendorRecord.deletedAt) throw new AppError(400, '삭제된 공급업체는 승인할 수 없습니다.')

  const result = await prisma.vendor.update({
    where: { id },
    data: { status: 'APPROVED', approvedAt: new Date(), approvedById: adminId },
    include: { approvedBy: { select: { id: true, name: true } } },
  })

  logSensitiveAction({
    action: 'VENDOR_APPROVE',
    performedById: adminId,
    performedByRole: 'ADMIN',
    targetId: id,
    targetType: 'Vendor',
    detail: `업체명: ${vendorRecord.name}`,
    timestamp: new Date().toISOString(),
  })

  return result
}

const inactivate = async (id: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')
  if (vendorRecord.status !== 'APPROVED')
    throw new AppError(400, '승인된 업체만 비활성화할 수 있습니다.')
  return prisma.vendor.update({ where: { id }, data: { status: 'INACTIVE' } })
}

const softDelete = async (id: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')
  if (vendorRecord.deletedAt) throw new AppError(400, '이미 삭제된 공급업체입니다.')

  const [assetCount, maintenanceCount] = await Promise.all([
    prisma.asset.count({ where: { vendorId: id } }),
    prisma.maintenance.count({ where: { vendorId: id } }),
  ])

  if (assetCount > 0) {
    throw new AppError(409, `이 공급업체에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`)
  }
  if (maintenanceCount > 0) {
    throw new AppError(
      409,
      `이 공급업체에 연결된 유지보수 이력 ${maintenanceCount}건이 있어 삭제할 수 없습니다.`,
    )
  }

  return prisma.vendor.update({ where: { id }, data: { deletedAt: new Date() } })
}

const restore = async (id: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')
  if (!vendorRecord.deletedAt) throw new AppError(400, '이미 활성 상태인 공급업체입니다.')
  return prisma.vendor.update({ where: { id }, data: { deletedAt: null } })
}

// ── DRAFT 생성 (register → submit 2단계) ──────────────────────────────────────
const createDraft = async (dto: CreateVendorInput, createdById: string) => {
  const { products, certifications, technicians, equipment, ...rest } = dto
  const data: Record<string, unknown> = { ...rest, status: 'DRAFT', createdById }

  if (dto.businessRegistrationNumber) {
    data['businessRegistrationNumber'] = encryptField(
      dto.businessRegistrationNumber,
      'BUSINESS_REG_ENCRYPTION_KEY',
    )
  }
  if (products?.length) data['products'] = { create: products }
  if (certifications?.length) data['certifications'] = { create: certifications }
  if (technicians?.length) data['technicians'] = { create: technicians }
  if (equipment?.length) data['equipment'] = { create: equipment }

  return prisma.vendor.create({
    data: data as Parameters<typeof prisma.vendor.create>[0]['data'],
  })
}

// ── DRAFT → PENDING 제출 ──────────────────────────────────────────────────────
const submit = async (id: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')
  if (vendorRecord.status !== 'DRAFT')
    throw new AppError(400, '임시저장 상태에서만 제출 가능합니다.')

  // 필수 필드 검증
  if (!vendorRecord.name) throw new AppError(400, '업체명은 필수입니다.')
  if (!vendorRecord.businessRegistrationNumber)
    throw new AppError(400, '사업자등록번호는 필수입니다.')
  if (!vendorRecord.addressBusiness) throw new AppError(400, '사업장 주소는 필수입니다.')

  // 국세청 API로 사업자등록번호 검증 (상태: 활성/폐업/휴업)
  await verifyBusinessRegistration(vendorRecord.businessRegistrationNumber)

  // 필수 증빙 확인
  const docs = await prisma.vendorDocument.findMany({
    where: { vendorId: id, deletedAt: null },
    select: { documentType: true },
  })
  const uploadedTypes = new Set(docs.map((d) => d.documentType))
  const requiredTypes =
    vendorRecord.type === 'REPAIR' ? REQUIRED_DOCS_REPAIR : REQUIRED_DOCS_COMMON
  const missing = requiredTypes.filter((t) => !uploadedTypes.has(t))
  if (missing.length > 0) {
    throw new AppError(422, `필수 증빙 서류가 누락되었습니다: ${missing.join(', ')}`)
  }

  // 중복 체크
  const duplicate = await prisma.vendor.findFirst({
    where: {
      businessRegistrationNumber: vendorRecord.businessRegistrationNumber,
      deletedAt: null,
      id: { not: id },
    },
  })
  if (duplicate) throw new AppError(409, '이미 등록된 사업자등록번호입니다.')

  return prisma.vendor.update({ where: { id }, data: { status: 'PENDING' } })
}

// ── PENDING → REJECTED ────────────────────────────────────────────────────────
const reject = async (id: string, adminId: string, reason: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')
  if (vendorRecord.status !== 'PENDING')
    throw new AppError(400, '검토 요청 상태에서만 반려 가능합니다.')

  const result = await prisma.vendor.update({
    where: { id },
    data: {
      status: 'REJECTED',
      rejectedAt: new Date(),
      rejectedById: adminId,
      rejectionNote: reason,
    },
  })

  logSensitiveAction({
    action: 'VENDOR_REJECT',
    performedById: adminId,
    performedByRole: 'ADMIN',
    targetId: id,
    targetType: 'Vendor',
    detail: `사유: ${reason}`,
    timestamp: new Date().toISOString(),
  })

  return result
}

// ── APPROVED → SUSPENDED (블랙리스트) ─────────────────────────────────────────
const blacklist = async (id: string, adminId: string, reason: string) => {
  const vendorRecord = await prisma.vendor.findUnique({ where: { id } })
  if (!vendorRecord) throw new AppError(404, '공급업체를 찾을 수 없습니다.')

  const result = await prisma.vendor.update({
    where: { id },
    data: {
      isBlacklisted: true,
      blacklistReason: reason,
      blacklistedAt: new Date(),
      status: 'SUSPENDED',
    },
  })

  logSensitiveAction({
    action: 'VENDOR_BLACKLIST',
    performedById: adminId,
    performedByRole: 'ADMIN',
    targetId: id,
    targetType: 'Vendor',
    detail: `사유: ${reason}`,
    timestamp: new Date().toISOString(),
  })

  return result
}

// ── 서류 저장 (업로드 후 메타데이터 저장) ─────────────────────────────────────
interface SaveDocumentInput {
  documentType: string
  publicId: string
  secureUrl: string
  originalName: string
  mimeType: string
  sizeBytes: number
}

const saveDocument = async (vendorId: string, uploaderId: string, input: SaveDocumentInput) => {
  // 기존 같은 타입 서류 소프트 삭제
  await prisma.vendorDocument.updateMany({
    where: { vendorId, documentType: input.documentType as VendorDocumentType, deletedAt: null },
    data: { deletedAt: new Date() },
  })
  return prisma.vendorDocument.create({
    data: {
      ...input,
      documentType: input.documentType as VendorDocumentType,
      vendorId,
      uploadedById: uploaderId,
    },
  })
}

// ── 서류 목록 조회 ─────────────────────────────────────────────────────────────
const getDocuments = async (vendorId: string) =>
  prisma.vendorDocument.findMany({
    where: { vendorId, deletedAt: null },
    include: { uploadedBy: { select: { id: true, name: true } } },
  })

export const vendorService = {
  list,
  getById,
  create,
  update,
  approve,
  inactivate,
  softDelete,
  restore,
  createDraft,
  submit,
  reject,
  blacklist,
  saveDocument,
  getDocuments,
}
