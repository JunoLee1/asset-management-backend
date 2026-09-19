import type { AssetClass } from '../../generated/prisma/enums';
export interface CatalogListItem {
    id: string;
    name: string;
    manufacturerId: string | null;
    manufacturerName: string | null;
    modelCode: string | null;
    class: AssetClass;
    categoryId: string | null;
    categoryName: string | null;
    categoryCode: string | null;
    specs: Record<string, unknown>;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: Date;
}
export interface CreateCatalogInput {
    name: string;
    manufacturerId?: string;
    modelCode?: string;
    class: AssetClass;
    categoryId?: string;
    specs?: Record<string, unknown>;
    imageUrl?: string;
}
export interface UpdateCatalogInput {
    name?: string;
    manufacturerId?: string | null;
    modelCode?: string | null;
    class?: AssetClass;
    categoryId?: string | null;
    specs?: Record<string, unknown>;
    imageUrl?: string | null;
    isActive?: boolean;
}
export interface ListCatalogQuery {
    class?: AssetClass;
    categoryId?: string;
    q?: string;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
}
//# sourceMappingURL=catalog.types.d.ts.map