import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Vendor
 *
 */
export type VendorModel = runtime.Types.Result.DefaultSelection<Prisma.$VendorPayload>;
export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null;
    _avg: VendorAvgAggregateOutputType | null;
    _sum: VendorSumAggregateOutputType | null;
    _min: VendorMinAggregateOutputType | null;
    _max: VendorMaxAggregateOutputType | null;
};
export type VendorAvgAggregateOutputType = {
    slaHours: number | null;
    paymentDaysAfter: number | null;
    slaCompletionDays: number | null;
    repairWarrantyDays: number | null;
};
export type VendorSumAggregateOutputType = {
    slaHours: number | null;
    paymentDaysAfter: number | null;
    slaCompletionDays: number | null;
    repairWarrantyDays: number | null;
};
export type VendorMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    status: $Enums.VendorStatus | null;
    type: $Enums.VendorType | null;
    approvedAt: Date | null;
    approvedById: string | null;
    serviceRegion: string | null;
    contractStartDate: Date | null;
    contractEndDate: Date | null;
    slaHours: number | null;
    canVisitOnSite: boolean | null;
    canReceiveDevice: boolean | null;
    businessRegistrationNumber: string | null;
    ceoName: string | null;
    businessType: string | null;
    businessItem: string | null;
    addressHeadOffice: string | null;
    addressDetail: string | null;
    addressBusiness: string | null;
    contactDepartment: string | null;
    contactPosition: string | null;
    operatingHoursStart: string | null;
    operatingHoursEnd: string | null;
    operatesOnWeekend: boolean | null;
    canHandleUrgent: boolean | null;
    urgentConditionNote: string | null;
    brandModelNote: string | null;
    bankName: string | null;
    bankAccountNumber: string | null;
    bankAccountNumberMask: string | null;
    bankAccountHolder: string | null;
    paymentTerms: $Enums.PaymentTerms | null;
    paymentDaysAfter: number | null;
    taxInvoiceEmail: string | null;
    taxInvoiceMethod: $Enums.TaxInvoiceMethod | null;
    faxNumber: string | null;
    postalAddress: string | null;
    isVatIncluded: boolean | null;
    isWithholdingTax: boolean | null;
    slaCompletionDays: number | null;
    penaltyTerms: string | null;
    repairWarrantyDays: number | null;
    unitPriceNote: string | null;
    approvalNote: string | null;
    rejectionNote: string | null;
    rejectedAt: Date | null;
    rejectedById: string | null;
    isBlacklisted: boolean | null;
    blacklistReason: string | null;
    blacklistedAt: Date | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type VendorMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    status: $Enums.VendorStatus | null;
    type: $Enums.VendorType | null;
    approvedAt: Date | null;
    approvedById: string | null;
    serviceRegion: string | null;
    contractStartDate: Date | null;
    contractEndDate: Date | null;
    slaHours: number | null;
    canVisitOnSite: boolean | null;
    canReceiveDevice: boolean | null;
    businessRegistrationNumber: string | null;
    ceoName: string | null;
    businessType: string | null;
    businessItem: string | null;
    addressHeadOffice: string | null;
    addressDetail: string | null;
    addressBusiness: string | null;
    contactDepartment: string | null;
    contactPosition: string | null;
    operatingHoursStart: string | null;
    operatingHoursEnd: string | null;
    operatesOnWeekend: boolean | null;
    canHandleUrgent: boolean | null;
    urgentConditionNote: string | null;
    brandModelNote: string | null;
    bankName: string | null;
    bankAccountNumber: string | null;
    bankAccountNumberMask: string | null;
    bankAccountHolder: string | null;
    paymentTerms: $Enums.PaymentTerms | null;
    paymentDaysAfter: number | null;
    taxInvoiceEmail: string | null;
    taxInvoiceMethod: $Enums.TaxInvoiceMethod | null;
    faxNumber: string | null;
    postalAddress: string | null;
    isVatIncluded: boolean | null;
    isWithholdingTax: boolean | null;
    slaCompletionDays: number | null;
    penaltyTerms: string | null;
    repairWarrantyDays: number | null;
    unitPriceNote: string | null;
    approvalNote: string | null;
    rejectionNote: string | null;
    rejectedAt: Date | null;
    rejectedById: string | null;
    isBlacklisted: boolean | null;
    blacklistReason: string | null;
    blacklistedAt: Date | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type VendorCountAggregateOutputType = {
    id: number;
    name: number;
    contactName: number;
    email: number;
    phone: number;
    status: number;
    type: number;
    supportedClasses: number;
    approvedAt: number;
    approvedById: number;
    serviceRegion: number;
    contractStartDate: number;
    contractEndDate: number;
    slaHours: number;
    canVisitOnSite: number;
    canReceiveDevice: number;
    businessRegistrationNumber: number;
    ceoName: number;
    businessType: number;
    businessItem: number;
    addressHeadOffice: number;
    addressDetail: number;
    addressBusiness: number;
    contactDepartment: number;
    contactPosition: number;
    operatingHoursStart: number;
    operatingHoursEnd: number;
    operatesOnWeekend: number;
    canHandleUrgent: number;
    urgentConditionNote: number;
    brandModelNote: number;
    bankName: number;
    bankAccountNumber: number;
    bankAccountNumberMask: number;
    bankAccountHolder: number;
    paymentTerms: number;
    paymentDaysAfter: number;
    taxInvoiceEmail: number;
    taxInvoiceMethod: number;
    faxNumber: number;
    postalAddress: number;
    isVatIncluded: number;
    isWithholdingTax: number;
    slaCompletionDays: number;
    penaltyTerms: number;
    repairWarrantyDays: number;
    unitPriceNote: number;
    approvalNote: number;
    rejectionNote: number;
    rejectedAt: number;
    rejectedById: number;
    isBlacklisted: number;
    blacklistReason: number;
    blacklistedAt: number;
    createdById: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type VendorAvgAggregateInputType = {
    slaHours?: true;
    paymentDaysAfter?: true;
    slaCompletionDays?: true;
    repairWarrantyDays?: true;
};
export type VendorSumAggregateInputType = {
    slaHours?: true;
    paymentDaysAfter?: true;
    slaCompletionDays?: true;
    repairWarrantyDays?: true;
};
export type VendorMinAggregateInputType = {
    id?: true;
    name?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    status?: true;
    type?: true;
    approvedAt?: true;
    approvedById?: true;
    serviceRegion?: true;
    contractStartDate?: true;
    contractEndDate?: true;
    slaHours?: true;
    canVisitOnSite?: true;
    canReceiveDevice?: true;
    businessRegistrationNumber?: true;
    ceoName?: true;
    businessType?: true;
    businessItem?: true;
    addressHeadOffice?: true;
    addressDetail?: true;
    addressBusiness?: true;
    contactDepartment?: true;
    contactPosition?: true;
    operatingHoursStart?: true;
    operatingHoursEnd?: true;
    operatesOnWeekend?: true;
    canHandleUrgent?: true;
    urgentConditionNote?: true;
    brandModelNote?: true;
    bankName?: true;
    bankAccountNumber?: true;
    bankAccountNumberMask?: true;
    bankAccountHolder?: true;
    paymentTerms?: true;
    paymentDaysAfter?: true;
    taxInvoiceEmail?: true;
    taxInvoiceMethod?: true;
    faxNumber?: true;
    postalAddress?: true;
    isVatIncluded?: true;
    isWithholdingTax?: true;
    slaCompletionDays?: true;
    penaltyTerms?: true;
    repairWarrantyDays?: true;
    unitPriceNote?: true;
    approvalNote?: true;
    rejectionNote?: true;
    rejectedAt?: true;
    rejectedById?: true;
    isBlacklisted?: true;
    blacklistReason?: true;
    blacklistedAt?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type VendorMaxAggregateInputType = {
    id?: true;
    name?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    status?: true;
    type?: true;
    approvedAt?: true;
    approvedById?: true;
    serviceRegion?: true;
    contractStartDate?: true;
    contractEndDate?: true;
    slaHours?: true;
    canVisitOnSite?: true;
    canReceiveDevice?: true;
    businessRegistrationNumber?: true;
    ceoName?: true;
    businessType?: true;
    businessItem?: true;
    addressHeadOffice?: true;
    addressDetail?: true;
    addressBusiness?: true;
    contactDepartment?: true;
    contactPosition?: true;
    operatingHoursStart?: true;
    operatingHoursEnd?: true;
    operatesOnWeekend?: true;
    canHandleUrgent?: true;
    urgentConditionNote?: true;
    brandModelNote?: true;
    bankName?: true;
    bankAccountNumber?: true;
    bankAccountNumberMask?: true;
    bankAccountHolder?: true;
    paymentTerms?: true;
    paymentDaysAfter?: true;
    taxInvoiceEmail?: true;
    taxInvoiceMethod?: true;
    faxNumber?: true;
    postalAddress?: true;
    isVatIncluded?: true;
    isWithholdingTax?: true;
    slaCompletionDays?: true;
    penaltyTerms?: true;
    repairWarrantyDays?: true;
    unitPriceNote?: true;
    approvalNote?: true;
    rejectionNote?: true;
    rejectedAt?: true;
    rejectedById?: true;
    isBlacklisted?: true;
    blacklistReason?: true;
    blacklistedAt?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type VendorCountAggregateInputType = {
    id?: true;
    name?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    status?: true;
    type?: true;
    supportedClasses?: true;
    approvedAt?: true;
    approvedById?: true;
    serviceRegion?: true;
    contractStartDate?: true;
    contractEndDate?: true;
    slaHours?: true;
    canVisitOnSite?: true;
    canReceiveDevice?: true;
    businessRegistrationNumber?: true;
    ceoName?: true;
    businessType?: true;
    businessItem?: true;
    addressHeadOffice?: true;
    addressDetail?: true;
    addressBusiness?: true;
    contactDepartment?: true;
    contactPosition?: true;
    operatingHoursStart?: true;
    operatingHoursEnd?: true;
    operatesOnWeekend?: true;
    canHandleUrgent?: true;
    urgentConditionNote?: true;
    brandModelNote?: true;
    bankName?: true;
    bankAccountNumber?: true;
    bankAccountNumberMask?: true;
    bankAccountHolder?: true;
    paymentTerms?: true;
    paymentDaysAfter?: true;
    taxInvoiceEmail?: true;
    taxInvoiceMethod?: true;
    faxNumber?: true;
    postalAddress?: true;
    isVatIncluded?: true;
    isWithholdingTax?: true;
    slaCompletionDays?: true;
    penaltyTerms?: true;
    repairWarrantyDays?: true;
    unitPriceNote?: true;
    approvalNote?: true;
    rejectionNote?: true;
    rejectedAt?: true;
    rejectedById?: true;
    isBlacklisted?: true;
    blacklistReason?: true;
    blacklistedAt?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type VendorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Vendor to aggregate.
     */
    where?: Prisma.VendorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Vendors to fetch.
     */
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VendorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Vendors
    **/
    _count?: true | VendorCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: VendorAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: VendorSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VendorMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VendorMaxAggregateInputType;
};
export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
    [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVendor[P]> : Prisma.GetScalarType<T[P], AggregateVendor[P]>;
};
export type VendorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorWhereInput;
    orderBy?: Prisma.VendorOrderByWithAggregationInput | Prisma.VendorOrderByWithAggregationInput[];
    by: Prisma.VendorScalarFieldEnum[] | Prisma.VendorScalarFieldEnum;
    having?: Prisma.VendorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorCountAggregateInputType | true;
    _avg?: VendorAvgAggregateInputType;
    _sum?: VendorSumAggregateInputType;
    _min?: VendorMinAggregateInputType;
    _max?: VendorMaxAggregateInputType;
};
export type VendorGroupByOutputType = {
    id: string;
    name: string;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    status: $Enums.VendorStatus;
    type: $Enums.VendorType;
    supportedClasses: $Enums.AssetClass[];
    approvedAt: Date | null;
    approvedById: string | null;
    serviceRegion: string | null;
    contractStartDate: Date | null;
    contractEndDate: Date | null;
    slaHours: number | null;
    canVisitOnSite: boolean;
    canReceiveDevice: boolean;
    businessRegistrationNumber: string | null;
    ceoName: string | null;
    businessType: string | null;
    businessItem: string | null;
    addressHeadOffice: string | null;
    addressDetail: string | null;
    addressBusiness: string | null;
    contactDepartment: string | null;
    contactPosition: string | null;
    operatingHoursStart: string | null;
    operatingHoursEnd: string | null;
    operatesOnWeekend: boolean;
    canHandleUrgent: boolean;
    urgentConditionNote: string | null;
    brandModelNote: string | null;
    bankName: string | null;
    bankAccountNumber: string | null;
    bankAccountNumberMask: string | null;
    bankAccountHolder: string | null;
    paymentTerms: $Enums.PaymentTerms | null;
    paymentDaysAfter: number | null;
    taxInvoiceEmail: string | null;
    taxInvoiceMethod: $Enums.TaxInvoiceMethod | null;
    faxNumber: string | null;
    postalAddress: string | null;
    isVatIncluded: boolean;
    isWithholdingTax: boolean;
    slaCompletionDays: number | null;
    penaltyTerms: string | null;
    repairWarrantyDays: number | null;
    unitPriceNote: string | null;
    approvalNote: string | null;
    rejectionNote: string | null;
    rejectedAt: Date | null;
    rejectedById: string | null;
    isBlacklisted: boolean;
    blacklistReason: string | null;
    blacklistedAt: Date | null;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: VendorCountAggregateOutputType | null;
    _avg: VendorAvgAggregateOutputType | null;
    _sum: VendorSumAggregateOutputType | null;
    _min: VendorMinAggregateOutputType | null;
    _max: VendorMaxAggregateOutputType | null;
};
export type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VendorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VendorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VendorGroupByOutputType[P]>;
}>>;
export type VendorWhereInput = {
    AND?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    OR?: Prisma.VendorWhereInput[];
    NOT?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    id?: Prisma.StringFilter<"Vendor"> | string;
    name?: Prisma.StringFilter<"Vendor"> | string;
    contactName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    email?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    phone?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    status?: Prisma.EnumVendorStatusFilter<"Vendor"> | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFilter<"Vendor"> | $Enums.VendorType;
    supportedClasses?: Prisma.EnumAssetClassNullableListFilter<"Vendor">;
    approvedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    approvedById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    serviceRegion?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contractStartDate?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    contractEndDate?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    slaHours?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    canVisitOnSite?: Prisma.BoolFilter<"Vendor"> | boolean;
    canReceiveDevice?: Prisma.BoolFilter<"Vendor"> | boolean;
    businessRegistrationNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    ceoName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    businessType?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    businessItem?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressHeadOffice?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressDetail?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressBusiness?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contactDepartment?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contactPosition?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatingHoursStart?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatingHoursEnd?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatesOnWeekend?: Prisma.BoolFilter<"Vendor"> | boolean;
    canHandleUrgent?: Prisma.BoolFilter<"Vendor"> | boolean;
    urgentConditionNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    brandModelNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountNumberMask?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountHolder?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    paymentTerms?: Prisma.EnumPaymentTermsNullableFilter<"Vendor"> | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    taxInvoiceEmail?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    taxInvoiceMethod?: Prisma.EnumTaxInvoiceMethodNullableFilter<"Vendor"> | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    postalAddress?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isVatIncluded?: Prisma.BoolFilter<"Vendor"> | boolean;
    isWithholdingTax?: Prisma.BoolFilter<"Vendor"> | boolean;
    slaCompletionDays?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    penaltyTerms?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    repairWarrantyDays?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    unitPriceNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    approvalNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    rejectionNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    rejectedById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isBlacklisted?: Prisma.BoolFilter<"Vendor"> | boolean;
    blacklistReason?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    blacklistedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    createdById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Vendor"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vendor"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    approvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    rejectedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    documents?: Prisma.VendorDocumentListRelationFilter;
    assets?: Prisma.AssetListRelationFilter;
    maintenances?: Prisma.MaintenanceListRelationFilter;
    licenses?: Prisma.LicenseListRelationFilter;
};
export type VendorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    contactName?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    supportedClasses?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceRegion?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractStartDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractEndDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    slaHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    canVisitOnSite?: Prisma.SortOrder;
    canReceiveDevice?: Prisma.SortOrder;
    businessRegistrationNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    ceoName?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessType?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessItem?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressHeadOffice?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressDetail?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressBusiness?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactDepartment?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPosition?: Prisma.SortOrderInput | Prisma.SortOrder;
    operatingHoursStart?: Prisma.SortOrderInput | Prisma.SortOrder;
    operatingHoursEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    operatesOnWeekend?: Prisma.SortOrder;
    canHandleUrgent?: Prisma.SortOrder;
    urgentConditionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    brandModelNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankName?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankAccountNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankAccountNumberMask?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankAccountHolder?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentTerms?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxInvoiceEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxInvoiceMethod?: Prisma.SortOrderInput | Prisma.SortOrder;
    faxNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    postalAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVatIncluded?: Prisma.SortOrder;
    isWithholdingTax?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrderInput | Prisma.SortOrder;
    penaltyTerms?: Prisma.SortOrderInput | Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPriceNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvalNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    isBlacklisted?: Prisma.SortOrder;
    blacklistReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    blacklistedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedBy?: Prisma.UserOrderByWithRelationInput;
    rejectedBy?: Prisma.UserOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    documents?: Prisma.VendorDocumentOrderByRelationAggregateInput;
    assets?: Prisma.AssetOrderByRelationAggregateInput;
    maintenances?: Prisma.MaintenanceOrderByRelationAggregateInput;
    licenses?: Prisma.LicenseOrderByRelationAggregateInput;
};
export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    OR?: Prisma.VendorWhereInput[];
    NOT?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    name?: Prisma.StringFilter<"Vendor"> | string;
    contactName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    email?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    phone?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    status?: Prisma.EnumVendorStatusFilter<"Vendor"> | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFilter<"Vendor"> | $Enums.VendorType;
    supportedClasses?: Prisma.EnumAssetClassNullableListFilter<"Vendor">;
    approvedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    approvedById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    serviceRegion?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contractStartDate?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    contractEndDate?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    slaHours?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    canVisitOnSite?: Prisma.BoolFilter<"Vendor"> | boolean;
    canReceiveDevice?: Prisma.BoolFilter<"Vendor"> | boolean;
    businessRegistrationNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    ceoName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    businessType?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    businessItem?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressHeadOffice?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressDetail?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressBusiness?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contactDepartment?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contactPosition?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatingHoursStart?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatingHoursEnd?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatesOnWeekend?: Prisma.BoolFilter<"Vendor"> | boolean;
    canHandleUrgent?: Prisma.BoolFilter<"Vendor"> | boolean;
    urgentConditionNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    brandModelNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountNumberMask?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountHolder?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    paymentTerms?: Prisma.EnumPaymentTermsNullableFilter<"Vendor"> | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    taxInvoiceEmail?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    taxInvoiceMethod?: Prisma.EnumTaxInvoiceMethodNullableFilter<"Vendor"> | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    postalAddress?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isVatIncluded?: Prisma.BoolFilter<"Vendor"> | boolean;
    isWithholdingTax?: Prisma.BoolFilter<"Vendor"> | boolean;
    slaCompletionDays?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    penaltyTerms?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    repairWarrantyDays?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    unitPriceNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    approvalNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    rejectionNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    rejectedById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isBlacklisted?: Prisma.BoolFilter<"Vendor"> | boolean;
    blacklistReason?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    blacklistedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    createdById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Vendor"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vendor"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    approvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    rejectedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    createdBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    documents?: Prisma.VendorDocumentListRelationFilter;
    assets?: Prisma.AssetListRelationFilter;
    maintenances?: Prisma.MaintenanceListRelationFilter;
    licenses?: Prisma.LicenseListRelationFilter;
}, "id">;
export type VendorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    contactName?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    supportedClasses?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceRegion?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractStartDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractEndDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    slaHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    canVisitOnSite?: Prisma.SortOrder;
    canReceiveDevice?: Prisma.SortOrder;
    businessRegistrationNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    ceoName?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessType?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessItem?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressHeadOffice?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressDetail?: Prisma.SortOrderInput | Prisma.SortOrder;
    addressBusiness?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactDepartment?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPosition?: Prisma.SortOrderInput | Prisma.SortOrder;
    operatingHoursStart?: Prisma.SortOrderInput | Prisma.SortOrder;
    operatingHoursEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    operatesOnWeekend?: Prisma.SortOrder;
    canHandleUrgent?: Prisma.SortOrder;
    urgentConditionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    brandModelNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankName?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankAccountNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankAccountNumberMask?: Prisma.SortOrderInput | Prisma.SortOrder;
    bankAccountHolder?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentTerms?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxInvoiceEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxInvoiceMethod?: Prisma.SortOrderInput | Prisma.SortOrder;
    faxNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    postalAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVatIncluded?: Prisma.SortOrder;
    isWithholdingTax?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrderInput | Prisma.SortOrder;
    penaltyTerms?: Prisma.SortOrderInput | Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPriceNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvalNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    isBlacklisted?: Prisma.SortOrder;
    blacklistReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    blacklistedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.VendorCountOrderByAggregateInput;
    _avg?: Prisma.VendorAvgOrderByAggregateInput;
    _max?: Prisma.VendorMaxOrderByAggregateInput;
    _min?: Prisma.VendorMinOrderByAggregateInput;
    _sum?: Prisma.VendorSumOrderByAggregateInput;
};
export type VendorScalarWhereWithAggregatesInput = {
    AND?: Prisma.VendorScalarWhereWithAggregatesInput | Prisma.VendorScalarWhereWithAggregatesInput[];
    OR?: Prisma.VendorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VendorScalarWhereWithAggregatesInput | Prisma.VendorScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Vendor"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Vendor"> | string;
    contactName?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    status?: Prisma.EnumVendorStatusWithAggregatesFilter<"Vendor"> | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeWithAggregatesFilter<"Vendor"> | $Enums.VendorType;
    supportedClasses?: Prisma.EnumAssetClassNullableListFilter<"Vendor">;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null;
    approvedById?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    serviceRegion?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    contractStartDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null;
    contractEndDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null;
    slaHours?: Prisma.IntNullableWithAggregatesFilter<"Vendor"> | number | null;
    canVisitOnSite?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    canReceiveDevice?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    businessRegistrationNumber?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    ceoName?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    businessType?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    businessItem?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    addressHeadOffice?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    addressDetail?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    addressBusiness?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    contactDepartment?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    contactPosition?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    operatingHoursStart?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    operatingHoursEnd?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    operatesOnWeekend?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    canHandleUrgent?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    urgentConditionNote?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    brandModelNote?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    bankName?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    bankAccountNumber?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    bankAccountNumberMask?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    bankAccountHolder?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    paymentTerms?: Prisma.EnumPaymentTermsNullableWithAggregatesFilter<"Vendor"> | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.IntNullableWithAggregatesFilter<"Vendor"> | number | null;
    taxInvoiceEmail?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    taxInvoiceMethod?: Prisma.EnumTaxInvoiceMethodNullableWithAggregatesFilter<"Vendor"> | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    postalAddress?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    isVatIncluded?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    isWithholdingTax?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    slaCompletionDays?: Prisma.IntNullableWithAggregatesFilter<"Vendor"> | number | null;
    penaltyTerms?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    repairWarrantyDays?: Prisma.IntNullableWithAggregatesFilter<"Vendor"> | number | null;
    unitPriceNote?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    approvalNote?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    rejectionNote?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null;
    rejectedById?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    isBlacklisted?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
    blacklistReason?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    blacklistedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null;
    createdById?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Vendor"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Vendor"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null;
};
export type VendorCreateInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateManyInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type VendorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type VendorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type VendorListRelationFilter = {
    every?: Prisma.VendorWhereInput;
    some?: Prisma.VendorWhereInput;
    none?: Prisma.VendorWhereInput;
};
export type VendorOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VendorNullableScalarRelationFilter = {
    is?: Prisma.VendorWhereInput | null;
    isNot?: Prisma.VendorWhereInput | null;
};
export type EnumAssetClassNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetClass[] | Prisma.ListEnumAssetClassFieldRefInput<$PrismaModel> | null;
    has?: $Enums.AssetClass | Prisma.EnumAssetClassFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.AssetClass[] | Prisma.ListEnumAssetClassFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.AssetClass[] | Prisma.ListEnumAssetClassFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type VendorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    supportedClasses?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    approvedById?: Prisma.SortOrder;
    serviceRegion?: Prisma.SortOrder;
    contractStartDate?: Prisma.SortOrder;
    contractEndDate?: Prisma.SortOrder;
    slaHours?: Prisma.SortOrder;
    canVisitOnSite?: Prisma.SortOrder;
    canReceiveDevice?: Prisma.SortOrder;
    businessRegistrationNumber?: Prisma.SortOrder;
    ceoName?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    businessItem?: Prisma.SortOrder;
    addressHeadOffice?: Prisma.SortOrder;
    addressDetail?: Prisma.SortOrder;
    addressBusiness?: Prisma.SortOrder;
    contactDepartment?: Prisma.SortOrder;
    contactPosition?: Prisma.SortOrder;
    operatingHoursStart?: Prisma.SortOrder;
    operatingHoursEnd?: Prisma.SortOrder;
    operatesOnWeekend?: Prisma.SortOrder;
    canHandleUrgent?: Prisma.SortOrder;
    urgentConditionNote?: Prisma.SortOrder;
    brandModelNote?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    bankAccountNumber?: Prisma.SortOrder;
    bankAccountNumberMask?: Prisma.SortOrder;
    bankAccountHolder?: Prisma.SortOrder;
    paymentTerms?: Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrder;
    taxInvoiceEmail?: Prisma.SortOrder;
    taxInvoiceMethod?: Prisma.SortOrder;
    faxNumber?: Prisma.SortOrder;
    postalAddress?: Prisma.SortOrder;
    isVatIncluded?: Prisma.SortOrder;
    isWithholdingTax?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrder;
    penaltyTerms?: Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrder;
    unitPriceNote?: Prisma.SortOrder;
    approvalNote?: Prisma.SortOrder;
    rejectionNote?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectedById?: Prisma.SortOrder;
    isBlacklisted?: Prisma.SortOrder;
    blacklistReason?: Prisma.SortOrder;
    blacklistedAt?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type VendorAvgOrderByAggregateInput = {
    slaHours?: Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrder;
};
export type VendorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    approvedById?: Prisma.SortOrder;
    serviceRegion?: Prisma.SortOrder;
    contractStartDate?: Prisma.SortOrder;
    contractEndDate?: Prisma.SortOrder;
    slaHours?: Prisma.SortOrder;
    canVisitOnSite?: Prisma.SortOrder;
    canReceiveDevice?: Prisma.SortOrder;
    businessRegistrationNumber?: Prisma.SortOrder;
    ceoName?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    businessItem?: Prisma.SortOrder;
    addressHeadOffice?: Prisma.SortOrder;
    addressDetail?: Prisma.SortOrder;
    addressBusiness?: Prisma.SortOrder;
    contactDepartment?: Prisma.SortOrder;
    contactPosition?: Prisma.SortOrder;
    operatingHoursStart?: Prisma.SortOrder;
    operatingHoursEnd?: Prisma.SortOrder;
    operatesOnWeekend?: Prisma.SortOrder;
    canHandleUrgent?: Prisma.SortOrder;
    urgentConditionNote?: Prisma.SortOrder;
    brandModelNote?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    bankAccountNumber?: Prisma.SortOrder;
    bankAccountNumberMask?: Prisma.SortOrder;
    bankAccountHolder?: Prisma.SortOrder;
    paymentTerms?: Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrder;
    taxInvoiceEmail?: Prisma.SortOrder;
    taxInvoiceMethod?: Prisma.SortOrder;
    faxNumber?: Prisma.SortOrder;
    postalAddress?: Prisma.SortOrder;
    isVatIncluded?: Prisma.SortOrder;
    isWithholdingTax?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrder;
    penaltyTerms?: Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrder;
    unitPriceNote?: Prisma.SortOrder;
    approvalNote?: Prisma.SortOrder;
    rejectionNote?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectedById?: Prisma.SortOrder;
    isBlacklisted?: Prisma.SortOrder;
    blacklistReason?: Prisma.SortOrder;
    blacklistedAt?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type VendorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    approvedById?: Prisma.SortOrder;
    serviceRegion?: Prisma.SortOrder;
    contractStartDate?: Prisma.SortOrder;
    contractEndDate?: Prisma.SortOrder;
    slaHours?: Prisma.SortOrder;
    canVisitOnSite?: Prisma.SortOrder;
    canReceiveDevice?: Prisma.SortOrder;
    businessRegistrationNumber?: Prisma.SortOrder;
    ceoName?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    businessItem?: Prisma.SortOrder;
    addressHeadOffice?: Prisma.SortOrder;
    addressDetail?: Prisma.SortOrder;
    addressBusiness?: Prisma.SortOrder;
    contactDepartment?: Prisma.SortOrder;
    contactPosition?: Prisma.SortOrder;
    operatingHoursStart?: Prisma.SortOrder;
    operatingHoursEnd?: Prisma.SortOrder;
    operatesOnWeekend?: Prisma.SortOrder;
    canHandleUrgent?: Prisma.SortOrder;
    urgentConditionNote?: Prisma.SortOrder;
    brandModelNote?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    bankAccountNumber?: Prisma.SortOrder;
    bankAccountNumberMask?: Prisma.SortOrder;
    bankAccountHolder?: Prisma.SortOrder;
    paymentTerms?: Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrder;
    taxInvoiceEmail?: Prisma.SortOrder;
    taxInvoiceMethod?: Prisma.SortOrder;
    faxNumber?: Prisma.SortOrder;
    postalAddress?: Prisma.SortOrder;
    isVatIncluded?: Prisma.SortOrder;
    isWithholdingTax?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrder;
    penaltyTerms?: Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrder;
    unitPriceNote?: Prisma.SortOrder;
    approvalNote?: Prisma.SortOrder;
    rejectionNote?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectedById?: Prisma.SortOrder;
    isBlacklisted?: Prisma.SortOrder;
    blacklistReason?: Prisma.SortOrder;
    blacklistedAt?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type VendorSumOrderByAggregateInput = {
    slaHours?: Prisma.SortOrder;
    paymentDaysAfter?: Prisma.SortOrder;
    slaCompletionDays?: Prisma.SortOrder;
    repairWarrantyDays?: Prisma.SortOrder;
};
export type VendorScalarRelationFilter = {
    is?: Prisma.VendorWhereInput;
    isNot?: Prisma.VendorWhereInput;
};
export type VendorCreateNestedManyWithoutApprovedByInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutApprovedByInput, Prisma.VendorUncheckedCreateWithoutApprovedByInput> | Prisma.VendorCreateWithoutApprovedByInput[] | Prisma.VendorUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutApprovedByInput | Prisma.VendorCreateOrConnectWithoutApprovedByInput[];
    createMany?: Prisma.VendorCreateManyApprovedByInputEnvelope;
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
};
export type VendorCreateNestedManyWithoutRejectedByInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutRejectedByInput, Prisma.VendorUncheckedCreateWithoutRejectedByInput> | Prisma.VendorCreateWithoutRejectedByInput[] | Prisma.VendorUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutRejectedByInput | Prisma.VendorCreateOrConnectWithoutRejectedByInput[];
    createMany?: Prisma.VendorCreateManyRejectedByInputEnvelope;
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
};
export type VendorCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutCreatedByInput, Prisma.VendorUncheckedCreateWithoutCreatedByInput> | Prisma.VendorCreateWithoutCreatedByInput[] | Prisma.VendorUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutCreatedByInput | Prisma.VendorCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.VendorCreateManyCreatedByInputEnvelope;
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
};
export type VendorUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutApprovedByInput, Prisma.VendorUncheckedCreateWithoutApprovedByInput> | Prisma.VendorCreateWithoutApprovedByInput[] | Prisma.VendorUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutApprovedByInput | Prisma.VendorCreateOrConnectWithoutApprovedByInput[];
    createMany?: Prisma.VendorCreateManyApprovedByInputEnvelope;
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
};
export type VendorUncheckedCreateNestedManyWithoutRejectedByInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutRejectedByInput, Prisma.VendorUncheckedCreateWithoutRejectedByInput> | Prisma.VendorCreateWithoutRejectedByInput[] | Prisma.VendorUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutRejectedByInput | Prisma.VendorCreateOrConnectWithoutRejectedByInput[];
    createMany?: Prisma.VendorCreateManyRejectedByInputEnvelope;
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
};
export type VendorUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutCreatedByInput, Prisma.VendorUncheckedCreateWithoutCreatedByInput> | Prisma.VendorCreateWithoutCreatedByInput[] | Prisma.VendorUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutCreatedByInput | Prisma.VendorCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.VendorCreateManyCreatedByInputEnvelope;
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
};
export type VendorUpdateManyWithoutApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutApprovedByInput, Prisma.VendorUncheckedCreateWithoutApprovedByInput> | Prisma.VendorCreateWithoutApprovedByInput[] | Prisma.VendorUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutApprovedByInput | Prisma.VendorCreateOrConnectWithoutApprovedByInput[];
    upsert?: Prisma.VendorUpsertWithWhereUniqueWithoutApprovedByInput | Prisma.VendorUpsertWithWhereUniqueWithoutApprovedByInput[];
    createMany?: Prisma.VendorCreateManyApprovedByInputEnvelope;
    set?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    disconnect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    delete?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    update?: Prisma.VendorUpdateWithWhereUniqueWithoutApprovedByInput | Prisma.VendorUpdateWithWhereUniqueWithoutApprovedByInput[];
    updateMany?: Prisma.VendorUpdateManyWithWhereWithoutApprovedByInput | Prisma.VendorUpdateManyWithWhereWithoutApprovedByInput[];
    deleteMany?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
};
export type VendorUpdateManyWithoutRejectedByNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutRejectedByInput, Prisma.VendorUncheckedCreateWithoutRejectedByInput> | Prisma.VendorCreateWithoutRejectedByInput[] | Prisma.VendorUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutRejectedByInput | Prisma.VendorCreateOrConnectWithoutRejectedByInput[];
    upsert?: Prisma.VendorUpsertWithWhereUniqueWithoutRejectedByInput | Prisma.VendorUpsertWithWhereUniqueWithoutRejectedByInput[];
    createMany?: Prisma.VendorCreateManyRejectedByInputEnvelope;
    set?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    disconnect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    delete?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    update?: Prisma.VendorUpdateWithWhereUniqueWithoutRejectedByInput | Prisma.VendorUpdateWithWhereUniqueWithoutRejectedByInput[];
    updateMany?: Prisma.VendorUpdateManyWithWhereWithoutRejectedByInput | Prisma.VendorUpdateManyWithWhereWithoutRejectedByInput[];
    deleteMany?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
};
export type VendorUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutCreatedByInput, Prisma.VendorUncheckedCreateWithoutCreatedByInput> | Prisma.VendorCreateWithoutCreatedByInput[] | Prisma.VendorUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutCreatedByInput | Prisma.VendorCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.VendorUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.VendorUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.VendorCreateManyCreatedByInputEnvelope;
    set?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    disconnect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    delete?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    update?: Prisma.VendorUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.VendorUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.VendorUpdateManyWithWhereWithoutCreatedByInput | Prisma.VendorUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
};
export type VendorUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutApprovedByInput, Prisma.VendorUncheckedCreateWithoutApprovedByInput> | Prisma.VendorCreateWithoutApprovedByInput[] | Prisma.VendorUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutApprovedByInput | Prisma.VendorCreateOrConnectWithoutApprovedByInput[];
    upsert?: Prisma.VendorUpsertWithWhereUniqueWithoutApprovedByInput | Prisma.VendorUpsertWithWhereUniqueWithoutApprovedByInput[];
    createMany?: Prisma.VendorCreateManyApprovedByInputEnvelope;
    set?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    disconnect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    delete?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    update?: Prisma.VendorUpdateWithWhereUniqueWithoutApprovedByInput | Prisma.VendorUpdateWithWhereUniqueWithoutApprovedByInput[];
    updateMany?: Prisma.VendorUpdateManyWithWhereWithoutApprovedByInput | Prisma.VendorUpdateManyWithWhereWithoutApprovedByInput[];
    deleteMany?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
};
export type VendorUncheckedUpdateManyWithoutRejectedByNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutRejectedByInput, Prisma.VendorUncheckedCreateWithoutRejectedByInput> | Prisma.VendorCreateWithoutRejectedByInput[] | Prisma.VendorUncheckedCreateWithoutRejectedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutRejectedByInput | Prisma.VendorCreateOrConnectWithoutRejectedByInput[];
    upsert?: Prisma.VendorUpsertWithWhereUniqueWithoutRejectedByInput | Prisma.VendorUpsertWithWhereUniqueWithoutRejectedByInput[];
    createMany?: Prisma.VendorCreateManyRejectedByInputEnvelope;
    set?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    disconnect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    delete?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    update?: Prisma.VendorUpdateWithWhereUniqueWithoutRejectedByInput | Prisma.VendorUpdateWithWhereUniqueWithoutRejectedByInput[];
    updateMany?: Prisma.VendorUpdateManyWithWhereWithoutRejectedByInput | Prisma.VendorUpdateManyWithWhereWithoutRejectedByInput[];
    deleteMany?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
};
export type VendorUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutCreatedByInput, Prisma.VendorUncheckedCreateWithoutCreatedByInput> | Prisma.VendorCreateWithoutCreatedByInput[] | Prisma.VendorUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutCreatedByInput | Prisma.VendorCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.VendorUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.VendorUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.VendorCreateManyCreatedByInputEnvelope;
    set?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    disconnect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    delete?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    connect?: Prisma.VendorWhereUniqueInput | Prisma.VendorWhereUniqueInput[];
    update?: Prisma.VendorUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.VendorUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.VendorUpdateManyWithWhereWithoutCreatedByInput | Prisma.VendorUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
};
export type VendorCreateNestedOneWithoutLicensesInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutLicensesInput, Prisma.VendorUncheckedCreateWithoutLicensesInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutLicensesInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneWithoutLicensesNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutLicensesInput, Prisma.VendorUncheckedCreateWithoutLicensesInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutLicensesInput;
    upsert?: Prisma.VendorUpsertWithoutLicensesInput;
    disconnect?: Prisma.VendorWhereInput | boolean;
    delete?: Prisma.VendorWhereInput | boolean;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutLicensesInput, Prisma.VendorUpdateWithoutLicensesInput>, Prisma.VendorUncheckedUpdateWithoutLicensesInput>;
};
export type VendorCreatesupportedClassesInput = {
    set: $Enums.AssetClass[];
};
export type EnumVendorStatusFieldUpdateOperationsInput = {
    set?: $Enums.VendorStatus;
};
export type EnumVendorTypeFieldUpdateOperationsInput = {
    set?: $Enums.VendorType;
};
export type VendorUpdatesupportedClassesInput = {
    set?: $Enums.AssetClass[];
    push?: $Enums.AssetClass | $Enums.AssetClass[];
};
export type NullableEnumPaymentTermsFieldUpdateOperationsInput = {
    set?: $Enums.PaymentTerms | null;
};
export type NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput = {
    set?: $Enums.TaxInvoiceMethod | null;
};
export type VendorCreateNestedOneWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutDocumentsInput, Prisma.VendorUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutDocumentsInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutDocumentsInput, Prisma.VendorUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutDocumentsInput;
    upsert?: Prisma.VendorUpsertWithoutDocumentsInput;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutDocumentsInput, Prisma.VendorUpdateWithoutDocumentsInput>, Prisma.VendorUncheckedUpdateWithoutDocumentsInput>;
};
export type VendorCreateNestedOneWithoutAssetsInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutAssetsInput, Prisma.VendorUncheckedCreateWithoutAssetsInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutAssetsInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneWithoutAssetsNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutAssetsInput, Prisma.VendorUncheckedCreateWithoutAssetsInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutAssetsInput;
    upsert?: Prisma.VendorUpsertWithoutAssetsInput;
    disconnect?: Prisma.VendorWhereInput | boolean;
    delete?: Prisma.VendorWhereInput | boolean;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutAssetsInput, Prisma.VendorUpdateWithoutAssetsInput>, Prisma.VendorUncheckedUpdateWithoutAssetsInput>;
};
export type VendorCreateNestedOneWithoutMaintenancesInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutMaintenancesInput, Prisma.VendorUncheckedCreateWithoutMaintenancesInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutMaintenancesInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneWithoutMaintenancesNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutMaintenancesInput, Prisma.VendorUncheckedCreateWithoutMaintenancesInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutMaintenancesInput;
    upsert?: Prisma.VendorUpsertWithoutMaintenancesInput;
    disconnect?: Prisma.VendorWhereInput | boolean;
    delete?: Prisma.VendorWhereInput | boolean;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutMaintenancesInput, Prisma.VendorUpdateWithoutMaintenancesInput>, Prisma.VendorUncheckedUpdateWithoutMaintenancesInput>;
};
export type VendorCreateWithoutApprovedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutApprovedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutApprovedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutApprovedByInput, Prisma.VendorUncheckedCreateWithoutApprovedByInput>;
};
export type VendorCreateManyApprovedByInputEnvelope = {
    data: Prisma.VendorCreateManyApprovedByInput | Prisma.VendorCreateManyApprovedByInput[];
    skipDuplicates?: boolean;
};
export type VendorCreateWithoutRejectedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutRejectedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutRejectedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutRejectedByInput, Prisma.VendorUncheckedCreateWithoutRejectedByInput>;
};
export type VendorCreateManyRejectedByInputEnvelope = {
    data: Prisma.VendorCreateManyRejectedByInput | Prisma.VendorCreateManyRejectedByInput[];
    skipDuplicates?: boolean;
};
export type VendorCreateWithoutCreatedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutCreatedByInput, Prisma.VendorUncheckedCreateWithoutCreatedByInput>;
};
export type VendorCreateManyCreatedByInputEnvelope = {
    data: Prisma.VendorCreateManyCreatedByInput | Prisma.VendorCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type VendorUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorUpdateWithoutApprovedByInput, Prisma.VendorUncheckedUpdateWithoutApprovedByInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutApprovedByInput, Prisma.VendorUncheckedCreateWithoutApprovedByInput>;
};
export type VendorUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutApprovedByInput, Prisma.VendorUncheckedUpdateWithoutApprovedByInput>;
};
export type VendorUpdateManyWithWhereWithoutApprovedByInput = {
    where: Prisma.VendorScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyWithoutApprovedByInput>;
};
export type VendorScalarWhereInput = {
    AND?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
    OR?: Prisma.VendorScalarWhereInput[];
    NOT?: Prisma.VendorScalarWhereInput | Prisma.VendorScalarWhereInput[];
    id?: Prisma.StringFilter<"Vendor"> | string;
    name?: Prisma.StringFilter<"Vendor"> | string;
    contactName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    email?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    phone?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    status?: Prisma.EnumVendorStatusFilter<"Vendor"> | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFilter<"Vendor"> | $Enums.VendorType;
    supportedClasses?: Prisma.EnumAssetClassNullableListFilter<"Vendor">;
    approvedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    approvedById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    serviceRegion?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contractStartDate?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    contractEndDate?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    slaHours?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    canVisitOnSite?: Prisma.BoolFilter<"Vendor"> | boolean;
    canReceiveDevice?: Prisma.BoolFilter<"Vendor"> | boolean;
    businessRegistrationNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    ceoName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    businessType?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    businessItem?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressHeadOffice?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressDetail?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    addressBusiness?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contactDepartment?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    contactPosition?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatingHoursStart?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatingHoursEnd?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    operatesOnWeekend?: Prisma.BoolFilter<"Vendor"> | boolean;
    canHandleUrgent?: Prisma.BoolFilter<"Vendor"> | boolean;
    urgentConditionNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    brandModelNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankName?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountNumberMask?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    bankAccountHolder?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    paymentTerms?: Prisma.EnumPaymentTermsNullableFilter<"Vendor"> | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    taxInvoiceEmail?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    taxInvoiceMethod?: Prisma.EnumTaxInvoiceMethodNullableFilter<"Vendor"> | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    postalAddress?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isVatIncluded?: Prisma.BoolFilter<"Vendor"> | boolean;
    isWithholdingTax?: Prisma.BoolFilter<"Vendor"> | boolean;
    slaCompletionDays?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    penaltyTerms?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    repairWarrantyDays?: Prisma.IntNullableFilter<"Vendor"> | number | null;
    unitPriceNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    approvalNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    rejectionNote?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    rejectedById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isBlacklisted?: Prisma.BoolFilter<"Vendor"> | boolean;
    blacklistReason?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    blacklistedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
    createdById?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Vendor"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vendor"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Vendor"> | Date | string | null;
};
export type VendorUpsertWithWhereUniqueWithoutRejectedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorUpdateWithoutRejectedByInput, Prisma.VendorUncheckedUpdateWithoutRejectedByInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutRejectedByInput, Prisma.VendorUncheckedCreateWithoutRejectedByInput>;
};
export type VendorUpdateWithWhereUniqueWithoutRejectedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutRejectedByInput, Prisma.VendorUncheckedUpdateWithoutRejectedByInput>;
};
export type VendorUpdateManyWithWhereWithoutRejectedByInput = {
    where: Prisma.VendorScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyWithoutRejectedByInput>;
};
export type VendorUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorUpdateWithoutCreatedByInput, Prisma.VendorUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutCreatedByInput, Prisma.VendorUncheckedCreateWithoutCreatedByInput>;
};
export type VendorUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.VendorWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutCreatedByInput, Prisma.VendorUncheckedUpdateWithoutCreatedByInput>;
};
export type VendorUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.VendorScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyWithoutCreatedByInput>;
};
export type VendorCreateWithoutLicensesInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutLicensesInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutLicensesInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutLicensesInput, Prisma.VendorUncheckedCreateWithoutLicensesInput>;
};
export type VendorUpsertWithoutLicensesInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutLicensesInput, Prisma.VendorUncheckedUpdateWithoutLicensesInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutLicensesInput, Prisma.VendorUncheckedCreateWithoutLicensesInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutLicensesInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutLicensesInput, Prisma.VendorUncheckedUpdateWithoutLicensesInput>;
};
export type VendorUpdateWithoutLicensesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutLicensesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateWithoutDocumentsInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutDocumentsInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutDocumentsInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutDocumentsInput, Prisma.VendorUncheckedCreateWithoutDocumentsInput>;
};
export type VendorUpsertWithoutDocumentsInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutDocumentsInput, Prisma.VendorUncheckedUpdateWithoutDocumentsInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutDocumentsInput, Prisma.VendorUncheckedCreateWithoutDocumentsInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutDocumentsInput, Prisma.VendorUncheckedUpdateWithoutDocumentsInput>;
};
export type VendorUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateWithoutAssetsInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutAssetsInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    maintenances?: Prisma.MaintenanceUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutAssetsInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutAssetsInput, Prisma.VendorUncheckedCreateWithoutAssetsInput>;
};
export type VendorUpsertWithoutAssetsInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutAssetsInput, Prisma.VendorUncheckedUpdateWithoutAssetsInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutAssetsInput, Prisma.VendorUncheckedCreateWithoutAssetsInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutAssetsInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutAssetsInput, Prisma.VendorUncheckedUpdateWithoutAssetsInput>;
};
export type VendorUpdateWithoutAssetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutAssetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateWithoutMaintenancesInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovedVendorsInput;
    rejectedBy?: Prisma.UserCreateNestedOneWithoutRejectedVendorsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedVendorsInput;
    documents?: Prisma.VendorDocumentCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutMaintenancesInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedCreateNestedManyWithoutVendorInput;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutVendorInput;
    licenses?: Prisma.LicenseUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutMaintenancesInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutMaintenancesInput, Prisma.VendorUncheckedCreateWithoutMaintenancesInput>;
};
export type VendorUpsertWithoutMaintenancesInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutMaintenancesInput, Prisma.VendorUncheckedUpdateWithoutMaintenancesInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutMaintenancesInput, Prisma.VendorUncheckedCreateWithoutMaintenancesInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutMaintenancesInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutMaintenancesInput, Prisma.VendorUncheckedUpdateWithoutMaintenancesInput>;
};
export type VendorUpdateWithoutMaintenancesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutMaintenancesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateManyApprovedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type VendorCreateManyRejectedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type VendorCreateManyCreatedByInput = {
    id?: string;
    name: string;
    contactName?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: $Enums.VendorStatus;
    type?: $Enums.VendorType;
    supportedClasses?: Prisma.VendorCreatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Date | string | null;
    approvedById?: string | null;
    serviceRegion?: string | null;
    contractStartDate?: Date | string | null;
    contractEndDate?: Date | string | null;
    slaHours?: number | null;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: string | null;
    ceoName?: string | null;
    businessType?: string | null;
    businessItem?: string | null;
    addressHeadOffice?: string | null;
    addressDetail?: string | null;
    addressBusiness?: string | null;
    contactDepartment?: string | null;
    contactPosition?: string | null;
    operatingHoursStart?: string | null;
    operatingHoursEnd?: string | null;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: string | null;
    brandModelNote?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountNumberMask?: string | null;
    bankAccountHolder?: string | null;
    paymentTerms?: $Enums.PaymentTerms | null;
    paymentDaysAfter?: number | null;
    taxInvoiceEmail?: string | null;
    taxInvoiceMethod?: $Enums.TaxInvoiceMethod | null;
    faxNumber?: string | null;
    postalAddress?: string | null;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: number | null;
    penaltyTerms?: string | null;
    repairWarrantyDays?: number | null;
    unitPriceNote?: string | null;
    approvalNote?: string | null;
    rejectionNote?: string | null;
    rejectedAt?: Date | string | null;
    rejectedById?: string | null;
    isBlacklisted?: boolean;
    blacklistReason?: string | null;
    blacklistedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type VendorUpdateWithoutApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateManyWithoutApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type VendorUpdateWithoutRejectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    createdBy?: Prisma.UserUpdateOneWithoutCreatedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutRejectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateManyWithoutRejectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type VendorUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovedVendorsNestedInput;
    rejectedBy?: Prisma.UserUpdateOneWithoutRejectedVendorsNestedInput;
    documents?: Prisma.VendorDocumentUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.VendorDocumentUncheckedUpdateManyWithoutVendorNestedInput;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutVendorNestedInput;
    maintenances?: Prisma.MaintenanceUncheckedUpdateManyWithoutVendorNestedInput;
    licenses?: Prisma.LicenseUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumVendorStatusFieldUpdateOperationsInput | $Enums.VendorStatus;
    type?: Prisma.EnumVendorTypeFieldUpdateOperationsInput | $Enums.VendorType;
    supportedClasses?: Prisma.VendorUpdatesupportedClassesInput | $Enums.AssetClass[];
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serviceRegion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractStartDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    contractEndDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    slaHours?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    canVisitOnSite?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canReceiveDevice?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessRegistrationNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ceoName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessItem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressHeadOffice?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressDetail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    addressBusiness?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactDepartment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPosition?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursStart?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatingHoursEnd?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    operatesOnWeekend?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canHandleUrgent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    urgentConditionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    brandModelNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountNumberMask?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bankAccountHolder?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentTerms?: Prisma.NullableEnumPaymentTermsFieldUpdateOperationsInput | $Enums.PaymentTerms | null;
    paymentDaysAfter?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    taxInvoiceEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxInvoiceMethod?: Prisma.NullableEnumTaxInvoiceMethodFieldUpdateOperationsInput | $Enums.TaxInvoiceMethod | null;
    faxNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVatIncluded?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isWithholdingTax?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    slaCompletionDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    penaltyTerms?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairWarrantyDays?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    unitPriceNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvalNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBlacklisted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    blacklistReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blacklistedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type VendorCountOutputType
 */
export type VendorCountOutputType = {
    documents: number;
    assets: number;
    maintenances: number;
    licenses: number;
};
export type VendorCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    documents?: boolean | VendorCountOutputTypeCountDocumentsArgs;
    assets?: boolean | VendorCountOutputTypeCountAssetsArgs;
    maintenances?: boolean | VendorCountOutputTypeCountMaintenancesArgs;
    licenses?: boolean | VendorCountOutputTypeCountLicensesArgs;
};
/**
 * VendorCountOutputType without action
 */
