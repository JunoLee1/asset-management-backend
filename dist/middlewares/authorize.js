"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: '인증이 필요합니다.' });
        return;
    }
    if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: '권한이 없습니다.' });
        return;
    }
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map