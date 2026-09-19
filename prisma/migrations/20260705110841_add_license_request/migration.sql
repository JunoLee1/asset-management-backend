-- CreateEnum
CREATE TYPE "LicenseRequestStatus" AS ENUM ('PENDING_SECURITY', 'PENDING_ADMIN', 'APPROVED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'LICENSE_PENDING_SECURITY';
ALTER TYPE "NotificationType" ADD VALUE 'LICENSE_PENDING_ADMIN';
ALTER TYPE "NotificationType" ADD VALUE 'LICENSE_APPROVED';
ALTER TYPE "NotificationType" ADD VALUE 'LICENSE_REJECTED';

-- CreateTable
CREATE TABLE "license_requests" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "assetId" TEXT,
    "status" "LicenseRequestStatus" NOT NULL DEFAULT 'PENDING_SECURITY',
    "securityReviewedById" TEXT,
    "securityReviewedAt" TIMESTAMP(3),
    "adminApprovedById" TEXT,
    "adminApprovedAt" TIMESTAMP(3),
    "rejectedById" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "license_requests_licenseId_idx" ON "license_requests"("licenseId");

-- CreateIndex
CREATE INDEX "license_requests_targetUserId_idx" ON "license_requests"("targetUserId");

-- CreateIndex
CREATE INDEX "license_requests_status_idx" ON "license_requests"("status");

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_securityReviewedById_fkey" FOREIGN KEY ("securityReviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_adminApprovedById_fkey" FOREIGN KEY ("adminApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
