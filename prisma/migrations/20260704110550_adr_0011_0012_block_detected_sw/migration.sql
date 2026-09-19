-- CreateEnum
CREATE TYPE "DetectedSoftwareStatus" AS ENUM ('PENDING_ASSET_MANAGER', 'PENDING_SECURITY_OFFICER');

-- CreateEnum
CREATE TYPE "SoftwareSource" AS ENUM ('AGENT', 'MANUAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'BLOCK_SET';
ALTER TYPE "AuditAction" ADD VALUE 'BLOCK_UNSET';
ALTER TYPE "AuditAction" ADD VALUE 'DETECTED_SW_REVIEWED';
ALTER TYPE "AuditAction" ADD VALUE 'DETECTED_SW_APPROVED';
ALTER TYPE "AuditAction" ADD VALUE 'DETECTED_SW_REJECTED';

-- AlterTable
ALTER TABLE "software" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "processName" TEXT;

-- AlterTable
ALTER TABLE "software_instances" ADD COLUMN     "source" "SoftwareSource" NOT NULL DEFAULT 'AGENT';

-- CreateTable
CREATE TABLE "detected_software" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "processName" TEXT NOT NULL,
    "version" TEXT,
    "manufacturer" TEXT,
    "os" TEXT,
    "detectedAt" TIMESTAMP(3) NOT NULL,
    "status" "DetectedSoftwareStatus" NOT NULL DEFAULT 'PENDING_ASSET_MANAGER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detected_software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "block_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "processName" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "block_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "detected_software_status_idx" ON "detected_software"("status");

-- CreateIndex
CREATE UNIQUE INDEX "detected_software_deviceId_processName_key" ON "detected_software"("deviceId", "processName");

-- CreateIndex
CREATE INDEX "block_events_softwareId_idx" ON "block_events"("softwareId");

-- CreateIndex
CREATE INDEX "block_events_deviceId_idx" ON "block_events"("deviceId");

-- CreateIndex
CREATE INDEX "block_events_userId_idx" ON "block_events"("userId");

-- AddForeignKey
ALTER TABLE "detected_software" ADD CONSTRAINT "detected_software_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_events" ADD CONSTRAINT "block_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_events" ADD CONSTRAINT "block_events_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_events" ADD CONSTRAINT "block_events_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
