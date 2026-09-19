import type { AssetClass, AssetStatus, AssetCondition, AssetOwnershipType } from '../../generated/prisma/enums';
export interface AssetListItem {
    id: string;
    assetCode: string;
    name: string;
    class: AssetClass;
    status: AssetStatus;
    condition: AssetCondition;
    categoryName: string;
    glAccountCode: string | null;
    departmentName: string;
    locationName: string;
    assignedUserName: string | null;
    updatedAt: Date;
}
export interface AssetDetail extends Omit<AssetListItem, 'categoryName' | 'glAccountCode' | 'departmentName' | 'locationName' | 'assignedUserName'> {
    description: string | null;
    conditionAssessedAt: Date | null;
    ownershipType: AssetOwnershipType;
    purchaseDate: Date;
    purchasePrice: number;
    currentValue: number | null;
    imageUrl: string | null;
    category: {
        id: string;
        name: string;
        code: string;
        glAccountCode: string | null;
        glAccountName: string | null;
    };
    department: {
        id: string;
        name: string;
        code: string;
    };
    location: {
        id: string;
        name: string;
        building: string;
    };
    vendor: {
        id: string;
        name: string;
    } | null;
    assignedUser: {
        id: string;
        name: string;
        email: string;
    } | null;
    hardware: HardwareDetail | null;
    software: SoftwareDetail | null;
    peripheral: PeripheralDetail | null;
    office: OfficeDetail | null;
    facility: FacilityDetail | null;
    histories: AssetHistoryDetail[];
    createdAt: Date;
    updatedAt: Date;
}
export interface AssetHistoryDetail {
    id: string;
    action: import('../../generated/prisma/enums').AssetAction;
    description: string | null;
    metadata: unknown;
    createdAt: Date;
    performedBy: {
        id: string;
        name: string;
    };
}
export interface HardwareDetail {
    serialNo: string;
    macAddr: string | null;
    ipAddr: string | null;
    cpu: string | null;
    ramGb: number | null;
    storageGb: number | null;
    warrantyEnd: Date | null;
}
export interface SoftwareDetail {
    licenseKey: string;
    licenseSeats: number;
    installedCount: number;
    expiryDate: Date | null;
    version: string | null;
}
export interface PeripheralDetail {
    serialNo: string | null;
    quantity: number;
}
export interface OfficeDetail {
    modelName: string;
}
export interface FacilityDetail {
    installLocationDetail: string;
    installDate: Date;
    inspectionCycleMonths: number;
    nextInspectionDate: Date;
}
export type { RequesterContext } from '../../lib/requestHelpers';
export type { PaginatedResult } from '../../lib/pagination';
//# sourceMappingURL=asset.types.d.ts.map