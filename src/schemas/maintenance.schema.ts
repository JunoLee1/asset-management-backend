import { z } from 'zod'
import { MaintenanceStatus, MaintenancePayer, MaintenanceType } from '../generated/prisma/enums'

const statusEnum = z.nativeEnum(MaintenanceStatus)
const payerEnum = z.nativeEnum(MaintenancePayer)
const maintenanceTypeEnum = z.nativeEnum(MaintenanceType)

export const createMaintenanceSchema = z.object({
  assetId: z.string().min(1),
  title: z.string().min(1, '제목은 필수입니다.'),
  description: z.string().min(1, '설명은 필수입니다.'),
  scheduledAt: z.string().datetime(),
  vendorId: z.string().optional(),
  // 정비 유형 — REPAIR 면 자산 컨디션 자동 강등(FAIR), INSPECTION/UPGRADE 는 변경 X
  type: maintenanceTypeEnum.default('REPAIR'),
})

const repairCompletionPartSchema = z.object({
  name: z.string().min(1, '부품명은 필수입니다.'),
  quantity: z.number().int().positive('수량은 1 이상이어야 합니다.'),
  unitPrice: z.number().int().nonnegative('단가는 0 이상이어야 합니다.'),
})

const completionReportSchema = z.object({
  summaryText: z.string().min(1, '수리 내용 요약은 필수입니다.'),
  laborHours: z.number().positive().optional(),
  technicianName: z.string().optional(),
  fileUrl: z.string().url('유효한 URL이 아닙니다.').optional(),
  parts: z.array(repairCompletionPartSchema).default([]),
})

export const updateMaintenanceSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  scheduledAt: z.string().datetime().optional(),
  vendorId: z.string().nullable().optional(),
  // 처리자(기술자) — APPROVED → IN_PROGRESS 전이 시 함께 지정. 단독 변경도 허용.
  managerId: z.string().nullable().optional(),
  status: statusEnum.optional(),
  cost: z.number().nonnegative().nullable().optional(),
  payerType: payerEnum.nullable().optional(),
  payerUserId: z.string().nullable().optional(),
  payerNote: z.string().nullable().optional(),
  // COMPLETED 처리 시 자산관리자·수리기술자가 최종 컨디션 평가
  conditionAfter: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']).optional(),
  // COMPLETED 전이 시 필수
  completionReport: completionReportSchema.optional(),
})

export const listMaintenancesQuerySchema = z.object({
  assetId: z.string().optional(),
  status: statusEnum.optional(),
  managerId: z.string().optional(),
  vendorId: z.string().optional(),
  keyword: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
})

export const approveMaintenanceSchema = z.object({
  // ADMIN 2차 승인 시 현장 확인 후 컨디션 정정 가능 (선택)
  // 자동 강등은 신청 시점에 이미 일어났지만, 실제로 더 나쁘거나/멀쩡한 경우 ADMIN이 정정
  conditionOverride: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']).optional(),
})
export const rejectMaintenanceSchema = z.object({
  reason: z.string().min(1, '거절 사유는 필수입니다.').max(500),
})

// REPAIR_OWNER 가 PENDING_ADMIN 단계에서 외부 업체 배정 + 자동 APPROVED 전이.
// 내부 기술자(managerId) 배정은 IN_PROGRESS 전이 시 update 로 처리.
export const assignMaintenanceSchema = z.object({
  vendorId: z.string().min(1, 'vendorId는 필수입니다.'),
})

export type CreateMaintenanceBody = z.infer<typeof createMaintenanceSchema>
export type UpdateMaintenanceBody = z.infer<typeof updateMaintenanceSchema>
export type ListMaintenancesQuery = z.infer<typeof listMaintenancesQuerySchema>
export type RejectMaintenanceBody = z.infer<typeof rejectMaintenanceSchema>
export type AssignMaintenanceBody = z.infer<typeof assignMaintenanceSchema>
