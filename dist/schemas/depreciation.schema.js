"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDepreciationSchema = void 0;
const zod_1 = require("zod");
const methodEnum = zod_1.z.enum(['STRAIGHT_LINE', 'DECLINING_BALANCE']);
exports.upsertDepreciationSchema = zod_1.z.object({
    method: methodEnum,
    usefulLifeYears: zod_1.z.number().int().positive().max(50),
    salvageValue: zod_1.z.number().nonnegative(),
    annualRate: zod_1.z.number().min(0).max(1).optional(), // 0~1 (예: 0.2 = 20%)
});
//# sourceMappingURL=depreciation.schema.js.map