"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCatalogQuerySchema = exports.updateCatalogSchema = exports.createCatalogSchema = void 0;
const zod_1 = require("zod");
const classEnum = zod_1.z.enum(['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET']);
exports.createCatalogSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, '이름은 필수입니다.'),
    manufacturer: zod_1.z.string().optional(), // legacy free-text — P1c 에서 제거
    manufacturerId: zod_1.z.string().optional(), // 마스터 FK (권장)
    modelCode: zod_1.z.string().optional(),
    class: classEnum,
    categoryId: zod_1.z.string().optional(),
    specs: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    imageUrl: zod_1.z.string().url().optional(),
});
exports.updateCatalogSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    manufacturer: zod_1.z.string().nullable().optional(), // legacy
    manufacturerId: zod_1.z.string().nullable().optional(), // 마스터 FK
    modelCode: zod_1.z.string().nullable().optional(),
    class: classEnum.optional(),
    categoryId: zod_1.z.string().nullable().optional(),
    specs: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    imageUrl: zod_1.z.string().url().nullable().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.listCatalogQuerySchema = zod_1.z.object({
    class: classEnum.optional(),
    categoryId: zod_1.z.string().optional(),
    q: zod_1.z.string().optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
//# sourceMappingURL=catalog.schema.js.map