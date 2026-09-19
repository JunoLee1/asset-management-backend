import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly UserHistory: "UserHistory";
    readonly PasswordHistory: "PasswordHistory";
    readonly PasswordReset: "PasswordReset";
    readonly RefreshToken: "RefreshToken";
    readonly License: "License";
    readonly LicenseAssignment: "LicenseAssignment";
    readonly OAuthAccount: "OAuthAccount";
    readonly Department: "Department";
    readonly Team: "Team";
    readonly AssetCategory: "AssetCategory";
    readonly Manufacturer: "Manufacturer";
    readonly AssetCatalog: "AssetCatalog";
    readonly Location: "Location";
    readonly Vendor: "Vendor";
    readonly VendorDocument: "VendorDocument";
    readonly Asset: "Asset";
    readonly HardwareAsset: "HardwareAsset";
    readonly SoftwareAsset: "SoftwareAsset";
    readonly PeripheralAsset: "PeripheralAsset";
    readonly OfficeAsset: "OfficeAsset";
    readonly FacilityAsset: "FacilityAsset";
    readonly NetworkAsset: "NetworkAsset";
    readonly AssetCodeCounter: "AssetCodeCounter";
    readonly AssetHistory: "AssetHistory";
    readonly Maintenance: "Maintenance";
    readonly MaintenancePayment: "MaintenancePayment";
    readonly Depreciation: "Depreciation";
    readonly DepreciationRecord: "DepreciationRecord";
    readonly Loan: "Loan";
    readonly LoanReturn: "LoanReturn";
    readonly LoanExtension: "LoanExtension";
    readonly Notification: "Notification";
    readonly Software: "Software";
    readonly SoftwarePermission: "SoftwarePermission";
    readonly SoftwareInstance: "SoftwareInstance";
    readonly SoftwareInstancePermissionOverride: "SoftwareInstancePermissionOverride";
    readonly SoftwareLicenseLink: "SoftwareLicenseLink";
    readonly Device: "Device";
    readonly SoftwareUsageEvent: "SoftwareUsageEvent";
    readonly AuditLog: "AuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly phoneNumber: "phoneNumber";
    readonly phoneNumberHash: "phoneNumberHash";
    readonly inviteToken: "inviteToken";
    readonly inviteTokenExpiresAt: "inviteTokenExpiresAt";
    readonly hireDate: "hireDate";
    readonly terminationDate: "terminationDate";
    readonly isOutOfOffice: "isOutOfOffice";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly teamId: "teamId";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly performedById: "performedById";
    readonly action: "action";
    readonly reason: "reason";
    readonly before: "before";
    readonly after: "after";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
};
export type UserHistoryScalarFieldEnum = (typeof UserHistoryScalarFieldEnum)[keyof typeof UserHistoryScalarFieldEnum];
export declare const PasswordHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
};
export type PasswordHistoryScalarFieldEnum = (typeof PasswordHistoryScalarFieldEnum)[keyof typeof PasswordHistoryScalarFieldEnum];
export declare const PasswordResetScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly code: "code";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly attempts: "attempts";
    readonly createdAt: "createdAt";
};
export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userAgent: "userAgent";
    readonly ipAddress: "ipAddress";
    readonly revokedAt: "revokedAt";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly userId: "userId";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const LicenseScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly productKey: "productKey";
    readonly productKeyMask: "productKeyMask";
    readonly vendorId: "vendorId";
    readonly seatsTotal: "seatsTotal";
    readonly purchaseDate: "purchaseDate";
    readonly expiryDate: "expiryDate";
    readonly cost: "cost";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LicenseScalarFieldEnum = (typeof LicenseScalarFieldEnum)[keyof typeof LicenseScalarFieldEnum];
