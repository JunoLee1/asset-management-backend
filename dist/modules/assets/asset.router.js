"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetRouter = void 0;
const express_1 = require("express");
const asset_controller_1 = require("./asset.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const authorize_1 = require("../../middlewares/authorize");
const validate_1 = require("../../middlewares/validate");
const asset_schema_1 = require("../../schemas/asset.schema");
const cloudinary_1 = require("../../lib/cloudinary");
const router = (0, express_1.Router)();
exports.assetRouter = router;
router.use(authenticate_1.authenticate);
// 조회 — 모든 인증 사용자 가능 (USER는 service에서 본인 자산으로 제한)
router.get('/', asset_controller_1.assetController.list);
router.get('/:id/history', asset_controller_1.assetController.getHistory);
router.get('/:id', asset_controller_1.assetController.getById);
// 등록/수정/이미지 — ASSET_MANAGER, ADMIN
router.post('/', (0, authorize_1.authorize)('ASSET_MANAGER', 'ADMIN'), (0, validate_1.validateBody)(asset_schema_1.createAssetSchema), asset_controller_1.assetController.create);
router.patch('/:id', (0, authorize_1.authorize)('ASSET_MANAGER', 'ADMIN'), (0, validate_1.validateBody)(asset_schema_1.updateAssetSchema), asset_controller_1.assetController.update);
router.post('/:id/image', (0, authorize_1.authorize)('ASSET_MANAGER', 'ADMIN'), cloudinary_1.uploadAssetImage.single('image'), asset_controller_1.assetController.uploadImage);
router.delete('/:id/image', (0, authorize_1.authorize)('ASSET_MANAGER', 'ADMIN'), asset_controller_1.assetController.removeImage);
// 폐기 — ADMIN + ASSET_MANAGER(자산관리자) + APPROVER(승인자)
router.post('/:id/retire', (0, authorize_1.authorize)('ADMIN', 'ASSET_MANAGER', 'APPROVER'), asset_controller_1.assetController.retire);
//# sourceMappingURL=asset.router.js.map