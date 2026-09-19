import { z } from 'zod'

const classEnum = z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET'])

export const createCatalogSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다.'),
  manufacturer: z.string().optional(),   // legacy free-text — P1c 에서 제거
  manufacturerId: z.string().optional(), // 마스터 FK (권장)
  modelCode: z.string().optional(),
  class: classEnum,
  categoryId: z.string().optional(),
  specs: z.record(z.string(), z.unknown()).optional(),
  imageUrl: z.string().url().optional(),
})

export const updateCatalogSchema = z.object({
  name: z.string().min(1).optional(),
  manufacturer: z.string().nullable().optional(),   // legacy
  manufacturerId: z.string().nullable().optional(), // 마스터 FK
  modelCode: z.string().nullable().optional(),
  class: classEnum.optional(),
  categoryId: z.string().nullable().optional(),
  specs: z.record(z.string(), z.unknown()).optional(),
  imageUrl: z.string().url().nullable().optional(),
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