export type VendorCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorCountOutputType
     */
    select?: Prisma.VendorCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * VendorCountOutputType without action
 */
export type VendorCountOutputTypeCountDocumentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorDocumentWhereInput;
};
/**
 * VendorCountOutputType without action
 */
export type VendorCountOutputTypeCountAssetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
};
/**
 * VendorCountOutputType without action
 */
export type VendorCountOutputTypeCountMaintenancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceWhereInput;
};
/**
 * VendorCountOutputType without action
 */
export type VendorCountOutputTypeCountLicensesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicenseWhereInput;
};
export type VendorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    status?: boolean;
    type?: boolean;
    supportedClasses?: boolean;
    approvedAt?: boolean;
    approvedById?: boolean;
    serviceRegion?: boolean;
    contractStartDate?: boolean;
    contractEndDate?: boolean;
    slaHours?: boolean;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: boolean;
    ceoName?: boolean;
    businessType?: boolean;
    businessItem?: boolean;
    addressHeadOffice?: boolean;
    addressDetail?: boolean;
    addressBusiness?: boolean;
    contactDepartment?: boolean;
    contactPosition?: boolean;
    operatingHoursStart?: boolean;
    operatingHoursEnd?: boolean;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: boolean;
    brandModelNote?: boolean;
    bankName?: boolean;
    bankAccountNumber?: boolean;
    bankAccountNumberMask?: boolean;
    bankAccountHolder?: boolean;
    paymentTerms?: boolean;
    paymentDaysAfter?: boolean;
    taxInvoiceEmail?: boolean;
    taxInvoiceMethod?: boolean;
    faxNumber?: boolean;
    postalAddress?: boolean;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: boolean;
    penaltyTerms?: boolean;
    repairWarrantyDays?: boolean;
    unitPriceNote?: boolean;
    approvalNote?: boolean;
    rejectionNote?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    isBlacklisted?: boolean;
    blacklistReason?: boolean;
    blacklistedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    approvedBy?: boolean | Prisma.Vendor$approvedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Vendor$rejectedByArgs<ExtArgs>;
    createdBy?: boolean | Prisma.Vendor$createdByArgs<ExtArgs>;
    documents?: boolean | Prisma.Vendor$documentsArgs<ExtArgs>;
    assets?: boolean | Prisma.Vendor$assetsArgs<ExtArgs>;
    maintenances?: boolean | Prisma.Vendor$maintenancesArgs<ExtArgs>;
    licenses?: boolean | Prisma.Vendor$licensesArgs<ExtArgs>;
    _count?: boolean | Prisma.VendorCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendor"]>;
