-- AlterTable
ALTER TABLE "vendors" ADD COLUMN "serviceRegion" TEXT,
ADD COLUMN "contractStartDate" TIMESTAMP(3),
ADD COLUMN "contractEndDate" TIMESTAMP(3),
ADD COLUMN "slaHours" INTEGER,
ADD COLUMN "canVisitOnSite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "canReceiveDevice" BOOLEAN NOT NULL DEFAULT false;
