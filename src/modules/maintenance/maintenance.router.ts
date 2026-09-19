import { Router } from 'express'
import { maintenanceController } from './maintenance.controller'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'

const router = Router()

router.use(authenticate)

// 조회 — 모든 인증 사용자 (service에서 역할별 필터링)
router.get('/', maintenanceController.list)
// 정적 path 가 :id 보다 먼저 와야 함 (express 매칭 순서)
router.get('/my', maintenanceController.my)
router.get('/:id', maintenanceController.getById)

// 신청·취소 — 모든 인증 사용자 (service에서 소유권 검증)
router.post('/', maintenanceController.create)
router.post('/:id/cancel', maintenanceController.cancel)

// 상태 관리 — ADMIN + TEAM_LEAD(1차) + REPAIR_OWNER(수리담당자)
router.patch(
  '/:id',
  authorize('ADMIN', 'TEAM_LEAD', 'REPAIR_OWNER', 'ASSET_MANAGER'),
  maintenanceController.update,
)
router.post('/:id/approve', authorize('ADMIN', 'TEAM_LEAD'), maintenanceController.approve)
router.post('/:id/approve-dept', authorize('ADMIN', 'DEPT_LEAD', 'REPAIR_OWNER'), maintenanceController.approveDept) // ADR 0003
router.post('/:id/reject', authorize('ADMIN', 'TEAM_LEAD'), maintenanceController.reject)
// 수리담당자 배정 — REPAIR_OWNER 가 PENDING_ADMIN 단계에서 업체/기술자 배정 + 자동 APPROVED 전이
router.post('/:id/assign', authorize('ADMIN', 'REPAIR_OWNER'), maintenanceController.assign)

export { router as maintenanceRouter }
