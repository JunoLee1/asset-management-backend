"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSoftDeleteWhere = buildSoftDeleteWhere;
exports.ensureNoReferences = ensureNoReferences;
const AppError_1 = require("../../lib/AppError");
function buildSoftDeleteWhere(options) {
    return options?.includeDeleted ? {} : { deletedAt: null };
}
function ensureNoReferences(checks) {
    const blocker = checks.find((c) => c.count > 0);
    if (blocker) {
        throw new AppError_1.AppError(409, `이 ${blocker.label}에 ${blocker.countLabel} ${blocker.count}${blocker.countLabel.endsWith('명') ? '' : '건'}이 있어 삭제할 수 없습니다.`);
    }
}
//# sourceMappingURL=master.helpers.js.map