import { z } from 'zod'

const classEnum = z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET'])

const safeUrl = z.string().url().refine(
  (v) => !v.toLowerCase().startsWith('javascript:'),
  { message: '허용되지 않는 URL 프로토콜입니다.' },
)

export const createCatalogSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다.').max(255),
  manufacturer: z.string().max(255).optional(),
  manufacturerId: z.string().optional(),
  modelCode: z.string().max(100).optional(),
  class: classEnum,
  categoryId: z.string().optional(),
  specs: z.record(z.string(), z.unknown()).optional(),
  imageUrl: safeUrl.optional(),
})

export const updateCatalogSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  manufacturer: z.string().max(255).nullable().optional(),
  manufacturerId: z.string().nullable().optional(),
  modelCode: z.string().max(100).nullable().optional(),
  class: classEnum.optional(),
  categoryId: z.string().nullable().optional(),
  specs: z.record(z.string(), z.unknown()).optional(),
  imageUrl: safeUrl.nullable().optional(),
  isActive: z.boolean().optional(),
})

export const listCatalogQuerySchema = z.object({
  class: classEnum.optional(),
  categoryId: z.string().optional(),
  q: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})
