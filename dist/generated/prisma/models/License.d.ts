import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model License
 *
 */
export type LicenseModel = runtime.Types.Result.DefaultSelection<Prisma.$LicensePayload>;
export type AggregateLicense = {
    _count: LicenseCountAggregateOutputType | null;
    _avg: LicenseAvgAggregateOutputType | null;
    _sum: LicenseSumAggregateOutputType | null;
    _min: LicenseMinAggregateOutputType | null;
    _max: LicenseMaxAggregateOutputType | null;
};
export type LicenseAvgAggregateOutputType = {
    seatsTotal: number | null;
    cost: runtime.Decimal | null;
};
export type LicenseSumAggregateOutputType = {
    seatsTotal: number | null;
    cost: runtime.Decimal | null;
};
export type LicenseMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    productKey: string | null;
    productKeyMask: string | null;
    vendorId: string | null;
    seatsTotal: number | null;
    purchaseDate: Date | null;
    expiryDate: Date | null;
    cost: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LicenseMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    productKey: string | null;
    productKeyMask: string | null;
    vendorId: string | null;
    seatsTotal: number | null;
    purchaseDate: Date | null;
    expiryDate: Date | null;
    cost: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LicenseCountAggregateOutputType = {
    id: number;
    name: number;
    productKey: number;
    productKeyMask: number;
    vendorId: number;
    seatsTotal: number;
    purchaseDate: number;
    expiryDate: number;
    cost: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LicenseAvgAggregateInputType = {
    seatsTotal?: true;
    cost?: true;
};
export type LicenseSumAggregateInputType = {
    seatsTotal?: true;
    cost?: true;
};
export type LicenseMinAggregateInputType = {
    id?: true;
    name?: true;
    productKey?: true;
    productKeyMask?: true;
    vendorId?: true;
    seatsTotal?: true;
    purchaseDate?: true;
    expiryDate?: true;
    cost?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LicenseMaxAggregateInputType = {
    id?: true;
    name?: true;
    productKey?: true;
    productKeyMask?: true;
    vendorId?: true;
    seatsTotal?: true;
    purchaseDate?: true;
    expiryDate?: true;
    cost?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LicenseCountAggregateInputType = {
    id?: true;
    name?: true;
    productKey?: true;
    productKeyMask?: true;
    vendorId?: true;
    seatsTotal?: true;
    purchaseDate?: true;
    expiryDate?: true;
    cost?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LicenseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which License to aggregate.
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Licenses to fetch.
     */
    orderBy?: Prisma.LicenseOrderByWithRelationInput | Prisma.LicenseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LicenseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Licenses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Licenses
    **/
    _count?: true | LicenseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: LicenseAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: LicenseSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LicenseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LicenseMaxAggregateInputType;
};
export type GetLicenseAggregateType<T extends LicenseAggregateArgs> = {
    [P in keyof T & keyof AggregateLicense]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLicense[P]> : Prisma.GetScalarType<T[P], AggregateLicense[P]>;
};
export type LicenseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicenseWhereInput;
    orderBy?: Prisma.LicenseOrderByWithAggregationInput | Prisma.LicenseOrderByWithAggregationInput[];
    by: Prisma.LicenseScalarFieldEnum[] | Prisma.LicenseScalarFieldEnum;
    having?: Prisma.LicenseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LicenseCountAggregateInputType | true;
    _avg?: LicenseAvgAggregateInputType;
    _sum?: LicenseSumAggregateInputType;
    _min?: LicenseMinAggregateInputType;
    _max?: LicenseMaxAggregateInputType;
};
export type LicenseGroupByOutputType = {
    id: string;
    name: string;
    productKey: string | null;
    productKeyMask: string | null;
    vendorId: string | null;
    seatsTotal: number;
    purchaseDate: Date;
    expiryDate: Date | null;
    cost: runtime.Decimal | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LicenseCountAggregateOutputType | null;
    _avg: LicenseAvgAggregateOutputType | null;
    _sum: LicenseSumAggregateOutputType | null;
    _min: LicenseMinAggregateOutputType | null;
    _max: LicenseMaxAggregateOutputType | null;
};
export type GetLicenseGroupByPayload<T extends LicenseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LicenseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LicenseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LicenseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LicenseGroupByOutputType[P]>;
}>>;
export type LicenseWhereInput = {
    AND?: Prisma.LicenseWhereInput | Prisma.LicenseWhereInput[];
    OR?: Prisma.LicenseWhereInput[];
    NOT?: Prisma.LicenseWhereInput | Prisma.LicenseWhereInput[];
    id?: Prisma.StringFilter<"License"> | string;
    name?: Prisma.StringFilter<"License"> | string;
    productKey?: Prisma.StringNullableFilter<"License"> | string | null;
    productKeyMask?: Prisma.StringNullableFilter<"License"> | string | null;
    vendorId?: Prisma.StringNullableFilter<"License"> | string | null;
    seatsTotal?: Prisma.IntFilter<"License"> | number;
    purchaseDate?: Prisma.DateTimeFilter<"License"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"License"> | Date | string | null;
    cost?: Prisma.DecimalNullableFilter<"License"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"License"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"License"> | Date | string;
    vendor?: Prisma.XOR<Prisma.VendorNullableScalarRelationFilter, Prisma.VendorWhereInput> | null;
    assignments?: Prisma.LicenseAssignmentListRelationFilter;
    softwareLinks?: Prisma.SoftwareLicenseLinkListRelationFilter;
};
export type LicenseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    productKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    productKeyMask?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    seatsTotal?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    vendor?: Prisma.VendorOrderByWithRelationInput;
    assignments?: Prisma.LicenseAssignmentOrderByRelationAggregateInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkOrderByRelationAggregateInput;
};
export type LicenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LicenseWhereInput | Prisma.LicenseWhereInput[];
    OR?: Prisma.LicenseWhereInput[];
    NOT?: Prisma.LicenseWhereInput | Prisma.LicenseWhereInput[];
    name?: Prisma.StringFilter<"License"> | string;
    productKey?: Prisma.StringNullableFilter<"License"> | string | null;
    productKeyMask?: Prisma.StringNullableFilter<"License"> | string | null;
    vendorId?: Prisma.StringNullableFilter<"License"> | string | null;
    seatsTotal?: Prisma.IntFilter<"License"> | number;
    purchaseDate?: Prisma.DateTimeFilter<"License"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"License"> | Date | string | null;
    cost?: Prisma.DecimalNullableFilter<"License"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"License"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"License"> | Date | string;
    vendor?: Prisma.XOR<Prisma.VendorNullableScalarRelationFilter, Prisma.VendorWhereInput> | null;
    assignments?: Prisma.LicenseAssignmentListRelationFilter;
    softwareLinks?: Prisma.SoftwareLicenseLinkListRelationFilter;
}, "id">;
export type LicenseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    productKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    productKeyMask?: Prisma.SortOrderInput | Prisma.SortOrder;
    vendorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    seatsTotal?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LicenseCountOrderByAggregateInput;
    _avg?: Prisma.LicenseAvgOrderByAggregateInput;
    _max?: Prisma.LicenseMaxOrderByAggregateInput;
    _min?: Prisma.LicenseMinOrderByAggregateInput;
    _sum?: Prisma.LicenseSumOrderByAggregateInput;
};
export type LicenseScalarWhereWithAggregatesInput = {
    AND?: Prisma.LicenseScalarWhereWithAggregatesInput | Prisma.LicenseScalarWhereWithAggregatesInput[];
    OR?: Prisma.LicenseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LicenseScalarWhereWithAggregatesInput | Prisma.LicenseScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"License"> | string;
    name?: Prisma.StringWithAggregatesFilter<"License"> | string;
    productKey?: Prisma.StringNullableWithAggregatesFilter<"License"> | string | null;
    productKeyMask?: Prisma.StringNullableWithAggregatesFilter<"License"> | string | null;
    vendorId?: Prisma.StringNullableWithAggregatesFilter<"License"> | string | null;
    seatsTotal?: Prisma.IntWithAggregatesFilter<"License"> | number;
    purchaseDate?: Prisma.DateTimeWithAggregatesFilter<"License"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableWithAggregatesFilter<"License"> | Date | string | null;
    cost?: Prisma.DecimalNullableWithAggregatesFilter<"License"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"License"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"License"> | Date | string;
};
export type LicenseCreateInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vendor?: Prisma.VendorCreateNestedOneWithoutLicensesInput;
    assignments?: Prisma.LicenseAssignmentCreateNestedManyWithoutLicenseInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkCreateNestedManyWithoutLicenseInput;
};
export type LicenseUncheckedCreateInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    vendorId?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.LicenseAssignmentUncheckedCreateNestedManyWithoutLicenseInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUncheckedCreateNestedManyWithoutLicenseInput;
};
export type LicenseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vendor?: Prisma.VendorUpdateOneWithoutLicensesNestedInput;
    assignments?: Prisma.LicenseAssignmentUpdateManyWithoutLicenseNestedInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUpdateManyWithoutLicenseNestedInput;
};
export type LicenseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vendorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.LicenseAssignmentUncheckedUpdateManyWithoutLicenseNestedInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUncheckedUpdateManyWithoutLicenseNestedInput;
};
export type LicenseCreateManyInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    vendorId?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LicenseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicenseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vendorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicenseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    productKey?: Prisma.SortOrder;
    productKeyMask?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    seatsTotal?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LicenseAvgOrderByAggregateInput = {
    seatsTotal?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type LicenseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    productKey?: Prisma.SortOrder;
    productKeyMask?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    seatsTotal?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LicenseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    productKey?: Prisma.SortOrder;
    productKeyMask?: Prisma.SortOrder;
    vendorId?: Prisma.SortOrder;
    seatsTotal?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LicenseSumOrderByAggregateInput = {
    seatsTotal?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type LicenseScalarRelationFilter = {
    is?: Prisma.LicenseWhereInput;
    isNot?: Prisma.LicenseWhereInput;
};
export type LicenseListRelationFilter = {
    every?: Prisma.LicenseWhereInput;
    some?: Prisma.LicenseWhereInput;
    none?: Prisma.LicenseWhereInput;
};
export type LicenseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LicenseCreateNestedOneWithoutAssignmentsInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutAssignmentsInput, Prisma.LicenseUncheckedCreateWithoutAssignmentsInput>;
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutAssignmentsInput;
    connect?: Prisma.LicenseWhereUniqueInput;
};
export type LicenseUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutAssignmentsInput, Prisma.LicenseUncheckedCreateWithoutAssignmentsInput>;
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutAssignmentsInput;
    upsert?: Prisma.LicenseUpsertWithoutAssignmentsInput;
    connect?: Prisma.LicenseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LicenseUpdateToOneWithWhereWithoutAssignmentsInput, Prisma.LicenseUpdateWithoutAssignmentsInput>, Prisma.LicenseUncheckedUpdateWithoutAssignmentsInput>;
};
export type LicenseCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutVendorInput, Prisma.LicenseUncheckedCreateWithoutVendorInput> | Prisma.LicenseCreateWithoutVendorInput[] | Prisma.LicenseUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutVendorInput | Prisma.LicenseCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.LicenseCreateManyVendorInputEnvelope;
    connect?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
};
export type LicenseUncheckedCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutVendorInput, Prisma.LicenseUncheckedCreateWithoutVendorInput> | Prisma.LicenseCreateWithoutVendorInput[] | Prisma.LicenseUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutVendorInput | Prisma.LicenseCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.LicenseCreateManyVendorInputEnvelope;
    connect?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
};
export type LicenseUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutVendorInput, Prisma.LicenseUncheckedCreateWithoutVendorInput> | Prisma.LicenseCreateWithoutVendorInput[] | Prisma.LicenseUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutVendorInput | Prisma.LicenseCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.LicenseUpsertWithWhereUniqueWithoutVendorInput | Prisma.LicenseUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.LicenseCreateManyVendorInputEnvelope;
    set?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    disconnect?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    delete?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    connect?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    update?: Prisma.LicenseUpdateWithWhereUniqueWithoutVendorInput | Prisma.LicenseUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.LicenseUpdateManyWithWhereWithoutVendorInput | Prisma.LicenseUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.LicenseScalarWhereInput | Prisma.LicenseScalarWhereInput[];
};
export type LicenseUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutVendorInput, Prisma.LicenseUncheckedCreateWithoutVendorInput> | Prisma.LicenseCreateWithoutVendorInput[] | Prisma.LicenseUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutVendorInput | Prisma.LicenseCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.LicenseUpsertWithWhereUniqueWithoutVendorInput | Prisma.LicenseUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.LicenseCreateManyVendorInputEnvelope;
    set?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    disconnect?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    delete?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    connect?: Prisma.LicenseWhereUniqueInput | Prisma.LicenseWhereUniqueInput[];
    update?: Prisma.LicenseUpdateWithWhereUniqueWithoutVendorInput | Prisma.LicenseUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.LicenseUpdateManyWithWhereWithoutVendorInput | Prisma.LicenseUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.LicenseScalarWhereInput | Prisma.LicenseScalarWhereInput[];
};
export type LicenseCreateNestedOneWithoutSoftwareLinksInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutSoftwareLinksInput, Prisma.LicenseUncheckedCreateWithoutSoftwareLinksInput>;
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutSoftwareLinksInput;
    connect?: Prisma.LicenseWhereUniqueInput;
};
export type LicenseUpdateOneRequiredWithoutSoftwareLinksNestedInput = {
    create?: Prisma.XOR<Prisma.LicenseCreateWithoutSoftwareLinksInput, Prisma.LicenseUncheckedCreateWithoutSoftwareLinksInput>;
    connectOrCreate?: Prisma.LicenseCreateOrConnectWithoutSoftwareLinksInput;
    upsert?: Prisma.LicenseUpsertWithoutSoftwareLinksInput;
    connect?: Prisma.LicenseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LicenseUpdateToOneWithWhereWithoutSoftwareLinksInput, Prisma.LicenseUpdateWithoutSoftwareLinksInput>, Prisma.LicenseUncheckedUpdateWithoutSoftwareLinksInput>;
};
export type LicenseCreateWithoutAssignmentsInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vendor?: Prisma.VendorCreateNestedOneWithoutLicensesInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkCreateNestedManyWithoutLicenseInput;
};
export type LicenseUncheckedCreateWithoutAssignmentsInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    vendorId?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    softwareLinks?: Prisma.SoftwareLicenseLinkUncheckedCreateNestedManyWithoutLicenseInput;
};
export type LicenseCreateOrConnectWithoutAssignmentsInput = {
    where: Prisma.LicenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicenseCreateWithoutAssignmentsInput, Prisma.LicenseUncheckedCreateWithoutAssignmentsInput>;
};
export type LicenseUpsertWithoutAssignmentsInput = {
    update: Prisma.XOR<Prisma.LicenseUpdateWithoutAssignmentsInput, Prisma.LicenseUncheckedUpdateWithoutAssignmentsInput>;
    create: Prisma.XOR<Prisma.LicenseCreateWithoutAssignmentsInput, Prisma.LicenseUncheckedCreateWithoutAssignmentsInput>;
    where?: Prisma.LicenseWhereInput;
};
export type LicenseUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: Prisma.LicenseWhereInput;
    data: Prisma.XOR<Prisma.LicenseUpdateWithoutAssignmentsInput, Prisma.LicenseUncheckedUpdateWithoutAssignmentsInput>;
};
export type LicenseUpdateWithoutAssignmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vendor?: Prisma.VendorUpdateOneWithoutLicensesNestedInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUpdateManyWithoutLicenseNestedInput;
};
export type LicenseUncheckedUpdateWithoutAssignmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vendorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    softwareLinks?: Prisma.SoftwareLicenseLinkUncheckedUpdateManyWithoutLicenseNestedInput;
};
export type LicenseCreateWithoutVendorInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.LicenseAssignmentCreateNestedManyWithoutLicenseInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkCreateNestedManyWithoutLicenseInput;
};
export type LicenseUncheckedCreateWithoutVendorInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.LicenseAssignmentUncheckedCreateNestedManyWithoutLicenseInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUncheckedCreateNestedManyWithoutLicenseInput;
};
export type LicenseCreateOrConnectWithoutVendorInput = {
    where: Prisma.LicenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicenseCreateWithoutVendorInput, Prisma.LicenseUncheckedCreateWithoutVendorInput>;
};
export type LicenseCreateManyVendorInputEnvelope = {
    data: Prisma.LicenseCreateManyVendorInput | Prisma.LicenseCreateManyVendorInput[];
    skipDuplicates?: boolean;
};
export type LicenseUpsertWithWhereUniqueWithoutVendorInput = {
    where: Prisma.LicenseWhereUniqueInput;
    update: Prisma.XOR<Prisma.LicenseUpdateWithoutVendorInput, Prisma.LicenseUncheckedUpdateWithoutVendorInput>;
    create: Prisma.XOR<Prisma.LicenseCreateWithoutVendorInput, Prisma.LicenseUncheckedCreateWithoutVendorInput>;
};
export type LicenseUpdateWithWhereUniqueWithoutVendorInput = {
    where: Prisma.LicenseWhereUniqueInput;
    data: Prisma.XOR<Prisma.LicenseUpdateWithoutVendorInput, Prisma.LicenseUncheckedUpdateWithoutVendorInput>;
};
export type LicenseUpdateManyWithWhereWithoutVendorInput = {
    where: Prisma.LicenseScalarWhereInput;
    data: Prisma.XOR<Prisma.LicenseUpdateManyMutationInput, Prisma.LicenseUncheckedUpdateManyWithoutVendorInput>;
};
export type LicenseScalarWhereInput = {
    AND?: Prisma.LicenseScalarWhereInput | Prisma.LicenseScalarWhereInput[];
    OR?: Prisma.LicenseScalarWhereInput[];
    NOT?: Prisma.LicenseScalarWhereInput | Prisma.LicenseScalarWhereInput[];
    id?: Prisma.StringFilter<"License"> | string;
    name?: Prisma.StringFilter<"License"> | string;
    productKey?: Prisma.StringNullableFilter<"License"> | string | null;
    productKeyMask?: Prisma.StringNullableFilter<"License"> | string | null;
    vendorId?: Prisma.StringNullableFilter<"License"> | string | null;
    seatsTotal?: Prisma.IntFilter<"License"> | number;
    purchaseDate?: Prisma.DateTimeFilter<"License"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"License"> | Date | string | null;
    cost?: Prisma.DecimalNullableFilter<"License"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"License"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"License"> | Date | string;
};
export type LicenseCreateWithoutSoftwareLinksInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vendor?: Prisma.VendorCreateNestedOneWithoutLicensesInput;
    assignments?: Prisma.LicenseAssignmentCreateNestedManyWithoutLicenseInput;
};
export type LicenseUncheckedCreateWithoutSoftwareLinksInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    vendorId?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.LicenseAssignmentUncheckedCreateNestedManyWithoutLicenseInput;
};
export type LicenseCreateOrConnectWithoutSoftwareLinksInput = {
    where: Prisma.LicenseWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicenseCreateWithoutSoftwareLinksInput, Prisma.LicenseUncheckedCreateWithoutSoftwareLinksInput>;
};
export type LicenseUpsertWithoutSoftwareLinksInput = {
    update: Prisma.XOR<Prisma.LicenseUpdateWithoutSoftwareLinksInput, Prisma.LicenseUncheckedUpdateWithoutSoftwareLinksInput>;
    create: Prisma.XOR<Prisma.LicenseCreateWithoutSoftwareLinksInput, Prisma.LicenseUncheckedCreateWithoutSoftwareLinksInput>;
    where?: Prisma.LicenseWhereInput;
};
export type LicenseUpdateToOneWithWhereWithoutSoftwareLinksInput = {
    where?: Prisma.LicenseWhereInput;
    data: Prisma.XOR<Prisma.LicenseUpdateWithoutSoftwareLinksInput, Prisma.LicenseUncheckedUpdateWithoutSoftwareLinksInput>;
};
export type LicenseUpdateWithoutSoftwareLinksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vendor?: Prisma.VendorUpdateOneWithoutLicensesNestedInput;
    assignments?: Prisma.LicenseAssignmentUpdateManyWithoutLicenseNestedInput;
};
export type LicenseUncheckedUpdateWithoutSoftwareLinksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vendorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.LicenseAssignmentUncheckedUpdateManyWithoutLicenseNestedInput;
};
export type LicenseCreateManyVendorInput = {
    id?: string;
    name: string;
    productKey?: string | null;
    productKeyMask?: string | null;
    seatsTotal?: number;
    purchaseDate: Date | string;
    expiryDate?: Date | string | null;
    cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LicenseUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.LicenseAssignmentUpdateManyWithoutLicenseNestedInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUpdateManyWithoutLicenseNestedInput;
};
export type LicenseUncheckedUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.LicenseAssignmentUncheckedUpdateManyWithoutLicenseNestedInput;
    softwareLinks?: Prisma.SoftwareLicenseLinkUncheckedUpdateManyWithoutLicenseNestedInput;
};
export type LicenseUncheckedUpdateManyWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    productKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productKeyMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    seatsTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type LicenseCountOutputType
 */
