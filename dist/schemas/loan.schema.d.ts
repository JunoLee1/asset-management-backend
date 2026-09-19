import { z } from 'zod';
export declare const createLoanSchema: z.ZodObject<{
    assetId: z.ZodString;
    purpose: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const approveLoanSchema: z.ZodObject<{
    checkoutLocationId: z.ZodOptional<z.ZodString>;
    checkoutMemo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const rejectLoanSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export declare const recallLoanSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export declare const returnLoanSchema: z.ZodObject<{
    conditionAfter: z.ZodOptional<z.ZodString>;
    damageNote: z.ZodOptional<z.ZodString>;
    resultAction: z.ZodOptional<z.ZodString>;
    maintenanceScheduledAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const inspectLoanSchema: z.ZodObject<{
    condition: z.ZodEnum<{
        GOOD: "GOOD";
        LOST: "LOST";
        MINOR_DAMAGE: "MINOR_DAMAGE";
        MAJOR_DAMAGE: "MAJOR_DAMAGE";
    }>;
    damageNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const listLoansQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        PENDING_MANAGER: "PENDING_MANAGER";
        PENDING_ADMIN: "PENDING_ADMIN";
        APPROVED: "APPROVED";
        CANCELLED: "CANCELLED";
        REJECTED: "REJECTED";
        CHECKED_OUT: "CHECKED_OUT";
        RECEIVED: "RECEIVED";
        PENDING_INSPECTION: "PENDING_INSPECTION";
        INSPECTED: "INSPECTED";
        PENDING_RETURN_ADMIN: "PENDING_RETURN_ADMIN";
        RETURNED: "RETURNED";
        RECALLED: "RECALLED";
    }>>;
    userId: z.ZodOptional<z.ZodString>;
    assetId: z.ZodOptional<z.ZodString>;
    overdueOnly: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    keyword: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const lookupLoanQuerySchema: z.ZodObject<{
    assetCode: z.ZodString;
}, z.core.$strip>;
export type CreateLoanBody = z.infer<typeof createLoanSchema>;
export type ApproveLoanBody = z.infer<typeof approveLoanSchema>;
export type RejectLoanBody = z.infer<typeof rejectLoanSchema>;
export type RecallLoanBody = z.infer<typeof recallLoanSchema>;
export type ReturnLoanBody = z.infer<typeof returnLoanSchema>;
export type InspectLoanBody = z.infer<typeof inspectLoanSchema>;
export type ListLoansQuery = z.infer<typeof listLoansQuerySchema>;
export type LookupLoanQuery = z.infer<typeof lookupLoanQuerySchema>;
//# sourceMappingURL=loan.schema.d.ts.map