export declare const LicenseAssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly licenseId: "licenseId";
    readonly userId: "userId";
    readonly assetId: "assetId";
    readonly assignedAt: "assignedAt";
    readonly unassignedAt: "unassignedAt";
};
export type LicenseAssignmentScalarFieldEnum = (typeof LicenseAssignmentScalarFieldEnum)[keyof typeof LicenseAssignmentScalarFieldEnum];
export declare const OAuthAccountScalarFieldEnum: {
    readonly id: "id";
    readonly provider: "provider";
    readonly providerId: "providerId";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
};
export type OAuthAccountScalarFieldEnum = (typeof OAuthAccountScalarFieldEnum)[keyof typeof OAuthAccountScalarFieldEnum];
export declare const DepartmentScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly leaderId: "leaderId";
};
export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum];
export declare const TeamScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly departmentId: "departmentId";
    readonly teamLeadId: "teamLeadId";
};
export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum];
export declare const AssetCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly class: "class";
    readonly subType: "subType";
    readonly glAccountCode: "glAccountCode";
    readonly glAccountName: "glAccountName";
    readonly defaultDepreciationMethod: "defaultDepreciationMethod";
    readonly defaultUsefulLifeYears: "defaultUsefulLifeYears";
    readonly defaultSalvageValueRatio: "defaultSalvageValueRatio";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
    readonly parentId: "parentId";
};
export type AssetCategoryScalarFieldEnum = (typeof AssetCategoryScalarFieldEnum)[keyof typeof AssetCategoryScalarFieldEnum];
export declare const ManufacturerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly aliases: "aliases";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ManufacturerScalarFieldEnum = (typeof ManufacturerScalarFieldEnum)[keyof typeof ManufacturerScalarFieldEnum];
export declare const AssetCatalogScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly manufacturer: "manufacturer";
    readonly modelCode: "modelCode";
    readonly class: "class";
    readonly imageUrl: "imageUrl";
    readonly specs: "specs";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly categoryId: "categoryId";
    readonly manufacturerId: "manufacturerId";
};
export type AssetCatalogScalarFieldEnum = (typeof AssetCatalogScalarFieldEnum)[keyof typeof AssetCatalogScalarFieldEnum];
export declare const LocationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly building: "building";
    readonly floor: "floor";
    readonly room: "room";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];
export declare const VendorScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly contactName: "contactName";
    readonly email: "email";
    readonly phone: "phone";
    readonly status: "status";
    readonly type: "type";
    readonly supportedClasses: "supportedClasses";
    readonly approvedAt: "approvedAt";
    readonly approvedById: "approvedById";
    readonly serviceRegion: "serviceRegion";
    readonly contractStartDate: "contractStartDate";
    readonly contractEndDate: "contractEndDate";
    readonly slaHours: "slaHours";
    readonly canVisitOnSite: "canVisitOnSite";
    readonly canReceiveDevice: "canReceiveDevice";
    readonly businessRegistrationNumber: "businessRegistrationNumber";
    readonly ceoName: "ceoName";
    readonly businessType: "businessType";
    readonly businessItem: "businessItem";
    readonly addressHeadOffice: "addressHeadOffice";
    readonly addressDetail: "addressDetail";
    readonly addressBusiness: "addressBusiness";
    readonly contactDepartment: "contactDepartment";
    readonly contactPosition: "contactPosition";
    readonly operatingHoursStart: "operatingHoursStart";
    readonly operatingHoursEnd: "operatingHoursEnd";
    readonly operatesOnWeekend: "operatesOnWeekend";
    readonly canHandleUrgent: "canHandleUrgent";
    readonly urgentConditionNote: "urgentConditionNote";
    readonly brandModelNote: "brandModelNote";
    readonly bankName: "bankName";
    readonly bankAccountNumber: "bankAccountNumber";
    readonly bankAccountNumberMask: "bankAccountNumberMask";
    readonly bankAccountHolder: "bankAccountHolder";
    readonly paymentTerms: "paymentTerms";
    readonly paymentDaysAfter: "paymentDaysAfter";
    readonly taxInvoiceEmail: "taxInvoiceEmail";
    readonly taxInvoiceMethod: "taxInvoiceMethod";
    readonly faxNumber: "faxNumber";
    readonly postalAddress: "postalAddress";
    readonly isVatIncluded: "isVatIncluded";
    readonly isWithholdingTax: "isWithholdingTax";
    readonly slaCompletionDays: "slaCompletionDays";
    readonly penaltyTerms: "penaltyTerms";
    readonly repairWarrantyDays: "repairWarrantyDays";
    readonly unitPriceNote: "unitPriceNote";
    readonly approvalNote: "approvalNote";
    readonly rejectionNote: "rejectionNote";
    readonly rejectedAt: "rejectedAt";
    readonly rejectedById: "rejectedById";
    readonly isBlacklisted: "isBlacklisted";
    readonly blacklistReason: "blacklistReason";
    readonly blacklistedAt: "blacklistedAt";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum];
