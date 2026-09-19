import type { Request, Response } from 'express'
import crypto from 'crypto'
import { prisma } from '../../lib/prisma'
import { logger } from '../../lib/logger'
import { notificationService } from '../notifications/notification.service'

const SIGNING_KEY = process.env['MAILGUN_WEBHOOK_SIGNING_KEY'] ?? ''

/**
 * Mailgun webhook signature verification
 * https://documentation.mailgun.com/docs/mailgun/user-manual/tracking-messages/#securing-webhooks
 */
function verifyMailgunSignature(params: {
  timestamp: string
  token: string
  signature: string
}): boolean {
  if (!SIGNING_KEY) return true // 개발 환경: signing key 미설정 시 검증 skip
  const value = params.timestamp + params.token
  const expected = crypto.createHmac('sha256', SIGNING_KEY).update(value).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(params.signature))
}

/**
 * 이메일 본문에서 견적 금액 파싱
 * 패턴: "금액: 150,000원", "수리비: 150000원", "비용: \150,000" 등
 */
function parseCostFromBody(body: string): number | null {
  const patterns = [
    /(?:금액|수리비|비용|견적|청구)[^\d]*(\d[\d,]+)\s*원/,
    /₩\s*(\d[\d,]+)/,
    /(\d[\d,]+)\s*원\s*(?:입니다|됩니다|청구)/,
  ]
  for (const pattern of patterns) {
    const match = pattern.exec(body)
    if (match?.[1]) {
      const num = parseInt(match[1].replace(/,/g, ''), 10)
      if (!Number.isNaN(num) && num > 0) return num
    }
  }
  return null
}

/**
 * 이메일 제목 또는 본문에서 자산 코드 추출
 * 자산 코드 패턴: 영문+숫자 조합 (예: IT-2024-001, ASSET-001)
 */
function extractAssetCode(subject: string, body: string): string | null {
  // DB에서 찾을 때 대소문자 구분 없이 처리하므로, 패턴만 추출
  const pattern = /\b([A-Z]{1,6}-\d{4}-\d{3,6}|[A-Z]{2,6}-\d{3,6})\b/i
  const fromSubject = pattern.exec(subject)
  if (fromSubject?.[1]) return fromSubject[1].toUpperCase()
  const fromBody = pattern.exec(body)
  if (fromBody?.[1]) return fromBody[1].toUpperCase()
  return null
}

export async function handleMailgunInbound(req: Request, res: Response): Promise<void> {
  // Mailgun은 multipart/form-data로 전송
  const body = req.body as Record<string, string>

  const timestamp = body['timestamp'] ?? ''
  const token = body['token'] ?? ''
  const signature = body['signature'] ?? ''

  if (!verifyMailgunSignature({ timestamp, token, signature })) {
    logger.warn('[mailgun-inbound] signature verification failed')
    res.status(406).json({ error: 'invalid signature' })
    return
  }

  const messageId: string = body['Message-Id'] ?? body['message-id'] ?? ''
  const subject: string = body['subject'] ?? ''
  const strippedText: string = body['stripped-text'] ?? body['body-plain'] ?? ''
  const bodyText = strippedText || (body['body-plain'] ?? '')

  logger.info(`[mailgun-inbound] received: subject="${subject}" messageId="${messageId}"`)

  // dedup: 동일 Message-Id는 무시
  if (messageId) {
    const existing = await prisma.maintenance.findFirst({
      where: { vendorReportEmailId: messageId },
      select: { id: true },
    })
    if (existing) {
      logger.info(`[mailgun-inbound] duplicate messageId=${messageId}, skipping`)
      res.status(200).json({ ok: true, skipped: true })
      return
    }
  }

  // 자산 코드로 IN_PROGRESS 정비 조회
  const assetCode = extractAssetCode(subject, bodyText)
  if (!assetCode) {
    logger.warn(`[mailgun-inbound] no asset code found in subject="${subject}"`)
    res.status(200).json({ ok: true, skipped: true, reason: 'no_asset_code' })
    return
  }

  const maintenance = await prisma.maintenance.findFirst({
    where: {
      status: 'IN_PROGRESS',
      asset: { assetCode: { equals: assetCode, mode: 'insensitive' } },
    },
    select: {
      id: true,
      asset: { select: { assetCode: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!maintenance) {
    logger.warn(`[mailgun-inbound] no IN_PROGRESS maintenance for assetCode=${assetCode}`)
    res.status(200).json({ ok: true, skipped: true, reason: 'no_matching_maintenance' })
    return
  }

  const parsedCost = parseCostFromBody(bodyText)

  await prisma.maintenance.update({
    where: { id: maintenance.id },
    data: {
      vendorReportBody: bodyText.slice(0, 4000),
      vendorReportParsedCost: parsedCost ?? undefined,
      vendorReportReceivedAt: new Date(),
      ...(messageId ? { vendorReportEmailId: messageId } : {}),
    },
  })

  await notificationService.createMaintenanceVendorReportNotifications({
    maintenanceId: maintenance.id,
    assetCode: maintenance.asset.assetCode,
    assetName: maintenance.asset.name,
  })

  logger.info(
    `[mailgun-inbound] saved vendor report for maintenance=${maintenance.id} assetCode=${assetCode} parsedCost=${parsedCost}`,
  )

  res.status(200).json({ ok: true, maintenanceId: maintenance.id })
}
