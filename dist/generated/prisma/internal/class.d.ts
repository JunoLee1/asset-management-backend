import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userHistory`: Exposes CRUD operations for the **UserHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserHistories
      * const userHistories = await prisma.userHistory.findMany()
      * ```
      */
    get userHistory(): Prisma.UserHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.passwordHistory`: Exposes CRUD operations for the **PasswordHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PasswordHistories
      * const passwordHistories = await prisma.passwordHistory.findMany()
      * ```
      */
    get passwordHistory(): Prisma.PasswordHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PasswordResets
      * const passwordResets = await prisma.passwordReset.findMany()
      * ```
      */
    get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RefreshTokens
      * const refreshTokens = await prisma.refreshToken.findMany()
      * ```
      */
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.license`: Exposes CRUD operations for the **License** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Licenses
      * const licenses = await prisma.license.findMany()
      * ```
      */
    get license(): Prisma.LicenseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.licenseAssignment`: Exposes CRUD operations for the **LicenseAssignment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LicenseAssignments
      * const licenseAssignments = await prisma.licenseAssignment.findMany()
      * ```
      */
    get licenseAssignment(): Prisma.LicenseAssignmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.oAuthAccount`: Exposes CRUD operations for the **OAuthAccount** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OAuthAccounts
      * const oAuthAccounts = await prisma.oAuthAccount.findMany()
      * ```
      */
    get oAuthAccount(): Prisma.OAuthAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.department`: Exposes CRUD operations for the **Department** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Departments
      * const departments = await prisma.department.findMany()
      * ```
      */
    get department(): Prisma.DepartmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.team`: Exposes CRUD operations for the **Team** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Teams
      * const teams = await prisma.team.findMany()
      * ```
      */
    get team(): Prisma.TeamDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.assetCategory`: Exposes CRUD operations for the **AssetCategory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AssetCategories
      * const assetCategories = await prisma.assetCategory.findMany()
      * ```
      */
    get assetCategory(): Prisma.AssetCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.manufacturer`: Exposes CRUD operations for the **Manufacturer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Manufacturers
      * const manufacturers = await prisma.manufacturer.findMany()
      * ```
      */
    get manufacturer(): Prisma.ManufacturerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.assetCatalog`: Exposes CRUD operations for the **AssetCatalog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AssetCatalogs
      * const assetCatalogs = await prisma.assetCatalog.findMany()
      * ```
      */
    get assetCatalog(): Prisma.AssetCatalogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.location`: Exposes CRUD operations for the **Location** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Locations
      * const locations = await prisma.location.findMany()
      * ```
      */
    get location(): Prisma.LocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.vendor`: Exposes CRUD operations for the **Vendor** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Vendors
      * const vendors = await prisma.vendor.findMany()
      * ```
      */
    get vendor(): Prisma.VendorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.vendorDocument`: Exposes CRUD operations for the **VendorDocument** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VendorDocuments
      * const vendorDocuments = await prisma.vendorDocument.findMany()
      * ```
      */
    get vendorDocument(): Prisma.VendorDocumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.asset`: Exposes CRUD operations for the **Asset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Assets
      * const assets = await prisma.asset.findMany()
      * ```
      */
    get asset(): Prisma.AssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.hardwareAsset`: Exposes CRUD operations for the **HardwareAsset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HardwareAssets
      * const hardwareAssets = await prisma.hardwareAsset.findMany()
      * ```
      */
    get hardwareAsset(): Prisma.HardwareAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.softwareAsset`: Exposes CRUD operations for the **SoftwareAsset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SoftwareAssets
      * const softwareAssets = await prisma.softwareAsset.findMany()
      * ```
      */
    get softwareAsset(): Prisma.SoftwareAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.peripheralAsset`: Exposes CRUD operations for the **PeripheralAsset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PeripheralAssets
      * const peripheralAssets = await prisma.peripheralAsset.findMany()
      * ```
      */
    get peripheralAsset(): Prisma.PeripheralAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.officeAsset`: Exposes CRUD operations for the **OfficeAsset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OfficeAssets
      * const officeAssets = await prisma.officeAsset.findMany()
      * ```
      */
    get officeAsset(): Prisma.OfficeAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.facilityAsset`: Exposes CRUD operations for the **FacilityAsset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FacilityAssets
      * const facilityAssets = await prisma.facilityAsset.findMany()
      * ```
      */
    get facilityAsset(): Prisma.FacilityAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.networkAsset`: Exposes CRUD operations for the **NetworkAsset** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NetworkAssets
      * const networkAssets = await prisma.networkAsset.findMany()
      * ```
      */
    get networkAsset(): Prisma.NetworkAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.assetCodeCounter`: Exposes CRUD operations for the **AssetCodeCounter** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AssetCodeCounters
      * const assetCodeCounters = await prisma.assetCodeCounter.findMany()
      * ```
      */
    get assetCodeCounter(): Prisma.AssetCodeCounterDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.assetHistory`: Exposes CRUD operations for the **AssetHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AssetHistories
      * const assetHistories = await prisma.assetHistory.findMany()
      * ```
      */
    get assetHistory(): Prisma.AssetHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.maintenance`: Exposes CRUD operations for the **Maintenance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Maintenances
      * const maintenances = await prisma.maintenance.findMany()
      * ```
      */
    get maintenance(): Prisma.MaintenanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.maintenancePayment`: Exposes CRUD operations for the **MaintenancePayment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MaintenancePayments
      * const maintenancePayments = await prisma.maintenancePayment.findMany()
      * ```
      */
    get maintenancePayment(): Prisma.MaintenancePaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.depreciation`: Exposes CRUD operations for the **Depreciation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Depreciations
      * const depreciations = await prisma.depreciation.findMany()
      * ```
      */
    get depreciation(): Prisma.DepreciationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.depreciationRecord`: Exposes CRUD operations for the **DepreciationRecord** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DepreciationRecords
      * const depreciationRecords = await prisma.depreciationRecord.findMany()
      * ```
      */
    get depreciationRecord(): Prisma.DepreciationRecordDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Loans
      * const loans = await prisma.loan.findMany()
      * ```
      */
    get loan(): Prisma.LoanDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.loanReturn`: Exposes CRUD operations for the **LoanReturn** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LoanReturns
      * const loanReturns = await prisma.loanReturn.findMany()
      * ```
      */
    get loanReturn(): Prisma.LoanReturnDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.loanExtension`: Exposes CRUD operations for the **LoanExtension** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LoanExtensions
      * const loanExtensions = await prisma.loanExtension.findMany()
      * ```
      */
    get loanExtension(): Prisma.LoanExtensionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.software`: Exposes CRUD operations for the **Software** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Software
      * const software = await prisma.software.findMany()
      * ```
      */
    get software(): Prisma.SoftwareDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.softwarePermission`: Exposes CRUD operations for the **SoftwarePermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SoftwarePermissions
      * const softwarePermissions = await prisma.softwarePermission.findMany()
      * ```
      */
    get softwarePermission(): Prisma.SoftwarePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.softwareInstance`: Exposes CRUD operations for the **SoftwareInstance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SoftwareInstances
      * const softwareInstances = await prisma.softwareInstance.findMany()
      * ```
      */
    get softwareInstance(): Prisma.SoftwareInstanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.softwareInstancePermissionOverride`: Exposes CRUD operations for the **SoftwareInstancePermissionOverride** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SoftwareInstancePermissionOverrides
      * const softwareInstancePermissionOverrides = await prisma.softwareInstancePermissionOverride.findMany()
      * ```
      */
    get softwareInstancePermissionOverride(): Prisma.SoftwareInstancePermissionOverrideDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.softwareLicenseLink`: Exposes CRUD operations for the **SoftwareLicenseLink** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SoftwareLicenseLinks
      * const softwareLicenseLinks = await prisma.softwareLicenseLink.findMany()
      * ```
      */
    get softwareLicenseLink(): Prisma.SoftwareLicenseLinkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.device`: Exposes CRUD operations for the **Device** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Devices
      * const devices = await prisma.device.findMany()
      * ```
      */
    get device(): Prisma.DeviceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.softwareUsageEvent`: Exposes CRUD operations for the **SoftwareUsageEvent** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SoftwareUsageEvents
      * const softwareUsageEvents = await prisma.softwareUsageEvent.findMany()
      * ```
      */
    get softwareUsageEvent(): Prisma.SoftwareUsageEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AuditLogs
      * const auditLogs = await prisma.auditLog.findMany()
      * ```
      */
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map