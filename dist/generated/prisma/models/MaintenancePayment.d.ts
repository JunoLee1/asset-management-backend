import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MaintenancePayment
 *
 */
export type MaintenancePaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$MaintenancePaymentPayload>;
export type AggregateMaintenancePayment = {
    _count: MaintenancePaymentCountAggregateOutputType | null;
    _avg: MaintenancePaymentAvgAggregateOutputType | null;
    _sum: MaintenancePaymentSumAggregateOutputType | null;
    _min: MaintenancePaymentMinAggregateOutputType | null;
    _max: MaintenancePaymentMaxAggregateOutputType | null;
};
export type MaintenancePaymentAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type MaintenancePaymentSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type MaintenancePaymentMinAggregateOutputType = {
    id: string | null;
    maintenanceId: string | null;
    direction: $Enums.PaymentDirection | null;
    amount: runtime.Decimal | null;
    paidAt: Date | null;
    note: string | null;
    paidById: string | null;
    createdAt: Date | null;
};
export type MaintenancePaymentMaxAggregateOutputType = {
    id: string | null;
    maintenanceId: string | null;
    direction: $Enums.PaymentDirection | null;
    amount: runtime.Decimal | null;
    paidAt: Date | null;
    note: string | null;
    paidById: string | null;
    createdAt: Date | null;
};
export type MaintenancePaymentCountAggregateOutputType = {
    id: number;
    maintenanceId: number;
    direction: number;
    amount: number;
    paidAt: number;
    note: number;
    paidById: number;
    createdAt: number;
    _all: number;
};
export type MaintenancePaymentAvgAggregateInputType = {
    amount?: true;
};
export type MaintenancePaymentSumAggregateInputType = {
    amount?: true;
};
export type MaintenancePaymentMinAggregateInputType = {
    id?: true;
    maintenanceId?: true;
    direction?: true;
    amount?: true;
    paidAt?: true;
    note?: true;
    paidById?: true;
    createdAt?: true;
};
export type MaintenancePaymentMaxAggregateInputType = {
    id?: true;
    maintenanceId?: true;
    direction?: true;
    amount?: true;
    paidAt?: true;
    note?: true;
    paidById?: true;
    createdAt?: true;
};
export type MaintenancePaymentCountAggregateInputType = {
    id?: true;
    maintenanceId?: true;
    direction?: true;
    amount?: true;
    paidAt?: true;
    note?: true;
    paidById?: true;
    createdAt?: true;
    _all?: true;
};
export type MaintenancePaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenancePayment to aggregate.
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePayments to fetch.
     */
    orderBy?: Prisma.MaintenancePaymentOrderByWithRelationInput | Prisma.MaintenancePaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MaintenancePaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePayments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePayments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MaintenancePayments
    **/
    _count?: true | MaintenancePaymentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MaintenancePaymentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MaintenancePaymentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MaintenancePaymentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MaintenancePaymentMaxAggregateInputType;
};
export type GetMaintenancePaymentAggregateType<T extends MaintenancePaymentAggregateArgs> = {
    [P in keyof T & keyof AggregateMaintenancePayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaintenancePayment[P]> : Prisma.GetScalarType<T[P], AggregateMaintenancePayment[P]>;
};
export type MaintenancePaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenancePaymentWhereInput;
    orderBy?: Prisma.MaintenancePaymentOrderByWithAggregationInput | Prisma.MaintenancePaymentOrderByWithAggregationInput[];
    by: Prisma.MaintenancePaymentScalarFieldEnum[] | Prisma.MaintenancePaymentScalarFieldEnum;
    having?: Prisma.MaintenancePaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaintenancePaymentCountAggregateInputType | true;
    _avg?: MaintenancePaymentAvgAggregateInputType;
    _sum?: MaintenancePaymentSumAggregateInputType;
    _min?: MaintenancePaymentMinAggregateInputType;
    _max?: MaintenancePaymentMaxAggregateInputType;
};
export type MaintenancePaymentGroupByOutputType = {
    id: string;
    maintenanceId: string;
    direction: $Enums.PaymentDirection;
    amount: runtime.Decimal | null;
    paidAt: Date;
    note: string | null;
    paidById: string;
    createdAt: Date;
    _count: MaintenancePaymentCountAggregateOutputType | null;
    _avg: MaintenancePaymentAvgAggregateOutputType | null;
    _sum: MaintenancePaymentSumAggregateOutputType | null;
    _min: MaintenancePaymentMinAggregateOutputType | null;
    _max: MaintenancePaymentMaxAggregateOutputType | null;
};
export type GetMaintenancePaymentGroupByPayload<T extends MaintenancePaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaintenancePaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaintenancePaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaintenancePaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaintenancePaymentGroupByOutputType[P]>;
}>>;
export type MaintenancePaymentWhereInput = {
    AND?: Prisma.MaintenancePaymentWhereInput | Prisma.MaintenancePaymentWhereInput[];
    OR?: Prisma.MaintenancePaymentWhereInput[];
    NOT?: Prisma.MaintenancePaymentWhereInput | Prisma.MaintenancePaymentWhereInput[];
    id?: Prisma.StringFilter<"MaintenancePayment"> | string;
    maintenanceId?: Prisma.StringFilter<"MaintenancePayment"> | string;
    direction?: Prisma.EnumPaymentDirectionFilter<"MaintenancePayment"> | $Enums.PaymentDirection;
    amount?: Prisma.DecimalNullableFilter<"MaintenancePayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFilter<"MaintenancePayment"> | Date | string;
    note?: Prisma.StringNullableFilter<"MaintenancePayment"> | string | null;
    paidById?: Prisma.StringFilter<"MaintenancePayment"> | string;
    createdAt?: Prisma.DateTimeFilter<"MaintenancePayment"> | Date | string;
    maintenance?: Prisma.XOR<Prisma.MaintenanceScalarRelationFilter, Prisma.MaintenanceWhereInput>;
    paidBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MaintenancePaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    maintenanceId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    maintenance?: Prisma.MaintenanceOrderByWithRelationInput;
    paidBy?: Prisma.UserOrderByWithRelationInput;
};
export type MaintenancePaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    maintenanceId_direction?: Prisma.MaintenancePaymentMaintenanceIdDirectionCompoundUniqueInput;
    AND?: Prisma.MaintenancePaymentWhereInput | Prisma.MaintenancePaymentWhereInput[];
    OR?: Prisma.MaintenancePaymentWhereInput[];
    NOT?: Prisma.MaintenancePaymentWhereInput | Prisma.MaintenancePaymentWhereInput[];
    maintenanceId?: Prisma.StringFilter<"MaintenancePayment"> | string;
    direction?: Prisma.EnumPaymentDirectionFilter<"MaintenancePayment"> | $Enums.PaymentDirection;
    amount?: Prisma.DecimalNullableFilter<"MaintenancePayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFilter<"MaintenancePayment"> | Date | string;
    note?: Prisma.StringNullableFilter<"MaintenancePayment"> | string | null;
    paidById?: Prisma.StringFilter<"MaintenancePayment"> | string;
    createdAt?: Prisma.DateTimeFilter<"MaintenancePayment"> | Date | string;
    maintenance?: Prisma.XOR<Prisma.MaintenanceScalarRelationFilter, Prisma.MaintenanceWhereInput>;
    paidBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "maintenanceId_direction">;
