"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depreciationRouter = void 0;
const express_1 = require("express");
const depreciation_controller_1 = require("./depreciation.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.depreciationRouter = router;
router.use(authenticate_1.authenticate);
router.get('/:assetId', depreciation_controller_1.depreciationController.getByAssetId); // 감가상각 단일 조회
router.put('/:assetId', depreciation_controller_1.depreciationController.upsert); //감가상각 수정
router.delete('/:assetId', depreciation_controller_1.depreciationController.remove); // 감가상각 삭제
//# sourceMappingURL=depreciation.router.js.map