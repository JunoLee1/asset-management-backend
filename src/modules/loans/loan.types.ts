import type {
  LoanStatus,
  AssetCondition,
  LoanReturnCondition,
  AssetClass,
} from '../../generated/prisma/enums'

// FE 의 ReturnAction 과 호환 (S3 절충: BE 가 LoanReturnCondition → ReturnAction 매핑)
export type ReturnAction = 'OK' | 'NEEDS_REPAIR' | 'WRITE_OFF'

export type ResponseAssetCondition = AssetCondition

export interface LoanListItem {
  id: string
  status: LoanStatus
  assetId: string
  assetCode: string
  assetName: string
  assetClass: AssetClass
  assetCategoryName: string | null
  assetCondition: ResponseAssetCondition
  userId: string
  userName: string
  userEmail: string
  userDepartmentName: string | null
  departmentManagerName: string | null
  departmentManagerId: string | null
  departmentManagerIsOutOfOffice: boolean
  purpose: string | null
  dueDate: Date | null
  checkedOutAt: Date | null
  receivedAt: Date | null
  returnedAt: Date | null
  rejectReason: string | null
  recallReason: string | null
  createdAt: Date
  updatedAt: Date
}

// T2: 반납 timeline 4단계 전체 시점 + actor 노출
export interface LoanReturnDetail {
  id: string
  returnRequestedAt: Date // 항상 (LoanReturn 생성 시점 = 사원 반납 요청)
  conditionBefore: ResponseAssetCondition
  inspectedAt: Date | null // 검수 완료 시점
  inspectedByName: string | null // 검수자 (ASSET_MANAGER/ADMIN)
  conditionAfter: ResponseAssetCondition | null
  damageNote: string | null
  resultAction: ReturnAction | null
  returnApprovedAt: Date | null // MANAGER 반납 1차 승인
  returnApprovedByName: string | null
  finalizedAt: Date | null // ADMIN 최종 회수
  finalizedByName: string | null
  // 기존 호환 (후속 deprecation 검토)
  returnedAt: Date | null // = finalizedAt
  receivedByName: string // = finalizedByName ?? inspectedByName ?? ''
}

export interface LoanDetail extends LoanListItem {
  rejectReason: string | null
  recallReason: string | null
  checkoutMemo: string | null
  checkoutLocationId: string | null
  checkoutLocationName: string | null
  // L4: 대여 timeline 시점 (상세에서만 노출, list 는 무변경)
  managerApprovedAt: Date | null
  adminApprovedAt: Date | null
  cancelledAt: Date | null
  rejectedAt: Date | null
  recalledAt: Date | null
  loanReturn: LoanReturnDetail | null
}

export type { PaginatedResult } from '../../lib/pagination'
export type { RequesterContext } from '../../lib/requestHelpers'

// LoanReturnCondition → AssetCondition 매핑 (검수 결과 → 자산 condition 갱신)
// 가정: GOOD→GOOD, MINOR_DAMAGE→FAIR, MAJOR_DAMAGE→POOR, LOST→POOR (자산은 남지만 분실 상태)
export const CONDITION_MAP: Record<LoanReturnCondition, AssetCondition> = {
  GOOD: 'GOOD',
  MINOR_DAMAGE: 'FAIR',
  MAJOR_DAMAGE: 'POOR',
  LOST: 'LOST',
}

// LoanReturnCondition → ReturnAction 매핑 (FE 응답용)
export const ACTION_MAP: Record<LoanReturnCondition, ReturnAction> = {
  GOOD: 'OK',
  MINOR_DAMAGE: 'NEEDS_REPAIR',
  MAJOR_DAMAGE: 'NEEDS_REPAIR',
  LOST: 'WRITE_OFF',
}
