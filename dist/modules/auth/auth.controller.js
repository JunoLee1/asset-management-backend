"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const prisma_1 = require("../../lib/prisma");
const auth_service_1 = require("./auth.service");
const AppError_1 = require("../../lib/AppError");
// 요청 헤더에서 RT 메타데이터 (UA / IP) 추출
const extractMeta = (req) => ({
    userAgent: req.get('User-Agent') ?? null,
    ipAddress: req.ip ?? null,
});
const acceptInvite = async (req, res) => {
    const result = await auth_service_1.authService.acceptInvite(req.body, extractMeta(req));
    res.status(201).json(result);
};
const login = async (req, res) => {
    const result = await auth_service_1.authService.login(req.body, extractMeta(req));
    res.json(result);
};
const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        throw new AppError_1.AppError(400, '리프레시 토큰이 필요합니다.');
    const tokens = await auth_service_1.authService.refresh(refreshToken);
    res.json(tokens);
};
const logout = async (req, res) => {
    const { refreshToken } = (req.body ?? {});
    if (!refreshToken)
        throw new AppError_1.AppError(400, '리프레시 토큰이 필요합니다.');
    await auth_service_1.authService.logout(refreshToken, extractMeta(req));
    res.status(204).send();
};
const logoutAll = async (req, res) => {
    if (!req.user)
        throw new AppError_1.AppError(401, '인증이 필요합니다.');
    const result = await auth_service_1.authService.logoutAll(req.user.id, extractMeta(req));
    res.json(result);
};
const me = (req, res) => {
    res.json(req.user);
};
const setOutOfOffice = async (req, res) => {
    if (!req.user)
        throw new AppError_1.AppError(401, '인증이 필요합니다.');
    const { isOutOfOffice } = req.body;
    if (typeof isOutOfOffice !== 'boolean')
        throw new AppError_1.AppError(400, 'isOutOfOffice는 boolean이어야 합니다.');
    await prisma_1.prisma.user.update({ where: { id: req.user.id }, data: { isOutOfOffice } });
    res.json({ isOutOfOffice });
};
const changePassword = async (req, res) => {
    if (!req.user)
        throw new AppError_1.AppError(401, '인증이 필요합니다.');
    await auth_service_1.authService.changePassword(req.user.id, req.body, extractMeta(req));
    res.status(204).send();
};
// OAuth 콜백: passport가 req.user에 UserDto를 주입 → 토큰 발급 후 프론트엔드로 redirect
const oauthCallback = async (req, res) => {
    if (!req.user) {
        const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:5173';
        res.redirect(`${frontendUrl}/auth/callback?error=auth_failed&error_description=인증에 실패했습니다.`);
        return;
    }
    const { id, email, role } = req.user;
    const tokens = await auth_service_1.authService.issueTokenPair({ sub: id, email, role }, extractMeta(req));
    const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:5173';
    const params = new URLSearchParams({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
    });
    res.redirect(`${frontendUrl}/auth/callback?${params.toString()}`);
};
const requestPasswordReset = async (req, res) => {
    await auth_service_1.authService.requestPasswordReset(req.body);
    res.json({ message: '인증코드가 발송되었습니다.' });
};
const verifyResetCode = async (req, res) => {
    await auth_service_1.authService.verifyResetCode(req.body);
    res.json({ message: '비밀번호가 변경되었습니다.' });
};
exports.authController = {
    acceptInvite,
    login,
    refresh,
    logout,
    logoutAll,
    me,
    changePassword,
    oauthCallback,
    setOutOfOffice,
    requestPasswordReset,
    verifyResetCode,
};
//# sourceMappingURL=auth.controller.js.map