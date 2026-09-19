import { z } from 'zod';
export declare const upsertDepreciationSchema: z.ZodObject<{
    method: z.ZodEnum<{
        STRAIGHT_LINE: "STRAIGHT_LINE";
        DECLINING_BALANCE: "DECLINING_BALANCE";
    }>;
    usefulLifeYears: z.ZodNumber;
    salvageValue: z.ZodNumber;
    annualRate: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type UpsertDepreciationBody = z.infer<typeof upsertDepreciationSchema>;
//# sourceMappingURL=depreciation.schema.d.ts.map