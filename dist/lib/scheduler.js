"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const logger_1 = require("./logger");
const notification_service_1 = require("../modules/notifications/notification.service");
const loan_service_1 = require("../modules/loans/loan.service");
// 매일 09:00 KST — 퇴사 알람 + outbox 처리
// 환경변수 SCHEDULER_DISABLED=1 이면 비활성 (테스트 / 일회성 컨테이너)
const TERMINATION_CRON = process.env['SCHEDULER_TERMINATION_CRON'] ?? '0 9 * * *';
const OUTBOX_CRON = process.env['SCHEDULER_OUTBOX_CRON'] ?? '*/5 * * * *'; // 5분마다
const TZ = process.env['SCHEDULER_TZ'] ?? 'Asia/Seoul';
const startScheduler = () => {
    if (process.env['SCHEDULER_DISABLED'] === '1') {
        logger_1.logger.info({ event: 'scheduler_disabled' }, 'SCHEDULER_DISABLED=1 — 스케줄러 비활성');
        return;
    }
    // 1. 퇴사 알람 — 매일 09:00 KST
    node_cron_1.default.schedule(TERMINATION_CRON, async () => {
        try {
            const result = await notification_service_1.notificationService.runTerminationCheck();
            logger_1.logger.info({ event: 'cron_termination_done', ...result }, '퇴사 알람 체크 완료');
        }
        catch (err) {
            logger_1.logger.error({ event: 'cron_termination_failed', err }, '퇴사 알람 체크 실패');
        }
    }, { timezone: TZ });
    // 2. outbox 처리 — 5분마다 (Slack + 이메일 발송 시도)
    node_cron_1.default.schedule(OUTBOX_CRON, async () => {
        try {
            const result = await notification_service_1.notificationService.processOutbox();
            logger_1.logger.info({ event: 'cron_outbox_done', ...result }, 'outbox 처리 완료');
        }
        catch (err) {
            logger_1.logger.error({ event: 'cron_outbox_failed', err }, 'outbox 처리 실패');
        }
    }, { timezone: TZ });
    // 3. 연체 알림 — 매일 10:00 KST (D+1/D+3/D+7 단계 발송)
    const OVERDUE_CRON = process.env['SCHEDULER_OVERDUE_CRON'] ?? '0 10 * * *';
    node_cron_1.default.schedule(OVERDUE_CRON, async () => {
        try {
            const result = await loan_service_1.loanService.notifyOverdueLoans();
            logger_1.logger.info({ event: 'cron_overdue_done', ...result }, '연체 알림 완료');
        }
        catch (err) {
            logger_1.logger.error({ event: 'cron_overdue_failed', err }, '연체 알림 실패');
        }
    }, { timezone: TZ });
    // 4. 컴플라이언스 알림 — 매일 09:30 KST (보증/라이선스 만료·임박·시트초과)
    const COMPLIANCE_CRON = process.env['SCHEDULER_COMPLIANCE_CRON'] ?? '30 9 * * *';
    node_cron_1.default.schedule(COMPLIANCE_CRON, async () => {
        try {
            const result = await notification_service_1.notificationService.runComplianceCheck();
            logger_1.logger.info({ event: 'cron_compliance_done', ...result }, '컴플라이언스 알림 완료');
        }
        catch (err) {
            logger_1.logger.error({ event: 'cron_compliance_failed', err }, '컴플라이언스 알림 실패');
        }
    }, { timezone: TZ });
    logger_1.logger.info({
        event: 'scheduler_started',
        terminationCron: TERMINATION_CRON,
        outboxCron: OUTBOX_CRON,
        overdueCron: OVERDUE_CRON,
        complianceCron: COMPLIANCE_CRON,
        tz: TZ,
    }, '스케줄러 시작');
};
exports.startScheduler = startScheduler;
//# sourceMappingURL=scheduler.js.map