export type MaintenancePaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    maintenanceId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amount?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    paidById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MaintenancePaymentCountOrderByAggregateInput;
    _avg?: Prisma.MaintenancePaymentAvgOrderByAggregateInput;
    _max?: Prisma.MaintenancePaymentMaxOrderByAggregateInput;
    _min?: Prisma.MaintenancePaymentMinOrderByAggregateInput;
    _sum?: Prisma.MaintenancePaymentSumOrderByAggregateInput;
};
export type MaintenancePaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaintenancePaymentScalarWhereWithAggregatesInput | Prisma.MaintenancePaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaintenancePaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaintenancePaymentScalarWhereWithAggregatesInput | Prisma.MaintenancePaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MaintenancePayment"> | string;
    maintenanceId?: Prisma.StringWithAggregatesFilter<"MaintenancePayment"> | string;
    direction?: Prisma.EnumPaymentDirectionWithAggregatesFilter<"MaintenancePayment"> | $Enums.PaymentDirection;
    amount?: Prisma.DecimalNullableWithAggregatesFilter<"MaintenancePayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenancePayment"> | Date | string;
    note?: Prisma.StringNullableWithAggregatesFilter<"MaintenancePayment"> | string | null;
    paidById?: Prisma.StringWithAggregatesFilter<"MaintenancePayment"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenancePayment"> | Date | string;
};
export type MaintenancePaymentCreateInput = {
    id?: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    maintenance: Prisma.MaintenanceCreateNestedOneWithoutPaymentsInput;
    paidBy: Prisma.UserCreateNestedOneWithoutMaintenancePaymentRecordsInput;
};
export type MaintenancePaymentUncheckedCreateInput = {
    id?: string;
    maintenanceId: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    paidById: string;
    createdAt?: Date | string;
};
export type MaintenancePaymentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenance?: Prisma.MaintenanceUpdateOneRequiredWithoutPaymentsNestedInput;
    paidBy?: Prisma.UserUpdateOneRequiredWithoutMaintenancePaymentRecordsNestedInput;
};
export type MaintenancePaymentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentCreateManyInput = {
    id?: string;
    maintenanceId: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    paidById: string;
    createdAt?: Date | string;
};
export type MaintenancePaymentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentListRelationFilter = {
    every?: Prisma.MaintenancePaymentWhereInput;
    some?: Prisma.MaintenancePaymentWhereInput;
    none?: Prisma.MaintenancePaymentWhereInput;
};
export type MaintenancePaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaintenancePaymentMaintenanceIdDirectionCompoundUniqueInput = {
    maintenanceId: string;
    direction: $Enums.PaymentDirection;
};
export type MaintenancePaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenanceId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    paidById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MaintenancePaymentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type MaintenancePaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenanceId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    paidById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MaintenancePaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenanceId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    paidById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MaintenancePaymentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type MaintenancePaymentCreateNestedManyWithoutPaidByInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput> | Prisma.MaintenancePaymentCreateWithoutPaidByInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput | Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyPaidByInputEnvelope;
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
};
export type MaintenancePaymentUncheckedCreateNestedManyWithoutPaidByInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput> | Prisma.MaintenancePaymentCreateWithoutPaidByInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput | Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyPaidByInputEnvelope;
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
};
export type MaintenancePaymentUpdateManyWithoutPaidByNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput> | Prisma.MaintenancePaymentCreateWithoutPaidByInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput | Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput[];
    upsert?: Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutPaidByInput | Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutPaidByInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyPaidByInputEnvelope;
    set?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    delete?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    update?: Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutPaidByInput | Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutPaidByInput[];
    updateMany?: Prisma.MaintenancePaymentUpdateManyWithWhereWithoutPaidByInput | Prisma.MaintenancePaymentUpdateManyWithWhereWithoutPaidByInput[];
    deleteMany?: Prisma.MaintenancePaymentScalarWhereInput | Prisma.MaintenancePaymentScalarWhereInput[];
};
export type MaintenancePaymentUncheckedUpdateManyWithoutPaidByNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput> | Prisma.MaintenancePaymentCreateWithoutPaidByInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput | Prisma.MaintenancePaymentCreateOrConnectWithoutPaidByInput[];
    upsert?: Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutPaidByInput | Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutPaidByInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyPaidByInputEnvelope;
    set?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    delete?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    update?: Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutPaidByInput | Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutPaidByInput[];
    updateMany?: Prisma.MaintenancePaymentUpdateManyWithWhereWithoutPaidByInput | Prisma.MaintenancePaymentUpdateManyWithWhereWithoutPaidByInput[];
    deleteMany?: Prisma.MaintenancePaymentScalarWhereInput | Prisma.MaintenancePaymentScalarWhereInput[];
};
export type MaintenancePaymentCreateNestedManyWithoutMaintenanceInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput> | Prisma.MaintenancePaymentCreateWithoutMaintenanceInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput | Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyMaintenanceInputEnvelope;
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
};
export type MaintenancePaymentUncheckedCreateNestedManyWithoutMaintenanceInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput> | Prisma.MaintenancePaymentCreateWithoutMaintenanceInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput | Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyMaintenanceInputEnvelope;
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
};
export type MaintenancePaymentUpdateManyWithoutMaintenanceNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput> | Prisma.MaintenancePaymentCreateWithoutMaintenanceInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput | Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput[];
    upsert?: Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutMaintenanceInput | Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutMaintenanceInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyMaintenanceInputEnvelope;
    set?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    delete?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    update?: Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutMaintenanceInput | Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutMaintenanceInput[];
    updateMany?: Prisma.MaintenancePaymentUpdateManyWithWhereWithoutMaintenanceInput | Prisma.MaintenancePaymentUpdateManyWithWhereWithoutMaintenanceInput[];
    deleteMany?: Prisma.MaintenancePaymentScalarWhereInput | Prisma.MaintenancePaymentScalarWhereInput[];
};
export type MaintenancePaymentUncheckedUpdateManyWithoutMaintenanceNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput> | Prisma.MaintenancePaymentCreateWithoutMaintenanceInput[] | Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput[];
    connectOrCreate?: Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput | Prisma.MaintenancePaymentCreateOrConnectWithoutMaintenanceInput[];
    upsert?: Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutMaintenanceInput | Prisma.MaintenancePaymentUpsertWithWhereUniqueWithoutMaintenanceInput[];
    createMany?: Prisma.MaintenancePaymentCreateManyMaintenanceInputEnvelope;
    set?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    delete?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    connect?: Prisma.MaintenancePaymentWhereUniqueInput | Prisma.MaintenancePaymentWhereUniqueInput[];
    update?: Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutMaintenanceInput | Prisma.MaintenancePaymentUpdateWithWhereUniqueWithoutMaintenanceInput[];
    updateMany?: Prisma.MaintenancePaymentUpdateManyWithWhereWithoutMaintenanceInput | Prisma.MaintenancePaymentUpdateManyWithWhereWithoutMaintenanceInput[];
    deleteMany?: Prisma.MaintenancePaymentScalarWhereInput | Prisma.MaintenancePaymentScalarWhereInput[];
};
export type EnumPaymentDirectionFieldUpdateOperationsInput = {
    set?: $Enums.PaymentDirection;
};
export type MaintenancePaymentCreateWithoutPaidByInput = {
    id?: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    maintenance: Prisma.MaintenanceCreateNestedOneWithoutPaymentsInput;
};
export type MaintenancePaymentUncheckedCreateWithoutPaidByInput = {
    id?: string;
    maintenanceId: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type MaintenancePaymentCreateOrConnectWithoutPaidByInput = {
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput>;
};
export type MaintenancePaymentCreateManyPaidByInputEnvelope = {
    data: Prisma.MaintenancePaymentCreateManyPaidByInput | Prisma.MaintenancePaymentCreateManyPaidByInput[];
    skipDuplicates?: boolean;
};
export type MaintenancePaymentUpsertWithWhereUniqueWithoutPaidByInput = {
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenancePaymentUpdateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedUpdateWithoutPaidByInput>;
    create: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedCreateWithoutPaidByInput>;
};
export type MaintenancePaymentUpdateWithWhereUniqueWithoutPaidByInput = {
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateWithoutPaidByInput, Prisma.MaintenancePaymentUncheckedUpdateWithoutPaidByInput>;
};
export type MaintenancePaymentUpdateManyWithWhereWithoutPaidByInput = {
    where: Prisma.MaintenancePaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateManyMutationInput, Prisma.MaintenancePaymentUncheckedUpdateManyWithoutPaidByInput>;
};
export type MaintenancePaymentScalarWhereInput = {
    AND?: Prisma.MaintenancePaymentScalarWhereInput | Prisma.MaintenancePaymentScalarWhereInput[];
    OR?: Prisma.MaintenancePaymentScalarWhereInput[];
    NOT?: Prisma.MaintenancePaymentScalarWhereInput | Prisma.MaintenancePaymentScalarWhereInput[];
    id?: Prisma.StringFilter<"MaintenancePayment"> | string;
    maintenanceId?: Prisma.StringFilter<"MaintenancePayment"> | string;
    direction?: Prisma.EnumPaymentDirectionFilter<"MaintenancePayment"> | $Enums.PaymentDirection;
    amount?: Prisma.DecimalNullableFilter<"MaintenancePayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFilter<"MaintenancePayment"> | Date | string;
    note?: Prisma.StringNullableFilter<"MaintenancePayment"> | string | null;
    paidById?: Prisma.StringFilter<"MaintenancePayment"> | string;
    createdAt?: Prisma.DateTimeFilter<"MaintenancePayment"> | Date | string;
};
export type MaintenancePaymentCreateWithoutMaintenanceInput = {
    id?: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    paidBy: Prisma.UserCreateNestedOneWithoutMaintenancePaymentRecordsInput;
};
export type MaintenancePaymentUncheckedCreateWithoutMaintenanceInput = {
    id?: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    paidById: string;
    createdAt?: Date | string;
};
export type MaintenancePaymentCreateOrConnectWithoutMaintenanceInput = {
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput>;
};
export type MaintenancePaymentCreateManyMaintenanceInputEnvelope = {
    data: Prisma.MaintenancePaymentCreateManyMaintenanceInput | Prisma.MaintenancePaymentCreateManyMaintenanceInput[];
    skipDuplicates?: boolean;
};
export type MaintenancePaymentUpsertWithWhereUniqueWithoutMaintenanceInput = {
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenancePaymentUpdateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedUpdateWithoutMaintenanceInput>;
    create: Prisma.XOR<Prisma.MaintenancePaymentCreateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedCreateWithoutMaintenanceInput>;
};
export type MaintenancePaymentUpdateWithWhereUniqueWithoutMaintenanceInput = {
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateWithoutMaintenanceInput, Prisma.MaintenancePaymentUncheckedUpdateWithoutMaintenanceInput>;
};
export type MaintenancePaymentUpdateManyWithWhereWithoutMaintenanceInput = {
    where: Prisma.MaintenancePaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateManyMutationInput, Prisma.MaintenancePaymentUncheckedUpdateManyWithoutMaintenanceInput>;
};
export type MaintenancePaymentCreateManyPaidByInput = {
    id?: string;
    maintenanceId: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type MaintenancePaymentUpdateWithoutPaidByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenance?: Prisma.MaintenanceUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type MaintenancePaymentUncheckedUpdateWithoutPaidByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentUncheckedUpdateManyWithoutPaidByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentCreateManyMaintenanceInput = {
    id?: string;
    direction: $Enums.PaymentDirection;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt: Date | string;
    note?: string | null;
    paidById: string;
    createdAt?: Date | string;
};
export type MaintenancePaymentUpdateWithoutMaintenanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    paidBy?: Prisma.UserUpdateOneRequiredWithoutMaintenancePaymentRecordsNestedInput;
};
export type MaintenancePaymentUncheckedUpdateWithoutMaintenanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentUncheckedUpdateManyWithoutMaintenanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection;
    amount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paidById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    maintenanceId?: boolean;
    direction?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    note?: boolean;
    paidById?: boolean;
    createdAt?: boolean;
    maintenance?: boolean | Prisma.MaintenanceDefaultArgs<ExtArgs>;
    paidBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maintenancePayment"]>;
export type MaintenancePaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    maintenanceId?: boolean;
    direction?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    note?: boolean;
    paidById?: boolean;
    createdAt?: boolean;
    maintenance?: boolean | Prisma.MaintenanceDefaultArgs<ExtArgs>;
    paidBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maintenancePayment"]>;
export type MaintenancePaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    maintenanceId?: boolean;
    direction?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    note?: boolean;
    paidById?: boolean;
    createdAt?: boolean;
    maintenance?: boolean | Prisma.MaintenanceDefaultArgs<ExtArgs>;
    paidBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maintenancePayment"]>;
export type MaintenancePaymentSelectScalar = {
    id?: boolean;
    maintenanceId?: boolean;
    direction?: boolean;
    amount?: boolean;
    paidAt?: boolean;
    note?: boolean;
    paidById?: boolean;
    createdAt?: boolean;
};
export type MaintenancePaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "maintenanceId" | "direction" | "amount" | "paidAt" | "note" | "paidById" | "createdAt", ExtArgs["result"]["maintenancePayment"]>;
export type MaintenancePaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenance?: boolean | Prisma.MaintenanceDefaultArgs<ExtArgs>;
    paidBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MaintenancePaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenance?: boolean | Prisma.MaintenanceDefaultArgs<ExtArgs>;
    paidBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MaintenancePaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenance?: boolean | Prisma.MaintenanceDefaultArgs<ExtArgs>;
    paidBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MaintenancePaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaintenancePayment";
    objects: {
        maintenance: Prisma.$MaintenancePayload<ExtArgs>;
        paidBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        maintenanceId: string;
        direction: $Enums.PaymentDirection;
        amount: runtime.Decimal | null;
        paidAt: Date;
        note: string | null;
        paidById: string;
        createdAt: Date;
    }, ExtArgs["result"]["maintenancePayment"]>;
    composites: {};
};
export type MaintenancePaymentGetPayload<S extends boolean | null | undefined | MaintenancePaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload, S>;
export type MaintenancePaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaintenancePaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaintenancePaymentCountAggregateInputType | true;
};
export interface MaintenancePaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaintenancePayment'];
        meta: {
            name: 'MaintenancePayment';
        };
    };
    /**
     * Find zero or one MaintenancePayment that matches the filter.
     * @param {MaintenancePaymentFindUniqueArgs} args - Arguments to find a MaintenancePayment
     * @example
     * // Get one MaintenancePayment
     * const maintenancePayment = await prisma.maintenancePayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenancePaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MaintenancePayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaintenancePaymentFindUniqueOrThrowArgs} args - Arguments to find a MaintenancePayment
     * @example
     * // Get one MaintenancePayment
     * const maintenancePayment = await prisma.maintenancePayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenancePaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenancePayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentFindFirstArgs} args - Arguments to find a MaintenancePayment
     * @example
     * // Get one MaintenancePayment
     * const maintenancePayment = await prisma.maintenancePayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenancePaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, MaintenancePaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenancePayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentFindFirstOrThrowArgs} args - Arguments to find a MaintenancePayment
     * @example
     * // Get one MaintenancePayment
     * const maintenancePayment = await prisma.maintenancePayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenancePaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaintenancePaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MaintenancePayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenancePayments
     * const maintenancePayments = await prisma.maintenancePayment.findMany()
     *
     * // Get first 10 MaintenancePayments
     * const maintenancePayments = await prisma.maintenancePayment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const maintenancePaymentWithIdOnly = await prisma.maintenancePayment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MaintenancePaymentFindManyArgs>(args?: Prisma.SelectSubset<T, MaintenancePaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MaintenancePayment.
     * @param {MaintenancePaymentCreateArgs} args - Arguments to create a MaintenancePayment.
     * @example
     * // Create one MaintenancePayment
     * const MaintenancePayment = await prisma.maintenancePayment.create({
     *   data: {
     *     // ... data to create a MaintenancePayment
     *   }
     * })
     *
     */
    create<T extends MaintenancePaymentCreateArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentCreateArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MaintenancePayments.
     * @param {MaintenancePaymentCreateManyArgs} args - Arguments to create many MaintenancePayments.
     * @example
     * // Create many MaintenancePayments
     * const maintenancePayment = await prisma.maintenancePayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MaintenancePaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, MaintenancePaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MaintenancePayments and returns the data saved in the database.
     * @param {MaintenancePaymentCreateManyAndReturnArgs} args - Arguments to create many MaintenancePayments.
     * @example
     * // Create many MaintenancePayments
     * const maintenancePayment = await prisma.maintenancePayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MaintenancePayments and only return the `id`
     * const maintenancePaymentWithIdOnly = await prisma.maintenancePayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MaintenancePaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaintenancePaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MaintenancePayment.
     * @param {MaintenancePaymentDeleteArgs} args - Arguments to delete one MaintenancePayment.
     * @example
     * // Delete one MaintenancePayment
     * const MaintenancePayment = await prisma.maintenancePayment.delete({
     *   where: {
     *     // ... filter to delete one MaintenancePayment
     *   }
     * })
     *
     */
    delete<T extends MaintenancePaymentDeleteArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MaintenancePayment.
     * @param {MaintenancePaymentUpdateArgs} args - Arguments to update one MaintenancePayment.
     * @example
     * // Update one MaintenancePayment
     * const maintenancePayment = await prisma.maintenancePayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MaintenancePaymentUpdateArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MaintenancePayments.
     * @param {MaintenancePaymentDeleteManyArgs} args - Arguments to filter MaintenancePayments to delete.
     * @example
     * // Delete a few MaintenancePayments
     * const { count } = await prisma.maintenancePayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MaintenancePaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaintenancePaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenancePayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenancePayments
     * const maintenancePayment = await prisma.maintenancePayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MaintenancePaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenancePayments and returns the data updated in the database.
     * @param {MaintenancePaymentUpdateManyAndReturnArgs} args - Arguments to update many MaintenancePayments.
     * @example
     * // Update many MaintenancePayments
     * const maintenancePayment = await prisma.maintenancePayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MaintenancePayments and only return the `id`
     * const maintenancePaymentWithIdOnly = await prisma.maintenancePayment.updateManyAndReturn({
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
    updateManyAndReturn<T extends MaintenancePaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MaintenancePayment.
     * @param {MaintenancePaymentUpsertArgs} args - Arguments to update or create a MaintenancePayment.
     * @example
     * // Update or create a MaintenancePayment
     * const maintenancePayment = await prisma.maintenancePayment.upsert({
     *   create: {
     *     // ... data to create a MaintenancePayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenancePayment we want to update
     *   }
     * })
     */
    upsert<T extends MaintenancePaymentUpsertArgs>(args: Prisma.SelectSubset<T, MaintenancePaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__MaintenancePaymentClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MaintenancePayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentCountArgs} args - Arguments to filter MaintenancePayments to count.
     * @example
     * // Count the number of MaintenancePayments
     * const count = await prisma.maintenancePayment.count({
     *   where: {
     *     // ... the filter for the MaintenancePayments we want to count
     *   }
     * })
    **/
    count<T extends MaintenancePaymentCountArgs>(args?: Prisma.Subset<T, MaintenancePaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaintenancePaymentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MaintenancePayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenancePaymentAggregateArgs>(args: Prisma.Subset<T, MaintenancePaymentAggregateArgs>): Prisma.PrismaPromise<GetMaintenancePaymentAggregateType<T>>;
    /**
     * Group by MaintenancePayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePaymentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MaintenancePaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaintenancePaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: MaintenancePaymentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaintenancePaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenancePaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MaintenancePayment model
     */
    readonly fields: MaintenancePaymentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MaintenancePayment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MaintenancePaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    maintenance<T extends Prisma.MaintenanceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceDefaultArgs<ExtArgs>>): Prisma.Prisma__MaintenanceClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    paidBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MaintenancePayment model
 */
export interface MaintenancePaymentFieldRefs {
    readonly id: Prisma.FieldRef<"MaintenancePayment", 'String'>;
    readonly maintenanceId: Prisma.FieldRef<"MaintenancePayment", 'String'>;
    readonly direction: Prisma.FieldRef<"MaintenancePayment", 'PaymentDirection'>;
    readonly amount: Prisma.FieldRef<"MaintenancePayment", 'Decimal'>;
    readonly paidAt: Prisma.FieldRef<"MaintenancePayment", 'DateTime'>;
    readonly note: Prisma.FieldRef<"MaintenancePayment", 'String'>;
    readonly paidById: Prisma.FieldRef<"MaintenancePayment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MaintenancePayment", 'DateTime'>;
}
/**
 * MaintenancePayment findUnique
 */
export type MaintenancePaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePayment to fetch.
     */
    where: Prisma.MaintenancePaymentWhereUniqueInput;
};
/**
 * MaintenancePayment findUniqueOrThrow
 */
export type MaintenancePaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePayment to fetch.
     */
    where: Prisma.MaintenancePaymentWhereUniqueInput;
};
/**
 * MaintenancePayment findFirst
 */
