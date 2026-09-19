import cron from 'node-cron'
import { logger } from './logger'
import { notificationService } from '../modules/notifications/notification.service'
import { loanService } from '../modules/loans/loan.service'

// 매일 09:00 KST — 퇴사 알람 + outbox 처리
// 환경변수 SCHEDULER_DISABLED=1 이면 비활성 (테스트 / 일회성 컨테이너)
const TERMINATION_CRON = process.env['SCHEDULER_TERMINATION_CRON'] ?? '0 9 * * *'
const OUTBOX_CRON = process.env['SCHEDULER_OUTBOX_CRON'] ?? '*/5 * * * *' // 5분마다
const TZ = process.env['SCHEDULER_TZ'] ?? 'Asia/Seoul'

export const startScheduler = (): void => {
  if (process.env['SCHEDULER_DISABLED'] === '1') {
    logger.info({ event: 'scheduler_disabled' }, 'SCHEDULER_DISABLED=1 — 스케줄러 비활성')
    return
  }

  // 1. 퇴사 알람 — 매일 09:00 KST
  cron.schedule(
    TERMINATION_CRON,
    async () => {
      try {
        const result = await notificationService.runTerminationCheck()
        logger.info({ event: 'cron_termination_done', ...result }, '퇴사 알람 체크 완료')
      } catch (err) {
        logger.error({ event: 'cron_termination_failed', err }, '퇴사 알람 체크 실패')
      }
    },
    { timezone: TZ },
  )

  // 2. outbox 처리 — 5분마다 (Slack + 이메일 발송 시도)
  cron.schedule(
    OUTBOX_CRON,
    async () => {
      try {
        const result = await notificationService.processOutbox()
        logger.info({ event: 'cron_outbox_done', ...result }, 'outbox 처리 완료')
      } catch (err) {
        logger.error({ event: 'cron_outbox_failed', err }, 'outbox 처리 실패')
      }
    },
    { timezone: TZ },
  )

  // 3. 연체 알림 — 매일 10:00 KST (D+1/D+3/D+7 단계 발송)
  const OVERDUE_CRON = process.env['SCHEDULER_OVERDUE_CRON'] ?? '0 10 * * *'
  cron.schedule(
    OVERDUE_CRON,
    async () => {
      try {
        const result = await loanService.notifyOverdueLoans()
        logger.info({ event: 'cron_overdue_done', ...result }, '연체 알림 완료')
      } catch (err) {
        logger.error({ event: 'cron_overdue_failed', err }, '연체 알림 실패')
      }
    },
    { timezone: TZ },
  )

  // 4. 컴플라이언스 알림 — 매일 09:30 KST (보증/라이선스 만료·임박·시트초과)
  const COMPLIANCE_CRON = process.env['SCHEDULER_COMPLIANCE_CRON'] ?? '30 9 * * *'
  cron.schedule(
    COMPLIANCE_CRON,
    async () => {
      try {
        const result = await notificationService.runComplianceCheck()
        logger.info({ event: 'cron_compliance_done', ...result }, '컴플라이언스 알림 완료')
      } catch (err) {
        logger.error({ event: 'cron_compliance_failed', err }, '컴플라이언스 알림 실패')
      }
    },
    { timezone: TZ },
  )

  // 5. 라이선스 만료 D-30/14/7/1 알림 — 매일 08:00 KST
  const LICENSE_EXPIRY_CRON = process.env['SCHEDULER_LICENSE_EXPIRY_CRON'] ?? '0 8 * * *'
  cron.schedule(
    LICENSE_EXPIRY_CRON,
    async () => {
      try {
        const result = await notificationService.runLicenseExpiryCheck()
        logger.info({ event: 'cron_license_expiry_done', ...result }, '라이선스 만료 알림 완료')
      } catch (err) {
        logger.error({ event: 'cron_license_expiry_failed', err }, '라이선스 만료 알림 실패')
      }
    },
    { timezone: TZ },
  )

  logger.info(
    {
      event: 'scheduler_started',
      terminationCron: TERMINATION_CRON,
      outboxCron: OUTBOX_CRON,
      overdueCron: OVERDUE_CRON,
      complianceCron: COMPLIANCE_CRON,
      licenseExpiryCron: LICENSE_EXPIRY_CRON,
      tz: TZ,
    },
    '스케줄러 시작',
  )
}
