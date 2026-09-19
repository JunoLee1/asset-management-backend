export type SensitiveAction = 'ROLE_CHANGE' | 'VENDOR_APPROVE' | 'VENDOR_REJECT' | 'VENDOR_BLACKLIST' | 'LICENSE_KEY_ACCESS' | 'BANK_ACCOUNT_ACCESS' | 'USER_DEACTIVATE' | 'USER_ACTIVATE' | 'ASSET_RETIRE';
export interface SensitiveAuditEntry {
    action: SensitiveAction;
    performedById: string;
    performedByRole: string;
    targetId: string;
    targetType: string;
    detail?: string;
    timestamp: string;
    ipAddress?: string | null;
}
/**
 * 민감 작업을 HMAC-서명된 JSON 로그로 기록.
 * 서명키: SENSITIVE_LOG_SECRET 환경변수
 * 로그 구조: { payload: base64(json), sig: hmac }
 */
export declare function logSensitiveAction(entry: SensitiveAuditEntry): void;
//# sourceMappingURL=sensitiveAuditLog.d.ts.map