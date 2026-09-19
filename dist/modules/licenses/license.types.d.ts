export type LicenseCoverage = 'COVERED' | 'NOT_COVERED' | 'PARTIAL' | 'EXPIRED';
export interface LicenseListItem {
    id: string;
    name: string;
    vendorName: string | null;
    seatsTotal: number;
    seatsUsed: number;
    coverage: LicenseCoverage;
    expiryDate: Date | null;
    purchaseDate: Date;
    cost: number | null;
    productKeyMask: string | null;
    createdAt: Date;
}
export interface LicenseDetail extends LicenseListItem {
    vendorId: string | null;
    productKey: string | null;
    updatedAt: Date;
    assignments: LicenseAssignmentDetail[];
}
export declare const calculateLicenseCoverage: (seatsUsed: number, seatsTotal: number, expiryDate: Date | null) => LicenseCoverage;
export interface LicenseAssignmentDetail {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    assetId: string | null;
    assetCode: string | null;
    assetName: string | null;
    assignedAt: Date;
    unassignedAt: Date | null;
}
export interface CreateLicenseInput {
    name: string;
    productKey?: string;
    vendorId?: string;
    seatsTotal: number;
    purchaseDate: Date;
    expiryDate?: Date;
    cost?: number;
}
export interface UpdateLicenseInput {
    name?: string;
    productKey?: string | null;
    vendorId?: string | null;
    seatsTotal?: number;
    purchaseDate?: Date;
    expiryDate?: Date | null;
    cost?: number | null;
}
export interface ListLicensesQuery {
    vendorId?: string;
    q?: string;
    page?: number;
    pageSize?: number;
}
export interface AssignLicenseInput {
    userId: string;
    assetId?: string;
}
export type { RequesterContext } from '../../lib/requestHelpers';
export type { PaginatedResult } from '../../lib/pagination';
//# sourceMappingURL=license.types.d.ts.map