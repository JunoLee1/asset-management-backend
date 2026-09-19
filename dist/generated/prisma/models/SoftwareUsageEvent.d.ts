import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SoftwareUsageEvent
 *
 */
export type SoftwareUsageEventModel = runtime.Types.Result.DefaultSelection<Prisma.$SoftwareUsageEventPayload>;
export type AggregateSoftwareUsageEvent = {
    _count: SoftwareUsageEventCountAggregateOutputType | null;
    _avg: SoftwareUsageEventAvgAggregateOutputType | null;
    _sum: SoftwareUsageEventSumAggregateOutputType | null;
    _min: SoftwareUsageEventMinAggregateOutputType | null;
    _max: SoftwareUsageEventMaxAggregateOutputType | null;
};
export type SoftwareUsageEventAvgAggregateOutputType = {
    durationSec: number | null;
};
export type SoftwareUsageEventSumAggregateOutputType = {
    durationSec: number | null;
};
export type SoftwareUsageEventMinAggregateOutputType = {
    id: string | null;
    instanceId: string | null;
    occurredAt: Date | null;
    durationSec: number | null;
};
export type SoftwareUsageEventMaxAggregateOutputType = {
    id: string | null;
    instanceId: string | null;
    occurredAt: Date | null;
    durationSec: number | null;
};
export type SoftwareUsageEventCountAggregateOutputType = {
    id: number;
    instanceId: number;
    occurredAt: number;
    durationSec: number;
    _all: number;
};
export type SoftwareUsageEventAvgAggregateInputType = {
    durationSec?: true;
};
export type SoftwareUsageEventSumAggregateInputType = {
    durationSec?: true;
};
export type SoftwareUsageEventMinAggregateInputType = {
    id?: true;
    instanceId?: true;
    occurredAt?: true;
    durationSec?: true;
};
export type SoftwareUsageEventMaxAggregateInputType = {
    id?: true;
    instanceId?: true;
    occurredAt?: true;
    durationSec?: true;
};
export type SoftwareUsageEventCountAggregateInputType = {
    id?: true;
    instanceId?: true;
    occurredAt?: true;
    durationSec?: true;
    _all?: true;
};
export type SoftwareUsageEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SoftwareUsageEvent to aggregate.
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SoftwareUsageEvents to fetch.
     */
    orderBy?: Prisma.SoftwareUsageEventOrderByWithRelationInput | Prisma.SoftwareUsageEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SoftwareUsageEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SoftwareUsageEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SoftwareUsageEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SoftwareUsageEvents
    **/
    _count?: true | SoftwareUsageEventCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SoftwareUsageEventAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SoftwareUsageEventSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SoftwareUsageEventMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SoftwareUsageEventMaxAggregateInputType;
};
export type GetSoftwareUsageEventAggregateType<T extends SoftwareUsageEventAggregateArgs> = {
    [P in keyof T & keyof AggregateSoftwareUsageEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSoftwareUsageEvent[P]> : Prisma.GetScalarType<T[P], AggregateSoftwareUsageEvent[P]>;
};
export type SoftwareUsageEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareUsageEventWhereInput;
    orderBy?: Prisma.SoftwareUsageEventOrderByWithAggregationInput | Prisma.SoftwareUsageEventOrderByWithAggregationInput[];
    by: Prisma.SoftwareUsageEventScalarFieldEnum[] | Prisma.SoftwareUsageEventScalarFieldEnum;
    having?: Prisma.SoftwareUsageEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SoftwareUsageEventCountAggregateInputType | true;
    _avg?: SoftwareUsageEventAvgAggregateInputType;
    _sum?: SoftwareUsageEventSumAggregateInputType;
    _min?: SoftwareUsageEventMinAggregateInputType;
    _max?: SoftwareUsageEventMaxAggregateInputType;
};
export type SoftwareUsageEventGroupByOutputType = {
    id: string;
    instanceId: string;
    occurredAt: Date;
    durationSec: number | null;
    _count: SoftwareUsageEventCountAggregateOutputType | null;
    _avg: SoftwareUsageEventAvgAggregateOutputType | null;
    _sum: SoftwareUsageEventSumAggregateOutputType | null;
    _min: SoftwareUsageEventMinAggregateOutputType | null;
    _max: SoftwareUsageEventMaxAggregateOutputType | null;
};
export type GetSoftwareUsageEventGroupByPayload<T extends SoftwareUsageEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SoftwareUsageEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SoftwareUsageEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SoftwareUsageEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SoftwareUsageEventGroupByOutputType[P]>;
}>>;
export type SoftwareUsageEventWhereInput = {
    AND?: Prisma.SoftwareUsageEventWhereInput | Prisma.SoftwareUsageEventWhereInput[];
    OR?: Prisma.SoftwareUsageEventWhereInput[];
    NOT?: Prisma.SoftwareUsageEventWhereInput | Prisma.SoftwareUsageEventWhereInput[];
    id?: Prisma.StringFilter<"SoftwareUsageEvent"> | string;
    instanceId?: Prisma.StringFilter<"SoftwareUsageEvent"> | string;
    occurredAt?: Prisma.DateTimeFilter<"SoftwareUsageEvent"> | Date | string;
    durationSec?: Prisma.IntNullableFilter<"SoftwareUsageEvent"> | number | null;
    instance?: Prisma.XOR<Prisma.SoftwareInstanceScalarRelationFilter, Prisma.SoftwareInstanceWhereInput>;
};
export type SoftwareUsageEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    instanceId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrderInput | Prisma.SortOrder;
    instance?: Prisma.SoftwareInstanceOrderByWithRelationInput;
};
export type SoftwareUsageEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SoftwareUsageEventWhereInput | Prisma.SoftwareUsageEventWhereInput[];
    OR?: Prisma.SoftwareUsageEventWhereInput[];
    NOT?: Prisma.SoftwareUsageEventWhereInput | Prisma.SoftwareUsageEventWhereInput[];
    instanceId?: Prisma.StringFilter<"SoftwareUsageEvent"> | string;
    occurredAt?: Prisma.DateTimeFilter<"SoftwareUsageEvent"> | Date | string;
    durationSec?: Prisma.IntNullableFilter<"SoftwareUsageEvent"> | number | null;
    instance?: Prisma.XOR<Prisma.SoftwareInstanceScalarRelationFilter, Prisma.SoftwareInstanceWhereInput>;
}, "id">;
export type SoftwareUsageEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    instanceId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SoftwareUsageEventCountOrderByAggregateInput;
    _avg?: Prisma.SoftwareUsageEventAvgOrderByAggregateInput;
    _max?: Prisma.SoftwareUsageEventMaxOrderByAggregateInput;
    _min?: Prisma.SoftwareUsageEventMinOrderByAggregateInput;
    _sum?: Prisma.SoftwareUsageEventSumOrderByAggregateInput;
};
export type SoftwareUsageEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.SoftwareUsageEventScalarWhereWithAggregatesInput | Prisma.SoftwareUsageEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.SoftwareUsageEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SoftwareUsageEventScalarWhereWithAggregatesInput | Prisma.SoftwareUsageEventScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SoftwareUsageEvent"> | string;
    instanceId?: Prisma.StringWithAggregatesFilter<"SoftwareUsageEvent"> | string;
    occurredAt?: Prisma.DateTimeWithAggregatesFilter<"SoftwareUsageEvent"> | Date | string;
    durationSec?: Prisma.IntNullableWithAggregatesFilter<"SoftwareUsageEvent"> | number | null;
};
export type SoftwareUsageEventCreateInput = {
    id?: string;
    occurredAt: Date | string;
    durationSec?: number | null;
    instance: Prisma.SoftwareInstanceCreateNestedOneWithoutUsageEventsInput;
};
export type SoftwareUsageEventUncheckedCreateInput = {
    id?: string;
    instanceId: string;
    occurredAt: Date | string;
    durationSec?: number | null;
};
export type SoftwareUsageEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    instance?: Prisma.SoftwareInstanceUpdateOneRequiredWithoutUsageEventsNestedInput;
};
export type SoftwareUsageEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SoftwareUsageEventCreateManyInput = {
    id?: string;
    instanceId: string;
    occurredAt: Date | string;
    durationSec?: number | null;
};
export type SoftwareUsageEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SoftwareUsageEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    instanceId?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SoftwareUsageEventListRelationFilter = {
    every?: Prisma.SoftwareUsageEventWhereInput;
    some?: Prisma.SoftwareUsageEventWhereInput;
    none?: Prisma.SoftwareUsageEventWhereInput;
};
export type SoftwareUsageEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SoftwareUsageEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    instanceId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
};
export type SoftwareUsageEventAvgOrderByAggregateInput = {
    durationSec?: Prisma.SortOrder;
};
export type SoftwareUsageEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    instanceId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
};
export type SoftwareUsageEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    instanceId?: Prisma.SortOrder;
    occurredAt?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
};
export type SoftwareUsageEventSumOrderByAggregateInput = {
    durationSec?: Prisma.SortOrder;
};
export type SoftwareUsageEventCreateNestedManyWithoutInstanceInput = {
    create?: Prisma.XOR<Prisma.SoftwareUsageEventCreateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput> | Prisma.SoftwareUsageEventCreateWithoutInstanceInput[] | Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput[];
    connectOrCreate?: Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput | Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput[];
    createMany?: Prisma.SoftwareUsageEventCreateManyInstanceInputEnvelope;
    connect?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
};
export type SoftwareUsageEventUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: Prisma.XOR<Prisma.SoftwareUsageEventCreateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput> | Prisma.SoftwareUsageEventCreateWithoutInstanceInput[] | Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput[];
    connectOrCreate?: Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput | Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput[];
    createMany?: Prisma.SoftwareUsageEventCreateManyInstanceInputEnvelope;
    connect?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
};
export type SoftwareUsageEventUpdateManyWithoutInstanceNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareUsageEventCreateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput> | Prisma.SoftwareUsageEventCreateWithoutInstanceInput[] | Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput[];
    connectOrCreate?: Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput | Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput[];
    upsert?: Prisma.SoftwareUsageEventUpsertWithWhereUniqueWithoutInstanceInput | Prisma.SoftwareUsageEventUpsertWithWhereUniqueWithoutInstanceInput[];
    createMany?: Prisma.SoftwareUsageEventCreateManyInstanceInputEnvelope;
    set?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    disconnect?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    delete?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    connect?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    update?: Prisma.SoftwareUsageEventUpdateWithWhereUniqueWithoutInstanceInput | Prisma.SoftwareUsageEventUpdateWithWhereUniqueWithoutInstanceInput[];
    updateMany?: Prisma.SoftwareUsageEventUpdateManyWithWhereWithoutInstanceInput | Prisma.SoftwareUsageEventUpdateManyWithWhereWithoutInstanceInput[];
    deleteMany?: Prisma.SoftwareUsageEventScalarWhereInput | Prisma.SoftwareUsageEventScalarWhereInput[];
};
export type SoftwareUsageEventUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareUsageEventCreateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput> | Prisma.SoftwareUsageEventCreateWithoutInstanceInput[] | Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput[];
    connectOrCreate?: Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput | Prisma.SoftwareUsageEventCreateOrConnectWithoutInstanceInput[];
    upsert?: Prisma.SoftwareUsageEventUpsertWithWhereUniqueWithoutInstanceInput | Prisma.SoftwareUsageEventUpsertWithWhereUniqueWithoutInstanceInput[];
    createMany?: Prisma.SoftwareUsageEventCreateManyInstanceInputEnvelope;
    set?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    disconnect?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    delete?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    connect?: Prisma.SoftwareUsageEventWhereUniqueInput | Prisma.SoftwareUsageEventWhereUniqueInput[];
    update?: Prisma.SoftwareUsageEventUpdateWithWhereUniqueWithoutInstanceInput | Prisma.SoftwareUsageEventUpdateWithWhereUniqueWithoutInstanceInput[];
    updateMany?: Prisma.SoftwareUsageEventUpdateManyWithWhereWithoutInstanceInput | Prisma.SoftwareUsageEventUpdateManyWithWhereWithoutInstanceInput[];
    deleteMany?: Prisma.SoftwareUsageEventScalarWhereInput | Prisma.SoftwareUsageEventScalarWhereInput[];
};
export type SoftwareUsageEventCreateWithoutInstanceInput = {
    id?: string;
    occurredAt: Date | string;
    durationSec?: number | null;
};
export type SoftwareUsageEventUncheckedCreateWithoutInstanceInput = {
    id?: string;
    occurredAt: Date | string;
    durationSec?: number | null;
};
export type SoftwareUsageEventCreateOrConnectWithoutInstanceInput = {
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.SoftwareUsageEventCreateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput>;
};
export type SoftwareUsageEventCreateManyInstanceInputEnvelope = {
    data: Prisma.SoftwareUsageEventCreateManyInstanceInput | Prisma.SoftwareUsageEventCreateManyInstanceInput[];
    skipDuplicates?: boolean;
};
export type SoftwareUsageEventUpsertWithWhereUniqueWithoutInstanceInput = {
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.SoftwareUsageEventUpdateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedUpdateWithoutInstanceInput>;
    create: Prisma.XOR<Prisma.SoftwareUsageEventCreateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedCreateWithoutInstanceInput>;
};
export type SoftwareUsageEventUpdateWithWhereUniqueWithoutInstanceInput = {
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.SoftwareUsageEventUpdateWithoutInstanceInput, Prisma.SoftwareUsageEventUncheckedUpdateWithoutInstanceInput>;
};
export type SoftwareUsageEventUpdateManyWithWhereWithoutInstanceInput = {
    where: Prisma.SoftwareUsageEventScalarWhereInput;
    data: Prisma.XOR<Prisma.SoftwareUsageEventUpdateManyMutationInput, Prisma.SoftwareUsageEventUncheckedUpdateManyWithoutInstanceInput>;
};
export type SoftwareUsageEventScalarWhereInput = {
    AND?: Prisma.SoftwareUsageEventScalarWhereInput | Prisma.SoftwareUsageEventScalarWhereInput[];
    OR?: Prisma.SoftwareUsageEventScalarWhereInput[];
    NOT?: Prisma.SoftwareUsageEventScalarWhereInput | Prisma.SoftwareUsageEventScalarWhereInput[];
    id?: Prisma.StringFilter<"SoftwareUsageEvent"> | string;
    instanceId?: Prisma.StringFilter<"SoftwareUsageEvent"> | string;
    occurredAt?: Prisma.DateTimeFilter<"SoftwareUsageEvent"> | Date | string;
    durationSec?: Prisma.IntNullableFilter<"SoftwareUsageEvent"> | number | null;
};
export type SoftwareUsageEventCreateManyInstanceInput = {
    id?: string;
    occurredAt: Date | string;
    durationSec?: number | null;
};
export type SoftwareUsageEventUpdateWithoutInstanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SoftwareUsageEventUncheckedUpdateWithoutInstanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SoftwareUsageEventUncheckedUpdateManyWithoutInstanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    occurredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SoftwareUsageEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    instanceId?: boolean;
    occurredAt?: boolean;
    durationSec?: boolean;
    instance?: boolean | Prisma.SoftwareInstanceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["softwareUsageEvent"]>;
