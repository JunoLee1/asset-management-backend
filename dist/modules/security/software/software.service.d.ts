import type { RequesterContext } from '../../../lib/requestHelpers';
import type { SoftwareListItem, SoftwareDetail, ListSoftwareQuery, UpdateSoftwareInput, CreateSoftwareInput, UpdatePermissionInput, IngestPayload, IngestResult } from './software.types';
export declare const softwareService: {
    list: (query: ListSoftwareQuery, requester: RequesterContext) => Promise<SoftwareListItem[]>;
    getById: (id: string, requester: RequesterContext) => Promise<SoftwareDetail>;
    create: (input: CreateSoftwareInput, requester: RequesterContext) => Promise<SoftwareDetail>;
    update: (id: string, input: UpdateSoftwareInput, requester: RequesterContext) => Promise<SoftwareDetail>;
    updatePermission: (id: string, input: UpdatePermissionInput, requester: RequesterContext) => Promise<SoftwareDetail>;
    remove: (id: string, requester: RequesterContext) => Promise<void>;
    ingest: (payload: IngestPayload, requester: RequesterContext) => Promise<IngestResult>;
};
//# sourceMappingURL=software.service.d.ts.map