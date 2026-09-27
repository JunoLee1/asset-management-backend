// 이메일 발송을 BullMQ 큐로 dispatch. Redis 미설정 시 즉시 발송 fallback.

import { getEmailQueue } from './queues'
import { sendMail } from './mailer'
import { logger } from './logger'

export interface DispatchMailInput {
  to: string
  subject: string
  html: string
}

export async function dispatchMail(input: DispatchMailInput): Promise<void> {
  const queue = getEmailQueue()
  if (!queue) {
    // Redis 미설정 → 기존 fire-and-forget 발송 동작 유지
    sendMail(input).catch((err) => {
      logger.error({ err, to: input.to }, '[mail-dispatch] direct sendMail failed')
    })
    return
  }
  try {
    await queue.add('send', input)
  } catch (err) {
    logger.warn({ err, to: input.to }, '[mail-dispatch] queue add failed — fallback to direct')
    sendMail(input).catch((sendErr) => {
      logger.error({ err: sendErr, to: input.to }, '[mail-dispatch] fallback sendMail failed')
    })
  }
}
