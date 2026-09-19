import { z } from 'zod';
export declare const createCatalogSchema: z.ZodObject<{
    name: z.ZodString;
    manufacturer: z.ZodOptional<z.ZodString>;
    manufacturerId: z.ZodOptional<z.ZodString>;
    modelCode: z.ZodOptional<z.ZodString>;
    class: z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>;
    categoryId: z.ZodOptional<z.ZodString>;
    specs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    imageUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCatalogSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    manufacturerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    modelCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    class: z.ZodOptional<z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>>;
    categoryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    specs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const listCatalogQuerySchema: z.ZodObject<{
    class: z.ZodOptional<z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>>;
    categoryId: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=catalog.schema.d.ts.map