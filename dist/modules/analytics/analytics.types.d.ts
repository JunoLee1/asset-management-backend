export interface DistributionItem {
    name: string;
    count: number;
}
export interface DistributionData {
    byStatus: DistributionItem[];
    byCondition: DistributionItem[];
    byClass: DistributionItem[];
}
export interface UtilizationItem {
    assetId: string;
    assetCode: string;
    name: string;
    categoryName: string;
    utilizationPct: number;
    lastUsedAt: string | null;
    isIdle: boolean;
}
export interface UtilizationData {
    assets: UtilizationItem[];
    idleCount: number;
    avgUtilizationPct: number;
    utilizationRatePct: number;
    activeOpsCount: number;
    totalRegisteredCount: number;
}
export interface DepartmentValueItem {
    departmentId: string;
    name: string;
    assetCount: number;
    totalValue: number;
    memberCount: number;
    valuePerMember: number;
}
export interface DepartmentValueData {
    departments: DepartmentValueItem[];
    totalValue: number;
}
export interface MaintenanceCostItem {
    assetId: string;
    assetCode: string;
    name: string;
    purchasePrice: number;
    totalCost: number;
    costRatio: number;
    maintenanceCount: number;
}
export interface MaintenanceCostTrend {
    month: string;
    totalCost: number;
}
export interface MaintenanceCostData {
    topAssets: MaintenanceCostItem[];
    trend: MaintenanceCostTrend[];
    totalCost: number;
}
export interface WarrantyExpiryItem {
    assetId: string;
    assetCode: string;
    name: string;
    warrantyEnd: string;
    daysLeft: number;
}
export interface LicenseExpiryItem {
    licenseId: string;
    name: string;
    expiryDate: string;
    daysLeft: number;
    seatsTotal: number;
    seatsUsed: number;
}
export interface OverseatedLicenseItem {
    licenseId: string;
    name: string;
    seatsTotal: number;
    seatsUsed: number;
}
export interface ComplianceData {
    warrantyExpiry: WarrantyExpiryItem[];
    licenseExpiry: LicenseExpiryItem[];
    overseated: OverseatedLicenseItem[];
}
export interface DepartmentUtilizationItem {
    departmentId: string;
    departmentName: string;
    activeOpsCount: number;
    totalRegisteredCount: number;
    utilizationRatePct: number;
}
export interface DepartmentUtilizationData {
    departments: DepartmentUtilizationItem[];
    overall: {
        activeOpsCount: number;
        totalRegisteredCount: number;
        utilizationRatePct: number;
    };
}
//# sourceMappingURL=analytics.types.d.ts.map