export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly TEAM_LEAD: "TEAM_LEAD";
    readonly USER: "USER";
    readonly ASSET_MANAGER: "ASSET_MANAGER";
    readonly REPAIR_OWNER: "REPAIR_OWNER";
    readonly REPAIR_TECH: "REPAIR_TECH";
    readonly AP_USER: "AP_USER";
    readonly APPROVER: "APPROVER";
    readonly SECURITY_OFFICER: "SECURITY_OFFICER";
    readonly DEPT_LEAD: "DEPT_LEAD";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OAuthProvider: {
    readonly GOOGLE: "GOOGLE";
    readonly KAKAO: "KAKAO";
};
export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider];
export declare const AssetClass: {
    readonly IT_ASSET: "IT_ASSET";
    readonly OFFICE_ASSET: "OFFICE_ASSET";
    readonly FACILITY_ASSET: "FACILITY_ASSET";
    readonly NETWORK_ASSET: "NETWORK_ASSET";
};
export type AssetClass = (typeof AssetClass)[keyof typeof AssetClass];
export declare const AssetSubType: {
    readonly HARDWARE: "HARDWARE";
    readonly SOFTWARE: "SOFTWARE";
    readonly PERIPHERAL: "PERIPHERAL";
};
export type AssetSubType = (typeof AssetSubType)[keyof typeof AssetSubType];
export declare const AssetStatus: {
    readonly OPERATING: "OPERATING";
    readonly IDLE: "IDLE";
    readonly STANDBY: "STANDBY";
    readonly REPAIR: "REPAIR";
    readonly PENDING_DISPOSAL: "PENDING_DISPOSAL";
    readonly UNDER_CONSTRUCTION: "UNDER_CONSTRUCTION";
    readonly RETIRED: "RETIRED";
};
export type AssetStatus = (typeof AssetStatus)[keyof typeof AssetStatus];
export declare const AssetCondition: {
    readonly EXCELLENT: "EXCELLENT";
    readonly GOOD: "GOOD";
    readonly FAIR: "FAIR";
    readonly POOR: "POOR";
    readonly LOST: "LOST";
};
export type AssetCondition = (typeof AssetCondition)[keyof typeof AssetCondition];
export declare const MaintenanceStatus: {
    readonly PENDING_MANAGER: "PENDING_MANAGER";
    readonly PENDING_ADMIN: "PENDING_ADMIN";
    readonly APPROVED: "APPROVED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly REJECTED: "REJECTED";
};
export type MaintenanceStatus = (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];
export declare const MaintenancePayer: {
    readonly COMPANY: "COMPANY";
    readonly USER: "USER";
    readonly SHARED: "SHARED";
};
export type MaintenancePayer = (typeof MaintenancePayer)[keyof typeof MaintenancePayer];
export declare const MaintenanceServiceType: {
    readonly PAID_REPAIR: "PAID_REPAIR";
    readonly FREE_REPAIR: "FREE_REPAIR";
    readonly REPLACEMENT: "REPLACEMENT";
    readonly RETURN: "RETURN";
};
export type MaintenanceServiceType = (typeof MaintenanceServiceType)[keyof typeof MaintenanceServiceType];
export declare const MaintenanceType: {
    readonly REPAIR: "REPAIR";
    readonly INSPECTION: "INSPECTION";
    readonly UPGRADE: "UPGRADE";
};
export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];
export declare const AssetAction: {
    readonly CREATED: "CREATED";
    readonly UPDATED: "UPDATED";
    readonly TRANSFERRED: "TRANSFERRED";
    readonly ASSIGNED: "ASSIGNED";
    readonly UNASSIGNED: "UNASSIGNED";
    readonly MAINTENANCE_STARTED: "MAINTENANCE_STARTED";
    readonly MAINTENANCE_COMPLETED: "MAINTENANCE_COMPLETED";
    readonly STATUS_CHANGED: "STATUS_CHANGED";
    readonly RETIRED: "RETIRED";
};
export type AssetAction = (typeof AssetAction)[keyof typeof AssetAction];
export declare const DepreciationMethod: {
    readonly STRAIGHT_LINE: "STRAIGHT_LINE";
    readonly DECLINING_BALANCE: "DECLINING_BALANCE";
};
export type DepreciationMethod = (typeof DepreciationMethod)[keyof typeof DepreciationMethod];
export declare const LoanExtensionStatus: {
    readonly PENDING_MANAGER: "PENDING_MANAGER";
    readonly PENDING_ADMIN: "PENDING_ADMIN";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type LoanExtensionStatus = (typeof LoanExtensionStatus)[keyof typeof LoanExtensionStatus];
export declare const LoanStatus: {
    readonly PENDING_MANAGER: "PENDING_MANAGER";
    readonly PENDING_DEPT: "PENDING_DEPT";
    readonly PENDING_ADMIN: "PENDING_ADMIN";
    readonly APPROVED: "APPROVED";
    readonly CHECKED_OUT: "CHECKED_OUT";
    readonly RECEIVED: "RECEIVED";
    readonly PENDING_INSPECTION: "PENDING_INSPECTION";
    readonly INSPECTED: "INSPECTED";
    readonly PENDING_RETURN_ADMIN: "PENDING_RETURN_ADMIN";
    readonly RETURNED: "RETURNED";
    readonly REJECTED: "REJECTED";
    readonly CANCELLED: "CANCELLED";
    readonly RECALLED: "RECALLED";
};
export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus];
export declare const LoanReturnCondition: {
    readonly GOOD: "GOOD";
    readonly MINOR_DAMAGE: "MINOR_DAMAGE";
    readonly MAJOR_DAMAGE: "MAJOR_DAMAGE";
    readonly LOST: "LOST";
};
export type LoanReturnCondition = (typeof LoanReturnCondition)[keyof typeof LoanReturnCondition];
export declare const NotificationType: {
    readonly TERMINATION_RETURN_REMINDER: "TERMINATION_RETURN_REMINDER";
    readonly LOAN_APPROVED: "LOAN_APPROVED";
    readonly LOAN_CHECKED_OUT: "LOAN_CHECKED_OUT";
    readonly LOAN_RECEIVED: "LOAN_RECEIVED";
    readonly MAINTENANCE_CHARGE: "MAINTENANCE_CHARGE";
    readonly LOAN_OVERDUE: "LOAN_OVERDUE";
    readonly COMPLIANCE_URGENT: "COMPLIANCE_URGENT";
    readonly LOAN_PENDING_APPROVAL: "LOAN_PENDING_APPROVAL";
    readonly LOAN_RETURN_REQUESTED: "LOAN_RETURN_REQUESTED";
    readonly MAINTENANCE_VENDOR_NOTIFY_FAILED: "MAINTENANCE_VENDOR_NOTIFY_FAILED";
    readonly MAINTENANCE_ASSIGNED_TO_REPAIR: "MAINTENANCE_ASSIGNED_TO_REPAIR";
    readonly MAINTENANCE_COMPLETED: "MAINTENANCE_COMPLETED";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannelStatus: {
    readonly PENDING: "PENDING";
    readonly SENT: "SENT";
    readonly FAILED: "FAILED";
    readonly SKIPPED: "SKIPPED";
};
export type NotificationChannelStatus = (typeof NotificationChannelStatus)[keyof typeof NotificationChannelStatus];
export declare const AssetOwnershipType: {
    readonly COMPANY_OWNED: "COMPANY_OWNED";
    readonly PERSONAL: "PERSONAL";
};
export type AssetOwnershipType = (typeof AssetOwnershipType)[keyof typeof AssetOwnershipType];
export declare const VendorStatus: {
    readonly DRAFT: "DRAFT";
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly SUSPENDED: "SUSPENDED";
    readonly REJECTED: "REJECTED";
    readonly INACTIVE: "INACTIVE";
};
export type VendorStatus = (typeof VendorStatus)[keyof typeof VendorStatus];
export declare const VendorType: {
    readonly REPAIR: "REPAIR";
    readonly SOFTWARE: "SOFTWARE";
};
export type VendorType = (typeof VendorType)[keyof typeof VendorType];
export declare const PaymentTerms: {
    readonly MONTH_END: "MONTH_END";
    readonly PER_CASE: "PER_CASE";
    readonly DAYS_AFTER: "DAYS_AFTER";
};
export type PaymentTerms = (typeof PaymentTerms)[keyof typeof PaymentTerms];
export declare const PaymentDirection: {
    readonly VENDOR_PAYMENT: "VENDOR_PAYMENT";
    readonly USER_COLLECTION: "USER_COLLECTION";
};
export type PaymentDirection = (typeof PaymentDirection)[keyof typeof PaymentDirection];
export declare const TaxInvoiceMethod: {
    readonly EMAIL: "EMAIL";
    readonly FAX: "FAX";
    readonly POST: "POST";
};
export type TaxInvoiceMethod = (typeof TaxInvoiceMethod)[keyof typeof TaxInvoiceMethod];
export declare const VendorDocumentType: {
    readonly BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
    readonly BANKBOOK: "BANKBOOK";
    readonly PROXY: "PROXY";
    readonly CONTRACT: "CONTRACT";
    readonly TAX_CERTIFICATE: "TAX_CERTIFICATE";
};
export type VendorDocumentType = (typeof VendorDocumentType)[keyof typeof VendorDocumentType];
export declare const UserHistoryAction: {
    readonly ROLE_CHANGED: "ROLE_CHANGED";
    readonly DEACTIVATED: "DEACTIVATED";
    readonly ACTIVATED: "ACTIVATED";
    readonly REINVITED: "REINVITED";
    readonly PROFILE_UPDATED: "PROFILE_UPDATED";
};
export type UserHistoryAction = (typeof UserHistoryAction)[keyof typeof UserHistoryAction];
export declare const SoftwareType: {
    readonly SaaS: "SaaS";
    readonly OnPremise: "OnPremise";
    readonly Other: "Other";
};
export type SoftwareType = (typeof SoftwareType)[keyof typeof SoftwareType];
export declare const SoftwarePermissionStatus: {
    readonly UNCLASSIFIED: "UNCLASSIFIED";
    readonly ALLOWED: "ALLOWED";
    readonly DISALLOWED: "DISALLOWED";
};
export type SoftwarePermissionStatus = (typeof SoftwarePermissionStatus)[keyof typeof SoftwarePermissionStatus];
export declare const AuditAction: {
    readonly SOFTWARE_DISCOVERED: "SOFTWARE_DISCOVERED";
    readonly SOFTWARE_CREATED: "SOFTWARE_CREATED";
    readonly SOFTWARE_UPDATE: "SOFTWARE_UPDATE";
    readonly PERMISSION_GRANT: "PERMISSION_GRANT";
    readonly PERMISSION_REVOKE: "PERMISSION_REVOKE";
    readonly PERMISSION_REVIEW: "PERMISSION_REVIEW";
    readonly INSTANCE_OVERRIDE_CHANGE: "INSTANCE_OVERRIDE_CHANGE";
    readonly LICENSE_LINK_CHANGE: "LICENSE_LINK_CHANGE";
    readonly ROLE_CHANGE: "ROLE_CHANGE";
    readonly VENDOR_APPROVE: "VENDOR_APPROVE";
    readonly VENDOR_REJECT: "VENDOR_REJECT";
    readonly VENDOR_BLACKLIST: "VENDOR_BLACKLIST";
    readonly LICENSE_KEY_ACCESS: "LICENSE_KEY_ACCESS";
    readonly BANK_ACCOUNT_ACCESS: "BANK_ACCOUNT_ACCESS";
    readonly USER_DEACTIVATE: "USER_DEACTIVATE";
    readonly USER_ACTIVATE: "USER_ACTIVATE";
    readonly ASSET_RETIRE: "ASSET_RETIRE";
};
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
//# sourceMappingURL=enums.d.ts.map