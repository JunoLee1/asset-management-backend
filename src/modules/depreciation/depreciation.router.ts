import { Router } from 'express'
import { depreciationController } from './depreciation.controller'
import { authenticate } from '../../middlewares/authenticate'

const router:Router = Router()

router.use(authenticate)

router.get('/', depreciationController.list)                  // 감가상각 전체 목록
router.get('/:assetId', depreciationController.getByAssetId) // 감가상각 단일 조회
router.put('/:assetId', depreciationController.upsert) //감가상각 수정
router.delete('/:assetId', depreciationController.remove) // 감가상각 삭제

export { router as depreciationRouter }
