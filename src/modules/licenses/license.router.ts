import { Router } from 'express'
import { licenseController } from './license.controller'
import { authenticate } from '../../middlewares/authenticate'

const router = Router()

router.use(authenticate)

router.get('/', licenseController.list)
router.get('/:id', licenseController.getById)
router.post('/', licenseController.create)
router.patch('/:id', licenseController.update)
router.delete('/:id', licenseController.remove)

// 직접 회수는 유지 (긴급 회수용)
router.post('/:id/assignments/:assignmentId/unassign', licenseController.unassign)

// 승인 결재 흐름
router.post('/:id/requests', licenseController.createRequest)
router.get('/:id/requests', licenseController.listRequests)
router.post('/:id/requests/:requestId/approve-manager', licenseController.approveManagerHandler)
router.post('/:id/requests/:requestId/approve-dept', licenseController.approveDeptHandler)
router.post('/:id/requests/:requestId/approve-security', licenseController.approveSecurityHandler)
router.post('/:id/requests/:requestId/approve-admin', licenseController.approveAdminHandler)
router.post('/:id/requests/:requestId/reject', licenseController.rejectHandler)
router.post('/:id/requests/:requestId/cancel', licenseController.cancelHandler)

export { router as licenseRouter }
