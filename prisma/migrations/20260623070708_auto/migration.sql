-- CreateEnum
CREATE TYPE "disposal_status" AS ENUM ('PENDING', 'APPROVED', 'COMPLETED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "disposal_reason" AS ENUM ('SALE', 'SCRAP', 'DONATION', 'LOST_STOLEN', 'TRANSFER');

-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "type" SET DEFAULT 'REPAIR';

-- CreateTable
CREATE TABLE "disposals" (
    "id" TEXT NOT NULL,
    "status" "disposal_status" NOT NULL DEFAULT 'PENDING',
    "reason" "disposal_reason" NOT NULL,
    "note" TEXT,
    "previousStatus" "AssetStatus" NOT NULL,
    "journalEntryNumber" TEXT,
    "assetId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "completedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "rejectedById" TEXT,
    "rejectReason" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disposal_evidences" (
    "id" TEXT NOT NULL,
    "disposalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disposal_evidences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "disposals_status_idx" ON "disposals"("status");

-- CreateIndex
CREATE INDEX "disposals_assetId_idx" ON "disposals"("assetId");

-- AddForeignKey
ALTER TABLE "disposals" ADD CONSTRAINT "disposals_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disposals" ADD CONSTRAINT "disposals_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disposals" ADD CONSTRAINT "disposals_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disposals" ADD CONSTRAINT "disposals_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disposal_evidences" ADD CONSTRAINT "disposal_evidences_disposalId_fkey" FOREIGN KEY ("disposalId") REFERENCES "disposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
