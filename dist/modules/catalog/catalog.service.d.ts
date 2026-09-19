import type { CatalogListItem, CreateCatalogInput, UpdateCatalogInput, ListCatalogQuery } from './catalog.types';
import type { RequesterContext } from '../../lib/requestHelpers';
export declare const catalogService: {
    list: (query: ListCatalogQuery, _requester: RequesterContext) => Promise<{
        items: CatalogListItem[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getById: (id: string, _requester: RequesterContext) => Promise<CatalogListItem>;
    create: (input: CreateCatalogInput, requester: RequesterContext) => Promise<CatalogListItem>;
    update: (id: string, input: UpdateCatalogInput, requester: RequesterContext) => Promise<CatalogListItem>;
    remove: (id: string, requester: RequesterContext) => Promise<void>;
};
//# sourceMappingURL=catalog.service.d.ts.map