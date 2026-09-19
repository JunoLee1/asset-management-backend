"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_MAP = exports.CONDITION_MAP = void 0;
// LoanReturnCondition → AssetCondition 매핑 (검수 결과 → 자산 condition 갱신)
// 가정: GOOD→GOOD, MINOR_DAMAGE→FAIR, MAJOR_DAMAGE→POOR, LOST→POOR (자산은 남지만 분실 상태)
exports.CONDITION_MAP = {
    GOOD: 'GOOD',
    MINOR_DAMAGE: 'FAIR',
    MAJOR_DAMAGE: 'POOR',
    LOST: 'LOST',
};
// LoanReturnCondition → ReturnAction 매핑 (FE 응답용)
exports.ACTION_MAP = {
    GOOD: 'OK',
    MINOR_DAMAGE: 'NEEDS_REPAIR',
    MAJOR_DAMAGE: 'NEEDS_REPAIR',
    LOST: 'WRITE_OFF',
};
//# sourceMappingURL=loan.types.js.map