export type SoftwareUsageEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    instanceId?: boolean;
    occurredAt?: boolean;
    durationSec?: boolean;
    instance?: boolean | Prisma.SoftwareInstanceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["softwareUsageEvent"]>;
export type SoftwareUsageEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    instanceId?: boolean;
    occurredAt?: boolean;
    durationSec?: boolean;
    instance?: boolean | Prisma.SoftwareInstanceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["softwareUsageEvent"]>;
export type SoftwareUsageEventSelectScalar = {
    id?: boolean;
    instanceId?: boolean;
    occurredAt?: boolean;
    durationSec?: boolean;
};
export type SoftwareUsageEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "instanceId" | "occurredAt" | "durationSec", ExtArgs["result"]["softwareUsageEvent"]>;
export type SoftwareUsageEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instance?: boolean | Prisma.SoftwareInstanceDefaultArgs<ExtArgs>;
};
export type SoftwareUsageEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instance?: boolean | Prisma.SoftwareInstanceDefaultArgs<ExtArgs>;
};
export type SoftwareUsageEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instance?: boolean | Prisma.SoftwareInstanceDefaultArgs<ExtArgs>;
};
export type $SoftwareUsageEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SoftwareUsageEvent";
    objects: {
        instance: Prisma.$SoftwareInstancePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        instanceId: string;
        occurredAt: Date;
        durationSec: number | null;
    }, ExtArgs["result"]["softwareUsageEvent"]>;
    composites: {};
};
export type SoftwareUsageEventGetPayload<S extends boolean | null | undefined | SoftwareUsageEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload, S>;
export type SoftwareUsageEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SoftwareUsageEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SoftwareUsageEventCountAggregateInputType | true;
};
export interface SoftwareUsageEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SoftwareUsageEvent'];
        meta: {
            name: 'SoftwareUsageEvent';
        };
    };
    /**
     * Find zero or one SoftwareUsageEvent that matches the filter.
     * @param {SoftwareUsageEventFindUniqueArgs} args - Arguments to find a SoftwareUsageEvent
     * @example
     * // Get one SoftwareUsageEvent
     * const softwareUsageEvent = await prisma.softwareUsageEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoftwareUsageEventFindUniqueArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SoftwareUsageEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoftwareUsageEventFindUniqueOrThrowArgs} args - Arguments to find a SoftwareUsageEvent
     * @example
     * // Get one SoftwareUsageEvent
     * const softwareUsageEvent = await prisma.softwareUsageEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoftwareUsageEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SoftwareUsageEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventFindFirstArgs} args - Arguments to find a SoftwareUsageEvent
     * @example
     * // Get one SoftwareUsageEvent
     * const softwareUsageEvent = await prisma.softwareUsageEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoftwareUsageEventFindFirstArgs>(args?: Prisma.SelectSubset<T, SoftwareUsageEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SoftwareUsageEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventFindFirstOrThrowArgs} args - Arguments to find a SoftwareUsageEvent
     * @example
     * // Get one SoftwareUsageEvent
     * const softwareUsageEvent = await prisma.softwareUsageEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoftwareUsageEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SoftwareUsageEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SoftwareUsageEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SoftwareUsageEvents
     * const softwareUsageEvents = await prisma.softwareUsageEvent.findMany()
     *
     * // Get first 10 SoftwareUsageEvents
     * const softwareUsageEvents = await prisma.softwareUsageEvent.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const softwareUsageEventWithIdOnly = await prisma.softwareUsageEvent.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SoftwareUsageEventFindManyArgs>(args?: Prisma.SelectSubset<T, SoftwareUsageEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SoftwareUsageEvent.
     * @param {SoftwareUsageEventCreateArgs} args - Arguments to create a SoftwareUsageEvent.
     * @example
     * // Create one SoftwareUsageEvent
     * const SoftwareUsageEvent = await prisma.softwareUsageEvent.create({
     *   data: {
     *     // ... data to create a SoftwareUsageEvent
     *   }
     * })
     *
     */
    create<T extends SoftwareUsageEventCreateArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventCreateArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SoftwareUsageEvents.
     * @param {SoftwareUsageEventCreateManyArgs} args - Arguments to create many SoftwareUsageEvents.
     * @example
     * // Create many SoftwareUsageEvents
     * const softwareUsageEvent = await prisma.softwareUsageEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SoftwareUsageEventCreateManyArgs>(args?: Prisma.SelectSubset<T, SoftwareUsageEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SoftwareUsageEvents and returns the data saved in the database.
     * @param {SoftwareUsageEventCreateManyAndReturnArgs} args - Arguments to create many SoftwareUsageEvents.
     * @example
     * // Create many SoftwareUsageEvents
     * const softwareUsageEvent = await prisma.softwareUsageEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SoftwareUsageEvents and only return the `id`
     * const softwareUsageEventWithIdOnly = await prisma.softwareUsageEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SoftwareUsageEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SoftwareUsageEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SoftwareUsageEvent.
     * @param {SoftwareUsageEventDeleteArgs} args - Arguments to delete one SoftwareUsageEvent.
     * @example
     * // Delete one SoftwareUsageEvent
     * const SoftwareUsageEvent = await prisma.softwareUsageEvent.delete({
     *   where: {
     *     // ... filter to delete one SoftwareUsageEvent
     *   }
     * })
     *
     */
    delete<T extends SoftwareUsageEventDeleteArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventDeleteArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SoftwareUsageEvent.
     * @param {SoftwareUsageEventUpdateArgs} args - Arguments to update one SoftwareUsageEvent.
     * @example
     * // Update one SoftwareUsageEvent
     * const softwareUsageEvent = await prisma.softwareUsageEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SoftwareUsageEventUpdateArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventUpdateArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SoftwareUsageEvents.
     * @param {SoftwareUsageEventDeleteManyArgs} args - Arguments to filter SoftwareUsageEvents to delete.
     * @example
     * // Delete a few SoftwareUsageEvents
     * const { count } = await prisma.softwareUsageEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SoftwareUsageEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, SoftwareUsageEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SoftwareUsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SoftwareUsageEvents
     * const softwareUsageEvent = await prisma.softwareUsageEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SoftwareUsageEventUpdateManyArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SoftwareUsageEvents and returns the data updated in the database.
     * @param {SoftwareUsageEventUpdateManyAndReturnArgs} args - Arguments to update many SoftwareUsageEvents.
     * @example
     * // Update many SoftwareUsageEvents
     * const softwareUsageEvent = await prisma.softwareUsageEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SoftwareUsageEvents and only return the `id`
     * const softwareUsageEventWithIdOnly = await prisma.softwareUsageEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends SoftwareUsageEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SoftwareUsageEvent.
     * @param {SoftwareUsageEventUpsertArgs} args - Arguments to update or create a SoftwareUsageEvent.
     * @example
     * // Update or create a SoftwareUsageEvent
     * const softwareUsageEvent = await prisma.softwareUsageEvent.upsert({
     *   create: {
     *     // ... data to create a SoftwareUsageEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SoftwareUsageEvent we want to update
     *   }
     * })
     */
    upsert<T extends SoftwareUsageEventUpsertArgs>(args: Prisma.SelectSubset<T, SoftwareUsageEventUpsertArgs<ExtArgs>>): Prisma.Prisma__SoftwareUsageEventClient<runtime.Types.Result.GetResult<Prisma.$SoftwareUsageEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SoftwareUsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventCountArgs} args - Arguments to filter SoftwareUsageEvents to count.
     * @example
     * // Count the number of SoftwareUsageEvents
     * const count = await prisma.softwareUsageEvent.count({
     *   where: {
     *     // ... the filter for the SoftwareUsageEvents we want to count
     *   }
     * })
    **/
    count<T extends SoftwareUsageEventCountArgs>(args?: Prisma.Subset<T, SoftwareUsageEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SoftwareUsageEventCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SoftwareUsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SoftwareUsageEventAggregateArgs>(args: Prisma.Subset<T, SoftwareUsageEventAggregateArgs>): Prisma.PrismaPromise<GetSoftwareUsageEventAggregateType<T>>;
    /**
     * Group by SoftwareUsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoftwareUsageEventGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SoftwareUsageEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SoftwareUsageEventGroupByArgs['orderBy'];
    } : {
        orderBy?: SoftwareUsageEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SoftwareUsageEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoftwareUsageEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SoftwareUsageEvent model
     */
    readonly fields: SoftwareUsageEventFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SoftwareUsageEvent.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SoftwareUsageEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    instance<T extends Prisma.SoftwareInstanceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SoftwareInstanceDefaultArgs<ExtArgs>>): Prisma.Prisma__SoftwareInstanceClient<runtime.Types.Result.GetResult<Prisma.$SoftwareInstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the SoftwareUsageEvent model
 */
