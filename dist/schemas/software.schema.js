"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestPayloadSchema = exports.updatePermissionSchema = exports.createSoftwareSchema = exports.updateSoftwareSchema = exports.listSoftwareQuerySchema = void 0;
const zod_1 = require("zod");
exports.listSoftwareQuerySchema = zod_1.z.object({
    type: zod_1.z.enum(['SaaS', 'OnPremise', 'Other']).optional(),
    q: zod_1.z.string().optional(),
    permissionStatus: zod_1.z.enum(['UNCLASSIFIED', 'ALLOWED', 'DISALLOWED']).optional(),
    // 'true'/'false' 문자열로 들어오는 query string을 boolean으로 coerce
    licenseCoverage: zod_1.z
        .enum(['true', 'false', 'null'])
        .optional()
        .transform((v) => {
        if (v === 'true')
            return true;
        if (v === 'false')
            return false;
        if (v === 'null')
            return null;
        return undefined;
    }),
});
exports.updateSoftwareSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    vendor: zod_1.z.string().nullable().optional(),
    type: zod_1.z.enum(['SaaS', 'OnPremise', 'Other']).optional(),
    category: zod_1.z.string().optional(),
    description: zod_1.z.string().nullable().optional(),
    licenseCoverage: zod_1.z.boolean().nullable().optional(),
});
// 수동 카탈로그 등록 — name 필수, 나머지 옵션
exports.createSoftwareSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    vendor: zod_1.z.string().nullable().optional(),
    type: zod_1.z.enum(['SaaS', 'OnPremise', 'Other']).optional(),
    category: zod_1.z.string().optional(),
    description: zod_1.z.string().nullable().optional(),
    licenseCoverage: zod_1.z.boolean().nullable().optional(),
});
exports.updatePermissionSchema = zod_1.z.object({
    status: zod_1.z.enum(['UNCLASSIFIED', 'ALLOWED', 'DISALLOWED']),
    reason: zod_1.z.string().optional(),
});
// Ingest — endpoint agent push
exports.ingestPayloadSchema = zod_1.z.object({
    hostname: zod_1.z.string().min(1),
    userId: zod_1.z.string().optional(),
    items: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().min(1),
        vendor: zod_1.z.string().optional(),
        executedOs: zod_1.z.string().min(1),
        lastUsedAt: zod_1.z.string().datetime().optional(),
        firstSeenAt: zod_1.z.string().datetime().optional(),
        durationSec: zod_1.z.number().int().nonnegative().optional(),
    }))
        .min(1),
});
//# sourceMappingURL=software.schema.js.map