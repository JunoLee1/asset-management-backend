import { z } from 'zod'
import { JobType } from '../generated/prisma/enums'

export const listSoftwareQuerySchema = z.object({
  type: z.enum(['SaaS', 'OnPremise', 'Other']).optional(),
  q: z.string().optional(),
  permissionStatus: z.enum(['UNCLASSIFIED', 'ALLOWED', 'DISALLOWED']).optional(),
  // 'true'/'false' 문자열로 들어오는 query string을 boolean으로 coerce
  licenseCoverage: z
    .enum(['true', 'false', 'null'])
    .optional()
    .transform((v) => {
      if (v === 'true') return true
      if (v === 'false') return false
      if (v === 'null') return null
      return undefined
    }),
})

export const updateSoftwareSchema = z.object({
  name: z.string().min(1).optional(),
  vendor: z.string().nullable().optional(),
  type: z.enum(['SaaS', 'OnPremise', 'Other']).optional(),
  category: z.string().optional(),
  description: z.string().nullable().optional(),
  licenseCoverage: z.boolean().nullable().optional(),
  suggestedJobTypes: z.array(z.nativeEnum(JobType)).optional(),
})

// 수동 카탈로그 등록 — name 필수, 나머지 옵션
export const createSoftwareSchema = z.object({
  name: z.string().min(1),
  vendor: z.string().nullable().optional(),
  type: z.enum(['SaaS', 'OnPremise', 'Other']).optional(),
  category: z.string().optional(),
  description: z.string().nullable().optional(),
  licenseCoverage: z.boolean().nullable().optional(),
  suggestedJobTypes: z.array(z.nativeEnum(JobType)).optional(),
})

export const updatePermissionSchema = z.object({
  status: z.enum(['UNCLASSIFIED', 'ALLOWED', 'DISALLOWED']),
  reason: z.string().optional(),
})

// Ingest — endpoint agent push
export const ingestPayloadSchema = z.object({
  hostname: z.string().min(1),
  userId: z.string().optional(),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        vendor: z.string().optional(),
        executedOs: z.string().min(1),
        lastUsedAt: z.string().datetime().optional(),
        firstSeenAt: z.string().datetime().optional(),
        durationSec: z.number().int().nonnegative().optional(),
      }),
    )
    .min(1),
})
