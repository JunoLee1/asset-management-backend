import { Router } from 'express'
import { authenticate } from '../../../middlewares/authenticate'
import { authorize } from '../../../middlewares/authorize'
import { detectedSoftwareController } from './detected-software.controller'

const router = Router()
router.use(authenticate)

router.get('/', authorize('ADMIN', 'ASSET_MANAGER', 'SECURITY_OFFICER'), detectedSoftwareController.list)
router.patch('/:id/review', authorize('ADMIN', 'ASSET_MANAGER'), detectedSoftwareController.review)
router.patch('/:id/approve', authorize('ADMIN', 'SECURITY_OFFICER'), detectedSoftwareController.approve)
router.patch('/:id/reject', authorize('ADMIN', 'SECURITY_OFFICER'), detectedSoftwareController.reject)

export { router as detectedSoftwareRouter }
