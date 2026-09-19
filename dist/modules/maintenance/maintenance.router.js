"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceRouter = void 0;
const express_1 = require("express");
const maintenance_controller_1 = require("./maintenance.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const authorize_1 = require("../../middlewares/authorize");
const router = (0, express_1.Router)();
exports.maintenanceRouter = router;
router.use(authenticate_1.authenticate);
// 조회 — 모든 인증 사용자 (service에서 역할별 필터링)
router.get('/', maintenance_controller_1.maintenanceController.list);
router.get('/:id', maintenance_controller_1.maintenanceController.getById);
// 신청·취소 — 모든 인증 사용자 (service에서 소유권 검증)
router.post('/', maintenance_controller_1.maintenanceController.create);
router.post('/:id/cancel', maintenance_controller_1.maintenanceController.cancel);
// 상태 관리 — ADMIN + TEAM_LEAD(1차) + REPAIR_OWNER(수리담당자)
router.patch('/:id', (0, authorize_1.authorize)('ADMIN', 'TEAM_LEAD', 'REPAIR_OWNER', 'ASSET_MANAGER'), maintenance_controller_1.maintenanceController.update);
router.post('/:id/approve', (0, authorize_1.authorize)('ADMIN', 'TEAM_LEAD'), maintenance_controller_1.maintenanceController.approve);
router.post('/:id/reject', (0, authorize_1.authorize)('ADMIN', 'TEAM_LEAD'), maintenance_controller_1.maintenanceController.reject);
// 수리담당자 배정 — REPAIR_OWNER 가 PENDING_ADMIN 단계에서 업체/기술자 배정 + 자동 APPROVED 전이
router.post('/:id/assign', (0, authorize_1.authorize)('ADMIN', 'REPAIR_OWNER'), maintenance_controller_1.maintenanceController.assign);
//# sourceMappingURL=maintenance.router.js.map