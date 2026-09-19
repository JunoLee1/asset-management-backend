import { z } from 'zod'

export const listDetectedSoftwareSchema = z.object({
  status: z.enum(['PENDING_ASSET_MANAGER', 'PENDING_SECURITY_OFFICER']).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})

export type ListDetectedSoftwareQuery = z.infer<typeof listDetectedSoftwareSchema>