export type MaintenancePaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePayment to fetch.
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePayments to fetch.
     */
    orderBy?: Prisma.MaintenancePaymentOrderByWithRelationInput | Prisma.MaintenancePaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenancePayments.
     */
    cursor?: Prisma.MaintenancePaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePayments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePayments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenancePayments.
     */
    distinct?: Prisma.MaintenancePaymentScalarFieldEnum | Prisma.MaintenancePaymentScalarFieldEnum[];
};
/**
 * MaintenancePayment findFirstOrThrow
 */
export type MaintenancePaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePayment to fetch.
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePayments to fetch.
     */
    orderBy?: Prisma.MaintenancePaymentOrderByWithRelationInput | Prisma.MaintenancePaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenancePayments.
     */
    cursor?: Prisma.MaintenancePaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePayments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePayments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenancePayments.
     */
    distinct?: Prisma.MaintenancePaymentScalarFieldEnum | Prisma.MaintenancePaymentScalarFieldEnum[];
};
/**
 * MaintenancePayment findMany
 */
export type MaintenancePaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePayments to fetch.
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePayments to fetch.
     */
    orderBy?: Prisma.MaintenancePaymentOrderByWithRelationInput | Prisma.MaintenancePaymentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MaintenancePayments.
     */
    cursor?: Prisma.MaintenancePaymentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePayments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePayments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenancePayments.
     */
    distinct?: Prisma.MaintenancePaymentScalarFieldEnum | Prisma.MaintenancePaymentScalarFieldEnum[];
};
/**
 * MaintenancePayment create
 */
