import { Router, type RequestHandler } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import { validateBody } from '../../middlewares/validate'
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  createTeamSchema,
  updateTeamSchema,
  createLocationSchema,
  updateLocationSchema,
  createVendorSchema,
  updateVendorSchema,
  rejectVendorSchema,
  blacklistVendorSchema,
  createAssetCategorySchema,
  updateAssetCategorySchema,
} from '../../schemas/master.schema'
import {
  departmentHandlers,
  teamHandlers,
  locationHandlers,
  vendorHandlers,
  assetCategoryHandlers,
  approveVendor,
  inactivateVendor,
  submitVendor,
  rejectVendor,
  blacklistVendor,
  getVendorDocuments,
  uploadVendorDocumentHandler,
  validateBrnHandler,
  createVendorDraft,
} from './master.controller'
import { uploadVendorDocument } from '../../lib/cloudinary'

interface Handlers {
  list: RequestHandler
  getById: RequestHandler
  create: RequestHandler
  update: RequestHandler
  remove: RequestHandler
  restore: RequestHandler
}

interface ResourceConfig {
  path: string
  handlers: Handlers
  createSchema: Parameters<typeof validateBody>[0]
  updateSchema: Parameters<typeof validateBody>[0]
}

const sharedResources: ResourceConfig[] = [
  {
    path: '/locations',
    handlers: locationHandlers,
    createSchema: createLocationSchema,
    updateSchema: updateLocationSchema,
  },
  {
    path: '/categories',
    handlers: assetCategoryHandlers,
    createSchema: createAssetCategorySchema,
    updateSchema: updateAssetCategorySchema,
  },
]

const router:Router = Router()

router.use(authenticate)

// 공통 리소스 — ADMIN + ASSET_MANAGER
for (const r of sharedResources) {
  router.get(r.path, r.handlers.list)
  router.get(`${r.path}/:id`, r.handlers.getById)
  router.post(r.path, authorize('ADMIN', 'ASSET_MANAGER'), validateBody(r.createSchema), r.handlers.create)
  router.patch(`${r.path}/:id`, authorize('ADMIN', 'ASSET_MANAGER'), validateBody(r.updateSchema), r.handlers.update)
  router.delete(`${r.path}/:id`, authorize('ADMIN', 'ASSET_MANAGER'), r.handlers.remove)
  router.post(`${r.path}/:id/restore`, authorize('ADMIN', 'ASSET_MANAGER'), r.handlers.restore)
}

// 부서 — 조회: 모든 인증 사용자 / CUD: ADMIN만
router.get('/departments', departmentHandlers.list)
router.get('/departments/:id', departmentHandlers.getById)
router.post('/departments', authorize('ADMIN'), validateBody(createDepartmentSchema), departmentHandlers.create)
router.patch('/departments/:id', authorize('ADMIN'), validateBody(updateDepartmentSchema), departmentHandlers.update)
router.delete('/departments/:id', authorize('ADMIN'), departmentHandlers.remove)
router.post('/departments/:id/restore', authorize('ADMIN'), departmentHandlers.restore)

// 팀 — 조회: 모든 인증 사용자 / CUD: ADMIN 또는 해당 부서장 (동적 체크)
router.get('/teams', teamHandlers.list)
router.get('/teams/:id', teamHandlers.getById)
router.post('/teams', validateBody(createTeamSchema), teamHandlers.create)
router.patch('/teams/:id', validateBody(updateTeamSchema), teamHandlers.update)
router.delete('/teams/:id', teamHandlers.remove)
router.post('/teams/:id/restore', teamHandlers.restore)

// vendors — REPAIR_OWNER: 초안 등록·수정·제출·서류 업로드 / ADMIN: 전체
router.get('/vendors', vendorHandlers.list)
router.get('/vendors/:id', vendorHandlers.getById)
router.post('/vendors', authorize('ADMIN', 'REPAIR_OWNER'), validateBody(createVendorSchema), createVendorDraft)
router.patch('/vendors/:id', authorize('ADMIN', 'REPAIR_OWNER'), validateBody(updateVendorSchema), vendorHandlers.update)
router.delete('/vendors/:id', authorize('ADMIN'), vendorHandlers.remove)
router.post('/vendors/:id/restore', authorize('ADMIN'), vendorHandlers.restore)
router.post('/vendors/:id/approve', authorize('ADMIN'), approveVendor)
router.post('/vendors/:id/inactivate', authorize('ADMIN'), inactivateVendor)
router.post('/vendors/:id/submit', authorize('ADMIN', 'REPAIR_OWNER'), submitVendor)
router.post('/vendors/:id/reject', authorize('ADMIN'), validateBody(rejectVendorSchema), rejectVendor)
router.post('/vendors/:id/blacklist', authorize('ADMIN'), validateBody(blacklistVendorSchema), blacklistVendor)
router.get('/vendors/:id/documents', getVendorDocuments)
router.post('/vendors/:id/documents', authorize('ADMIN', 'REPAIR_OWNER'), uploadVendorDocument.single('file'), uploadVendorDocumentHandler)

// 사업자등록번호 실시간 검증 (인증 사용자 — CORS 우회 + API 키 보호)
router.post('/vendors/validate-brn', validateBrnHandler)

export { router as masterRouter }
