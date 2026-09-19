import nodemailer from 'nodemailer'
import { prisma } from '../../lib/prisma'
import { logger } from '../../lib/logger'
import { AppError } from '../../lib/AppError'
import type { NotificationType } from '../../generated/prisma/enums'
import { Prisma } from '../../generated/prisma/client'

type PrismaTx = Prisma.TransactionClient

// X3 Outbox 패턴 — in-app 즉시 저장 + 외부 채널(Slack/이메일)은 worker 폴링
// 가정: 알림 발송 실패는 transaction 실패로 만들지 않음 (best-effort).
//       in-app 은 항상 저장됨 — 사용자는 in-app feed 로 fallback 확인 가능.

const SLACK_WEBHOOK_URL = process.env['SLACK_WEBHOOK_URL']
const SMTP_HOST = process.env['SMTP_HOST']
const SMTP_PORT = process.env['SMTP_PORT']
const SMTP_USER = process.env['SMTP_USER']
const SMTP_PASS = process.env['SMTP_PASS']
const SMTP_FROM = process.env['SMTP_FROM']
const SMTP_CONFIGURED = !!(SMTP_HOST && SMTP_PORT && SMTP_FROM)
const MAX_CHANNEL_ATTEMPTS = 3
const OUTBOX_BATCH_SIZE = 50

// SMTP transporter — lazy init
let mailTransporter: nodemailer.Transporter | null = null
const getMailTransporter = (): nodemailer.Transporter => {
  if (mailTransporter) return mailTransporter
  if (!SMTP_CONFIGURED) {
    throw new Error('SMTP not configured')
  }
  mailTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  })
  return mailTransporter
}

// ─────────────────────────────────────────
// in-app notification 저장 — transaction client 지원
// ─────────────────────────────────────────

interface CreateNotificationInput {
  type: NotificationType
  title: string
  body: string
  metadata?: Record<string, unknown>
  recipientId: string
}

const createInApp = async (input: CreateNotificationInput, tx?: PrismaTx): Promise<void> => {
  const client = tx ?? prisma
  const data: Prisma.NotificationCreateInput = {
    type: input.type,
    title: input.title,
    body: input.body,
    metadata: (input.metadata as Prisma.InputJsonValue | undefined) ?? Prisma.JsonNull,
    recipient: { connect: { id: input.recipientId } },
    // 채널별 초기 상태 — 설정 없으면 즉시 SKIPPED
    channelStatus: SLACK_WEBHOOK_URL ? 'PENDING' : 'SKIPPED',
    emailStatus: SMTP_CONFIGURED ? 'PENDING' : 'SKIPPED',
  }
  await client.notification.create({ data })
}

const createInAppMany = async (inputs: CreateNotificationInput[], tx?: PrismaTx): Promise<void> => {
  for (const input of inputs) {
    await createInApp(input, tx)
  }
}

// ─────────────────────────────────────────
// Loan 알림 wrapper
// ─────────────────────────────────────────

const createLoanApprovedNotification = async (
  params: { loanId: string; recipientUserId: string; assetCode: string; assetName: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'LOAN_APPROVED',
      title: '대여 승인됨',
      body: `${params.assetCode} (${params.assetName}) 대여가 승인되었습니다. 출고 처리를 기다려주세요.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode },
      recipientId: params.recipientUserId,
    },
    tx,
  )
}

const createLoanCheckedOutNotification = async (
  params: { loanId: string; recipientUserId: string; assetCode: string; assetName: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'LOAN_CHECKED_OUT',
      title: '기기 출고 완료',
      body: `${params.assetCode} (${params.assetName}) 가 출고되었습니다. QR 스캔으로 수령 확정해주세요.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode },
      recipientId: params.recipientUserId,
    },
    tx,
  )
}

// MANAGER/ADMIN 전원에게 발송
const createLoanReceivedNotifications = async (
  params: { loanId: string; assetCode: string; assetName: string; receiverName: string },
  tx?: PrismaTx,
): Promise<void> => {
  const client = tx ?? prisma
  const recipients = await client.user.findMany({
    where: { role: { in: ['TEAM_LEAD', 'ADMIN'] }, isActive: true },
    select: { id: true },
  })
  if (recipients.length === 0) return
  await createInAppMany(
    recipients.map((r) => ({
      type: 'LOAN_RECEIVED' as NotificationType,
      title: '기기 수령 확정',
      body: `${params.receiverName} 님이 ${params.assetCode} (${params.assetName}) 를 수령했습니다.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode },
      recipientId: r.id,
    })),
    tx,
  )
}

// 대여 신청 → 1차 승인자(해당 팀의 teamLead; 없거나 본인이면 ADMIN)에게 발송
// 신청자 본인은 제외 (자기 신청을 자기에게 알리지 않음)
const createLoanRequestedNotifications = async (
  params: {
    loanId: string
    assetCode: string
    assetName: string
    applicantName: string
    applicantTeamId: string | null
    applicantId: string
  },
  tx?: PrismaTx,
): Promise<void> => {
  const client = tx ?? prisma

  let recipients: { id: string }[] = []
  if (params.applicantTeamId) {
    const team = await client.team.findUnique({
      where: { id: params.applicantTeamId },
      select: { teamLeadId: true },
    })
    if (team?.teamLeadId && team.teamLeadId !== params.applicantId) {
      recipients = [{ id: team.teamLeadId }]
    }
  }
  // fallback — 팀장이 없거나 본인이 팀장이면 ADMIN 전원에게 발송
  if (recipients.length === 0) {
    recipients = await client.user.findMany({
      where: { role: 'ADMIN', isActive: true, id: { not: params.applicantId } },
      select: { id: true },
    })
  }
  if (recipients.length === 0) return

  await createInAppMany(
    recipients.map((r) => ({
      type: 'LOAN_PENDING_APPROVAL' as NotificationType,
      title: '대여 신청 승인 대기',
      body: `${params.applicantName} 님이 ${params.assetCode} (${params.assetName}) 대여를 신청했습니다. 승인 처리를 부탁드립니다.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode, stage: 'PENDING_MANAGER' },
      recipientId: r.id,
    })),
    tx,
  )
}

