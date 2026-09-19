import { z } from 'zod';
export declare const createLicenseSchema: z.ZodObject<{
    name: z.ZodString;
    productKey: z.ZodOptional<z.ZodString>;
    vendorId: z.ZodOptional<z.ZodString>;
    seatsTotal: z.ZodNumber;
    purchaseDate: z.ZodString;
    expiryDate: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateLicenseSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    productKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vendorId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    seatsTotal: z.ZodOptional<z.ZodNumber>;
    purchaseDate: z.ZodOptional<z.ZodString>;
    expiryDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cost: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export declare const listLicensesQuerySchema: z.ZodObject<{
    vendorId: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const assignLicenseSchema: z.ZodObject<{
    userId: z.ZodString;
    assetId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateLicenseBody = z.infer<typeof createLicenseSchema>;
export type UpdateLicenseBody = z.infer<typeof updateLicenseSchema>;
export type ListLicensesQuery = z.infer<typeof listLicensesQuerySchema>;
export type AssignLicenseBody = z.infer<typeof assignLicenseSchema>;
//# sourceMappingURL=license.schema.d.ts.map