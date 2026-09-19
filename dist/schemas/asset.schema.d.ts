import { z } from 'zod';
export declare const createAssetSchema: z.ZodObject<{
    assetCode: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        RETIRED: "RETIRED";
        OPERATING: "OPERATING";
        IDLE: "IDLE";
        STANDBY: "STANDBY";
        REPAIR: "REPAIR";
        PENDING_DISPOSAL: "PENDING_DISPOSAL";
        UNDER_CONSTRUCTION: "UNDER_CONSTRUCTION";
    }>>;
    condition: z.ZodOptional<z.ZodEnum<{
        EXCELLENT: "EXCELLENT";
        GOOD: "GOOD";
        FAIR: "FAIR";
        POOR: "POOR";
    }>>;
    conditionAssessedAt: z.ZodOptional<z.ZodString>;
    ownershipType: z.ZodOptional<z.ZodEnum<{
        COMPANY_OWNED: "COMPANY_OWNED";
        PERSONAL: "PERSONAL";
    }>>;
    purchaseDate: z.ZodString;
    purchasePrice: z.ZodNumber;
    currentValue: z.ZodOptional<z.ZodNumber>;
    imageUrl: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodString;
    departmentId: z.ZodString;
    locationId: z.ZodString;
    vendorId: z.ZodOptional<z.ZodString>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    class: z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>;
    hardware: z.ZodOptional<z.ZodObject<{
        serialNo: z.ZodString;
        macAddr: z.ZodOptional<z.ZodString>;
        ipAddr: z.ZodOptional<z.ZodString>;
        cpu: z.ZodOptional<z.ZodString>;
        ramGb: z.ZodOptional<z.ZodNumber>;
        storageGb: z.ZodOptional<z.ZodNumber>;
        warrantyEnd: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    software: z.ZodOptional<z.ZodObject<{
        licenseKey: z.ZodString;
        licenseSeats: z.ZodNumber;
        installedCount: z.ZodOptional<z.ZodNumber>;
        expiryDate: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    peripheral: z.ZodOptional<z.ZodObject<{
        serialNo: z.ZodOptional<z.ZodString>;
        quantity: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    office: z.ZodOptional<z.ZodObject<{
        modelName: z.ZodString;
    }, z.core.$strip>>;
    facility: z.ZodOptional<z.ZodObject<{
        installLocationDetail: z.ZodString;
        installDate: z.ZodString;
        inspectionCycleMonths: z.ZodNumber;
        nextInspectionDate: z.ZodString;
    }, z.core.$strip>>;
    network: z.ZodOptional<z.ZodObject<{
        ipAddress: z.ZodOptional<z.ZodString>;
        macAddress: z.ZodOptional<z.ZodString>;
        vlan: z.ZodOptional<z.ZodString>;
        port: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateAssetSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        RETIRED: "RETIRED";
        OPERATING: "OPERATING";
        IDLE: "IDLE";
        STANDBY: "STANDBY";
        REPAIR: "REPAIR";
        PENDING_DISPOSAL: "PENDING_DISPOSAL";
        UNDER_CONSTRUCTION: "UNDER_CONSTRUCTION";
    }>>;
    condition: z.ZodOptional<z.ZodEnum<{
        EXCELLENT: "EXCELLENT";
        GOOD: "GOOD";
        FAIR: "FAIR";
        POOR: "POOR";
    }>>;
    conditionAssessedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ownershipType: z.ZodOptional<z.ZodEnum<{
        COMPANY_OWNED: "COMPANY_OWNED";
        PERSONAL: "PERSONAL";
    }>>;
    purchaseDate: z.ZodOptional<z.ZodString>;
    purchasePrice: z.ZodOptional<z.ZodNumber>;
    currentValue: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    locationId: z.ZodOptional<z.ZodString>;
    vendorId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    assignedUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hardware: z.ZodOptional<z.ZodObject<{
        serialNo: z.ZodOptional<z.ZodString>;
        macAddr: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        ipAddr: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        cpu: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        ramGb: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        storageGb: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        warrantyEnd: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strict>>;
    software: z.ZodOptional<z.ZodObject<{
        licenseKey: z.ZodOptional<z.ZodString>;
        licenseSeats: z.ZodOptional<z.ZodNumber>;
        installedCount: z.ZodOptional<z.ZodNumber>;
        expiryDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strict>>;
    peripheral: z.ZodOptional<z.ZodObject<{
        serialNo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantity: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const listAssetsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<number, string | number>>, z.ZodNumber>, z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<number, string | number>>, z.ZodNumber>, z.ZodNumber>>;
    class: z.ZodOptional<z.ZodEnum<{
        IT_ASSET: "IT_ASSET";
        OFFICE_ASSET: "OFFICE_ASSET";
        FACILITY_ASSET: "FACILITY_ASSET";
        NETWORK_ASSET: "NETWORK_ASSET";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        RETIRED: "RETIRED";
        OPERATING: "OPERATING";
        IDLE: "IDLE";
        STANDBY: "STANDBY";
        REPAIR: "REPAIR";
        PENDING_DISPOSAL: "PENDING_DISPOSAL";
        UNDER_CONSTRUCTION: "UNDER_CONSTRUCTION";
    }>>;
    condition: z.ZodOptional<z.ZodEnum<{
        EXCELLENT: "EXCELLENT";
        GOOD: "GOOD";
        FAIR: "FAIR";
        POOR: "POOR";
    }>>;
    categoryId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    locationId: z.ZodOptional<z.ZodString>;
    assignedUserId: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    available: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodBoolean]>, z.ZodTransform<boolean, string | boolean>>>;
}, z.core.$strip>;
export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;
export type ListAssetsQuery = z.infer<typeof listAssetsQuerySchema>;
//# sourceMappingURL=asset.schema.d.ts.map