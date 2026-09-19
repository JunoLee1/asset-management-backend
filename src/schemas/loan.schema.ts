import { z } from 'zod'

const loanStatusEnum = z.enum([
  'PENDING_MANAGER',
  'PENDING_DEPT',
  'PENDING_ADMIN',
  'APPROVED',
  'CHECKED_OUT',
  'RECEIVED',
  'PENDING_INSPECTION',
  'INSPECTED',
  'PENDING_RETURN_DEPT',
  'PENDING_RETURN_ADMIN',
  'RETURNED',
  'REJECTED',
  'CANCELLED',
  'RECALLED',
])

export const createLoanSchema = z.object({
  assetId: z.string().min(1, '자산 ID 는 필수입니다.'),
  purpose: z.string().max(500).optional(),
  dueDate: z.string().datetime().optional(),
})

// FE 의 ApproveBody — 첫 approve 호출에 checkout 정보까지 들어옴.
export const approveLoanSchema = z.object({
  checkoutLocationId: z.string().optional(),
  checkoutMemo: z.string().max(500).optional(),
})

export const rejectLoanSchema = z.object({
  reason: z.string().min(1, '거절 사유는 필수입니다.').max(500),
})

export const recallLoanSchema = z.object({
  reason: z.string().min(1, '회수 사유는 필수입니다.').max(500),
})

// FE 의 ReturnBody — S3 절충에 따라 body 형식 검증만, 값은 service 에서 무시.
export const returnLoanSchema = z.object({
  conditionAfter: z.string().optional(),
  damageNote: z.string().optional(),
  resultAction: z.string().optional(),
  maintenanceScheduledAt: z.string().datetime().optional(),
})

export const inspectLoanSchema = z.object({
  condition: z.enum(['GOOD', 'MINOR_DAMAGE', 'MAJOR_DAMAGE', 'LOST']),
  damageNote: z.string().max(1000).optional(),
})

export const listLoansQuerySchema = z.object({
  status: loanStatusEnum.optional(),
  userId: z.string().optional(),
  assetId: z.string().optional(),
  overdueOnly: z.coerce.boolean().optional(),
  // 신청자명·자산명·자산코드 부분일치 검색 (대소문자 무시)
  keyword: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})

// FE 의 QR 디코드 → lookup endpoint (assetCode 로 active CHECKED_OUT loan 찾기)
export const lookupLoanQuerySchema = z.object({
  assetCode: z.string().min(1, 'assetCode 는 필수입니다.'),
})

export type CreateLoanBody = z.infer<typeof createLoanSchema>
export type ApproveLoanBody = z.infer<typeof approveLoanSchema>
export type RejectLoanBody = z.infer<typeof rejectLoanSchema>
export type RecallLoanBody = z.infer<typeof recallLoanSchema>
export type ReturnLoanBody = z.infer<typeof returnLoanSchema>
export type InspectLoanBody = z.infer<typeof inspectLoanSchema>
export type ListLoansQuery = z.infer<typeof listLoansQuerySchema>
export type LookupLoanQuery = z.infer<typeof lookupLoanQuerySchema>
