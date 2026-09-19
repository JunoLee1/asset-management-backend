import type { CreateAssetInput, ListAssetsQuery } from '../../schemas/asset.schema';
import type { AssetDetail, AssetListItem, PaginatedResult, RequesterContext } from './asset.types';
import type { UpdateAssetInput } from '../../schemas/asset.schema';
type HistoryMetadata = {
    changes?: Record<string, {
        from: unknown;
        to: unknown;
        fromName?: string | null;
        toName?: string | null;
    }>;
    reason?: string;
};
export declare const assetService: {
    create: (dto: CreateAssetInput, requesterId: string) => Promise<{
        status: import("../../generated/prisma/enums").AssetStatus;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        description: string | null;
        class: import("../../generated/prisma/enums").AssetClass;
        vendorId: string | null;
        assetCode: string;
        condition: import("../../generated/prisma/enums").AssetCondition;
        conditionAssessedAt: Date | null;
        ownershipType: import("../../generated/prisma/enums").AssetOwnershipType;
        purchaseDate: Date;
        purchasePrice: import("@prisma/client-runtime-utils").Decimal;
        currentValue: import("@prisma/client-runtime-utils").Decimal | null;
        imageUrl: string | null;
        categoryId: string;
        locationId: string;
        catalogId: string | null;
        assignedUserId: string | null;
    }>;
    list: (query: ListAssetsQuery, requester: RequesterContext) => Promise<PaginatedResult<AssetListItem>>;
    getById: (id: string, requester: RequesterContext) => Promise<AssetDetail>;
    update: (id: string, dto: UpdateAssetInput, requesterId: string) => Promise<{
        status: import("../../generated/prisma/enums").AssetStatus;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        description: string | null;
        class: import("../../generated/prisma/enums").AssetClass;
        vendorId: string | null;
        assetCode: string;
        condition: import("../../generated/prisma/enums").AssetCondition;
        conditionAssessedAt: Date | null;
        ownershipType: import("../../generated/prisma/enums").AssetOwnershipType;
        purchaseDate: Date;
        purchasePrice: import("@prisma/client-runtime-utils").Decimal;
        currentValue: import("@prisma/client-runtime-utils").Decimal | null;
        imageUrl: string | null;
        categoryId: string;
        locationId: string;
        catalogId: string | null;
        assignedUserId: string | null;
    }>;
    retire: (id: string, requester: RequesterContext, reason?: string) => Promise<{
        status: import("../../generated/prisma/enums").AssetStatus;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string;
        description: string | null;
        class: import("../../generated/prisma/enums").AssetClass;
        vendorId: string | null;
        assetCode: string;
        condition: import("../../generated/prisma/enums").AssetCondition;
        conditionAssessedAt: Date | null;
        ownershipType: import("../../generated/prisma/enums").AssetOwnershipType;
        purchaseDate: Date;
        purchasePrice: import("@prisma/client-runtime-utils").Decimal;
        currentValue: import("@prisma/client-runtime-utils").Decimal | null;
        imageUrl: string | null;
        categoryId: string;
        locationId: string;
        catalogId: string | null;
        assignedUserId: string | null;
    }>;
    getHistory: (id: string, page: number, requester: RequesterContext) => Promise<PaginatedResult<{
        id: string;
        action: string;
        description: string | null;
        metadata: HistoryMetadata | null;
        createdAt: Date;
        performedBy: {
            id: string;
            name: string;
        };
    }>>;
};
export {};
//# sourceMappingURL=asset.service.d.ts.map