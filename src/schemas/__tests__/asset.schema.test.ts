import { createAssetSchema, updateAssetSchema, listAssetsQuerySchema } from '../asset.schema'

const baseCore = {
  assetCode: 'IT-0001',
  name: 'MacBook Pro 16',
  categoryId: 'cat-1',
  catalogId: 'catalog-1',
  departmentId: 'dept-1',
  locationId: 'loc-1',
  purchaseDate: '2024-01-01T00:00:00.000Z',
  purchasePrice: 1500000,
}

// ── createAssetSchema ────────────────────────────────────────────────────────
// 전용 필드(hardware/software/peripheral)는 category.subType 기준으로 서비스에서 검증
// 스키마 레이어에서는 class(IT_ASSET/OFFICE_ASSET/FACILITY_ASSET)만 검증
describe('createAssetSchema', () => {
  it('IT_ASSET class + hardware 필드를 받는다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      class: 'IT_ASSET',
      hardware: { serialNo: 'MBP123', cpu: 'M3', ramGb: 32 },
    })
    expect(result.success).toBe(true)
  })

  it('IT_ASSET class + software 필드를 받는다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      assetCode: 'IT-0002',
      class: 'IT_ASSET',
      software: { licenseKey: 'XXX-YYY', licenseSeats: 10 },
    })
    expect(result.success).toBe(true)
  })

  it('IT_ASSET class + peripheral 필드를 받는다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      assetCode: 'IT-0003',
      class: 'IT_ASSET',
      peripheral: { quantity: 5 },
    })
    expect(result.success).toBe(true)
  })

  it('OFFICE_ASSET class는 전용 필드 없이 통과한다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      assetCode: 'OFF-0001',
      class: 'OFFICE_ASSET',
    })
    expect(result.success).toBe(true)
  })

  it('FACILITY_ASSET class는 전용 필드 없이 통과한다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      assetCode: 'FAC-0001',
      class: 'FACILITY_ASSET',
    })
    expect(result.success).toBe(true)
  })

  it('SOFTWARE 전용 필드에서 licenseKey가 빈 문자열이면 거부한다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      assetCode: 'IT-0002',
      class: 'IT_ASSET',
      software: { licenseKey: '', licenseSeats: 1 },
    })
    expect(result.success).toBe(false)
  })

  it('assetCode가 빈 문자열이면 통과한다 (서버에서 자동 채번)', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      assetCode: '',
      class: 'IT_ASSET',
      hardware: { serialNo: 'X' },
    })
    expect(result.success).toBe(true)
  })

  it('assetCode를 누락해도 통과한다 (자동 채번)', () => {
    const { assetCode, ...rest } = baseCore
    void assetCode
    const result = createAssetSchema.safeParse({
      ...rest,
      class: 'IT_ASSET',
      hardware: { serialNo: 'X' },
    })
    expect(result.success).toBe(true)
  })

  it('잘못된 condition은 거부한다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      condition: 'TERRIBLE',
      class: 'IT_ASSET',
      hardware: { serialNo: 'X' },
    })
    expect(result.success).toBe(false)
  })

  it('잘못된 class 값은 거부한다', () => {
    const result = createAssetSchema.safeParse({
      ...baseCore,
      class: 'HARDWARE',
    })
    expect(result.success).toBe(false)
  })
})

// ── updateAssetSchema (전용 필드는 부분 업데이트만) ─────────────────────────────
describe('updateAssetSchema', () => {
  it('부분 업데이트 — name만 수정 가능', () => {
    const result = updateAssetSchema.safeParse({ name: '새 이름' })
    expect(result.success).toBe(true)
  })

  it('status 변경 가능', () => {
    const result = updateAssetSchema.safeParse({ status: 'OPERATING' })
    expect(result.success).toBe(true)
  })

  it('class는 변경 불가 (포함되면 거부)', () => {
    const result = updateAssetSchema.safeParse({ class: 'IT_ASSET' })
    expect(result.success).toBe(false)
  })

  it('assetCode는 변경 불가 (포함되면 거부)', () => {
    const result = updateAssetSchema.safeParse({ assetCode: 'NEW-001' })
    expect(result.success).toBe(false)
  })

  it('빈 객체는 거부한다', () => {
    const result = updateAssetSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})

// ── listAssetsQuerySchema ────────────────────────────────────────────────────
describe('listAssetsQuerySchema', () => {
  it('아무것도 없으면 기본값 (page=1, pageSize=20)을 채운다', () => {
    const result = listAssetsQuerySchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(1)
      expect(result.data.pageSize).toBe(20)
    }
  })

  it('숫자 문자열을 파싱한다 (쿼리스트링 호환)', () => {
    const result = listAssetsQuerySchema.safeParse({ page: '3', pageSize: '50' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(3)
      expect(result.data.pageSize).toBe(50)
    }
  })

  it('pageSize가 100 초과면 거부한다', () => {
    const result = listAssetsQuerySchema.safeParse({ pageSize: '150' })
    expect(result.success).toBe(false)
  })

  it('page가 0 이하면 거부한다', () => {
    const result = listAssetsQuerySchema.safeParse({ page: '0' })
    expect(result.success).toBe(false)
  })

  it('필터(class, status, condition)는 옵션', () => {
    const result = listAssetsQuerySchema.safeParse({
      class: 'IT_ASSET',
      status: 'OPERATING',
      condition: 'GOOD',
      q: 'macbook',
    })
    expect(result.success).toBe(true)
  })

  it('잘못된 status 값은 거부한다', () => {
    const result = listAssetsQuerySchema.safeParse({ status: 'INVALID' })
    expect(result.success).toBe(false)
  })

  it('잘못된 class 값(구 enum)은 거부한다', () => {
    const result = listAssetsQuerySchema.safeParse({ class: 'HARDWARE' })
    expect(result.success).toBe(false)
  })
})
