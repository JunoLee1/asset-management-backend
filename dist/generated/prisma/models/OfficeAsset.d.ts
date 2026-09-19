import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OfficeAsset
 *
 */
export type OfficeAssetModel = runtime.Types.Result.DefaultSelection<Prisma.$OfficeAssetPayload>;
export type AggregateOfficeAsset = {
    _count: OfficeAssetCountAggregateOutputType | null;
    _min: OfficeAssetMinAggregateOutputType | null;
    _max: OfficeAssetMaxAggregateOutputType | null;
};
export type OfficeAssetMinAggregateOutputType = {
    assetId: string | null;
    modelName: string | null;
};
export type OfficeAssetMaxAggregateOutputType = {
    assetId: string | null;
    modelName: string | null;
};
export type OfficeAssetCountAggregateOutputType = {
    assetId: number;
    modelName: number;
    _all: number;
};
export type OfficeAssetMinAggregateInputType = {
    assetId?: true;
    modelName?: true;
};
export type OfficeAssetMaxAggregateInputType = {
    assetId?: true;
    modelName?: true;
};
export type OfficeAssetCountAggregateInputType = {
    assetId?: true;
    modelName?: true;
    _all?: true;
};
export type OfficeAssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OfficeAsset to aggregate.
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OfficeAssets to fetch.
     */
    orderBy?: Prisma.OfficeAssetOrderByWithRelationInput | Prisma.OfficeAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OfficeAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OfficeAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OfficeAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OfficeAssets
    **/
    _count?: true | OfficeAssetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OfficeAssetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OfficeAssetMaxAggregateInputType;
};
export type GetOfficeAssetAggregateType<T extends OfficeAssetAggregateArgs> = {
    [P in keyof T & keyof AggregateOfficeAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOfficeAsset[P]> : Prisma.GetScalarType<T[P], AggregateOfficeAsset[P]>;
};
export type OfficeAssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OfficeAssetWhereInput;
    orderBy?: Prisma.OfficeAssetOrderByWithAggregationInput | Prisma.OfficeAssetOrderByWithAggregationInput[];
    by: Prisma.OfficeAssetScalarFieldEnum[] | Prisma.OfficeAssetScalarFieldEnum;
    having?: Prisma.OfficeAssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OfficeAssetCountAggregateInputType | true;
    _min?: OfficeAssetMinAggregateInputType;
    _max?: OfficeAssetMaxAggregateInputType;
};
export type OfficeAssetGroupByOutputType = {
    assetId: string;
    modelName: string;
    _count: OfficeAssetCountAggregateOutputType | null;
    _min: OfficeAssetMinAggregateOutputType | null;
    _max: OfficeAssetMaxAggregateOutputType | null;
};
export type GetOfficeAssetGroupByPayload<T extends OfficeAssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OfficeAssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OfficeAssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OfficeAssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OfficeAssetGroupByOutputType[P]>;
}>>;
export type OfficeAssetWhereInput = {
    AND?: Prisma.OfficeAssetWhereInput | Prisma.OfficeAssetWhereInput[];
    OR?: Prisma.OfficeAssetWhereInput[];
    NOT?: Prisma.OfficeAssetWhereInput | Prisma.OfficeAssetWhereInput[];
    assetId?: Prisma.StringFilter<"OfficeAsset"> | string;
    modelName?: Prisma.StringFilter<"OfficeAsset"> | string;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
};
export type OfficeAssetOrderByWithRelationInput = {
    assetId?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    asset?: Prisma.AssetOrderByWithRelationInput;
};
export type OfficeAssetWhereUniqueInput = Prisma.AtLeast<{
    assetId?: string;
    AND?: Prisma.OfficeAssetWhereInput | Prisma.OfficeAssetWhereInput[];
    OR?: Prisma.OfficeAssetWhereInput[];
    NOT?: Prisma.OfficeAssetWhereInput | Prisma.OfficeAssetWhereInput[];
    modelName?: Prisma.StringFilter<"OfficeAsset"> | string;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
}, "assetId">;
export type OfficeAssetOrderByWithAggregationInput = {
    assetId?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    _count?: Prisma.OfficeAssetCountOrderByAggregateInput;
    _max?: Prisma.OfficeAssetMaxOrderByAggregateInput;
    _min?: Prisma.OfficeAssetMinOrderByAggregateInput;
};
export type OfficeAssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.OfficeAssetScalarWhereWithAggregatesInput | Prisma.OfficeAssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.OfficeAssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OfficeAssetScalarWhereWithAggregatesInput | Prisma.OfficeAssetScalarWhereWithAggregatesInput[];
    assetId?: Prisma.StringWithAggregatesFilter<"OfficeAsset"> | string;
    modelName?: Prisma.StringWithAggregatesFilter<"OfficeAsset"> | string;
};
export type OfficeAssetCreateInput = {
    modelName: string;
    asset: Prisma.AssetCreateNestedOneWithoutOfficeInput;
};
export type OfficeAssetUncheckedCreateInput = {
    assetId: string;
    modelName: string;
};
export type OfficeAssetUpdateInput = {
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutOfficeNestedInput;
};
export type OfficeAssetUncheckedUpdateInput = {
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OfficeAssetCreateManyInput = {
    assetId: string;
    modelName: string;
};
export type OfficeAssetUpdateManyMutationInput = {
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OfficeAssetUncheckedUpdateManyInput = {
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OfficeAssetNullableScalarRelationFilter = {
    is?: Prisma.OfficeAssetWhereInput | null;
    isNot?: Prisma.OfficeAssetWhereInput | null;
};
export type OfficeAssetCountOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
};
export type OfficeAssetMaxOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
};
export type OfficeAssetMinOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
};
export type OfficeAssetCreateNestedOneWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.OfficeAssetCreateWithoutAssetInput, Prisma.OfficeAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.OfficeAssetCreateOrConnectWithoutAssetInput;
    connect?: Prisma.OfficeAssetWhereUniqueInput;
};
export type OfficeAssetUncheckedCreateNestedOneWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.OfficeAssetCreateWithoutAssetInput, Prisma.OfficeAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.OfficeAssetCreateOrConnectWithoutAssetInput;
    connect?: Prisma.OfficeAssetWhereUniqueInput;
};
export type OfficeAssetUpdateOneWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.OfficeAssetCreateWithoutAssetInput, Prisma.OfficeAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.OfficeAssetCreateOrConnectWithoutAssetInput;
    upsert?: Prisma.OfficeAssetUpsertWithoutAssetInput;
    disconnect?: Prisma.OfficeAssetWhereInput | boolean;
    delete?: Prisma.OfficeAssetWhereInput | boolean;
    connect?: Prisma.OfficeAssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OfficeAssetUpdateToOneWithWhereWithoutAssetInput, Prisma.OfficeAssetUpdateWithoutAssetInput>, Prisma.OfficeAssetUncheckedUpdateWithoutAssetInput>;
};
export type OfficeAssetUncheckedUpdateOneWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.OfficeAssetCreateWithoutAssetInput, Prisma.OfficeAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.OfficeAssetCreateOrConnectWithoutAssetInput;
    upsert?: Prisma.OfficeAssetUpsertWithoutAssetInput;
    disconnect?: Prisma.OfficeAssetWhereInput | boolean;
    delete?: Prisma.OfficeAssetWhereInput | boolean;
    connect?: Prisma.OfficeAssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OfficeAssetUpdateToOneWithWhereWithoutAssetInput, Prisma.OfficeAssetUpdateWithoutAssetInput>, Prisma.OfficeAssetUncheckedUpdateWithoutAssetInput>;
};
export type OfficeAssetCreateWithoutAssetInput = {
    modelName: string;
};
export type OfficeAssetUncheckedCreateWithoutAssetInput = {
    modelName: string;
};
export type OfficeAssetCreateOrConnectWithoutAssetInput = {
    where: Prisma.OfficeAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.OfficeAssetCreateWithoutAssetInput, Prisma.OfficeAssetUncheckedCreateWithoutAssetInput>;
};
export type OfficeAssetUpsertWithoutAssetInput = {
    update: Prisma.XOR<Prisma.OfficeAssetUpdateWithoutAssetInput, Prisma.OfficeAssetUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.OfficeAssetCreateWithoutAssetInput, Prisma.OfficeAssetUncheckedCreateWithoutAssetInput>;
    where?: Prisma.OfficeAssetWhereInput;
};
export type OfficeAssetUpdateToOneWithWhereWithoutAssetInput = {
    where?: Prisma.OfficeAssetWhereInput;
    data: Prisma.XOR<Prisma.OfficeAssetUpdateWithoutAssetInput, Prisma.OfficeAssetUncheckedUpdateWithoutAssetInput>;
};
export type OfficeAssetUpdateWithoutAssetInput = {
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OfficeAssetUncheckedUpdateWithoutAssetInput = {
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type OfficeAssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    modelName?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["officeAsset"]>;
export type OfficeAssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    modelName?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["officeAsset"]>;
export type OfficeAssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    modelName?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["officeAsset"]>;
export type OfficeAssetSelectScalar = {
    assetId?: boolean;
    modelName?: boolean;
};
export type OfficeAssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"assetId" | "modelName", ExtArgs["result"]["officeAsset"]>;
export type OfficeAssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type OfficeAssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type OfficeAssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type $OfficeAssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OfficeAsset";
    objects: {
        asset: Prisma.$AssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        assetId: string;
        modelName: string;
    }, ExtArgs["result"]["officeAsset"]>;
    composites: {};
};
export type OfficeAssetGetPayload<S extends boolean | null | undefined | OfficeAssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload, S>;
export type OfficeAssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OfficeAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OfficeAssetCountAggregateInputType | true;
};
export interface OfficeAssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OfficeAsset'];
        meta: {
            name: 'OfficeAsset';
        };
    };
    /**
     * Find zero or one OfficeAsset that matches the filter.
     * @param {OfficeAssetFindUniqueArgs} args - Arguments to find a OfficeAsset
     * @example
     * // Get one OfficeAsset
     * const officeAsset = await prisma.officeAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfficeAssetFindUniqueArgs>(args: Prisma.SelectSubset<T, OfficeAssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OfficeAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfficeAssetFindUniqueOrThrowArgs} args - Arguments to find a OfficeAsset
     * @example
     * // Get one OfficeAsset
     * const officeAsset = await prisma.officeAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfficeAssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OfficeAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OfficeAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetFindFirstArgs} args - Arguments to find a OfficeAsset
     * @example
     * // Get one OfficeAsset
     * const officeAsset = await prisma.officeAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfficeAssetFindFirstArgs>(args?: Prisma.SelectSubset<T, OfficeAssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OfficeAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetFindFirstOrThrowArgs} args - Arguments to find a OfficeAsset
     * @example
     * // Get one OfficeAsset
     * const officeAsset = await prisma.officeAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfficeAssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OfficeAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OfficeAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfficeAssets
     * const officeAssets = await prisma.officeAsset.findMany()
     *
     * // Get first 10 OfficeAssets
     * const officeAssets = await prisma.officeAsset.findMany({ take: 10 })
     *
     * // Only select the `assetId`
     * const officeAssetWithAssetIdOnly = await prisma.officeAsset.findMany({ select: { assetId: true } })
     *
     */
    findMany<T extends OfficeAssetFindManyArgs>(args?: Prisma.SelectSubset<T, OfficeAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OfficeAsset.
     * @param {OfficeAssetCreateArgs} args - Arguments to create a OfficeAsset.
     * @example
     * // Create one OfficeAsset
     * const OfficeAsset = await prisma.officeAsset.create({
     *   data: {
     *     // ... data to create a OfficeAsset
     *   }
     * })
     *
     */
    create<T extends OfficeAssetCreateArgs>(args: Prisma.SelectSubset<T, OfficeAssetCreateArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OfficeAssets.
     * @param {OfficeAssetCreateManyArgs} args - Arguments to create many OfficeAssets.
     * @example
     * // Create many OfficeAssets
     * const officeAsset = await prisma.officeAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OfficeAssetCreateManyArgs>(args?: Prisma.SelectSubset<T, OfficeAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OfficeAssets and returns the data saved in the database.
     * @param {OfficeAssetCreateManyAndReturnArgs} args - Arguments to create many OfficeAssets.
     * @example
     * // Create many OfficeAssets
     * const officeAsset = await prisma.officeAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OfficeAssets and only return the `assetId`
     * const officeAssetWithAssetIdOnly = await prisma.officeAsset.createManyAndReturn({
     *   select: { assetId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OfficeAssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OfficeAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OfficeAsset.
     * @param {OfficeAssetDeleteArgs} args - Arguments to delete one OfficeAsset.
     * @example
     * // Delete one OfficeAsset
     * const OfficeAsset = await prisma.officeAsset.delete({
     *   where: {
     *     // ... filter to delete one OfficeAsset
     *   }
     * })
     *
     */
    delete<T extends OfficeAssetDeleteArgs>(args: Prisma.SelectSubset<T, OfficeAssetDeleteArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OfficeAsset.
     * @param {OfficeAssetUpdateArgs} args - Arguments to update one OfficeAsset.
     * @example
     * // Update one OfficeAsset
     * const officeAsset = await prisma.officeAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OfficeAssetUpdateArgs>(args: Prisma.SelectSubset<T, OfficeAssetUpdateArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OfficeAssets.
     * @param {OfficeAssetDeleteManyArgs} args - Arguments to filter OfficeAssets to delete.
     * @example
     * // Delete a few OfficeAssets
     * const { count } = await prisma.officeAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OfficeAssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, OfficeAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OfficeAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfficeAssets
     * const officeAsset = await prisma.officeAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OfficeAssetUpdateManyArgs>(args: Prisma.SelectSubset<T, OfficeAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OfficeAssets and returns the data updated in the database.
     * @param {OfficeAssetUpdateManyAndReturnArgs} args - Arguments to update many OfficeAssets.
     * @example
     * // Update many OfficeAssets
     * const officeAsset = await prisma.officeAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OfficeAssets and only return the `assetId`
     * const officeAssetWithAssetIdOnly = await prisma.officeAsset.updateManyAndReturn({
     *   select: { assetId: true },
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
    updateManyAndReturn<T extends OfficeAssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OfficeAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OfficeAsset.
     * @param {OfficeAssetUpsertArgs} args - Arguments to update or create a OfficeAsset.
     * @example
     * // Update or create a OfficeAsset
     * const officeAsset = await prisma.officeAsset.upsert({
     *   create: {
     *     // ... data to create a OfficeAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfficeAsset we want to update
     *   }
     * })
     */
    upsert<T extends OfficeAssetUpsertArgs>(args: Prisma.SelectSubset<T, OfficeAssetUpsertArgs<ExtArgs>>): Prisma.Prisma__OfficeAssetClient<runtime.Types.Result.GetResult<Prisma.$OfficeAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OfficeAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetCountArgs} args - Arguments to filter OfficeAssets to count.
     * @example
     * // Count the number of OfficeAssets
     * const count = await prisma.officeAsset.count({
     *   where: {
     *     // ... the filter for the OfficeAssets we want to count
     *   }
     * })
    **/
    count<T extends OfficeAssetCountArgs>(args?: Prisma.Subset<T, OfficeAssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OfficeAssetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OfficeAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OfficeAssetAggregateArgs>(args: Prisma.Subset<T, OfficeAssetAggregateArgs>): Prisma.PrismaPromise<GetOfficeAssetAggregateType<T>>;
    /**
     * Group by OfficeAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficeAssetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OfficeAssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OfficeAssetGroupByArgs['orderBy'];
    } : {
        orderBy?: OfficeAssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OfficeAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficeAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OfficeAsset model
     */
    readonly fields: OfficeAssetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OfficeAsset.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OfficeAssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    asset<T extends Prisma.AssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssetDefaultArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OfficeAsset model
 */
export interface OfficeAssetFieldRefs {
    readonly assetId: Prisma.FieldRef<"OfficeAsset", 'String'>;
    readonly modelName: Prisma.FieldRef<"OfficeAsset", 'String'>;
}
/**
 * OfficeAsset findUnique
 */
export type OfficeAssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * Filter, which OfficeAsset to fetch.
     */
    where: Prisma.OfficeAssetWhereUniqueInput;
};
/**
 * OfficeAsset findUniqueOrThrow
 */
export type OfficeAssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * Filter, which OfficeAsset to fetch.
     */
    where: Prisma.OfficeAssetWhereUniqueInput;
};
/**
 * OfficeAsset findFirst
 */
export type OfficeAssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * Filter, which OfficeAsset to fetch.
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OfficeAssets to fetch.
     */
    orderBy?: Prisma.OfficeAssetOrderByWithRelationInput | Prisma.OfficeAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OfficeAssets.
     */
    cursor?: Prisma.OfficeAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OfficeAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OfficeAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OfficeAssets.
     */
    distinct?: Prisma.OfficeAssetScalarFieldEnum | Prisma.OfficeAssetScalarFieldEnum[];
};
/**
 * OfficeAsset findFirstOrThrow
 */
export type OfficeAssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * Filter, which OfficeAsset to fetch.
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OfficeAssets to fetch.
     */
    orderBy?: Prisma.OfficeAssetOrderByWithRelationInput | Prisma.OfficeAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OfficeAssets.
     */
    cursor?: Prisma.OfficeAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OfficeAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OfficeAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OfficeAssets.
     */
    distinct?: Prisma.OfficeAssetScalarFieldEnum | Prisma.OfficeAssetScalarFieldEnum[];
};
/**
 * OfficeAsset findMany
 */
export type OfficeAssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * Filter, which OfficeAssets to fetch.
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OfficeAssets to fetch.
     */
    orderBy?: Prisma.OfficeAssetOrderByWithRelationInput | Prisma.OfficeAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OfficeAssets.
     */
    cursor?: Prisma.OfficeAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OfficeAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OfficeAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OfficeAssets.
     */
    distinct?: Prisma.OfficeAssetScalarFieldEnum | Prisma.OfficeAssetScalarFieldEnum[];
};
/**
 * OfficeAsset create
 */
export type OfficeAssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * The data needed to create a OfficeAsset.
     */
    data: Prisma.XOR<Prisma.OfficeAssetCreateInput, Prisma.OfficeAssetUncheckedCreateInput>;
};
/**
 * OfficeAsset createMany
 */
export type OfficeAssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfficeAssets.
     */
    data: Prisma.OfficeAssetCreateManyInput | Prisma.OfficeAssetCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OfficeAsset createManyAndReturn
 */
export type OfficeAssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * The data used to create many OfficeAssets.
     */
    data: Prisma.OfficeAssetCreateManyInput | Prisma.OfficeAssetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OfficeAsset update
 */
export type OfficeAssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * The data needed to update a OfficeAsset.
     */
    data: Prisma.XOR<Prisma.OfficeAssetUpdateInput, Prisma.OfficeAssetUncheckedUpdateInput>;
    /**
     * Choose, which OfficeAsset to update.
     */
    where: Prisma.OfficeAssetWhereUniqueInput;
};
/**
 * OfficeAsset updateMany
 */
export type OfficeAssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OfficeAssets.
     */
    data: Prisma.XOR<Prisma.OfficeAssetUpdateManyMutationInput, Prisma.OfficeAssetUncheckedUpdateManyInput>;
    /**
     * Filter which OfficeAssets to update
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * Limit how many OfficeAssets to update.
     */
    limit?: number;
};
/**
 * OfficeAsset updateManyAndReturn
 */
export type OfficeAssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * The data used to update OfficeAssets.
     */
    data: Prisma.XOR<Prisma.OfficeAssetUpdateManyMutationInput, Prisma.OfficeAssetUncheckedUpdateManyInput>;
    /**
     * Filter which OfficeAssets to update
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * Limit how many OfficeAssets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OfficeAsset upsert
 */
export type OfficeAssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * The filter to search for the OfficeAsset to update in case it exists.
     */
    where: Prisma.OfficeAssetWhereUniqueInput;
    /**
     * In case the OfficeAsset found by the `where` argument doesn't exist, create a new OfficeAsset with this data.
     */
    create: Prisma.XOR<Prisma.OfficeAssetCreateInput, Prisma.OfficeAssetUncheckedCreateInput>;
    /**
     * In case the OfficeAsset was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OfficeAssetUpdateInput, Prisma.OfficeAssetUncheckedUpdateInput>;
};
/**
 * OfficeAsset delete
 */
export type OfficeAssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
    /**
     * Filter which OfficeAsset to delete.
     */
    where: Prisma.OfficeAssetWhereUniqueInput;
};
/**
 * OfficeAsset deleteMany
 */
export type OfficeAssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OfficeAssets to delete
     */
    where?: Prisma.OfficeAssetWhereInput;
    /**
     * Limit how many OfficeAssets to delete.
     */
    limit?: number;
};
/**
 * OfficeAsset without action
 */
export type OfficeAssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficeAsset
     */
    select?: Prisma.OfficeAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OfficeAsset
     */
    omit?: Prisma.OfficeAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OfficeAssetInclude<ExtArgs> | null;
};
//# sourceMappingURL=OfficeAsset.d.ts.map