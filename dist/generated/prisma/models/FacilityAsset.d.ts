import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model FacilityAsset
 *
 */
export type FacilityAssetModel = runtime.Types.Result.DefaultSelection<Prisma.$FacilityAssetPayload>;
export type AggregateFacilityAsset = {
    _count: FacilityAssetCountAggregateOutputType | null;
    _avg: FacilityAssetAvgAggregateOutputType | null;
    _sum: FacilityAssetSumAggregateOutputType | null;
    _min: FacilityAssetMinAggregateOutputType | null;
    _max: FacilityAssetMaxAggregateOutputType | null;
};
export type FacilityAssetAvgAggregateOutputType = {
    inspectionCycleMonths: number | null;
};
export type FacilityAssetSumAggregateOutputType = {
    inspectionCycleMonths: number | null;
};
export type FacilityAssetMinAggregateOutputType = {
    assetId: string | null;
    installLocationDetail: string | null;
    installDate: Date | null;
    inspectionCycleMonths: number | null;
    nextInspectionDate: Date | null;
};
export type FacilityAssetMaxAggregateOutputType = {
    assetId: string | null;
    installLocationDetail: string | null;
    installDate: Date | null;
    inspectionCycleMonths: number | null;
    nextInspectionDate: Date | null;
};
export type FacilityAssetCountAggregateOutputType = {
    assetId: number;
    installLocationDetail: number;
    installDate: number;
    inspectionCycleMonths: number;
    nextInspectionDate: number;
    _all: number;
};
export type FacilityAssetAvgAggregateInputType = {
    inspectionCycleMonths?: true;
};
export type FacilityAssetSumAggregateInputType = {
    inspectionCycleMonths?: true;
};
export type FacilityAssetMinAggregateInputType = {
    assetId?: true;
    installLocationDetail?: true;
    installDate?: true;
    inspectionCycleMonths?: true;
    nextInspectionDate?: true;
};
export type FacilityAssetMaxAggregateInputType = {
    assetId?: true;
    installLocationDetail?: true;
    installDate?: true;
    inspectionCycleMonths?: true;
    nextInspectionDate?: true;
};
export type FacilityAssetCountAggregateInputType = {
    assetId?: true;
    installLocationDetail?: true;
    installDate?: true;
    inspectionCycleMonths?: true;
    nextInspectionDate?: true;
    _all?: true;
};
export type FacilityAssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FacilityAsset to aggregate.
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacilityAssets to fetch.
     */
    orderBy?: Prisma.FacilityAssetOrderByWithRelationInput | Prisma.FacilityAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FacilityAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacilityAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacilityAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FacilityAssets
    **/
    _count?: true | FacilityAssetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FacilityAssetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FacilityAssetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FacilityAssetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FacilityAssetMaxAggregateInputType;
};
export type GetFacilityAssetAggregateType<T extends FacilityAssetAggregateArgs> = {
    [P in keyof T & keyof AggregateFacilityAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFacilityAsset[P]> : Prisma.GetScalarType<T[P], AggregateFacilityAsset[P]>;
};
export type FacilityAssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FacilityAssetWhereInput;
    orderBy?: Prisma.FacilityAssetOrderByWithAggregationInput | Prisma.FacilityAssetOrderByWithAggregationInput[];
    by: Prisma.FacilityAssetScalarFieldEnum[] | Prisma.FacilityAssetScalarFieldEnum;
    having?: Prisma.FacilityAssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FacilityAssetCountAggregateInputType | true;
    _avg?: FacilityAssetAvgAggregateInputType;
    _sum?: FacilityAssetSumAggregateInputType;
    _min?: FacilityAssetMinAggregateInputType;
    _max?: FacilityAssetMaxAggregateInputType;
};
export type FacilityAssetGroupByOutputType = {
    assetId: string;
    installLocationDetail: string;
    installDate: Date;
    inspectionCycleMonths: number;
    nextInspectionDate: Date;
    _count: FacilityAssetCountAggregateOutputType | null;
    _avg: FacilityAssetAvgAggregateOutputType | null;
    _sum: FacilityAssetSumAggregateOutputType | null;
    _min: FacilityAssetMinAggregateOutputType | null;
    _max: FacilityAssetMaxAggregateOutputType | null;
};
export type GetFacilityAssetGroupByPayload<T extends FacilityAssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FacilityAssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FacilityAssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FacilityAssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FacilityAssetGroupByOutputType[P]>;
}>>;
export type FacilityAssetWhereInput = {
    AND?: Prisma.FacilityAssetWhereInput | Prisma.FacilityAssetWhereInput[];
    OR?: Prisma.FacilityAssetWhereInput[];
    NOT?: Prisma.FacilityAssetWhereInput | Prisma.FacilityAssetWhereInput[];
    assetId?: Prisma.StringFilter<"FacilityAsset"> | string;
    installLocationDetail?: Prisma.StringFilter<"FacilityAsset"> | string;
    installDate?: Prisma.DateTimeFilter<"FacilityAsset"> | Date | string;
    inspectionCycleMonths?: Prisma.IntFilter<"FacilityAsset"> | number;
    nextInspectionDate?: Prisma.DateTimeFilter<"FacilityAsset"> | Date | string;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
};
export type FacilityAssetOrderByWithRelationInput = {
    assetId?: Prisma.SortOrder;
    installLocationDetail?: Prisma.SortOrder;
    installDate?: Prisma.SortOrder;
    inspectionCycleMonths?: Prisma.SortOrder;
    nextInspectionDate?: Prisma.SortOrder;
    asset?: Prisma.AssetOrderByWithRelationInput;
};
export type FacilityAssetWhereUniqueInput = Prisma.AtLeast<{
    assetId?: string;
    AND?: Prisma.FacilityAssetWhereInput | Prisma.FacilityAssetWhereInput[];
    OR?: Prisma.FacilityAssetWhereInput[];
    NOT?: Prisma.FacilityAssetWhereInput | Prisma.FacilityAssetWhereInput[];
    installLocationDetail?: Prisma.StringFilter<"FacilityAsset"> | string;
    installDate?: Prisma.DateTimeFilter<"FacilityAsset"> | Date | string;
    inspectionCycleMonths?: Prisma.IntFilter<"FacilityAsset"> | number;
    nextInspectionDate?: Prisma.DateTimeFilter<"FacilityAsset"> | Date | string;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
}, "assetId">;
export type FacilityAssetOrderByWithAggregationInput = {
    assetId?: Prisma.SortOrder;
    installLocationDetail?: Prisma.SortOrder;
    installDate?: Prisma.SortOrder;
    inspectionCycleMonths?: Prisma.SortOrder;
    nextInspectionDate?: Prisma.SortOrder;
    _count?: Prisma.FacilityAssetCountOrderByAggregateInput;
    _avg?: Prisma.FacilityAssetAvgOrderByAggregateInput;
    _max?: Prisma.FacilityAssetMaxOrderByAggregateInput;
    _min?: Prisma.FacilityAssetMinOrderByAggregateInput;
    _sum?: Prisma.FacilityAssetSumOrderByAggregateInput;
};
export type FacilityAssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.FacilityAssetScalarWhereWithAggregatesInput | Prisma.FacilityAssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.FacilityAssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FacilityAssetScalarWhereWithAggregatesInput | Prisma.FacilityAssetScalarWhereWithAggregatesInput[];
    assetId?: Prisma.StringWithAggregatesFilter<"FacilityAsset"> | string;
    installLocationDetail?: Prisma.StringWithAggregatesFilter<"FacilityAsset"> | string;
    installDate?: Prisma.DateTimeWithAggregatesFilter<"FacilityAsset"> | Date | string;
    inspectionCycleMonths?: Prisma.IntWithAggregatesFilter<"FacilityAsset"> | number;
    nextInspectionDate?: Prisma.DateTimeWithAggregatesFilter<"FacilityAsset"> | Date | string;
};
export type FacilityAssetCreateInput = {
    installLocationDetail: string;
    installDate: Date | string;
    inspectionCycleMonths: number;
    nextInspectionDate: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutFacilityInput;
};
export type FacilityAssetUncheckedCreateInput = {
    assetId: string;
    installLocationDetail: string;
    installDate: Date | string;
    inspectionCycleMonths: number;
    nextInspectionDate: Date | string;
};
export type FacilityAssetUpdateInput = {
    installLocationDetail?: Prisma.StringFieldUpdateOperationsInput | string;
    installDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspectionCycleMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    nextInspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutFacilityNestedInput;
};
export type FacilityAssetUncheckedUpdateInput = {
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    installLocationDetail?: Prisma.StringFieldUpdateOperationsInput | string;
    installDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspectionCycleMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    nextInspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacilityAssetCreateManyInput = {
    assetId: string;
    installLocationDetail: string;
    installDate: Date | string;
    inspectionCycleMonths: number;
    nextInspectionDate: Date | string;
};
export type FacilityAssetUpdateManyMutationInput = {
    installLocationDetail?: Prisma.StringFieldUpdateOperationsInput | string;
    installDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspectionCycleMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    nextInspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacilityAssetUncheckedUpdateManyInput = {
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    installLocationDetail?: Prisma.StringFieldUpdateOperationsInput | string;
    installDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspectionCycleMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    nextInspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacilityAssetNullableScalarRelationFilter = {
    is?: Prisma.FacilityAssetWhereInput | null;
    isNot?: Prisma.FacilityAssetWhereInput | null;
};
export type FacilityAssetCountOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    installLocationDetail?: Prisma.SortOrder;
    installDate?: Prisma.SortOrder;
    inspectionCycleMonths?: Prisma.SortOrder;
    nextInspectionDate?: Prisma.SortOrder;
};
export type FacilityAssetAvgOrderByAggregateInput = {
    inspectionCycleMonths?: Prisma.SortOrder;
};
export type FacilityAssetMaxOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    installLocationDetail?: Prisma.SortOrder;
    installDate?: Prisma.SortOrder;
    inspectionCycleMonths?: Prisma.SortOrder;
    nextInspectionDate?: Prisma.SortOrder;
};
export type FacilityAssetMinOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    installLocationDetail?: Prisma.SortOrder;
    installDate?: Prisma.SortOrder;
    inspectionCycleMonths?: Prisma.SortOrder;
    nextInspectionDate?: Prisma.SortOrder;
};
export type FacilityAssetSumOrderByAggregateInput = {
    inspectionCycleMonths?: Prisma.SortOrder;
};
export type FacilityAssetCreateNestedOneWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.FacilityAssetCreateWithoutAssetInput, Prisma.FacilityAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.FacilityAssetCreateOrConnectWithoutAssetInput;
    connect?: Prisma.FacilityAssetWhereUniqueInput;
};
export type FacilityAssetUncheckedCreateNestedOneWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.FacilityAssetCreateWithoutAssetInput, Prisma.FacilityAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.FacilityAssetCreateOrConnectWithoutAssetInput;
    connect?: Prisma.FacilityAssetWhereUniqueInput;
};
export type FacilityAssetUpdateOneWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.FacilityAssetCreateWithoutAssetInput, Prisma.FacilityAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.FacilityAssetCreateOrConnectWithoutAssetInput;
    upsert?: Prisma.FacilityAssetUpsertWithoutAssetInput;
    disconnect?: Prisma.FacilityAssetWhereInput | boolean;
    delete?: Prisma.FacilityAssetWhereInput | boolean;
    connect?: Prisma.FacilityAssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FacilityAssetUpdateToOneWithWhereWithoutAssetInput, Prisma.FacilityAssetUpdateWithoutAssetInput>, Prisma.FacilityAssetUncheckedUpdateWithoutAssetInput>;
};
export type FacilityAssetUncheckedUpdateOneWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.FacilityAssetCreateWithoutAssetInput, Prisma.FacilityAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.FacilityAssetCreateOrConnectWithoutAssetInput;
    upsert?: Prisma.FacilityAssetUpsertWithoutAssetInput;
    disconnect?: Prisma.FacilityAssetWhereInput | boolean;
    delete?: Prisma.FacilityAssetWhereInput | boolean;
    connect?: Prisma.FacilityAssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FacilityAssetUpdateToOneWithWhereWithoutAssetInput, Prisma.FacilityAssetUpdateWithoutAssetInput>, Prisma.FacilityAssetUncheckedUpdateWithoutAssetInput>;
};
export type FacilityAssetCreateWithoutAssetInput = {
    installLocationDetail: string;
    installDate: Date | string;
    inspectionCycleMonths: number;
    nextInspectionDate: Date | string;
};
export type FacilityAssetUncheckedCreateWithoutAssetInput = {
    installLocationDetail: string;
    installDate: Date | string;
    inspectionCycleMonths: number;
    nextInspectionDate: Date | string;
};
export type FacilityAssetCreateOrConnectWithoutAssetInput = {
    where: Prisma.FacilityAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.FacilityAssetCreateWithoutAssetInput, Prisma.FacilityAssetUncheckedCreateWithoutAssetInput>;
};
export type FacilityAssetUpsertWithoutAssetInput = {
    update: Prisma.XOR<Prisma.FacilityAssetUpdateWithoutAssetInput, Prisma.FacilityAssetUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.FacilityAssetCreateWithoutAssetInput, Prisma.FacilityAssetUncheckedCreateWithoutAssetInput>;
    where?: Prisma.FacilityAssetWhereInput;
};
export type FacilityAssetUpdateToOneWithWhereWithoutAssetInput = {
    where?: Prisma.FacilityAssetWhereInput;
    data: Prisma.XOR<Prisma.FacilityAssetUpdateWithoutAssetInput, Prisma.FacilityAssetUncheckedUpdateWithoutAssetInput>;
};
export type FacilityAssetUpdateWithoutAssetInput = {
    installLocationDetail?: Prisma.StringFieldUpdateOperationsInput | string;
    installDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspectionCycleMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    nextInspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacilityAssetUncheckedUpdateWithoutAssetInput = {
    installLocationDetail?: Prisma.StringFieldUpdateOperationsInput | string;
    installDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspectionCycleMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    nextInspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FacilityAssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    installLocationDetail?: boolean;
    installDate?: boolean;
    inspectionCycleMonths?: boolean;
    nextInspectionDate?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facilityAsset"]>;
export type FacilityAssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    installLocationDetail?: boolean;
    installDate?: boolean;
    inspectionCycleMonths?: boolean;
    nextInspectionDate?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facilityAsset"]>;
export type FacilityAssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    installLocationDetail?: boolean;
    installDate?: boolean;
    inspectionCycleMonths?: boolean;
    nextInspectionDate?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["facilityAsset"]>;
export type FacilityAssetSelectScalar = {
    assetId?: boolean;
    installLocationDetail?: boolean;
    installDate?: boolean;
    inspectionCycleMonths?: boolean;
    nextInspectionDate?: boolean;
};
export type FacilityAssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"assetId" | "installLocationDetail" | "installDate" | "inspectionCycleMonths" | "nextInspectionDate", ExtArgs["result"]["facilityAsset"]>;
export type FacilityAssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type FacilityAssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type FacilityAssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type $FacilityAssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FacilityAsset";
    objects: {
        asset: Prisma.$AssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        assetId: string;
        installLocationDetail: string;
        installDate: Date;
        inspectionCycleMonths: number;
        nextInspectionDate: Date;
    }, ExtArgs["result"]["facilityAsset"]>;
    composites: {};
};
export type FacilityAssetGetPayload<S extends boolean | null | undefined | FacilityAssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload, S>;
export type FacilityAssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FacilityAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FacilityAssetCountAggregateInputType | true;
};
export interface FacilityAssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FacilityAsset'];
        meta: {
            name: 'FacilityAsset';
        };
    };
    /**
     * Find zero or one FacilityAsset that matches the filter.
     * @param {FacilityAssetFindUniqueArgs} args - Arguments to find a FacilityAsset
     * @example
     * // Get one FacilityAsset
     * const facilityAsset = await prisma.facilityAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacilityAssetFindUniqueArgs>(args: Prisma.SelectSubset<T, FacilityAssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FacilityAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FacilityAssetFindUniqueOrThrowArgs} args - Arguments to find a FacilityAsset
     * @example
     * // Get one FacilityAsset
     * const facilityAsset = await prisma.facilityAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacilityAssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FacilityAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FacilityAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetFindFirstArgs} args - Arguments to find a FacilityAsset
     * @example
     * // Get one FacilityAsset
     * const facilityAsset = await prisma.facilityAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacilityAssetFindFirstArgs>(args?: Prisma.SelectSubset<T, FacilityAssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FacilityAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetFindFirstOrThrowArgs} args - Arguments to find a FacilityAsset
     * @example
     * // Get one FacilityAsset
     * const facilityAsset = await prisma.facilityAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacilityAssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FacilityAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FacilityAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacilityAssets
     * const facilityAssets = await prisma.facilityAsset.findMany()
     *
     * // Get first 10 FacilityAssets
     * const facilityAssets = await prisma.facilityAsset.findMany({ take: 10 })
     *
     * // Only select the `assetId`
     * const facilityAssetWithAssetIdOnly = await prisma.facilityAsset.findMany({ select: { assetId: true } })
     *
     */
    findMany<T extends FacilityAssetFindManyArgs>(args?: Prisma.SelectSubset<T, FacilityAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FacilityAsset.
     * @param {FacilityAssetCreateArgs} args - Arguments to create a FacilityAsset.
     * @example
     * // Create one FacilityAsset
     * const FacilityAsset = await prisma.facilityAsset.create({
     *   data: {
     *     // ... data to create a FacilityAsset
     *   }
     * })
     *
     */
    create<T extends FacilityAssetCreateArgs>(args: Prisma.SelectSubset<T, FacilityAssetCreateArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FacilityAssets.
     * @param {FacilityAssetCreateManyArgs} args - Arguments to create many FacilityAssets.
     * @example
     * // Create many FacilityAssets
     * const facilityAsset = await prisma.facilityAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FacilityAssetCreateManyArgs>(args?: Prisma.SelectSubset<T, FacilityAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FacilityAssets and returns the data saved in the database.
     * @param {FacilityAssetCreateManyAndReturnArgs} args - Arguments to create many FacilityAssets.
     * @example
     * // Create many FacilityAssets
     * const facilityAsset = await prisma.facilityAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FacilityAssets and only return the `assetId`
     * const facilityAssetWithAssetIdOnly = await prisma.facilityAsset.createManyAndReturn({
     *   select: { assetId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FacilityAssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FacilityAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FacilityAsset.
     * @param {FacilityAssetDeleteArgs} args - Arguments to delete one FacilityAsset.
     * @example
     * // Delete one FacilityAsset
     * const FacilityAsset = await prisma.facilityAsset.delete({
     *   where: {
     *     // ... filter to delete one FacilityAsset
     *   }
     * })
     *
     */
    delete<T extends FacilityAssetDeleteArgs>(args: Prisma.SelectSubset<T, FacilityAssetDeleteArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FacilityAsset.
     * @param {FacilityAssetUpdateArgs} args - Arguments to update one FacilityAsset.
     * @example
     * // Update one FacilityAsset
     * const facilityAsset = await prisma.facilityAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FacilityAssetUpdateArgs>(args: Prisma.SelectSubset<T, FacilityAssetUpdateArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FacilityAssets.
     * @param {FacilityAssetDeleteManyArgs} args - Arguments to filter FacilityAssets to delete.
     * @example
     * // Delete a few FacilityAssets
     * const { count } = await prisma.facilityAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FacilityAssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, FacilityAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FacilityAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacilityAssets
     * const facilityAsset = await prisma.facilityAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FacilityAssetUpdateManyArgs>(args: Prisma.SelectSubset<T, FacilityAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FacilityAssets and returns the data updated in the database.
     * @param {FacilityAssetUpdateManyAndReturnArgs} args - Arguments to update many FacilityAssets.
     * @example
     * // Update many FacilityAssets
     * const facilityAsset = await prisma.facilityAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FacilityAssets and only return the `assetId`
     * const facilityAssetWithAssetIdOnly = await prisma.facilityAsset.updateManyAndReturn({
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
    updateManyAndReturn<T extends FacilityAssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FacilityAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FacilityAsset.
     * @param {FacilityAssetUpsertArgs} args - Arguments to update or create a FacilityAsset.
     * @example
     * // Update or create a FacilityAsset
     * const facilityAsset = await prisma.facilityAsset.upsert({
     *   create: {
     *     // ... data to create a FacilityAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacilityAsset we want to update
     *   }
     * })
     */
    upsert<T extends FacilityAssetUpsertArgs>(args: Prisma.SelectSubset<T, FacilityAssetUpsertArgs<ExtArgs>>): Prisma.Prisma__FacilityAssetClient<runtime.Types.Result.GetResult<Prisma.$FacilityAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FacilityAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetCountArgs} args - Arguments to filter FacilityAssets to count.
     * @example
     * // Count the number of FacilityAssets
     * const count = await prisma.facilityAsset.count({
     *   where: {
     *     // ... the filter for the FacilityAssets we want to count
     *   }
     * })
    **/
    count<T extends FacilityAssetCountArgs>(args?: Prisma.Subset<T, FacilityAssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FacilityAssetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FacilityAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FacilityAssetAggregateArgs>(args: Prisma.Subset<T, FacilityAssetAggregateArgs>): Prisma.PrismaPromise<GetFacilityAssetAggregateType<T>>;
    /**
     * Group by FacilityAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacilityAssetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FacilityAssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FacilityAssetGroupByArgs['orderBy'];
    } : {
        orderBy?: FacilityAssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FacilityAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacilityAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FacilityAsset model
     */
    readonly fields: FacilityAssetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FacilityAsset.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FacilityAssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the FacilityAsset model
 */
export interface FacilityAssetFieldRefs {
    readonly assetId: Prisma.FieldRef<"FacilityAsset", 'String'>;
    readonly installLocationDetail: Prisma.FieldRef<"FacilityAsset", 'String'>;
    readonly installDate: Prisma.FieldRef<"FacilityAsset", 'DateTime'>;
    readonly inspectionCycleMonths: Prisma.FieldRef<"FacilityAsset", 'Int'>;
    readonly nextInspectionDate: Prisma.FieldRef<"FacilityAsset", 'DateTime'>;
}
/**
 * FacilityAsset findUnique
 */
export type FacilityAssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * Filter, which FacilityAsset to fetch.
     */
    where: Prisma.FacilityAssetWhereUniqueInput;
};
/**
 * FacilityAsset findUniqueOrThrow
 */
export type FacilityAssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * Filter, which FacilityAsset to fetch.
     */
    where: Prisma.FacilityAssetWhereUniqueInput;
};
/**
 * FacilityAsset findFirst
 */
export type FacilityAssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * Filter, which FacilityAsset to fetch.
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacilityAssets to fetch.
     */
    orderBy?: Prisma.FacilityAssetOrderByWithRelationInput | Prisma.FacilityAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FacilityAssets.
     */
    cursor?: Prisma.FacilityAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacilityAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacilityAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FacilityAssets.
     */
    distinct?: Prisma.FacilityAssetScalarFieldEnum | Prisma.FacilityAssetScalarFieldEnum[];
};
/**
 * FacilityAsset findFirstOrThrow
 */
export type FacilityAssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * Filter, which FacilityAsset to fetch.
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacilityAssets to fetch.
     */
    orderBy?: Prisma.FacilityAssetOrderByWithRelationInput | Prisma.FacilityAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FacilityAssets.
     */
    cursor?: Prisma.FacilityAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacilityAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacilityAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FacilityAssets.
     */
    distinct?: Prisma.FacilityAssetScalarFieldEnum | Prisma.FacilityAssetScalarFieldEnum[];
};
/**
 * FacilityAsset findMany
 */
export type FacilityAssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * Filter, which FacilityAssets to fetch.
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FacilityAssets to fetch.
     */
    orderBy?: Prisma.FacilityAssetOrderByWithRelationInput | Prisma.FacilityAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FacilityAssets.
     */
    cursor?: Prisma.FacilityAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FacilityAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FacilityAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FacilityAssets.
     */
    distinct?: Prisma.FacilityAssetScalarFieldEnum | Prisma.FacilityAssetScalarFieldEnum[];
};
/**
 * FacilityAsset create
 */
export type FacilityAssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * The data needed to create a FacilityAsset.
     */
    data: Prisma.XOR<Prisma.FacilityAssetCreateInput, Prisma.FacilityAssetUncheckedCreateInput>;
};
/**
 * FacilityAsset createMany
 */
export type FacilityAssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FacilityAssets.
     */
    data: Prisma.FacilityAssetCreateManyInput | Prisma.FacilityAssetCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FacilityAsset createManyAndReturn
 */
export type FacilityAssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * The data used to create many FacilityAssets.
     */
    data: Prisma.FacilityAssetCreateManyInput | Prisma.FacilityAssetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FacilityAsset update
 */
export type FacilityAssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * The data needed to update a FacilityAsset.
     */
    data: Prisma.XOR<Prisma.FacilityAssetUpdateInput, Prisma.FacilityAssetUncheckedUpdateInput>;
    /**
     * Choose, which FacilityAsset to update.
     */
    where: Prisma.FacilityAssetWhereUniqueInput;
};
/**
 * FacilityAsset updateMany
 */
export type FacilityAssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FacilityAssets.
     */
    data: Prisma.XOR<Prisma.FacilityAssetUpdateManyMutationInput, Prisma.FacilityAssetUncheckedUpdateManyInput>;
    /**
     * Filter which FacilityAssets to update
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * Limit how many FacilityAssets to update.
     */
    limit?: number;
};
/**
 * FacilityAsset updateManyAndReturn
 */
export type FacilityAssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * The data used to update FacilityAssets.
     */
    data: Prisma.XOR<Prisma.FacilityAssetUpdateManyMutationInput, Prisma.FacilityAssetUncheckedUpdateManyInput>;
    /**
     * Filter which FacilityAssets to update
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * Limit how many FacilityAssets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FacilityAsset upsert
 */
export type FacilityAssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * The filter to search for the FacilityAsset to update in case it exists.
     */
    where: Prisma.FacilityAssetWhereUniqueInput;
    /**
     * In case the FacilityAsset found by the `where` argument doesn't exist, create a new FacilityAsset with this data.
     */
    create: Prisma.XOR<Prisma.FacilityAssetCreateInput, Prisma.FacilityAssetUncheckedCreateInput>;
    /**
     * In case the FacilityAsset was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FacilityAssetUpdateInput, Prisma.FacilityAssetUncheckedUpdateInput>;
};
/**
 * FacilityAsset delete
 */
export type FacilityAssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
    /**
     * Filter which FacilityAsset to delete.
     */
    where: Prisma.FacilityAssetWhereUniqueInput;
};
/**
 * FacilityAsset deleteMany
 */
export type FacilityAssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FacilityAssets to delete
     */
    where?: Prisma.FacilityAssetWhereInput;
    /**
     * Limit how many FacilityAssets to delete.
     */
    limit?: number;
};
/**
 * FacilityAsset without action
 */
export type FacilityAssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacilityAsset
     */
    select?: Prisma.FacilityAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FacilityAsset
     */
    omit?: Prisma.FacilityAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FacilityAssetInclude<ExtArgs> | null;
};
//# sourceMappingURL=FacilityAsset.d.ts.map