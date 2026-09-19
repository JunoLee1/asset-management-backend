-- CreateEnum
CREATE TYPE "repair_process_step" AS ENUM ('RECEIVED', 'DIAGNOSING', 'REPAIRING', 'COMPLETED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "vendor_document_type" ADD VALUE 'INSURANCE';
ALTER TYPE "vendor_document_type" ADD VALUE 'CERTIFICATION';
ALTER TYPE "vendor_document_type" ADD VALUE 'TECHNICIAN_LICENSE';
ALTER TYPE "vendor_document_type" ADD VALUE 'EQUIPMENT_PHOTO';

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "stepSlaHours" JSONB,
ADD COLUMN     "supportedSteps" "repair_process_step"[];

-- CreateTable
CREATE TABLE "vendor_products" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "category" TEXT,
    "demoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_certifications" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_technicians" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "certifications" TEXT[],
    "yearsOfExp" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_equipment" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vendor_products_vendorId_idx" ON "vendor_products"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_certifications_vendorId_idx" ON "vendor_certifications"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_technicians_vendorId_idx" ON "vendor_technicians"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_equipment_vendorId_idx" ON "vendor_equipment"("vendorId");

-- AddForeignKey
ALTER TABLE "vendor_products" ADD CONSTRAINT "vendor_products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_certifications" ADD CONSTRAINT "vendor_certifications_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_technicians" ADD CONSTRAINT "vendor_technicians_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_equipment" ADD CONSTRAINT "vendor_equipment_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
