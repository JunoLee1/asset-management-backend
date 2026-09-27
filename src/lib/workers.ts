// BullMQ Worker 등록/시작/종료.
// - email: sendMail 호출
// - sms: SmsService.sendSms 호출
// - scheduler: 5개 cron 잡의 실제 작업 실행
//
// Redis 미설정 시 Worker 등록 스킵 (dev/test 편의).

import { Worker, type Job } from 'bullmq'
import IORedis, { type Redis } from 'ioredis'
import { logger } from './logger'
import type { EmailJob, SmsJob, SchedulerJobName } from './queues'
import { sendMail } from './mailer'
import { SmsService } from '../services/sms.service'
import { notificationService } from '../modules/notifications/notification.service'
import { loanService } from '../modules/loans/loan.service'

let emailWorker: Worker<EmailJob> | null = null
let smsWorker: Worker<SmsJob> | null = null
let schedulerWorker: Worker<Record<string, never>, unknown, SchedulerJobName> | null = null
let workerConnection: Redis | null = null

function getWorkerConnection(): Redis | null {
  if (workerConnection) return workerConnection
  const url = process.env['REDIS_URL']
  if (!url) return null
  workerConnection = new IORedis(url, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
  })
  workerConnection.on('error', (err) => logger.error({ err: err.message }, '[bullmq worker] redis error'))
  return workerConnection
}

export function startWorkers(): void {
  const conn = getWorkerConnection()
  if (!conn) {
    logger.warn('[bullmq worker] REDIS_URL not set — workers disabled')
    return
  }

  emailWorker = new Worker<EmailJob>(
    'email',
    async (job: Job<EmailJob>) => {
      await sendMail({ to: job.data.to, subject: job.data.subject, html: job.data.html })
    },
    { connection: conn, concurrency: 5 },
  )
  emailWorker.on('failed', (job, err) => {
    logger.warn({ jobId: job?.id, err: err.message, attempts: job?.attemptsMade }, '[bullmq email] failed')
  })

  smsWorker = new Worker<SmsJob>(
    'sms',
    async (job: Job<SmsJob>) => {
      const ok = await SmsService.sendSms(job.data.phoneNumber, job.data.message)
      if (!ok) throw new Error('SMS send returned false')
    },
    { connection: conn, concurrency: 3 },
  )
  smsWorker.on('failed', (job, err) => {
    logger.warn({ jobId: job?.id, err: err.message, attempts: job?.attemptsMade }, '[bullmq sms] failed')
  })

  schedulerWorker = new Worker<Record<string, never>, unknown, SchedulerJobName>(
    'scheduler',
    async (job) => {
      switch (job.name) {
        case 'termination-check':
          return notificationService.runTerminationCheck()
        case 'outbox-process':
          return notificationService.processOutbox()
        case 'overdue-check':
          return loanService.notifyOverdueLoans()
        case 'compliance-check':
          return notificationService.runComplianceCheck()
        case 'license-expiry-check':
          return notificationService.runLicenseExpiryCheck()
        default: {
          const _exhaustive: never = job.name
          return _exhaustive
        }
      }
    },
    { connection: conn, concurrency: 1 },
  )
  schedulerWorker.on('completed', (job, result) => {
    logger.info({ jobName: job.name, result }, '[bullmq scheduler] done')
  })
  schedulerWorker.on('failed', (job, err) => {
    logger.error({ jobName: job?.name, err: err.message }, '[bullmq scheduler] failed')
  })

  logger.info('[bullmq worker] started (email/sms/scheduler)')
}

/** SIGTERM/SIGINT 시 정상 종료. */
export async function stopWorkers(): Promise<void> {
  await Promise.all([
    emailWorker?.close().catch(() => undefined),
    smsWorker?.close().catch(() => undefined),
    schedulerWorker?.close().catch(() => undefined),
  ])
  await workerConnection?.quit().catch(() => undefined)
  emailWorker = null
  smsWorker = null
  schedulerWorker = null
  workerConnection = null
  logger.info('[bullmq worker] stopped')
}
