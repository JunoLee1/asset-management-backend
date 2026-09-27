// 스케줄러: BullMQ Repeatable Jobs로 5개 cron 잡을 등록.
// - jobId를 스케줄 이름으로 고정 → 다중 인스턴스에서 큐에 잡이 정확히 1건만 들어감.
// - Worker(별도 시작)가 실제 실행. 이 파일은 등록만 담당.
// - Redis 미설정 시 스킵.
//
// 기존 node-cron 대비 장점:
//   - 다중 Cloud Run 인스턴스에서 스케줄이 인스턴스 개수만큼 중복 실행되지 않음
//   - 잡 실패 시 로그·재시도 정책이 BullMQ 대시보드/로그에서 관찰 가능

import { logger } from './logger'
import { getSchedulerQueue, type SchedulerJobName } from './queues'

const TERMINATION_CRON = process.env['SCHEDULER_TERMINATION_CRON'] ?? '0 9 * * *'
const OUTBOX_CRON = process.env['SCHEDULER_OUTBOX_CRON'] ?? '*/5 * * * *'
const OVERDUE_CRON = process.env['SCHEDULER_OVERDUE_CRON'] ?? '0 10 * * *'
const COMPLIANCE_CRON = process.env['SCHEDULER_COMPLIANCE_CRON'] ?? '30 9 * * *'
const LICENSE_EXPIRY_CRON = process.env['SCHEDULER_LICENSE_EXPIRY_CRON'] ?? '0 8 * * *'
const TZ = process.env['SCHEDULER_TZ'] ?? 'Asia/Seoul'

interface ScheduleEntry {
  name: SchedulerJobName
  cron: string
}

const SCHEDULES: ScheduleEntry[] = [
  { name: 'termination-check', cron: TERMINATION_CRON },
  { name: 'outbox-process', cron: OUTBOX_CRON },
  { name: 'overdue-check', cron: OVERDUE_CRON },
  { name: 'compliance-check', cron: COMPLIANCE_CRON },
  { name: 'license-expiry-check', cron: LICENSE_EXPIRY_CRON },
]

export const startScheduler = async (): Promise<void> => {
  if (process.env['SCHEDULER_DISABLED'] === '1') {
    logger.info({ event: 'scheduler_disabled' }, 'SCHEDULER_DISABLED=1 — 스케줄러 비활성')
    return
  }

  const queue = getSchedulerQueue()
  if (!queue) {
    logger.warn('[scheduler] REDIS_URL not set — 스케줄러 비활성')
    return
  }

  for (const s of SCHEDULES) {
    await queue.upsertJobScheduler(
      `repeatable:${s.name}`,
      { pattern: s.cron, tz: TZ },
      { name: s.name, data: {} },
    )
  }

  logger.info(
    {
      event: 'scheduler_started',
      schedules: SCHEDULES.map((s) => ({ name: s.name, cron: s.cron })),
      tz: TZ,
    },
    '[scheduler] BullMQ repeatable jobs registered',
  )
}