export interface SoftwareUsageEventFieldRefs {
    readonly id: Prisma.FieldRef<"SoftwareUsageEvent", 'String'>;
    readonly instanceId: Prisma.FieldRef<"SoftwareUsageEvent", 'String'>;
    readonly occurredAt: Prisma.FieldRef<"SoftwareUsageEvent", 'DateTime'>;
    readonly durationSec: Prisma.FieldRef<"SoftwareUsageEvent", 'Int'>;
}
/**
 * SoftwareUsageEvent findUnique
 */
export type SoftwareUsageEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * Filter, which SoftwareUsageEvent to fetch.
     */
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
};
/**
 * SoftwareUsageEvent findUniqueOrThrow
 */
export type SoftwareUsageEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * Filter, which SoftwareUsageEvent to fetch.
     */
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
};
/**
 * SoftwareUsageEvent findFirst
 */
export type SoftwareUsageEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * Filter, which SoftwareUsageEvent to fetch.
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SoftwareUsageEvents to fetch.
     */
    orderBy?: Prisma.SoftwareUsageEventOrderByWithRelationInput | Prisma.SoftwareUsageEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SoftwareUsageEvents.
     */
    cursor?: Prisma.SoftwareUsageEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SoftwareUsageEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SoftwareUsageEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SoftwareUsageEvents.
     */
    distinct?: Prisma.SoftwareUsageEventScalarFieldEnum | Prisma.SoftwareUsageEventScalarFieldEnum[];
};
/**
 * SoftwareUsageEvent findFirstOrThrow
 */
