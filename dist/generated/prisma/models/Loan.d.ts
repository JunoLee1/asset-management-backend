import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Loan
 *
 */
export type LoanModel = runtime.Types.Result.DefaultSelection<Prisma.$LoanPayload>;
export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null;
    _avg: LoanAvgAggregateOutputType | null;
    _sum: LoanSumAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
export type LoanAvgAggregateOutputType = {
    overdueNotifyCount: number | null;
};
export type LoanSumAggregateOutputType = {
    overdueNotifyCount: number | null;
};
export type LoanMinAggregateOutputType = {
    id: string | null;
    status: $Enums.LoanStatus | null;
    assetId: string | null;
    userId: string | null;
    purpose: string | null;
    dueDate: Date | null;
    managerApprovedAt: Date | null;
    managerApprovedById: string | null;
    deptApprovedAt: Date | null;
    deptApprovedById: string | null;
    adminApprovedAt: Date | null;
    adminApprovedById: string | null;
    checkedOutAt: Date | null;
    checkedOutById: string | null;
    checkoutLocationId: string | null;
    checkoutMemo: string | null;
    receivedAt: Date | null;
    receivedById: string | null;
    rejectReason: string | null;
    rejectedAt: Date | null;
    rejectedById: string | null;
    cancelledAt: Date | null;
    overdueNotifyCount: number | null;
    recallReason: string | null;
    recalledAt: Date | null;
    recalledById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LoanMaxAggregateOutputType = {
    id: string | null;
    status: $Enums.LoanStatus | null;
    assetId: string | null;
    userId: string | null;
    purpose: string | null;
    dueDate: Date | null;
    managerApprovedAt: Date | null;
    managerApprovedById: string | null;
    deptApprovedAt: Date | null;
    deptApprovedById: string | null;
    adminApprovedAt: Date | null;
    adminApprovedById: string | null;
    checkedOutAt: Date | null;
    checkedOutById: string | null;
    checkoutLocationId: string | null;
    checkoutMemo: string | null;
    receivedAt: Date | null;
    receivedById: string | null;
    rejectReason: string | null;
    rejectedAt: Date | null;
    rejectedById: string | null;
    cancelledAt: Date | null;
    overdueNotifyCount: number | null;
    recallReason: string | null;
    recalledAt: Date | null;
    recalledById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LoanCountAggregateOutputType = {
    id: number;
    status: number;
    assetId: number;
    userId: number;
    purpose: number;
    dueDate: number;
    managerApprovedAt: number;
    managerApprovedById: number;
    deptApprovedAt: number;
    deptApprovedById: number;
    adminApprovedAt: number;
    adminApprovedById: number;
    checkedOutAt: number;
    checkedOutById: number;
    checkoutLocationId: number;
    checkoutMemo: number;
    receivedAt: number;
    receivedById: number;
    rejectReason: number;
    rejectedAt: number;
    rejectedById: number;
    cancelledAt: number;
    overdueNotifyCount: number;
    recallReason: number;
    recalledAt: number;
    recalledById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LoanAvgAggregateInputType = {
    overdueNotifyCount?: true;
};
export type LoanSumAggregateInputType = {
    overdueNotifyCount?: true;
};
export type LoanMinAggregateInputType = {
    id?: true;
    status?: true;
    assetId?: true;
    userId?: true;
    purpose?: true;
    dueDate?: true;
    managerApprovedAt?: true;
    managerApprovedById?: true;
    deptApprovedAt?: true;
    deptApprovedById?: true;
    adminApprovedAt?: true;
    adminApprovedById?: true;
    checkedOutAt?: true;
    checkedOutById?: true;
    checkoutLocationId?: true;
    checkoutMemo?: true;
    receivedAt?: true;
    receivedById?: true;
    rejectReason?: true;
    rejectedAt?: true;
    rejectedById?: true;
    cancelledAt?: true;
    overdueNotifyCount?: true;
    recallReason?: true;
    recalledAt?: true;
    recalledById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LoanMaxAggregateInputType = {
    id?: true;
    status?: true;
    assetId?: true;
    userId?: true;
    purpose?: true;
    dueDate?: true;
    managerApprovedAt?: true;
    managerApprovedById?: true;
    deptApprovedAt?: true;
    deptApprovedById?: true;
    adminApprovedAt?: true;
    adminApprovedById?: true;
    checkedOutAt?: true;
    checkedOutById?: true;
    checkoutLocationId?: true;
    checkoutMemo?: true;
    receivedAt?: true;
    receivedById?: true;
    rejectReason?: true;
    rejectedAt?: true;
    rejectedById?: true;
    cancelledAt?: true;
    overdueNotifyCount?: true;
    recallReason?: true;
    recalledAt?: true;
    recalledById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LoanCountAggregateInputType = {
    id?: true;
    status?: true;
    assetId?: true;
    userId?: true;
    purpose?: true;
    dueDate?: true;
    managerApprovedAt?: true;
    managerApprovedById?: true;
    deptApprovedAt?: true;
    deptApprovedById?: true;
    adminApprovedAt?: true;
    adminApprovedById?: true;
    checkedOutAt?: true;
    checkedOutById?: true;
    checkoutLocationId?: true;
    checkoutMemo?: true;
    receivedAt?: true;
    receivedById?: true;
    rejectReason?: true;
    rejectedAt?: true;
    rejectedById?: true;
    cancelledAt?: true;
    overdueNotifyCount?: true;
    recallReason?: true;
    recalledAt?: true;
    recalledById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LoanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: LoanAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: LoanSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType;
};
export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
    [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLoan[P]> : Prisma.GetScalarType<T[P], AggregateLoan[P]>;
};
export type LoanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithAggregationInput | Prisma.LoanOrderByWithAggregationInput[];
    by: Prisma.LoanScalarFieldEnum[] | Prisma.LoanScalarFieldEnum;
    having?: Prisma.LoanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LoanCountAggregateInputType | true;
    _avg?: LoanAvgAggregateInputType;
    _sum?: LoanSumAggregateInputType;
    _min?: LoanMinAggregateInputType;
    _max?: LoanMaxAggregateInputType;
};
export type LoanGroupByOutputType = {
    id: string;
    status: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose: string | null;
    dueDate: Date | null;
    managerApprovedAt: Date | null;
    managerApprovedById: string | null;
    deptApprovedAt: Date | null;
    deptApprovedById: string | null;
    adminApprovedAt: Date | null;
    adminApprovedById: string | null;
    checkedOutAt: Date | null;
    checkedOutById: string | null;
    checkoutLocationId: string | null;
    checkoutMemo: string | null;
    receivedAt: Date | null;
    receivedById: string | null;
    rejectReason: string | null;
    rejectedAt: Date | null;
    rejectedById: string | null;
    cancelledAt: Date | null;
    overdueNotifyCount: number;
    recallReason: string | null;
    recalledAt: Date | null;
    recalledById: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LoanCountAggregateOutputType | null;
    _avg: LoanAvgAggregateOutputType | null;
    _sum: LoanSumAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
export type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LoanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]>;
}>>;
export type LoanWhereInput = {
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    id?: Prisma.StringFilter<"Loan"> | string;
    status?: Prisma.EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus;
    assetId?: Prisma.StringFilter<"Loan"> | string;
    userId?: Prisma.StringFilter<"Loan"> | string;
    purpose?: Prisma.StringNullableFilter<"Loan"> | string | null;
    dueDate?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    managerApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    managerApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    deptApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    deptApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    adminApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    adminApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkedOutAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    checkedOutById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkoutLocationId?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkoutMemo?: Prisma.StringNullableFilter<"Loan"> | string | null;
    receivedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    receivedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    rejectReason?: Prisma.StringNullableFilter<"Loan"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    rejectedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    cancelledAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    overdueNotifyCount?: Prisma.IntFilter<"Loan"> | number;
    recallReason?: Prisma.StringNullableFilter<"Loan"> | string | null;
    recalledAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    recalledById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    managerApprovedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    deptApprovedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    adminApprovedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    checkedOutBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    checkoutLocation?: Prisma.XOR<Prisma.LocationNullableScalarRelationFilter, Prisma.LocationWhereInput> | null;
    receivedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    rejectedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    recalledBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    loanReturn?: Prisma.XOR<Prisma.LoanReturnNullableScalarRelationFilter, Prisma.LoanReturnWhereInput> | null;
    extensions?: Prisma.LoanExtensionListRelationFilter;
};
export type LoanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrderInput | Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    managerApprovedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    managerApprovedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    deptApprovedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deptApprovedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminApprovedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminApprovedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkedOutAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkedOutById?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkoutLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkoutMemo?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    overdueNotifyCount?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    recalledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    recalledById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    asset?: Prisma.AssetOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    managerApprovedBy?: Prisma.UserOrderByWithRelationInput;
    deptApprovedBy?: Prisma.UserOrderByWithRelationInput;
    adminApprovedBy?: Prisma.UserOrderByWithRelationInput;
    checkedOutBy?: Prisma.UserOrderByWithRelationInput;
    checkoutLocation?: Prisma.LocationOrderByWithRelationInput;
    receivedBy?: Prisma.UserOrderByWithRelationInput;
    rejectedBy?: Prisma.UserOrderByWithRelationInput;
    recalledBy?: Prisma.UserOrderByWithRelationInput;
    loanReturn?: Prisma.LoanReturnOrderByWithRelationInput;
    extensions?: Prisma.LoanExtensionOrderByRelationAggregateInput;
};
export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    status?: Prisma.EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus;
    assetId?: Prisma.StringFilter<"Loan"> | string;
    userId?: Prisma.StringFilter<"Loan"> | string;
    purpose?: Prisma.StringNullableFilter<"Loan"> | string | null;
    dueDate?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    managerApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    managerApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    deptApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    deptApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    adminApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    adminApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkedOutAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    checkedOutById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkoutLocationId?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkoutMemo?: Prisma.StringNullableFilter<"Loan"> | string | null;
    receivedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    receivedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    rejectReason?: Prisma.StringNullableFilter<"Loan"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    rejectedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    cancelledAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    overdueNotifyCount?: Prisma.IntFilter<"Loan"> | number;
    recallReason?: Prisma.StringNullableFilter<"Loan"> | string | null;
    recalledAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    recalledById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    managerApprovedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    deptApprovedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    adminApprovedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    checkedOutBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    checkoutLocation?: Prisma.XOR<Prisma.LocationNullableScalarRelationFilter, Prisma.LocationWhereInput> | null;
    receivedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    rejectedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    recalledBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    loanReturn?: Prisma.XOR<Prisma.LoanReturnNullableScalarRelationFilter, Prisma.LoanReturnWhereInput> | null;
    extensions?: Prisma.LoanExtensionListRelationFilter;
}, "id">;
export type LoanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrderInput | Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    managerApprovedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    managerApprovedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    deptApprovedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deptApprovedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminApprovedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminApprovedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkedOutAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkedOutById?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkoutLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkoutMemo?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    overdueNotifyCount?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    recalledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    recalledById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LoanCountOrderByAggregateInput;
    _avg?: Prisma.LoanAvgOrderByAggregateInput;
    _max?: Prisma.LoanMaxOrderByAggregateInput;
    _min?: Prisma.LoanMinOrderByAggregateInput;
    _sum?: Prisma.LoanSumOrderByAggregateInput;
};
export type LoanScalarWhereWithAggregatesInput = {
    AND?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    OR?: Prisma.LoanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    status?: Prisma.EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus;
    assetId?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    purpose?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    dueDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    managerApprovedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    managerApprovedById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    deptApprovedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    deptApprovedById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    adminApprovedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    adminApprovedById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    checkedOutAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    checkedOutById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    checkoutLocationId?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    checkoutMemo?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    receivedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    receivedById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    rejectReason?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    rejectedById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    cancelledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    overdueNotifyCount?: Prisma.IntWithAggregatesFilter<"Loan"> | number;
    recallReason?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    recalledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    recalledById?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
};
export type LoanCreateInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanCreateManyInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanListRelationFilter = {
    every?: Prisma.LoanWhereInput;
    some?: Prisma.LoanWhereInput;
    none?: Prisma.LoanWhereInput;
};
export type LoanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LoanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    managerApprovedAt?: Prisma.SortOrder;
    managerApprovedById?: Prisma.SortOrder;
    deptApprovedAt?: Prisma.SortOrder;
    deptApprovedById?: Prisma.SortOrder;
    adminApprovedAt?: Prisma.SortOrder;
    adminApprovedById?: Prisma.SortOrder;
    checkedOutAt?: Prisma.SortOrder;
    checkedOutById?: Prisma.SortOrder;
    checkoutLocationId?: Prisma.SortOrder;
    checkoutMemo?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    rejectReason?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectedById?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    overdueNotifyCount?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrder;
    recalledAt?: Prisma.SortOrder;
    recalledById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoanAvgOrderByAggregateInput = {
    overdueNotifyCount?: Prisma.SortOrder;
};
export type LoanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    managerApprovedAt?: Prisma.SortOrder;
    managerApprovedById?: Prisma.SortOrder;
    deptApprovedAt?: Prisma.SortOrder;
    deptApprovedById?: Prisma.SortOrder;
    adminApprovedAt?: Prisma.SortOrder;
    adminApprovedById?: Prisma.SortOrder;
    checkedOutAt?: Prisma.SortOrder;
    checkedOutById?: Prisma.SortOrder;
    checkoutLocationId?: Prisma.SortOrder;
    checkoutMemo?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    rejectReason?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectedById?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    overdueNotifyCount?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrder;
    recalledAt?: Prisma.SortOrder;
    recalledById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    managerApprovedAt?: Prisma.SortOrder;
    managerApprovedById?: Prisma.SortOrder;
    deptApprovedAt?: Prisma.SortOrder;
    deptApprovedById?: Prisma.SortOrder;
    adminApprovedAt?: Prisma.SortOrder;
    adminApprovedById?: Prisma.SortOrder;
    checkedOutAt?: Prisma.SortOrder;
    checkedOutById?: Prisma.SortOrder;
    checkoutLocationId?: Prisma.SortOrder;
    checkoutMemo?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    rejectReason?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectedById?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    overdueNotifyCount?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrder;
    recalledAt?: Prisma.SortOrder;
    recalledById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoanSumOrderByAggregateInput = {
    overdueNotifyCount?: Prisma.SortOrder;
};
export type LoanScalarRelationFilter = {
    is?: Prisma.LoanWhereInput;
    isNot?: Prisma.LoanWhereInput;
};
export type LoanCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutUserInput, Prisma.LoanUncheckedCreateWithoutUserInput> | Prisma.LoanCreateWithoutUserInput[] | Prisma.LoanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutUserInput | Prisma.LoanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.LoanCreateManyUserInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutManagerApprovedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutManagerApprovedByInput, Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput> | Prisma.LoanCreateWithoutManagerApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput | Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput[];
    createMany?: Prisma.LoanCreateManyManagerApprovedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutDeptApprovedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutDeptApprovedByInput, Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput> | Prisma.LoanCreateWithoutDeptApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput | Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput[];
    createMany?: Prisma.LoanCreateManyDeptApprovedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutAdminApprovedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAdminApprovedByInput, Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput> | Prisma.LoanCreateWithoutAdminApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput | Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput[];
    createMany?: Prisma.LoanCreateManyAdminApprovedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutCheckedOutByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckedOutByInput, Prisma.LoanUncheckedCreateWithoutCheckedOutByInput> | Prisma.LoanCreateWithoutCheckedOutByInput[] | Prisma.LoanUncheckedCreateWithoutCheckedOutByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckedOutByInput | Prisma.LoanCreateOrConnectWithoutCheckedOutByInput[];
    createMany?: Prisma.LoanCreateManyCheckedOutByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutReceivedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutReceivedByInput, Prisma.LoanUncheckedCreateWithoutReceivedByInput> | Prisma.LoanCreateWithoutReceivedByInput[] | Prisma.LoanUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutReceivedByInput | Prisma.LoanCreateOrConnectWithoutReceivedByInput[];
    createMany?: Prisma.LoanCreateManyReceivedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutRejectedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRejectedByInput, Prisma.LoanUncheckedCreateWithoutRejectedByInput> | Prisma.LoanCreateWithoutRejectedByInput[] | Prisma.LoanUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRejectedByInput | Prisma.LoanCreateOrConnectWithoutRejectedByInput[];
    createMany?: Prisma.LoanCreateManyRejectedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanCreateNestedManyWithoutRecalledByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRecalledByInput, Prisma.LoanUncheckedCreateWithoutRecalledByInput> | Prisma.LoanCreateWithoutRecalledByInput[] | Prisma.LoanUncheckedCreateWithoutRecalledByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRecalledByInput | Prisma.LoanCreateOrConnectWithoutRecalledByInput[];
    createMany?: Prisma.LoanCreateManyRecalledByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutUserInput, Prisma.LoanUncheckedCreateWithoutUserInput> | Prisma.LoanCreateWithoutUserInput[] | Prisma.LoanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutUserInput | Prisma.LoanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.LoanCreateManyUserInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutManagerApprovedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutManagerApprovedByInput, Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput> | Prisma.LoanCreateWithoutManagerApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput | Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput[];
    createMany?: Prisma.LoanCreateManyManagerApprovedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutDeptApprovedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutDeptApprovedByInput, Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput> | Prisma.LoanCreateWithoutDeptApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput | Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput[];
    createMany?: Prisma.LoanCreateManyDeptApprovedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutAdminApprovedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAdminApprovedByInput, Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput> | Prisma.LoanCreateWithoutAdminApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput | Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput[];
    createMany?: Prisma.LoanCreateManyAdminApprovedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutCheckedOutByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckedOutByInput, Prisma.LoanUncheckedCreateWithoutCheckedOutByInput> | Prisma.LoanCreateWithoutCheckedOutByInput[] | Prisma.LoanUncheckedCreateWithoutCheckedOutByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckedOutByInput | Prisma.LoanCreateOrConnectWithoutCheckedOutByInput[];
    createMany?: Prisma.LoanCreateManyCheckedOutByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutReceivedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutReceivedByInput, Prisma.LoanUncheckedCreateWithoutReceivedByInput> | Prisma.LoanCreateWithoutReceivedByInput[] | Prisma.LoanUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutReceivedByInput | Prisma.LoanCreateOrConnectWithoutReceivedByInput[];
    createMany?: Prisma.LoanCreateManyReceivedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutRejectedByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRejectedByInput, Prisma.LoanUncheckedCreateWithoutRejectedByInput> | Prisma.LoanCreateWithoutRejectedByInput[] | Prisma.LoanUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRejectedByInput | Prisma.LoanCreateOrConnectWithoutRejectedByInput[];
    createMany?: Prisma.LoanCreateManyRejectedByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutRecalledByInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRecalledByInput, Prisma.LoanUncheckedCreateWithoutRecalledByInput> | Prisma.LoanCreateWithoutRecalledByInput[] | Prisma.LoanUncheckedCreateWithoutRecalledByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRecalledByInput | Prisma.LoanCreateOrConnectWithoutRecalledByInput[];
    createMany?: Prisma.LoanCreateManyRecalledByInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutUserInput, Prisma.LoanUncheckedCreateWithoutUserInput> | Prisma.LoanCreateWithoutUserInput[] | Prisma.LoanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutUserInput | Prisma.LoanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutUserInput | Prisma.LoanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.LoanCreateManyUserInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutUserInput | Prisma.LoanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutUserInput | Prisma.LoanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutManagerApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutManagerApprovedByInput, Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput> | Prisma.LoanCreateWithoutManagerApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput | Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutManagerApprovedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutManagerApprovedByInput[];
    createMany?: Prisma.LoanCreateManyManagerApprovedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutManagerApprovedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutManagerApprovedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutManagerApprovedByInput | Prisma.LoanUpdateManyWithWhereWithoutManagerApprovedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutDeptApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutDeptApprovedByInput, Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput> | Prisma.LoanCreateWithoutDeptApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput | Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutDeptApprovedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutDeptApprovedByInput[];
    createMany?: Prisma.LoanCreateManyDeptApprovedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutDeptApprovedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutDeptApprovedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutDeptApprovedByInput | Prisma.LoanUpdateManyWithWhereWithoutDeptApprovedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutAdminApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAdminApprovedByInput, Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput> | Prisma.LoanCreateWithoutAdminApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput | Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutAdminApprovedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutAdminApprovedByInput[];
    createMany?: Prisma.LoanCreateManyAdminApprovedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutAdminApprovedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutAdminApprovedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutAdminApprovedByInput | Prisma.LoanUpdateManyWithWhereWithoutAdminApprovedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutCheckedOutByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckedOutByInput, Prisma.LoanUncheckedCreateWithoutCheckedOutByInput> | Prisma.LoanCreateWithoutCheckedOutByInput[] | Prisma.LoanUncheckedCreateWithoutCheckedOutByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckedOutByInput | Prisma.LoanCreateOrConnectWithoutCheckedOutByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutCheckedOutByInput | Prisma.LoanUpsertWithWhereUniqueWithoutCheckedOutByInput[];
    createMany?: Prisma.LoanCreateManyCheckedOutByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutCheckedOutByInput | Prisma.LoanUpdateWithWhereUniqueWithoutCheckedOutByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutCheckedOutByInput | Prisma.LoanUpdateManyWithWhereWithoutCheckedOutByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutReceivedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutReceivedByInput, Prisma.LoanUncheckedCreateWithoutReceivedByInput> | Prisma.LoanCreateWithoutReceivedByInput[] | Prisma.LoanUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutReceivedByInput | Prisma.LoanCreateOrConnectWithoutReceivedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutReceivedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutReceivedByInput[];
    createMany?: Prisma.LoanCreateManyReceivedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutReceivedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutReceivedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutReceivedByInput | Prisma.LoanUpdateManyWithWhereWithoutReceivedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutRejectedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRejectedByInput, Prisma.LoanUncheckedCreateWithoutRejectedByInput> | Prisma.LoanCreateWithoutRejectedByInput[] | Prisma.LoanUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRejectedByInput | Prisma.LoanCreateOrConnectWithoutRejectedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutRejectedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutRejectedByInput[];
    createMany?: Prisma.LoanCreateManyRejectedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutRejectedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutRejectedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutRejectedByInput | Prisma.LoanUpdateManyWithWhereWithoutRejectedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUpdateManyWithoutRecalledByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRecalledByInput, Prisma.LoanUncheckedCreateWithoutRecalledByInput> | Prisma.LoanCreateWithoutRecalledByInput[] | Prisma.LoanUncheckedCreateWithoutRecalledByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRecalledByInput | Prisma.LoanCreateOrConnectWithoutRecalledByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutRecalledByInput | Prisma.LoanUpsertWithWhereUniqueWithoutRecalledByInput[];
    createMany?: Prisma.LoanCreateManyRecalledByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutRecalledByInput | Prisma.LoanUpdateWithWhereUniqueWithoutRecalledByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutRecalledByInput | Prisma.LoanUpdateManyWithWhereWithoutRecalledByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutUserInput, Prisma.LoanUncheckedCreateWithoutUserInput> | Prisma.LoanCreateWithoutUserInput[] | Prisma.LoanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutUserInput | Prisma.LoanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutUserInput | Prisma.LoanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.LoanCreateManyUserInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutUserInput | Prisma.LoanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutUserInput | Prisma.LoanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutManagerApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutManagerApprovedByInput, Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput> | Prisma.LoanCreateWithoutManagerApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput | Prisma.LoanCreateOrConnectWithoutManagerApprovedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutManagerApprovedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutManagerApprovedByInput[];
    createMany?: Prisma.LoanCreateManyManagerApprovedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutManagerApprovedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutManagerApprovedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutManagerApprovedByInput | Prisma.LoanUpdateManyWithWhereWithoutManagerApprovedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutDeptApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutDeptApprovedByInput, Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput> | Prisma.LoanCreateWithoutDeptApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput | Prisma.LoanCreateOrConnectWithoutDeptApprovedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutDeptApprovedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutDeptApprovedByInput[];
    createMany?: Prisma.LoanCreateManyDeptApprovedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutDeptApprovedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutDeptApprovedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutDeptApprovedByInput | Prisma.LoanUpdateManyWithWhereWithoutDeptApprovedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutAdminApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAdminApprovedByInput, Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput> | Prisma.LoanCreateWithoutAdminApprovedByInput[] | Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput | Prisma.LoanCreateOrConnectWithoutAdminApprovedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutAdminApprovedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutAdminApprovedByInput[];
    createMany?: Prisma.LoanCreateManyAdminApprovedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutAdminApprovedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutAdminApprovedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutAdminApprovedByInput | Prisma.LoanUpdateManyWithWhereWithoutAdminApprovedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutCheckedOutByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckedOutByInput, Prisma.LoanUncheckedCreateWithoutCheckedOutByInput> | Prisma.LoanCreateWithoutCheckedOutByInput[] | Prisma.LoanUncheckedCreateWithoutCheckedOutByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckedOutByInput | Prisma.LoanCreateOrConnectWithoutCheckedOutByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutCheckedOutByInput | Prisma.LoanUpsertWithWhereUniqueWithoutCheckedOutByInput[];
    createMany?: Prisma.LoanCreateManyCheckedOutByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutCheckedOutByInput | Prisma.LoanUpdateWithWhereUniqueWithoutCheckedOutByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutCheckedOutByInput | Prisma.LoanUpdateManyWithWhereWithoutCheckedOutByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutReceivedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutReceivedByInput, Prisma.LoanUncheckedCreateWithoutReceivedByInput> | Prisma.LoanCreateWithoutReceivedByInput[] | Prisma.LoanUncheckedCreateWithoutReceivedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutReceivedByInput | Prisma.LoanCreateOrConnectWithoutReceivedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutReceivedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutReceivedByInput[];
    createMany?: Prisma.LoanCreateManyReceivedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutReceivedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutReceivedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutReceivedByInput | Prisma.LoanUpdateManyWithWhereWithoutReceivedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutRejectedByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRejectedByInput, Prisma.LoanUncheckedCreateWithoutRejectedByInput> | Prisma.LoanCreateWithoutRejectedByInput[] | Prisma.LoanUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRejectedByInput | Prisma.LoanCreateOrConnectWithoutRejectedByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutRejectedByInput | Prisma.LoanUpsertWithWhereUniqueWithoutRejectedByInput[];
    createMany?: Prisma.LoanCreateManyRejectedByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutRejectedByInput | Prisma.LoanUpdateWithWhereUniqueWithoutRejectedByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutRejectedByInput | Prisma.LoanUpdateManyWithWhereWithoutRejectedByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutRecalledByNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRecalledByInput, Prisma.LoanUncheckedCreateWithoutRecalledByInput> | Prisma.LoanCreateWithoutRecalledByInput[] | Prisma.LoanUncheckedCreateWithoutRecalledByInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRecalledByInput | Prisma.LoanCreateOrConnectWithoutRecalledByInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutRecalledByInput | Prisma.LoanUpsertWithWhereUniqueWithoutRecalledByInput[];
    createMany?: Prisma.LoanCreateManyRecalledByInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutRecalledByInput | Prisma.LoanUpdateWithWhereUniqueWithoutRecalledByInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutRecalledByInput | Prisma.LoanUpdateManyWithWhereWithoutRecalledByInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanCreateNestedManyWithoutCheckoutLocationInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckoutLocationInput, Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput> | Prisma.LoanCreateWithoutCheckoutLocationInput[] | Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput | Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput[];
    createMany?: Prisma.LoanCreateManyCheckoutLocationInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutCheckoutLocationInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckoutLocationInput, Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput> | Prisma.LoanCreateWithoutCheckoutLocationInput[] | Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput | Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput[];
    createMany?: Prisma.LoanCreateManyCheckoutLocationInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutCheckoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckoutLocationInput, Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput> | Prisma.LoanCreateWithoutCheckoutLocationInput[] | Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput | Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutCheckoutLocationInput | Prisma.LoanUpsertWithWhereUniqueWithoutCheckoutLocationInput[];
    createMany?: Prisma.LoanCreateManyCheckoutLocationInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutCheckoutLocationInput | Prisma.LoanUpdateWithWhereUniqueWithoutCheckoutLocationInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutCheckoutLocationInput | Prisma.LoanUpdateManyWithWhereWithoutCheckoutLocationInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutCheckoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutCheckoutLocationInput, Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput> | Prisma.LoanCreateWithoutCheckoutLocationInput[] | Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput | Prisma.LoanCreateOrConnectWithoutCheckoutLocationInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutCheckoutLocationInput | Prisma.LoanUpsertWithWhereUniqueWithoutCheckoutLocationInput[];
    createMany?: Prisma.LoanCreateManyCheckoutLocationInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutCheckoutLocationInput | Prisma.LoanUpdateWithWhereUniqueWithoutCheckoutLocationInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutCheckoutLocationInput | Prisma.LoanUpdateManyWithWhereWithoutCheckoutLocationInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAssetInput, Prisma.LoanUncheckedCreateWithoutAssetInput> | Prisma.LoanCreateWithoutAssetInput[] | Prisma.LoanUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAssetInput | Prisma.LoanCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.LoanCreateManyAssetInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAssetInput, Prisma.LoanUncheckedCreateWithoutAssetInput> | Prisma.LoanCreateWithoutAssetInput[] | Prisma.LoanUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAssetInput | Prisma.LoanCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.LoanCreateManyAssetInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAssetInput, Prisma.LoanUncheckedCreateWithoutAssetInput> | Prisma.LoanCreateWithoutAssetInput[] | Prisma.LoanUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAssetInput | Prisma.LoanCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutAssetInput | Prisma.LoanUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.LoanCreateManyAssetInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutAssetInput | Prisma.LoanUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutAssetInput | Prisma.LoanUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutAssetInput, Prisma.LoanUncheckedCreateWithoutAssetInput> | Prisma.LoanCreateWithoutAssetInput[] | Prisma.LoanUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutAssetInput | Prisma.LoanCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutAssetInput | Prisma.LoanUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.LoanCreateManyAssetInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutAssetInput | Prisma.LoanUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutAssetInput | Prisma.LoanUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus;
};
export type LoanCreateNestedOneWithoutLoanReturnInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutLoanReturnInput, Prisma.LoanUncheckedCreateWithoutLoanReturnInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutLoanReturnInput;
    connect?: Prisma.LoanWhereUniqueInput;
};
export type LoanUpdateOneRequiredWithoutLoanReturnNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutLoanReturnInput, Prisma.LoanUncheckedCreateWithoutLoanReturnInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutLoanReturnInput;
    upsert?: Prisma.LoanUpsertWithoutLoanReturnInput;
    connect?: Prisma.LoanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LoanUpdateToOneWithWhereWithoutLoanReturnInput, Prisma.LoanUpdateWithoutLoanReturnInput>, Prisma.LoanUncheckedUpdateWithoutLoanReturnInput>;
};
export type LoanCreateNestedOneWithoutExtensionsInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutExtensionsInput, Prisma.LoanUncheckedCreateWithoutExtensionsInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutExtensionsInput;
    connect?: Prisma.LoanWhereUniqueInput;
};
export type LoanUpdateOneRequiredWithoutExtensionsNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutExtensionsInput, Prisma.LoanUncheckedCreateWithoutExtensionsInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutExtensionsInput;
    upsert?: Prisma.LoanUpsertWithoutExtensionsInput;
    connect?: Prisma.LoanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LoanUpdateToOneWithWhereWithoutExtensionsInput, Prisma.LoanUpdateWithoutExtensionsInput>, Prisma.LoanUncheckedUpdateWithoutExtensionsInput>;
};
export type LoanCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutUserInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutUserInput, Prisma.LoanUncheckedCreateWithoutUserInput>;
};
export type LoanCreateManyUserInputEnvelope = {
    data: Prisma.LoanCreateManyUserInput | Prisma.LoanCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutManagerApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutManagerApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutManagerApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutManagerApprovedByInput, Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput>;
};
export type LoanCreateManyManagerApprovedByInputEnvelope = {
    data: Prisma.LoanCreateManyManagerApprovedByInput | Prisma.LoanCreateManyManagerApprovedByInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutDeptApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutDeptApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutDeptApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutDeptApprovedByInput, Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput>;
};
export type LoanCreateManyDeptApprovedByInputEnvelope = {
    data: Prisma.LoanCreateManyDeptApprovedByInput | Prisma.LoanCreateManyDeptApprovedByInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutAdminApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutAdminApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutAdminApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutAdminApprovedByInput, Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput>;
};
export type LoanCreateManyAdminApprovedByInputEnvelope = {
    data: Prisma.LoanCreateManyAdminApprovedByInput | Prisma.LoanCreateManyAdminApprovedByInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutCheckedOutByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutCheckedOutByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutCheckedOutByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutCheckedOutByInput, Prisma.LoanUncheckedCreateWithoutCheckedOutByInput>;
};
export type LoanCreateManyCheckedOutByInputEnvelope = {
    data: Prisma.LoanCreateManyCheckedOutByInput | Prisma.LoanCreateManyCheckedOutByInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutReceivedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutReceivedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutReceivedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutReceivedByInput, Prisma.LoanUncheckedCreateWithoutReceivedByInput>;
};
export type LoanCreateManyReceivedByInputEnvelope = {
    data: Prisma.LoanCreateManyReceivedByInput | Prisma.LoanCreateManyReceivedByInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutRejectedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutRejectedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutRejectedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutRejectedByInput, Prisma.LoanUncheckedCreateWithoutRejectedByInput>;
};
export type LoanCreateManyRejectedByInputEnvelope = {
    data: Prisma.LoanCreateManyRejectedByInput | Prisma.LoanCreateManyRejectedByInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateWithoutRecalledByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutRecalledByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutRecalledByInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutRecalledByInput, Prisma.LoanUncheckedCreateWithoutRecalledByInput>;
};
export type LoanCreateManyRecalledByInputEnvelope = {
    data: Prisma.LoanCreateManyRecalledByInput | Prisma.LoanCreateManyRecalledByInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutUserInput, Prisma.LoanUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutUserInput, Prisma.LoanUncheckedCreateWithoutUserInput>;
};
export type LoanUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutUserInput, Prisma.LoanUncheckedUpdateWithoutUserInput>;
};
export type LoanUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutUserInput>;
};
export type LoanScalarWhereInput = {
    AND?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    OR?: Prisma.LoanScalarWhereInput[];
    NOT?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    id?: Prisma.StringFilter<"Loan"> | string;
    status?: Prisma.EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus;
    assetId?: Prisma.StringFilter<"Loan"> | string;
    userId?: Prisma.StringFilter<"Loan"> | string;
    purpose?: Prisma.StringNullableFilter<"Loan"> | string | null;
    dueDate?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    managerApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    managerApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    deptApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    deptApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    adminApprovedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    adminApprovedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkedOutAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    checkedOutById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkoutLocationId?: Prisma.StringNullableFilter<"Loan"> | string | null;
    checkoutMemo?: Prisma.StringNullableFilter<"Loan"> | string | null;
    receivedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    receivedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    rejectReason?: Prisma.StringNullableFilter<"Loan"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    rejectedById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    cancelledAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    overdueNotifyCount?: Prisma.IntFilter<"Loan"> | number;
    recallReason?: Prisma.StringNullableFilter<"Loan"> | string | null;
    recalledAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    recalledById?: Prisma.StringNullableFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
};
export type LoanUpsertWithWhereUniqueWithoutManagerApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutManagerApprovedByInput, Prisma.LoanUncheckedUpdateWithoutManagerApprovedByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutManagerApprovedByInput, Prisma.LoanUncheckedCreateWithoutManagerApprovedByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutManagerApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutManagerApprovedByInput, Prisma.LoanUncheckedUpdateWithoutManagerApprovedByInput>;
};
export type LoanUpdateManyWithWhereWithoutManagerApprovedByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutManagerApprovedByInput>;
};
export type LoanUpsertWithWhereUniqueWithoutDeptApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutDeptApprovedByInput, Prisma.LoanUncheckedUpdateWithoutDeptApprovedByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutDeptApprovedByInput, Prisma.LoanUncheckedCreateWithoutDeptApprovedByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutDeptApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutDeptApprovedByInput, Prisma.LoanUncheckedUpdateWithoutDeptApprovedByInput>;
};
export type LoanUpdateManyWithWhereWithoutDeptApprovedByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutDeptApprovedByInput>;
};
export type LoanUpsertWithWhereUniqueWithoutAdminApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutAdminApprovedByInput, Prisma.LoanUncheckedUpdateWithoutAdminApprovedByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutAdminApprovedByInput, Prisma.LoanUncheckedCreateWithoutAdminApprovedByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutAdminApprovedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutAdminApprovedByInput, Prisma.LoanUncheckedUpdateWithoutAdminApprovedByInput>;
};
export type LoanUpdateManyWithWhereWithoutAdminApprovedByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutAdminApprovedByInput>;
};
export type LoanUpsertWithWhereUniqueWithoutCheckedOutByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutCheckedOutByInput, Prisma.LoanUncheckedUpdateWithoutCheckedOutByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutCheckedOutByInput, Prisma.LoanUncheckedCreateWithoutCheckedOutByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutCheckedOutByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutCheckedOutByInput, Prisma.LoanUncheckedUpdateWithoutCheckedOutByInput>;
};
export type LoanUpdateManyWithWhereWithoutCheckedOutByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutCheckedOutByInput>;
};
export type LoanUpsertWithWhereUniqueWithoutReceivedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutReceivedByInput, Prisma.LoanUncheckedUpdateWithoutReceivedByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutReceivedByInput, Prisma.LoanUncheckedCreateWithoutReceivedByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutReceivedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutReceivedByInput, Prisma.LoanUncheckedUpdateWithoutReceivedByInput>;
};
export type LoanUpdateManyWithWhereWithoutReceivedByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutReceivedByInput>;
};
export type LoanUpsertWithWhereUniqueWithoutRejectedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutRejectedByInput, Prisma.LoanUncheckedUpdateWithoutRejectedByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutRejectedByInput, Prisma.LoanUncheckedCreateWithoutRejectedByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutRejectedByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutRejectedByInput, Prisma.LoanUncheckedUpdateWithoutRejectedByInput>;
};
export type LoanUpdateManyWithWhereWithoutRejectedByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutRejectedByInput>;
};
export type LoanUpsertWithWhereUniqueWithoutRecalledByInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutRecalledByInput, Prisma.LoanUncheckedUpdateWithoutRecalledByInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutRecalledByInput, Prisma.LoanUncheckedCreateWithoutRecalledByInput>;
};
export type LoanUpdateWithWhereUniqueWithoutRecalledByInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutRecalledByInput, Prisma.LoanUncheckedUpdateWithoutRecalledByInput>;
};
export type LoanUpdateManyWithWhereWithoutRecalledByInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutRecalledByInput>;
};
export type LoanCreateWithoutCheckoutLocationInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutCheckoutLocationInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutCheckoutLocationInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutCheckoutLocationInput, Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput>;
};
export type LoanCreateManyCheckoutLocationInputEnvelope = {
    data: Prisma.LoanCreateManyCheckoutLocationInput | Prisma.LoanCreateManyCheckoutLocationInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutCheckoutLocationInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutCheckoutLocationInput, Prisma.LoanUncheckedUpdateWithoutCheckoutLocationInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutCheckoutLocationInput, Prisma.LoanUncheckedCreateWithoutCheckoutLocationInput>;
};
export type LoanUpdateWithWhereUniqueWithoutCheckoutLocationInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutCheckoutLocationInput, Prisma.LoanUncheckedUpdateWithoutCheckoutLocationInput>;
};
export type LoanUpdateManyWithWhereWithoutCheckoutLocationInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutCheckoutLocationInput>;
};
export type LoanCreateWithoutAssetInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutAssetInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutAssetInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutAssetInput, Prisma.LoanUncheckedCreateWithoutAssetInput>;
};
export type LoanCreateManyAssetInputEnvelope = {
    data: Prisma.LoanCreateManyAssetInput | Prisma.LoanCreateManyAssetInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutAssetInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutAssetInput, Prisma.LoanUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutAssetInput, Prisma.LoanUncheckedCreateWithoutAssetInput>;
};
export type LoanUpdateWithWhereUniqueWithoutAssetInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutAssetInput, Prisma.LoanUncheckedUpdateWithoutAssetInput>;
};
export type LoanUpdateManyWithWhereWithoutAssetInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutAssetInput>;
};
export type LoanCreateWithoutLoanReturnInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    extensions?: Prisma.LoanExtensionCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutLoanReturnInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    extensions?: Prisma.LoanExtensionUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutLoanReturnInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutLoanReturnInput, Prisma.LoanUncheckedCreateWithoutLoanReturnInput>;
};
export type LoanUpsertWithoutLoanReturnInput = {
    update: Prisma.XOR<Prisma.LoanUpdateWithoutLoanReturnInput, Prisma.LoanUncheckedUpdateWithoutLoanReturnInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutLoanReturnInput, Prisma.LoanUncheckedCreateWithoutLoanReturnInput>;
    where?: Prisma.LoanWhereInput;
};
export type LoanUpdateToOneWithWhereWithoutLoanReturnInput = {
    where?: Prisma.LoanWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutLoanReturnInput, Prisma.LoanUncheckedUpdateWithoutLoanReturnInput>;
};
export type LoanUpdateWithoutLoanReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutLoanReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanCreateWithoutExtensionsInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutLoansInput;
    user: Prisma.UserCreateNestedOneWithoutLoansInput;
    managerApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanManagerApprovalsInput;
    deptApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanDeptApprovalsInput;
    adminApprovedBy?: Prisma.UserCreateNestedOneWithoutLoanAdminApprovalsInput;
    checkedOutBy?: Prisma.UserCreateNestedOneWithoutLoanCheckoutsInput;
    checkoutLocation?: Prisma.LocationCreateNestedOneWithoutLoanCheckoutsInput;
    receivedBy?: Prisma.UserCreateNestedOneWithoutLoanReceivedByInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutLoanRejectionsInput;
    recalledBy?: Prisma.UserCreateNestedOneWithoutLoanRecallsInput;
    loanReturn?: Prisma.LoanReturnCreateNestedOneWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutExtensionsInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedCreateNestedOneWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutExtensionsInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutExtensionsInput, Prisma.LoanUncheckedCreateWithoutExtensionsInput>;
};
export type LoanUpsertWithoutExtensionsInput = {
    update: Prisma.XOR<Prisma.LoanUpdateWithoutExtensionsInput, Prisma.LoanUncheckedUpdateWithoutExtensionsInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutExtensionsInput, Prisma.LoanUncheckedCreateWithoutExtensionsInput>;
    where?: Prisma.LoanWhereInput;
};
export type LoanUpdateToOneWithWhereWithoutExtensionsInput = {
    where?: Prisma.LoanWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutExtensionsInput, Prisma.LoanUncheckedUpdateWithoutExtensionsInput>;
};
export type LoanUpdateWithoutExtensionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutExtensionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
};
export type LoanCreateManyUserInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyManagerApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyDeptApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyAdminApprovedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyCheckedOutByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyReceivedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyRejectedByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateManyRecalledByInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutManagerApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutManagerApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutManagerApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutDeptApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutDeptApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutDeptApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutAdminApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutAdminApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutAdminApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutCheckedOutByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutCheckedOutByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutCheckedOutByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutReceivedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutReceivedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutReceivedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutRejectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutRejectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutRejectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUpdateWithoutRecalledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutRecalledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutRecalledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanCreateManyCheckoutLocationInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    assetId: string;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanUpdateWithoutCheckoutLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutLoansNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutCheckoutLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutCheckoutLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanCreateManyAssetInput = {
    id?: string;
    status?: $Enums.LoanStatus;
    userId: string;
    purpose?: string | null;
    dueDate?: Date | string | null;
    managerApprovedAt?: Date | string | null;
    managerApprovedById?: string | null;
    deptApprovedAt?: Date | string | null;
    deptApprovedById?: string | null;
    adminApprovedAt?: Date | string | null;
    adminApprovedById?: string | null;
    checkedOutAt?: Date | string | null;
    checkedOutById?: string | null;
    checkoutLocationId?: string | null;
    checkoutMemo?: string | null;
    receivedAt?: Date | string | null;
    receivedById?: string | null;
    rejectReason?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    cancelledAt?: Date | string | null;
    overdueNotifyCount?: number;
    recallReason?: string | null;
    recalledAt?: Date | string | null;
    recalledById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanUpdateWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
    managerApprovedBy?: Prisma.UserUpdateOneWithoutLoanManagerApprovalsNestedInput;
    deptApprovedBy?: Prisma.UserUpdateOneWithoutLoanDeptApprovalsNestedInput;
    adminApprovedBy?: Prisma.UserUpdateOneWithoutLoanAdminApprovalsNestedInput;
    checkedOutBy?: Prisma.UserUpdateOneWithoutLoanCheckoutsNestedInput;
    checkoutLocation?: Prisma.LocationUpdateOneWithoutLoanCheckoutsNestedInput;
    receivedBy?: Prisma.UserUpdateOneWithoutLoanReceivedByNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutLoanRejectionsNestedInput;
    recalledBy?: Prisma.UserUpdateOneWithoutLoanRecallsNestedInput;
    loanReturn?: Prisma.LoanReturnUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loanReturn?: Prisma.LoanReturnUncheckedUpdateOneWithoutLoanNestedInput;
    extensions?: Prisma.LoanExtensionUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    managerApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deptApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deptApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminApprovedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    adminApprovedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkedOutAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkedOutById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    checkoutMemo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receivedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    overdueNotifyCount?: Prisma.IntFieldUpdateOperationsInput | number;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recalledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recalledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type LoanCountOutputType
 */
export type LoanCountOutputType = {
    extensions: number;
};
export type LoanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extensions?: boolean | LoanCountOutputTypeCountExtensionsArgs;
};
/**
 * LoanCountOutputType without action
 */
