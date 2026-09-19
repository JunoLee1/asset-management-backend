export interface DistributionItem {
  name: string
  count: number
}

export interface DistributionData {
  byStatus: DistributionItem[]
  byCondition: DistributionItem[]
  byClass: DistributionItem[]
}

export interface UtilizationItem {
  assetId: string
  assetCode: string
  name: string
  categoryName: string
  utilizationPct: number
  lastUsedAt: string | null
  isIdle: boolean
}

export interface UtilizationData {
  assets: UtilizationItem[]
  idleCount: number
  // 활동 점수 평균 (자산별 utilizationPct 의 평균) — 최근 활동 가까울수록 높음
  avgUtilizationPct: number
  // 가동률 (시점 비율): 운영중 자산 수 / 자산대장 등록 자산 수 × 100
  // 분자: status === OPERATING
  // 분모: status ∈ {OPERATING, IDLE, STANDBY, REPAIR, PENDING_DISPOSAL}
  //   (UNDER_CONSTRUCTION 은 CIP — 자산 인식 전, RETIRED 는 자산대장 제외)
  utilizationRatePct: number
  activeOpsCount: number
  totalRegisteredCount: number
}

export interface DepartmentValueItem {
  departmentId: string
  name: string
  assetCount: number
  totalValue: number
  memberCount: number
  valuePerMember: number
}

export interface DepartmentValueData {
  departments: DepartmentValueItem[]
  totalValue: number
}

export interface MaintenanceCostItem {
  assetId: string
  assetCode: string
  name: string
  purchasePrice: number
  totalCost: number
  costRatio: number
  maintenanceCount: number
}

export interface MaintenanceCostTrend {
  month: string
  totalCost: number
}

export interface MaintenanceCostData {
  topAssets: MaintenanceCostItem[]
  trend: MaintenanceCostTrend[]
  totalCost: number
}

export interface WarrantyExpiryItem {
  assetId: string
  assetCode: string
  name: string
  warrantyEnd: string
  daysLeft: number
}

export interface LicenseExpiryItem {
  licenseId: string
  name: string
  expiryDate: string
  daysLeft: number
  seatsTotal: number
  seatsUsed: number
}

export interface OverseatedLicenseItem {
  licenseId: string
  name: string
  seatsTotal: number
  seatsUsed: number
}

export interface ComplianceData {
  warrantyExpiry: WarrantyExpiryItem[]
  licenseExpiry: LicenseExpiryItem[]
  overseated: OverseatedLicenseItem[]
}

// 부서별 가동률 (자산 페이지 4 분할 — 각 탭 상단 KPI 카드용)
// 가동률 공식은 b66bb60 commit 정의 그대로 — class 필터만 추가.
export interface DepartmentUtilizationItem {
  departmentId: string
  departmentName: string
  activeOpsCount: number       // OPERATING
  totalRegisteredCount: number // OPERATING + IDLE + STANDBY + REPAIR + PENDING_DISPOSAL
  utilizationRatePct: number
}

export interface DepartmentUtilizationData {
  departments: DepartmentUtilizationItem[]
  overall: {
    activeOpsCount: number
    totalRegisteredCount: number
    utilizationRatePct: number
  }
}
