import { Router } from 'express'
import multer from 'multer'
import { handleMailgunInbound } from './mailgun-inbound.handler'

// Mailgun inbound parse는 multipart/form-data로 전송됨
const upload = multer()

export const webhookRouter = Router()

// POST /webhooks/mailgun-inbound
// Mailgun Inbound Parse Webhook — 수리업체 이메일 회신 수신
webhookRouter.post('/mailgun-inbound', upload.none(), handleMailgunInbound)
