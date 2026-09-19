import type { RepairReportType, RepairReportStatus } from '../../generated/prisma/enums'

export interface RepairReportListItem {
  id: string
  type: RepairReportType
  status: RepairReportStatus
  year: number
  month: number | null
  startDate: Date | null
  endDate: Date | null
  title: string
  authorName: string
  submittedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface RepairStats {
  totalReceived: number
  completed: number
  inProgress: number
  cancelled: number
  avgDays: number
  totalCost: number
  byPayer: { COMPANY: number; USER: number; SHARED: number; NONE: number }
  byServiceType: {
    PAID_REPAIR: number
    FREE_REPAIR: number
    REPLACEMENT: number
    RETURN: number
    NONE: number
  }
  byVendor: Array<{ name: string; total: number; completed: number }>
  byMonth: Array<{ key: string; label: string; received: number; completed: number }>
}

export interface RepairReportDetail extends RepairReportListItem {
  comment: string | null
  stats: RepairStats
  adminAckedAt: Date | null
  assetManagerAckedAt: Date | null
}

export interface CreateRepairReportInput {
  type: RepairReportType
  year: number
  month?: number
  startDate?: Date
  endDate?: Date
  title: string
  comment?: string
}

export interface UpdateRepairReportInput {
  title?: string
  comment?: string | null
  status?: RepairReportStatus
}

export interface ListRepairReportsQuery {
  type?: RepairReportType
  status?: RepairReportStatus
  year?: number
  page?: number
  pageSize?: number
}