export type VendorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    status?: boolean;
    type?: boolean;
    supportedClasses?: boolean;
    approvedAt?: boolean;
    approvedById?: boolean;
    serviceRegion?: boolean;
    contractStartDate?: boolean;
    contractEndDate?: boolean;
    slaHours?: boolean;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: boolean;
    ceoName?: boolean;
    businessType?: boolean;
    businessItem?: boolean;
    addressHeadOffice?: boolean;
    addressDetail?: boolean;
    addressBusiness?: boolean;
    contactDepartment?: boolean;
    contactPosition?: boolean;
    operatingHoursStart?: boolean;
    operatingHoursEnd?: boolean;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: boolean;
    brandModelNote?: boolean;
    bankName?: boolean;
    bankAccountNumber?: boolean;
    bankAccountNumberMask?: boolean;
    bankAccountHolder?: boolean;
    paymentTerms?: boolean;
    paymentDaysAfter?: boolean;
    taxInvoiceEmail?: boolean;
    taxInvoiceMethod?: boolean;
    faxNumber?: boolean;
    postalAddress?: boolean;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: boolean;
    penaltyTerms?: boolean;
    repairWarrantyDays?: boolean;
    unitPriceNote?: boolean;
    approvalNote?: boolean;
    rejectionNote?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    isBlacklisted?: boolean;
    blacklistReason?: boolean;
    blacklistedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    approvedBy?: boolean | Prisma.Vendor$approvedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Vendor$rejectedByArgs<ExtArgs>;
    createdBy?: boolean | Prisma.Vendor$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["vendor"]>;
