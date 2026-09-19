-- CreateEnum
CREATE TYPE "vendor_status" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'SUSPENDED', 'REJECTED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "payment_terms" AS ENUM ('MONTH_END', 'PER_CASE', 'DAYS_AFTER');

-- CreateEnum
CREATE TYPE "tax_invoice_method" AS ENUM ('EMAIL', 'FAX', 'POST');

-- CreateEnum
CREATE TYPE "vendor_document_type" AS ENUM ('BUSINESS_REGISTRATION', 'BANKBOOK', 'PROXY', 'CONTRACT', 'TAX_CERTIFICATE');

-- AlterTable: Vendor — status, supportedClasses, approvedBy, and all new fields
ALTER TABLE "vendors"
  ADD COLUMN "status"                      "vendor_status" NOT NULL DEFAULT 'PENDING',
  ADD COLUMN "supportedClasses"            "AssetClass"[],
  ADD COLUMN "approvedAt"                  TIMESTAMP(3),
  ADD COLUMN "approvedById"                TEXT,
  ADD COLUMN "businessRegistrationNumber"  TEXT,
  ADD COLUMN "ceoName"                     TEXT,
  ADD COLUMN "businessType"                TEXT,
  ADD COLUMN "businessItem"                TEXT,
  ADD COLUMN "addressHeadOffice"           TEXT,
  ADD COLUMN "addressDetail"               TEXT,
  ADD COLUMN "addressBusiness"             TEXT,
  ADD COLUMN "contactDepartment"           TEXT,
  ADD COLUMN "contactPosition"             TEXT,
  ADD COLUMN "operatingHoursStart"         TEXT,
  ADD COLUMN "operatingHoursEnd"           TEXT,
  ADD COLUMN "operatesOnWeekend"           BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "canHandleUrgent"             BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "urgentConditionNote"         TEXT,
  ADD COLUMN "brandModelNote"              TEXT,
  ADD COLUMN "bankName"                    TEXT,
  ADD COLUMN "bankAccountNumber"           TEXT,
  ADD COLUMN "bankAccountNumberMask"       TEXT,
  ADD COLUMN "bankAccountHolder"           TEXT,
  ADD COLUMN "paymentTerms"               "payment_terms",
  ADD COLUMN "paymentDaysAfter"            INTEGER,
  ADD COLUMN "taxInvoiceEmail"             TEXT,
  ADD COLUMN "taxInvoiceMethod"           "tax_invoice_method",
  ADD COLUMN "faxNumber"                   TEXT,
  ADD COLUMN "postalAddress"               TEXT,
  ADD COLUMN "isVatIncluded"               BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "isWithholdingTax"            BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "slaCompletionDays"           INTEGER,
  ADD COLUMN "penaltyTerms"                TEXT,
  ADD COLUMN "repairWarrantyDays"          INTEGER,
  ADD COLUMN "unitPriceNote"               TEXT,
  ADD COLUMN "approvalNote"                TEXT,
  ADD COLUMN "rejectionNote"               TEXT,
  ADD COLUMN "rejectedAt"                  TIMESTAMP(3),
  ADD COLUMN "rejectedById"                TEXT,
  ADD COLUMN "isBlacklisted"               BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "blacklistReason"             TEXT,
  ADD COLUMN "blacklistedAt"               TIMESTAMP(3),
  ADD COLUMN "createdById"                 TEXT;

-- CreateTable
CREATE TABLE "vendor_documents" (
    "id"           TEXT NOT NULL,
    "vendorId"     TEXT NOT NULL,
    "documentType" "vendor_document_type" NOT NULL,
    "publicId"     TEXT NOT NULL,
    "secureUrl"    TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType"     TEXT NOT NULL,
    "sizeBytes"    INTEGER NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt"    TIMESTAMP(3),

    CONSTRAINT "vendor_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vendor_documents_vendorId_documentType_idx" ON "vendor_documents"("vendorId", "documentType");

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_approvedById_fkey"
  FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_rejectedById_fkey"
  FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_createdById_fkey"
  FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_documents" ADD CONSTRAINT "vendor_documents_vendorId_fkey"
  FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_documents" ADD CONSTRAINT "vendor_documents_uploadedById_fkey"
  FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
