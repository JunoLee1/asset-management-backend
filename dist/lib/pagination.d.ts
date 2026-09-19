export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export declare const paginate: <T>(items: T[], total: number, page: number, pageSize: number) => PaginatedResult<T>;
export declare function fetchPage<T>(findMany: () => Promise<T[]>, count: () => Promise<number>): Promise<{
    rows: T[];
    total: number;
}>;
//# sourceMappingURL=pagination.d.ts.map