export type MaintenancePaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * The data needed to create a MaintenancePayment.
     */
    data: Prisma.XOR<Prisma.MaintenancePaymentCreateInput, Prisma.MaintenancePaymentUncheckedCreateInput>;
};
/**
 * MaintenancePayment createMany
 */
export type MaintenancePaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenancePayments.
     */
    data: Prisma.MaintenancePaymentCreateManyInput | Prisma.MaintenancePaymentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MaintenancePayment createManyAndReturn
 */
export type MaintenancePaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * The data used to create many MaintenancePayments.
     */
    data: Prisma.MaintenancePaymentCreateManyInput | Prisma.MaintenancePaymentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenancePayment update
 */
export type MaintenancePaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * The data needed to update a MaintenancePayment.
     */
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateInput, Prisma.MaintenancePaymentUncheckedUpdateInput>;
    /**
     * Choose, which MaintenancePayment to update.
     */
    where: Prisma.MaintenancePaymentWhereUniqueInput;
};
/**
 * MaintenancePayment updateMany
 */
export type MaintenancePaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenancePayments.
     */
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateManyMutationInput, Prisma.MaintenancePaymentUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenancePayments to update
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * Limit how many MaintenancePayments to update.
     */
    limit?: number;
};
/**
 * MaintenancePayment updateManyAndReturn
 */
