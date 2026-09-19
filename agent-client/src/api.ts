// ADR 0011/0012 — ERP 서버 API 호출 모듈
import axios, { type AxiosInstance } from 'axios'
import type { ScannedItem } from './scanner'

export interface CollectItem {
  processName: string
  version?: string
  manufacturer?: string
  os?: string
  detectedAt: string // ISO 8601
}

export interface IngestPayload {
  hostname: string
  userId?: string
  items: CollectItem[]
}

export interface IngestResult {
  deviceId: string
  matched: number
  created: number
  updated: number
  skipped: number
}

export interface BlockListResult {
  blockedProcessNames: string[]
}

export interface BlockEventPayload {
  userId: string
  softwareId: string
  deviceId: string
  processName: string
  occurredAt: string // ISO 8601
}

export class AgentApiClient {
  private readonly http: AxiosInstance
  private token: string | null = null

  constructor(apiUrl: string) {
    this.http = axios.create({
      baseURL: apiUrl,
      timeout: 15_000,
    })
  }

  async login(email: string, password: string): Promise<void> {
    const { data } = await this.http.post<{ accessToken: string }>('/auth/login', {
      email,
      password,
    })
    this.token = data.accessToken
    this.http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
  }

  async getBlockList(): Promise<BlockListResult> {
    // 인증 불필요 — Authorization 헤더 있어도 무방
    const { data } = await this.http.get<BlockListResult>('/agent/block-list')
    return data
  }

  async ingest(payload: IngestPayload): Promise<IngestResult> {
    const { data } = await this.http.post<IngestResult>('/agent/ingest', payload)
    return data
  }

  async reportBlockEvent(payload: BlockEventPayload): Promise<void> {
    await this.http.post('/agent/block-events', payload)
  }

  scannedToCollectItems(items: ScannedItem[]): CollectItem[] {
    const now = new Date().toISOString()
    return items.map((item) => ({
      processName: item.processName,
      version: item.version,
      manufacturer: item.manufacturer,
      os: item.os,
      detectedAt: now,
    }))
  }
}
