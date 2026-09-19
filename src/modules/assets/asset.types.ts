import type {
  AssetClass,
  AssetStatus,
  AssetCondition,
  AssetOwnershipType,
} from '../../generated/prisma/enums'

export interface AssetListItem {
  id: string
  assetCode: string
  name: string
  class: AssetClass
  status: AssetStatus
  condition: AssetCondition
  categoryName: string
  glAccountCode: string | null
  departmentName: string
  locationName: string
  assignedUserName: string | null
  updatedAt: Date
}

export interface AssetDetail extends Omit<
  AssetListItem,
  'categoryName' | 'glAccountCode' | 'departmentName' | 'locationName' | 'assignedUserName'
> {
  description: string | null
  conditionAssessedAt: Date | null
  ownershipType: AssetOwnershipType
  purchaseDate: Date
  purchasePrice: number
  currentValue: number | null
  imageUrl: string | null
  category: {
    id: string
    name: string
    code: string
    glAccountCode: string | null
    glAccountName: string | null
  }
  department: { id: string; name: string; code: string }
  location: { id: string; name: string; building: string }
  vendor: { id: string; name: string } | null
  assignedUser: { id: string; name: string; email: string } | null
  hardware: HardwareDetail | null
  software: SoftwareDetail | null
  peripheral: PeripheralDetail | null
  office: OfficeDetail | null
  facility: FacilityDetail | null
  histories: AssetHistoryDetail[]
  createdAt: Date
  updatedAt: Date
  // catalog (모델 마스터) 정보 — Asset 이 catalog 에 연결된 경우만
  catalog: { id: string; name: string; modelCode: string | null } | null
  // 같은 catalog 의 자산 수 (catalog 가 null 이면 null)
  sameCatalogCount: number | null
}

// GET /assets/stats/by-model 응답 항목 — AssetCatalog 별 자산 카운트
export interface ModelStatsItem {
  catalogId: string
  name: string
  modelCode: string | null
  class: AssetClass
  categoryName: string
  manufacturerName: string | null
  count: number
}

export interface ModelStatsResponse {
  items: ModelStatsItem[]
  orphanedCount: number
}

export interface AssetHistoryDetail {
  id: string
  action: import('../../generated/prisma/enums').AssetAction
  description: string | null
  metadata: unknown
  createdAt: Date
  performedBy: { id: string; name: string }
}

export interface HardwareDetail {
  serialNo: string
  macAddr: string | null
  ipAddr: string | null
  cpu: string | null
  ramGb: number | null
  storageGb: number | null
  warrantyEnd: Date | null
}

export interface SoftwareDetail {
  licenseKey: string
  licenseSeats: number
  installedCount: number
  expiryDate: Date | null
  version: string | null
}

export interface PeripheralDetail {
  serialNo: string | null
  quantity: number
}

export interface OfficeDetail {
  modelName: string
}

export interface FacilityDetail {
  installLocationDetail: string
  installDate: Date
  inspectionCycleMonths: number
  nextInspectionDate: Date
}

export type { RequesterContext } from '../../lib/requestHelpers'

export type { PaginatedResult } from '../../lib/pagination'
