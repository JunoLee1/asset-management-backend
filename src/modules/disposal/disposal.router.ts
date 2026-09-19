import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import { validateBody, validateQuery } from '../../middlewares/validate'
import {
  createDisposalSchema,
  approveManagerDisposalSchema,
  approveAdminDisposalSchema,
  rejectDisposalSchema,
  completeDisposalSchema,
  listDisposalsQuerySchema,
} from '../../schemas/disposal.schema'
import { disposalController, handleExportExcel } from './disposal.controller'

const router:Router = Router()

// 기본 인증 — 모든 라우트
router.use(authenticate)

// `:id` 패턴보다 먼저 등록해야 '/export/excel' 이 id 로 매칭되지 않음
router.get('/export/excel', authorize('ADMIN', 'ASSET_MANAGER'), handleExportExcel)

router.get(
  '/',
  authorize('ASSET_MANAGER', 'ADMIN'),
  validateQuery(listDisposalsQuerySchema),
  disposalController.list,
)
router.post(
  '/',
  authorize('ASSET_MANAGER', 'ADMIN'),
  validateBody(createDisposalSchema),
  disposalController.create,
)
router.get('/:id', authorize('ASSET_MANAGER', 'ADMIN'), disposalController.getById)

// ADR 0005 — 1차 승인 (ASSET_MANAGER 또는 ADMIN 대행). 자기결재 차단은 service 안에서.
router.post(
  '/:id/approve-manager',
  authorize('ASSET_MANAGER', 'ADMIN'),
  validateBody(approveManagerDisposalSchema),
  disposalController.approveManager,
)

// ADR 0005 — 최종 승인 (ADMIN 전용).
router.post(
  '/:id/approve-admin',
  authorize('ADMIN'),
  validateBody(approveAdminDisposalSchema),
  disposalController.approveAdmin,
)

router.post(
  '/:id/reject',
  authorize('ASSET_MANAGER', 'ADMIN'),
  validateBody(rejectDisposalSchema),
  disposalController.reject,
)
router.post('/:id/cancel', authorize('ASSET_MANAGER', 'ADMIN'), disposalController.cancel)
router.post(
  '/:id/complete',
  authorize('ASSET_MANAGER', 'ADMIN'),
  validateBody(completeDisposalSchema),
  disposalController.complete,
)

export { router as disposalRouter }
