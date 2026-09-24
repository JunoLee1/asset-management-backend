// ADR 0002 — Shadow IT 인벤토리 도메인 타입

import type {
  SoftwareType,
  SoftwarePermissionStatus,
  JobType,
} from '../../../generated/prisma/enums'

export type { JobType }

export interface SoftwareListItem {
  id: string
  name: string
  vendor: string | null
  type: SoftwareType
  category: string
  executedOs: string | null   // 한 SW 의 첫 instance 의 OS (대표값)
  userCount: number           // distinct userId count of instances
  firstDiscoveredAt: Date | null  // 가장 이른 instance 의 firstDiscoveredAt
  lastUsedAt: Date | null         // 가장 늦은 instance 의 lastUsedAt
  permissionStatus: SoftwarePermissionStatus
  licenseCoverage: boolean | null
}

export interface SoftwareDetail extends SoftwareListItem {
  description: string | null
  licenseCoverage: boolean | null
  suggestedJobTypes: JobType[]
  createdAt: Date
  updatedAt: Date
}

export interface ListSoftwareQuery {
  type?: SoftwareType
  q?: string
  permissionStatus?: SoftwarePermissionStatus
  licenseCoverage?: boolean | null
}

export interface UpdateSoftwareInput {
  name?: string
  vendor?: string | null
  type?: SoftwareType
  category?: string
  description?: string | null
  licenseCoverage?: boolean | null
  suggestedJobTypes?: JobType[]
}

export interface CreateSoftwareInput {
  name: string
  vendor?: string | null
  type?: SoftwareType
  category?: string
  description?: string | null
  licenseCoverage?: boolean | null
  suggestedJobTypes?: JobType[]
}

export interface UpdatePermissionInput {
  status: SoftwarePermissionStatus
  reason?: string
}

// Ingest — endpoint agent push 페이로드 (가정 2: PC 1대 = 1 request)
export interface IngestPayload {
  hostname: string
  userId?: string  // 미지정 가능 (alias 일 수도)
  items: IngestItem[]
}

export interface IngestItem {
  name: string
  vendor?: string
  executedOs: string
  lastUsedAt?: string  // ISO. 미지정 시 now
  firstSeenAt?: string // ISO. 미지정 시 now
  durationSec?: number
}

export interface IngestResult {
  deviceId: string
  newSoftwareCount: number       // 신규 카탈로그 등록 수
  newInstanceCount: number       // 신규 인스턴스 수
  updatedInstanceCount: number   // 기존 인스턴스 lastUsedAt 갱신 수
}

export interface BlockEventItem {
  id: string
  userId: string
  userName: string | null
  deviceId: string
  deviceHostname: string
  processName: string
  occurredAt: Date
  createdAt: Date
}

export interface ListBlockEventsResult {
  items: BlockEventItem[]
  total: number
}
