import crypto from 'crypto'
import { env } from '../config/env'
import { logger } from '../lib/logger'

export class SmsService {
  private static readonly NAVER_ENDPOINT = 'https://sens.apigw.ntruss.com'

  // 해당 함수를 타 파일에서 호출시 new sendSms() 가 아니라 바로 사용하도록 
  static async sendSms(phoneNumber: string, message: string): Promise<boolean> {
    if (!env.sms.serviceId || !env.sms.accessKey) {
      logger.warn(
        { phoneNumber, messageLength: message.length },
        '[DEV] SMS 미설정 — 전송 스킵',
      )
      return true
    }

    try {
      const timestamp = Date.now().toString()
      const signature = this.generateSignature(timestamp)

      const body = {
        type: 'SMS',
        countryCode: '82',
        from: env.sms.fromNumber,
        content: message,
        messages: [{ to: phoneNumber }],
      }

      const response = await fetch(
        `${this.NAVER_ENDPOINT}/sms/v2/services/${env.sms.serviceId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': env.sms.accessKey,
            'x-ncp-apigw-signature-v2': signature,
          },
          body: JSON.stringify(body),
        },
      )

      if (!response.ok) {
        const error = await response.text()
        logger.error(
          { phoneNumber, status: response.status, error },
          'SMS 전송 실패',
        )
        return false
      }

      logger.info({ phoneNumber }, 'SMS 전송 성공')
      return true
    } catch (err) {
      logger.error(
        { phoneNumber, error: err instanceof Error ? err.message : String(err) },
        'SMS 전송 중 예외 발생',
      )
      return false
    }
  }

  private static generateSignature(timestamp: string): string {
    const message = `POST /sms/v2/services/${env.sms.serviceId}/messages\n${timestamp}`
    return crypto
      .createHmac('sha256', env.sms.secretKey)
      .update(message)
      .digest('base64')
  }
}