export type VendorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    status?: boolean;
    type?: boolean;
    supportedClasses?: boolean;
    approvedAt?: boolean;
    approvedById?: boolean;
    serviceRegion?: boolean;
    contractStartDate?: boolean;
    contractEndDate?: boolean;
    slaHours?: boolean;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: boolean;
    ceoName?: boolean;
    businessType?: boolean;
    businessItem?: boolean;
    addressHeadOffice?: boolean;
    addressDetail?: boolean;
    addressBusiness?: boolean;
    contactDepartment?: boolean;
    contactPosition?: boolean;
    operatingHoursStart?: boolean;
    operatingHoursEnd?: boolean;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: boolean;
    brandModelNote?: boolean;
    bankName?: boolean;
    bankAccountNumber?: boolean;
    bankAccountNumberMask?: boolean;
    bankAccountHolder?: boolean;
    paymentTerms?: boolean;
    paymentDaysAfter?: boolean;
    taxInvoiceEmail?: boolean;
    taxInvoiceMethod?: boolean;
    faxNumber?: boolean;
    postalAddress?: boolean;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: boolean;
    penaltyTerms?: boolean;
    repairWarrantyDays?: boolean;
    unitPriceNote?: boolean;
    approvalNote?: boolean;
    rejectionNote?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    isBlacklisted?: boolean;
    blacklistReason?: boolean;
    blacklistedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    approvedBy?: boolean | Prisma.Vendor$approvedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Vendor$rejectedByArgs<ExtArgs>;
    createdBy?: boolean | Prisma.Vendor$createdByArgs<ExtArgs>;
}, ExtArgs["result"]["vendor"]>;
export type VendorSelectScalar = {
    id?: boolean;
    name?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    status?: boolean;
    type?: boolean;
    supportedClasses?: boolean;
    approvedAt?: boolean;
    approvedById?: boolean;
    serviceRegion?: boolean;
    contractStartDate?: boolean;
    contractEndDate?: boolean;
    slaHours?: boolean;
    canVisitOnSite?: boolean;
    canReceiveDevice?: boolean;
    businessRegistrationNumber?: boolean;
    ceoName?: boolean;
    businessType?: boolean;
    businessItem?: boolean;
    addressHeadOffice?: boolean;
    addressDetail?: boolean;
    addressBusiness?: boolean;
    contactDepartment?: boolean;
    contactPosition?: boolean;
    operatingHoursStart?: boolean;
    operatingHoursEnd?: boolean;
    operatesOnWeekend?: boolean;
    canHandleUrgent?: boolean;
    urgentConditionNote?: boolean;
    brandModelNote?: boolean;
    bankName?: boolean;
    bankAccountNumber?: boolean;
    bankAccountNumberMask?: boolean;
    bankAccountHolder?: boolean;
    paymentTerms?: boolean;
    paymentDaysAfter?: boolean;
    taxInvoiceEmail?: boolean;
    taxInvoiceMethod?: boolean;
    faxNumber?: boolean;
    postalAddress?: boolean;
    isVatIncluded?: boolean;
    isWithholdingTax?: boolean;
    slaCompletionDays?: boolean;
    penaltyTerms?: boolean;
    repairWarrantyDays?: boolean;
    unitPriceNote?: boolean;
    approvalNote?: boolean;
    rejectionNote?: boolean;
    rejectedAt?: boolean;
    rejectedById?: boolean;
    isBlacklisted?: boolean;
    blacklistReason?: boolean;
    blacklistedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type VendorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "contactName" | "email" | "phone" | "status" | "type" | "supportedClasses" | "approvedAt" | "approvedById" | "serviceRegion" | "contractStartDate" | "contractEndDate" | "slaHours" | "canVisitOnSite" | "canReceiveDevice" | "businessRegistrationNumber" | "ceoName" | "businessType" | "businessItem" | "addressHeadOffice" | "addressDetail" | "addressBusiness" | "contactDepartment" | "contactPosition" | "operatingHoursStart" | "operatingHoursEnd" | "operatesOnWeekend" | "canHandleUrgent" | "urgentConditionNote" | "brandModelNote" | "bankName" | "bankAccountNumber" | "bankAccountNumberMask" | "bankAccountHolder" | "paymentTerms" | "paymentDaysAfter" | "taxInvoiceEmail" | "taxInvoiceMethod" | "faxNumber" | "postalAddress" | "isVatIncluded" | "isWithholdingTax" | "slaCompletionDays" | "penaltyTerms" | "repairWarrantyDays" | "unitPriceNote" | "approvalNote" | "rejectionNote" | "rejectedAt" | "rejectedById" | "isBlacklisted" | "blacklistReason" | "blacklistedAt" | "createdById" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["vendor"]>;
export type VendorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    approvedBy?: boolean | Prisma.Vendor$approvedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Vendor$rejectedByArgs<ExtArgs>;
    createdBy?: boolean | Prisma.Vendor$createdByArgs<ExtArgs>;
    documents?: boolean | Prisma.Vendor$documentsArgs<ExtArgs>;
    assets?: boolean | Prisma.Vendor$assetsArgs<ExtArgs>;
    maintenances?: boolean | Prisma.Vendor$maintenancesArgs<ExtArgs>;
    licenses?: boolean | Prisma.Vendor$licensesArgs<ExtArgs>;
    _count?: boolean | Prisma.VendorCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VendorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    approvedBy?: boolean | Prisma.Vendor$approvedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Vendor$rejectedByArgs<ExtArgs>;
    createdBy?: boolean | Prisma.Vendor$createdByArgs<ExtArgs>;
};
export type VendorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    approvedBy?: boolean | Prisma.Vendor$approvedByArgs<ExtArgs>;
    rejectedBy?: boolean | Prisma.Vendor$rejectedByArgs<ExtArgs>;
    createdBy?: boolean | Prisma.Vendor$createdByArgs<ExtArgs>;
};
export type $VendorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Vendor";
    objects: {
        approvedBy: Prisma.$UserPayload<ExtArgs> | null;
        rejectedBy: Prisma.$UserPayload<ExtArgs> | null;
        createdBy: Prisma.$UserPayload<ExtArgs> | null;
        documents: Prisma.$VendorDocumentPayload<ExtArgs>[];
        assets: Prisma.$AssetPayload<ExtArgs>[];
        maintenances: Prisma.$MaintenancePayload<ExtArgs>[];
        licenses: Prisma.$LicensePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        contactName: string | null;
        email: string | null;
        phone: string | null;
        status: $Enums.VendorStatus;
        type: $Enums.VendorType;
        supportedClasses: $Enums.AssetClass[];
        approvedAt: Date | null;
        approvedById: string | null;
        serviceRegion: string | null;
        contractStartDate: Date | null;
        contractEndDate: Date | null;
        slaHours: number | null;
        canVisitOnSite: boolean;
        canReceiveDevice: boolean;
        businessRegistrationNumber: string | null;
        ceoName: string | null;
        businessType: string | null;
        businessItem: string | null;
        addressHeadOffice: string | null;
        addressDetail: string | null;
        addressBusiness: string | null;
        contactDepartment: string | null;
        contactPosition: string | null;
        operatingHoursStart: string | null;
        operatingHoursEnd: string | null;
        operatesOnWeekend: boolean;
        canHandleUrgent: boolean;
        urgentConditionNote: string | null;
        brandModelNote: string | null;
        bankName: string | null;
        bankAccountNumber: string | null;
        bankAccountNumberMask: string | null;
        bankAccountHolder: string | null;
        paymentTerms: $Enums.PaymentTerms | null;
        paymentDaysAfter: number | null;
        taxInvoiceEmail: string | null;
        taxInvoiceMethod: $Enums.TaxInvoiceMethod | null;
        faxNumber: string | null;
        postalAddress: string | null;
        isVatIncluded: boolean;
        isWithholdingTax: boolean;
        slaCompletionDays: number | null;
        penaltyTerms: string | null;
        repairWarrantyDays: number | null;
        unitPriceNote: string | null;
        approvalNote: string | null;
        rejectionNote: string | null;
        rejectedAt: Date | null;
        rejectedById: string | null;
        isBlacklisted: boolean;
        blacklistReason: string | null;
        blacklistedAt: Date | null;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["vendor"]>;
    composites: {};
};
export type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VendorPayload, S>;
export type VendorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VendorCountAggregateInputType | true;
};
export interface VendorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Vendor'];
        meta: {
            name: 'Vendor';
        };
    };
    /**
     * Find zero or one Vendor that matches the filter.
     * @param {VendorFindUniqueArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorFindUniqueArgs>(args: Prisma.SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Vendor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorFindUniqueOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Vendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorFindFirstArgs>(args?: Prisma.SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Vendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendor.findMany()
     *
     * // Get first 10 Vendors
     * const vendors = await prisma.vendor.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const vendorWithIdOnly = await prisma.vendor.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VendorFindManyArgs>(args?: Prisma.SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Vendor.
     * @param {VendorCreateArgs} args - Arguments to create a Vendor.
     * @example
     * // Create one Vendor
     * const Vendor = await prisma.vendor.create({
     *   data: {
     *     // ... data to create a Vendor
     *   }
     * })
     *
     */
    create<T extends VendorCreateArgs>(args: Prisma.SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Vendors.
     * @param {VendorCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VendorCreateManyArgs>(args?: Prisma.SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Vendor.
     * @param {VendorDeleteArgs} args - Arguments to delete one Vendor.
     * @example
     * // Delete one Vendor
     * const Vendor = await prisma.vendor.delete({
     *   where: {
     *     // ... filter to delete one Vendor
     *   }
     * })
     *
     */
    delete<T extends VendorDeleteArgs>(args: Prisma.SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Vendor.
     * @param {VendorUpdateArgs} args - Arguments to update one Vendor.
     * @example
     * // Update one Vendor
     * const vendor = await prisma.vendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VendorUpdateArgs>(args: Prisma.SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Vendors.
     * @param {VendorDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VendorDeleteManyArgs>(args?: Prisma.SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VendorUpdateManyArgs>(args: Prisma.SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Vendors and returns the data updated in the database.
     * @param {VendorUpdateManyAndReturnArgs} args - Arguments to update many Vendors.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.updateManyAndReturn({
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
    updateManyAndReturn<T extends VendorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Vendor.
     * @param {VendorUpsertArgs} args - Arguments to update or create a Vendor.
     * @example
     * // Update or create a Vendor
     * const vendor = await prisma.vendor.upsert({
     *   create: {
     *     // ... data to create a Vendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendor we want to update
     *   }
     * })
     */
    upsert<T extends VendorUpsertArgs>(args: Prisma.SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendor.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorCountArgs>(args?: Prisma.Subset<T, VendorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VendorCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VendorAggregateArgs>(args: Prisma.Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>;
    /**
     * Group by Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VendorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VendorGroupByArgs['orderBy'];
    } : {
        orderBy?: VendorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Vendor model
     */
    readonly fields: VendorFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Vendor.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VendorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    approvedBy<T extends Prisma.Vendor$approvedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$approvedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    rejectedBy<T extends Prisma.Vendor$rejectedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$rejectedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.Vendor$createdByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$createdByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    documents<T extends Prisma.Vendor$documentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    assets<T extends Prisma.Vendor$assetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    maintenances<T extends Prisma.Vendor$maintenancesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$maintenancesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    licenses<T extends Prisma.Vendor$licensesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$licensesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Vendor model
 */
export interface VendorFieldRefs {
    readonly id: Prisma.FieldRef<"Vendor", 'String'>;
    readonly name: Prisma.FieldRef<"Vendor", 'String'>;
    readonly contactName: Prisma.FieldRef<"Vendor", 'String'>;
    readonly email: Prisma.FieldRef<"Vendor", 'String'>;
    readonly phone: Prisma.FieldRef<"Vendor", 'String'>;
    readonly status: Prisma.FieldRef<"Vendor", 'VendorStatus'>;
    readonly type: Prisma.FieldRef<"Vendor", 'VendorType'>;
    readonly supportedClasses: Prisma.FieldRef<"Vendor", 'AssetClass[]'>;
    readonly approvedAt: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly approvedById: Prisma.FieldRef<"Vendor", 'String'>;
    readonly serviceRegion: Prisma.FieldRef<"Vendor", 'String'>;
    readonly contractStartDate: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly contractEndDate: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly slaHours: Prisma.FieldRef<"Vendor", 'Int'>;
    readonly canVisitOnSite: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly canReceiveDevice: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly businessRegistrationNumber: Prisma.FieldRef<"Vendor", 'String'>;
    readonly ceoName: Prisma.FieldRef<"Vendor", 'String'>;
    readonly businessType: Prisma.FieldRef<"Vendor", 'String'>;
    readonly businessItem: Prisma.FieldRef<"Vendor", 'String'>;
    readonly addressHeadOffice: Prisma.FieldRef<"Vendor", 'String'>;
    readonly addressDetail: Prisma.FieldRef<"Vendor", 'String'>;
    readonly addressBusiness: Prisma.FieldRef<"Vendor", 'String'>;
    readonly contactDepartment: Prisma.FieldRef<"Vendor", 'String'>;
    readonly contactPosition: Prisma.FieldRef<"Vendor", 'String'>;
    readonly operatingHoursStart: Prisma.FieldRef<"Vendor", 'String'>;
    readonly operatingHoursEnd: Prisma.FieldRef<"Vendor", 'String'>;
    readonly operatesOnWeekend: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly canHandleUrgent: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly urgentConditionNote: Prisma.FieldRef<"Vendor", 'String'>;
    readonly brandModelNote: Prisma.FieldRef<"Vendor", 'String'>;
    readonly bankName: Prisma.FieldRef<"Vendor", 'String'>;
    readonly bankAccountNumber: Prisma.FieldRef<"Vendor", 'String'>;
    readonly bankAccountNumberMask: Prisma.FieldRef<"Vendor", 'String'>;
    readonly bankAccountHolder: Prisma.FieldRef<"Vendor", 'String'>;
    readonly paymentTerms: Prisma.FieldRef<"Vendor", 'PaymentTerms'>;
    readonly paymentDaysAfter: Prisma.FieldRef<"Vendor", 'Int'>;
    readonly taxInvoiceEmail: Prisma.FieldRef<"Vendor", 'String'>;
    readonly taxInvoiceMethod: Prisma.FieldRef<"Vendor", 'TaxInvoiceMethod'>;
    readonly faxNumber: Prisma.FieldRef<"Vendor", 'String'>;
    readonly postalAddress: Prisma.FieldRef<"Vendor", 'String'>;
    readonly isVatIncluded: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly isWithholdingTax: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly slaCompletionDays: Prisma.FieldRef<"Vendor", 'Int'>;
    readonly penaltyTerms: Prisma.FieldRef<"Vendor", 'String'>;
    readonly repairWarrantyDays: Prisma.FieldRef<"Vendor", 'Int'>;
    readonly unitPriceNote: Prisma.FieldRef<"Vendor", 'String'>;
    readonly approvalNote: Prisma.FieldRef<"Vendor", 'String'>;
    readonly rejectionNote: Prisma.FieldRef<"Vendor", 'String'>;
    readonly rejectedAt: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly rejectedById: Prisma.FieldRef<"Vendor", 'String'>;
    readonly isBlacklisted: Prisma.FieldRef<"Vendor", 'Boolean'>;
    readonly blacklistReason: Prisma.FieldRef<"Vendor", 'String'>;
    readonly blacklistedAt: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly createdById: Prisma.FieldRef<"Vendor", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Vendor", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Vendor", 'DateTime'>;
}
/**
 * Vendor findUnique
 */
export type VendorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Vendor to fetch.
     */
    where: Prisma.VendorWhereUniqueInput;
};
/**
 * Vendor findUniqueOrThrow
 */
export type VendorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Vendor to fetch.
     */
    where: Prisma.VendorWhereUniqueInput;
};
/**
 * Vendor findFirst
 */
export type VendorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Vendor to fetch.
     */
    where?: Prisma.VendorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Vendors to fetch.
     */
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Vendors.
     */
    cursor?: Prisma.VendorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Vendors.
     */
    distinct?: Prisma.VendorScalarFieldEnum | Prisma.VendorScalarFieldEnum[];
};
/**
 * Vendor findFirstOrThrow
 */
export type VendorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Vendor to fetch.
     */
    where?: Prisma.VendorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Vendors to fetch.
     */
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Vendors.
     */
    cursor?: Prisma.VendorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Vendors.
     */
    distinct?: Prisma.VendorScalarFieldEnum | Prisma.VendorScalarFieldEnum[];
};
/**
 * Vendor findMany
 */
export type VendorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Vendors to fetch.
     */
    where?: Prisma.VendorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Vendors to fetch.
     */
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Vendors.
     */
    cursor?: Prisma.VendorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Vendors.
     */
    distinct?: Prisma.VendorScalarFieldEnum | Prisma.VendorScalarFieldEnum[];
};
/**
 * Vendor create
 */
export type VendorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Vendor.
     */
    data: Prisma.XOR<Prisma.VendorCreateInput, Prisma.VendorUncheckedCreateInput>;
};
/**
 * Vendor createMany
 */
export type VendorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: Prisma.VendorCreateManyInput | Prisma.VendorCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Vendor createManyAndReturn
 */
export type VendorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: Prisma.VendorSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Vendor
     */
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    /**
     * The data used to create many Vendors.
     */
    data: Prisma.VendorCreateManyInput | Prisma.VendorCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VendorIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Vendor update
 */
export type VendorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Vendor.
     */
    data: Prisma.XOR<Prisma.VendorUpdateInput, Prisma.VendorUncheckedUpdateInput>;
    /**
     * Choose, which Vendor to update.
     */
    where: Prisma.VendorWhereUniqueInput;
};
/**
 * Vendor updateMany
 */
export type VendorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyInput>;
    /**
     * Filter which Vendors to update
     */
    where?: Prisma.VendorWhereInput;
    /**
     * Limit how many Vendors to update.
     */
    limit?: number;
};
/**
 * Vendor updateManyAndReturn
 */
export type VendorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: Prisma.VendorSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Vendor
     */
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    /**
     * The data used to update Vendors.
     */
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyInput>;
    /**
     * Filter which Vendors to update
     */
    where?: Prisma.VendorWhereInput;
    /**
     * Limit how many Vendors to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VendorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Vendor upsert
 */
export type VendorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Vendor to update in case it exists.
     */
    where: Prisma.VendorWhereUniqueInput;
    /**
     * In case the Vendor found by the `where` argument doesn't exist, create a new Vendor with this data.
     */
    create: Prisma.XOR<Prisma.VendorCreateInput, Prisma.VendorUncheckedCreateInput>;
    /**
     * In case the Vendor was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VendorUpdateInput, Prisma.VendorUncheckedUpdateInput>;
};
/**
 * Vendor delete
 */
export type VendorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Vendor to delete.
     */
    where: Prisma.VendorWhereUniqueInput;
};
/**
 * Vendor deleteMany
 */
export type VendorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: Prisma.VendorWhereInput;
    /**
     * Limit how many Vendors to delete.
     */
    limit?: number;
};
/**
 * Vendor.approvedBy
 */
export type Vendor$approvedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Vendor.rejectedBy
 */
export type Vendor$rejectedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Vendor.createdBy
 */
export type Vendor$createdByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Vendor.documents
 */
export type Vendor$documentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorDocument
     */
    select?: Prisma.VendorDocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VendorDocument
     */
    omit?: Prisma.VendorDocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VendorDocumentInclude<ExtArgs> | null;
    where?: Prisma.VendorDocumentWhereInput;
    orderBy?: Prisma.VendorDocumentOrderByWithRelationInput | Prisma.VendorDocumentOrderByWithRelationInput[];
    cursor?: Prisma.VendorDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorDocumentScalarFieldEnum | Prisma.VendorDocumentScalarFieldEnum[];
};
/**
 * Vendor.assets
 */
export type Vendor$assetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: Prisma.AssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Asset
     */
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where?: Prisma.AssetWhereInput;
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    cursor?: Prisma.AssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssetScalarFieldEnum | Prisma.AssetScalarFieldEnum[];
};
/**
 * Vendor.maintenances
 */
export type Vendor$maintenancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Maintenance
     */
    select?: Prisma.MaintenanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Maintenance
     */
    omit?: Prisma.MaintenanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceInclude<ExtArgs> | null;
    where?: Prisma.MaintenanceWhereInput;
    orderBy?: Prisma.MaintenanceOrderByWithRelationInput | Prisma.MaintenanceOrderByWithRelationInput[];
    cursor?: Prisma.MaintenanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaintenanceScalarFieldEnum | Prisma.MaintenanceScalarFieldEnum[];
};
/**
 * Vendor.licenses
 */
export type Vendor$licensesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.LicenseWhereInput;
    orderBy?: Prisma.LicenseOrderByWithRelationInput | Prisma.LicenseOrderByWithRelationInput[];
    cursor?: Prisma.LicenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicenseScalarFieldEnum | Prisma.LicenseScalarFieldEnum[];
};
/**
 * Vendor without action
 */
export type VendorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=Vendor.d.ts.map