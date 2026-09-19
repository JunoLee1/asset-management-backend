import type { AssetAction, MaintenanceStatus } from '../../generated/prisma/enums'

export interface DashboardStats {
  totalAssets: number
  activeAssets: number
  underMaintenance: number
  thisMonthRegistered: number
  pendingApprovalCount: number
  pendingInspectionCount: number
}

export interface CategoryStat {
  name: string
  count: number
  // 자산군 — 차트에서 색상 그룹화 (IT 파랑·사무 초록·시설 주황·네트워크 보라)
  class: 'IT_ASSET' | 'OFFICE_ASSET' | 'FACILITY_ASSET' | 'NETWORK_ASSET' | null
}

export interface DepartmentStat {
  name: string
  count: number
}

export interface AlertItem {
  id: string
  assetCode: string
  assetName: string
  title: string
  status: MaintenanceStatus
  scheduledAt: Date
}

export interface HistoryItem {
  id: string
  assetCode: string
  assetName: string
  action: AssetAction
  performedBy: string
  createdAt: Date
}

export interface TeamStat {
  id: string
  name: string
  assignedCount: number  // 팀원에게 배정된 자산
  totalCount: number     // 부서 내 팀 소속 자산 (departmentId 기준 중 팀원 배정분)
}

export interface RepairDashboardStats {
  pendingAdminCount: number
  inProgressCount: number
  thisMonthCompletedCount: number
}

export interface VendorStat {
  vendorId: string
  vendorName: string
  count: number
}

export interface RepairHistoryItem {
  id: string
  assetCode: string
  assetName: string
  title: string
  status: MaintenanceStatus
  vendorName: string | null
  scheduledAt: Date
  completedAt: Date | null
}

export interface DashboardData {
  stats: DashboardStats
  byCategory: CategoryStat[]
  byDepartment: DepartmentStat[]
  alerts: AlertItem[]
  recentHistory: HistoryItem[]
  recentHistoryMyTeam?: HistoryItem[] // TEAM_LEAD 전용: 내 팀원 행동 이력
  byTeam?: TeamStat[]                 // DEPT_LEAD 전용: 팀별 배정 자산 수
  byCategoryDept?: CategoryStat[]     // DEPT_LEAD 전용: 부서원 배정 자산 카테고리별
  scopeLabel?: string                 // 현재 필터 범위 레이블 (예: "IT본부", "개발팀")
  repairStats?: RepairDashboardStats  // REPAIR_OWNER 전용
  byVendor?: VendorStat[]             // REPAIR_OWNER 전용: 업체별 처리 건수
  recentRepairHistory?: RepairHistoryItem[] // REPAIR_OWNER 전용: 최근 수리 이력
}
