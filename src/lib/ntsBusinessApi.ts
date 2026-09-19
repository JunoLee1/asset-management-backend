/**
 * 국세청 사업자등록 상태조회 API 래퍼
 * API: https://api.odcloud.kr/api/nts-businessman/v1/status
 * 문서: https://www.data.go.kr/data/15081808/openapi.do
 */

export type BrnStatus = 'ACTIVE' | 'SUSPENDED' | 'CLOSED' | 'UNKNOWN' | 'API_KEY_MISSING' | 'ERROR'

export interface BrnValidationResult {
  status: BrnStatus
  /** 국세청 원문 상태명 (예: "계속사업자", "휴업자", "폐업자") */
  statusLabel: string
  /** 사업자 유형 (예: "부가가치세 일반과세자") */
  taxType: string | null
  /** 조회된 사업자번호 */
  bNo: string
}

const STATUS_MAP: Record<string, BrnStatus> = {
  '01': 'ACTIVE',    // 계속사업자
  '02': 'SUSPENDED', // 휴업자
  '03': 'CLOSED',    // 폐업자
}

/** 하이픈 제거 후 10자리 숫자 여부 검증 */
export function normalizeBrn(raw: string): string | null {
  const digits = raw.replace(/-/g, '')
  return /^\d{10}$/.test(digits) ? digits : null
}

export async function validateBrn(bNo: string): Promise<BrnValidationResult> {
  const apiKey = process.env['NTS_API_KEY']

  if (!apiKey) {
    return { status: 'API_KEY_MISSING', statusLabel: 'API 키 미설정', taxType: null, bNo }
  }

  const normalized = normalizeBrn(bNo)
  if (!normalized) {
    return { status: 'UNKNOWN', statusLabel: '잘못된 번호 형식', taxType: null, bNo }
  }

  try {
    const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${encodeURIComponent(apiKey)}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ b_no: [normalized] }),
    })

    if (!res.ok) {
      return { status: 'ERROR', statusLabel: `HTTP ${res.status}`, taxType: null, bNo: normalized }
    }

    const json = await res.json() as {
      status_code: string
      data?: Array<{ b_no: string; b_stt: string; b_stt_cd: string; tax_type: string }>
    }

    const record = json.data?.[0]
    if (!record) {
      return { status: 'UNKNOWN', statusLabel: '조회 결과 없음', taxType: null, bNo: normalized }
    }

    return {
      status: STATUS_MAP[record.b_stt_cd] ?? 'UNKNOWN',
      statusLabel: record.b_stt || '알 수 없음',
      taxType: record.tax_type || null,
      bNo: normalized,
    }
  } catch (err) {
    return { status: 'ERROR', statusLabel: '네트워크 오류', taxType: null, bNo: normalized }
  }
}
