import type { MaintenanceStatus, MaintenancePayer, MaintenanceServiceType } from '../../generated/prisma/enums';
export interface MaintenanceListItem {
    id: string;
    title: string;
    status: MaintenanceStatus;
    assetCode: string;
    assetName: string;
    managerName: string;
    requesterName: string | null;
    approverName: string | null;
    scheduledAt: Date;
    completedAt: Date | null;
    cost: number | null;
    payerType: MaintenancePayer | null;
    createdAt: Date;
}
export interface MaintenanceDetail extends Omit<MaintenanceListItem, 'assetCode' | 'assetName' | 'managerName' | 'requesterName' | 'approverName'> {
    description: string;
    asset: {
        id: string;
        assetCode: string;
        name: string;
        assignedUserId: string | null;
    };
    requestedBy: {
        id: string;
        name: string;
    } | null;
    manager: {
        id: string;
        name: string;
    } | null;
    managerApprovedBy: {
        id: string;
        name: string;
    } | null;
    adminApprovedBy: {
        id: string;
        name: string;
    } | null;
    vendor: {
        id: string;
        name: string;
    } | null;
    serviceType: MaintenanceServiceType | null;
    isUserFault: boolean | null;
    payerUser: {
        id: string;
        name: string;
    } | null;
    payerNote: string | null;
    updatedAt: Date;
}
export type MaintenanceType = 'REPAIR' | 'INSPECTION' | 'UPGRADE';
export interface CreateMaintenanceInput {
    assetId: string;
    title: string;
    description: string;
    scheduledAt: Date;
    vendorId?: string;
    type?: MaintenanceType;
}
export interface UpdateMaintenanceInput {
    title?: string;
    description?: string;
    scheduledAt?: Date;
    vendorId?: string | null;
    managerId?: string | null;
    status?: MaintenanceStatus;
    serviceType?: MaintenanceServiceType | null;
    isUserFault?: boolean | null;
    cost?: number | null;
    payerType?: MaintenancePayer | null;
    payerUserId?: string | null;
    payerNote?: string | null;
    conditionAfter?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
}
export interface ListMaintenancesQuery {
    assetId?: string;
    status?: MaintenanceStatus;
    managerId?: string;
    vendorId?: string;
    keyword?: string;
    page?: number;
    pageSize?: number;
}
export type { RequesterContext } from '../../lib/requestHelpers';
export type { PaginatedResult } from '../../lib/pagination';
//# sourceMappingURL=maintenance.types.d.ts.map