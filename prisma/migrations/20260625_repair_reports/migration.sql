-- CreateEnum
CREATE TYPE "RepairReportType" AS ENUM ('MONTHLY', 'ANNUAL', 'REPAIR_SUMMARY');

-- CreateEnum
CREATE TYPE "RepairReportStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "repair_reports" (
    "id" TEXT NOT NULL,
    "type" "RepairReportType" NOT NULL,
    "status" "RepairReportStatus" NOT NULL DEFAULT 'DRAFT',
    "year" INTEGER NOT NULL,
    "month" INTEGER,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "comment" TEXT,
    "authorId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repair_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "repair_reports_type_year_month_idx" ON "repair_reports"("type", "year", "month");

-- CreateIndex
CREATE INDEX "repair_reports_authorId_idx" ON "repair_reports"("authorId");

-- AddForeignKey
ALTER TABLE "repair_reports" ADD CONSTRAINT "repair_reports_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
