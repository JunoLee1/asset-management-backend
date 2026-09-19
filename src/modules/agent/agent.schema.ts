// ADR 0011/0012 — Agent Zod 스키마

import { z } from 'zod'

export const collectItemSchema = z.object({
  processName: z.string().min(1),
  version: z.string().optional(),
  manufacturer: z.string().optional(),
  os: z.string().optional(),
  detectedAt: z.string().datetime(),
})

export const collectPayloadSchema = z.object({
  hostname: z.string().min(1),
  userId: z.string().optional(),
  items: z.array(collectItemSchema).min(1),
})

export const blockEventPayloadSchema = z.object({
  userId: z.string().min(1),
  softwareId: z.string().min(1),
  deviceId: z.string().min(1),
  processName: z.string().min(1),
  occurredAt: z.string().datetime(),
})
