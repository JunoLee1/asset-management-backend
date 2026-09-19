import type { SoftwareType, SoftwarePermissionStatus } from '../../../generated/prisma/enums';
export interface SoftwareListItem {
    id: string;
    name: string;
    vendor: string | null;
    type: SoftwareType;
    category: string;
    executedOs: string | null;
    userCount: number;
    firstDiscoveredAt: Date | null;
    lastUsedAt: Date | null;
    permissionStatus: SoftwarePermissionStatus;
    licenseCoverage: boolean | null;
}
export interface SoftwareDetail extends SoftwareListItem {
    description: string | null;
    licenseCoverage: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface ListSoftwareQuery {
    type?: SoftwareType;
    q?: string;
    permissionStatus?: SoftwarePermissionStatus;
    licenseCoverage?: boolean | null;
}
export interface UpdateSoftwareInput {
    name?: string;
    vendor?: string | null;
    type?: SoftwareType;
    category?: string;
    description?: string | null;
    licenseCoverage?: boolean | null;
}
export interface CreateSoftwareInput {
    name: string;
    vendor?: string | null;
    type?: SoftwareType;
    category?: string;
    description?: string | null;
    licenseCoverage?: boolean | null;
}
export interface UpdatePermissionInput {
    status: SoftwarePermissionStatus;
    reason?: string;
}
export interface IngestPayload {
    hostname: string;
    userId?: string;
    items: IngestItem[];
}
export interface IngestItem {
    name: string;
    vendor?: string;
    executedOs: string;
    lastUsedAt?: string;
    firstSeenAt?: string;
    durationSec?: number;
}
export interface IngestResult {
    deviceId: string;
    newSoftwareCount: number;
    newInstanceCount: number;
    updatedInstanceCount: number;
}
//# sourceMappingURL=software.types.d.ts.map