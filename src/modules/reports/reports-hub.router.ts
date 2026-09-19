import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import { handleSummary } from './report.controller'

const router = Router()

router.use(authenticate)
router.get('/summary', authorize('ADMIN', 'ASSET_MANAGER'), handleSummary)

export { router as reportsHubRouter }
