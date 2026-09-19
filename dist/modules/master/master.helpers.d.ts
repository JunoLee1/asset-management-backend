export interface ListOptions {
    includeDeleted?: boolean;
}
export declare function buildSoftDeleteWhere(options?: ListOptions): {
    deletedAt?: null;
};
export interface ReferenceCheck {
    label: string;
    countLabel: string;
    count: number;
}
export declare function ensureNoReferences(checks: ReferenceCheck[]): void;
//# sourceMappingURL=master.helpers.d.ts.map