export type LicenseCountOutputType = {
    assignments: number;
    softwareLinks: number;
};
export type LicenseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assignments?: boolean | LicenseCountOutputTypeCountAssignmentsArgs;
    softwareLinks?: boolean | LicenseCountOutputTypeCountSoftwareLinksArgs;
};
/**
 * LicenseCountOutputType without action
 */
export type LicenseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseCountOutputType
     */
    select?: Prisma.LicenseCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * LicenseCountOutputType without action
 */
export type LicenseCountOutputTypeCountAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicenseAssignmentWhereInput;
};
/**
 * LicenseCountOutputType without action
 */
export type LicenseCountOutputTypeCountSoftwareLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareLicenseLinkWhereInput;
};
export type LicenseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    productKey?: boolean;
    productKeyMask?: boolean;
    vendorId?: boolean;
    seatsTotal?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    vendor?: boolean | Prisma.License$vendorArgs<ExtArgs>;
    assignments?: boolean | Prisma.License$assignmentsArgs<ExtArgs>;
    softwareLinks?: boolean | Prisma.License$softwareLinksArgs<ExtArgs>;
    _count?: boolean | Prisma.LicenseCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["license"]>;
export type LicenseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    productKey?: boolean;
    productKeyMask?: boolean;
    vendorId?: boolean;
    seatsTotal?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    vendor?: boolean | Prisma.License$vendorArgs<ExtArgs>;
}, ExtArgs["result"]["license"]>;
export type LicenseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    productKey?: boolean;
    productKeyMask?: boolean;
    vendorId?: boolean;
    seatsTotal?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    vendor?: boolean | Prisma.License$vendorArgs<ExtArgs>;
}, ExtArgs["result"]["license"]>;
export type LicenseSelectScalar = {
    id?: boolean;
    name?: boolean;
    productKey?: boolean;
    productKeyMask?: boolean;
    vendorId?: boolean;
    seatsTotal?: boolean;
    purchaseDate?: boolean;
    expiryDate?: boolean;
    cost?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LicenseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "productKey" | "productKeyMask" | "vendorId" | "seatsTotal" | "purchaseDate" | "expiryDate" | "cost" | "createdAt" | "updatedAt", ExtArgs["result"]["license"]>;
export type LicenseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.License$vendorArgs<ExtArgs>;
    assignments?: boolean | Prisma.License$assignmentsArgs<ExtArgs>;
    softwareLinks?: boolean | Prisma.License$softwareLinksArgs<ExtArgs>;
    _count?: boolean | Prisma.LicenseCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LicenseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.License$vendorArgs<ExtArgs>;
};
export type LicenseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.License$vendorArgs<ExtArgs>;
};
export type $LicensePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "License";
    objects: {
        vendor: Prisma.$VendorPayload<ExtArgs> | null;
        assignments: Prisma.$LicenseAssignmentPayload<ExtArgs>[];
        softwareLinks: Prisma.$SoftwareLicenseLinkPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        productKey: string | null;
        productKeyMask: string | null;
        vendorId: string | null;
        seatsTotal: number;
        purchaseDate: Date;
        expiryDate: Date | null;
        cost: runtime.Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["license"]>;
    composites: {};
};
export type LicenseGetPayload<S extends boolean | null | undefined | LicenseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LicensePayload, S>;
export type LicenseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LicenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LicenseCountAggregateInputType | true;
};
export interface LicenseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['License'];
        meta: {
            name: 'License';
        };
    };
    /**
     * Find zero or one License that matches the filter.
     * @param {LicenseFindUniqueArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LicenseFindUniqueArgs>(args: Prisma.SelectSubset<T, LicenseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one License that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LicenseFindUniqueOrThrowArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LicenseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LicenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first License that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseFindFirstArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LicenseFindFirstArgs>(args?: Prisma.SelectSubset<T, LicenseFindFirstArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first License that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseFindFirstOrThrowArgs} args - Arguments to find a License
     * @example
     * // Get one License
     * const license = await prisma.license.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LicenseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LicenseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Licenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Licenses
     * const licenses = await prisma.license.findMany()
     *
     * // Get first 10 Licenses
     * const licenses = await prisma.license.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const licenseWithIdOnly = await prisma.license.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LicenseFindManyArgs>(args?: Prisma.SelectSubset<T, LicenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a License.
     * @param {LicenseCreateArgs} args - Arguments to create a License.
     * @example
     * // Create one License
     * const License = await prisma.license.create({
     *   data: {
     *     // ... data to create a License
     *   }
     * })
     *
     */
    create<T extends LicenseCreateArgs>(args: Prisma.SelectSubset<T, LicenseCreateArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Licenses.
     * @param {LicenseCreateManyArgs} args - Arguments to create many Licenses.
     * @example
     * // Create many Licenses
     * const license = await prisma.license.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LicenseCreateManyArgs>(args?: Prisma.SelectSubset<T, LicenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Licenses and returns the data saved in the database.
     * @param {LicenseCreateManyAndReturnArgs} args - Arguments to create many Licenses.
     * @example
     * // Create many Licenses
     * const license = await prisma.license.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Licenses and only return the `id`
     * const licenseWithIdOnly = await prisma.license.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LicenseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LicenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a License.
     * @param {LicenseDeleteArgs} args - Arguments to delete one License.
     * @example
     * // Delete one License
     * const License = await prisma.license.delete({
     *   where: {
     *     // ... filter to delete one License
     *   }
     * })
     *
     */
    delete<T extends LicenseDeleteArgs>(args: Prisma.SelectSubset<T, LicenseDeleteArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one License.
     * @param {LicenseUpdateArgs} args - Arguments to update one License.
     * @example
     * // Update one License
     * const license = await prisma.license.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LicenseUpdateArgs>(args: Prisma.SelectSubset<T, LicenseUpdateArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Licenses.
     * @param {LicenseDeleteManyArgs} args - Arguments to filter Licenses to delete.
     * @example
     * // Delete a few Licenses
     * const { count } = await prisma.license.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LicenseDeleteManyArgs>(args?: Prisma.SelectSubset<T, LicenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Licenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Licenses
     * const license = await prisma.license.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LicenseUpdateManyArgs>(args: Prisma.SelectSubset<T, LicenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Licenses and returns the data updated in the database.
     * @param {LicenseUpdateManyAndReturnArgs} args - Arguments to update many Licenses.
     * @example
     * // Update many Licenses
     * const license = await prisma.license.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Licenses and only return the `id`
     * const licenseWithIdOnly = await prisma.license.updateManyAndReturn({
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
    updateManyAndReturn<T extends LicenseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LicenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one License.
     * @param {LicenseUpsertArgs} args - Arguments to update or create a License.
     * @example
     * // Update or create a License
     * const license = await prisma.license.upsert({
     *   create: {
     *     // ... data to create a License
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the License we want to update
     *   }
     * })
     */
    upsert<T extends LicenseUpsertArgs>(args: Prisma.SelectSubset<T, LicenseUpsertArgs<ExtArgs>>): Prisma.Prisma__LicenseClient<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Licenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseCountArgs} args - Arguments to filter Licenses to count.
     * @example
     * // Count the number of Licenses
     * const count = await prisma.license.count({
     *   where: {
     *     // ... the filter for the Licenses we want to count
     *   }
     * })
    **/
    count<T extends LicenseCountArgs>(args?: Prisma.Subset<T, LicenseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LicenseCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a License.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LicenseAggregateArgs>(args: Prisma.Subset<T, LicenseAggregateArgs>): Prisma.PrismaPromise<GetLicenseAggregateType<T>>;
    /**
     * Group by License.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LicenseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LicenseGroupByArgs['orderBy'];
    } : {
        orderBy?: LicenseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LicenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLicenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the License model
     */
    readonly fields: LicenseFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for License.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LicenseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vendor<T extends Prisma.License$vendorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.License$vendorArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    assignments<T extends Prisma.License$assignmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.License$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicenseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    softwareLinks<T extends Prisma.License$softwareLinksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.License$softwareLinksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareLicenseLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the License model
 */
export interface LicenseFieldRefs {
    readonly id: Prisma.FieldRef<"License", 'String'>;
    readonly name: Prisma.FieldRef<"License", 'String'>;
    readonly productKey: Prisma.FieldRef<"License", 'String'>;
    readonly productKeyMask: Prisma.FieldRef<"License", 'String'>;
    readonly vendorId: Prisma.FieldRef<"License", 'String'>;
    readonly seatsTotal: Prisma.FieldRef<"License", 'Int'>;
    readonly purchaseDate: Prisma.FieldRef<"License", 'DateTime'>;
    readonly expiryDate: Prisma.FieldRef<"License", 'DateTime'>;
    readonly cost: Prisma.FieldRef<"License", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"License", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"License", 'DateTime'>;
}
/**
 * License findUnique
 */
export type LicenseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * Filter, which License to fetch.
     */
    where: Prisma.LicenseWhereUniqueInput;
};
/**
 * License findUniqueOrThrow
 */
export type LicenseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * Filter, which License to fetch.
     */
    where: Prisma.LicenseWhereUniqueInput;
};
/**
 * License findFirst
 */
export type LicenseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * Filter, which License to fetch.
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Licenses to fetch.
     */
    orderBy?: Prisma.LicenseOrderByWithRelationInput | Prisma.LicenseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Licenses.
     */
    cursor?: Prisma.LicenseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Licenses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Licenses.
     */
    distinct?: Prisma.LicenseScalarFieldEnum | Prisma.LicenseScalarFieldEnum[];
};
/**
 * License findFirstOrThrow
 */
export type LicenseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * Filter, which License to fetch.
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Licenses to fetch.
     */
    orderBy?: Prisma.LicenseOrderByWithRelationInput | Prisma.LicenseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Licenses.
     */
    cursor?: Prisma.LicenseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Licenses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Licenses.
     */
    distinct?: Prisma.LicenseScalarFieldEnum | Prisma.LicenseScalarFieldEnum[];
};
/**
 * License findMany
 */
export type LicenseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * Filter, which Licenses to fetch.
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Licenses to fetch.
     */
    orderBy?: Prisma.LicenseOrderByWithRelationInput | Prisma.LicenseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Licenses.
     */
    cursor?: Prisma.LicenseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Licenses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Licenses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Licenses.
     */
    distinct?: Prisma.LicenseScalarFieldEnum | Prisma.LicenseScalarFieldEnum[];
};
/**
 * License create
 */
export type LicenseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * The data needed to create a License.
     */
    data: Prisma.XOR<Prisma.LicenseCreateInput, Prisma.LicenseUncheckedCreateInput>;
};
/**
 * License createMany
 */
export type LicenseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Licenses.
     */
    data: Prisma.LicenseCreateManyInput | Prisma.LicenseCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * License createManyAndReturn
 */
export type LicenseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * The data used to create many Licenses.
     */
    data: Prisma.LicenseCreateManyInput | Prisma.LicenseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * License update
 */
export type LicenseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * The data needed to update a License.
     */
    data: Prisma.XOR<Prisma.LicenseUpdateInput, Prisma.LicenseUncheckedUpdateInput>;
    /**
     * Choose, which License to update.
     */
    where: Prisma.LicenseWhereUniqueInput;
};
/**
 * License updateMany
 */
export type LicenseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Licenses.
     */
    data: Prisma.XOR<Prisma.LicenseUpdateManyMutationInput, Prisma.LicenseUncheckedUpdateManyInput>;
    /**
     * Filter which Licenses to update
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * Limit how many Licenses to update.
     */
    limit?: number;
};
/**
 * License updateManyAndReturn
 */
