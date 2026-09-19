import crypto from 'crypto'
import { logger } from './logger'

export type SensitiveAction =
  | 'ROLE_CHANGE'           // 사용자 역할 변경
  | 'VENDOR_APPROVE'        // 수리업체 승인
  | 'VENDOR_REJECT'         // 수리업체 반려
  | 'VENDOR_BLACKLIST'      // 수리업체 블랙리스트
  | 'LICENSE_KEY_ACCESS'    // 라이선스 키 평문 조회
  | 'BANK_ACCOUNT_ACCESS'   // 은행계좌 평문 조회
  | 'USER_DEACTIVATE'       // 사용자 비활성화
  | 'USER_ACTIVATE'         // 사용자 활성화
  | 'ASSET_RETIRE'          // 자산 폐기

export interface SensitiveAuditEntry {
  action: SensitiveAction
  performedById: string
  performedByRole: string
  targetId: string
  targetType: string
  detail?: string
  timestamp: string
  ipAddress?: string | null
}

/**
 * 민감 작업을 HMAC-서명된 JSON 로그로 기록.
 * 서명키: SENSITIVE_LOG_SECRET 환경변수
 * 로그 구조: { payload: base64(json), sig: hmac }
 */
export function logSensitiveAction(entry: SensitiveAuditEntry): void {
  const secret = process.env['SENSITIVE_LOG_SECRET'] ?? 'dev-secret'
  const payload = Buffer.from(JSON.stringify(entry), 'utf8').toString('base64')
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  logger.warn(
    {
      sensitiveAudit: true,
      payload,
      sig,
      action: entry.action,         // 검색 가능 필드는 plaintext로
      targetType: entry.targetType,
    },
    '[SENSITIVE_AUDIT]',
  )
}
