import type { CreateAssetCategoryInput, UpdateAssetCategoryInput } from '../../schemas/master.schema';
import { type ListOptions } from './master.helpers';
export declare const assetCategoryService: {
    list: (options?: ListOptions) => Promise<({
        _count: {
            assets: number;
            children: number;
        };
    } & {
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        class: import("../../generated/prisma/enums").AssetClass | null;
        subType: import("../../generated/prisma/enums").AssetSubType | null;
        glAccountCode: string | null;
        glAccountName: string | null;
        defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
        defaultUsefulLifeYears: number | null;
        defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
        parentId: string | null;
    })[]>;
    getById: (id: string) => Promise<{
        parent: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            class: import("../../generated/prisma/enums").AssetClass | null;
            subType: import("../../generated/prisma/enums").AssetSubType | null;
            glAccountCode: string | null;
            glAccountName: string | null;
            defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
            defaultUsefulLifeYears: number | null;
            defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
            parentId: string | null;
        } | null;
        children: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            class: import("../../generated/prisma/enums").AssetClass | null;
            subType: import("../../generated/prisma/enums").AssetSubType | null;
            glAccountCode: string | null;
            glAccountName: string | null;
            defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
            defaultUsefulLifeYears: number | null;
            defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
            parentId: string | null;
        }[];
    } & {
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        class: import("../../generated/prisma/enums").AssetClass | null;
        subType: import("../../generated/prisma/enums").AssetSubType | null;
        glAccountCode: string | null;
        glAccountName: string | null;
        defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
        defaultUsefulLifeYears: number | null;
        defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
        parentId: string | null;
    }>;
    create: (dto: CreateAssetCategoryInput) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        class: import("../../generated/prisma/enums").AssetClass | null;
        subType: import("../../generated/prisma/enums").AssetSubType | null;
        glAccountCode: string | null;
        glAccountName: string | null;
        defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
        defaultUsefulLifeYears: number | null;
        defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
        parentId: string | null;
    }>;
    update: (id: string, dto: UpdateAssetCategoryInput) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        class: import("../../generated/prisma/enums").AssetClass | null;
        subType: import("../../generated/prisma/enums").AssetSubType | null;
        glAccountCode: string | null;
        glAccountName: string | null;
        defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
        defaultUsefulLifeYears: number | null;
        defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
        parentId: string | null;
    }>;
    softDelete: (id: string) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        class: import("../../generated/prisma/enums").AssetClass | null;
        subType: import("../../generated/prisma/enums").AssetSubType | null;
        glAccountCode: string | null;
        glAccountName: string | null;
        defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
        defaultUsefulLifeYears: number | null;
        defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
        parentId: string | null;
    }>;
    restore: (id: string) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        class: import("../../generated/prisma/enums").AssetClass | null;
        subType: import("../../generated/prisma/enums").AssetSubType | null;
        glAccountCode: string | null;
        glAccountName: string | null;
        defaultDepreciationMethod: import("../../generated/prisma/enums").DepreciationMethod | null;
        defaultUsefulLifeYears: number | null;
        defaultSalvageValueRatio: import("@prisma/client-runtime-utils").Decimal | null;
        parentId: string | null;
    }>;
};
//# sourceMappingURL=assetCategory.service.d.ts.map