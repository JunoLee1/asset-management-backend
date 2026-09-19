"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = require("../../lib/prisma");
const logger_1 = require("../../lib/logger");
const AppError_1 = require("../../lib/AppError");
const client_1 = require("../../generated/prisma/client");
// X3 Outbox 패턴 — in-app 즉시 저장 + 외부 채널(Slack/이메일)은 worker 폴링
// 가정: 알림 발송 실패는 transaction 실패로 만들지 않음 (best-effort).
//       in-app 은 항상 저장됨 — 사용자는 in-app feed 로 fallback 확인 가능.
const SLACK_WEBHOOK_URL = process.env['SLACK_WEBHOOK_URL'];
const SMTP_HOST = process.env['SMTP_HOST'];
const SMTP_PORT = process.env['SMTP_PORT'];
const SMTP_USER = process.env['SMTP_USER'];
const SMTP_PASS = process.env['SMTP_PASS'];
const SMTP_FROM = process.env['SMTP_FROM'];
const SMTP_CONFIGURED = !!(SMTP_HOST && SMTP_PORT && SMTP_FROM);
const MAX_CHANNEL_ATTEMPTS = 3;
const OUTBOX_BATCH_SIZE = 50;
// SMTP transporter — lazy init
let mailTransporter = null;
const getMailTransporter = () => {
    if (mailTransporter)
        return mailTransporter;
    if (!SMTP_CONFIGURED) {
        throw new Error('SMTP not configured');
    }
    mailTransporter = nodemailer_1.default.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    return mailTransporter;
};
const createInApp = async (input, tx) => {
    const client = tx ?? prisma_1.prisma;
    const data = {
        type: input.type,
        title: input.title,
        body: input.body,
        metadata: input.metadata ?? client_1.Prisma.JsonNull,
        recipient: { connect: { id: input.recipientId } },
        // 채널별 초기 상태 — 설정 없으면 즉시 SKIPPED
        channelStatus: SLACK_WEBHOOK_URL ? 'PENDING' : 'SKIPPED',
        emailStatus: SMTP_CONFIGURED ? 'PENDING' : 'SKIPPED',
    };
    await client.notification.create({ data });
};
const createInAppMany = async (inputs, tx) => {
    for (const input of inputs) {
        await createInApp(input, tx);
    }
};
// ─────────────────────────────────────────
// Loan 알림 wrapper
// ─────────────────────────────────────────
const createLoanApprovedNotification = async (params, tx) => {
    await createInApp({
        type: 'LOAN_APPROVED',
        title: '대여 승인됨',
        body: `${params.assetCode} (${params.assetName}) 대여가 승인되었습니다. 출고 처리를 기다려주세요.`,
        metadata: { loanId: params.loanId, assetCode: params.assetCode },
        recipientId: params.recipientUserId,
    }, tx);
};
const createLoanCheckedOutNotification = async (params, tx) => {
    await createInApp({
        type: 'LOAN_CHECKED_OUT',
        title: '기기 출고 완료',
        body: `${params.assetCode} (${params.assetName}) 가 출고되었습니다. QR 스캔으로 수령 확정해주세요.`,
        metadata: { loanId: params.loanId, assetCode: params.assetCode },
        recipientId: params.recipientUserId,
    }, tx);
};
// MANAGER/ADMIN 전원에게 발송
const createLoanReceivedNotifications = async (params, tx) => {
    const client = tx ?? prisma_1.prisma;
    const recipients = await client.user.findMany({
        where: { role: { in: ['TEAM_LEAD', 'ADMIN'] }, isActive: true },
        select: { id: true },
    });
    if (recipients.length === 0)
        return;
    await createInAppMany(recipients.map((r) => ({
        type: 'LOAN_RECEIVED',
        title: '기기 수령 확정',
        body: `${params.receiverName} 님이 ${params.assetCode} (${params.assetName}) 를 수령했습니다.`,
        metadata: { loanId: params.loanId, assetCode: params.assetCode },
        recipientId: r.id,
    })), tx);
};
// 대여 신청 → 1차 승인자(해당 팀의 teamLead; 없거나 본인이면 ADMIN)에게 발송
// 신청자 본인은 제외 (자기 신청을 자기에게 알리지 않음)
const createLoanRequestedNotifications = async (params, tx) => {
    const client = tx ?? prisma_1.prisma;
    let recipients = [];
    if (params.applicantTeamId) {
        const team = await client.team.findUnique({
            where: { id: params.applicantTeamId },
            select: { teamLeadId: true },
        });
        if (team?.teamLeadId && team.teamLeadId !== params.applicantId) {
            recipients = [{ id: team.teamLeadId }];
        }
    }
    // fallback — 팀장이 없거나 본인이 팀장이면 ADMIN 전원에게 발송
    if (recipients.length === 0) {
        recipients = await client.user.findMany({
            where: { role: 'ADMIN', isActive: true, id: { not: params.applicantId } },
            select: { id: true },
        });
    }
    if (recipients.length === 0)
        return;
    await createInAppMany(recipients.map((r) => ({
        type: 'LOAN_PENDING_APPROVAL',
        title: '대여 신청 승인 대기',
        body: `${params.applicantName} 님이 ${params.assetCode} (${params.assetName}) 대여를 신청했습니다. 승인 처리를 부탁드립니다.`,
        metadata: { loanId: params.loanId, assetCode: params.assetCode, stage: 'PENDING_MANAGER' },
        recipientId: r.id,
    })), tx);
};
// 팀장 1차 승인 → 2차 승인자(ADMIN 전원)에게 발송
const createLoanPendingAdminNotifications = async (params, tx) => {
    const client = tx ?? prisma_1.prisma;
    const recipients = await client.user.findMany({
        where: { role: 'ADMIN', isActive: true },
        select: { id: true },
    });
    if (recipients.length === 0)
        return;
    await createInAppMany(recipients.map((r) => ({
        type: 'LOAN_PENDING_APPROVAL',
        title: '대여 최종 승인 대기',
        body: `${params.applicantName} 님의 ${params.assetCode} (${params.assetName}) 대여 건이 팀장 승인을 마쳤습니다. 최종 승인을 부탁드립니다.`,
        metadata: { loanId: params.loanId, assetCode: params.assetCode, stage: 'PENDING_ADMIN' },
        recipientId: r.id,
    })), tx);
};
// 사원 반납 요청 → 검수자(ASSET_MANAGER/ADMIN) 전원에게 발송
const createLoanReturnRequestedNotifications = async (params, tx) => {
    const client = tx ?? prisma_1.prisma;
    const recipients = await client.user.findMany({
        where: { role: { in: ['ASSET_MANAGER', 'ADMIN'] }, isActive: true },
        select: { id: true },
    });
    if (recipients.length === 0)
        return;
    await createInAppMany(recipients.map((r) => ({
        type: 'LOAN_RETURN_REQUESTED',
        title: '반납 검수 대기',
        body: `${params.applicantName} 님이 ${params.assetCode} (${params.assetName}) 반납을 요청했습니다. 검수를 진행해주세요.`,
        metadata: { loanId: params.loanId, assetCode: params.assetCode },
        recipientId: r.id,
    })), tx);
};
const sendSlack = async (text) => {
    if (!SLACK_WEBHOOK_URL)
        throw new Error('SLACK_WEBHOOK_URL 미설정');
    const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) {
        throw new Error(`Slack webhook ${response.status} ${response.statusText}`);
    }
};
const sendEmail = async (to, subject, body) => {
    const transporter = getMailTransporter();
    await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        text: body,
    });
};
const URGENCY_LABEL = {
    LOW: '낮음',
    MEDIUM: '보통',
    HIGH: '높음 (긴급)',
};
const sendMaintenanceVendorRequest = async (req) => {
    if (!SMTP_CONFIGURED) {
        logger_1.logger.warn({ event: 'vendor_email_skipped', reason: 'smtp_not_configured' }, 'SMTP 미설정');
        throw new Error('SMTP 미설정으로 메일을 보낼 수 없습니다.');
    }
    const greeting = req.vendorContactName ? `${req.vendorContactName}님` : '담당자님';
    const body = [
        `안녕하세요, ${greeting}.`,
        '',
        '아래 자산의 수리를 의뢰드립니다.',
        '',
        '── 자산 정보 ──',
        `자산 코드: ${req.assetCode}`,
        `자산명: ${req.assetName}`,
        req.modelName ? `모델: ${req.modelName}` : null,
        '',
        '── 수리 요청 ──',
        `증상: ${req.symptom}`,
        req.description ? `세부 내용: ${req.description}` : null,
        `긴급도: ${URGENCY_LABEL[req.urgency]}`,
        '',
        '── 회사 담당자 ──',
        `이름: ${req.requesterName}`,
        `이메일: ${req.requesterEmail}`,
        '',
        '회신은 위 담당자 메일로 부탁드립니다.',
        '감사합니다.',
    ]
        .filter((line) => line !== null)
        .join('\n');
    const subject = `[자산관리 ERP] 수리 요청 — ${req.assetCode} ${req.assetName}`;
    await sendEmail(req.vendorEmail, subject, body);
    logger_1.logger.info({ event: 'vendor_email_sent', assetCode: req.assetCode, to: req.vendorEmail }, '수리업체 메일 발송 완료');
};
const processSlackOutbox = async () => {
    if (!SLACK_WEBHOOK_URL) {
        const result = await prisma_1.prisma.notification.updateMany({
            where: { channelStatus: 'PENDING' },
            data: { channelStatus: 'SKIPPED' },
        });
        logger_1.logger.info({ event: 'slack_outbox_skipped', count: result.count }, 'Slack 미설정 — SKIPPED');
        return { scanned: result.count, sent: 0, failed: 0, skipped: result.count };
    }
    const pending = await prisma_1.prisma.notification.findMany({
        where: { channelStatus: 'PENDING', channelAttempts: { lt: MAX_CHANNEL_ATTEMPTS } },
        orderBy: { createdAt: 'asc' },
        take: OUTBOX_BATCH_SIZE,
    });
    let sent = 0;
    let failed = 0;
    for (const n of pending) {
        try {
            await sendSlack(`*${n.title}*\n${n.body}`);
            await prisma_1.prisma.notification.update({
                where: { id: n.id },
                data: { channelStatus: 'SENT', channelSentAt: new Date() },
            });
            sent++;
        }
        catch (err) {
            const attempts = n.channelAttempts + 1;
            const nextStatus = attempts >= MAX_CHANNEL_ATTEMPTS ? 'FAILED' : 'PENDING';
            await prisma_1.prisma.notification.update({
                where: { id: n.id },
                data: {
                    channelAttempts: attempts,
                    channelStatus: nextStatus,
                    channelLastError: err instanceof Error ? err.message : String(err),
                },
            });
            if (nextStatus === 'FAILED')
                failed++;
            logger_1.logger.warn({ event: 'slack_send_failed', id: n.id, attempts }, 'Slack 발송 실패');
        }
    }
    return { scanned: pending.length, sent, failed, skipped: 0 };
};
const processEmailOutbox = async () => {
    if (!SMTP_CONFIGURED) {
        const result = await prisma_1.prisma.notification.updateMany({
            where: { emailStatus: 'PENDING' },
            data: { emailStatus: 'SKIPPED' },
        });
        logger_1.logger.info({ event: 'email_outbox_skipped', count: result.count }, 'SMTP 미설정 — SKIPPED');
        return { scanned: result.count, sent: 0, failed: 0, skipped: result.count };
    }
    const pending = await prisma_1.prisma.notification.findMany({
        where: { emailStatus: 'PENDING', emailAttempts: { lt: MAX_CHANNEL_ATTEMPTS } },
        include: { recipient: { select: { email: true, name: true } } },
        orderBy: { createdAt: 'asc' },
        take: OUTBOX_BATCH_SIZE,
    });
    let sent = 0;
    let failed = 0;
    for (const n of pending) {
        try {
            await sendEmail(n.recipient.email, `[자산관리 ERP] ${n.title}`, n.body);
            await prisma_1.prisma.notification.update({
                where: { id: n.id },
                data: { emailStatus: 'SENT', emailSentAt: new Date() },
            });
            sent++;
        }
        catch (err) {
            const attempts = n.emailAttempts + 1;
            const nextStatus = attempts >= MAX_CHANNEL_ATTEMPTS ? 'FAILED' : 'PENDING';
            await prisma_1.prisma.notification.update({
                where: { id: n.id },
                data: {
                    emailAttempts: attempts,
                    emailStatus: nextStatus,
                    emailLastError: err instanceof Error ? err.message : String(err),
                },
            });
            if (nextStatus === 'FAILED')
                failed++;
            logger_1.logger.warn({ event: 'email_send_failed', id: n.id, attempts }, '이메일 발송 실패');
        }
    }
    return { scanned: pending.length, sent, failed, skipped: 0 };
};
const processOutbox = async () => {
    const [slack, email] = await Promise.all([processSlackOutbox(), processEmailOutbox()]);
    logger_1.logger.info({ event: 'outbox_processed', slack, email }, 'outbox 처리 완료');
    return { slack, email };
};
const listMy = async (recipientId) => {
    const rows = await prisma_1.prisma.notification.findMany({
        where: { recipientId },
        orderBy: { createdAt: 'desc' },
        take: 100,
    });
    return rows.map((r) => ({
        id: r.id,
        type: r.type,
        title: r.title,
        body: r.body,
        metadata: r.metadata,
        readAt: r.readAt,
        createdAt: r.createdAt,
    }));
};
const markRead = async (id, recipientId) => {
    const row = await prisma_1.prisma.notification.findUnique({ where: { id } });
    if (!row)
        throw new AppError_1.AppError(404, '알림을 찾을 수 없습니다.');
    if (row.recipientId !== recipientId) {
        throw new AppError_1.AppError(403, '본인 알림만 읽음 처리할 수 있습니다.');
    }
    if (row.readAt)
        return;
    await prisma_1.prisma.notification.update({ where: { id }, data: { readAt: new Date() } });
};
// ─────────────────────────────────────────
// 퇴사 알람 — D-7 + 활성 대여 보유자 → ADMIN 전원
// ─────────────────────────────────────────
const TERMINATION_WINDOW_DAYS = 7;
const TERMINATION_DEDUPE_HOURS = 24; // 같은 user 의 알림이 24h 내에 있으면 skip
const runTerminationCheck = async () => {
    const now = new Date();
    const windowEnd = new Date(now.getTime() + TERMINATION_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    const dedupeSince = new Date(now.getTime() - TERMINATION_DEDUPE_HOURS * 60 * 60 * 1000);
    // 활성 대여 (CHECKED_OUT 또는 RECEIVED) 보유 + 퇴사 D-7 이내
    const candidates = await prisma_1.prisma.user.findMany({
        where: {
            isActive: true,
            terminationDate: { gte: now, lte: windowEnd },
            loans: {
                some: { status: { in: ['CHECKED_OUT', 'RECEIVED'] } },
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            terminationDate: true,
            loans: {
                where: { status: { in: ['CHECKED_OUT', 'RECEIVED'] } },
                select: {
                    id: true,
                    asset: { select: { assetCode: true, name: true } },
                },
            },
        },
    });
    if (candidates.length === 0) {
        return { candidates: 0, notifications: 0, skippedDuplicates: 0 };
    }
    const admins = await prisma_1.prisma.user.findMany({
        where: { role: 'ADMIN', isActive: true },
        select: { id: true },
    });
    if (admins.length === 0) {
        logger_1.logger.warn({ event: 'termination_check_no_admins' }, '퇴사 알람 — ADMIN 없음');
        return { candidates: candidates.length, notifications: 0, skippedDuplicates: 0 };
    }
    let notifications = 0;
    let skippedDuplicates = 0;
    for (const user of candidates) {
        // 중복 방지: 같은 userId 에 대한 TERMINATION_RETURN_REMINDER 가 24h 내에 있으면 skip
        const recentDupe = await prisma_1.prisma.notification.findFirst({
            where: {
                type: 'TERMINATION_RETURN_REMINDER',
                createdAt: { gte: dedupeSince },
                metadata: { path: ['userId'], equals: user.id },
            },
            select: { id: true },
        });
        if (recentDupe) {
            skippedDuplicates++;
            continue;
        }
        const body = `${user.name} (퇴사일 ${user.terminationDate?.toISOString().slice(0, 10)}) 가 ${user.loans.length}건의 자산을 대여 중입니다. 회수 처리 부탁드립니다.`;
        const assetCodes = user.loans.map((l) => l.asset.assetCode).join(', ');
        await createInAppMany(admins.map((a) => ({
            type: 'TERMINATION_RETURN_REMINDER',
            title: `퇴사 예정자 대여 자산 회수 필요`,
            body: `${body}\n자산: ${assetCodes}`,
            metadata: {
                userId: user.id,
                userName: user.name,
                terminationDate: user.terminationDate?.toISOString(),
                loanIds: user.loans.map((l) => l.id),
                assetCodes: user.loans.map((l) => l.asset.assetCode),
            },
            recipientId: a.id,
        })));
        notifications += admins.length;
    }
    logger_1.logger.info({
        event: 'termination_check_done',
        candidates: candidates.length,
        notifications,
        skippedDuplicates,
    }, '퇴사 알람 체크 완료');
    return { candidates: candidates.length, notifications, skippedDuplicates };
};
// ─────────────────────────────────────────
// 컴플라이언스 알람 — 보증/라이선스 D-7 이내 + 경과 + 시트 초과 → ADMIN 전원
// ─────────────────────────────────────────
const COMPLIANCE_URGENT_DAYS = 7; // D-7 이내 만료 + 이미 경과
const COMPLIANCE_DEDUPE_HOURS = 24;
const runComplianceCheck = async () => {
    const now = new Date();
    const urgentEnd = new Date(now.getTime() + COMPLIANCE_URGENT_DAYS * 24 * 60 * 60 * 1000);
    const dedupeSince = new Date(now.getTime() - COMPLIANCE_DEDUPE_HOURS * 60 * 60 * 1000);
    // 보증: 이미 만료(<now) + D-7 이내 임박
    const warrantyUrgent = await prisma_1.prisma.hardwareAsset.findMany({
        where: { warrantyEnd: { lte: urgentEnd, not: null } },
        include: { asset: { select: { id: true, assetCode: true, name: true } } },
    });
    // 라이선스: 만료 경과 + D-7 임박
    const licenseUrgent = await prisma_1.prisma.license.findMany({
        where: { expiryDate: { lte: urgentEnd, not: null } },
        select: { id: true, name: true, expiryDate: true },
    });
    // 시트 초과 — 활성 할당(unassignedAt: null)만 집계 (회수 포함하면 false positive)
    const allLicenses = await prisma_1.prisma.license.findMany({
        include: { _count: { select: { assignments: { where: { unassignedAt: null } } } } },
    });
    const overseated = allLicenses.filter((l) => l._count.assignments > l.seatsTotal);
    const urgentCount = warrantyUrgent.length + licenseUrgent.length + overseated.length;
    if (urgentCount === 0) {
        return {
            warrantyUrgent: 0,
            licenseUrgent: 0,
            overseated: 0,
            notifications: 0,
            skippedDuplicates: 0,
        };
    }
    const recipients = await prisma_1.prisma.user.findMany({
        where: { role: { in: ['ADMIN', 'SECURITY_OFFICER'] }, isActive: true },
        select: { id: true },
    });
    if (recipients.length === 0) {
        logger_1.logger.warn({ event: 'compliance_check_no_recipients' }, '컴플라이언스 알람 — ADMIN/SECURITY_OFFICER 없음');
        return {
            warrantyUrgent: warrantyUrgent.length,
            licenseUrgent: licenseUrgent.length,
            overseated: overseated.length,
            notifications: 0,
            skippedDuplicates: 0,
        };
    }
    // 24h dedupe — 한 ADMIN에게 같은 day 알림이 있으면 skip
    const recentDupe = await prisma_1.prisma.notification.findFirst({
        where: {
            type: 'COMPLIANCE_URGENT',
            createdAt: { gte: dedupeSince },
        },
        select: { id: true },
    });
    if (recentDupe) {
        return {
            warrantyUrgent: warrantyUrgent.length,
            licenseUrgent: licenseUrgent.length,
            overseated: overseated.length,
            notifications: 0,
            skippedDuplicates: 1,
        };
    }
    const body = `긴급 컴플라이언스 항목 ${urgentCount}건 — ` +
        `보증 만료/임박 ${warrantyUrgent.length}건, ` +
        `라이선스 만료/임박 ${licenseUrgent.length}건, ` +
        `시트 초과 ${overseated.length}건`;
    await createInAppMany(recipients.map((a) => ({
        type: 'COMPLIANCE_URGENT',
        title: '컴플라이언스 긴급 점검 필요',
        body,
        metadata: {
            warrantyAssetIds: warrantyUrgent.map((w) => w.asset.id),
            licenseIds: licenseUrgent.map((l) => l.id),
            overseatedLicenseIds: overseated.map((l) => l.id),
            checkedAt: now.toISOString(),
        },
        recipientId: a.id,
    })));
    logger_1.logger.info({
        event: 'compliance_check_done',
        warrantyUrgent: warrantyUrgent.length,
        licenseUrgent: licenseUrgent.length,
        overseated: overseated.length,
        notifications: recipients.length,
    }, '컴플라이언스 알람 발송');
    return {
        warrantyUrgent: warrantyUrgent.length,
        licenseUrgent: licenseUrgent.length,
        overseated: overseated.length,
        notifications: recipients.length,
        skippedDuplicates: 0,
    };
};
// ─────────────────────────────────────────
// 정비(Maintenance) 관련 알림
// ─────────────────────────────────────────
// ADMIN 2차 승인 직후 → REPAIR_OWNER 모두에게 "정비 배정됨"
// 수리 담당자가 정비 건이 자기 큐에 들어왔음을 즉시 인지 가능
const createMaintenanceAssignedToRepairNotifications = async (params) => {
    const repairOwners = await prisma_1.prisma.user.findMany({
        where: { role: 'REPAIR_OWNER', isActive: true },
        select: { id: true },
    });
    if (repairOwners.length === 0)
        return;
    await createInAppMany(repairOwners.map((u) => ({
        type: 'MAINTENANCE_ASSIGNED_TO_REPAIR',
        title: '정비 배정됨',
        body: `${params.assetCode} (${params.assetName}) — ${params.title} 정비가 승인되어 배정되었습니다.`,
        metadata: { maintenanceId: params.maintenanceId, assetCode: params.assetCode },
        recipientId: u.id,
    })));
};
// 정비 COMPLETED → 신청자(있다면) + REPAIR_OWNER 모두에게 "정비 완료"
const createMaintenanceCompletedNotifications = async (params) => {
    const repairOwners = await prisma_1.prisma.user.findMany({
        where: { role: 'REPAIR_OWNER', isActive: true },
        select: { id: true },
    });
    const recipientIds = new Set(repairOwners.map((u) => u.id));
    if (params.requesterId)
        recipientIds.add(params.requesterId);
    if (recipientIds.size === 0)
        return;
    await createInAppMany(Array.from(recipientIds).map((id) => ({
        type: 'MAINTENANCE_COMPLETED',
        title: '정비 완료',
        body: `${params.assetCode} (${params.assetName}) 정비가 완료되었습니다.`,
        metadata: { maintenanceId: params.maintenanceId, assetCode: params.assetCode },
        recipientId: id,
    })));
};
const createLicenseFullNotification = async (params, tx) => {
    const admins = await (tx ?? prisma_1.prisma).user.findMany({
        where: { role: { in: ['ADMIN', 'SECURITY_OFFICER'] }, isActive: true },
        select: { id: true },
    });
    if (admins.length === 0)
        return;
    const body = `라이선스 [${params.licenseName}] 의 모든 시트(${params.seatsTotal})가 할당되었습니다. 추가 구매가 필요할 수 있습니다.`;
    await createInAppMany(admins.map((a) => ({
        type: 'COMPLIANCE_URGENT',
        title: '라이선스 시트 가득 참',
        body,
        metadata: { licenseId: params.licenseId, seatsTotal: params.seatsTotal },
        recipientId: a.id,
    })), tx);
};
exports.notificationService = {
    createInApp,
    createLoanApprovedNotification,
    createLoanCheckedOutNotification,
    createLoanReceivedNotifications,
    createLoanRequestedNotifications,
    createLoanPendingAdminNotifications,
    createLoanReturnRequestedNotifications,
    processOutbox,
    listMy,
    markRead,
    runTerminationCheck,
    runComplianceCheck,
    sendMaintenanceVendorRequest,
    createMaintenanceAssignedToRepairNotifications,
    createMaintenanceCompletedNotifications,
    createLicenseFullNotification,
};
//# sourceMappingURL=notification.service.js.map