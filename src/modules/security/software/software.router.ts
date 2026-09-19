import { Router } from 'express'
import { softwareController } from './software.controller'
import { authenticate } from '../../../middlewares/authenticate'

const router:Router = Router()

router.use(authenticate)

// ADR 0010 — 고정 경로를 /:id 보다 먼저 선언해야 매칭됨
router.get('/summary', softwareController.getSummary)
router.get('/disallowed-events', softwareController.listDisallowedEvents)

// Ingest — endpoint agent push (ADR 0002 Stage 0)
router.post('/ingest', softwareController.ingest)

// 인벤토리 CRUD
router.get('/', softwareController.list)
router.post('/', softwareController.create)
router.get('/:id', softwareController.getById)
router.patch('/:id', softwareController.update)
router.delete('/:id', softwareController.remove)

// 허가유무 변경 (ADR 0002 결정 2 — SECURITY_OFFICER 별 라우트)
router.patch('/:id/permission', softwareController.updatePermission)

// ADR 0011 — 차단 관리 (SECURITY_OFFICER)
router.patch('/:id/block', softwareController.toggleBlock)
router.get('/:id/block-events', softwareController.listBlockEvents)

export { router as softwareRouter }
