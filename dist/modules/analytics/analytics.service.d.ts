import type { AssetClass } from '../../generated/prisma/enums';
import type { DistributionData, UtilizationData, DepartmentValueData, MaintenanceCostData, ComplianceData, DepartmentUtilizationData } from './analytics.types';
export declare const analyticsService: {
    getDistribution: () => Promise<DistributionData>;
    getUtilization: () => Promise<UtilizationData>;
    getUtilizationByDepartment: (assetClass?: AssetClass) => Promise<DepartmentUtilizationData>;
    getDepartmentValue: () => Promise<DepartmentValueData>;
    getMaintenanceCost: (from?: string, to?: string) => Promise<MaintenanceCostData>;
    getComplianceExpiry: () => Promise<ComplianceData>;
};
//# sourceMappingURL=analytics.service.d.ts.map