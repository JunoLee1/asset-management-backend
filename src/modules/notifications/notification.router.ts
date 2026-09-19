import { Router } from 'express'
import { notificationController } from './notification.controller'
import { authenticate } from '../../middlewares/authenticate'

const router = Router()
router.use(authenticate)

router.get('/my', notificationController.my)
router.post('/:id/read', notificationController.markRead)
router.post('/process-outbox', notificationController.processOutbox) // ADMIN manual trigger
router.post('/run-termination-check', notificationController.runTerminationCheck) // ADMIN manual trigger
router.post('/run-compliance-check', notificationController.runComplianceCheck) // ADMIN manual trigger

export { router as notificationRouter }
