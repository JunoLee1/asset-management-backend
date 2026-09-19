import { z } from 'zod';
export declare const createMaintenanceSchema: z.ZodObject<{
    assetId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    scheduledAt: z.ZodString;
    vendorId: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<{
        REPAIR: "REPAIR";
        INSPECTION: "INSPECTION";
        UPGRADE: "UPGRADE";
    }>>;
}, z.core.$strip>;
export declare const updateMaintenanceSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    vendorId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    managerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING_MANAGER: "PENDING_MANAGER";
        PENDING_ADMIN: "PENDING_ADMIN";
        APPROVED: "APPROVED";
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        REJECTED: "REJECTED";
    }>>;
    cost: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payerType: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        USER: "USER";
        COMPANY: "COMPANY";
        SHARED: "SHARED";
    }>>>;
    payerUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payerNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conditionAfter: z.ZodOptional<z.ZodEnum<{
        EXCELLENT: "EXCELLENT";
        GOOD: "GOOD";
        FAIR: "FAIR";
        POOR: "POOR";
    }>>;
}, z.core.$strip>;
export declare const listMaintenancesQuerySchema: z.ZodObject<{
    assetId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING_MANAGER: "PENDING_MANAGER";
        PENDING_ADMIN: "PENDING_ADMIN";
        APPROVED: "APPROVED";
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        REJECTED: "REJECTED";
    }>>;
    managerId: z.ZodOptional<z.ZodString>;
    vendorId: z.ZodOptional<z.ZodString>;
    keyword: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const approveMaintenanceSchema: z.ZodObject<{
    conditionOverride: z.ZodOptional<z.ZodEnum<{
        EXCELLENT: "EXCELLENT";
        GOOD: "GOOD";
        FAIR: "FAIR";
        POOR: "POOR";
    }>>;
}, z.core.$strip>;
export declare const rejectMaintenanceSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export declare const assignMaintenanceSchema: z.ZodObject<{
    vendorId: z.ZodString;
}, z.core.$strip>;
export type CreateMaintenanceBody = z.infer<typeof createMaintenanceSchema>;
export type UpdateMaintenanceBody = z.infer<typeof updateMaintenanceSchema>;
export type ListMaintenancesQuery = z.infer<typeof listMaintenancesQuerySchema>;
export type RejectMaintenanceBody = z.infer<typeof rejectMaintenanceSchema>;
export type AssignMaintenanceBody = z.infer<typeof assignMaintenanceSchema>;
//# sourceMappingURL=maintenance.schema.d.ts.map