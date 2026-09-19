import type { LoanStatus, AssetCondition, LoanReturnCondition, AssetClass } from '../../generated/prisma/enums';
export type ReturnAction = 'OK' | 'NEEDS_REPAIR' | 'WRITE_OFF';
export type ResponseAssetCondition = AssetCondition;
export interface LoanListItem {
    id: string;
    status: LoanStatus;
    assetId: string;
    assetCode: string;
    assetName: string;
    assetClass: AssetClass;
    assetCategoryName: string | null;
    assetCondition: ResponseAssetCondition;
    userId: string;
    userName: string;
    userEmail: string;
    userDepartmentName: string | null;
    departmentManagerName: string | null;
    departmentManagerId: string | null;
    departmentManagerIsOutOfOffice: boolean;
    purpose: string | null;
    dueDate: Date | null;
    checkedOutAt: Date | null;
    receivedAt: Date | null;
    returnedAt: Date | null;
    rejectReason: string | null;
    recallReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface LoanReturnDetail {
    id: string;
    returnRequestedAt: Date;
    conditionBefore: ResponseAssetCondition;
    inspectedAt: Date | null;
    inspectedByName: string | null;
    conditionAfter: ResponseAssetCondition | null;
    damageNote: string | null;
    resultAction: ReturnAction | null;
    returnApprovedAt: Date | null;
    returnApprovedByName: string | null;
    finalizedAt: Date | null;
    finalizedByName: string | null;
    returnedAt: Date | null;
    receivedByName: string;
}
export interface LoanDetail extends LoanListItem {
    rejectReason: string | null;
    recallReason: string | null;
    checkoutMemo: string | null;
    checkoutLocationId: string | null;
    checkoutLocationName: string | null;
    managerApprovedAt: Date | null;
    adminApprovedAt: Date | null;
    cancelledAt: Date | null;
    rejectedAt: Date | null;
    recalledAt: Date | null;
    loanReturn: LoanReturnDetail | null;
}
export type { PaginatedResult } from '../../lib/pagination';
export type { RequesterContext } from '../../lib/requestHelpers';
export declare const CONDITION_MAP: Record<LoanReturnCondition, AssetCondition>;
export declare const ACTION_MAP: Record<LoanReturnCondition, ReturnAction>;
//# sourceMappingURL=loan.types.d.ts.map