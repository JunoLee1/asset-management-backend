import type { CreateMaintenanceInput, UpdateMaintenanceInput, ListMaintenancesQuery, MaintenanceListItem, MaintenanceDetail, RequesterContext, PaginatedResult } from './maintenance.types';
interface ApproveOptions {
    conditionOverride?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
}
interface AssignInput {
    vendorId?: string;
    technicianId?: string;
}
export declare const maintenanceService: {
    list: (query: ListMaintenancesQuery, requester: RequesterContext) => Promise<PaginatedResult<MaintenanceListItem>>;
    getById: (id: string, requester: RequesterContext) => Promise<MaintenanceDetail>;
    create: (input: CreateMaintenanceInput, requester: RequesterContext) => Promise<MaintenanceDetail>;
    update: (id: string, input: UpdateMaintenanceInput, requester: RequesterContext) => Promise<MaintenanceDetail>;
    approve: (id: string, requester: RequesterContext, options?: ApproveOptions) => Promise<MaintenanceDetail>;
    reject: (id: string, body: {
        reason: string;
    }, requester: RequesterContext) => Promise<MaintenanceDetail>;
    cancel: (id: string, requester: RequesterContext) => Promise<MaintenanceDetail>;
    assign: (id: string, input: AssignInput, requester: RequesterContext) => Promise<MaintenanceDetail>;
};
export {};
//# sourceMappingURL=maintenance.service.d.ts.map