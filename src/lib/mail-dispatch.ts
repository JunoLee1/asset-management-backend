// 이메일 발송을 BullMQ 큐로 dispatch. Redis 미설정 시 즉시 발송 fallback.

import { getEmailQueue } from './queues'
import { sendMail } from './mailer'
import { logger } from './logger'

export interface DispatchMailInput {
  to: string
  subject: string
  html: string
}

// queue.add가 Redis 이슈로 예상보다 오래 걸리면 fallback으로 넘긴다.
// Producer connection의 fail-fast 설정과 함께 이중 방어선.
const QUEUE_ADD_TIMEOUT_MS = 2000

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`queue.add timed out after ${ms}ms`)), ms)
    p.then((v) => { clearTimeout(timer); resolve(v) })
     .catch((e) => { clearTimeout(timer); reject(e) })
  })
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
    await withTimeout(queue.add('send', input), QUEUE_ADD_TIMEOUT_MS)
  } catch (err) {
    logger.warn({ err, to: input.to }, '[mail-dispatch] queue add failed — fallback to direct')
    sendMail(input).catch((sendErr) => {
      logger.error({ err: sendErr, to: input.to }, '[mail-dispatch] fallback sendMail failed')
    })
  }
}
