-- AlterTable: add vendor report fields to maintenances
ALTER TABLE "maintenances" ADD COLUMN     "vendorReportBody" TEXT,
ADD COLUMN     "vendorReportEmailId" TEXT,
ADD COLUMN     "vendorReportParsedCost" DECIMAL(15,2),
ADD COLUMN     "vendorReportReceivedAt" TIMESTAMP(3);

-- CreateIndex: unique constraint on vendorReportEmailId for dedup
CREATE UNIQUE INDEX "maintenances_vendorReportEmailId_key" ON "maintenances"("vendorReportEmailId");

-- AlterEnum: add MAINTENANCE_VENDOR_REPORT
ALTER TYPE "NotificationType" ADD VALUE 'MAINTENANCE_VENDOR_REPORT';