export type SoftwareUsageEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * Filter, which SoftwareUsageEvent to fetch.
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SoftwareUsageEvents to fetch.
     */
    orderBy?: Prisma.SoftwareUsageEventOrderByWithRelationInput | Prisma.SoftwareUsageEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SoftwareUsageEvents.
     */
    cursor?: Prisma.SoftwareUsageEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SoftwareUsageEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SoftwareUsageEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SoftwareUsageEvents.
     */
    distinct?: Prisma.SoftwareUsageEventScalarFieldEnum | Prisma.SoftwareUsageEventScalarFieldEnum[];
};
/**
 * SoftwareUsageEvent findMany
 */
export type SoftwareUsageEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * Filter, which SoftwareUsageEvents to fetch.
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SoftwareUsageEvents to fetch.
     */
    orderBy?: Prisma.SoftwareUsageEventOrderByWithRelationInput | Prisma.SoftwareUsageEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SoftwareUsageEvents.
     */
    cursor?: Prisma.SoftwareUsageEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SoftwareUsageEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SoftwareUsageEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SoftwareUsageEvents.
     */
    distinct?: Prisma.SoftwareUsageEventScalarFieldEnum | Prisma.SoftwareUsageEventScalarFieldEnum[];
};
/**
 * SoftwareUsageEvent create
 */
