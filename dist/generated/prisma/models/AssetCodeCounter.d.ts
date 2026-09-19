import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model AssetCodeCounter
 *
 */
export type AssetCodeCounterModel = runtime.Types.Result.DefaultSelection<Prisma.$AssetCodeCounterPayload>;
export type AggregateAssetCodeCounter = {
    _count: AssetCodeCounterCountAggregateOutputType | null;
    _avg: AssetCodeCounterAvgAggregateOutputType | null;
    _sum: AssetCodeCounterSumAggregateOutputType | null;
    _min: AssetCodeCounterMinAggregateOutputType | null;
    _max: AssetCodeCounterMaxAggregateOutputType | null;
};
export type AssetCodeCounterAvgAggregateOutputType = {
    nextNumber: number | null;
};
export type AssetCodeCounterSumAggregateOutputType = {
    nextNumber: number | null;
};
export type AssetCodeCounterMinAggregateOutputType = {
    class: $Enums.AssetClass | null;
    nextNumber: number | null;
    updatedAt: Date | null;
};
export type AssetCodeCounterMaxAggregateOutputType = {
    class: $Enums.AssetClass | null;
    nextNumber: number | null;
    updatedAt: Date | null;
};
export type AssetCodeCounterCountAggregateOutputType = {
    class: number;
    nextNumber: number;
    updatedAt: number;
    _all: number;
};
export type AssetCodeCounterAvgAggregateInputType = {
    nextNumber?: true;
};
export type AssetCodeCounterSumAggregateInputType = {
    nextNumber?: true;
};
export type AssetCodeCounterMinAggregateInputType = {
    class?: true;
    nextNumber?: true;
    updatedAt?: true;
};
export type AssetCodeCounterMaxAggregateInputType = {
    class?: true;
    nextNumber?: true;
    updatedAt?: true;
};
export type AssetCodeCounterCountAggregateInputType = {
    class?: true;
    nextNumber?: true;
    updatedAt?: true;
    _all?: true;
};
export type AssetCodeCounterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AssetCodeCounter to aggregate.
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssetCodeCounters to fetch.
     */
    orderBy?: Prisma.AssetCodeCounterOrderByWithRelationInput | Prisma.AssetCodeCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AssetCodeCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssetCodeCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssetCodeCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AssetCodeCounters
    **/
    _count?: true | AssetCodeCounterCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AssetCodeCounterAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AssetCodeCounterSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AssetCodeCounterMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AssetCodeCounterMaxAggregateInputType;
};
export type GetAssetCodeCounterAggregateType<T extends AssetCodeCounterAggregateArgs> = {
    [P in keyof T & keyof AggregateAssetCodeCounter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssetCodeCounter[P]> : Prisma.GetScalarType<T[P], AggregateAssetCodeCounter[P]>;
};
export type AssetCodeCounterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetCodeCounterWhereInput;
    orderBy?: Prisma.AssetCodeCounterOrderByWithAggregationInput | Prisma.AssetCodeCounterOrderByWithAggregationInput[];
    by: Prisma.AssetCodeCounterScalarFieldEnum[] | Prisma.AssetCodeCounterScalarFieldEnum;
    having?: Prisma.AssetCodeCounterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssetCodeCounterCountAggregateInputType | true;
    _avg?: AssetCodeCounterAvgAggregateInputType;
    _sum?: AssetCodeCounterSumAggregateInputType;
    _min?: AssetCodeCounterMinAggregateInputType;
    _max?: AssetCodeCounterMaxAggregateInputType;
};
export type AssetCodeCounterGroupByOutputType = {
    class: $Enums.AssetClass;
    nextNumber: number;
    updatedAt: Date;
    _count: AssetCodeCounterCountAggregateOutputType | null;
    _avg: AssetCodeCounterAvgAggregateOutputType | null;
    _sum: AssetCodeCounterSumAggregateOutputType | null;
    _min: AssetCodeCounterMinAggregateOutputType | null;
    _max: AssetCodeCounterMaxAggregateOutputType | null;
};
export type GetAssetCodeCounterGroupByPayload<T extends AssetCodeCounterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssetCodeCounterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssetCodeCounterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssetCodeCounterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssetCodeCounterGroupByOutputType[P]>;
}>>;
export type AssetCodeCounterWhereInput = {
    AND?: Prisma.AssetCodeCounterWhereInput | Prisma.AssetCodeCounterWhereInput[];
    OR?: Prisma.AssetCodeCounterWhereInput[];
    NOT?: Prisma.AssetCodeCounterWhereInput | Prisma.AssetCodeCounterWhereInput[];
    class?: Prisma.EnumAssetClassFilter<"AssetCodeCounter"> | $Enums.AssetClass;
    nextNumber?: Prisma.IntFilter<"AssetCodeCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"AssetCodeCounter"> | Date | string;
};
export type AssetCodeCounterOrderByWithRelationInput = {
    class?: Prisma.SortOrder;
    nextNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetCodeCounterWhereUniqueInput = Prisma.AtLeast<{
    class?: $Enums.AssetClass;
    AND?: Prisma.AssetCodeCounterWhereInput | Prisma.AssetCodeCounterWhereInput[];
    OR?: Prisma.AssetCodeCounterWhereInput[];
    NOT?: Prisma.AssetCodeCounterWhereInput | Prisma.AssetCodeCounterWhereInput[];
    nextNumber?: Prisma.IntFilter<"AssetCodeCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"AssetCodeCounter"> | Date | string;
}, "class">;
export type AssetCodeCounterOrderByWithAggregationInput = {
    class?: Prisma.SortOrder;
    nextNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AssetCodeCounterCountOrderByAggregateInput;
    _avg?: Prisma.AssetCodeCounterAvgOrderByAggregateInput;
    _max?: Prisma.AssetCodeCounterMaxOrderByAggregateInput;
    _min?: Prisma.AssetCodeCounterMinOrderByAggregateInput;
    _sum?: Prisma.AssetCodeCounterSumOrderByAggregateInput;
};
export type AssetCodeCounterScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssetCodeCounterScalarWhereWithAggregatesInput | Prisma.AssetCodeCounterScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssetCodeCounterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssetCodeCounterScalarWhereWithAggregatesInput | Prisma.AssetCodeCounterScalarWhereWithAggregatesInput[];
    class?: Prisma.EnumAssetClassWithAggregatesFilter<"AssetCodeCounter"> | $Enums.AssetClass;
    nextNumber?: Prisma.IntWithAggregatesFilter<"AssetCodeCounter"> | number;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AssetCodeCounter"> | Date | string;
};
export type AssetCodeCounterCreateInput = {
    class: $Enums.AssetClass;
    nextNumber?: number;
    updatedAt?: Date | string;
};
export type AssetCodeCounterUncheckedCreateInput = {
    class: $Enums.AssetClass;
    nextNumber?: number;
    updatedAt?: Date | string;
};
export type AssetCodeCounterUpdateInput = {
    class?: Prisma.EnumAssetClassFieldUpdateOperationsInput | $Enums.AssetClass;
    nextNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCodeCounterUncheckedUpdateInput = {
    class?: Prisma.EnumAssetClassFieldUpdateOperationsInput | $Enums.AssetClass;
    nextNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCodeCounterCreateManyInput = {
    class: $Enums.AssetClass;
    nextNumber?: number;
    updatedAt?: Date | string;
};
export type AssetCodeCounterUpdateManyMutationInput = {
    class?: Prisma.EnumAssetClassFieldUpdateOperationsInput | $Enums.AssetClass;
    nextNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCodeCounterUncheckedUpdateManyInput = {
    class?: Prisma.EnumAssetClassFieldUpdateOperationsInput | $Enums.AssetClass;
    nextNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCodeCounterCountOrderByAggregateInput = {
    class?: Prisma.SortOrder;
    nextNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetCodeCounterAvgOrderByAggregateInput = {
    nextNumber?: Prisma.SortOrder;
};
export type AssetCodeCounterMaxOrderByAggregateInput = {
    class?: Prisma.SortOrder;
    nextNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetCodeCounterMinOrderByAggregateInput = {
    class?: Prisma.SortOrder;
    nextNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetCodeCounterSumOrderByAggregateInput = {
    nextNumber?: Prisma.SortOrder;
};
export type AssetCodeCounterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    class?: boolean;
    nextNumber?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["assetCodeCounter"]>;
export type AssetCodeCounterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    class?: boolean;
    nextNumber?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["assetCodeCounter"]>;
export type AssetCodeCounterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    class?: boolean;
    nextNumber?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["assetCodeCounter"]>;
export type AssetCodeCounterSelectScalar = {
    class?: boolean;
    nextNumber?: boolean;
    updatedAt?: boolean;
};
export type AssetCodeCounterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"class" | "nextNumber" | "updatedAt", ExtArgs["result"]["assetCodeCounter"]>;
export type $AssetCodeCounterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AssetCodeCounter";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        class: $Enums.AssetClass;
        nextNumber: number;
        updatedAt: Date;
    }, ExtArgs["result"]["assetCodeCounter"]>;
    composites: {};
};
export type AssetCodeCounterGetPayload<S extends boolean | null | undefined | AssetCodeCounterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload, S>;
export type AssetCodeCounterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssetCodeCounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssetCodeCounterCountAggregateInputType | true;
};
export interface AssetCodeCounterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AssetCodeCounter'];
        meta: {
            name: 'AssetCodeCounter';
        };
    };
    /**
     * Find zero or one AssetCodeCounter that matches the filter.
     * @param {AssetCodeCounterFindUniqueArgs} args - Arguments to find a AssetCodeCounter
     * @example
     * // Get one AssetCodeCounter
     * const assetCodeCounter = await prisma.assetCodeCounter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetCodeCounterFindUniqueArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AssetCodeCounter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetCodeCounterFindUniqueOrThrowArgs} args - Arguments to find a AssetCodeCounter
     * @example
     * // Get one AssetCodeCounter
     * const assetCodeCounter = await prisma.assetCodeCounter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetCodeCounterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AssetCodeCounter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterFindFirstArgs} args - Arguments to find a AssetCodeCounter
     * @example
     * // Get one AssetCodeCounter
     * const assetCodeCounter = await prisma.assetCodeCounter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetCodeCounterFindFirstArgs>(args?: Prisma.SelectSubset<T, AssetCodeCounterFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AssetCodeCounter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterFindFirstOrThrowArgs} args - Arguments to find a AssetCodeCounter
     * @example
     * // Get one AssetCodeCounter
     * const assetCodeCounter = await prisma.assetCodeCounter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetCodeCounterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssetCodeCounterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AssetCodeCounters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssetCodeCounters
     * const assetCodeCounters = await prisma.assetCodeCounter.findMany()
     *
     * // Get first 10 AssetCodeCounters
     * const assetCodeCounters = await prisma.assetCodeCounter.findMany({ take: 10 })
     *
     * // Only select the `nextNumber`
     * const assetCodeCounterWithNextNumberOnly = await prisma.assetCodeCounter.findMany({ select: { nextNumber: true } })
     *
     */
    findMany<T extends AssetCodeCounterFindManyArgs>(args?: Prisma.SelectSubset<T, AssetCodeCounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AssetCodeCounter.
     * @param {AssetCodeCounterCreateArgs} args - Arguments to create a AssetCodeCounter.
     * @example
     * // Create one AssetCodeCounter
     * const AssetCodeCounter = await prisma.assetCodeCounter.create({
     *   data: {
     *     // ... data to create a AssetCodeCounter
     *   }
     * })
     *
     */
    create<T extends AssetCodeCounterCreateArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterCreateArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AssetCodeCounters.
     * @param {AssetCodeCounterCreateManyArgs} args - Arguments to create many AssetCodeCounters.
     * @example
     * // Create many AssetCodeCounters
     * const assetCodeCounter = await prisma.assetCodeCounter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AssetCodeCounterCreateManyArgs>(args?: Prisma.SelectSubset<T, AssetCodeCounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AssetCodeCounters and returns the data saved in the database.
     * @param {AssetCodeCounterCreateManyAndReturnArgs} args - Arguments to create many AssetCodeCounters.
     * @example
     * // Create many AssetCodeCounters
     * const assetCodeCounter = await prisma.assetCodeCounter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AssetCodeCounters and only return the `nextNumber`
     * const assetCodeCounterWithNextNumberOnly = await prisma.assetCodeCounter.createManyAndReturn({
     *   select: { nextNumber: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AssetCodeCounterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AssetCodeCounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AssetCodeCounter.
     * @param {AssetCodeCounterDeleteArgs} args - Arguments to delete one AssetCodeCounter.
     * @example
     * // Delete one AssetCodeCounter
     * const AssetCodeCounter = await prisma.assetCodeCounter.delete({
     *   where: {
     *     // ... filter to delete one AssetCodeCounter
     *   }
     * })
     *
     */
    delete<T extends AssetCodeCounterDeleteArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterDeleteArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AssetCodeCounter.
     * @param {AssetCodeCounterUpdateArgs} args - Arguments to update one AssetCodeCounter.
     * @example
     * // Update one AssetCodeCounter
     * const assetCodeCounter = await prisma.assetCodeCounter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AssetCodeCounterUpdateArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterUpdateArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AssetCodeCounters.
     * @param {AssetCodeCounterDeleteManyArgs} args - Arguments to filter AssetCodeCounters to delete.
     * @example
     * // Delete a few AssetCodeCounters
     * const { count } = await prisma.assetCodeCounter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AssetCodeCounterDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssetCodeCounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AssetCodeCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssetCodeCounters
     * const assetCodeCounter = await prisma.assetCodeCounter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AssetCodeCounterUpdateManyArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AssetCodeCounters and returns the data updated in the database.
     * @param {AssetCodeCounterUpdateManyAndReturnArgs} args - Arguments to update many AssetCodeCounters.
     * @example
     * // Update many AssetCodeCounters
     * const assetCodeCounter = await prisma.assetCodeCounter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AssetCodeCounters and only return the `nextNumber`
     * const assetCodeCounterWithNextNumberOnly = await prisma.assetCodeCounter.updateManyAndReturn({
     *   select: { nextNumber: true },
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
    updateManyAndReturn<T extends AssetCodeCounterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AssetCodeCounter.
     * @param {AssetCodeCounterUpsertArgs} args - Arguments to update or create a AssetCodeCounter.
     * @example
     * // Update or create a AssetCodeCounter
     * const assetCodeCounter = await prisma.assetCodeCounter.upsert({
     *   create: {
     *     // ... data to create a AssetCodeCounter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssetCodeCounter we want to update
     *   }
     * })
     */
    upsert<T extends AssetCodeCounterUpsertArgs>(args: Prisma.SelectSubset<T, AssetCodeCounterUpsertArgs<ExtArgs>>): Prisma.Prisma__AssetCodeCounterClient<runtime.Types.Result.GetResult<Prisma.$AssetCodeCounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AssetCodeCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterCountArgs} args - Arguments to filter AssetCodeCounters to count.
     * @example
     * // Count the number of AssetCodeCounters
     * const count = await prisma.assetCodeCounter.count({
     *   where: {
     *     // ... the filter for the AssetCodeCounters we want to count
     *   }
     * })
    **/
    count<T extends AssetCodeCounterCountArgs>(args?: Prisma.Subset<T, AssetCodeCounterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssetCodeCounterCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AssetCodeCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssetCodeCounterAggregateArgs>(args: Prisma.Subset<T, AssetCodeCounterAggregateArgs>): Prisma.PrismaPromise<GetAssetCodeCounterAggregateType<T>>;
    /**
     * Group by AssetCodeCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCodeCounterGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AssetCodeCounterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssetCodeCounterGroupByArgs['orderBy'];
    } : {
        orderBy?: AssetCodeCounterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssetCodeCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetCodeCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AssetCodeCounter model
     */
    readonly fields: AssetCodeCounterFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AssetCodeCounter.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AssetCodeCounterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the AssetCodeCounter model
 */
export interface AssetCodeCounterFieldRefs {
    readonly class: Prisma.FieldRef<"AssetCodeCounter", 'AssetClass'>;
    readonly nextNumber: Prisma.FieldRef<"AssetCodeCounter", 'Int'>;
    readonly updatedAt: Prisma.FieldRef<"AssetCodeCounter", 'DateTime'>;
}
/**
 * AssetCodeCounter findUnique
 */
export type AssetCodeCounterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * Filter, which AssetCodeCounter to fetch.
     */
    where: Prisma.AssetCodeCounterWhereUniqueInput;
};
/**
 * AssetCodeCounter findUniqueOrThrow
 */
export type AssetCodeCounterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * Filter, which AssetCodeCounter to fetch.
     */
    where: Prisma.AssetCodeCounterWhereUniqueInput;
};
/**
 * AssetCodeCounter findFirst
 */
export type AssetCodeCounterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * Filter, which AssetCodeCounter to fetch.
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssetCodeCounters to fetch.
     */
    orderBy?: Prisma.AssetCodeCounterOrderByWithRelationInput | Prisma.AssetCodeCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AssetCodeCounters.
     */
    cursor?: Prisma.AssetCodeCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssetCodeCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssetCodeCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AssetCodeCounters.
     */
    distinct?: Prisma.AssetCodeCounterScalarFieldEnum | Prisma.AssetCodeCounterScalarFieldEnum[];
};
/**
 * AssetCodeCounter findFirstOrThrow
 */
export type AssetCodeCounterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * Filter, which AssetCodeCounter to fetch.
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssetCodeCounters to fetch.
     */
    orderBy?: Prisma.AssetCodeCounterOrderByWithRelationInput | Prisma.AssetCodeCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AssetCodeCounters.
     */
    cursor?: Prisma.AssetCodeCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssetCodeCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssetCodeCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AssetCodeCounters.
     */
    distinct?: Prisma.AssetCodeCounterScalarFieldEnum | Prisma.AssetCodeCounterScalarFieldEnum[];
};
/**
 * AssetCodeCounter findMany
 */
export type AssetCodeCounterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * Filter, which AssetCodeCounters to fetch.
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssetCodeCounters to fetch.
     */
    orderBy?: Prisma.AssetCodeCounterOrderByWithRelationInput | Prisma.AssetCodeCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AssetCodeCounters.
     */
    cursor?: Prisma.AssetCodeCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssetCodeCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssetCodeCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AssetCodeCounters.
     */
    distinct?: Prisma.AssetCodeCounterScalarFieldEnum | Prisma.AssetCodeCounterScalarFieldEnum[];
};
/**
 * AssetCodeCounter create
 */
export type AssetCodeCounterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * The data needed to create a AssetCodeCounter.
     */
    data: Prisma.XOR<Prisma.AssetCodeCounterCreateInput, Prisma.AssetCodeCounterUncheckedCreateInput>;
};
/**
 * AssetCodeCounter createMany
 */
export type AssetCodeCounterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssetCodeCounters.
     */
    data: Prisma.AssetCodeCounterCreateManyInput | Prisma.AssetCodeCounterCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AssetCodeCounter createManyAndReturn
 */
export type AssetCodeCounterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * The data used to create many AssetCodeCounters.
     */
    data: Prisma.AssetCodeCounterCreateManyInput | Prisma.AssetCodeCounterCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AssetCodeCounter update
 */
export type AssetCodeCounterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * The data needed to update a AssetCodeCounter.
     */
    data: Prisma.XOR<Prisma.AssetCodeCounterUpdateInput, Prisma.AssetCodeCounterUncheckedUpdateInput>;
    /**
     * Choose, which AssetCodeCounter to update.
     */
    where: Prisma.AssetCodeCounterWhereUniqueInput;
};
/**
 * AssetCodeCounter updateMany
 */
export type AssetCodeCounterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AssetCodeCounters.
     */
    data: Prisma.XOR<Prisma.AssetCodeCounterUpdateManyMutationInput, Prisma.AssetCodeCounterUncheckedUpdateManyInput>;
    /**
     * Filter which AssetCodeCounters to update
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * Limit how many AssetCodeCounters to update.
     */
    limit?: number;
};
/**
 * AssetCodeCounter updateManyAndReturn
 */
export type AssetCodeCounterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * The data used to update AssetCodeCounters.
     */
    data: Prisma.XOR<Prisma.AssetCodeCounterUpdateManyMutationInput, Prisma.AssetCodeCounterUncheckedUpdateManyInput>;
    /**
     * Filter which AssetCodeCounters to update
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * Limit how many AssetCodeCounters to update.
     */
    limit?: number;
};
/**
 * AssetCodeCounter upsert
 */
export type AssetCodeCounterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * The filter to search for the AssetCodeCounter to update in case it exists.
     */
    where: Prisma.AssetCodeCounterWhereUniqueInput;
    /**
     * In case the AssetCodeCounter found by the `where` argument doesn't exist, create a new AssetCodeCounter with this data.
     */
    create: Prisma.XOR<Prisma.AssetCodeCounterCreateInput, Prisma.AssetCodeCounterUncheckedCreateInput>;
    /**
     * In case the AssetCodeCounter was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AssetCodeCounterUpdateInput, Prisma.AssetCodeCounterUncheckedUpdateInput>;
};
/**
 * AssetCodeCounter delete
 */
export type AssetCodeCounterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
    /**
     * Filter which AssetCodeCounter to delete.
     */
    where: Prisma.AssetCodeCounterWhereUniqueInput;
};
/**
 * AssetCodeCounter deleteMany
 */
export type AssetCodeCounterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AssetCodeCounters to delete
     */
    where?: Prisma.AssetCodeCounterWhereInput;
    /**
     * Limit how many AssetCodeCounters to delete.
     */
    limit?: number;
};
/**
 * AssetCodeCounter without action
 */
export type AssetCodeCounterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCodeCounter
     */
    select?: Prisma.AssetCodeCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssetCodeCounter
     */
    omit?: Prisma.AssetCodeCounterOmit<ExtArgs> | null;
};
//# sourceMappingURL=AssetCodeCounter.d.ts.map