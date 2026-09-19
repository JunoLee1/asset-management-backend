import { z } from 'zod'

const methodEnum = z.enum(['STRAIGHT_LINE', 'DECLINING_BALANCE'])

export const upsertDepreciationSchema = z.object({
  method: methodEnum,
  usefulLifeYears: z.number().int().positive().max(50),
  salvageValue: z.number().nonnegative(),
  annualRate: z.number().min(0).max(1).optional(),       // 0~1 (예: 0.2 = 20%)
})

export type UpsertDepreciationBody = z.infer<typeof upsertDepreciationSchema>
