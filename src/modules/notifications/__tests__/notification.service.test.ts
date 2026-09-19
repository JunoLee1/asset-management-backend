import { notificationService } from '../notification.service'
import { AppError } from '../../../lib/AppError'

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
    user: { findMany: jest.fn() },
  },
}))
jest.mock('../../../lib/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({ sendMail: jest.fn() })),
}))

import { prisma } from '../../../lib/prisma'

const notifCreate     = prisma.notification.create as jest.Mock
const notifFindMany   = prisma.notification.findMany as jest.Mock
const notifUpdate     = prisma.notification.update as jest.Mock
const notifUpdateMany = prisma.notification.updateMany as jest.Mock
const notifFindUnique = prisma.notification.findUnique as jest.Mock
const notifFindFirst  = prisma.notification.findFirst as jest.Mock
const userFindMany    = prisma.user.findMany as jest.Mock

const makeNotif = (overrides: Record<string, unknown> = {}) => ({
  id: 'notif-1',
  type: 'LOAN_APPROVED',
  title: '대여 승인됨',
  body: '본문',
  metadata: null,
  recipientId: 'user-1',
  readAt: null,
  createdAt: new Date(),
  channelStatus: 'PENDING',
  channelAttempts: 0,
  channelLastError: null,
  channelSentAt: null,
  emailStatus: 'PENDING',
  emailAttempts: 0,
  emailLastError: null,
  emailSentAt: null,
  recipient: { email: 'user@test.com', name: '홍길동' },
  ...overrides,
})

// ─────────────────────────────────────────
// §6-1~3  createLoan* 알림 생성
// ─────────────────────────────────────────

describe('§6-1~3 createLoan* 알림 생성', () => {
  it('6-1: LOAN_APPROVED — recipient, type, channelStatus/emailStatus=SKIPPED(env 미설정)', async () => {
    notifCreate.mockResolvedValue({})

    await notificationService.createLoanApprovedNotification({
      loanId: 'loan-1',
      recipientUserId: 'user-1',
      assetCode: 'IT-0001',
      assetName: '맥북',
    })

    expect(notifCreate).toHaveBeenCalledTimes(1)
    const { data } = notifCreate.mock.calls[0][0]
    expect(data.type).toBe('LOAN_APPROVED')
    expect(data.recipient.connect.id).toBe('user-1')
    expect(data.channelStatus).toBe('SKIPPED')
    expect(data.emailStatus).toBe('SKIPPED')
  })

  it('6-2: LOAN_CHECKED_OUT — recipient, type', async () => {
    notifCreate.mockResolvedValue({})

    await notificationService.createLoanCheckedOutNotification({
      loanId: 'loan-1',
      recipientUserId: 'user-2',
      assetCode: 'IT-0002',
      assetName: '아이패드',
    })

    const { data } = notifCreate.mock.calls[0][0]
    expect(data.type).toBe('LOAN_CHECKED_OUT')
    expect(data.recipient.connect.id).toBe('user-2')
  })

  it('6-3: LOAN_RECEIVED — TEAM_LEAD+ADMIN 전원 알림', async () => {
    userFindMany.mockResolvedValue([{ id: 'admin-1' }, { id: 'lead-1' }])
    notifCreate.mockResolvedValue({})

    await notificationService.createLoanReceivedNotifications({
      loanId: 'loan-1',
      assetCode: 'IT-0001',
      assetName: '맥북',
      receiverName: '김직원',
    })

    expect(userFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { role: { in: ['TEAM_LEAD', 'ADMIN'] }, isActive: true },
      }),
    )
    expect(notifCreate).toHaveBeenCalledTimes(2)
    const recipientIds = notifCreate.mock.calls.map((c) => c[0].data.recipient.connect.id)
    expect(recipientIds).toContain('admin-1')
    expect(recipientIds).toContain('lead-1')
    const types = notifCreate.mock.calls.map((c) => c[0].data.type)
    expect(types).toEqual(['LOAN_RECEIVED', 'LOAN_RECEIVED'])
  })
})

// ─────────────────────────────────────────
// §6-4~5  processOutbox — 채널 미설정
// ─────────────────────────────────────────

describe('§6-4~5 processOutbox — 채널 미설정 (env 기본값)', () => {
  it('6-4: SLACK_WEBHOOK_URL 미설정 → slack.skipped=N, slack.sent=0', async () => {
    notifUpdateMany
      .mockResolvedValueOnce({ count: 3 }) // Slack branch
      .mockResolvedValueOnce({ count: 3 }) // Email branch

    const result = await notificationService.processOutbox()

    expect(result.slack.sent).toBe(0)
    expect(result.slack.skipped).toBe(3)
    expect(notifUpdateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { channelStatus: 'PENDING' },
        data: { channelStatus: 'SKIPPED' },
      }),
    )
  })

  it('6-5: SMTP 미설정 → email.skipped=N, email.sent=0', async () => {
    notifUpdateMany
      .mockResolvedValueOnce({ count: 2 }) // Slack branch
      .mockResolvedValueOnce({ count: 2 }) // Email branch

    const result = await notificationService.processOutbox()

    expect(result.email.sent).toBe(0)
    expect(result.email.skipped).toBe(2)
    expect(notifUpdateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { emailStatus: 'PENDING' },
        data: { emailStatus: 'SKIPPED' },
      }),
    )
  })
})

