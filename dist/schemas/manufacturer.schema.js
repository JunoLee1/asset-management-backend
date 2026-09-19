"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listManufacturerQuerySchema = exports.updateManufacturerSchema = exports.createManufacturerSchema = void 0;
const zod_1 = require("zod");
exports.createManufacturerSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, 'canonical 이름은 필수입니다.'),
    aliases: zod_1.z.array(zod_1.z.string().trim().min(1)).optional(),
});
exports.updateManufacturerSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1).optional(),
    aliases: zod_1.z.array(zod_1.z.string().trim().min(1)).optional(),
    isActive: zod_1.z.boolean().optional(),
})
    .refine((v) => Object.keys(v).length > 0, { message: '변경할 항목이 없습니다.' });
exports.listManufacturerQuerySchema = zod_1.z.object({
    q: zod_1.z.string().optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
//# sourceMappingURL=manufacturer.schema.js.map