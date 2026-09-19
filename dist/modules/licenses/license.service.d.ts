import type { CreateLicenseInput, UpdateLicenseInput, ListLicensesQuery, AssignLicenseInput, LicenseListItem, LicenseDetail, RequesterContext, PaginatedResult } from './license.types';
export declare const licenseService: {
    list: (query: ListLicensesQuery, requester: RequesterContext) => Promise<PaginatedResult<LicenseListItem>>;
    getById: (id: string, requester: RequesterContext) => Promise<LicenseDetail>;
    create: (input: CreateLicenseInput, requester: RequesterContext) => Promise<LicenseDetail>;
    update: (id: string, input: UpdateLicenseInput, requester: RequesterContext) => Promise<LicenseDetail>;
    remove: (id: string, requester: RequesterContext) => Promise<void>;
    assign: (licenseId: string, input: AssignLicenseInput, requester: RequesterContext) => Promise<LicenseDetail>;
    unassign: (licenseId: string, assignmentId: string, requester: RequesterContext) => Promise<LicenseDetail>;
};
//# sourceMappingURL=license.service.d.ts.map