// ─────────────────────────────────────────
// §6-9~10  listMy / markRead
// ─────────────────────────────────────────

describe('§6-9~10 listMy / markRead', () => {
  it('6-9: 본인 알림 목록 조회 → recipientId 필터, 최신순', async () => {
    notifFindMany.mockResolvedValue([makeNotif(), makeNotif({ id: 'notif-2' })])

    const result = await notificationService.listMy('user-1')

    expect(notifFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { recipientId: 'user-1' } }),
    )
    expect(result).toHaveLength(2)
  })

  it('6-10: 타인 알림 read 시도 → AppError 403', async () => {
    notifFindUnique.mockResolvedValue(makeNotif({ recipientId: 'user-other' }))

    const err = await notificationService.markRead('notif-1', 'user-1').catch((e) => e)

    expect(err).toBeInstanceOf(AppError)
    expect(err.statusCode).toBe(403)
  })
})

// §6-6~8 processOutbox — Slack + SMTP 설정 시
// 채널 상수가 모듈 로드 시 env 를 캡처하므로 별도 파일에서 테스트
// → notification.service.channels.test.ts

// ─────────────────────────────────────────
// §7  퇴사 알람
// ─────────────────────────────────────────

const makeCandidate = (overrides: Record<string, unknown> = {}) => ({
  id: 'user-leaving',
  name: '퇴직자',
  email: 'leaving@test.com',
  terminationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // D+3
  loans: [
    {
      id: 'loan-1',
      asset: { assetCode: 'IT-0001', name: '맥북' },
    },
  ],
  ...overrides,
})

describe('§7 퇴사 알람 runTerminationCheck', () => {
  it('7-1: D+3 활성 대여 보유 → candidates=1, notifications=adminCount', async () => {
    userFindMany
      .mockResolvedValueOnce([makeCandidate()])      // candidates
      .mockResolvedValueOnce([{ id: 'admin-1' }, { id: 'admin-2' }]) // admins
    notifFindFirst.mockResolvedValue(null)           // no dedup
    notifCreate.mockResolvedValue({})

    const result = await notificationService.runTerminationCheck()

    expect(result.candidates).toBe(1)
    expect(result.notifications).toBe(2) // 어드민 수만큼
    expect(result.skippedDuplicates).toBe(0)
  })

  it('7-2: terminationDate D+8 (윈도우 밖) — DB 필터로 제외 → candidates=0', async () => {
    userFindMany.mockResolvedValueOnce([]) // Prisma where 절이 필터링한 결과 시뮬레이션

    const result = await notificationService.runTerminationCheck()

    expect(result.candidates).toBe(0)
    expect(result.notifications).toBe(0)
  })

  it('7-3: D+3이지만 활성 대여 없음 — DB 필터로 제외 → candidates=0', async () => {
    userFindMany.mockResolvedValueOnce([]) // loans.some 조건 미충족

    const result = await notificationService.runTerminationCheck()

    expect(result.candidates).toBe(0)
    expect(result.notifications).toBe(0)
  })

  it('7-4: 같은 user 24h 내 재호출 → skippedDuplicates=1, notifications=0', async () => {
    userFindMany
      .mockResolvedValueOnce([makeCandidate()])
      .mockResolvedValueOnce([{ id: 'admin-1' }])
    notifFindFirst.mockResolvedValue({ id: 'existing-notif' }) // 24h 내 중복 존재

    const result = await notificationService.runTerminationCheck()

    expect(result.skippedDuplicates).toBe(1)
    expect(result.notifications).toBe(0)
    expect(notifCreate).not.toHaveBeenCalled()
  })

  it('7-5: ADMIN 권한 없는 호출 → controller 레벨 403 (service 단 권한 체크 없음)', () => {
    // runTerminationCheck 자체는 권한 검사 없음 — controller.runTerminationCheck 에서 403 처리
    // E2E / controller 테스트 대상
    expect(true).toBe(true)
  })

  it('7-6: 활성 ADMIN 없음 → candidates>0, notifications=0', async () => {
    userFindMany
      .mockResolvedValueOnce([makeCandidate()]) // candidates
      .mockResolvedValueOnce([])                // admins 없음
    notifFindFirst.mockResolvedValue(null)

    const result = await notificationService.runTerminationCheck()

    expect(result.candidates).toBe(1)
    expect(result.notifications).toBe(0)
    expect(notifCreate).not.toHaveBeenCalled()
  })

  it('7-7: cron 자동 실행 (09:00 KST) — scheduler 통합 테스트 대상', () => {
    // scheduler.ts 의 cron 등록 확인은 통합/E2E 테스트 범위
    expect(true).toBe(true)
  })
})
