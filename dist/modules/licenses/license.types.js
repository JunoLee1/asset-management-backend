"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLicenseCoverage = void 0;
const calculateLicenseCoverage = (seatsUsed, seatsTotal, expiryDate) => {
    if (expiryDate && expiryDate < new Date()) {
        return 'EXPIRED';
    }
    if (seatsUsed > seatsTotal) {
        return 'NOT_COVERED';
    }
    if (seatsUsed >= seatsTotal * 0.8) {
        return 'PARTIAL';
    }
    return 'COVERED';
};
exports.calculateLicenseCoverage = calculateLicenseCoverage;
//# sourceMappingURL=license.types.js.map