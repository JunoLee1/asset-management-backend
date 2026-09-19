import type { AssetAction, MaintenanceStatus } from '../../generated/prisma/enums';
export interface DashboardStats {
    totalAssets: number;
    activeAssets: number;
    underMaintenance: number;
    thisMonthRegistered: number;
    pendingApprovalCount: number;
    pendingInspectionCount: number;
}
export interface CategoryStat {
    name: string;
    count: number;
    class: 'IT_ASSET' | 'OFFICE_ASSET' | 'FACILITY_ASSET' | 'NETWORK_ASSET' | null;
}
export interface DepartmentStat {
    name: string;
    count: number;
}
export interface AlertItem {
    id: string;
    assetCode: string;
    assetName: string;
    title: string;
    status: MaintenanceStatus;
    scheduledAt: Date;
}
export interface HistoryItem {
    id: string;
    assetCode: string;
    assetName: string;
    action: AssetAction;
    performedBy: string;
    createdAt: Date;
}
export interface DashboardData {
    stats: DashboardStats;
    byCategory: CategoryStat[];
    byDepartment: DepartmentStat[];
    alerts: AlertItem[];
    recentHistory: HistoryItem[];
    recentHistoryMyTeam?: HistoryItem[];
}
//# sourceMappingURL=dashboard.types.d.ts.map