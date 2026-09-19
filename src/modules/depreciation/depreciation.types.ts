import type { DepreciationMethod } from '../../generated/prisma/enums'

export interface DepreciationDetail {
  id: string
  assetId: string
  assetCode: string
  assetName: string
  method: DepreciationMethod
  usefulLifeYears: number
  salvageValue: number
  annualRate: number
  purchasePrice: number | null
  purchaseDate: Date | null
  currentBookValue: number | null               // 가장 최근 fiscalYear의 bookValue
  createdAt: Date
  updatedAt: Date
  records: DepreciationRecordItem[]
}

export interface DepreciationRecordItem {
  fiscalYear: number
  depreciationAmount: number
  bookValue: number
  recordedAt: Date
}

export interface UpsertDepreciationInput {
  assetId: string
  method: DepreciationMethod
  usefulLifeYears: number
  salvageValue: number
  annualRate?: number                            // 미입력 시 자동 계산
}

export interface DepreciationListItem {
  assetId: string
  assetCode: string
  assetName: string
  method: DepreciationMethod
  usefulLifeYears: number
  annualRate: number
  purchasePrice: number | null
  salvageValue: number
  currentBookValue: number | null
  totalDepreciated: number | null
}

export interface ListDepreciationsParams {
  q?: string
  method?: DepreciationMethod
  page?: number
  pageSize?: number
}

export interface PaginatedDepreciations {
  items: DepreciationListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
