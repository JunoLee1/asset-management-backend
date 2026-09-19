import nodemailer from 'nodemailer'
import { env } from '../config/env'
import { logger } from './logger'

let transporter: nodemailer.Transporter | null = null

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporter) return transporter

  if (env.nodeEnv === 'production') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.smtp.gmailUser,
        pass: env.smtp.gmailAppPassword,
      },
    })
    logger.info('[Mailer] Gmail SMTP 트랜스포터 초기화')
  } else {
    // 개발환경: Ethereal 임시 계정 자동 생성
    const testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    })
    logger.info({ user: testAccount.user }, '[Mailer] Ethereal 테스트 계정 생성 완료')
  }

  return transporter
}

export interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail(options: MailOptions): Promise<void> {
  const transport = await getTransporter()

  logger.debug({ to: options.to, subject: options.subject }, '[Mailer] 메일 발송 시작')

  const info = await transport.sendMail({
    from: env.smtp.from,
    ...options,
  })

  if (env.nodeEnv !== 'production') {
    const previewUrl = nodemailer.getTestMessageUrl(info)
    logger.info({ to: options.to, previewUrl }, '[Mailer] 발송 완료 — 미리보기 URL')
  } else {
    logger.info({ to: options.to, messageId: info.messageId }, '[Mailer] 발송 완료')
  }
}