export type SoftwareUsageEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * The data needed to create a SoftwareUsageEvent.
     */
    data: Prisma.XOR<Prisma.SoftwareUsageEventCreateInput, Prisma.SoftwareUsageEventUncheckedCreateInput>;
};
/**
 * SoftwareUsageEvent createMany
 */
export type SoftwareUsageEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SoftwareUsageEvents.
     */
    data: Prisma.SoftwareUsageEventCreateManyInput | Prisma.SoftwareUsageEventCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SoftwareUsageEvent createManyAndReturn
 */
export type SoftwareUsageEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * The data used to create many SoftwareUsageEvents.
     */
    data: Prisma.SoftwareUsageEventCreateManyInput | Prisma.SoftwareUsageEventCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SoftwareUsageEvent update
 */
export type SoftwareUsageEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * The data needed to update a SoftwareUsageEvent.
     */
    data: Prisma.XOR<Prisma.SoftwareUsageEventUpdateInput, Prisma.SoftwareUsageEventUncheckedUpdateInput>;
    /**
     * Choose, which SoftwareUsageEvent to update.
     */
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
};
/**
 * SoftwareUsageEvent updateMany
 */
export type SoftwareUsageEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SoftwareUsageEvents.
     */
    data: Prisma.XOR<Prisma.SoftwareUsageEventUpdateManyMutationInput, Prisma.SoftwareUsageEventUncheckedUpdateManyInput>;
    /**
     * Filter which SoftwareUsageEvents to update
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * Limit how many SoftwareUsageEvents to update.
     */
    limit?: number;
};
/**
 * SoftwareUsageEvent updateManyAndReturn
 */
