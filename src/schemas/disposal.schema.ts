import { z } from 'zod'

// ADR 0006 — 폐기 판단 기준 체크리스트 (CONTEXT.md L155-162). 최소 1개 true 강제.
export const disposalCriteriaSchema = z
  .object({
    lowBookValue: z.boolean().default(false),    // 장부가액 0원
    severeDamage: z.boolean().default(false),    // 물리적 파손 — 수리 경제성 상실
    supportEnded: z.boolean().default(false),    // OS/보안패치 지원 종료
    noAlternative: z.boolean().default(false),   // 대체사용·부품재활용·양도·매각 불가
  })
  .refine((c) => c.lowBookValue || c.severeDamage || c.supportEnded || c.noAlternative, {
    message:
      '폐기 판단 기준 중 최소 1개 항목을 체크해야 합니다 (장부가액 0원 / 파손 / 지원종료 / 대체불가).',
  })

export const createDisposalSchema = z.object({
  assetId: z.string().cuid(),
  reason: z.enum(['SALE', 'SCRAP', 'DONATION', 'LOST_STOLEN', 'TRANSFER']),
  note: z.string().max(1000).optional(),
  criteria: disposalCriteriaSchema,
})

export type DisposalCriteria = z.infer<typeof disposalCriteriaSchema>

// ADR 0005: 1차 승인은 단순 승인 (회계전표·증빙은 ADMIN 또는 complete 단계에서)
export const approveManagerDisposalSchema = z.object({}).strict()

// ADR 0005: 최종 승인 시 회계전표 번호를 사전 입력해도 됨 (필수 아님 — complete 단계에서도 입력 가능)
export const approveAdminDisposalSchema = z.object({
  journalEntryNumber: z.string().max(100).optional(),
})

export const rejectDisposalSchema = z.object({
  rejectReason: z.string().min(1).max(500),
})

export const completeDisposalSchema = z.object({
  journalEntryNumber: z.string().max(100).optional(),
  evidences: z
    .array(
      z.object({
        url: z.string().url(),
        label: z.string().max(100).optional(),
      }),
    )
    .optional(),
})

export const listDisposalsQuerySchema = z.object({
  status: z
    .enum([
      'PENDING', // ADR 0005 deprecated — 마이그레이션 후 다음 PR 에서 제거
      'PENDING_MANAGER',
      'PENDING_ADMIN',
      'APPROVED',
      'COMPLETED',
      'REJECTED',
      'CANCELLED',
    ])
    .optional(),
  assetId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

export type CreateDisposalBody = z.infer<typeof createDisposalSchema>
export type ApproveManagerDisposalBody = z.infer<typeof approveManagerDisposalSchema>
export type ApproveAdminDisposalBody = z.infer<typeof approveAdminDisposalSchema>
export type RejectDisposalBody = z.infer<typeof rejectDisposalSchema>
export type CompleteDisposalBody = z.infer<typeof completeDisposalSchema>
export type ListDisposalsQuery = z.infer<typeof listDisposalsQuerySchema>
