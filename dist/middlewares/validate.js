"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const formatErrors = (issues) => issues.map((e) => ({ field: e.path.join('.'), message: e.message }));
const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: '입력값이 올바르지 않습니다.',
            errors: formatErrors(result.error.issues),
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.validateBody = validateBody;
//# sourceMappingURL=validate.js.map