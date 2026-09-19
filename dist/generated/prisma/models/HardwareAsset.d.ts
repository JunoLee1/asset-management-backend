import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model HardwareAsset
 *
 */
export type HardwareAssetModel = runtime.Types.Result.DefaultSelection<Prisma.$HardwareAssetPayload>;
export type AggregateHardwareAsset = {
    _count: HardwareAssetCountAggregateOutputType | null;
    _avg: HardwareAssetAvgAggregateOutputType | null;
    _sum: HardwareAssetSumAggregateOutputType | null;
    _min: HardwareAssetMinAggregateOutputType | null;
    _max: HardwareAssetMaxAggregateOutputType | null;
};
export type HardwareAssetAvgAggregateOutputType = {
    ramGb: number | null;
    storageGb: number | null;
};
export type HardwareAssetSumAggregateOutputType = {
    ramGb: number | null;
    storageGb: number | null;
};
export type HardwareAssetMinAggregateOutputType = {
    assetId: string | null;
    serialNo: string | null;
    macAddr: string | null;
    ipAddr: string | null;
    cpu: string | null;
    ramGb: number | null;
    storageGb: number | null;
    warrantyEnd: Date | null;
};
export type HardwareAssetMaxAggregateOutputType = {
    assetId: string | null;
    serialNo: string | null;
    macAddr: string | null;
    ipAddr: string | null;
    cpu: string | null;
    ramGb: number | null;
    storageGb: number | null;
    warrantyEnd: Date | null;
};
export type HardwareAssetCountAggregateOutputType = {
    assetId: number;
    serialNo: number;
    macAddr: number;
    ipAddr: number;
    cpu: number;
    ramGb: number;
    storageGb: number;
    warrantyEnd: number;
    _all: number;
};
export type HardwareAssetAvgAggregateInputType = {
    ramGb?: true;
    storageGb?: true;
};
export type HardwareAssetSumAggregateInputType = {
    ramGb?: true;
    storageGb?: true;
};
export type HardwareAssetMinAggregateInputType = {
    assetId?: true;
    serialNo?: true;
    macAddr?: true;
    ipAddr?: true;
    cpu?: true;
    ramGb?: true;
    storageGb?: true;
    warrantyEnd?: true;
};
export type HardwareAssetMaxAggregateInputType = {
    assetId?: true;
    serialNo?: true;
    macAddr?: true;
    ipAddr?: true;
    cpu?: true;
    ramGb?: true;
    storageGb?: true;
    warrantyEnd?: true;
};
export type HardwareAssetCountAggregateInputType = {
    assetId?: true;
    serialNo?: true;
    macAddr?: true;
    ipAddr?: true;
    cpu?: true;
    ramGb?: true;
    storageGb?: true;
    warrantyEnd?: true;
    _all?: true;
};
export type HardwareAssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which HardwareAsset to aggregate.
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HardwareAssets to fetch.
     */
    orderBy?: Prisma.HardwareAssetOrderByWithRelationInput | Prisma.HardwareAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.HardwareAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HardwareAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HardwareAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned HardwareAssets
    **/
    _count?: true | HardwareAssetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HardwareAssetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HardwareAssetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HardwareAssetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HardwareAssetMaxAggregateInputType;
};
export type GetHardwareAssetAggregateType<T extends HardwareAssetAggregateArgs> = {
    [P in keyof T & keyof AggregateHardwareAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHardwareAsset[P]> : Prisma.GetScalarType<T[P], AggregateHardwareAsset[P]>;
};
export type HardwareAssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HardwareAssetWhereInput;
    orderBy?: Prisma.HardwareAssetOrderByWithAggregationInput | Prisma.HardwareAssetOrderByWithAggregationInput[];
    by: Prisma.HardwareAssetScalarFieldEnum[] | Prisma.HardwareAssetScalarFieldEnum;
    having?: Prisma.HardwareAssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HardwareAssetCountAggregateInputType | true;
    _avg?: HardwareAssetAvgAggregateInputType;
    _sum?: HardwareAssetSumAggregateInputType;
    _min?: HardwareAssetMinAggregateInputType;
    _max?: HardwareAssetMaxAggregateInputType;
};
export type HardwareAssetGroupByOutputType = {
    assetId: string;
    serialNo: string;
    macAddr: string | null;
    ipAddr: string | null;
    cpu: string | null;
    ramGb: number | null;
    storageGb: number | null;
    warrantyEnd: Date | null;
    _count: HardwareAssetCountAggregateOutputType | null;
    _avg: HardwareAssetAvgAggregateOutputType | null;
    _sum: HardwareAssetSumAggregateOutputType | null;
    _min: HardwareAssetMinAggregateOutputType | null;
    _max: HardwareAssetMaxAggregateOutputType | null;
};
export type GetHardwareAssetGroupByPayload<T extends HardwareAssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HardwareAssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HardwareAssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HardwareAssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HardwareAssetGroupByOutputType[P]>;
}>>;
export type HardwareAssetWhereInput = {
    AND?: Prisma.HardwareAssetWhereInput | Prisma.HardwareAssetWhereInput[];
    OR?: Prisma.HardwareAssetWhereInput[];
    NOT?: Prisma.HardwareAssetWhereInput | Prisma.HardwareAssetWhereInput[];
    assetId?: Prisma.StringFilter<"HardwareAsset"> | string;
    serialNo?: Prisma.StringFilter<"HardwareAsset"> | string;
    macAddr?: Prisma.StringNullableFilter<"HardwareAsset"> | string | null;
    ipAddr?: Prisma.StringNullableFilter<"HardwareAsset"> | string | null;
    cpu?: Prisma.StringNullableFilter<"HardwareAsset"> | string | null;
    ramGb?: Prisma.IntNullableFilter<"HardwareAsset"> | number | null;
    storageGb?: Prisma.IntNullableFilter<"HardwareAsset"> | number | null;
    warrantyEnd?: Prisma.DateTimeNullableFilter<"HardwareAsset"> | Date | string | null;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
};
export type HardwareAssetOrderByWithRelationInput = {
    assetId?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
    macAddr?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddr?: Prisma.SortOrderInput | Prisma.SortOrder;
    cpu?: Prisma.SortOrderInput | Prisma.SortOrder;
    ramGb?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageGb?: Prisma.SortOrderInput | Prisma.SortOrder;
    warrantyEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    asset?: Prisma.AssetOrderByWithRelationInput;
};
export type HardwareAssetWhereUniqueInput = Prisma.AtLeast<{
    assetId?: string;
    serialNo?: string;
    AND?: Prisma.HardwareAssetWhereInput | Prisma.HardwareAssetWhereInput[];
    OR?: Prisma.HardwareAssetWhereInput[];
    NOT?: Prisma.HardwareAssetWhereInput | Prisma.HardwareAssetWhereInput[];
    macAddr?: Prisma.StringNullableFilter<"HardwareAsset"> | string | null;
    ipAddr?: Prisma.StringNullableFilter<"HardwareAsset"> | string | null;
    cpu?: Prisma.StringNullableFilter<"HardwareAsset"> | string | null;
    ramGb?: Prisma.IntNullableFilter<"HardwareAsset"> | number | null;
    storageGb?: Prisma.IntNullableFilter<"HardwareAsset"> | number | null;
    warrantyEnd?: Prisma.DateTimeNullableFilter<"HardwareAsset"> | Date | string | null;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
}, "assetId" | "serialNo">;
export type HardwareAssetOrderByWithAggregationInput = {
    assetId?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
    macAddr?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddr?: Prisma.SortOrderInput | Prisma.SortOrder;
    cpu?: Prisma.SortOrderInput | Prisma.SortOrder;
    ramGb?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageGb?: Prisma.SortOrderInput | Prisma.SortOrder;
    warrantyEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.HardwareAssetCountOrderByAggregateInput;
    _avg?: Prisma.HardwareAssetAvgOrderByAggregateInput;
    _max?: Prisma.HardwareAssetMaxOrderByAggregateInput;
    _min?: Prisma.HardwareAssetMinOrderByAggregateInput;
    _sum?: Prisma.HardwareAssetSumOrderByAggregateInput;
};
export type HardwareAssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.HardwareAssetScalarWhereWithAggregatesInput | Prisma.HardwareAssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.HardwareAssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HardwareAssetScalarWhereWithAggregatesInput | Prisma.HardwareAssetScalarWhereWithAggregatesInput[];
    assetId?: Prisma.StringWithAggregatesFilter<"HardwareAsset"> | string;
    serialNo?: Prisma.StringWithAggregatesFilter<"HardwareAsset"> | string;
    macAddr?: Prisma.StringNullableWithAggregatesFilter<"HardwareAsset"> | string | null;
    ipAddr?: Prisma.StringNullableWithAggregatesFilter<"HardwareAsset"> | string | null;
    cpu?: Prisma.StringNullableWithAggregatesFilter<"HardwareAsset"> | string | null;
    ramGb?: Prisma.IntNullableWithAggregatesFilter<"HardwareAsset"> | number | null;
    storageGb?: Prisma.IntNullableWithAggregatesFilter<"HardwareAsset"> | number | null;
    warrantyEnd?: Prisma.DateTimeNullableWithAggregatesFilter<"HardwareAsset"> | Date | string | null;
};
export type HardwareAssetCreateInput = {
    serialNo: string;
    macAddr?: string | null;
    ipAddr?: string | null;
    cpu?: string | null;
    ramGb?: number | null;
    storageGb?: number | null;
    warrantyEnd?: Date | string | null;
    asset: Prisma.AssetCreateNestedOneWithoutHardwareInput;
};
export type HardwareAssetUncheckedCreateInput = {
    assetId: string;
    serialNo: string;
    macAddr?: string | null;
    ipAddr?: string | null;
    cpu?: string | null;
    ramGb?: number | null;
    storageGb?: number | null;
    warrantyEnd?: Date | string | null;
};
export type HardwareAssetUpdateInput = {
    serialNo?: Prisma.StringFieldUpdateOperationsInput | string;
    macAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cpu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ramGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    warrantyEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asset?: Prisma.AssetUpdateOneRequiredWithoutHardwareNestedInput;
};
export type HardwareAssetUncheckedUpdateInput = {
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNo?: Prisma.StringFieldUpdateOperationsInput | string;
    macAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cpu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ramGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    warrantyEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type HardwareAssetCreateManyInput = {
    assetId: string;
    serialNo: string;
    macAddr?: string | null;
    ipAddr?: string | null;
    cpu?: string | null;
    ramGb?: number | null;
    storageGb?: number | null;
    warrantyEnd?: Date | string | null;
};
export type HardwareAssetUpdateManyMutationInput = {
    serialNo?: Prisma.StringFieldUpdateOperationsInput | string;
    macAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cpu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ramGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    warrantyEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type HardwareAssetUncheckedUpdateManyInput = {
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNo?: Prisma.StringFieldUpdateOperationsInput | string;
    macAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cpu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ramGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    warrantyEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type HardwareAssetNullableScalarRelationFilter = {
    is?: Prisma.HardwareAssetWhereInput | null;
    isNot?: Prisma.HardwareAssetWhereInput | null;
};
export type HardwareAssetCountOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
    macAddr?: Prisma.SortOrder;
    ipAddr?: Prisma.SortOrder;
    cpu?: Prisma.SortOrder;
    ramGb?: Prisma.SortOrder;
    storageGb?: Prisma.SortOrder;
    warrantyEnd?: Prisma.SortOrder;
};
export type HardwareAssetAvgOrderByAggregateInput = {
    ramGb?: Prisma.SortOrder;
    storageGb?: Prisma.SortOrder;
};
export type HardwareAssetMaxOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
    macAddr?: Prisma.SortOrder;
    ipAddr?: Prisma.SortOrder;
    cpu?: Prisma.SortOrder;
    ramGb?: Prisma.SortOrder;
    storageGb?: Prisma.SortOrder;
    warrantyEnd?: Prisma.SortOrder;
};
export type HardwareAssetMinOrderByAggregateInput = {
    assetId?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
    macAddr?: Prisma.SortOrder;
    ipAddr?: Prisma.SortOrder;
    cpu?: Prisma.SortOrder;
    ramGb?: Prisma.SortOrder;
    storageGb?: Prisma.SortOrder;
    warrantyEnd?: Prisma.SortOrder;
};
export type HardwareAssetSumOrderByAggregateInput = {
    ramGb?: Prisma.SortOrder;
    storageGb?: Prisma.SortOrder;
};
export type HardwareAssetCreateNestedOneWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.HardwareAssetCreateWithoutAssetInput, Prisma.HardwareAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.HardwareAssetCreateOrConnectWithoutAssetInput;
    connect?: Prisma.HardwareAssetWhereUniqueInput;
};
export type HardwareAssetUncheckedCreateNestedOneWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.HardwareAssetCreateWithoutAssetInput, Prisma.HardwareAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.HardwareAssetCreateOrConnectWithoutAssetInput;
    connect?: Prisma.HardwareAssetWhereUniqueInput;
};
export type HardwareAssetUpdateOneWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.HardwareAssetCreateWithoutAssetInput, Prisma.HardwareAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.HardwareAssetCreateOrConnectWithoutAssetInput;
    upsert?: Prisma.HardwareAssetUpsertWithoutAssetInput;
    disconnect?: Prisma.HardwareAssetWhereInput | boolean;
    delete?: Prisma.HardwareAssetWhereInput | boolean;
    connect?: Prisma.HardwareAssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HardwareAssetUpdateToOneWithWhereWithoutAssetInput, Prisma.HardwareAssetUpdateWithoutAssetInput>, Prisma.HardwareAssetUncheckedUpdateWithoutAssetInput>;
};
export type HardwareAssetUncheckedUpdateOneWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.HardwareAssetCreateWithoutAssetInput, Prisma.HardwareAssetUncheckedCreateWithoutAssetInput>;
    connectOrCreate?: Prisma.HardwareAssetCreateOrConnectWithoutAssetInput;
    upsert?: Prisma.HardwareAssetUpsertWithoutAssetInput;
    disconnect?: Prisma.HardwareAssetWhereInput | boolean;
    delete?: Prisma.HardwareAssetWhereInput | boolean;
    connect?: Prisma.HardwareAssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HardwareAssetUpdateToOneWithWhereWithoutAssetInput, Prisma.HardwareAssetUpdateWithoutAssetInput>, Prisma.HardwareAssetUncheckedUpdateWithoutAssetInput>;
};
export type HardwareAssetCreateWithoutAssetInput = {
    serialNo: string;
    macAddr?: string | null;
    ipAddr?: string | null;
    cpu?: string | null;
    ramGb?: number | null;
    storageGb?: number | null;
    warrantyEnd?: Date | string | null;
};
export type HardwareAssetUncheckedCreateWithoutAssetInput = {
    serialNo: string;
    macAddr?: string | null;
    ipAddr?: string | null;
    cpu?: string | null;
    ramGb?: number | null;
    storageGb?: number | null;
    warrantyEnd?: Date | string | null;
};
export type HardwareAssetCreateOrConnectWithoutAssetInput = {
    where: Prisma.HardwareAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.HardwareAssetCreateWithoutAssetInput, Prisma.HardwareAssetUncheckedCreateWithoutAssetInput>;
};
export type HardwareAssetUpsertWithoutAssetInput = {
    update: Prisma.XOR<Prisma.HardwareAssetUpdateWithoutAssetInput, Prisma.HardwareAssetUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.HardwareAssetCreateWithoutAssetInput, Prisma.HardwareAssetUncheckedCreateWithoutAssetInput>;
    where?: Prisma.HardwareAssetWhereInput;
};
export type HardwareAssetUpdateToOneWithWhereWithoutAssetInput = {
    where?: Prisma.HardwareAssetWhereInput;
    data: Prisma.XOR<Prisma.HardwareAssetUpdateWithoutAssetInput, Prisma.HardwareAssetUncheckedUpdateWithoutAssetInput>;
};
export type HardwareAssetUpdateWithoutAssetInput = {
    serialNo?: Prisma.StringFieldUpdateOperationsInput | string;
    macAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cpu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ramGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    warrantyEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type HardwareAssetUncheckedUpdateWithoutAssetInput = {
    serialNo?: Prisma.StringFieldUpdateOperationsInput | string;
    macAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cpu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ramGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageGb?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    warrantyEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type HardwareAssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    serialNo?: boolean;
    macAddr?: boolean;
    ipAddr?: boolean;
    cpu?: boolean;
    ramGb?: boolean;
    storageGb?: boolean;
    warrantyEnd?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hardwareAsset"]>;
export type HardwareAssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    serialNo?: boolean;
    macAddr?: boolean;
    ipAddr?: boolean;
    cpu?: boolean;
    ramGb?: boolean;
    storageGb?: boolean;
    warrantyEnd?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hardwareAsset"]>;
export type HardwareAssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    assetId?: boolean;
    serialNo?: boolean;
    macAddr?: boolean;
    ipAddr?: boolean;
    cpu?: boolean;
    ramGb?: boolean;
    storageGb?: boolean;
    warrantyEnd?: boolean;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hardwareAsset"]>;
export type HardwareAssetSelectScalar = {
    assetId?: boolean;
    serialNo?: boolean;
    macAddr?: boolean;
    ipAddr?: boolean;
    cpu?: boolean;
    ramGb?: boolean;
    storageGb?: boolean;
    warrantyEnd?: boolean;
};
export type HardwareAssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"assetId" | "serialNo" | "macAddr" | "ipAddr" | "cpu" | "ramGb" | "storageGb" | "warrantyEnd", ExtArgs["result"]["hardwareAsset"]>;
export type HardwareAssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type HardwareAssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type HardwareAssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type $HardwareAssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HardwareAsset";
    objects: {
        asset: Prisma.$AssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        assetId: string;
        serialNo: string;
        macAddr: string | null;
        ipAddr: string | null;
        cpu: string | null;
        ramGb: number | null;
        storageGb: number | null;
        warrantyEnd: Date | null;
    }, ExtArgs["result"]["hardwareAsset"]>;
    composites: {};
};
export type HardwareAssetGetPayload<S extends boolean | null | undefined | HardwareAssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload, S>;
export type HardwareAssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HardwareAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HardwareAssetCountAggregateInputType | true;
};
export interface HardwareAssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HardwareAsset'];
        meta: {
            name: 'HardwareAsset';
        };
    };
    /**
     * Find zero or one HardwareAsset that matches the filter.
     * @param {HardwareAssetFindUniqueArgs} args - Arguments to find a HardwareAsset
     * @example
     * // Get one HardwareAsset
     * const hardwareAsset = await prisma.hardwareAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HardwareAssetFindUniqueArgs>(args: Prisma.SelectSubset<T, HardwareAssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one HardwareAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HardwareAssetFindUniqueOrThrowArgs} args - Arguments to find a HardwareAsset
     * @example
     * // Get one HardwareAsset
     * const hardwareAsset = await prisma.hardwareAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HardwareAssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HardwareAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first HardwareAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetFindFirstArgs} args - Arguments to find a HardwareAsset
     * @example
     * // Get one HardwareAsset
     * const hardwareAsset = await prisma.hardwareAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HardwareAssetFindFirstArgs>(args?: Prisma.SelectSubset<T, HardwareAssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first HardwareAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetFindFirstOrThrowArgs} args - Arguments to find a HardwareAsset
     * @example
     * // Get one HardwareAsset
     * const hardwareAsset = await prisma.hardwareAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HardwareAssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HardwareAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more HardwareAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HardwareAssets
     * const hardwareAssets = await prisma.hardwareAsset.findMany()
     *
     * // Get first 10 HardwareAssets
     * const hardwareAssets = await prisma.hardwareAsset.findMany({ take: 10 })
     *
     * // Only select the `assetId`
     * const hardwareAssetWithAssetIdOnly = await prisma.hardwareAsset.findMany({ select: { assetId: true } })
     *
     */
    findMany<T extends HardwareAssetFindManyArgs>(args?: Prisma.SelectSubset<T, HardwareAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a HardwareAsset.
     * @param {HardwareAssetCreateArgs} args - Arguments to create a HardwareAsset.
     * @example
     * // Create one HardwareAsset
     * const HardwareAsset = await prisma.hardwareAsset.create({
     *   data: {
     *     // ... data to create a HardwareAsset
     *   }
     * })
     *
     */
    create<T extends HardwareAssetCreateArgs>(args: Prisma.SelectSubset<T, HardwareAssetCreateArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many HardwareAssets.
     * @param {HardwareAssetCreateManyArgs} args - Arguments to create many HardwareAssets.
     * @example
     * // Create many HardwareAssets
     * const hardwareAsset = await prisma.hardwareAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HardwareAssetCreateManyArgs>(args?: Prisma.SelectSubset<T, HardwareAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many HardwareAssets and returns the data saved in the database.
     * @param {HardwareAssetCreateManyAndReturnArgs} args - Arguments to create many HardwareAssets.
     * @example
     * // Create many HardwareAssets
     * const hardwareAsset = await prisma.hardwareAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many HardwareAssets and only return the `assetId`
     * const hardwareAssetWithAssetIdOnly = await prisma.hardwareAsset.createManyAndReturn({
     *   select: { assetId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HardwareAssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HardwareAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a HardwareAsset.
     * @param {HardwareAssetDeleteArgs} args - Arguments to delete one HardwareAsset.
     * @example
     * // Delete one HardwareAsset
     * const HardwareAsset = await prisma.hardwareAsset.delete({
     *   where: {
     *     // ... filter to delete one HardwareAsset
     *   }
     * })
     *
     */
    delete<T extends HardwareAssetDeleteArgs>(args: Prisma.SelectSubset<T, HardwareAssetDeleteArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one HardwareAsset.
     * @param {HardwareAssetUpdateArgs} args - Arguments to update one HardwareAsset.
     * @example
     * // Update one HardwareAsset
     * const hardwareAsset = await prisma.hardwareAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HardwareAssetUpdateArgs>(args: Prisma.SelectSubset<T, HardwareAssetUpdateArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more HardwareAssets.
     * @param {HardwareAssetDeleteManyArgs} args - Arguments to filter HardwareAssets to delete.
     * @example
     * // Delete a few HardwareAssets
     * const { count } = await prisma.hardwareAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HardwareAssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, HardwareAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more HardwareAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HardwareAssets
     * const hardwareAsset = await prisma.hardwareAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HardwareAssetUpdateManyArgs>(args: Prisma.SelectSubset<T, HardwareAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more HardwareAssets and returns the data updated in the database.
     * @param {HardwareAssetUpdateManyAndReturnArgs} args - Arguments to update many HardwareAssets.
     * @example
     * // Update many HardwareAssets
     * const hardwareAsset = await prisma.hardwareAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more HardwareAssets and only return the `assetId`
     * const hardwareAssetWithAssetIdOnly = await prisma.hardwareAsset.updateManyAndReturn({
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
    updateManyAndReturn<T extends HardwareAssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HardwareAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one HardwareAsset.
     * @param {HardwareAssetUpsertArgs} args - Arguments to update or create a HardwareAsset.
     * @example
     * // Update or create a HardwareAsset
     * const hardwareAsset = await prisma.hardwareAsset.upsert({
     *   create: {
     *     // ... data to create a HardwareAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HardwareAsset we want to update
     *   }
     * })
     */
    upsert<T extends HardwareAssetUpsertArgs>(args: Prisma.SelectSubset<T, HardwareAssetUpsertArgs<ExtArgs>>): Prisma.Prisma__HardwareAssetClient<runtime.Types.Result.GetResult<Prisma.$HardwareAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of HardwareAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetCountArgs} args - Arguments to filter HardwareAssets to count.
     * @example
     * // Count the number of HardwareAssets
     * const count = await prisma.hardwareAsset.count({
     *   where: {
     *     // ... the filter for the HardwareAssets we want to count
     *   }
     * })
    **/
    count<T extends HardwareAssetCountArgs>(args?: Prisma.Subset<T, HardwareAssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HardwareAssetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a HardwareAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HardwareAssetAggregateArgs>(args: Prisma.Subset<T, HardwareAssetAggregateArgs>): Prisma.PrismaPromise<GetHardwareAssetAggregateType<T>>;
    /**
     * Group by HardwareAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HardwareAssetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends HardwareAssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HardwareAssetGroupByArgs['orderBy'];
    } : {
        orderBy?: HardwareAssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HardwareAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHardwareAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the HardwareAsset model
     */
    readonly fields: HardwareAssetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for HardwareAsset.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__HardwareAssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the HardwareAsset model
 */
export interface HardwareAssetFieldRefs {
    readonly assetId: Prisma.FieldRef<"HardwareAsset", 'String'>;
    readonly serialNo: Prisma.FieldRef<"HardwareAsset", 'String'>;
    readonly macAddr: Prisma.FieldRef<"HardwareAsset", 'String'>;
    readonly ipAddr: Prisma.FieldRef<"HardwareAsset", 'String'>;
    readonly cpu: Prisma.FieldRef<"HardwareAsset", 'String'>;
    readonly ramGb: Prisma.FieldRef<"HardwareAsset", 'Int'>;
    readonly storageGb: Prisma.FieldRef<"HardwareAsset", 'Int'>;
    readonly warrantyEnd: Prisma.FieldRef<"HardwareAsset", 'DateTime'>;
}
/**
 * HardwareAsset findUnique
 */
export type HardwareAssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * Filter, which HardwareAsset to fetch.
     */
    where: Prisma.HardwareAssetWhereUniqueInput;
};
/**
 * HardwareAsset findUniqueOrThrow
 */
export type HardwareAssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * Filter, which HardwareAsset to fetch.
     */
    where: Prisma.HardwareAssetWhereUniqueInput;
};
/**
 * HardwareAsset findFirst
 */
export type HardwareAssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * Filter, which HardwareAsset to fetch.
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HardwareAssets to fetch.
     */
    orderBy?: Prisma.HardwareAssetOrderByWithRelationInput | Prisma.HardwareAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HardwareAssets.
     */
    cursor?: Prisma.HardwareAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HardwareAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HardwareAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HardwareAssets.
     */
    distinct?: Prisma.HardwareAssetScalarFieldEnum | Prisma.HardwareAssetScalarFieldEnum[];
};
/**
 * HardwareAsset findFirstOrThrow
 */
export type HardwareAssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * Filter, which HardwareAsset to fetch.
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HardwareAssets to fetch.
     */
    orderBy?: Prisma.HardwareAssetOrderByWithRelationInput | Prisma.HardwareAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for HardwareAssets.
     */
    cursor?: Prisma.HardwareAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HardwareAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HardwareAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HardwareAssets.
     */
    distinct?: Prisma.HardwareAssetScalarFieldEnum | Prisma.HardwareAssetScalarFieldEnum[];
};
/**
 * HardwareAsset findMany
 */
export type HardwareAssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * Filter, which HardwareAssets to fetch.
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of HardwareAssets to fetch.
     */
    orderBy?: Prisma.HardwareAssetOrderByWithRelationInput | Prisma.HardwareAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing HardwareAssets.
     */
    cursor?: Prisma.HardwareAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` HardwareAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` HardwareAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of HardwareAssets.
     */
    distinct?: Prisma.HardwareAssetScalarFieldEnum | Prisma.HardwareAssetScalarFieldEnum[];
};
/**
 * HardwareAsset create
 */
export type HardwareAssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * The data needed to create a HardwareAsset.
     */
    data: Prisma.XOR<Prisma.HardwareAssetCreateInput, Prisma.HardwareAssetUncheckedCreateInput>;
};
/**
 * HardwareAsset createMany
 */
export type HardwareAssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many HardwareAssets.
     */
    data: Prisma.HardwareAssetCreateManyInput | Prisma.HardwareAssetCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * HardwareAsset createManyAndReturn
 */
export type HardwareAssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * The data used to create many HardwareAssets.
     */
    data: Prisma.HardwareAssetCreateManyInput | Prisma.HardwareAssetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * HardwareAsset update
 */
export type HardwareAssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * The data needed to update a HardwareAsset.
     */
    data: Prisma.XOR<Prisma.HardwareAssetUpdateInput, Prisma.HardwareAssetUncheckedUpdateInput>;
    /**
     * Choose, which HardwareAsset to update.
     */
    where: Prisma.HardwareAssetWhereUniqueInput;
};
/**
 * HardwareAsset updateMany
 */
export type HardwareAssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update HardwareAssets.
     */
    data: Prisma.XOR<Prisma.HardwareAssetUpdateManyMutationInput, Prisma.HardwareAssetUncheckedUpdateManyInput>;
    /**
     * Filter which HardwareAssets to update
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * Limit how many HardwareAssets to update.
     */
    limit?: number;
};
/**
 * HardwareAsset updateManyAndReturn
 */
export type HardwareAssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * The data used to update HardwareAssets.
     */
    data: Prisma.XOR<Prisma.HardwareAssetUpdateManyMutationInput, Prisma.HardwareAssetUncheckedUpdateManyInput>;
    /**
     * Filter which HardwareAssets to update
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * Limit how many HardwareAssets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * HardwareAsset upsert
 */
export type HardwareAssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * The filter to search for the HardwareAsset to update in case it exists.
     */
    where: Prisma.HardwareAssetWhereUniqueInput;
    /**
     * In case the HardwareAsset found by the `where` argument doesn't exist, create a new HardwareAsset with this data.
     */
    create: Prisma.XOR<Prisma.HardwareAssetCreateInput, Prisma.HardwareAssetUncheckedCreateInput>;
    /**
     * In case the HardwareAsset was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.HardwareAssetUpdateInput, Prisma.HardwareAssetUncheckedUpdateInput>;
};
/**
 * HardwareAsset delete
 */
export type HardwareAssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
    /**
     * Filter which HardwareAsset to delete.
     */
    where: Prisma.HardwareAssetWhereUniqueInput;
};
/**
 * HardwareAsset deleteMany
 */
export type HardwareAssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which HardwareAssets to delete
     */
    where?: Prisma.HardwareAssetWhereInput;
    /**
     * Limit how many HardwareAssets to delete.
     */
    limit?: number;
};
/**
 * HardwareAsset without action
 */
export type HardwareAssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HardwareAsset
     */
    select?: Prisma.HardwareAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HardwareAsset
     */
    omit?: Prisma.HardwareAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HardwareAssetInclude<ExtArgs> | null;
};
//# sourceMappingURL=HardwareAsset.d.ts.map