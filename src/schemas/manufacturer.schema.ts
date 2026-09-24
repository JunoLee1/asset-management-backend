import { z } from 'zod'

export const createManufacturerSchema = z.object({
  name: z.string().trim().min(1, 'canonical 이름은 필수입니다.').max(255),
  aliases: z.array(z.string().trim().min(1).max(255)).optional(),
})

export const updateManufacturerSchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),
    aliases: z.array(z.string().trim().min(1).max(255)).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: '변경할 항목이 없습니다.' })

export const listManufacturerQuerySchema = z.object({
  q: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})

export type CreateManufacturerBody = z.infer<typeof createManufacturerSchema>
export type UpdateManufacturerBody = z.infer<typeof updateManufacturerSchema>
export type ListManufacturerQuery = z.infer<typeof listManufacturerQuerySchema>
