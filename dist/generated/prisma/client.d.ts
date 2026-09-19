import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model UserHistory
 *
 */
export type UserHistory = Prisma.UserHistoryModel;
/**
 * Model PasswordHistory
 *
 */
export type PasswordHistory = Prisma.PasswordHistoryModel;
/**
 * Model PasswordReset
 *
 */
export type PasswordReset = Prisma.PasswordResetModel;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = Prisma.RefreshTokenModel;
/**
 * Model License
 *
 */
export type License = Prisma.LicenseModel;
/**
 * Model LicenseAssignment
 *
 */
export type LicenseAssignment = Prisma.LicenseAssignmentModel;
/**
 * Model OAuthAccount
 *
 */
export type OAuthAccount = Prisma.OAuthAccountModel;
/**
 * Model Department
 *
 */
export type Department = Prisma.DepartmentModel;
/**
 * Model Team
 *
 */
export type Team = Prisma.TeamModel;
/**
 * Model AssetCategory
 *
 */
export type AssetCategory = Prisma.AssetCategoryModel;
/**
 * Model Manufacturer
 *
 */
export type Manufacturer = Prisma.ManufacturerModel;
/**
 * Model AssetCatalog
 *
 */
export type AssetCatalog = Prisma.AssetCatalogModel;
/**
 * Model Location
 *
 */
export type Location = Prisma.LocationModel;
/**
 * Model Vendor
 *
 */
export type Vendor = Prisma.VendorModel;
/**
 * Model VendorDocument
 *
 */
export type VendorDocument = Prisma.VendorDocumentModel;
/**
 * Model Asset
 *
 */
export type Asset = Prisma.AssetModel;
/**
 * Model HardwareAsset
 *
 */
export type HardwareAsset = Prisma.HardwareAssetModel;
/**
 * Model SoftwareAsset
 *
 */
export type SoftwareAsset = Prisma.SoftwareAssetModel;
/**
 * Model PeripheralAsset
 *
 */
export type PeripheralAsset = Prisma.PeripheralAssetModel;
/**
 * Model OfficeAsset
 *
 */
export type OfficeAsset = Prisma.OfficeAssetModel;
/**
 * Model FacilityAsset
 *
 */
export type FacilityAsset = Prisma.FacilityAssetModel;
/**
 * Model NetworkAsset
 *
 */
export type NetworkAsset = Prisma.NetworkAssetModel;
/**
 * Model AssetCodeCounter
 *
 */
export type AssetCodeCounter = Prisma.AssetCodeCounterModel;
/**
 * Model AssetHistory
 *
 */
export type AssetHistory = Prisma.AssetHistoryModel;
/**
 * Model Maintenance
 *
 */
export type Maintenance = Prisma.MaintenanceModel;
/**
 * Model MaintenancePayment
 *
 */
export type MaintenancePayment = Prisma.MaintenancePaymentModel;
/**
 * Model Depreciation
 *
 */
export type Depreciation = Prisma.DepreciationModel;
/**
 * Model DepreciationRecord
 *
 */
export type DepreciationRecord = Prisma.DepreciationRecordModel;
/**
 * Model Loan
 *
 */
export type Loan = Prisma.LoanModel;
/**
 * Model LoanReturn
 *
 */
export type LoanReturn = Prisma.LoanReturnModel;
/**
 * Model LoanExtension
 *
 */
export type LoanExtension = Prisma.LoanExtensionModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model Software
 *
 */
export type Software = Prisma.SoftwareModel;
/**
 * Model SoftwarePermission
 *
 */
export type SoftwarePermission = Prisma.SoftwarePermissionModel;
/**
 * Model SoftwareInstance
 *
 */
export type SoftwareInstance = Prisma.SoftwareInstanceModel;
/**
 * Model SoftwareInstancePermissionOverride
 *
 */
export type SoftwareInstancePermissionOverride = Prisma.SoftwareInstancePermissionOverrideModel;
/**
 * Model SoftwareLicenseLink
 *
 */
export type SoftwareLicenseLink = Prisma.SoftwareLicenseLinkModel;
/**
 * Model Device
 *
 */
export type Device = Prisma.DeviceModel;
/**
 * Model SoftwareUsageEvent
 *
 */
export type SoftwareUsageEvent = Prisma.SoftwareUsageEventModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
//# sourceMappingURL=client.d.ts.map