export type LicenseCoverage = 'COVERED' | 'NOT_COVERED' | 'PARTIAL' | 'EXPIRED'

export type Currency = 'KRW' | 'USD' | 'EUR' | 'GBP' | 'JPY'

export interface LicenseListItem {
  id: string
  name: string
  vendorName: string | null
  seatsTotal: number
  seatsUsed: number
  coverage: LicenseCoverage
  expiryDate: Date | null
  purchaseDate: Date
  cost: number | null
  currency: Currency
  productKeyMask: string | null
  createdAt: Date
}

export interface SoftwareLinkItem {
  id: string
  softwareId: string
  softwareName: string
}

export interface LicenseDetail extends LicenseListItem {
  vendorId: string | null
  productKey: string | null // 평문 (ADMIN 만 reveal)
  updatedAt: Date
  assignments: LicenseAssignmentDetail[]
  softwares: SoftwareLinkItem[]
  coreDepartmentIds: string[]
  coreJobTypes: JobType[]
}

export const calculateLicenseCoverage = (
  seatsUsed: number,
  seatsTotal: number,
  expiryDate: Date | null,
): LicenseCoverage => {
  if (expiryDate && expiryDate < new Date()) {
    return 'EXPIRED'
  }
  if (seatsUsed > seatsTotal) {
    return 'NOT_COVERED'
  }
  if (seatsUsed >= seatsTotal * 0.8) {
    return 'PARTIAL'
  }
  return 'COVERED'
}

export interface LicenseAssignmentDetail {
  id: string
  userId: string
  userName: string
  userEmail: string
  assetId: string | null
  assetCode: string | null
  assetName: string | null
  assignedAt: Date
  unassignedAt: Date | null
}

export interface CreateLicenseInput {
  name: string
  productKey?: string
  vendorId?: string
  seatsTotal: number
  purchaseDate: Date
  expiryDate?: Date
  cost?: number
  currency?: Currency
  softwareIds?: string[]
  coreDepartmentIds?: string[]
  coreJobTypes?: JobType[]
}

export interface UpdateLicenseInput {
  name?: string
  productKey?: string | null
  vendorId?: string | null
  seatsTotal?: number
  purchaseDate?: Date
  expiryDate?: Date | null
  cost?: number | null
  currency?: Currency
  coreDepartmentIds?: string[]
  coreJobTypes?: JobType[]
}

export interface ListLicensesQuery {
  vendorId?: string
  q?: string
  page?: number
  pageSize?: number
}

export interface AssignLicenseInput {
  userId: string
  assetId?: string
}

export type { RequesterContext } from '../../lib/requestHelpers'

export type { PaginatedResult } from '../../lib/pagination'

import type { LicenseRequestStatus, JobType } from '../../generated/prisma/enums'
export type { LicenseRequestStatus, JobType }

export type LicensePriorityTier = 'CORE' | 'DEFAULT'

export interface LicenseRequestItem {
  id: string
  licenseId: string
  licenseName: string
  requestedById: string
  requestedByName: string
  targetUserId: string
  targetUserName: string
  assetId: string | null
  assetCode: string | null
  status: LicenseRequestStatus
  priorityTier: LicensePriorityTier
  priorityScore: number
  managerApprovedById: string | null
  managerApprovedByName: string | null
  managerApprovedAt: Date | null
  deptApprovedById: string | null
  deptApprovedByName: string | null
  deptApprovedAt: Date | null
  securityReviewedById: string | null
  securityReviewedByName: string | null
  securityReviewedAt: Date | null
  adminApprovedById: string | null
  adminApprovedByName: string | null
  adminApprovedAt: Date | null
  rejectedById: string | null
  rejectedByName: string | null
  rejectedAt: Date | null
  rejectReason: string | null
  createdAt: Date
}

export interface CreateLicenseRequestInput {
  targetUserId: string
  assetId?: string
}

export interface RejectLicenseRequestInput {
  reason?: string
}

export interface ListLicenseRequestsQuery {
  status?: LicenseRequestStatus
}
