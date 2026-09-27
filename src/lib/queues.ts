// BullMQ Queue 팩토리 — 3개 큐 정의:
//   - email: 이메일 발송 (재시도 3회, exponential backoff)
//   - sms: SMS 발송 (재시도 3회)
//   - scheduler: 5개 cron 잡 (재시도 없음, 다음 스케줄 대기)
//
// Redis 연결은 Phase 1의 getRedis() 대신 BullMQ 전용 별도 Connection 사용.
// BullMQ는 blocking 명령을 쓰므로 maxRetriesPerRequest: null / enableOfflineQueue: true 필요.

import { Queue, type QueueOptions } from 'bullmq'
import IORedis, { type Redis } from 'ioredis'
import { logger } from './logger'

export interface EmailJob {
  to: string
  subject: string
  html: string
}

export interface SmsJob {
  phoneNumber: string
  message: string
}

export type SchedulerJobName =
  | 'termination-check'
  | 'outbox-process'
  | 'overdue-check'
  | 'compliance-check'
  | 'license-expiry-check'

let connection: Redis | null = null
let emailQueue: Queue<EmailJob> | null = null
let smsQueue: Queue<SmsJob> | null = null
let schedulerQueue: Queue<Record<string, never>> | null = null

function getConnection(): Redis | null {
  if (connection) return connection
  const url = process.env['REDIS_URL']
  if (!url) {
    logger.warn('[bullmq] REDIS_URL not set — queues disabled (fire-and-forget fallback)')
    return null
  }
  connection = new IORedis(url, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: true,
  })
  connection.on('error', (err) => logger.error({ err: err.message }, '[bullmq] redis error'))
  return connection
}

const defaultJobOpts: QueueOptions['defaultJobOptions'] = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  removeOnComplete: { age: 60 * 60, count: 1000 },
  removeOnFail: { age: 24 * 60 * 60 },
}

export function getEmailQueue(): Queue<EmailJob> | null {
  if (emailQueue) return emailQueue
  const conn = getConnection()
  if (!conn) return null
  emailQueue = new Queue<EmailJob>('email', {
    connection: conn,
    defaultJobOptions: defaultJobOpts,
  })
  return emailQueue
}

export function getSmsQueue(): Queue<SmsJob> | null {
  if (smsQueue) return smsQueue
  const conn = getConnection()
  if (!conn) return null
  smsQueue = new Queue<SmsJob>('sms', {
    connection: conn,
    defaultJobOptions: defaultJobOpts,
  })
  return smsQueue
}

export function getSchedulerQueue(): Queue<Record<string, never>> | null {
  if (schedulerQueue) return schedulerQueue
  const conn = getConnection()
  if (!conn) return null
  schedulerQueue = new Queue<Record<string, never>>('scheduler', {
    connection: conn,
    defaultJobOptions: {
      attempts: 1,
      removeOnComplete: { age: 24 * 60 * 60, count: 100 },
      removeOnFail: { age: 7 * 24 * 60 * 60 },
    },
  })
  return schedulerQueue
}

/** 테스트/종료 시 리셋용. */
export async function _closeQueuesForTests(): Promise<void> {
  await Promise.all([
    emailQueue?.close().catch(() => undefined),
    smsQueue?.close().catch(() => undefined),
    schedulerQueue?.close().catch(() => undefined),
  ])
  await connection?.quit().catch(() => undefined)
  emailQueue = null
  smsQueue = null
  schedulerQueue = null
  connection = null
}
