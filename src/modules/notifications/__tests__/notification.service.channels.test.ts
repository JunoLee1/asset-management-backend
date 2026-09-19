// 채널(Slack/SMTP) 설정 환경 테스트 — §6-6, 6-7, 6-8
// SLACK_WEBHOOK_URL 등이 모듈 로드 시 캡처되므로 별도 파일에서 env 주입 후 require

const mockNotifFindMany  = jest.fn()
const mockNotifUpdate    = jest.fn()
const mockNotifUpdateMany = jest.fn()
const mockSendMail       = jest.fn()

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    notification: {
      create: jest.fn(),
      findMany: mockNotifFindMany,
      update: mockNotifUpdate,
      updateMany: mockNotifUpdateMany,
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
  createTransport: jest.fn(() => ({ sendMail: mockSendMail })),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let svc: any

const makeNotif = (overrides: Record<string, unknown> = {}) => ({
  id: 'notif-1',
  type: 'LOAN_APPROVED',
  title: '대여 승인됨',
  body: '본문',
  recipient: { email: 'user@test.com', name: '홍길동' },
  channelStatus: 'PENDING',
  channelAttempts: 0,
  channelLastError: null,
  emailStatus: 'PENDING',
  emailAttempts: 0,
  emailLastError: null,
  ...overrides,
})

describe('§6-6~8 processOutbox — Slack + SMTP 설정', () => {
  beforeAll(() => {
    process.env['SLACK_WEBHOOK_URL'] = 'https://hooks.slack.com/test'
    process.env['SMTP_HOST'] = 'smtp.test.com'
    process.env['SMTP_PORT'] = '587'
    process.env['SMTP_FROM'] = 'noreply@test.com'
    // jest.mock 은 lazy: require 시 env 가 이미 set → SLACK_WEBHOOK_URL 캡처됨
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    svc = require('../notification.service').notificationService
  })

  afterAll(() => {
    delete process.env['SLACK_WEBHOOK_URL']
    delete process.env['SMTP_HOST']
    delete process.env['SMTP_PORT']
    delete process.env['SMTP_FROM']
  })

  it('6-6: Slack + SMTP 정상 발송 → slack.sent=1, email.sent=1', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as typeof fetch
    mockSendMail.mockResolvedValue(undefined)
    mockNotifFindMany
      .mockResolvedValueOnce([makeNotif()])  // slack outbox query
      .mockResolvedValueOnce([makeNotif()])  // email outbox query
    mockNotifUpdate.mockResolvedValue({})

    const result = await svc.processOutbox()

    expect(result.slack.sent).toBe(1)
    expect(result.slack.failed).toBe(0)
    expect(result.email.sent).toBe(1)
    expect(result.email.failed).toBe(0)
  })

  it('6-7: Slack 실패 channelAttempts 2→3 → channelStatus=FAILED, email 독립', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('webhook down')) as typeof fetch
    mockSendMail.mockResolvedValue(undefined)
    mockNotifFindMany
      .mockResolvedValueOnce([makeNotif({ channelAttempts: 2 })])  // slack
      .mockResolvedValueOnce([makeNotif()])                         // email (독립, 성공)
    mockNotifUpdate.mockResolvedValue({})

    await svc.processOutbox()

    const slackUpdate = mockNotifUpdate.mock.calls.find(
      (c: [{ data: Record<string, unknown> }]) => c[0].data['channelStatus'] !== undefined,
    )
    expect(slackUpdate?.[0].data['channelAttempts']).toBe(3)
    expect(slackUpdate?.[0].data['channelStatus']).toBe('FAILED')
  })

  it('6-8: 이메일 실패 emailAttempts 2→3 → emailStatus=FAILED, slack 독립', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as typeof fetch
    mockSendMail.mockRejectedValue(new Error('SMTP error'))
    mockNotifFindMany
      .mockResolvedValueOnce([makeNotif()])                          // slack (독립, 성공)
      .mockResolvedValueOnce([makeNotif({ emailAttempts: 2 })])      // email
    mockNotifUpdate.mockResolvedValue({})

    await svc.processOutbox()

    const emailUpdate = mockNotifUpdate.mock.calls.find(
      (c: [{ data: Record<string, unknown> }]) => c[0].data['emailStatus'] !== undefined,
    )
    expect(emailUpdate?.[0].data['emailAttempts']).toBe(3)
    expect(emailUpdate?.[0].data['emailStatus']).toBe('FAILED')
  })
})
