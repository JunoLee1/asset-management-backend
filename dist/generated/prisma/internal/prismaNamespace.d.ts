import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.8.0
 * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "userHistory" | "passwordHistory" | "passwordReset" | "refreshToken" | "license" | "licenseAssignment" | "oAuthAccount" | "department" | "team" | "assetCategory" | "manufacturer" | "assetCatalog" | "location" | "vendor" | "vendorDocument" | "asset" | "hardwareAsset" | "softwareAsset" | "peripheralAsset" | "officeAsset" | "facilityAsset" | "networkAsset" | "assetCodeCounter" | "assetHistory" | "maintenance" | "maintenancePayment" | "depreciation" | "depreciationRecord" | "loan" | "loanReturn" | "loanExtension" | "notification" | "software" | "softwarePermission" | "softwareInstance" | "softwareInstancePermissionOverride" | "softwareLicenseLink" | "device" | "softwareUsageEvent" | "auditLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        UserHistory: {
            payload: Prisma.$UserHistoryPayload<ExtArgs>;
            fields: Prisma.UserHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.UserHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>;
                };
                findMany: {
                    args: Prisma.UserHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>[];
                };
                create: {
                    args: Prisma.UserHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>;
                };
                createMany: {
                    args: Prisma.UserHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>[];
                };
                delete: {
                    args: Prisma.UserHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>;
                };
                update: {
                    args: Prisma.UserHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.UserHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.UserHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.UserHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserHistory>;
                };
                groupBy: {
                    args: Prisma.UserHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserHistoryCountAggregateOutputType> | number;
                };
            };
        };
        PasswordHistory: {
            payload: Prisma.$PasswordHistoryPayload<ExtArgs>;
            fields: Prisma.PasswordHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>;
                };
                findMany: {
                    args: Prisma.PasswordHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[];
                };
                create: {
                    args: Prisma.PasswordHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>;
                };
                createMany: {
                    args: Prisma.PasswordHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[];
                };
                delete: {
                    args: Prisma.PasswordHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>;
                };
                update: {
                    args: Prisma.PasswordHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordHistory>;
                };
                groupBy: {
                    args: Prisma.PasswordHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordHistoryCountAggregateOutputType> | number;
                };
            };
        };
        PasswordReset: {
            payload: Prisma.$PasswordResetPayload<ExtArgs>;
            fields: Prisma.PasswordResetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                delete: {
                    args: Prisma.PasswordResetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                update: {
                    args: Prisma.PasswordResetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordResetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordReset>;
                };
                groupBy: {
                    args: Prisma.PasswordResetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        License: {
            payload: Prisma.$LicensePayload<ExtArgs>;
            fields: Prisma.LicenseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LicenseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LicenseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>;
                };
                findFirst: {
                    args: Prisma.LicenseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LicenseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>;
                };
                findMany: {
                    args: Prisma.LicenseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>[];
                };
                create: {
                    args: Prisma.LicenseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>;
                };
                createMany: {
                    args: Prisma.LicenseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LicenseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>[];
                };
                delete: {
                    args: Prisma.LicenseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>;
                };
                update: {
                    args: Prisma.LicenseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>;
                };
                deleteMany: {
                    args: Prisma.LicenseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LicenseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LicenseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>[];
                };
                upsert: {
                    args: Prisma.LicenseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicensePayload>;
                };
                aggregate: {
                    args: Prisma.LicenseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLicense>;
                };
                groupBy: {
                    args: Prisma.LicenseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicenseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LicenseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicenseCountAggregateOutputType> | number;
                };
            };
        };
        LicenseAssignment: {
            payload: Prisma.$LicenseAssignmentPayload<ExtArgs>;
            fields: Prisma.LicenseAssignmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LicenseAssignmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LicenseAssignmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>;
                };
                findFirst: {
                    args: Prisma.LicenseAssignmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LicenseAssignmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>;
                };
                findMany: {
                    args: Prisma.LicenseAssignmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>[];
                };
                create: {
                    args: Prisma.LicenseAssignmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>;
                };
                createMany: {
                    args: Prisma.LicenseAssignmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LicenseAssignmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>[];
                };
                delete: {
                    args: Prisma.LicenseAssignmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>;
                };
                update: {
                    args: Prisma.LicenseAssignmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>;
                };
                deleteMany: {
                    args: Prisma.LicenseAssignmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LicenseAssignmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LicenseAssignmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>[];
                };
                upsert: {
                    args: Prisma.LicenseAssignmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicenseAssignmentPayload>;
                };
                aggregate: {
                    args: Prisma.LicenseAssignmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLicenseAssignment>;
                };
                groupBy: {
                    args: Prisma.LicenseAssignmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicenseAssignmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LicenseAssignmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicenseAssignmentCountAggregateOutputType> | number;
                };
            };
        };
        OAuthAccount: {
            payload: Prisma.$OAuthAccountPayload<ExtArgs>;
            fields: Prisma.OAuthAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OAuthAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OAuthAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                findFirst: {
                    args: Prisma.OAuthAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OAuthAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                findMany: {
                    args: Prisma.OAuthAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[];
                };
                create: {
                    args: Prisma.OAuthAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                createMany: {
                    args: Prisma.OAuthAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OAuthAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[];
                };
                delete: {
                    args: Prisma.OAuthAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                update: {
                    args: Prisma.OAuthAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.OAuthAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OAuthAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OAuthAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[];
                };
                upsert: {
                    args: Prisma.OAuthAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                aggregate: {
                    args: Prisma.OAuthAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOAuthAccount>;
                };
                groupBy: {
                    args: Prisma.OAuthAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OAuthAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OAuthAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OAuthAccountCountAggregateOutputType> | number;
                };
            };
        };
        Department: {
            payload: Prisma.$DepartmentPayload<ExtArgs>;
            fields: Prisma.DepartmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DepartmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                findFirst: {
                    args: Prisma.DepartmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                findMany: {
                    args: Prisma.DepartmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>[];
                };
                create: {
                    args: Prisma.DepartmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                createMany: {
                    args: Prisma.DepartmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>[];
                };
                delete: {
                    args: Prisma.DepartmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                update: {
                    args: Prisma.DepartmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                deleteMany: {
                    args: Prisma.DepartmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DepartmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>[];
                };
                upsert: {
                    args: Prisma.DepartmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                aggregate: {
                    args: Prisma.DepartmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDepartment>;
                };
                groupBy: {
                    args: Prisma.DepartmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepartmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DepartmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepartmentCountAggregateOutputType> | number;
                };
            };
        };
        Team: {
            payload: Prisma.$TeamPayload<ExtArgs>;
            fields: Prisma.TeamFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TeamFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>;
                };
                findFirst: {
                    args: Prisma.TeamFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>;
                };
                findMany: {
                    args: Prisma.TeamFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>[];
                };
                create: {
                    args: Prisma.TeamCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>;
                };
                createMany: {
                    args: Prisma.TeamCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>[];
                };
                delete: {
                    args: Prisma.TeamDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>;
                };
                update: {
                    args: Prisma.TeamUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>;
                };
                deleteMany: {
                    args: Prisma.TeamDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TeamUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>[];
                };
                upsert: {
                    args: Prisma.TeamUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TeamPayload>;
                };
                aggregate: {
                    args: Prisma.TeamAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTeam>;
                };
                groupBy: {
                    args: Prisma.TeamGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TeamGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TeamCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TeamCountAggregateOutputType> | number;
                };
            };
        };
        AssetCategory: {
            payload: Prisma.$AssetCategoryPayload<ExtArgs>;
            fields: Prisma.AssetCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssetCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssetCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.AssetCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssetCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>;
                };
                findMany: {
                    args: Prisma.AssetCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>[];
                };
                create: {
                    args: Prisma.AssetCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>;
                };
                createMany: {
                    args: Prisma.AssetCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssetCategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>[];
                };
                delete: {
                    args: Prisma.AssetCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>;
                };
                update: {
                    args: Prisma.AssetCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.AssetCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssetCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssetCategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>[];
                };
                upsert: {
                    args: Prisma.AssetCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.AssetCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssetCategory>;
                };
                groupBy: {
                    args: Prisma.AssetCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssetCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCategoryCountAggregateOutputType> | number;
                };
            };
        };
        Manufacturer: {
            payload: Prisma.$ManufacturerPayload<ExtArgs>;
            fields: Prisma.ManufacturerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ManufacturerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ManufacturerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                findFirst: {
                    args: Prisma.ManufacturerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ManufacturerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                findMany: {
                    args: Prisma.ManufacturerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>[];
                };
                create: {
                    args: Prisma.ManufacturerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                createMany: {
                    args: Prisma.ManufacturerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ManufacturerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>[];
                };
                delete: {
                    args: Prisma.ManufacturerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                update: {
                    args: Prisma.ManufacturerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                deleteMany: {
                    args: Prisma.ManufacturerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ManufacturerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ManufacturerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>[];
                };
                upsert: {
                    args: Prisma.ManufacturerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerPayload>;
                };
                aggregate: {
                    args: Prisma.ManufacturerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateManufacturer>;
                };
                groupBy: {
                    args: Prisma.ManufacturerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManufacturerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ManufacturerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManufacturerCountAggregateOutputType> | number;
                };
            };
        };
        AssetCatalog: {
            payload: Prisma.$AssetCatalogPayload<ExtArgs>;
            fields: Prisma.AssetCatalogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssetCatalogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssetCatalogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>;
                };
                findFirst: {
                    args: Prisma.AssetCatalogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssetCatalogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>;
                };
                findMany: {
                    args: Prisma.AssetCatalogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>[];
                };
                create: {
                    args: Prisma.AssetCatalogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>;
                };
                createMany: {
                    args: Prisma.AssetCatalogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssetCatalogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>[];
                };
                delete: {
                    args: Prisma.AssetCatalogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>;
                };
                update: {
                    args: Prisma.AssetCatalogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>;
                };
                deleteMany: {
                    args: Prisma.AssetCatalogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssetCatalogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssetCatalogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>[];
                };
                upsert: {
                    args: Prisma.AssetCatalogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCatalogPayload>;
                };
                aggregate: {
                    args: Prisma.AssetCatalogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssetCatalog>;
                };
                groupBy: {
                    args: Prisma.AssetCatalogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCatalogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssetCatalogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCatalogCountAggregateOutputType> | number;
                };
            };
        };
        Location: {
            payload: Prisma.$LocationPayload<ExtArgs>;
            fields: Prisma.LocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                findFirst: {
                    args: Prisma.LocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                findMany: {
                    args: Prisma.LocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                create: {
                    args: Prisma.LocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                createMany: {
                    args: Prisma.LocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                delete: {
                    args: Prisma.LocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                update: {
                    args: Prisma.LocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                deleteMany: {
                    args: Prisma.LocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                upsert: {
                    args: Prisma.LocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                aggregate: {
                    args: Prisma.LocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLocation>;
                };
                groupBy: {
                    args: Prisma.LocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationCountAggregateOutputType> | number;
                };
            };
        };
        Vendor: {
            payload: Prisma.$VendorPayload<ExtArgs>;
            fields: Prisma.VendorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                findFirst: {
                    args: Prisma.VendorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                findMany: {
                    args: Prisma.VendorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>[];
                };
                create: {
                    args: Prisma.VendorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                createMany: {
                    args: Prisma.VendorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>[];
                };
                delete: {
                    args: Prisma.VendorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                update: {
                    args: Prisma.VendorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>[];
                };
                upsert: {
                    args: Prisma.VendorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorPayload>;
                };
                aggregate: {
                    args: Prisma.VendorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendor>;
                };
                groupBy: {
                    args: Prisma.VendorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorCountAggregateOutputType> | number;
                };
            };
        };
        VendorDocument: {
            payload: Prisma.$VendorDocumentPayload<ExtArgs>;
            fields: Prisma.VendorDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VendorDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VendorDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.VendorDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VendorDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>;
                };
                findMany: {
                    args: Prisma.VendorDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>[];
                };
                create: {
                    args: Prisma.VendorDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>;
                };
                createMany: {
                    args: Prisma.VendorDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VendorDocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>[];
                };
                delete: {
                    args: Prisma.VendorDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>;
                };
                update: {
                    args: Prisma.VendorDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.VendorDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VendorDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VendorDocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>[];
                };
                upsert: {
                    args: Prisma.VendorDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VendorDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.VendorDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVendorDocument>;
                };
                groupBy: {
                    args: Prisma.VendorDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VendorDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VendorDocumentCountAggregateOutputType> | number;
                };
            };
        };
        Asset: {
            payload: Prisma.$AssetPayload<ExtArgs>;
            fields: Prisma.AssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>;
                };
                findFirst: {
                    args: Prisma.AssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>;
                };
                findMany: {
                    args: Prisma.AssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>[];
                };
                create: {
                    args: Prisma.AssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>;
                };
                createMany: {
                    args: Prisma.AssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>[];
                };
                delete: {
                    args: Prisma.AssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>;
                };
                update: {
                    args: Prisma.AssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>;
                };
                deleteMany: {
                    args: Prisma.AssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>[];
                };
                upsert: {
                    args: Prisma.AssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetPayload>;
                };
                aggregate: {
                    args: Prisma.AssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAsset>;
                };
                groupBy: {
                    args: Prisma.AssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCountAggregateOutputType> | number;
                };
            };
        };
        HardwareAsset: {
            payload: Prisma.$HardwareAssetPayload<ExtArgs>;
            fields: Prisma.HardwareAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HardwareAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HardwareAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>;
                };
                findFirst: {
                    args: Prisma.HardwareAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HardwareAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>;
                };
                findMany: {
                    args: Prisma.HardwareAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>[];
                };
                create: {
                    args: Prisma.HardwareAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>;
                };
                createMany: {
                    args: Prisma.HardwareAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HardwareAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>[];
                };
                delete: {
                    args: Prisma.HardwareAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>;
                };
                update: {
                    args: Prisma.HardwareAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.HardwareAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HardwareAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HardwareAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>[];
                };
                upsert: {
                    args: Prisma.HardwareAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HardwareAssetPayload>;
                };
                aggregate: {
                    args: Prisma.HardwareAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHardwareAsset>;
                };
                groupBy: {
                    args: Prisma.HardwareAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HardwareAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HardwareAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HardwareAssetCountAggregateOutputType> | number;
                };
            };
        };
        SoftwareAsset: {
            payload: Prisma.$SoftwareAssetPayload<ExtArgs>;
            fields: Prisma.SoftwareAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>;
                };
                findMany: {
                    args: Prisma.SoftwareAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>[];
                };
                create: {
                    args: Prisma.SoftwareAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>;
                };
                createMany: {
                    args: Prisma.SoftwareAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>[];
                };
                delete: {
                    args: Prisma.SoftwareAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>;
                };
                update: {
                    args: Prisma.SoftwareAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareAssetPayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwareAsset>;
                };
                groupBy: {
                    args: Prisma.SoftwareAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareAssetCountAggregateOutputType> | number;
                };
            };
        };
        PeripheralAsset: {
            payload: Prisma.$PeripheralAssetPayload<ExtArgs>;
            fields: Prisma.PeripheralAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PeripheralAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PeripheralAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>;
                };
                findFirst: {
                    args: Prisma.PeripheralAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PeripheralAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>;
                };
                findMany: {
                    args: Prisma.PeripheralAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>[];
                };
                create: {
                    args: Prisma.PeripheralAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>;
                };
                createMany: {
                    args: Prisma.PeripheralAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PeripheralAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>[];
                };
                delete: {
                    args: Prisma.PeripheralAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>;
                };
                update: {
                    args: Prisma.PeripheralAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.PeripheralAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PeripheralAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PeripheralAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>[];
                };
                upsert: {
                    args: Prisma.PeripheralAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PeripheralAssetPayload>;
                };
                aggregate: {
                    args: Prisma.PeripheralAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePeripheralAsset>;
                };
                groupBy: {
                    args: Prisma.PeripheralAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PeripheralAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PeripheralAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PeripheralAssetCountAggregateOutputType> | number;
                };
            };
        };
        OfficeAsset: {
            payload: Prisma.$OfficeAssetPayload<ExtArgs>;
            fields: Prisma.OfficeAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OfficeAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OfficeAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>;
                };
                findFirst: {
                    args: Prisma.OfficeAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OfficeAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>;
                };
                findMany: {
                    args: Prisma.OfficeAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>[];
                };
                create: {
                    args: Prisma.OfficeAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>;
                };
                createMany: {
                    args: Prisma.OfficeAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OfficeAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>[];
                };
                delete: {
                    args: Prisma.OfficeAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>;
                };
                update: {
                    args: Prisma.OfficeAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.OfficeAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OfficeAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OfficeAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>[];
                };
                upsert: {
                    args: Prisma.OfficeAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OfficeAssetPayload>;
                };
                aggregate: {
                    args: Prisma.OfficeAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOfficeAsset>;
                };
                groupBy: {
                    args: Prisma.OfficeAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OfficeAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OfficeAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OfficeAssetCountAggregateOutputType> | number;
                };
            };
        };
        FacilityAsset: {
            payload: Prisma.$FacilityAssetPayload<ExtArgs>;
            fields: Prisma.FacilityAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FacilityAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FacilityAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>;
                };
                findFirst: {
                    args: Prisma.FacilityAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FacilityAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>;
                };
                findMany: {
                    args: Prisma.FacilityAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>[];
                };
                create: {
                    args: Prisma.FacilityAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>;
                };
                createMany: {
                    args: Prisma.FacilityAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FacilityAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>[];
                };
                delete: {
                    args: Prisma.FacilityAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>;
                };
                update: {
                    args: Prisma.FacilityAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.FacilityAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FacilityAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FacilityAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>[];
                };
                upsert: {
                    args: Prisma.FacilityAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FacilityAssetPayload>;
                };
                aggregate: {
                    args: Prisma.FacilityAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFacilityAsset>;
                };
                groupBy: {
                    args: Prisma.FacilityAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FacilityAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FacilityAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FacilityAssetCountAggregateOutputType> | number;
                };
            };
        };
        NetworkAsset: {
            payload: Prisma.$NetworkAssetPayload<ExtArgs>;
            fields: Prisma.NetworkAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NetworkAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NetworkAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>;
                };
                findFirst: {
                    args: Prisma.NetworkAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NetworkAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>;
                };
                findMany: {
                    args: Prisma.NetworkAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>[];
                };
                create: {
                    args: Prisma.NetworkAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>;
                };
                createMany: {
                    args: Prisma.NetworkAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NetworkAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>[];
                };
                delete: {
                    args: Prisma.NetworkAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>;
                };
                update: {
                    args: Prisma.NetworkAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.NetworkAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NetworkAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NetworkAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>[];
                };
                upsert: {
                    args: Prisma.NetworkAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkAssetPayload>;
                };
                aggregate: {
                    args: Prisma.NetworkAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNetworkAsset>;
                };
                groupBy: {
                    args: Prisma.NetworkAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NetworkAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NetworkAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NetworkAssetCountAggregateOutputType> | number;
                };
            };
        };
        AssetCodeCounter: {
            payload: Prisma.$AssetCodeCounterPayload<ExtArgs>;
            fields: Prisma.AssetCodeCounterFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssetCodeCounterFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssetCodeCounterFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>;
                };
                findFirst: {
                    args: Prisma.AssetCodeCounterFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssetCodeCounterFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>;
                };
                findMany: {
                    args: Prisma.AssetCodeCounterFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>[];
                };
                create: {
                    args: Prisma.AssetCodeCounterCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>;
                };
                createMany: {
                    args: Prisma.AssetCodeCounterCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssetCodeCounterCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>[];
                };
                delete: {
                    args: Prisma.AssetCodeCounterDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>;
                };
                update: {
                    args: Prisma.AssetCodeCounterUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>;
                };
                deleteMany: {
                    args: Prisma.AssetCodeCounterDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssetCodeCounterUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssetCodeCounterUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>[];
                };
                upsert: {
                    args: Prisma.AssetCodeCounterUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetCodeCounterPayload>;
                };
                aggregate: {
                    args: Prisma.AssetCodeCounterAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssetCodeCounter>;
                };
                groupBy: {
                    args: Prisma.AssetCodeCounterGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCodeCounterGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssetCodeCounterCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetCodeCounterCountAggregateOutputType> | number;
                };
            };
        };
        AssetHistory: {
            payload: Prisma.$AssetHistoryPayload<ExtArgs>;
            fields: Prisma.AssetHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssetHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssetHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.AssetHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssetHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>;
                };
                findMany: {
                    args: Prisma.AssetHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>[];
                };
                create: {
                    args: Prisma.AssetHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>;
                };
                createMany: {
                    args: Prisma.AssetHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssetHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>[];
                };
                delete: {
                    args: Prisma.AssetHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>;
                };
                update: {
                    args: Prisma.AssetHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.AssetHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssetHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssetHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.AssetHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssetHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.AssetHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssetHistory>;
                };
                groupBy: {
                    args: Prisma.AssetHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssetHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssetHistoryCountAggregateOutputType> | number;
                };
            };
        };
        Maintenance: {
            payload: Prisma.$MaintenancePayload<ExtArgs>;
            fields: Prisma.MaintenanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaintenanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaintenanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>;
                };
                findFirst: {
                    args: Prisma.MaintenanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaintenanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>;
                };
                findMany: {
                    args: Prisma.MaintenanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>[];
                };
                create: {
                    args: Prisma.MaintenanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>;
                };
                createMany: {
                    args: Prisma.MaintenanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaintenanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>[];
                };
                delete: {
                    args: Prisma.MaintenanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>;
                };
                update: {
                    args: Prisma.MaintenanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>;
                };
                deleteMany: {
                    args: Prisma.MaintenanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaintenanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaintenanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>[];
                };
                upsert: {
                    args: Prisma.MaintenanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePayload>;
                };
                aggregate: {
                    args: Prisma.MaintenanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaintenance>;
                };
                groupBy: {
                    args: Prisma.MaintenanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaintenanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenanceCountAggregateOutputType> | number;
                };
            };
        };
        MaintenancePayment: {
            payload: Prisma.$MaintenancePaymentPayload<ExtArgs>;
            fields: Prisma.MaintenancePaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MaintenancePaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MaintenancePaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>;
                };
                findFirst: {
                    args: Prisma.MaintenancePaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MaintenancePaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>;
                };
                findMany: {
                    args: Prisma.MaintenancePaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>[];
                };
                create: {
                    args: Prisma.MaintenancePaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>;
                };
                createMany: {
                    args: Prisma.MaintenancePaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MaintenancePaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>[];
                };
                delete: {
                    args: Prisma.MaintenancePaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>;
                };
                update: {
                    args: Prisma.MaintenancePaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.MaintenancePaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MaintenancePaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MaintenancePaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>[];
                };
                upsert: {
                    args: Prisma.MaintenancePaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MaintenancePaymentPayload>;
                };
                aggregate: {
                    args: Prisma.MaintenancePaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMaintenancePayment>;
                };
                groupBy: {
                    args: Prisma.MaintenancePaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenancePaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MaintenancePaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MaintenancePaymentCountAggregateOutputType> | number;
                };
            };
        };
        Depreciation: {
            payload: Prisma.$DepreciationPayload<ExtArgs>;
            fields: Prisma.DepreciationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DepreciationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DepreciationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>;
                };
                findFirst: {
                    args: Prisma.DepreciationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DepreciationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>;
                };
                findMany: {
                    args: Prisma.DepreciationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>[];
                };
                create: {
                    args: Prisma.DepreciationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>;
                };
                createMany: {
                    args: Prisma.DepreciationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DepreciationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>[];
                };
                delete: {
                    args: Prisma.DepreciationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>;
                };
                update: {
                    args: Prisma.DepreciationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>;
                };
                deleteMany: {
                    args: Prisma.DepreciationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DepreciationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DepreciationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>[];
                };
                upsert: {
                    args: Prisma.DepreciationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationPayload>;
                };
                aggregate: {
                    args: Prisma.DepreciationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDepreciation>;
                };
                groupBy: {
                    args: Prisma.DepreciationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepreciationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DepreciationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepreciationCountAggregateOutputType> | number;
                };
            };
        };
        DepreciationRecord: {
            payload: Prisma.$DepreciationRecordPayload<ExtArgs>;
            fields: Prisma.DepreciationRecordFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DepreciationRecordFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DepreciationRecordFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>;
                };
                findFirst: {
                    args: Prisma.DepreciationRecordFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DepreciationRecordFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>;
                };
                findMany: {
                    args: Prisma.DepreciationRecordFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>[];
                };
                create: {
                    args: Prisma.DepreciationRecordCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>;
                };
                createMany: {
                    args: Prisma.DepreciationRecordCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DepreciationRecordCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>[];
                };
                delete: {
                    args: Prisma.DepreciationRecordDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>;
                };
                update: {
                    args: Prisma.DepreciationRecordUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>;
                };
                deleteMany: {
                    args: Prisma.DepreciationRecordDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DepreciationRecordUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DepreciationRecordUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>[];
                };
                upsert: {
                    args: Prisma.DepreciationRecordUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepreciationRecordPayload>;
                };
                aggregate: {
                    args: Prisma.DepreciationRecordAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDepreciationRecord>;
                };
                groupBy: {
                    args: Prisma.DepreciationRecordGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepreciationRecordGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DepreciationRecordCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepreciationRecordCountAggregateOutputType> | number;
                };
            };
        };
        Loan: {
            payload: Prisma.$LoanPayload<ExtArgs>;
            fields: Prisma.LoanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LoanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LoanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>;
                };
                findFirst: {
                    args: Prisma.LoanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LoanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>;
                };
                findMany: {
                    args: Prisma.LoanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>[];
                };
                create: {
                    args: Prisma.LoanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>;
                };
                createMany: {
                    args: Prisma.LoanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LoanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>[];
                };
                delete: {
                    args: Prisma.LoanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>;
                };
                update: {
                    args: Prisma.LoanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>;
                };
                deleteMany: {
                    args: Prisma.LoanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LoanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LoanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>[];
                };
                upsert: {
                    args: Prisma.LoanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanPayload>;
                };
                aggregate: {
                    args: Prisma.LoanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLoan>;
                };
                groupBy: {
                    args: Prisma.LoanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LoanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoanCountAggregateOutputType> | number;
                };
            };
        };
        LoanReturn: {
            payload: Prisma.$LoanReturnPayload<ExtArgs>;
            fields: Prisma.LoanReturnFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LoanReturnFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LoanReturnFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>;
                };
                findFirst: {
                    args: Prisma.LoanReturnFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LoanReturnFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>;
                };
                findMany: {
                    args: Prisma.LoanReturnFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>[];
                };
                create: {
                    args: Prisma.LoanReturnCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>;
                };
                createMany: {
                    args: Prisma.LoanReturnCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LoanReturnCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>[];
                };
                delete: {
                    args: Prisma.LoanReturnDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>;
                };
                update: {
                    args: Prisma.LoanReturnUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>;
                };
                deleteMany: {
                    args: Prisma.LoanReturnDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LoanReturnUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LoanReturnUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>[];
                };
                upsert: {
                    args: Prisma.LoanReturnUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanReturnPayload>;
                };
                aggregate: {
                    args: Prisma.LoanReturnAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLoanReturn>;
                };
                groupBy: {
                    args: Prisma.LoanReturnGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoanReturnGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LoanReturnCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoanReturnCountAggregateOutputType> | number;
                };
            };
        };
        LoanExtension: {
            payload: Prisma.$LoanExtensionPayload<ExtArgs>;
            fields: Prisma.LoanExtensionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LoanExtensionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LoanExtensionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>;
                };
                findFirst: {
                    args: Prisma.LoanExtensionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LoanExtensionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>;
                };
                findMany: {
                    args: Prisma.LoanExtensionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>[];
                };
                create: {
                    args: Prisma.LoanExtensionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>;
                };
                createMany: {
                    args: Prisma.LoanExtensionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LoanExtensionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>[];
                };
                delete: {
                    args: Prisma.LoanExtensionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>;
                };
                update: {
                    args: Prisma.LoanExtensionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>;
                };
                deleteMany: {
                    args: Prisma.LoanExtensionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LoanExtensionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LoanExtensionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>[];
                };
                upsert: {
                    args: Prisma.LoanExtensionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LoanExtensionPayload>;
                };
                aggregate: {
                    args: Prisma.LoanExtensionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLoanExtension>;
                };
                groupBy: {
                    args: Prisma.LoanExtensionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoanExtensionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LoanExtensionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LoanExtensionCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        Software: {
            payload: Prisma.$SoftwarePayload<ExtArgs>;
            fields: Prisma.SoftwareFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                findMany: {
                    args: Prisma.SoftwareFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>[];
                };
                create: {
                    args: Prisma.SoftwareCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                createMany: {
                    args: Prisma.SoftwareCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>[];
                };
                delete: {
                    args: Prisma.SoftwareDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                update: {
                    args: Prisma.SoftwareUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftware>;
                };
                groupBy: {
                    args: Prisma.SoftwareGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareCountAggregateOutputType> | number;
                };
            };
        };
        SoftwarePermission: {
            payload: Prisma.$SoftwarePermissionPayload<ExtArgs>;
            fields: Prisma.SoftwarePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwarePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwarePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.SoftwarePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwarePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>;
                };
                findMany: {
                    args: Prisma.SoftwarePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>[];
                };
                create: {
                    args: Prisma.SoftwarePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>;
                };
                createMany: {
                    args: Prisma.SoftwarePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwarePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>[];
                };
                delete: {
                    args: Prisma.SoftwarePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>;
                };
                update: {
                    args: Prisma.SoftwarePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwarePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwarePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwarePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.SoftwarePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.SoftwarePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwarePermission>;
                };
                groupBy: {
                    args: Prisma.SoftwarePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwarePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwarePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwarePermissionCountAggregateOutputType> | number;
                };
            };
        };
        SoftwareInstance: {
            payload: Prisma.$SoftwareInstancePayload<ExtArgs>;
            fields: Prisma.SoftwareInstanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareInstanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareInstanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareInstanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareInstanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>;
                };
                findMany: {
                    args: Prisma.SoftwareInstanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>[];
                };
                create: {
                    args: Prisma.SoftwareInstanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>;
                };
                createMany: {
                    args: Prisma.SoftwareInstanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareInstanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>[];
                };
                delete: {
                    args: Prisma.SoftwareInstanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>;
                };
                update: {
                    args: Prisma.SoftwareInstanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareInstanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareInstanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareInstanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareInstanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareInstanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwareInstance>;
                };
                groupBy: {
                    args: Prisma.SoftwareInstanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareInstanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareInstanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareInstanceCountAggregateOutputType> | number;
                };
            };
        };
        SoftwareInstancePermissionOverride: {
            payload: Prisma.$SoftwareInstancePermissionOverridePayload<ExtArgs>;
            fields: Prisma.SoftwareInstancePermissionOverrideFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareInstancePermissionOverrideFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareInstancePermissionOverrideFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareInstancePermissionOverrideFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareInstancePermissionOverrideFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>;
                };
                findMany: {
                    args: Prisma.SoftwareInstancePermissionOverrideFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>[];
                };
                create: {
                    args: Prisma.SoftwareInstancePermissionOverrideCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>;
                };
                createMany: {
                    args: Prisma.SoftwareInstancePermissionOverrideCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareInstancePermissionOverrideCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>[];
                };
                delete: {
                    args: Prisma.SoftwareInstancePermissionOverrideDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>;
                };
                update: {
                    args: Prisma.SoftwareInstancePermissionOverrideUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareInstancePermissionOverrideDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareInstancePermissionOverrideUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareInstancePermissionOverrideUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareInstancePermissionOverrideUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareInstancePermissionOverridePayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareInstancePermissionOverrideAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwareInstancePermissionOverride>;
                };
                groupBy: {
                    args: Prisma.SoftwareInstancePermissionOverrideGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareInstancePermissionOverrideGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareInstancePermissionOverrideCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareInstancePermissionOverrideCountAggregateOutputType> | number;
                };
            };
        };
        SoftwareLicenseLink: {
            payload: Prisma.$SoftwareLicenseLinkPayload<ExtArgs>;
            fields: Prisma.SoftwareLicenseLinkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareLicenseLinkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareLicenseLinkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareLicenseLinkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareLicenseLinkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>;
                };
                findMany: {
                    args: Prisma.SoftwareLicenseLinkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>[];
                };
                create: {
                    args: Prisma.SoftwareLicenseLinkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>;
                };
                createMany: {
                    args: Prisma.SoftwareLicenseLinkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareLicenseLinkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>[];
                };
                delete: {
                    args: Prisma.SoftwareLicenseLinkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>;
                };
                update: {
                    args: Prisma.SoftwareLicenseLinkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareLicenseLinkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareLicenseLinkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareLicenseLinkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareLicenseLinkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareLicenseLinkPayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareLicenseLinkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwareLicenseLink>;
                };
                groupBy: {
                    args: Prisma.SoftwareLicenseLinkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareLicenseLinkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareLicenseLinkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareLicenseLinkCountAggregateOutputType> | number;
                };
            };
        };
        Device: {
            payload: Prisma.$DevicePayload<ExtArgs>;
            fields: Prisma.DeviceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeviceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                findFirst: {
                    args: Prisma.DeviceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                findMany: {
                    args: Prisma.DeviceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>[];
                };
                create: {
                    args: Prisma.DeviceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                createMany: {
                    args: Prisma.DeviceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>[];
                };
                delete: {
                    args: Prisma.DeviceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                update: {
                    args: Prisma.DeviceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                deleteMany: {
                    args: Prisma.DeviceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeviceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>[];
                };
                upsert: {
                    args: Prisma.DeviceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DevicePayload>;
                };
                aggregate: {
                    args: Prisma.DeviceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDevice>;
                };
                groupBy: {
                    args: Prisma.DeviceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeviceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceCountAggregateOutputType> | number;
                };
            };
        };
        SoftwareUsageEvent: {
            payload: Prisma.$SoftwareUsageEventPayload<ExtArgs>;
            fields: Prisma.SoftwareUsageEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareUsageEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareUsageEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareUsageEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareUsageEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>;
                };
                findMany: {
                    args: Prisma.SoftwareUsageEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>[];
                };
                create: {
                    args: Prisma.SoftwareUsageEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>;
                };
                createMany: {
                    args: Prisma.SoftwareUsageEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareUsageEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>[];
                };
                delete: {
                    args: Prisma.SoftwareUsageEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>;
                };
                update: {
                    args: Prisma.SoftwareUsageEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareUsageEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareUsageEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareUsageEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareUsageEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareUsageEventPayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareUsageEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwareUsageEvent>;
                };
                groupBy: {
                    args: Prisma.SoftwareUsageEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareUsageEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareUsageEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareUsageEventCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'Role'
 */
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
/**
 * Reference to a field of type 'Role[]'
 */
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'UserHistoryAction'
 */
export type EnumUserHistoryActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserHistoryAction'>;
/**
 * Reference to a field of type 'UserHistoryAction[]'
 */
export type ListEnumUserHistoryActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserHistoryAction[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'Decimal'
 */
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
/**
 * Reference to a field of type 'Decimal[]'
 */
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
/**
 * Reference to a field of type 'OAuthProvider'
 */
export type EnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider'>;
/**
 * Reference to a field of type 'OAuthProvider[]'
 */
export type ListEnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider[]'>;
/**
 * Reference to a field of type 'AssetClass'
 */
export type EnumAssetClassFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetClass'>;
/**
 * Reference to a field of type 'AssetClass[]'
 */
export type ListEnumAssetClassFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetClass[]'>;
/**
 * Reference to a field of type 'AssetSubType'
 */
export type EnumAssetSubTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetSubType'>;
/**
 * Reference to a field of type 'AssetSubType[]'
 */
export type ListEnumAssetSubTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetSubType[]'>;
/**
 * Reference to a field of type 'DepreciationMethod'
 */
export type EnumDepreciationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DepreciationMethod'>;
/**
 * Reference to a field of type 'DepreciationMethod[]'
 */
export type ListEnumDepreciationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DepreciationMethod[]'>;
/**
 * Reference to a field of type 'VendorStatus'
 */
export type EnumVendorStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendorStatus'>;
/**
 * Reference to a field of type 'VendorStatus[]'
 */
export type ListEnumVendorStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendorStatus[]'>;
/**
 * Reference to a field of type 'VendorType'
 */
export type EnumVendorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendorType'>;
/**
 * Reference to a field of type 'VendorType[]'
 */
export type ListEnumVendorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendorType[]'>;
/**
 * Reference to a field of type 'PaymentTerms'
 */
export type EnumPaymentTermsFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentTerms'>;
/**
 * Reference to a field of type 'PaymentTerms[]'
 */
export type ListEnumPaymentTermsFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentTerms[]'>;
/**
 * Reference to a field of type 'TaxInvoiceMethod'
 */
export type EnumTaxInvoiceMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaxInvoiceMethod'>;
/**
 * Reference to a field of type 'TaxInvoiceMethod[]'
 */
export type ListEnumTaxInvoiceMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaxInvoiceMethod[]'>;
/**
 * Reference to a field of type 'VendorDocumentType'
 */
export type EnumVendorDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendorDocumentType'>;
/**
 * Reference to a field of type 'VendorDocumentType[]'
 */
export type ListEnumVendorDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendorDocumentType[]'>;
/**
 * Reference to a field of type 'AssetStatus'
 */
export type EnumAssetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetStatus'>;
/**
 * Reference to a field of type 'AssetStatus[]'
 */
export type ListEnumAssetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetStatus[]'>;
/**
 * Reference to a field of type 'AssetCondition'
 */
export type EnumAssetConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetCondition'>;
/**
 * Reference to a field of type 'AssetCondition[]'
 */
export type ListEnumAssetConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetCondition[]'>;
/**
 * Reference to a field of type 'AssetOwnershipType'
 */
export type EnumAssetOwnershipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetOwnershipType'>;
/**
 * Reference to a field of type 'AssetOwnershipType[]'
 */
export type ListEnumAssetOwnershipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetOwnershipType[]'>;
/**
 * Reference to a field of type 'AssetAction'
 */
export type EnumAssetActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetAction'>;
/**
 * Reference to a field of type 'AssetAction[]'
 */
export type ListEnumAssetActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetAction[]'>;
/**
 * Reference to a field of type 'MaintenanceStatus'
 */
export type EnumMaintenanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceStatus'>;
/**
 * Reference to a field of type 'MaintenanceStatus[]'
 */
export type ListEnumMaintenanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceStatus[]'>;
/**
 * Reference to a field of type 'MaintenanceType'
 */
export type EnumMaintenanceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceType'>;
/**
 * Reference to a field of type 'MaintenanceType[]'
 */
export type ListEnumMaintenanceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceType[]'>;
/**
 * Reference to a field of type 'MaintenanceServiceType'
 */
export type EnumMaintenanceServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceServiceType'>;
/**
 * Reference to a field of type 'MaintenanceServiceType[]'
 */
export type ListEnumMaintenanceServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceServiceType[]'>;
/**
 * Reference to a field of type 'MaintenancePayer'
 */
export type EnumMaintenancePayerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenancePayer'>;
/**
 * Reference to a field of type 'MaintenancePayer[]'
 */
export type ListEnumMaintenancePayerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenancePayer[]'>;
/**
 * Reference to a field of type 'PaymentDirection'
 */
export type EnumPaymentDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentDirection'>;
/**
 * Reference to a field of type 'PaymentDirection[]'
 */
export type ListEnumPaymentDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentDirection[]'>;
/**
 * Reference to a field of type 'LoanStatus'
 */
export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>;
/**
 * Reference to a field of type 'LoanStatus[]'
 */
export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>;
/**
 * Reference to a field of type 'LoanReturnCondition'
 */
export type EnumLoanReturnConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanReturnCondition'>;
/**
 * Reference to a field of type 'LoanReturnCondition[]'
 */
export type ListEnumLoanReturnConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanReturnCondition[]'>;
/**
 * Reference to a field of type 'LoanExtensionStatus'
 */
export type EnumLoanExtensionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanExtensionStatus'>;
/**
 * Reference to a field of type 'LoanExtensionStatus[]'
 */
export type ListEnumLoanExtensionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanExtensionStatus[]'>;
/**
 * Reference to a field of type 'NotificationType'
 */
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
/**
 * Reference to a field of type 'NotificationType[]'
 */
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
/**
 * Reference to a field of type 'NotificationChannelStatus'
 */
export type EnumNotificationChannelStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannelStatus'>;
/**
 * Reference to a field of type 'NotificationChannelStatus[]'
 */
export type ListEnumNotificationChannelStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannelStatus[]'>;
/**
 * Reference to a field of type 'SoftwareType'
 */
export type EnumSoftwareTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SoftwareType'>;
/**
 * Reference to a field of type 'SoftwareType[]'
 */
export type ListEnumSoftwareTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SoftwareType[]'>;
/**
 * Reference to a field of type 'SoftwarePermissionStatus'
 */
export type EnumSoftwarePermissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SoftwarePermissionStatus'>;
/**
 * Reference to a field of type 'SoftwarePermissionStatus[]'
 */
export type ListEnumSoftwarePermissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SoftwarePermissionStatus[]'>;
/**
 * Reference to a field of type 'AuditAction'
 */
export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>;
/**
 * Reference to a field of type 'AuditAction[]'
 */
export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
    /**
     * Optional maximum size for the query plan cache. If not provided, a default size will be used.
     * A value of `0` can be used to disable the cache entirely. A higher cache size can improve
     * performance for applications that execute a large number of unique queries, while a smaller
     * cache size can reduce memory usage.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   queryPlanCacheMaxSize: 100,
     * })
     * ```
     */
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    userHistory?: Prisma.UserHistoryOmit;
    passwordHistory?: Prisma.PasswordHistoryOmit;
    passwordReset?: Prisma.PasswordResetOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    license?: Prisma.LicenseOmit;
    licenseAssignment?: Prisma.LicenseAssignmentOmit;
    oAuthAccount?: Prisma.OAuthAccountOmit;
    department?: Prisma.DepartmentOmit;
    team?: Prisma.TeamOmit;
    assetCategory?: Prisma.AssetCategoryOmit;
    manufacturer?: Prisma.ManufacturerOmit;
    assetCatalog?: Prisma.AssetCatalogOmit;
    location?: Prisma.LocationOmit;
    vendor?: Prisma.VendorOmit;
    vendorDocument?: Prisma.VendorDocumentOmit;
    asset?: Prisma.AssetOmit;
    hardwareAsset?: Prisma.HardwareAssetOmit;
    softwareAsset?: Prisma.SoftwareAssetOmit;
    peripheralAsset?: Prisma.PeripheralAssetOmit;
    officeAsset?: Prisma.OfficeAssetOmit;
    facilityAsset?: Prisma.FacilityAssetOmit;
    networkAsset?: Prisma.NetworkAssetOmit;
    assetCodeCounter?: Prisma.AssetCodeCounterOmit;
    assetHistory?: Prisma.AssetHistoryOmit;
    maintenance?: Prisma.MaintenanceOmit;
    maintenancePayment?: Prisma.MaintenancePaymentOmit;
    depreciation?: Prisma.DepreciationOmit;
    depreciationRecord?: Prisma.DepreciationRecordOmit;
    loan?: Prisma.LoanOmit;
    loanReturn?: Prisma.LoanReturnOmit;
    loanExtension?: Prisma.LoanExtensionOmit;
    notification?: Prisma.NotificationOmit;
    software?: Prisma.SoftwareOmit;
    softwarePermission?: Prisma.SoftwarePermissionOmit;
    softwareInstance?: Prisma.SoftwareInstanceOmit;
    softwareInstancePermissionOverride?: Prisma.SoftwareInstancePermissionOverrideOmit;
    softwareLicenseLink?: Prisma.SoftwareLicenseLinkOmit;
    device?: Prisma.DeviceOmit;
    softwareUsageEvent?: Prisma.SoftwareUsageEventOmit;
    auditLog?: Prisma.AuditLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map