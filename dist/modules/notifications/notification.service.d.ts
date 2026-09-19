import type { NotificationType } from '../../generated/prisma/enums';
import { Prisma } from '../../generated/prisma/client';
type PrismaTx = Prisma.TransactionClient;
interface CreateNotificationInput {
    type: NotificationType;
    title: string;
    body: string;
    metadata?: Record<string, unknown>;
    recipientId: string;
}
interface ChannelResult {
    scanned: number;
    sent: number;
    failed: number;
    skipped: number;
}
interface OutboxResult {
    slack: ChannelResult;
    email: ChannelResult;
}
interface VendorMaintenanceRequest {
    vendorEmail: string;
    vendorContactName: string | null;
    assetCode: string;
    assetName: string;
    modelName: string | null;
    symptom: string;
    description: string | null;
    urgency: 'LOW' | 'MEDIUM' | 'HIGH';
    requesterName: string;
    requesterEmail: string;
}
interface NotificationListItem {
    id: string;
    type: NotificationType;
    title: string;
    body: string;
    metadata: unknown;
    readAt: Date | null;
    createdAt: Date;
}
interface TerminationCheckResult {
    candidates: number;
    notifications: number;
    skippedDuplicates: number;
}
interface ComplianceCheckResult {
    warrantyUrgent: number;
    licenseUrgent: number;
    overseated: number;
    notifications: number;
    skippedDuplicates: number;
}
export declare const notificationService: {
    createInApp: (input: CreateNotificationInput, tx?: PrismaTx) => Promise<void>;
    createLoanApprovedNotification: (params: {
        loanId: string;
        recipientUserId: string;
        assetCode: string;
        assetName: string;
    }, tx?: PrismaTx) => Promise<void>;
    createLoanCheckedOutNotification: (params: {
        loanId: string;
        recipientUserId: string;
        assetCode: string;
        assetName: string;
    }, tx?: PrismaTx) => Promise<void>;
    createLoanReceivedNotifications: (params: {
        loanId: string;
        assetCode: string;
        assetName: string;
        receiverName: string;
    }, tx?: PrismaTx) => Promise<void>;
    createLoanRequestedNotifications: (params: {
        loanId: string;
        assetCode: string;
        assetName: string;
        applicantName: string;
        applicantTeamId: string | null;
        applicantId: string;
    }, tx?: PrismaTx) => Promise<void>;
    createLoanPendingAdminNotifications: (params: {
        loanId: string;
        assetCode: string;
        assetName: string;
        applicantName: string;
    }, tx?: PrismaTx) => Promise<void>;
    createLoanReturnRequestedNotifications: (params: {
        loanId: string;
        assetCode: string;
        assetName: string;
        applicantName: string;
    }, tx?: PrismaTx) => Promise<void>;
    processOutbox: () => Promise<OutboxResult>;
    listMy: (recipientId: string) => Promise<NotificationListItem[]>;
    markRead: (id: string, recipientId: string) => Promise<void>;
    runTerminationCheck: () => Promise<TerminationCheckResult>;
    runComplianceCheck: () => Promise<ComplianceCheckResult>;
    sendMaintenanceVendorRequest: (req: VendorMaintenanceRequest) => Promise<void>;
    createMaintenanceAssignedToRepairNotifications: (params: {
        maintenanceId: string;
        assetCode: string;
        assetName: string;
        title: string;
    }) => Promise<void>;
    createMaintenanceCompletedNotifications: (params: {
        maintenanceId: string;
        assetCode: string;
        assetName: string;
        requesterId: string | null;
    }) => Promise<void>;
    createLicenseFullNotification: (params: {
        licenseId: string;
        licenseName: string;
        seatsTotal: number;
    }, tx?: PrismaTx) => Promise<void>;
};
export {};
//# sourceMappingURL=notification.service.d.ts.map