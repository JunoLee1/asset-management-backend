import { Router } from 'express'
import { adminController } from './admin.controller'
import { userController } from './user.controller'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import { validateBody } from '../../middlewares/validate'
import { inviteRateLimit, masterWriteRateLimit } from '../../middlewares/writeRateLimit'
import { inviteUserSchema } from '../../schemas/auth.schema'
import {
  updateUserSchema,
  deactivateUserSchema,
  activateUserSchema,
  reinviteUserSchema,
} from '../../schemas/user.schema'
import { notificationService } from '../notifications/notification.service'

const router:Router = Router()

router.use(authenticate)

// ── 조회 — ADMIN + TEAM_LEAD (팀원 파악) + DEPT_LEAD / REPAIR_OWNER (부서원 파악)
router.get('/users', authorize('ADMIN', 'TEAM_LEAD', 'DEPT_LEAD', 'REPAIR_OWNER'), userController.list)
router.get('/users/:id', authorize('ADMIN', 'TEAM_LEAD', 'DEPT_LEAD', 'REPAIR_OWNER'), userController.getById)
router.get('/users/:id/history', authorize('ADMIN', 'TEAM_LEAD', 'DEPT_LEAD', 'REPAIR_OWNER'), userController.listHistory)

// ── 변경 — ADMIN 전용 (역할·활성 상태 변경은 운영자만)
router.post('/users/invite', authorize('ADMIN'), inviteRateLimit, validateBody(inviteUserSchema), adminController.inviteUser)
router.patch('/users/:id', authorize('ADMIN'), masterWriteRateLimit, validateBody(updateUserSchema), userController.update)
router.post('/users/:id/deactivate', authorize('ADMIN'), masterWriteRateLimit, validateBody(deactivateUserSchema), userController.deactivate)
router.post('/users/:id/activate', authorize('ADMIN'), masterWriteRateLimit, validateBody(activateUserSchema), userController.activate)
router.post('/users/:id/reinvite', authorize('ADMIN'), masterWriteRateLimit, validateBody(reinviteUserSchema), userController.reinvite)

router.get('/summary', authorize('ADMIN'), adminController.getSummary)

// ── Dev: 알림 처리 테스트
router.post('/test-outbox', authorize('ADMIN'), async (_req, res, next) => {
  try {
    const result = await notificationService.processOutbox()
    res.json({ message: 'outbox processed', result })
  } catch (err) {
    next(err)
  }
})

export { router as adminRouter }
