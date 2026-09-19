import { Router } from 'express'
import { dashboardController } from './dashboard.controller'
import { authenticate } from '../../middlewares/authenticate'

const router = Router()

router.use(authenticate)

router.get('/', dashboardController.getDashboard)

export { router as dashboardRouter }
