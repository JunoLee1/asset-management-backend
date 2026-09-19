-- CreateEnum
CREATE TYPE "AssetClass" AS ENUM ('HARDWARE', 'SOFTWARE', 'PERIPHERAL');

-- CreateEnum
CREATE TYPE "AssetCondition" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "MaintenancePayer" AS ENUM ('COMPANY', 'USER', 'SHARED');

-- AlterEnum
BEGIN;
CREATE TYPE "AssetAction_new" AS ENUM ('CREATED', 'UPDATED', 'TRANSFERRED', 'ASSIGNED', 'UNASSIGNED', 'MAINTENANCE_STARTED', 'MAINTENANCE_COMPLETED', 'RETIRED');
ALTER TABLE "asset_histories" ALTER COLUMN "action" TYPE "AssetAction_new" USING ("action"::text::"AssetAction_new");
ALTER TYPE "AssetAction" RENAME TO "AssetAction_old";
ALTER TYPE "AssetAction_new" RENAME TO "AssetAction";
DROP TYPE "public"."AssetAction_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AssetStatus_new" AS ENUM ('AVAILABLE', 'IN_USE', 'UNDER_MAINTENANCE', 'RETIRED');
ALTER TABLE "public"."assets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "assets" ALTER COLUMN "status" TYPE "AssetStatus_new" USING ("status"::text::"AssetStatus_new");
ALTER TYPE "AssetStatus" RENAME TO "AssetStatus_old";
ALTER TYPE "AssetStatus_new" RENAME TO "AssetStatus";
DROP TYPE "public"."AssetStatus_old";
ALTER TABLE "assets" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "asset_categories" ADD COLUMN     "class" "AssetClass" NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "assets" DROP COLUMN "serialNumber",
ADD COLUMN     "catalogId" TEXT,
ADD COLUMN     "class" "AssetClass" NOT NULL,
ADD COLUMN     "condition" "AssetCondition" NOT NULL DEFAULT 'GOOD',
ADD COLUMN     "conditionAssessedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE',
ALTER COLUMN "purchaseDate" SET NOT NULL,
ALTER COLUMN "purchasePrice" SET NOT NULL;

-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "payerNote" TEXT,
ADD COLUMN     "payerType" "MaintenancePayer",
ADD COLUMN     "payerUserId" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "phoneNumberHash" TEXT;

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "revokedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productKey" TEXT,
    "productKeyMask" TEXT,
    "vendorId" TEXT,
    "seatsTotal" INTEGER NOT NULL DEFAULT 1,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "cost" DECIMAL(15,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license_assignments" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unassignedAt" TIMESTAMP(3),

    CONSTRAINT "license_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_catalogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT,
    "modelCode" TEXT,
    "class" "AssetClass" NOT NULL,
    "imageUrl" TEXT,
    "specs" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "asset_catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hardware_assets" (
    "assetId" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "macAddr" TEXT,
    "ipAddr" TEXT,
    "cpu" TEXT,
    "ramGb" INTEGER,
    "storageGb" INTEGER,
    "warrantyEnd" TIMESTAMP(3),

    CONSTRAINT "hardware_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "software_assets" (
    "assetId" TEXT NOT NULL,
    "licenseKey" TEXT NOT NULL,
    "licenseSeats" INTEGER NOT NULL,
    "installedCount" INTEGER NOT NULL DEFAULT 0,
    "expiryDate" TIMESTAMP(3),
    "version" TEXT,

    CONSTRAINT "software_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "peripheral_assets" (
    "assetId" TEXT NOT NULL,
    "serialNo" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "peripheral_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "asset_code_counters" (
    "class" "AssetClass" NOT NULL,
    "nextNumber" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_code_counters_pkey" PRIMARY KEY ("class")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_tokenHash_key" ON "refresh_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE INDEX "refresh_tokens_expiresAt_idx" ON "refresh_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "licenses_expiryDate_idx" ON "licenses"("expiryDate");

-- CreateIndex
CREATE INDEX "license_assignments_licenseId_userId_assignedAt_idx" ON "license_assignments"("licenseId", "userId", "assignedAt");

-- CreateIndex
CREATE INDEX "license_assignments_assetId_idx" ON "license_assignments"("assetId");

-- CreateIndex
CREATE INDEX "asset_catalogs_class_idx" ON "asset_catalogs"("class");

-- CreateIndex
CREATE INDEX "asset_catalogs_categoryId_idx" ON "asset_catalogs"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "hardware_assets_serialNo_key" ON "hardware_assets"("serialNo");

-- CreateIndex
CREATE UNIQUE INDEX "peripheral_assets_serialNo_key" ON "peripheral_assets"("serialNo");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumberHash_key" ON "users"("phoneNumberHash");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_assignments" ADD CONSTRAINT "license_assignments_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_assignments" ADD CONSTRAINT "license_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_assignments" ADD CONSTRAINT "license_assignments_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_catalogs" ADD CONSTRAINT "asset_catalogs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "asset_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "asset_catalogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hardware_assets" ADD CONSTRAINT "hardware_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_assets" ADD CONSTRAINT "software_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peripheral_assets" ADD CONSTRAINT "peripheral_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_payerUserId_fkey" FOREIGN KEY ("payerUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