export type LoanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanCountOutputType
     */
    select?: Prisma.LoanCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * LoanCountOutputType without action
 */
export type LoanCountOutputTypeCountExtensionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanExtensionWhereInput;
};
export type LoanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    status?: boolean;
    assetId?: boolean;
    userId?: boolean;
    purpose?: boolean;
    dueDate?: boolean;
    managerApprovedAt?: boolean;
    managerApprovedById?: boolean;
    deptApprovedAt?: boolean;
    deptApprovedById?: boolean;
    adminApprovedAt?: boolean;
    adminApprovedById?: boolean;
    checkedOutAt?: boolean;
    checkedOutById?: boolean;
    checkoutLocationId?: boolean;
    checkoutMemo?: boolean;
    receivedAt?: boolean;
    receivedById?: boolean;
    rejectReason?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    cancelledAt?: boolean;
    overdueNotifyCount?: boolean;
    recallReason?: boolean;
    recalledAt?: boolean;
    recalledById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    managerApprovedBy?: boolean | Prisma.Loan$managerApprovedByArgs<ExtArgs>;
    deptApprovedBy?: boolean | Prisma.Loan$deptApprovedByArgs<ExtArgs>;
    adminApprovedBy?: boolean | Prisma.Loan$adminApprovedByArgs<ExtArgs>;
    checkedOutBy?: boolean | Prisma.Loan$checkedOutByArgs<ExtArgs>;
    checkoutLocation?: boolean | Prisma.Loan$checkoutLocationArgs<ExtArgs>;
    receivedBy?: boolean | Prisma.Loan$receivedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Loan$rejectedByArgs<ExtArgs>;
    recalledBy?: boolean | Prisma.Loan$recalledByArgs<ExtArgs>;
    loanReturn?: boolean | Prisma.Loan$loanReturnArgs<ExtArgs>;
    extensions?: boolean | Prisma.Loan$extensionsArgs<ExtArgs>;
    _count?: boolean | Prisma.LoanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    status?: boolean;
    assetId?: boolean;
    userId?: boolean;
    purpose?: boolean;
    dueDate?: boolean;
    managerApprovedAt?: boolean;
    managerApprovedById?: boolean;
    deptApprovedAt?: boolean;
    deptApprovedById?: boolean;
    adminApprovedAt?: boolean;
    adminApprovedById?: boolean;
    checkedOutAt?: boolean;
    checkedOutById?: boolean;
    checkoutLocationId?: boolean;
    checkoutMemo?: boolean;
    receivedAt?: boolean;
    receivedById?: boolean;
    rejectReason?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    cancelledAt?: boolean;
    overdueNotifyCount?: boolean;
    recallReason?: boolean;
    recalledAt?: boolean;
    recalledById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    managerApprovedBy?: boolean | Prisma.Loan$managerApprovedByArgs<ExtArgs>;
    deptApprovedBy?: boolean | Prisma.Loan$deptApprovedByArgs<ExtArgs>;
    adminApprovedBy?: boolean | Prisma.Loan$adminApprovedByArgs<ExtArgs>;
    checkedOutBy?: boolean | Prisma.Loan$checkedOutByArgs<ExtArgs>;
    checkoutLocation?: boolean | Prisma.Loan$checkoutLocationArgs<ExtArgs>;
    receivedBy?: boolean | Prisma.Loan$receivedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Loan$rejectedByArgs<ExtArgs>;
    recalledBy?: boolean | Prisma.Loan$recalledByArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    status?: boolean;
    assetId?: boolean;
    userId?: boolean;
    purpose?: boolean;
    dueDate?: boolean;
    managerApprovedAt?: boolean;
    managerApprovedById?: boolean;
    deptApprovedAt?: boolean;
    deptApprovedById?: boolean;
    adminApprovedAt?: boolean;
    adminApprovedById?: boolean;
    checkedOutAt?: boolean;
    checkedOutById?: boolean;
    checkoutLocationId?: boolean;
    checkoutMemo?: boolean;
    receivedAt?: boolean;
    receivedById?: boolean;
    rejectReason?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    cancelledAt?: boolean;
    overdueNotifyCount?: boolean;
    recallReason?: boolean;
    recalledAt?: boolean;
    recalledById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    managerApprovedBy?: boolean | Prisma.Loan$managerApprovedByArgs<ExtArgs>;
    deptApprovedBy?: boolean | Prisma.Loan$deptApprovedByArgs<ExtArgs>;
    adminApprovedBy?: boolean | Prisma.Loan$adminApprovedByArgs<ExtArgs>;
    checkedOutBy?: boolean | Prisma.Loan$checkedOutByArgs<ExtArgs>;
    checkoutLocation?: boolean | Prisma.Loan$checkoutLocationArgs<ExtArgs>;
    receivedBy?: boolean | Prisma.Loan$receivedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Loan$rejectedByArgs<ExtArgs>;
    recalledBy?: boolean | Prisma.Loan$recalledByArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectScalar = {
    id?: boolean;
    status?: boolean;
    assetId?: boolean;
    userId?: boolean;
    purpose?: boolean;
    dueDate?: boolean;
    managerApprovedAt?: boolean;
    managerApprovedById?: boolean;
    deptApprovedAt?: boolean;
    deptApprovedById?: boolean;
    adminApprovedAt?: boolean;
    adminApprovedById?: boolean;
    checkedOutAt?: boolean;
    checkedOutById?: boolean;
    checkoutLocationId?: boolean;
    checkoutMemo?: boolean;
    receivedAt?: boolean;
    receivedById?: boolean;
    rejectReason?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    cancelledAt?: boolean;
    overdueNotifyCount?: boolean;
    recallReason?: boolean;
    recalledAt?: boolean;
    recalledById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LoanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "status" | "assetId" | "userId" | "purpose" | "dueDate" | "managerApprovedAt" | "managerApprovedById" | "deptApprovedAt" | "deptApprovedById" | "adminApprovedAt" | "adminApprovedById" | "checkedOutAt" | "checkedOutById" | "checkoutLocationId" | "checkoutMemo" | "receivedAt" | "receivedById" | "rejectReason" | "rejectedAt" | "rejectedById" | "cancelledAt" | "overdueNotifyCount" | "recallReason" | "recalledAt" | "recalledById" | "createdAt" | "updatedAt", ExtArgs["result"]["loan"]>;
export type LoanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    managerApprovedBy?: boolean | Prisma.Loan$managerApprovedByArgs<ExtArgs>;
    deptApprovedBy?: boolean | Prisma.Loan$deptApprovedByArgs<ExtArgs>;
    adminApprovedBy?: boolean | Prisma.Loan$adminApprovedByArgs<ExtArgs>;
    checkedOutBy?: boolean | Prisma.Loan$checkedOutByArgs<ExtArgs>;
    checkoutLocation?: boolean | Prisma.Loan$checkoutLocationArgs<ExtArgs>;
    receivedBy?: boolean | Prisma.Loan$receivedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Loan$rejectedByArgs<ExtArgs>;
    recalledBy?: boolean | Prisma.Loan$recalledByArgs<ExtArgs>;
    loanReturn?: boolean | Prisma.Loan$loanReturnArgs<ExtArgs>;
    extensions?: boolean | Prisma.Loan$extensionsArgs<ExtArgs>;
    _count?: boolean | Prisma.LoanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LoanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    managerApprovedBy?: boolean | Prisma.Loan$managerApprovedByArgs<ExtArgs>;
    deptApprovedBy?: boolean | Prisma.Loan$deptApprovedByArgs<ExtArgs>;
    adminApprovedBy?: boolean | Prisma.Loan$adminApprovedByArgs<ExtArgs>;
    checkedOutBy?: boolean | Prisma.Loan$checkedOutByArgs<ExtArgs>;
    checkoutLocation?: boolean | Prisma.Loan$checkoutLocationArgs<ExtArgs>;
    receivedBy?: boolean | Prisma.Loan$receivedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Loan$rejectedByArgs<ExtArgs>;
    recalledBy?: boolean | Prisma.Loan$recalledByArgs<ExtArgs>;
};
export type LoanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    managerApprovedBy?: boolean | Prisma.Loan$managerApprovedByArgs<ExtArgs>;
    deptApprovedBy?: boolean | Prisma.Loan$deptApprovedByArgs<ExtArgs>;
    adminApprovedBy?: boolean | Prisma.Loan$adminApprovedByArgs<ExtArgs>;
    checkedOutBy?: boolean | Prisma.Loan$checkedOutByArgs<ExtArgs>;
    checkoutLocation?: boolean | Prisma.Loan$checkoutLocationArgs<ExtArgs>;
    receivedBy?: boolean | Prisma.Loan$receivedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Loan$rejectedByArgs<ExtArgs>;
    recalledBy?: boolean | Prisma.Loan$recalledByArgs<ExtArgs>;
};
export type $LoanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Loan";
    objects: {
        asset: Prisma.$AssetPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        managerApprovedBy: Prisma.$UserPayload<ExtArgs> | null;
        deptApprovedBy: Prisma.$UserPayload<ExtArgs> | null;
        adminApprovedBy: Prisma.$UserPayload<ExtArgs> | null;
        checkedOutBy: Prisma.$UserPayload<ExtArgs> | null;
        checkoutLocation: Prisma.$LocationPayload<ExtArgs> | null;
        receivedBy: Prisma.$UserPayload<ExtArgs> | null;
        rejectedBy: Prisma.$UserPayload<ExtArgs> | null;
        recalledBy: Prisma.$UserPayload<ExtArgs> | null;
        loanReturn: Prisma.$LoanReturnPayload<ExtArgs> | null;
        extensions: Prisma.$LoanExtensionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        status: $Enums.LoanStatus;
        assetId: string;
        userId: string;
        purpose: string | null;
        dueDate: Date | null;
        managerApprovedAt: Date | null;
        managerApprovedById: string | null;
        deptApprovedAt: Date | null;
        deptApprovedById: string | null;
        adminApprovedAt: Date | null;
        adminApprovedById: string | null;
        checkedOutAt: Date | null;
        checkedOutById: string | null;
        checkoutLocationId: string | null;
        checkoutMemo: string | null;
        receivedAt: Date | null;
        receivedById: string | null;
        rejectReason: string | null;
        rejectedAt: Date | null;
        rejectedById: string | null;
        cancelledAt: Date | null;
        overdueNotifyCount: number;
        recallReason: string | null;
        recalledAt: Date | null;
        recalledById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["loan"]>;
    composites: {};
};
export type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LoanPayload, S>;
export type LoanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LoanCountAggregateInputType | true;
};
export interface LoanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Loan'];
        meta: {
            name: 'Loan';
        };
    };
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     *
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LoanFindManyArgs>(args?: Prisma.SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     *
     */
    create<T extends LoanCreateArgs>(args: Prisma.SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LoanCreateManyArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     *
     */
    delete<T extends LoanDeleteArgs>(args: Prisma.SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LoanUpdateArgs>(args: Prisma.SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: Prisma.SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LoanUpdateManyArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: Prisma.SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(args?: Prisma.Subset<T, LoanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LoanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAggregateArgs>(args: Prisma.Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>;
    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends LoanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LoanGroupByArgs['orderBy'];
    } : {
        orderBy?: LoanGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Loan model
     */
    readonly fields: LoanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Loan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LoanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    asset<T extends Prisma.AssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssetDefaultArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    managerApprovedBy<T extends Prisma.Loan$managerApprovedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$managerApprovedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    deptApprovedBy<T extends Prisma.Loan$deptApprovedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$deptApprovedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    adminApprovedBy<T extends Prisma.Loan$adminApprovedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$adminApprovedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    checkedOutBy<T extends Prisma.Loan$checkedOutByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$checkedOutByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    checkoutLocation<T extends Prisma.Loan$checkoutLocationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$checkoutLocationArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    receivedBy<T extends Prisma.Loan$receivedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$receivedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    rejectedBy<T extends Prisma.Loan$rejectedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$rejectedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    recalledBy<T extends Prisma.Loan$recalledByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$recalledByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    loanReturn<T extends Prisma.Loan$loanReturnArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$loanReturnArgs<ExtArgs>>): Prisma.Prisma__LoanReturnClient<runtime.Types.Result.GetResult<Prisma.$LoanReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    extensions<T extends Prisma.Loan$extensionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$extensionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanExtensionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Loan model
 */
export interface LoanFieldRefs {
    readonly id: Prisma.FieldRef<"Loan", 'String'>;
    readonly status: Prisma.FieldRef<"Loan", 'LoanStatus'>;
    readonly assetId: Prisma.FieldRef<"Loan", 'String'>;
    readonly userId: Prisma.FieldRef<"Loan", 'String'>;
    readonly purpose: Prisma.FieldRef<"Loan", 'String'>;
    readonly dueDate: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly managerApprovedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly managerApprovedById: Prisma.FieldRef<"Loan", 'String'>;
    readonly deptApprovedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly deptApprovedById: Prisma.FieldRef<"Loan", 'String'>;
    readonly adminApprovedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly adminApprovedById: Prisma.FieldRef<"Loan", 'String'>;
    readonly checkedOutAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly checkedOutById: Prisma.FieldRef<"Loan", 'String'>;
    readonly checkoutLocationId: Prisma.FieldRef<"Loan", 'String'>;
    readonly checkoutMemo: Prisma.FieldRef<"Loan", 'String'>;
    readonly receivedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly receivedById: Prisma.FieldRef<"Loan", 'String'>;
    readonly rejectReason: Prisma.FieldRef<"Loan", 'String'>;
    readonly rejectedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly rejectedById: Prisma.FieldRef<"Loan", 'String'>;
    readonly cancelledAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly overdueNotifyCount: Prisma.FieldRef<"Loan", 'Int'>;
    readonly recallReason: Prisma.FieldRef<"Loan", 'String'>;
    readonly recalledAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly recalledById: Prisma.FieldRef<"Loan", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
}
/**
 * Loan findUnique
 */
export type LoanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan findUniqueOrThrow
 */
export type LoanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan findFirst
 */
export type LoanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan findFirstOrThrow
 */
export type LoanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan findMany
 */
export type LoanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loans to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan create
 */
export type LoanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The data needed to create a Loan.
     */
    data: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
};
/**
 * Loan createMany
 */
export type LoanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Loan createManyAndReturn
 */
export type LoanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * The data used to create many Loans.
     */
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Loan update
 */
export type LoanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The data needed to update a Loan.
     */
    data: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
    /**
     * Choose, which Loan to update.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan updateMany
 */
export type LoanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    /**
     * Filter which Loans to update
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to update.
     */
    limit?: number;
};
/**
 * Loan updateManyAndReturn
 */
export type LoanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * The data used to update Loans.
     */
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    /**
     * Filter which Loans to update
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Loan upsert
 */
export type LoanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: Prisma.LoanWhereUniqueInput;
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
};
/**
 * Loan delete
 */
export type LoanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter which Loan to delete.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan deleteMany
 */
export type LoanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to delete.
     */
    limit?: number;
};
/**
 * Loan.managerApprovedBy
 */
export type Loan$managerApprovedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.deptApprovedBy
 */
export type Loan$deptApprovedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.adminApprovedBy
 */
export type Loan$adminApprovedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.checkedOutBy
 */
export type Loan$checkedOutByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.checkoutLocation
 */
export type Loan$checkoutLocationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: Prisma.LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LocationInclude<ExtArgs> | null;
    where?: Prisma.LocationWhereInput;
};
/**
 * Loan.receivedBy
 */
export type Loan$receivedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.rejectedBy
 */
export type Loan$rejectedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.recalledBy
 */
export type Loan$recalledByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Loan.loanReturn
 */
export type Loan$loanReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanReturn
     */
    select?: Prisma.LoanReturnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LoanReturn
     */
    omit?: Prisma.LoanReturnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanReturnInclude<ExtArgs> | null;
    where?: Prisma.LoanReturnWhereInput;
};
/**
 * Loan.extensions
 */
export type Loan$extensionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanExtension
     */
    select?: Prisma.LoanExtensionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LoanExtension
     */
    omit?: Prisma.LoanExtensionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanExtensionInclude<ExtArgs> | null;
    where?: Prisma.LoanExtensionWhereInput;
    orderBy?: Prisma.LoanExtensionOrderByWithRelationInput | Prisma.LoanExtensionOrderByWithRelationInput[];
    cursor?: Prisma.LoanExtensionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoanExtensionScalarFieldEnum | Prisma.LoanExtensionScalarFieldEnum[];
};
/**
 * Loan without action
 */
export type LoanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
};
//# sourceMappingURL=Loan.d.ts.map