// 팀장 1차 승인 → 2차 승인자(ADMIN 전원)에게 발송
const createLoanPendingAdminNotifications = async (
  params: { loanId: string; assetCode: string; assetName: string; applicantName: string },
  tx?: PrismaTx,
): Promise<void> => {
  const client = tx ?? prisma
  const recipients = await client.user.findMany({
    where: { role: 'ADMIN', isActive: true },
    select: { id: true },
  })
  if (recipients.length === 0) return
  await createInAppMany(
    recipients.map((r) => ({
      type: 'LOAN_PENDING_APPROVAL' as NotificationType,
      title: '대여 최종 승인 대기',
      body: `${params.applicantName} 님의 ${params.assetCode} (${params.assetName}) 대여 건이 팀장 승인을 마쳤습니다. 최종 승인을 부탁드립니다.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode, stage: 'PENDING_ADMIN' },
      recipientId: r.id,
    })),
    tx,
  )
}

// 사원 반납 요청 → 검수자(ASSET_MANAGER/ADMIN) 전원에게 발송
const createLoanReturnRequestedNotifications = async (
  params: { loanId: string; assetCode: string; assetName: string; applicantName: string },
  tx?: PrismaTx,
): Promise<void> => {
  const client = tx ?? prisma
  const recipients = await client.user.findMany({
    where: { role: { in: ['ASSET_MANAGER', 'ADMIN'] }, isActive: true },
    select: { id: true },
  })
  if (recipients.length === 0) return
  await createInAppMany(
    recipients.map((r) => ({
      type: 'LOAN_RETURN_REQUESTED' as NotificationType,
      title: '반납 검수 대기',
      body: `${params.applicantName} 님이 ${params.assetCode} (${params.assetName}) 반납을 요청했습니다. 검수를 진행해주세요.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode },
      recipientId: r.id,
    })),
    tx,
  )
}

