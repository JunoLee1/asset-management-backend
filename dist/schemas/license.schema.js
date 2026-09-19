"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignLicenseSchema = exports.listLicensesQuerySchema = exports.updateLicenseSchema = exports.createLicenseSchema = void 0;
const zod_1 = require("zod");
exports.createLicenseSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, '라이선스 이름은 필수입니다.'),
    productKey: zod_1.z.string().min(1).optional(),
    vendorId: zod_1.z.string().optional(),
    seatsTotal: zod_1.z.number().int().positive(),
    purchaseDate: zod_1.z.string().datetime(),
    expiryDate: zod_1.z.string().datetime().optional(),
    cost: zod_1.z.number().nonnegative().optional(),
})
    .refine((d) => !d.expiryDate || d.expiryDate >= d.purchaseDate, {
    message: '만료일은 구매일 이전일 수 없습니다.',
    path: ['expiryDate'],
});
exports.updateLicenseSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1).optional(),
    productKey: zod_1.z.string().nullable().optional(),
    vendorId: zod_1.z.string().nullable().optional(),
    seatsTotal: zod_1.z.number().int().positive().optional(),
    purchaseDate: zod_1.z.string().datetime().optional(),
    expiryDate: zod_1.z.string().datetime().nullable().optional(),
    cost: zod_1.z.number().nonnegative().nullable().optional(),
})
    // 둘 다 입력된 경우에만 zod 단에서 비교. 한 쪽만 변경되는 경우는 service 가 기존 값과 비교.
    .refine((d) => !d.purchaseDate || !d.expiryDate || d.expiryDate >= d.purchaseDate, {
    message: '만료일은 구매일 이전일 수 없습니다.',
    path: ['expiryDate'],
});
exports.listLicensesQuerySchema = zod_1.z.object({
    vendorId: zod_1.z.string().optional(),
    q: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
exports.assignLicenseSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    assetId: zod_1.z.string().optional(),
});
//# sourceMappingURL=license.schema.js.map