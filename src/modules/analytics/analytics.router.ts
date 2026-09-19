import { Router } from 'express'
import { analyticsController } from './analytics.controller'
import { authenticate } from '../../middlewares/authenticate'

const router = Router()

router.use(authenticate)

router.get('/distribution', analyticsController.getDistribution)
router.get('/utilization', analyticsController.getUtilization)
router.get('/utilization-by-department', analyticsController.getUtilizationByDepartment)
router.get('/value-by-department', analyticsController.getDepartmentValue)
router.get('/maintenance-cost', analyticsController.getMaintenanceCost)
router.get('/compliance-expiry', analyticsController.getComplianceExpiry)

router.get('/export/csv', analyticsController.exportAsCsv)
router.get('/export/excel', analyticsController.exportAsExcel)
router.get('/export/pdf', analyticsController.exportAsPdf)
router.get('/export/hwpx', analyticsController.exportAsHwpx)

export { router as analyticsRouter }