// ADR 0003 — PENDING_DEPT 진입 시 DEPT_LEAD 단일 수신자에게 발송
// caller 가 deptLeaderId 를 이미 계산하고 non-null 임을 확인한 뒤 호출
const createLoanPendingDeptNotification = async (
  params: { loanId: string; assetCode: string; assetName: string; applicantName: string; deptLeaderId: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'LOAN_PENDING_DEPT',
      title: '대여 2차 승인 대기',
      body: `${params.applicantName} 님의 ${params.assetCode} (${params.assetName}) 대여 건이 팀장 승인을 마쳤습니다. 2차 승인 부탁드립니다.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode, stage: 'PENDING_DEPT' },
      recipientId: params.deptLeaderId,
    },
    tx,
  )
}

// ADR 0003 — PENDING_RETURN_DEPT 진입 시 DEPT_LEAD 에게 반납 확인 요청 (반려 없음)
const createLoanPendingReturnDeptNotification = async (
  params: { loanId: string; assetCode: string; assetName: string; returnerName: string; deptLeaderId: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'LOAN_PENDING_RETURN_DEPT',
      title: '반납 부서장 확인 대기',
      body: `${params.returnerName} 님의 ${params.assetCode} (${params.assetName}) 반납 건이 검수를 마쳤습니다. 부서장 확인 부탁드립니다.`,
      metadata: { loanId: params.loanId, assetCode: params.assetCode, stage: 'PENDING_RETURN_DEPT' },
      recipientId: params.deptLeaderId,
    },
    tx,
  )
}

// ADR 0003 — 유지보수 PENDING_DEPT 진입 시 자산 부서 DEPT_LEAD 에게 발송 (자산 부서 기준)
const createMaintenancePendingDeptNotification = async (
  params: { maintenanceId: string; assetCode: string; assetName: string; deptLeaderId: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'MAINTENANCE_PENDING_DEPT',
      title: '정비 부서장 승인 대기',
      body: `${params.assetCode} (${params.assetName}) 정비 건이 팀장 승인을 마쳤습니다. 부서장 승인 부탁드립니다.`,
      metadata: { maintenanceId: params.maintenanceId, assetCode: params.assetCode, stage: 'PENDING_DEPT' },
      recipientId: params.deptLeaderId,
    },
    tx,
  )
}

// ─────────────────────────────────────────
// Outbox worker — Slack + Email 두 채널 독립 처리
// ─────────────────────────────────────────

interface ChannelResult {
  scanned: number
  sent: number
  failed: number
  skipped: number
}

interface OutboxResult {
  slack: ChannelResult
  email: ChannelResult
}

const sendSlack = async (text: string): Promise<void> => {
  if (!SLACK_WEBHOOK_URL) throw new Error('SLACK_WEBHOOK_URL 미설정')
  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!response.ok) {
    throw new Error(`Slack webhook ${response.status} ${response.statusText}`)
  }
}

const sendEmail = async (to: string, subject: string, body: string): Promise<void> => {
  const transporter = getMailTransporter()
  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    text: body,
  })
}

// 수리업체에 수리 요청 알림 메일 직접 발송 (outbox 미사용 — 즉시 발송)
// 발송 실패는 caller가 처리 (자산관리자에게 ERP 알림 등)
interface VendorMaintenanceRequest {
  vendorEmail: string
  vendorContactName: string | null
  assetCode: string
  assetName: string
  modelName: string | null
  symptom: string
  description: string | null
  urgency: 'LOW' | 'MEDIUM' | 'HIGH'
  requesterName: string
  requesterEmail: string
}

const URGENCY_LABEL: Record<VendorMaintenanceRequest['urgency'], string> = {
  LOW: '낮음',
  MEDIUM: '보통',
  HIGH: '높음 (긴급)',
}

const sendMaintenanceVendorRequest = async (req: VendorMaintenanceRequest): Promise<void> => {
  if (!SMTP_CONFIGURED) {
    logger.warn({ event: 'vendor_email_skipped', reason: 'smtp_not_configured' }, 'SMTP 미설정')
    throw new Error('SMTP 미설정으로 메일을 보낼 수 없습니다.')
  }

  const greeting = req.vendorContactName ? `${req.vendorContactName}님` : '담당자님'
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
    .join('\n')

  const subject = `[자산관리 ERP] 수리 요청 — ${req.assetCode} ${req.assetName}`
  await sendEmail(req.vendorEmail, subject, body)
  logger.info(
    { event: 'vendor_email_sent', assetCode: req.assetCode, to: req.vendorEmail },
    '수리업체 메일 발송 완료',
  )
}

const processSlackOutbox = async (): Promise<ChannelResult> => {
  if (!SLACK_WEBHOOK_URL) {
    const result = await prisma.notification.updateMany({
      where: { channelStatus: 'PENDING' },
      data: { channelStatus: 'SKIPPED' },
    })
    logger.info({ event: 'slack_outbox_skipped', count: result.count }, 'Slack 미설정 — SKIPPED')
    return { scanned: result.count, sent: 0, failed: 0, skipped: result.count }
  }

  const pending = await prisma.notification.findMany({
    where: { channelStatus: 'PENDING', channelAttempts: { lt: MAX_CHANNEL_ATTEMPTS } },
    orderBy: { createdAt: 'asc' },
    take: OUTBOX_BATCH_SIZE,
  })

  let sent = 0
  let failed = 0
  for (const n of pending) {
    try {
      await sendSlack(`*${n.title}*\n${n.body}`)
      await prisma.notification.update({
        where: { id: n.id },
        data: { channelStatus: 'SENT', channelSentAt: new Date() },
      })
      sent++
    } catch (err) {
      const attempts = n.channelAttempts + 1
      const nextStatus = attempts >= MAX_CHANNEL_ATTEMPTS ? 'FAILED' : 'PENDING'
      await prisma.notification.update({
        where: { id: n.id },
        data: {
          channelAttempts: attempts,
          channelStatus: nextStatus,
          channelLastError: err instanceof Error ? err.message : String(err),
        },
      })
      if (nextStatus === 'FAILED') failed++
      logger.warn({ event: 'slack_send_failed', id: n.id, attempts }, 'Slack 발송 실패')
    }
  }
  return { scanned: pending.length, sent, failed, skipped: 0 }
}

const processEmailOutbox = async (): Promise<ChannelResult> => {
  if (!SMTP_CONFIGURED) {
    const result = await prisma.notification.updateMany({
      where: { emailStatus: 'PENDING' },
      data: { emailStatus: 'SKIPPED' },
    })
    logger.info({ event: 'email_outbox_skipped', count: result.count }, 'SMTP 미설정 — SKIPPED')
    return { scanned: result.count, sent: 0, failed: 0, skipped: result.count }
  }

  const pending = await prisma.notification.findMany({
    where: { emailStatus: 'PENDING', emailAttempts: { lt: MAX_CHANNEL_ATTEMPTS } },
    include: { recipient: { select: { email: true, name: true } } },
    orderBy: { createdAt: 'asc' },
    take: OUTBOX_BATCH_SIZE,
  })

  let sent = 0
  let failed = 0
  for (const n of pending) {
    try {
      await sendEmail(n.recipient.email, `[자산관리 ERP] ${n.title}`, n.body)
      await prisma.notification.update({
        where: { id: n.id },
        data: { emailStatus: 'SENT', emailSentAt: new Date() },
      })
      sent++
    } catch (err) {
      const attempts = n.emailAttempts + 1
      const nextStatus = attempts >= MAX_CHANNEL_ATTEMPTS ? 'FAILED' : 'PENDING'
      await prisma.notification.update({
        where: { id: n.id },
        data: {
          emailAttempts: attempts,
          emailStatus: nextStatus,
          emailLastError: err instanceof Error ? err.message : String(err),
        },
      })
      if (nextStatus === 'FAILED') failed++
      logger.warn({ event: 'email_send_failed', id: n.id, attempts }, '이메일 발송 실패')
    }
  }
  return { scanned: pending.length, sent, failed, skipped: 0 }
}

const processOutbox = async (): Promise<OutboxResult> => {
  const [slack, email] = await Promise.all([processSlackOutbox(), processEmailOutbox()])
  logger.info({ event: 'outbox_processed', slack, email }, 'outbox 처리 완료')
  return { slack, email }
}

// ─────────────────────────────────────────
// 사용자 알림 조회 / read 마킹
// ─────────────────────────────────────────

interface NotificationListItem {
  id: string
  type: NotificationType
  title: string
  body: string
  metadata: unknown
  readAt: Date | null
  createdAt: Date
}

const listMy = async (recipientId: string): Promise<NotificationListItem[]> => {
  const rows = await prisma.notification.findMany({
    where: { recipientId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  return rows.map((r) => ({
    id: r.id,
    type: r.type,
    title: r.title,
    body: r.body,
    metadata: r.metadata,
    readAt: r.readAt,
    createdAt: r.createdAt,
  }))
}

const markRead = async (id: string, recipientId: string): Promise<void> => {
  const row = await prisma.notification.findUnique({ where: { id } })
  if (!row) throw new AppError(404, '알림을 찾을 수 없습니다.')
  if (row.recipientId !== recipientId) {
    throw new AppError(403, '본인 알림만 읽음 처리할 수 있습니다.')
  }
  if (row.readAt) return
  await prisma.notification.update({ where: { id }, data: { readAt: new Date() } })
}

// ─────────────────────────────────────────
// 퇴사 알람 — D-7 + 활성 대여 보유자 → ADMIN 전원
// ─────────────────────────────────────────

const TERMINATION_WINDOW_DAYS = 7
const TERMINATION_DEDUPE_HOURS = 24 // 같은 user 의 알림이 24h 내에 있으면 skip

interface TerminationCheckResult {
  candidates: number
  notifications: number
  skippedDuplicates: number
}

const runTerminationCheck = async (): Promise<TerminationCheckResult> => {
  const now = new Date()
  const windowEnd = new Date(now.getTime() + TERMINATION_WINDOW_DAYS * 24 * 60 * 60 * 1000)
  const dedupeSince = new Date(now.getTime() - TERMINATION_DEDUPE_HOURS * 60 * 60 * 1000)

  // 활성 대여 (CHECKED_OUT 또는 RECEIVED) 보유 + 퇴사 D-7 이내
  const candidates = await prisma.user.findMany({
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
  })

  if (candidates.length === 0) {
    return { candidates: 0, notifications: 0, skippedDuplicates: 0 }
  }

  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN', isActive: true },
    select: { id: true },
  })

  if (admins.length === 0) {
    logger.warn({ event: 'termination_check_no_admins' }, '퇴사 알람 — ADMIN 없음')
    return { candidates: candidates.length, notifications: 0, skippedDuplicates: 0 }
  }

  let notifications = 0
  let skippedDuplicates = 0
  for (const user of candidates) {
    // 중복 방지: 같은 userId 에 대한 TERMINATION_RETURN_REMINDER 가 24h 내에 있으면 skip
    const recentDupe = await prisma.notification.findFirst({
      where: {
        type: 'TERMINATION_RETURN_REMINDER',
        createdAt: { gte: dedupeSince },
        metadata: { path: ['userId'], equals: user.id },
      },
      select: { id: true },
    })
    if (recentDupe) {
      skippedDuplicates++
      continue
    }

    const body = `${user.name} (퇴사일 ${user.terminationDate?.toISOString().slice(0, 10)}) 가 ${user.loans.length}건의 자산을 대여 중입니다. 회수 처리 부탁드립니다.`
    const assetCodes = user.loans.map((l) => l.asset.assetCode).join(', ')

    await createInAppMany(
      admins.map((a) => ({
        type: 'TERMINATION_RETURN_REMINDER' as NotificationType,
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
      })),
    )
    notifications += admins.length
  }

  logger.info(
    {
      event: 'termination_check_done',
      candidates: candidates.length,
      notifications,
      skippedDuplicates,
    },
    '퇴사 알람 체크 완료',
  )
  return { candidates: candidates.length, notifications, skippedDuplicates }
}

// ─────────────────────────────────────────
// 라이선스 만료 D-30/14/7/1 알림 — 라이선스별 마일스톤 개별 발송
// ─────────────────────────────────────────

const LICENSE_EXPIRY_MILESTONES = [30, 14, 7, 1] as const
const LICENSE_EXPIRY_DEDUPE_HOURS = 23

interface LicenseExpiryCheckResult {
  checked: number
  notified: number
  skipped: number
}

const runLicenseExpiryCheck = async (): Promise<LicenseExpiryCheckResult> => {
  const now = new Date()
  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)
  const dedupeWindow = new Date(now.getTime() - LICENSE_EXPIRY_DEDUPE_HOURS * 60 * 60 * 1000)

  // 각 마일스톤(D-30/14/7/1)에 해당하는 라이선스 수집
  const candidates: { id: string; name: string; expiryDate: Date; daysLeft: number }[] = []
  for (const days of LICENSE_EXPIRY_MILESTONES) {
    const windowStart = new Date(todayStart.getTime() + days * 24 * 60 * 60 * 1000)
    const windowEnd = new Date(windowStart.getTime() + 24 * 60 * 60 * 1000)
    const licenses = await prisma.license.findMany({
      where: { expiryDate: { gte: windowStart, lt: windowEnd } },
      select: { id: true, name: true, expiryDate: true },
    })
    for (const l of licenses) {
      if (l.expiryDate) candidates.push({ id: l.id, name: l.name, expiryDate: l.expiryDate, daysLeft: days })
    }
  }

  if (candidates.length === 0) return { checked: 0, notified: 0, skipped: 0 }

  // 최근 23h 내 발송된 (licenseId, daysLeft) 쌍 — 중복 방지
  const recentRaw = await prisma.notification.findMany({
    where: { type: 'LICENSE_EXPIRY_WARNING', createdAt: { gte: dedupeWindow } },
    select: { metadata: true },
  })
  const sentKeys = new Set(
    recentRaw
      .map((n) => {
        const m = n.metadata as { licenseId?: string; daysLeft?: number } | null
        return m?.licenseId && m.daysLeft != null ? `${m.licenseId}:${m.daysLeft}` : null
      })
      .filter((k): k is string => k !== null),
  )

  const recipients = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'ASSET_MANAGER'] }, isActive: true },
    select: { id: true },
  })

  let notified = 0
  let skipped = 0

  for (const c of candidates) {
    const key = `${c.id}:${c.daysLeft}`
    if (sentKeys.has(key)) { skipped++; continue }
    if (recipients.length === 0) { skipped++; continue }

    const expiryStr = c.expiryDate.toLocaleDateString('ko-KR')
    await createInAppMany(
      recipients.map((r) => ({
        type: 'LICENSE_EXPIRY_WARNING' as NotificationType,
        title: `라이선스 만료 D-${c.daysLeft}`,
        body: `[${c.name}] ${expiryStr} 만료 예정입니다.`,
        recipientId: r.id,
        metadata: { licenseId: c.id, daysLeft: c.daysLeft },
      })),
    )
    notified++
  }

  return { checked: candidates.length, notified, skipped }
}

// 컴플라이언스 알람 — 보증/라이선스 D-7 이내 + 경과 + 시트 초과 → ADMIN 전원
// ─────────────────────────────────────────

const COMPLIANCE_URGENT_DAYS = 7 // D-7 이내 만료 + 이미 경과
const COMPLIANCE_DEDUPE_HOURS = 24

interface ComplianceCheckResult {
  warrantyUrgent: number
  licenseUrgent: number
  overseated: number
  notifications: number
  skippedDuplicates: number
}

const runComplianceCheck = async (): Promise<ComplianceCheckResult> => {
  const now = new Date()
  const urgentEnd = new Date(now.getTime() + COMPLIANCE_URGENT_DAYS * 24 * 60 * 60 * 1000)
  const dedupeSince = new Date(now.getTime() - COMPLIANCE_DEDUPE_HOURS * 60 * 60 * 1000)

  // 보증: 이미 만료(<now) + D-7 이내 임박
  const warrantyUrgent = await prisma.hardwareAsset.findMany({
    where: { warrantyEnd: { lte: urgentEnd, not: null } },
    include: { asset: { select: { id: true, assetCode: true, name: true } } },
  })
  // 라이선스: 만료 경과 + D-7 임박
  const licenseUrgent = await prisma.license.findMany({
    where: { expiryDate: { lte: urgentEnd, not: null } },
    select: { id: true, name: true, expiryDate: true },
  })
  // 시트 초과 — 활성 할당(unassignedAt: null)만 집계 (회수 포함하면 false positive)
  const allLicenses = await prisma.license.findMany({
    include: { _count: { select: { assignments: { where: { unassignedAt: null } } } } },
  })
  const overseated = allLicenses.filter((l) => l._count.assignments > l.seatsTotal)

  const urgentCount = warrantyUrgent.length + licenseUrgent.length + overseated.length
  if (urgentCount === 0) {
    return {
      warrantyUrgent: 0,
      licenseUrgent: 0,
      overseated: 0,
      notifications: 0,
      skippedDuplicates: 0,
    }
  }

  const recipients = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'SECURITY_OFFICER'] }, isActive: true },
    select: { id: true },
  })
  if (recipients.length === 0) {
    logger.warn({ event: 'compliance_check_no_recipients' }, '컴플라이언스 알람 — ADMIN/SECURITY_OFFICER 없음')
    return {
      warrantyUrgent: warrantyUrgent.length,
      licenseUrgent: licenseUrgent.length,
      overseated: overseated.length,
      notifications: 0,
      skippedDuplicates: 0,
    }
  }

  // 24h dedupe — 한 ADMIN에게 같은 day 알림이 있으면 skip
  const recentDupe = await prisma.notification.findFirst({
    where: {
      type: 'COMPLIANCE_URGENT',
      createdAt: { gte: dedupeSince },
    },
    select: { id: true },
  })
  if (recentDupe) {
    return {
      warrantyUrgent: warrantyUrgent.length,
      licenseUrgent: licenseUrgent.length,
      overseated: overseated.length,
      notifications: 0,
      skippedDuplicates: 1,
    }
  }

  const body =
    `긴급 컴플라이언스 항목 ${urgentCount}건 — ` +
    `보증 만료/임박 ${warrantyUrgent.length}건, ` +
    `라이선스 만료/임박 ${licenseUrgent.length}건, ` +
    `시트 초과 ${overseated.length}건`

  await createInAppMany(
    recipients.map((a) => ({
      type: 'COMPLIANCE_URGENT' as NotificationType,
      title: '컴플라이언스 긴급 점검 필요',
      body,
      metadata: {
        warrantyAssetIds: warrantyUrgent.map((w) => w.asset.id),
        licenseIds: licenseUrgent.map((l) => l.id),
        overseatedLicenseIds: overseated.map((l) => l.id),
        checkedAt: now.toISOString(),
      },
      recipientId: a.id,
    })),
  )

  logger.info(
    {
      event: 'compliance_check_done',
      warrantyUrgent: warrantyUrgent.length,
      licenseUrgent: licenseUrgent.length,
      overseated: overseated.length,
      notifications: recipients.length,
    },
    '컴플라이언스 알람 발송',
  )
  return {
    warrantyUrgent: warrantyUrgent.length,
    licenseUrgent: licenseUrgent.length,
    overseated: overseated.length,
    notifications: recipients.length,
    skippedDuplicates: 0,
  }
}

// ─────────────────────────────────────────
// 정비(Maintenance) 관련 알림
// ─────────────────────────────────────────

// ADMIN 2차 승인 직후 → REPAIR_OWNER 모두에게 "정비 배정됨"
// 수리 담당자가 정비 건이 자기 큐에 들어왔음을 즉시 인지 가능
const createMaintenanceAssignedToRepairNotifications = async (params: {
  maintenanceId: string
  assetCode: string
  assetName: string
  title: string
}): Promise<void> => {
  const repairOwners = await prisma.user.findMany({
    where: { role: 'REPAIR_OWNER', isActive: true },
    select: { id: true },
  })
  if (repairOwners.length === 0) return

  await createInAppMany(
    repairOwners.map((u) => ({
      type: 'MAINTENANCE_ASSIGNED_TO_REPAIR' as const,
      title: '정비 배정됨',
      body: `${params.assetCode} (${params.assetName}) — ${params.title} 정비가 승인되어 배정되었습니다.`,
      metadata: { maintenanceId: params.maintenanceId, assetCode: params.assetCode },
      recipientId: u.id,
    })),
  )
}

// 정비 COMPLETED → 신청자(있다면) + REPAIR_OWNER 모두에게 "정비 완료"
const createMaintenanceCompletedNotifications = async (params: {
  maintenanceId: string
  assetCode: string
  assetName: string
  requesterId: string | null
}): Promise<void> => {
  const repairOwners = await prisma.user.findMany({
    where: { role: 'REPAIR_OWNER', isActive: true },
    select: { id: true },
  })

  const recipientIds = new Set<string>(repairOwners.map((u) => u.id))
  if (params.requesterId) recipientIds.add(params.requesterId)
  if (recipientIds.size === 0) return

  await createInAppMany(
    Array.from(recipientIds).map((id) => ({
      type: 'MAINTENANCE_COMPLETED' as const,
      title: '정비 완료',
      body: `${params.assetCode} (${params.assetName}) 정비가 완료되었습니다.`,
      metadata: { maintenanceId: params.maintenanceId, assetCode: params.assetCode },
      recipientId: id,
    })),
  )
}

const createMaintenanceVendorReportNotifications = async (params: {
  maintenanceId: string
  assetCode: string
  assetName: string
}): Promise<void> => {
  const repairOwners = await prisma.user.findMany({
    where: { role: 'REPAIR_OWNER', isActive: true },
    select: { id: true },
  })
  if (repairOwners.length === 0) return

  await createInAppMany(
    repairOwners.map((u) => ({
      type: 'MAINTENANCE_VENDOR_REPORT' as const,
      title: '업체 회신 도착',
      body: `${params.assetCode} (${params.assetName}) 수리업체 회신이 접수되었습니다. 검토 후 완료 처리하세요.`,
      metadata: { maintenanceId: params.maintenanceId, assetCode: params.assetCode },
      recipientId: u.id,
    })),
  )
}

const createLicenseFullNotification = async (
  params: { licenseId: string; licenseName: string; seatsTotal: number },
  tx?: PrismaTx,
): Promise<void> => {
  const admins = await (tx ?? prisma).user.findMany({
    where: { role: { in: ['ADMIN', 'SECURITY_OFFICER'] }, isActive: true },
    select: { id: true },
  })

  if (admins.length === 0) return

  const body = `라이선스 [${params.licenseName}] 의 모든 시트(${params.seatsTotal})가 할당되었습니다. 추가 구매가 필요할 수 있습니다.`

  await createInAppMany(
    admins.map((a) => ({
      type: 'COMPLIANCE_URGENT' as NotificationType,
      title: '라이선스 시트 가득 참',
      body,
      metadata: { licenseId: params.licenseId, seatsTotal: params.seatsTotal },
      recipientId: a.id,
    })),
    tx,
  )
}

// ─────────────────────────────────────────
// License 승인 워크플로 알림
// ─────────────────────────────────────────

const createLicensePendingManagerNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedByName: string
  teamLeadId: string
}): Promise<void> => {
  await createInApp({
    type: 'LICENSE_PENDING_MANAGER' as NotificationType,
    title: '라이선스 할당 요청 — 팀장 승인 필요',
    body: `${params.requestedByName}이(가) [${params.licenseName}] 라이선스 할당을 요청했습니다.`,
    metadata: { requestId: params.requestId, licenseId: params.licenseId },
    recipientId: params.teamLeadId,
  })
}

const createLicensePendingDeptNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  deptLeaderId: string
}): Promise<void> => {
  await createInApp({
    type: 'LICENSE_PENDING_DEPT' as NotificationType,
    title: '라이선스 할당 요청 — 부서장 승인 필요',
    body: `[${params.licenseName}] 라이선스 할당 요청이 팀장 승인을 완료했습니다.`,
    metadata: { requestId: params.requestId, licenseId: params.licenseId },
    recipientId: params.deptLeaderId,
  })
}

const createLicensePendingSecurityNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedByName?: string
}): Promise<void> => {
  // 활성 SECURITY_OFFICER 없으면 ADMIN 에게
  const recipients = await prisma.user.findMany({
    where: { role: 'SECURITY_OFFICER', isActive: true },
    select: { id: true },
  })
  const targets =
    recipients.length > 0
      ? recipients
      : await prisma.user.findMany({ where: { role: 'ADMIN', isActive: true }, select: { id: true } })

  if (targets.length === 0) return

  const body = params.requestedByName
    ? `${params.requestedByName}이(가) [${params.licenseName}] 라이선스 할당을 요청했습니다.`
    : `[${params.licenseName}] 라이선스 할당 요청이 보안 검토 단계에 진입했습니다.`

  await createInAppMany(
    targets.map((t) => ({
      type: 'LICENSE_PENDING_SECURITY' as NotificationType,
      title: '라이선스 할당 요청 — 보안 검토 필요',
      body,
      metadata: { requestId: params.requestId, licenseId: params.licenseId },
      recipientId: t.id,
    })),
  )
}

// 하위 호환 alias
const createLicenseRequestedNotification = createLicensePendingSecurityNotification

const createLicensePendingAdminNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
}): Promise<void> => {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN', isActive: true },
    select: { id: true },
  })
  if (admins.length === 0) return

  await createInAppMany(
    admins.map((a) => ({
      type: 'LICENSE_PENDING_ADMIN' as NotificationType,
      title: '라이선스 할당 요청 — 최종 승인 필요',
      body: `[${params.licenseName}] 라이선스 할당 요청이 보안 검토를 완료했습니다.`,
      metadata: { requestId: params.requestId, licenseId: params.licenseId },
      recipientId: a.id,
    })),
  )
}

const createLicenseApprovedNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedById: string
}): Promise<void> => {
  await createInApp({
    type: 'LICENSE_APPROVED' as NotificationType,
    title: '라이선스 할당 승인 완료',
    body: `[${params.licenseName}] 라이선스 할당 요청이 최종 승인되었습니다.`,
    metadata: { requestId: params.requestId, licenseId: params.licenseId },
    recipientId: params.requestedById,
  })
}

const createLicenseRejectedNotification = async (params: {
  requestId: string
  licenseId: string
  licenseName: string
  requestedById: string
  rejectReason: string | null
}): Promise<void> => {
  await createInApp({
    type: 'LICENSE_REJECTED' as NotificationType,
    title: '라이선스 할당 요청 거절',
    body: `[${params.licenseName}] 라이선스 할당 요청이 거절되었습니다.${params.rejectReason ? ` 사유: ${params.rejectReason}` : ''}`,
    metadata: { requestId: params.requestId, licenseId: params.licenseId },
    recipientId: params.requestedById,
  })
}

// ─────────────────────────────────────────
// Disposal 알림 wrapper (ADR 0005)
// ─────────────────────────────────────────

// 폐기 신청 → 신청자 제외 ASSET_MANAGER 전원에게 1차 승인 요청 알림
const createDisposalPendingManagerNotifications = async (
  params: { disposalId: string; assetCode: string; assetName: string; requesterId: string; requesterName: string },
  tx?: PrismaTx,
): Promise<void> => {
  const client = tx ?? prisma
  const recipients = await client.user.findMany({
    where: { role: 'ASSET_MANAGER', isActive: true, id: { not: params.requesterId } },
    select: { id: true },
  })
  if (recipients.length === 0) return
  await createInAppMany(
    recipients.map((r) => ({
      type: 'DISPOSAL_PENDING_MANAGER' as NotificationType,
      title: '폐기 신청 1차 승인 대기',
      body: `${params.requesterName} 님이 ${params.assetCode} (${params.assetName}) 폐기를 신청했습니다. 1차 승인을 부탁드립니다.`,
      metadata: { disposalId: params.disposalId, assetCode: params.assetCode, stage: 'PENDING_MANAGER' },
      recipientId: r.id,
    })),
    tx,
  )
}

// 1차 승인 → ADMIN 전원에게 최종 승인 요청 알림
const createDisposalPendingAdminNotifications = async (
  params: { disposalId: string; assetCode: string; assetName: string; requesterName: string },
  tx?: PrismaTx,
): Promise<void> => {
  const client = tx ?? prisma
  const recipients = await client.user.findMany({
    where: { role: 'ADMIN', isActive: true },
    select: { id: true },
  })
  if (recipients.length === 0) return
  await createInAppMany(
    recipients.map((r) => ({
      type: 'DISPOSAL_PENDING_ADMIN' as NotificationType,
      title: '폐기 최종 승인 대기',
      body: `${params.requesterName} 님의 ${params.assetCode} (${params.assetName}) 폐기 건이 1차 승인을 마쳤습니다. 최종 승인을 부탁드립니다.`,
      metadata: { disposalId: params.disposalId, assetCode: params.assetCode, stage: 'PENDING_ADMIN' },
      recipientId: r.id,
    })),
    tx,
  )
}

// 최종 승인 → 신청자에게 알림
const createDisposalApprovedNotification = async (
  params: { disposalId: string; assetCode: string; assetName: string; recipientUserId: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'DISPOSAL_APPROVED',
      title: '폐기 신청 승인됨',
      body: `${params.assetCode} (${params.assetName}) 폐기 신청이 최종 승인되었습니다. 완료 처리(증빙 첨부) 단계로 진행하세요.`,
      metadata: { disposalId: params.disposalId, assetCode: params.assetCode },
      recipientId: params.recipientUserId,
    },
    tx,
  )
}

// 어느 단계든 반려 → 신청자에게 알림
const createDisposalRejectedNotification = async (
  params: { disposalId: string; assetCode: string; assetName: string; recipientUserId: string; rejectReason: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'DISPOSAL_REJECTED',
      title: '폐기 신청 반려',
      body: `${params.assetCode} (${params.assetName}) 폐기 신청이 반려되었습니다. 사유: ${params.rejectReason}`,
      metadata: { disposalId: params.disposalId, assetCode: params.assetCode, rejectReason: params.rejectReason },
      recipientId: params.recipientUserId,
    },
    tx,
  )
}

// ─────────────────────────────────────────
// RepairReport 알림 (ADR 0009)
// ─────────────────────────────────────────

// 제출 → ADMIN 전원 + ASSET_MANAGER 전원에게
const createRepairReportSubmittedNotifications = async (params: {
  reportId: string
  title: string
  authorName: string
}): Promise<void> => {
  const recipients = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'ASSET_MANAGER'] }, isActive: true },
    select: { id: true },
  })
  if (recipients.length === 0) return

  await createInAppMany(
    recipients.map((r) => ({
      type: 'REPAIR_REPORT_SUBMITTED' as NotificationType,
      title: '수리 보고서 확인 요청',
      body: `${params.authorName} 님이 수리 보고서 "${params.title}" 를 제출했습니다. 확인 부탁드립니다.`,
      metadata: { reportId: params.reportId },
      recipientId: r.id,
    })),
  )
}

// ADMIN 또는 ASSET_MANAGER 확인 시 → 작성자에게
const createRepairReportAckedNotification = async (params: {
  reportId: string
  title: string
  ackerRole: 'ADMIN' | 'ASSET_MANAGER'
  recipientId: string
}): Promise<void> => {
  const roleLabel = params.ackerRole === 'ADMIN' ? '관리자' : '자산관리자'
  await createInApp({
    type: 'REPAIR_REPORT_ACKED',
    title: '수리 보고서 확인됨',
    body: `"${params.title}" 수리 보고서를 ${roleLabel}가 확인했습니다.`,
    metadata: { reportId: params.reportId, ackerRole: params.ackerRole },
    recipientId: params.recipientId,
  })
}

// 양측 모두 확인 완료(FINALIZED) → 작성자에게
const createRepairReportFinalizedNotification = async (params: {
  reportId: string
  title: string
  recipientId: string
}): Promise<void> => {
  await createInApp({
    type: 'REPAIR_REPORT_FINALIZED',
    title: '수리 보고서 최종 확인 완료',
    body: `"${params.title}" 수리 보고서가 관리자·자산관리자 양측 확인을 완료했습니다.`,
    metadata: { reportId: params.reportId },
    recipientId: params.recipientId,
  })
}

// 완료 처리 → 신청자에게 알림
const createDisposalCompletedNotification = async (
  params: { disposalId: string; assetCode: string; assetName: string; recipientUserId: string },
  tx?: PrismaTx,
): Promise<void> => {
  await createInApp(
    {
      type: 'DISPOSAL_COMPLETED',
      title: '폐기 완료',
      body: `${params.assetCode} (${params.assetName}) 폐기 처리가 완료되었습니다. 자산대장에서 RETIRED 로 분리되었습니다.`,
      metadata: { disposalId: params.disposalId, assetCode: params.assetCode },
      recipientId: params.recipientUserId,
    },
    tx,
  )
}

export const notificationService = {
  createInApp,
  createLoanApprovedNotification,
  createLoanCheckedOutNotification,
  createLoanReceivedNotifications,
  createLoanRequestedNotifications,
  createLoanPendingAdminNotifications,
  createLoanPendingDeptNotification,
  createLoanReturnRequestedNotifications,
  createLoanPendingReturnDeptNotification,
  processOutbox,
  listMy,
  markRead,
  runTerminationCheck,
  runLicenseExpiryCheck,
  runComplianceCheck,
  sendMaintenanceVendorRequest,
  createMaintenanceAssignedToRepairNotifications,
  createMaintenanceCompletedNotifications,
  createMaintenancePendingDeptNotification,
  createMaintenanceVendorReportNotifications,
  createLicenseFullNotification,
  // License 승인 워크플로 알림
  createLicensePendingManagerNotification,
  createLicensePendingDeptNotification,
  createLicensePendingSecurityNotification,
  createLicenseRequestedNotification,
  createLicensePendingAdminNotification,
  createLicenseApprovedNotification,
  createLicenseRejectedNotification,
  // ADR 0005 — Disposal 알림
  createDisposalPendingManagerNotifications,
  createDisposalPendingAdminNotifications,
  createDisposalApprovedNotification,
  createDisposalRejectedNotification,
  createDisposalCompletedNotification,
  // ADR 0009 — RepairReport 알림
  createRepairReportSubmittedNotifications,
  createRepairReportAckedNotification,
  createRepairReportFinalizedNotification,
}
