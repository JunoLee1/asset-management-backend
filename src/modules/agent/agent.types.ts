// ADR 0011/0012 — Agent 도메인 타입

export interface CollectItem {
  processName: string
  version?: string
  manufacturer?: string
  os?: string
  detectedAt: string  // ISO datetime
}

export interface CollectPayload {
  hostname: string
  userId?: string
  items: CollectItem[]
}

export interface CollectResult {
  deviceId: string
  created: number   // 신규 DetectedSoftware 수
  updated: number   // 버전 갱신된 수
  skipped: number   // 버전 동일하여 무시된 수
}

export interface BlockListResult {
  blockedProcessNames: string[]
}

export interface AgentIngestResult {
  deviceId: string
  matched: number   // Software 카탈로그 매칭된 수
  created: number   // 신규 DetectedSoftware 수
  updated: number   // 버전 갱신된 DetectedSoftware 수
  skipped: number   // 버전 동일 무시된 수
}

export interface BlockEventPayload {
  userId: string
  softwareId: string
  deviceId: string
  processName: string
  occurredAt: string  // ISO datetime
}
