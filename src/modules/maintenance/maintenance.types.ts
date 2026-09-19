import type {
  MaintenanceStatus,
  MaintenancePayer,
  MaintenanceServiceType,
} from '../../generated/prisma/enums'

export interface MaintenanceListItem {
  id: string
  title: string
  status: MaintenanceStatus
  assetCode: string
  assetName: string
  managerName: string
  requesterName: string | null
  // 최종 승인자 — adminApprovedBy 우선, 없으면 managerApprovedBy
  approverName: string | null
  scheduledAt: Date
  completedAt: Date | null
  cost: number | null
  payerType: MaintenancePayer | null
  createdAt: Date
  // 수리업체 이메일 회신 (Mailgun inbound)
  vendorReportBody: string | null
  vendorReportParsedCost: number | null
  vendorReportReceivedAt: Date | null
}

export interface RepairCompletionPartDetail {
  id: string
  name: string
  quantity: number
  unitPrice: number
}

export interface RepairCompletionReportDetail {
  id: string
  summaryText: string
  laborHours: number | null
  technicianName: string | null
  fileUrl: string | null
  submittedBy: { id: string; name: string }
  parts: RepairCompletionPartDetail[]
  createdAt: Date
}

export interface RepairCompletionPartInput {
  name: string
  quantity: number
  unitPrice: number
}

export interface RepairCompletionReportInput {
  summaryText: string
  laborHours?: number
  technicianName?: string
  fileUrl?: string
  parts: RepairCompletionPartInput[]
}

export interface MaintenanceDetail extends Omit<
  MaintenanceListItem,
  'assetCode' | 'assetName' | 'managerName' | 'requesterName' | 'approverName' | 'vendorReportBody' | 'vendorReportParsedCost' | 'vendorReportReceivedAt'
> {
  description: string
  asset: { id: string; assetCode: string; name: string; assignedUserId: string | null }
  requestedBy: { id: string; name: string } | null
  manager: { id: string; name: string } | null
  managerApprovedBy: { id: string; name: string } | null
  adminApprovedBy: { id: string; name: string } | null
  vendor: { id: string; name: string } | null
  serviceType: MaintenanceServiceType | null
  isUserFault: boolean | null
  payerUser: { id: string; name: string } | null
  payerNote: string | null
  updatedAt: Date
  // 수리업체 이메일 회신 (Mailgun inbound)
  vendorReportBody: string | null
  vendorReportParsedCost: number | null
  vendorReportReceivedAt: Date | null
  // 수리 완료 보고서 (벤더 제출)
  completionReport: RepairCompletionReportDetail | null
}

export type MaintenanceType = 'REPAIR' | 'INSPECTION' | 'UPGRADE'

export interface CreateMaintenanceInput {
  assetId: string
  title: string
  description: string
  scheduledAt: Date
  vendorId?: string
  type?: MaintenanceType
}

export interface UpdateMaintenanceInput {
  title?: string
  description?: string
  scheduledAt?: Date
  vendorId?: string | null
  // 처리자(기술자) — APPROVED → IN_PROGRESS 전이 시 함께 지정
  managerId?: string | null
  status?: MaintenanceStatus
  // 서비스 유형 + 과실 판단 (업체 접수 후 자산담당자 입력)
  serviceType?: MaintenanceServiceType | null
  isUserFault?: boolean | null
  cost?: number | null
  // COMPLETED 시 payer 정보
  payerType?: MaintenancePayer | null
  payerUserId?: string | null
  payerNote?: string | null
  // COMPLETED 처리 시 자산관리자·수리기술자가 최종 컨디션 평가
  conditionAfter?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  // COMPLETED 전이 시 필수 — 벤더 제출 수리 완료 보고서
  completionReport?: RepairCompletionReportInput
}

export interface ListMaintenancesQuery {
  assetId?: string
  status?: MaintenanceStatus
  managerId?: string
  vendorId?: string
  keyword?: string
  page?: number
  pageSize?: number
}

export type { RequesterContext } from '../../lib/requestHelpers'

export type { PaginatedResult } from '../../lib/pagination'
