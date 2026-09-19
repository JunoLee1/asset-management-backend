import { AppError } from '../../lib/AppError'
import { validateBrn } from '../../lib/ntsBusinessApi'

// 국세청 사업자 상태조회 API 검증 (공공데이터포털)
// 제출 시에만 호출 — 초안/수정 시는 스킵 (UI 검증으로 충분)
export const verifyBusinessRegistration = async (brn: string): Promise<void> => {
  if (!brn) throw new AppError(400, '사업자등록번호가 필요합니다.')

  const result = await validateBrn(brn)

  // API 키 미설정은 개발 환경 — 비차단
  if (result.status === 'API_KEY_MISSING') {
    console.warn('[NTS] API 키 미설정 — 개발 환경')
    return
  }

  // 형식 오류
  if (result.status === 'UNKNOWN') {
    throw new AppError(400, `잘못된 사업자등록번호 형식입니다.`)
  }

  // 네트워크 오류
  if (result.status === 'ERROR') {
    throw new AppError(503, '국세청 API 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
  }

  // 폐업 또는 휴업
  if (result.status === 'CLOSED') {
    throw new AppError(400, `사업자등록번호 ${brn}은 폐업 상태입니다.`)
  }

  if (result.status === 'SUSPENDED') {
    throw new AppError(400, `사업자등록번호 ${brn}은 휴업 상태입니다.`)
  }

  // 계속사업자 (ACTIVE) — OK
}
