"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSensitiveAction = logSensitiveAction;
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = require("./logger");
/**
 * 민감 작업을 HMAC-서명된 JSON 로그로 기록.
 * 서명키: SENSITIVE_LOG_SECRET 환경변수
 * 로그 구조: { payload: base64(json), sig: hmac }
 */
function logSensitiveAction(entry) {
    const secret = process.env['SENSITIVE_LOG_SECRET'] ?? 'dev-secret';
    const payload = Buffer.from(JSON.stringify(entry), 'utf8').toString('base64');
    const sig = crypto_1.default.createHmac('sha256', secret).update(payload).digest('hex');
    logger_1.logger.warn({
        sensitiveAudit: true,
        payload,
        sig,
        action: entry.action, // 검색 가능 필드는 plaintext로
        targetType: entry.targetType,
    }, '[SENSITIVE_AUDIT]');
}
//# sourceMappingURL=sensitiveAuditLog.js.map