export declare const VendorDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly vendorId: "vendorId";
    readonly documentType: "documentType";
    readonly publicId: "publicId";
    readonly secureUrl: "secureUrl";
    readonly originalName: "originalName";
    readonly mimeType: "mimeType";
    readonly sizeBytes: "sizeBytes";
    readonly uploadedById: "uploadedById";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type VendorDocumentScalarFieldEnum = (typeof VendorDocumentScalarFieldEnum)[keyof typeof VendorDocumentScalarFieldEnum];
export declare const AssetScalarFieldEnum: {
    readonly id: "id";
    readonly assetCode: "assetCode";
    readonly name: "name";
    readonly description: "description";
    readonly class: "class";
    readonly status: "status";
    readonly condition: "condition";
    readonly conditionAssessedAt: "conditionAssessedAt";
    readonly ownershipType: "ownershipType";
    readonly purchaseDate: "purchaseDate";
    readonly purchasePrice: "purchasePrice";
    readonly currentValue: "currentValue";
    readonly imageUrl: "imageUrl";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly categoryId: "categoryId";
    readonly departmentId: "departmentId";
    readonly locationId: "locationId";
    readonly vendorId: "vendorId";
    readonly catalogId: "catalogId";
    readonly assignedUserId: "assignedUserId";
};
export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum];
export declare const HardwareAssetScalarFieldEnum: {
    readonly assetId: "assetId";
    readonly serialNo: "serialNo";
    readonly macAddr: "macAddr";
    readonly ipAddr: "ipAddr";
    readonly cpu: "cpu";
    readonly ramGb: "ramGb";
    readonly storageGb: "storageGb";
    readonly warrantyEnd: "warrantyEnd";
};
export type HardwareAssetScalarFieldEnum = (typeof HardwareAssetScalarFieldEnum)[keyof typeof HardwareAssetScalarFieldEnum];
export declare const SoftwareAssetScalarFieldEnum: {
    readonly assetId: "assetId";
    readonly licenseKey: "licenseKey";
    readonly licenseSeats: "licenseSeats";
    readonly installedCount: "installedCount";
    readonly expiryDate: "expiryDate";
    readonly version: "version";
};
export type SoftwareAssetScalarFieldEnum = (typeof SoftwareAssetScalarFieldEnum)[keyof typeof SoftwareAssetScalarFieldEnum];
export declare const PeripheralAssetScalarFieldEnum: {
    readonly assetId: "assetId";
    readonly serialNo: "serialNo";
    readonly quantity: "quantity";
};
export type PeripheralAssetScalarFieldEnum = (typeof PeripheralAssetScalarFieldEnum)[keyof typeof PeripheralAssetScalarFieldEnum];
export declare const OfficeAssetScalarFieldEnum: {
    readonly assetId: "assetId";
    readonly modelName: "modelName";
};
export type OfficeAssetScalarFieldEnum = (typeof OfficeAssetScalarFieldEnum)[keyof typeof OfficeAssetScalarFieldEnum];
export declare const FacilityAssetScalarFieldEnum: {
    readonly assetId: "assetId";
    readonly installLocationDetail: "installLocationDetail";
    readonly installDate: "installDate";
    readonly inspectionCycleMonths: "inspectionCycleMonths";
    readonly nextInspectionDate: "nextInspectionDate";
};
export type FacilityAssetScalarFieldEnum = (typeof FacilityAssetScalarFieldEnum)[keyof typeof FacilityAssetScalarFieldEnum];
export declare const NetworkAssetScalarFieldEnum: {
    readonly assetId: "assetId";
    readonly ipAddress: "ipAddress";
    readonly macAddress: "macAddress";
    readonly vlan: "vlan";
    readonly port: "port";
};
export type NetworkAssetScalarFieldEnum = (typeof NetworkAssetScalarFieldEnum)[keyof typeof NetworkAssetScalarFieldEnum];
export declare const AssetCodeCounterScalarFieldEnum: {
    readonly class: "class";
    readonly nextNumber: "nextNumber";
    readonly updatedAt: "updatedAt";
};
export type AssetCodeCounterScalarFieldEnum = (typeof AssetCodeCounterScalarFieldEnum)[keyof typeof AssetCodeCounterScalarFieldEnum];
export declare const AssetHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly action: "action";
    readonly description: "description";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly assetId: "assetId";
    readonly performedById: "performedById";
};
export type AssetHistoryScalarFieldEnum = (typeof AssetHistoryScalarFieldEnum)[keyof typeof AssetHistoryScalarFieldEnum];
export declare const MaintenanceScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly status: "status";
    readonly type: "type";
    readonly cost: "cost";
    readonly scheduledAt: "scheduledAt";
    readonly estimatedCompletionDate: "estimatedCompletionDate";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly assetId: "assetId";
    readonly vendorId: "vendorId";
    readonly managerId: "managerId";
    readonly requestedById: "requestedById";
    readonly managerApprovedAt: "managerApprovedAt";
    readonly managerApprovedById: "managerApprovedById";
    readonly adminApprovedAt: "adminApprovedAt";
    readonly adminApprovedById: "adminApprovedById";
    readonly rejectReason: "rejectReason";
    readonly rejectedAt: "rejectedAt";
    readonly rejectedById: "rejectedById";
    readonly serviceType: "serviceType";
    readonly isUserFault: "isUserFault";
    readonly payerType: "payerType";
    readonly payerUserId: "payerUserId";
    readonly payerNote: "payerNote";
};
export type MaintenanceScalarFieldEnum = (typeof MaintenanceScalarFieldEnum)[keyof typeof MaintenanceScalarFieldEnum];
export declare const MaintenancePaymentScalarFieldEnum: {
    readonly id: "id";
    readonly maintenanceId: "maintenanceId";
    readonly direction: "direction";
    readonly amount: "amount";
    readonly paidAt: "paidAt";
    readonly note: "note";
    readonly paidById: "paidById";
    readonly createdAt: "createdAt";
};
export type MaintenancePaymentScalarFieldEnum = (typeof MaintenancePaymentScalarFieldEnum)[keyof typeof MaintenancePaymentScalarFieldEnum];
export declare const DepreciationScalarFieldEnum: {
    readonly id: "id";
    readonly method: "method";
    readonly usefulLifeYears: "usefulLifeYears";
    readonly salvageValue: "salvageValue";
    readonly annualRate: "annualRate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly assetId: "assetId";
};
export type DepreciationScalarFieldEnum = (typeof DepreciationScalarFieldEnum)[keyof typeof DepreciationScalarFieldEnum];
export declare const DepreciationRecordScalarFieldEnum: {
    readonly id: "id";
    readonly fiscalYear: "fiscalYear";
    readonly depreciationAmount: "depreciationAmount";
    readonly bookValue: "bookValue";
    readonly recordedAt: "recordedAt";
    readonly depreciationId: "depreciationId";
};
export type DepreciationRecordScalarFieldEnum = (typeof DepreciationRecordScalarFieldEnum)[keyof typeof DepreciationRecordScalarFieldEnum];
export declare const LoanScalarFieldEnum: {
    readonly id: "id";
    readonly status: "status";
    readonly assetId: "assetId";
    readonly userId: "userId";
    readonly purpose: "purpose";
    readonly dueDate: "dueDate";
    readonly managerApprovedAt: "managerApprovedAt";
    readonly managerApprovedById: "managerApprovedById";
    readonly deptApprovedAt: "deptApprovedAt";
    readonly deptApprovedById: "deptApprovedById";
    readonly adminApprovedAt: "adminApprovedAt";
    readonly adminApprovedById: "adminApprovedById";
    readonly checkedOutAt: "checkedOutAt";
    readonly checkedOutById: "checkedOutById";
    readonly checkoutLocationId: "checkoutLocationId";
    readonly checkoutMemo: "checkoutMemo";
    readonly receivedAt: "receivedAt";
    readonly receivedById: "receivedById";
    readonly rejectReason: "rejectReason";
    readonly rejectedAt: "rejectedAt";
    readonly rejectedById: "rejectedById";
    readonly cancelledAt: "cancelledAt";
    readonly overdueNotifyCount: "overdueNotifyCount";
    readonly recallReason: "recallReason";
    readonly recalledAt: "recalledAt";
    readonly recalledById: "recalledById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum];
export declare const LoanReturnScalarFieldEnum: {
    readonly id: "id";
    readonly loanId: "loanId";
    readonly returnRequestedAt: "returnRequestedAt";
    readonly condition: "condition";
    readonly damageNote: "damageNote";
    readonly inspectedAt: "inspectedAt";
    readonly inspectedById: "inspectedById";
    readonly returnApprovedAt: "returnApprovedAt";
    readonly returnApprovedById: "returnApprovedById";
    readonly finalizedAt: "finalizedAt";
    readonly finalizedById: "finalizedById";
};
export type LoanReturnScalarFieldEnum = (typeof LoanReturnScalarFieldEnum)[keyof typeof LoanReturnScalarFieldEnum];
export declare const LoanExtensionScalarFieldEnum: {
    readonly id: "id";
    readonly loanId: "loanId";
    readonly status: "status";
    readonly days: "days";
    readonly requestedById: "requestedById";
    readonly managerApprovedAt: "managerApprovedAt";
    readonly managerApprovedById: "managerApprovedById";
    readonly adminApprovedAt: "adminApprovedAt";
    readonly adminApprovedById: "adminApprovedById";
    readonly rejectionNote: "rejectionNote";
    readonly rejectedAt: "rejectedAt";
    readonly rejectedById: "rejectedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LoanExtensionScalarFieldEnum = (typeof LoanExtensionScalarFieldEnum)[keyof typeof LoanExtensionScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly metadata: "metadata";
    readonly recipientId: "recipientId";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
    readonly channelStatus: "channelStatus";
    readonly channelAttempts: "channelAttempts";
    readonly channelLastError: "channelLastError";
    readonly channelSentAt: "channelSentAt";
    readonly emailStatus: "emailStatus";
    readonly emailAttempts: "emailAttempts";
    readonly emailLastError: "emailLastError";
    readonly emailSentAt: "emailSentAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SoftwareScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly vendor: "vendor";
    readonly type: "type";
    readonly category: "category";
    readonly description: "description";
    readonly licenseCoverage: "licenseCoverage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SoftwareScalarFieldEnum = (typeof SoftwareScalarFieldEnum)[keyof typeof SoftwareScalarFieldEnum];
export declare const SoftwarePermissionScalarFieldEnum: {
    readonly id: "id";
    readonly softwareId: "softwareId";
    readonly status: "status";
    readonly prevStatus: "prevStatus";
    readonly decidedById: "decidedById";
    readonly decidedByRole: "decidedByRole";
    readonly decidedAt: "decidedAt";
    readonly reason: "reason";
    readonly updatedAt: "updatedAt";
};
export type SoftwarePermissionScalarFieldEnum = (typeof SoftwarePermissionScalarFieldEnum)[keyof typeof SoftwarePermissionScalarFieldEnum];
export declare const SoftwareInstanceScalarFieldEnum: {
    readonly id: "id";
    readonly softwareId: "softwareId";
    readonly userId: "userId";
    readonly deviceId: "deviceId";
    readonly executedOs: "executedOs";
    readonly firstDiscoveredAt: "firstDiscoveredAt";
    readonly lastUsedAt: "lastUsedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SoftwareInstanceScalarFieldEnum = (typeof SoftwareInstanceScalarFieldEnum)[keyof typeof SoftwareInstanceScalarFieldEnum];
export declare const SoftwareInstancePermissionOverrideScalarFieldEnum: {
    readonly id: "id";
    readonly instanceId: "instanceId";
    readonly status: "status";
    readonly prevStatus: "prevStatus";
    readonly decidedById: "decidedById";
    readonly decidedByRole: "decidedByRole";
    readonly decidedAt: "decidedAt";
    readonly reason: "reason";
    readonly updatedAt: "updatedAt";
};
export type SoftwareInstancePermissionOverrideScalarFieldEnum = (typeof SoftwareInstancePermissionOverrideScalarFieldEnum)[keyof typeof SoftwareInstancePermissionOverrideScalarFieldEnum];
export declare const SoftwareLicenseLinkScalarFieldEnum: {
    readonly id: "id";
    readonly softwareId: "softwareId";
    readonly licenseId: "licenseId";
    readonly matchedById: "matchedById";
    readonly matchedAt: "matchedAt";
    readonly note: "note";
};
export type SoftwareLicenseLinkScalarFieldEnum = (typeof SoftwareLicenseLinkScalarFieldEnum)[keyof typeof SoftwareLicenseLinkScalarFieldEnum];
export declare const DeviceScalarFieldEnum: {
    readonly id: "id";
    readonly hostname: "hostname";
    readonly os: "os";
    readonly userId: "userId";
    readonly lastSeenAt: "lastSeenAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum];
export declare const SoftwareUsageEventScalarFieldEnum: {
    readonly id: "id";
    readonly instanceId: "instanceId";
    readonly occurredAt: "occurredAt";
    readonly durationSec: "durationSec";
};
export type SoftwareUsageEventScalarFieldEnum = (typeof SoftwareUsageEventScalarFieldEnum)[keyof typeof SoftwareUsageEventScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly action: "action";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly performedById: "performedById";
    readonly performedByRole: "performedByRole";
    readonly detail: "detail";
    readonly ipAddress: "ipAddress";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map