import { Router } from 'express'
import { assetController } from './asset.controller'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import { validateBody } from '../../middlewares/validate'
import { createAssetSchema, updateAssetSchema } from '../../schemas/asset.schema'
import { uploadAssetImage } from '../../lib/cloudinary'

const router:Router = Router()

router.use(authenticate)

// 조회 — 모든 인증 사용자 가능 (USER는 service에서 본인 자산으로 제한)
router.get('/', assetController.list)
// 정적 path 가 :id 보다 먼저 와야 함 (express 매칭 순서)
router.get('/stats/by-model', assetController.statsByModel)
router.get('/catalogs', assetController.listCatalogs)
router.get('/:id/history', assetController.getHistory)
router.get('/:id', assetController.getById)

// 등록/수정/이미지 — ASSET_MANAGER, ADMIN
router.post('/', authorize('ASSET_MANAGER', 'ADMIN'), validateBody(createAssetSchema), assetController.create)
router.patch('/:id', authorize('ASSET_MANAGER', 'ADMIN'), validateBody(updateAssetSchema), assetController.update)

router.post(
  '/:id/image',
  authorize('ASSET_MANAGER', 'ADMIN'),
  uploadAssetImage.single('image'),
  assetController.uploadImage,
)
router.delete('/:id/image', authorize('ASSET_MANAGER', 'ADMIN'), assetController.removeImage)

// ADR 0005: 자산 직접 폐기(retire) 진입점 제거. 모든 폐기는 POST /disposals 결재 흐름을 통과.

export { router as assetRouter }
