import type { DisposalStatus, DisposalReason, AssetStatus, AssetClass } from '../../generated/prisma/enums'

// ADR 0006 — 폐기 판단 기준 체크리스트 (응답 shape)
export interface DisposalCriteria {
  lowBookValue: boolean
  severeDamage: boolean
  supportEnded: boolean
  noAlternative: boolean
}

export interface DisposalEvidenceItem {
  id: string
  url: string
  label: string | null
  uploadedAt: Date
}

export interface DisposalListItem {
  id: string
  status: DisposalStatus
  reason: DisposalReason
  note: string | null
  journalEntryNumber: string | null
  assetId: string
  assetCode: string
  assetName: string
  requestedById: string
  requestedByName: string
  createdAt: Date
  updatedAt: Date
}

export interface DisposalDetail extends DisposalListItem {
  previousStatus: AssetStatus
  managerApprovedAt: Date | null
  managerApprovedById: string | null
  managerApprovedByName: string | null
  approvedAt: Date | null
  approvedById: string | null
  approvedByName: string | null
  completedAt: Date | null
  rejectedAt: Date | null
  rejectedById: string | null
  rejectedByName: string | null
  rejectReason: string | null
  cancelledAt: Date | null
  evidences: DisposalEvidenceItem[]
  // ADR 0006
  criteria: DisposalCriteria | null
  // IT_ASSET 폐기 완료 가드용
  assetClass: AssetClass | null
}

export type { PaginatedResult } from '../../lib/pagination'
export type { RequesterContext } from '../../lib/requestHelpers'
