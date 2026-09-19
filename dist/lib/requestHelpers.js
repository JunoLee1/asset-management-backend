"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditContext = exports.requireId = exports.getRequester = void 0;
const AppError_1 = require("./AppError");
const getRequester = (req) => {
    if (!req.user)
        throw new AppError_1.AppError(401, '인증이 필요합니다.');
    return { id: req.user.id, role: req.user.role };
};
exports.getRequester = getRequester;
const requireId = (req, name = 'id') => {
    const id = req.params[name];
    if (typeof id !== 'string' || !id)
        throw new AppError_1.AppError(400, `${name} 가 필요합니다.`);
    return id;
};
exports.requireId = requireId;
const getAuditContext = (req) => ({
    ipAddress: req.ip ?? null,
    userAgent: req.headers['user-agent'] ?? null,
});
exports.getAuditContext = getAuditContext;
//# sourceMappingURL=requestHelpers.js.map