import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import {
  handleList,
  handleDetail,
  handleStats,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleSubmit,
  handleAcknowledge,
} from './report.controller'

const router:Router = Router()

router.use(authenticate)

// 통계 미리보기 (보고서 생성 전 period picker에서 사용)
router.get('/stats', authorize('REPAIR_OWNER', 'ADMIN', 'ASSET_MANAGER'), handleStats)

// 목록·상세 — ADR 0009: ASSET_MANAGER 열람 추가
router.get('/', authorize('REPAIR_OWNER', 'ADMIN', 'ASSET_MANAGER'), handleList)
router.get('/:id', authorize('REPAIR_OWNER', 'ADMIN', 'ASSET_MANAGER'), handleDetail)

// REPAIR_OWNER만 작성·수정·삭제
router.post('/', authorize('REPAIR_OWNER'), handleCreate)
router.patch('/:id', authorize('REPAIR_OWNER'), handleUpdate)
router.delete('/:id', authorize('REPAIR_OWNER'), handleDelete)

// ADR 0009 — REPAIR_OWNER 제출
router.post('/:id/submit', authorize('REPAIR_OWNER'), handleSubmit)

// ADR 0009 — ADMIN · ASSET_MANAGER 독립 확인
router.post('/:id/acknowledge', authorize('ADMIN', 'ASSET_MANAGER'), handleAcknowledge)

export { router as repairReportRouter }
