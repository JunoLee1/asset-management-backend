import type { ManufacturerListItem, ManufacturerDetail, CreateManufacturerInput, UpdateManufacturerInput, ListManufacturerQuery } from './manufacturer.types';
import type { RequesterContext } from '../../lib/requestHelpers';
export declare const manufacturerService: {
    list: (query: ListManufacturerQuery, _requester: RequesterContext) => Promise<{
        items: ManufacturerListItem[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getById: (id: string, _requester: RequesterContext) => Promise<ManufacturerDetail>;
    create: (input: CreateManufacturerInput, requester: RequesterContext) => Promise<ManufacturerDetail>;
    update: (id: string, input: UpdateManufacturerInput, requester: RequesterContext) => Promise<ManufacturerDetail>;
    remove: (id: string, requester: RequesterContext) => Promise<void>;
};
//# sourceMappingURL=manufacturer.service.d.ts.map