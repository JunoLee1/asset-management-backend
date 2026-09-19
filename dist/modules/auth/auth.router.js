"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("./auth.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const validate_1 = require("../../middlewares/validate");
const auth_schema_1 = require("../../schemas/auth.schema");
const router = (0, express_1.Router)();
exports.authRouter = router;
// ── 로컬 인증 ───────────────────────────────────────────────────────────────
router.post('/accept-invite', (0, validate_1.validateBody)(auth_schema_1.acceptInviteSchema), auth_controller_1.authController.acceptInvite);
router.post('/login', (0, validate_1.validateBody)(auth_schema_1.loginSchema), auth_controller_1.authController.login);
router.post('/refresh', auth_controller_1.authController.refresh);
router.post('/logout', auth_controller_1.authController.logout);
router.post('/logout-all', authenticate_1.authenticate, auth_controller_1.authController.logoutAll);
router.get('/me', authenticate_1.authenticate, auth_controller_1.authController.me);
router.patch('/me/password', authenticate_1.authenticate, (0, validate_1.validateBody)(auth_schema_1.changePasswordSchema), auth_controller_1.authController.changePassword);
router.patch('/me/out-of-office', authenticate_1.authenticate, auth_controller_1.authController.setOutOfOffice);
// ── 비밀번호 리셋 ────────────────────────────────────────────────────────────
router.post('/password-reset', (0, validate_1.validateBody)(auth_schema_1.requestPasswordResetSchema), auth_controller_1.authController.requestPasswordReset);
router.post('/password-reset/verify', (0, validate_1.validateBody)(auth_schema_1.verifyResetCodeSchema), auth_controller_1.authController.verifyResetCode);
// ── Google OAuth ────────────────────────────────────────────────────────────
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport_1.default.authenticate('google', { session: false, failureRedirect: '/auth/google/failed' }), auth_controller_1.authController.oauthCallback);
router.get('/google/failed', (_req, res) => {
    res.status(401).json({ message: 'Google 인증에 실패했습니다.' });
});
// ── Kakao OAuth ─────────────────────────────────────────────────────────────
router.get('/kakao', passport_1.default.authenticate('kakao', { session: false }));
router.get('/kakao/callback', passport_1.default.authenticate('kakao', { session: false, failureRedirect: '/auth/kakao/failed' }), auth_controller_1.authController.oauthCallback);
router.get('/kakao/failed', (_req, res) => {
    res.status(401).json({ message: 'Kakao 인증에 실패했습니다.' });
});
//# sourceMappingURL=auth.router.js.map