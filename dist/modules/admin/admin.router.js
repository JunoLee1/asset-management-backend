"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const user_controller_1 = require("./user.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const authorize_1 = require("../../middlewares/authorize");
const validate_1 = require("../../middlewares/validate");
const auth_schema_1 = require("../../schemas/auth.schema");
const user_schema_1 = require("../../schemas/user.schema");
const router = (0, express_1.Router)();
exports.adminRouter = router;
router.use(authenticate_1.authenticate);
// ── 조회 — ADMIN + TEAM_LEAD (팀원 파악 목적)
router.get('/users', (0, authorize_1.authorize)('ADMIN', 'TEAM_LEAD'), user_controller_1.userController.list);
router.get('/users/:id', (0, authorize_1.authorize)('ADMIN', 'TEAM_LEAD'), user_controller_1.userController.getById);
router.get('/users/:id/history', (0, authorize_1.authorize)('ADMIN', 'TEAM_LEAD'), user_controller_1.userController.listHistory);
// ── 변경 — ADMIN 전용 (역할·활성 상태 변경은 운영자만)
router.post('/users/invite', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(auth_schema_1.inviteUserSchema), admin_controller_1.adminController.inviteUser);
router.patch('/users/:id', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(user_schema_1.updateUserSchema), user_controller_1.userController.update);
router.post('/users/:id/deactivate', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(user_schema_1.deactivateUserSchema), user_controller_1.userController.deactivate);
router.post('/users/:id/activate', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(user_schema_1.activateUserSchema), user_controller_1.userController.activate);
router.post('/users/:id/reinvite', (0, authorize_1.authorize)('ADMIN'), (0, validate_1.validateBody)(user_schema_1.reinviteUserSchema), user_controller_1.userController.reinvite);
//# sourceMappingURL=admin.router.js.map