export type LicenseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * The data used to update Licenses.
     */
    data: Prisma.XOR<Prisma.LicenseUpdateManyMutationInput, Prisma.LicenseUncheckedUpdateManyInput>;
    /**
     * Filter which Licenses to update
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * Limit how many Licenses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * License upsert
 */
export type LicenseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * The filter to search for the License to update in case it exists.
     */
    where: Prisma.LicenseWhereUniqueInput;
    /**
     * In case the License found by the `where` argument doesn't exist, create a new License with this data.
     */
    create: Prisma.XOR<Prisma.LicenseCreateInput, Prisma.LicenseUncheckedCreateInput>;
    /**
     * In case the License was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LicenseUpdateInput, Prisma.LicenseUncheckedUpdateInput>;
};
/**
 * License delete
 */
export type LicenseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
    /**
     * Filter which License to delete.
     */
    where: Prisma.LicenseWhereUniqueInput;
};
/**
 * License deleteMany
 */
export type LicenseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Licenses to delete
     */
    where?: Prisma.LicenseWhereInput;
    /**
     * Limit how many Licenses to delete.
     */
    limit?: number;
};
/**
 * License.vendor
 */
export type License$vendorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: Prisma.VendorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vendor
     */
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where?: Prisma.VendorWhereInput;
};
/**
 * License.assignments
 */
