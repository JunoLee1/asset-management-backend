import { z } from 'zod';
export declare const listSoftwareQuerySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        SaaS: "SaaS";
        OnPremise: "OnPremise";
        Other: "Other";
    }>>;
    q: z.ZodOptional<z.ZodString>;
    permissionStatus: z.ZodOptional<z.ZodEnum<{
        UNCLASSIFIED: "UNCLASSIFIED";
        ALLOWED: "ALLOWED";
        DISALLOWED: "DISALLOWED";
    }>>;
    licenseCoverage: z.ZodPipe<z.ZodOptional<z.ZodEnum<{
        null: "null";
        true: "true";
        false: "false";
    }>>, z.ZodTransform<boolean | null | undefined, "null" | "true" | "false" | undefined>>;
}, z.core.$strip>;
export declare const updateSoftwareSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    vendor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<{
        SaaS: "SaaS";
        OnPremise: "OnPremise";
        Other: "Other";
    }>>;
    category: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    licenseCoverage: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const createSoftwareSchema: z.ZodObject<{
    name: z.ZodString;
    vendor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<{
        SaaS: "SaaS";
        OnPremise: "OnPremise";
        Other: "Other";
    }>>;
    category: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    licenseCoverage: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updatePermissionSchema: z.ZodObject<{
    status: z.ZodEnum<{
        UNCLASSIFIED: "UNCLASSIFIED";
        ALLOWED: "ALLOWED";
        DISALLOWED: "DISALLOWED";
    }>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const ingestPayloadSchema: z.ZodObject<{
    hostname: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        vendor: z.ZodOptional<z.ZodString>;
        executedOs: z.ZodString;
        lastUsedAt: z.ZodOptional<z.ZodString>;
        firstSeenAt: z.ZodOptional<z.ZodString>;
        durationSec: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=software.schema.d.ts.map