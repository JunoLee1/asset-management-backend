import type { DepreciationMethod } from '../../generated/prisma/enums';
export interface DepreciationDetail {
    id: string;
    assetId: string;
    assetCode: string;
    assetName: string;
    method: DepreciationMethod;
    usefulLifeYears: number;
    salvageValue: number;
    annualRate: number;
    purchasePrice: number | null;
    purchaseDate: Date | null;
    currentBookValue: number | null;
    createdAt: Date;
    updatedAt: Date;
    records: DepreciationRecordItem[];
}
export interface DepreciationRecordItem {
    fiscalYear: number;
    depreciationAmount: number;
    bookValue: number;
    recordedAt: Date;
}
export interface UpsertDepreciationInput {
    assetId: string;
    method: DepreciationMethod;
    usefulLifeYears: number;
    salvageValue: number;
    annualRate?: number;
}
//# sourceMappingURL=depreciation.types.d.ts.map