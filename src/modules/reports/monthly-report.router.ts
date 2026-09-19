import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import {
  handleListTeamMonthly,
  handleDetailTeamMonthly,
  handleExportTeamMonthly,
  handleListDeptMonthly,
  handleDetailDeptMonthly,
  handleExportDeptMonthly,
  handleExportTeamAnnual,
  handleExportDeptAnnual,
  handleSubmitTeamMonthly,
  handleReviewTeamMonthly,
  handleRejectTeamMonthly,
  handleFinalizeDeptMonthly,
} from './monthly-report.controller'

const router:Router = Router()

router.use(authenticate)

// 팀 월말 보고서
router.get(
  '/monthly-team',
  authorize('TEAM_LEAD', 'DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleListTeamMonthly,
)
router.get(
  '/monthly-team/:id',
  authorize('TEAM_LEAD', 'DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleDetailTeamMonthly,
)
router.get(
  '/monthly-team/:id/export',
  authorize('TEAM_LEAD', 'DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleExportTeamMonthly,
)

// 부서 월말 보고서
router.get(
  '/monthly-dept',
  authorize('DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleListDeptMonthly,
)
router.get(
  '/monthly-dept/:id',
  authorize('DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleDetailDeptMonthly,
)
router.get(
  '/monthly-dept/:id/export',
  authorize('DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleExportDeptMonthly,
)

// 팀 월말 보고서 상태 전이
router.post(
  '/monthly-team/:id/submit',
  authorize('TEAM_LEAD', 'ADMIN'),
  handleSubmitTeamMonthly,
)
router.post(
  '/monthly-team/:id/review',
  authorize('DEPT_LEAD', 'ADMIN'),
  handleReviewTeamMonthly,
)
router.post(
  '/monthly-team/:id/reject',
  authorize('DEPT_LEAD', 'ADMIN'),
  handleRejectTeamMonthly,
)

// 부서 월말 보고서 상태 전이
router.post(
  '/monthly-dept/:id/finalize',
  authorize('DEPT_LEAD', 'ADMIN'),
  handleFinalizeDeptMonthly,
)

// 팀 연말 보고서 export
router.get(
  '/annual-team/:id/export',
  authorize('TEAM_LEAD', 'DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleExportTeamAnnual,
)

// 부서 연말 보고서 export
router.get(
  '/annual-dept/:id/export',
  authorize('DEPT_LEAD', 'ADMIN', 'ASSET_MANAGER'),
  handleExportDeptAnnual,
)

export { router as monthlyReportRouter }
