import { z } from 'zod'

export const createRepairReportSchema = z
  .object({
    type: z.enum(['MONTHLY', 'ANNUAL', 'REPAIR_SUMMARY']),
    year: z.coerce.number().int().min(2020).max(2100),
    month: z.coerce.number().int().min(1).max(12).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    title: z.string().min(1).max(200),
    comment: z.string().max(5000).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'MONTHLY' && !data.month) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'MONTHLY 보고서는 month 필수', path: ['month'] })
    }
    if (data.type === 'REPAIR_SUMMARY' && (!data.startDate || !data.endDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'REPAIR_SUMMARY는 startDate·endDate 필수', path: ['startDate'] })
    }
    if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'startDate는 endDate 이전이어야 합니다', path: ['startDate'] })
    }
  })

export const updateRepairReportSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  comment: z.string().max(5000).optional().nullable(),
})

export const listRepairReportsSchema = z.object({
  type: z.enum(['MONTHLY', 'ANNUAL', 'REPAIR_SUMMARY']).optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'FINALIZED']).optional(),
  year: z.coerce.number().int().min(2020).max(2100).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})
