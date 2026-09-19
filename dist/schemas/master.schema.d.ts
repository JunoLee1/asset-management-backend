import { z } from 'zod';
export declare const createDepartmentSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
}, z.core.$strip>;
export declare const updateDepartmentSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const createTeamSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    departmentId: z.ZodString;
    teamLeadId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTeamSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    teamLeadId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const createLocationSchema: z.ZodObject<{
    name: z.ZodString;
    building: z.ZodString;
    floor: z.ZodOptional<z.ZodString>;
    room: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateLocationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    building: z.ZodOptional<z.ZodString>;
    floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    room: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const createVendorSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<{
        REPAIR: "REPAIR";
        SOFTWARE: "SOFTWARE";
    }>>;
    contactName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    supportedClasses: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>>>;
    serviceRegion: z.ZodOptional<z.ZodString>;
    contractStartDate: z.ZodOptional<z.ZodString>;
    contractEndDate: z.ZodOptional<z.ZodString>;
    slaHours: z.ZodOptional<z.ZodNumber>;
    canVisitOnSite: z.ZodOptional<z.ZodBoolean>;
    canReceiveDevice: z.ZodOptional<z.ZodBoolean>;
    businessRegistrationNumber: z.ZodOptional<z.ZodString>;
    ceoName: z.ZodOptional<z.ZodString>;
    businessType: z.ZodOptional<z.ZodString>;
    businessItem: z.ZodOptional<z.ZodString>;
    addressHeadOffice: z.ZodOptional<z.ZodString>;
    addressDetail: z.ZodOptional<z.ZodString>;
    addressBusiness: z.ZodOptional<z.ZodString>;
    contactDepartment: z.ZodOptional<z.ZodString>;
    contactPosition: z.ZodOptional<z.ZodString>;
    operatingHoursStart: z.ZodOptional<z.ZodString>;
    operatingHoursEnd: z.ZodOptional<z.ZodString>;
    operatesOnWeekend: z.ZodOptional<z.ZodBoolean>;
    canHandleUrgent: z.ZodOptional<z.ZodBoolean>;
    urgentConditionNote: z.ZodOptional<z.ZodString>;
    brandModelNote: z.ZodOptional<z.ZodString>;
    bankName: z.ZodOptional<z.ZodString>;
    bankAccountNumber: z.ZodOptional<z.ZodString>;
    bankAccountHolder: z.ZodOptional<z.ZodString>;
    paymentTerms: z.ZodOptional<z.ZodEnum<{
        MONTH_END: "MONTH_END";
        PER_CASE: "PER_CASE";
        DAYS_AFTER: "DAYS_AFTER";
    }>>;
    paymentDaysAfter: z.ZodOptional<z.ZodNumber>;
    taxInvoiceEmail: z.ZodOptional<z.ZodString>;
    taxInvoiceMethod: z.ZodOptional<z.ZodEnum<{
        POST: "POST";
        EMAIL: "EMAIL";
        FAX: "FAX";
    }>>;
    faxNumber: z.ZodOptional<z.ZodString>;
    postalAddress: z.ZodOptional<z.ZodString>;
    isVatIncluded: z.ZodOptional<z.ZodBoolean>;
    isWithholdingTax: z.ZodOptional<z.ZodBoolean>;
    slaCompletionDays: z.ZodOptional<z.ZodNumber>;
    penaltyTerms: z.ZodOptional<z.ZodString>;
    repairWarrantyDays: z.ZodOptional<z.ZodNumber>;
    unitPriceNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateVendorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        REPAIR: "REPAIR";
        SOFTWARE: "SOFTWARE";
    }>>;
    contactName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    supportedClasses: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>>>>;
    serviceRegion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contractStartDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contractEndDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    slaHours: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    canVisitOnSite: z.ZodOptional<z.ZodBoolean>;
    canReceiveDevice: z.ZodOptional<z.ZodBoolean>;
    businessRegistrationNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ceoName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    businessType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    businessItem: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressHeadOffice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressDetail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressBusiness: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contactDepartment: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contactPosition: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    operatingHoursStart: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    operatingHoursEnd: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    operatesOnWeekend: z.ZodOptional<z.ZodBoolean>;
    canHandleUrgent: z.ZodOptional<z.ZodBoolean>;
    urgentConditionNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    brandModelNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bankName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bankAccountNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bankAccountHolder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    paymentTerms: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        MONTH_END: "MONTH_END";
        PER_CASE: "PER_CASE";
        DAYS_AFTER: "DAYS_AFTER";
    }>>>;
    paymentDaysAfter: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    taxInvoiceEmail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    taxInvoiceMethod: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        POST: "POST";
        EMAIL: "EMAIL";
        FAX: "FAX";
    }>>>;
    faxNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postalAddress: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isVatIncluded: z.ZodOptional<z.ZodBoolean>;
    isWithholdingTax: z.ZodOptional<z.ZodBoolean>;
    slaCompletionDays: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    penaltyTerms: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    repairWarrantyDays: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    unitPriceNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const submitVendorSchema: z.ZodObject<{}, z.core.$strip>;
export declare const rejectVendorSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export declare const blacklistVendorSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export declare const createAssetCategorySchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    class: z.ZodOptional<z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>>;
    subType: z.ZodOptional<z.ZodEnum<{
        HARDWARE: "HARDWARE";
        SOFTWARE: "SOFTWARE";
        PERIPHERAL: "PERIPHERAL";
    }>>;
    parentId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateAssetCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;
export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
export type RejectVendorInput = z.infer<typeof rejectVendorSchema>;
export type BlacklistVendorInput = z.infer<typeof blacklistVendorSchema>;
export type CreateAssetCategoryInput = z.infer<typeof createAssetCategorySchema>;
export type UpdateAssetCategoryInput = z.infer<typeof updateAssetCategorySchema>;
//# sourceMappingURL=master.schema.d.ts.map