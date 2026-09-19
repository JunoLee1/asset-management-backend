"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const authorize_1 = require("../../middlewares/authorize");
const validate_1 = require("../../middlewares/validate");
const master_schema_1 = require("../../schemas/master.schema");
const master_controller_1 = require("./master.controller");
const cloudinary_1 = require("../../lib/cloudinary");
const resources = [
    {
        path: '/departments',
        handlers: master_controller_1.departmentHandlers,
        createSchema: master_schema_1.createDepartmentSchema,
        updateSchema: master_schema_1.updateDepartmentSchema,
    },
    {
        path: '/teams',
        handlers: master_controller_1.teamHandlers,
        createSchema: master_schema_1.createTeamSchema,
        updateSchema: master_schema_1.updateTeamSchema,
    },
    {
        path: '/locations',
        handlers: master_controller_1.locationHandlers,
        createSchema: master_schema_1.createLocationSchema,
        updateSchema: master_schema_1.updateLocationSchema,
    },
    {
        path: '/categories',
        handlers: master_controller_1.assetCategoryHandlers,
        createSchema: master_schema_1.createAssetCategorySchema,
        updateSchema: master_schema_1.updateAssetCategorySchema,
    },
];
const router = (0, express_1.Router)();
exports.masterRouter = router;
router.use(authenticate_1.authenticate);
for (const r of resources) {
    // 조회 — 모든 인증 사용자
    router.get(r.path, r.handlers.list);
    router.get(`${r.path}/:id`, r.handlers.getById);
    // 변경 — ADMIN + ASSET_MANAGER (자산관리자가 마스터 관리)
    router.post(r.path, (0, authorize_1.authorize)('ADMIN', 'ASSET_MANAGER'), (0, validate_1.validateBody)(r.createSchema), r.handlers.create);
    router.patch(`${r.path}/:id`, (0, authorize_1.authorize)('ADMIN', 'ASSET_MANAGER'), (0, validate_1.validateBody)(r.updateSchema), r.handlers.update);
    router.delete(`${r.path}/:id`, (0, authorize_1.authorize)('ADMIN', 'ASSET_MANAGER'), r.handlers.remove);
    router.post(`${r.path}/:id/restore`, (0, authorize_1.authorize)('ADMIN', 'ASSET_MANAGER'), r.handlers.restore);
}
// vendors — REPAIR_OWNER: 초안 등록·수정·제출·서류 업로드 / ADMIN: 전체
router.get('/vendors', master_controller_1.vendorHandlers.list);
router.get('/vendors/:id', master_controller_1.vendorHandlers.getById);
router.post('/vendors', (0, authorize_1.authorize)('ADMIN', 'REPAIR_OWNER'), (0, validate_1.validateBody)(master_schema_1.createVendorSchema), master_controller_1.createVendorDraft);
router.patch('/vendors/:id', (0, authorize_1.authorize)('ADMIN', 'REPAIR_OWNER'), (0, validate_1.validateBody)(master_schema_1.updateVendorSchema), master_controller_1.vendorHandlers.update);
router.delete('/vendors/:id', (0, authorize_1.authorize)('ADMIN'), master_controller_1.vendorHandlers.remove);
router.post('/vendors/:id/restore', (0, authorize_1.authorize)('ADMIN'), master_controller_1.vendorHandlers.restore);
router.post('/vendors/:id/approve', (0, authorize_1.authorize)('ADMIN'), master_controller_1.approveVendor);
router.post('/vendors/:id/inactivate', (0, authorize_1.authorize)('ADMIN'), master_controller_1.inactivateVendor);
router.post('/vendors/:id/submit', (0, authorize_1.authorize)('ADMIN', 'REPAIR_OWNER'), master_controller_1.submitVendor);
router.post('/vendors/:id/reject', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(master_schema_1.rejectVendorSchema), master_controller_1.rejectVendor);
router.post('/vendors/:id/blacklist', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(master_schema_1.blacklistVendorSchema), master_controller_1.blacklistVendor);
router.get('/vendors/:id/documents', master_controller_1.getVendorDocuments);
router.post('/vendors/:id/documents', (0, authorize_1.authorize)('ADMIN', 'REPAIR_OWNER'), cloudinary_1.uploadVendorDocument.single('file'), master_controller_1.uploadVendorDocumentHandler);
// 사업자등록번호 실시간 검증 (인증 사용자 — CORS 우회 + API 키 보호)
router.post('/vendors/validate-brn', master_controller_1.validateBrnHandler);
//# sourceMappingURL=master.router.js.map