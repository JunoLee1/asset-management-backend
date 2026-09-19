-- CreateEnum
CREATE TYPE "AssetSubType" AS ENUM ('HARDWARE', 'SOFTWARE', 'PERIPHERAL');

-- CreateEnum
CREATE TYPE "SoftwareType" AS ENUM ('SaaS', 'OnPremise', 'Other');

-- CreateEnum
CREATE TYPE "SoftwarePermissionStatus" AS ENUM ('UNCLASSIFIED', 'ALLOWED', 'DISALLOWED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('SOFTWARE_DISCOVERED', 'PERMISSION_GRANT', 'PERMISSION_REVOKE', 'PERMISSION_REVIEW', 'INSTANCE_OVERRIDE_CHANGE', 'LICENSE_LINK_CHANGE', 'ROLE_CHANGE', 'VENDOR_APPROVE', 'VENDOR_REJECT', 'VENDOR_BLACKLIST', 'LICENSE_KEY_ACCESS', 'BANK_ACCOUNT_ACCESS', 'USER_DEACTIVATE', 'USER_ACTIVATE', 'ASSET_RETIRE');

-- AlterEnum
BEGIN;
CREATE TYPE "AssetClass_new" AS ENUM ('IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET');
ALTER TABLE "asset_categories" ALTER COLUMN "class" TYPE "AssetClass_new" USING ("class"::text::"AssetClass_new");
ALTER TABLE "asset_catalogs" ALTER COLUMN "class" TYPE "AssetClass_new" USING ("class"::text::"AssetClass_new");
ALTER TABLE "vendors" ALTER COLUMN "supportedClasses" TYPE "AssetClass_new"[] USING ("supportedClasses"::text::"AssetClass_new"[]);
ALTER TABLE "assets" ALTER COLUMN "class" TYPE "AssetClass_new" USING ("class"::text::"AssetClass_new");
ALTER TABLE "asset_code_counters" ALTER COLUMN "class" TYPE "AssetClass_new" USING ("class"::text::"AssetClass_new");
ALTER TYPE "AssetClass" RENAME TO "AssetClass_old";
ALTER TYPE "AssetClass_new" RENAME TO "AssetClass";
DROP TYPE "public"."AssetClass_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AssetStatus_new" AS ENUM ('OPERATING', 'IDLE', 'STANDBY', 'REPAIR', 'PENDING_DISPOSAL', 'UNDER_CONSTRUCTION', 'RETIRED');
ALTER TABLE "public"."assets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "assets" ALTER COLUMN "status" TYPE "AssetStatus_new" USING ("status"::text::"AssetStatus_new");
ALTER TYPE "AssetStatus" RENAME TO "AssetStatus_old";
ALTER TYPE "AssetStatus_new" RENAME TO "AssetStatus";
DROP TYPE "public"."AssetStatus_old";
ALTER TABLE "assets" ALTER COLUMN "status" SET DEFAULT 'IDLE';
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'LOAN_OVERDUE';
ALTER TYPE "NotificationType" ADD VALUE 'COMPLIANCE_URGENT';
ALTER TYPE "NotificationType" ADD VALUE 'LOAN_PENDING_APPROVAL';
ALTER TYPE "NotificationType" ADD VALUE 'LOAN_RETURN_REQUESTED';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SECURITY_OFFICER';

-- DropForeignKey
ALTER TABLE "asset_catalogs" DROP CONSTRAINT "asset_catalogs_categoryId_fkey";

-- AlterTable
ALTER TABLE "asset_categories" ADD COLUMN     "subType" "AssetSubType",
ALTER COLUMN "class" DROP NOT NULL;

-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "status" SET DEFAULT 'IDLE';

-- AlterTable
ALTER TABLE "facility_assets" ALTER COLUMN "installDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "nextInspectionDate" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "loans" ADD COLUMN     "overdueNotifyCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "software" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vendor" TEXT,
    "type" "SoftwareType" NOT NULL DEFAULT 'Other',
    "category" TEXT NOT NULL DEFAULT '기타',
    "description" TEXT,
    "licenseCoverage" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_permissions" (
    "id" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "status" "SoftwarePermissionStatus" NOT NULL DEFAULT 'UNCLASSIFIED',
    "prevStatus" "SoftwarePermissionStatus",
    "decidedById" TEXT,
    "decidedByRole" "Role",
    "decidedAt" TIMESTAMP(3),
    "reason" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "software_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_instances" (
    "id" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "userId" TEXT,
    "deviceId" TEXT NOT NULL,
    "executedOs" TEXT NOT NULL,
    "firstDiscoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "software_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_instance_permission_overrides" (
    "id" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "status" "SoftwarePermissionStatus" NOT NULL,
    "prevStatus" "SoftwarePermissionStatus",
    "decidedById" TEXT,
    "decidedByRole" "Role",
    "decidedAt" TIMESTAMP(3),
    "reason" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "software_instance_permission_overrides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_license_links" (
    "id" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "matchedById" TEXT,
    "matchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "software_license_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "os" TEXT,
    "userId" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_usage_events" (
    "id" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "durationSec" INTEGER,

    CONSTRAINT "software_usage_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "performedById" TEXT,
    "performedByRole" "Role",
    "detail" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "software_name_idx" ON "software"("name");

-- CreateIndex
CREATE INDEX "software_type_idx" ON "software"("type");

-- CreateIndex
CREATE UNIQUE INDEX "software_permissions_softwareId_key" ON "software_permissions"("softwareId");

-- CreateIndex
CREATE INDEX "software_instances_userId_idx" ON "software_instances"("userId");

-- CreateIndex
CREATE INDEX "software_instances_deviceId_idx" ON "software_instances"("deviceId");

-- CreateIndex
CREATE INDEX "software_instances_lastUsedAt_idx" ON "software_instances"("lastUsedAt");

-- CreateIndex
CREATE UNIQUE INDEX "software_instances_softwareId_deviceId_key" ON "software_instances"("softwareId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "software_instance_permission_overrides_instanceId_key" ON "software_instance_permission_overrides"("instanceId");

-- CreateIndex
CREATE INDEX "software_license_links_licenseId_idx" ON "software_license_links"("licenseId");

-- CreateIndex
CREATE UNIQUE INDEX "software_license_links_softwareId_licenseId_key" ON "software_license_links"("softwareId", "licenseId");

-- CreateIndex
CREATE UNIQUE INDEX "devices_hostname_key" ON "devices"("hostname");

-- CreateIndex
CREATE INDEX "devices_userId_idx" ON "devices"("userId");

-- CreateIndex
CREATE INDEX "software_usage_events_instanceId_occurredAt_idx" ON "software_usage_events"("instanceId", "occurredAt");

-- CreateIndex
CREATE INDEX "audit_logs_targetType_targetId_createdAt_idx" ON "audit_logs"("targetType", "targetId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_action_createdAt_idx" ON "audit_logs"("action", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_performedById_createdAt_idx" ON "audit_logs"("performedById", "createdAt");

-- AddForeignKey
ALTER TABLE "asset_catalogs" ADD CONSTRAINT "asset_catalogs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "asset_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_permissions" ADD CONSTRAINT "software_permissions_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_permissions" ADD CONSTRAINT "software_permissions_decidedById_fkey" FOREIGN KEY ("decidedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_instances" ADD CONSTRAINT "software_instances_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_instances" ADD CONSTRAINT "software_instances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_instances" ADD CONSTRAINT "software_instances_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_instance_permission_overrides" ADD CONSTRAINT "software_instance_permission_overrides_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "software_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_instance_permission_overrides" ADD CONSTRAINT "software_instance_permission_overrides_decidedById_fkey" FOREIGN KEY ("decidedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_license_links" ADD CONSTRAINT "software_license_links_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_license_links" ADD CONSTRAINT "software_license_links_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_license_links" ADD CONSTRAINT "software_license_links_matchedById_fkey" FOREIGN KEY ("matchedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_usage_events" ADD CONSTRAINT "software_usage_events_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "software_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

