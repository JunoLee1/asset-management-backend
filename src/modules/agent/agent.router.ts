// ADR 0011/0012 — Agent router

import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { agentController } from './agent.controller'

const router = Router()

// block-list 는 인증 없이도 조회 가능
router.get('/block-list', agentController.getBlockList)

router.use(authenticate)

// 이하 인증 필요
router.post('/block-events', agentController.reportBlockEvent)
router.post('/collect', agentController.collect)
// ADR 0010 — processName 기반 카탈로그 매칭 ingest
router.post('/ingest', agentController.ingest)

export { router as agentRouter }