export type MaintenancePaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * The data used to update MaintenancePayments.
     */
    data: Prisma.XOR<Prisma.MaintenancePaymentUpdateManyMutationInput, Prisma.MaintenancePaymentUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenancePayments to update
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * Limit how many MaintenancePayments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenancePayment upsert
 */
export type MaintenancePaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * The filter to search for the MaintenancePayment to update in case it exists.
     */
    where: Prisma.MaintenancePaymentWhereUniqueInput;
    /**
     * In case the MaintenancePayment found by the `where` argument doesn't exist, create a new MaintenancePayment with this data.
     */
    create: Prisma.XOR<Prisma.MaintenancePaymentCreateInput, Prisma.MaintenancePaymentUncheckedCreateInput>;
    /**
     * In case the MaintenancePayment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MaintenancePaymentUpdateInput, Prisma.MaintenancePaymentUncheckedUpdateInput>;
};
/**
 * MaintenancePayment delete
 */
export type MaintenancePaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
    /**
     * Filter which MaintenancePayment to delete.
     */
    where: Prisma.MaintenancePaymentWhereUniqueInput;
};
/**
 * MaintenancePayment deleteMany
 */
export type MaintenancePaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenancePayments to delete
     */
    where?: Prisma.MaintenancePaymentWhereInput;
    /**
     * Limit how many MaintenancePayments to delete.
     */
    limit?: number;
};
/**
 * MaintenancePayment without action
 */
export type MaintenancePaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePayment
     */
    select?: Prisma.MaintenancePaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePayment
     */
    omit?: Prisma.MaintenancePaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePaymentInclude<ExtArgs> | null;
};
//# sourceMappingURL=MaintenancePayment.d.ts.map