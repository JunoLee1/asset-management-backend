
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED', 'CHECKED_OUT', 'RECEIVED', 'PENDING_INSPECTION', 'INSPECTED', 'PENDING_RETURN_ADMIN', 'RETURNED', 'REJECTED', 'CANCELLED', 'RECALLED');

-- CreateEnum
CREATE TYPE "LoanReturnCondition" AS ENUM ('GOOD', 'MINOR_DAMAGE', 'MAJOR_DAMAGE', 'LOST');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TERMINATION_RETURN_REMINDER', 'LOAN_APPROVED', 'LOAN_CHECKED_OUT', 'LOAN_RECEIVED');

-- CreateEnum
CREATE TYPE "NotificationChannelStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'SKIPPED');

-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceStatus_new" AS ENUM ('PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED');
ALTER TABLE "public"."maintenances" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "maintenances" ALTER COLUMN "status" TYPE "MaintenanceStatus_new" USING ("status"::text::"MaintenanceStatus_new");
ALTER TYPE "MaintenanceStatus" RENAME TO "MaintenanceStatus_old";
ALTER TYPE "MaintenanceStatus_new" RENAME TO "MaintenanceStatus";
DROP TYPE "public"."MaintenanceStatus_old";
ALTER TABLE "maintenances" ALTER COLUMN "status" SET DEFAULT 'PENDING_MANAGER';
COMMIT;

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ASSET_MANAGER';

-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "maintenances_managerId_fkey";

-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "adminApprovedAt" TIMESTAMP(3),
ADD COLUMN     "adminApprovedById" TEXT,
ADD COLUMN     "estimatedCompletionDate" TIMESTAMP(3),
ADD COLUMN     "managerApprovedAt" TIMESTAMP(3),
ADD COLUMN     "managerApprovedById" TEXT,
ADD COLUMN     "rejectReason" TEXT,
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "rejectedById" TEXT,
ADD COLUMN     "requestedById" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING_MANAGER',
ALTER COLUMN "managerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hireDate" TIMESTAMP(3),
ADD COLUMN     "terminationDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING_MANAGER',
    "assetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "purpose" TEXT,
    "dueDate" TIMESTAMP(3),
    "managerApprovedAt" TIMESTAMP(3),
    "managerApprovedById" TEXT,
    "adminApprovedAt" TIMESTAMP(3),
    "adminApprovedById" TEXT,
    "checkedOutAt" TIMESTAMP(3),
    "checkedOutById" TEXT,
    "checkoutLocationId" TEXT,
    "checkoutMemo" TEXT,
    "receivedAt" TIMESTAMP(3),
    "receivedById" TEXT,
    "rejectReason" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectedById" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "recallReason" TEXT,
    "recalledAt" TIMESTAMP(3),
    "recalledById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_returns" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "returnRequestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condition" "LoanReturnCondition",
    "damageNote" TEXT,
    "inspectedAt" TIMESTAMP(3),
    "inspectedById" TEXT,
    "returnApprovedAt" TIMESTAMP(3),
    "returnApprovedById" TEXT,
    "finalizedAt" TIMESTAMP(3),
    "finalizedById" TEXT,

    CONSTRAINT "loan_returns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "metadata" JSONB,
    "recipientId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelStatus" "NotificationChannelStatus" NOT NULL DEFAULT 'PENDING',
    "channelAttempts" INTEGER NOT NULL DEFAULT 0,
    "channelLastError" TEXT,
    "channelSentAt" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "loans_status_createdAt_idx" ON "loans"("status", "createdAt");

-- CreateIndex
CREATE INDEX "loans_userId_idx" ON "loans"("userId");

-- CreateIndex
CREATE INDEX "loans_assetId_idx" ON "loans"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "loan_returns_loanId_key" ON "loan_returns"("loanId");

-- CreateIndex
CREATE INDEX "notifications_recipientId_readAt_createdAt_idx" ON "notifications"("recipientId", "readAt", "createdAt");

-- CreateIndex
CREATE INDEX "notifications_channelStatus_createdAt_idx" ON "notifications"("channelStatus", "createdAt");

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_managerApprovedById_fkey" FOREIGN KEY ("managerApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_adminApprovedById_fkey" FOREIGN KEY ("adminApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_managerApprovedById_fkey" FOREIGN KEY ("managerApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_adminApprovedById_fkey" FOREIGN KEY ("adminApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_checkedOutById_fkey" FOREIGN KEY ("checkedOutById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_checkoutLocationId_fkey" FOREIGN KEY ("checkoutLocationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_recalledById_fkey" FOREIGN KEY ("recalledById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_returns" ADD CONSTRAINT "loan_returns_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_returns" ADD CONSTRAINT "loan_returns_inspectedById_fkey" FOREIGN KEY ("inspectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_returns" ADD CONSTRAINT "loan_returns_returnApprovedById_fkey" FOREIGN KEY ("returnApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_returns" ADD CONSTRAINT "loan_returns_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