export type License$assignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseAssignment
     */
    select?: Prisma.LicenseAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LicenseAssignment
     */
    omit?: Prisma.LicenseAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseAssignmentInclude<ExtArgs> | null;
    where?: Prisma.LicenseAssignmentWhereInput;
    orderBy?: Prisma.LicenseAssignmentOrderByWithRelationInput | Prisma.LicenseAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.LicenseAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicenseAssignmentScalarFieldEnum | Prisma.LicenseAssignmentScalarFieldEnum[];
};
/**
 * License.softwareLinks
 */
export type License$softwareLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareLicenseLink
     */
    select?: Prisma.SoftwareLicenseLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareLicenseLink
     */
    omit?: Prisma.SoftwareLicenseLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareLicenseLinkInclude<ExtArgs> | null;
    where?: Prisma.SoftwareLicenseLinkWhereInput;
    orderBy?: Prisma.SoftwareLicenseLinkOrderByWithRelationInput | Prisma.SoftwareLicenseLinkOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareLicenseLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareLicenseLinkScalarFieldEnum | Prisma.SoftwareLicenseLinkScalarFieldEnum[];
};
/**
 * License without action
 */
export type LicenseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the License
     */
    select?: Prisma.LicenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the License
     */
    omit?: Prisma.LicenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LicenseInclude<ExtArgs> | null;
};
//# sourceMappingURL=License.d.ts.map