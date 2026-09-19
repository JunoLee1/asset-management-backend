import { z } from 'zod';
export declare const createManufacturerSchema: z.ZodObject<{
    name: z.ZodString;
    aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const updateManufacturerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    aliases: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const listManufacturerQuerySchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateManufacturerBody = z.infer<typeof createManufacturerSchema>;
export type UpdateManufacturerBody = z.infer<typeof updateManufacturerSchema>;
export type ListManufacturerQuery = z.infer<typeof listManufacturerQuerySchema>;
//# sourceMappingURL=manufacturer.schema.d.ts.map