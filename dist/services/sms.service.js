"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const logger_1 = require("../lib/logger");
class SmsService {
    static NAVER_ENDPOINT = 'https://sens.apigw.ntruss.com';
    static async sendSms(phoneNumber, message) {
        if (!env_1.env.sms.serviceId || !env_1.env.sms.accessKey) {
            logger_1.logger.warn({ phoneNumber, messageLength: message.length }, '[DEV] SMS 미설정 — 전송 스킵');
            return true;
        }
        try {
            const timestamp = Date.now().toString();
            const signature = this.generateSignature(timestamp);
            const body = {
                type: 'SMS',
                countryCode: '82',
                from: env_1.env.sms.fromNumber,
                content: message,
                messages: [{ to: phoneNumber }],
            };
            const response = await fetch(`${this.NAVER_ENDPOINT}/sms/v2/services/${env_1.env.sms.serviceId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-ncp-apigw-timestamp': timestamp,
                    'x-ncp-iam-access-key': env_1.env.sms.accessKey,
                    'x-ncp-apigw-signature-v2': signature,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                const error = await response.text();
                logger_1.logger.error({ phoneNumber, status: response.status, error }, 'SMS 전송 실패');
                return false;
            }
            logger_1.logger.info({ phoneNumber }, 'SMS 전송 성공');
            return true;
        }
        catch (err) {
            logger_1.logger.error({ phoneNumber, error: err instanceof Error ? err.message : String(err) }, 'SMS 전송 중 예외 발생');
            return false;
        }
    }
    static generateSignature(timestamp) {
        const message = `POST /sms/v2/services/${env_1.env.sms.serviceId}/messages\n${timestamp}`;
        return crypto_1.default
            .createHmac('sha256', env_1.env.sms.secretKey)
            .update(message)
            .digest('base64');
    }
}
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map