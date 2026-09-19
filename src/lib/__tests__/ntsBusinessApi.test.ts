import { normalizeBrn, validateBrn, type BrnValidationResult } from '../ntsBusinessApi'

// fetch 전역 모킹
global.fetch = jest.fn()
const mockFetch = fetch as jest.Mock

beforeEach(() => jest.clearAllMocks())

// ---------- normalizeBrn ----------
describe('normalizeBrn', () => {
  it('하이픈 포함 → 10자리 숫자 반환', () => {
    expect(normalizeBrn('123-45-67890')).toBe('1234567890')
  })
  it('하이픈 없는 10자리 → 그대로 반환', () => {
    expect(normalizeBrn('1234567890')).toBe('1234567890')
  })
  it('9자리 → null', () => {
    expect(normalizeBrn('123456789')).toBeNull()
  })
  it('문자 포함 → null', () => {
    expect(normalizeBrn('123-45-6789X')).toBeNull()
  })
})

// ---------- validateBrn ----------
describe('validateBrn — API 키 없음', () => {
  it('NTS_API_KEY 미설정 → API_KEY_MISSING 반환', async () => {
    delete process.env['NTS_API_KEY']
    const result = await validateBrn('1234567890')
    expect(result.status).toBe('API_KEY_MISSING')
    expect(mockFetch).not.toHaveBeenCalled()
  })
})

describe('validateBrn — API 응답 분기', () => {
  beforeEach(() => { process.env['NTS_API_KEY'] = 'test-key' })
  afterEach(() => { delete process.env['NTS_API_KEY'] })

  it('b_stt_cd=01 → ACTIVE (계속사업자)', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        status_code: 'OK',
        data: [{ b_no: '1234567890', b_stt: '계속사업자', b_stt_cd: '01', tax_type: '부가가치세 일반과세자' }],
      }),
    })
    const result = await validateBrn('123-45-67890')
    expect(result.status).toBe('ACTIVE')
    expect(result.statusLabel).toBe('계속사업자')
    expect(result.taxType).toBe('부가가치세 일반과세자')
  })

  it('b_stt_cd=02 → SUSPENDED (휴업자)', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ status_code: 'OK', data: [{ b_no: '1234567890', b_stt: '휴업자', b_stt_cd: '02', tax_type: '' }] }),
    })
    const result = await validateBrn('1234567890')
    expect(result.status).toBe('SUSPENDED')
  })

  it('b_stt_cd=03 → CLOSED (폐업자)', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ status_code: 'OK', data: [{ b_no: '1234567890', b_stt: '폐업자', b_stt_cd: '03', tax_type: '' }] }),
    })
    const result = await validateBrn('1234567890')
    expect(result.status).toBe('CLOSED')
  })

  it('data 없음 → UNKNOWN', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ status_code: 'OK', data: [] }) })
    const result = await validateBrn('1234567890')
    expect(result.status).toBe('UNKNOWN')
  })

  it('HTTP 오류 → ERROR', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 })
    const result = await validateBrn('1234567890')
    expect(result.status).toBe('ERROR')
  })

  it('fetch 예외 → ERROR', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))
    const result = await validateBrn('1234567890')
    expect(result.status).toBe('ERROR')
    expect(result.statusLabel).toBe('네트워크 오류')
  })

  it('잘못된 번호 형식 → UNKNOWN (fetch 호출 안 함)', async () => {
    const result = await validateBrn('12345')
    expect(result.status).toBe('UNKNOWN')
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