export type SoftwareUsageEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * The data used to update SoftwareUsageEvents.
     */
    data: Prisma.XOR<Prisma.SoftwareUsageEventUpdateManyMutationInput, Prisma.SoftwareUsageEventUncheckedUpdateManyInput>;
    /**
     * Filter which SoftwareUsageEvents to update
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * Limit how many SoftwareUsageEvents to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SoftwareUsageEvent upsert
 */
export type SoftwareUsageEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * The filter to search for the SoftwareUsageEvent to update in case it exists.
     */
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
    /**
     * In case the SoftwareUsageEvent found by the `where` argument doesn't exist, create a new SoftwareUsageEvent with this data.
     */
    create: Prisma.XOR<Prisma.SoftwareUsageEventCreateInput, Prisma.SoftwareUsageEventUncheckedCreateInput>;
    /**
     * In case the SoftwareUsageEvent was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SoftwareUsageEventUpdateInput, Prisma.SoftwareUsageEventUncheckedUpdateInput>;
};
/**
 * SoftwareUsageEvent delete
 */
export type SoftwareUsageEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
    /**
     * Filter which SoftwareUsageEvent to delete.
     */
    where: Prisma.SoftwareUsageEventWhereUniqueInput;
};
/**
 * SoftwareUsageEvent deleteMany
 */
export type SoftwareUsageEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SoftwareUsageEvents to delete
     */
    where?: Prisma.SoftwareUsageEventWhereInput;
    /**
     * Limit how many SoftwareUsageEvents to delete.
     */
    limit?: number;
};
/**
 * SoftwareUsageEvent without action
 */
export type SoftwareUsageEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoftwareUsageEvent
     */
    select?: Prisma.SoftwareUsageEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SoftwareUsageEvent
     */
    omit?: Prisma.SoftwareUsageEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SoftwareUsageEventInclude<ExtArgs> | null;
};
//# sourceMappingURL=SoftwareUsageEvent.d.ts.map