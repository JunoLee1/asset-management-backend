export interface ManufacturerListItem {
    id: string;
    name: string;
    aliases: string[];
    isActive: boolean;
    catalogCount: number;
    createdAt: Date;
}
export interface ManufacturerDetail {
    id: string;
    name: string;
    aliases: string[];
    isActive: boolean;
    catalogCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateManufacturerInput {
    name: string;
    aliases?: string[];
}
export interface UpdateManufacturerInput {
    name?: string;
    aliases?: string[];
    isActive?: boolean;
}
export interface ListManufacturerQuery {
    q?: string;
    isActive?: boolean;
    page?: number;
    pageSize?: number;
}
//# sourceMappingURL=manufacturer.types.d.ts.map