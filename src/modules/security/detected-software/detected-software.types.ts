import type { DetectedSoftwareStatus } from '../../../generated/prisma/enums'

export interface DetectedSoftwareListItem {
  id: string
  deviceId: string
  deviceHostname: string
  processName: string
  version: string | null
  manufacturer: string | null
  os: string | null
  detectedAt: Date
  status: DetectedSoftwareStatus
  createdAt: Date
}

export interface ListDetectedSoftwareQuery {
  status?: DetectedSoftwareStatus
  page?: number
  pageSize?: number
}

export interface ListDetectedSoftwareResult {
  items: DetectedSoftwareListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
