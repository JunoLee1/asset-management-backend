import { z } from 'zod'
import { JobType } from '../generated/prisma/enums'

const currencyEnum = z.enum(['KRW', 'USD', 'EUR', 'GBP', 'JPY'])

export const createLicenseSchema = z
  .object({
    name: z.string().min(1, '라이선스 이름은 필수입니다.').max(255),
    productKey: z.string().min(1).max(500).optional(),
    vendorId: z.string().optional(),
    seatsTotal: z.number().int().positive(),
    purchaseDate: z.string().datetime(),
    expiryDate: z.string().datetime().optional(),
    cost: z.number().nonnegative().optional(),
    currency: currencyEnum.default('KRW'),
    softwareIds: z.string().array().optional(),
    coreDepartmentIds: z.string().array().optional(),
    coreJobTypes: z.array(z.nativeEnum(JobType)).optional(),
  })
  .refine((d) => !d.expiryDate || d.expiryDate >= d.purchaseDate, {
    message: '만료일은 구매일 이전일 수 없습니다.',
    path: ['expiryDate'],
  })

export const updateLicenseSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    productKey: z.string().max(500).nullable().optional(),
    vendorId: z.string().nullable().optional(),
    seatsTotal: z.number().int().positive().optional(),
    purchaseDate: z.string().datetime().optional(),
    expiryDate: z.string().datetime().nullable().optional(),
    cost: z.number().nonnegative().nullable().optional(),
    currency: currencyEnum.optional(),
    coreDepartmentIds: z.string().array().optional(),
    coreJobTypes: z.array(z.nativeEnum(JobType)).optional(),
  })
  // 둘 다 입력된 경우에만 zod 단에서 비교. 한 쪽만 변경되는 경우는 service 가 기존 값과 비교.
  .refine((d) => !d.purchaseDate || !d.expiryDate || d.expiryDate >= d.purchaseDate, {
    message: '만료일은 구매일 이전일 수 없습니다.',
    path: ['expiryDate'],
  })

export const listLicensesQuerySchema = z.object({
  vendorId: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})

export const assignLicenseSchema = z.object({
  userId: z.string().min(1),
  assetId: z.string().optional(),
})

export type CreateLicenseBody = z.infer<typeof createLicenseSchema>
export type UpdateLicenseBody = z.infer<typeof updateLicenseSchema>
export type ListLicensesQuery = z.infer<typeof listLicensesQuerySchema>
export type AssignLicenseBody = z.infer<typeof assignLicenseSchema>

export const createLicenseRequestSchema = z.object({
  targetUserId: z.string().min(1, '대상 사용자는 필수입니다.'),
  assetId: z.string().optional(),
})

export const rejectLicenseRequestSchema = z.object({
  reason: z.string().max(500).optional(),
})

export const listLicenseRequestsQuerySchema = z.object({
  status: z.enum(['PENDING_MANAGER', 'PENDING_DEPT', 'PENDING_SECURITY', 'PENDING_ADMIN', 'APPROVED', 'REJECTED']).optional(),
})

export type CreateLicenseRequestBody = z.infer<typeof createLicenseRequestSchema>
export type RejectLicenseRequestBody = z.infer<typeof rejectLicenseRequestSchema>
export type ListLicenseRequestsQuery = z.infer<typeof listLicenseRequestsQuerySchema>
