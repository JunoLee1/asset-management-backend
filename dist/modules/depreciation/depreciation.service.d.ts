import type { DepreciationDetail, UpsertDepreciationInput } from './depreciation.types';
import type { DepreciationMethod } from '../../generated/prisma/enums';
import type { RequesterContext } from '../../lib/requestHelpers';
interface YearlyRecord {
    fiscalYear: number;
    depreciationAmount: number;
    bookValue: number;
}
export declare const depreciationService: {
    getByAssetId: (assetId: string, _requester: RequesterContext) => Promise<DepreciationDetail | null>;
    upsert: (input: UpsertDepreciationInput, requester: RequesterContext) => Promise<DepreciationDetail>;
    remove: (assetId: string, requester: RequesterContext) => Promise<void>;
    simulate: (params: {
        method: DepreciationMethod;
        usefulLifeYears: number;
        purchasePrice: number;
        salvageValue: number;
        annualRate: number;
        startYear: number;
        startMonth?: number;
    }) => YearlyRecord[];
    defaultAnnualRate: (method: DepreciationMethod, usefulLifeYears: number) => number;
};
export {};
//# sourceMappingURL=depreciation.service.d.ts.map