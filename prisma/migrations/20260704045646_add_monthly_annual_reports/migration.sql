-- CreateEnum
CREATE TYPE "TeamReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEWED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DeptReportStatus" AS ENUM ('DRAFT', 'FINALIZED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'REPORT_DEADLINE_REMINDER';
ALTER TYPE "NotificationType" ADD VALUE 'REPORT_OVERDUE';

-- CreateTable
CREATE TABLE "team_monthly_reports" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "status" "TeamReportStatus" NOT NULL DEFAULT 'DRAFT',
    "assetCount" INTEGER NOT NULL DEFAULT 0,
    "newLoans" INTEGER NOT NULL DEFAULT 0,
    "returns" INTEGER NOT NULL DEFAULT 0,
    "overdueCount" INTEGER NOT NULL DEFAULT 0,
    "maintenanceCount" INTEGER NOT NULL DEFAULT 0,
    "teamLeadComment" TEXT,
    "submittedById" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "deptLeadComment" TEXT,
    "rejectedById" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_monthly_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dept_monthly_reports" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "status" "DeptReportStatus" NOT NULL DEFAULT 'DRAFT',
    "totalAssets" INTEGER NOT NULL DEFAULT 0,
    "totalNewLoans" INTEGER NOT NULL DEFAULT 0,
    "totalReturns" INTEGER NOT NULL DEFAULT 0,
    "totalOverdue" INTEGER NOT NULL DEFAULT 0,
    "totalMaintenance" INTEGER NOT NULL DEFAULT 0,
    "finalizedById" TEXT,
    "finalizedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dept_monthly_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_annual_reports" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" "TeamReportStatus" NOT NULL DEFAULT 'DRAFT',
    "assetCount" INTEGER NOT NULL DEFAULT 0,
    "newLoans" INTEGER NOT NULL DEFAULT 0,
    "returns" INTEGER NOT NULL DEFAULT 0,
    "overdueCount" INTEGER NOT NULL DEFAULT 0,
    "maintenanceCount" INTEGER NOT NULL DEFAULT 0,
    "teamLeadComment" TEXT,
    "submittedById" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "deptLeadComment" TEXT,
    "rejectedById" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_annual_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dept_annual_reports" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" "DeptReportStatus" NOT NULL DEFAULT 'DRAFT',
    "totalAssets" INTEGER NOT NULL DEFAULT 0,
    "totalNewLoans" INTEGER NOT NULL DEFAULT 0,
    "totalReturns" INTEGER NOT NULL DEFAULT 0,
    "totalOverdue" INTEGER NOT NULL DEFAULT 0,
    "totalMaintenance" INTEGER NOT NULL DEFAULT 0,
    "finalizedById" TEXT,
    "finalizedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dept_annual_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "team_monthly_reports_year_month_idx" ON "team_monthly_reports"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "team_monthly_reports_teamId_year_month_key" ON "team_monthly_reports"("teamId", "year", "month");

-- CreateIndex
CREATE INDEX "dept_monthly_reports_year_month_idx" ON "dept_monthly_reports"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "dept_monthly_reports_departmentId_year_month_key" ON "dept_monthly_reports"("departmentId", "year", "month");

-- CreateIndex
CREATE INDEX "team_annual_reports_year_idx" ON "team_annual_reports"("year");

-- CreateIndex
CREATE UNIQUE INDEX "team_annual_reports_teamId_year_key" ON "team_annual_reports"("teamId", "year");

-- CreateIndex
CREATE INDEX "dept_annual_reports_year_idx" ON "dept_annual_reports"("year");

-- CreateIndex
CREATE UNIQUE INDEX "dept_annual_reports_departmentId_year_key" ON "dept_annual_reports"("departmentId", "year");

-- AddForeignKey
ALTER TABLE "team_monthly_reports" ADD CONSTRAINT "team_monthly_reports_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_monthly_reports" ADD CONSTRAINT "team_monthly_reports_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_monthly_reports" ADD CONSTRAINT "team_monthly_reports_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_monthly_reports" ADD CONSTRAINT "team_monthly_reports_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_monthly_reports" ADD CONSTRAINT "dept_monthly_reports_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_monthly_reports" ADD CONSTRAINT "dept_monthly_reports_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_annual_reports" ADD CONSTRAINT "team_annual_reports_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_annual_reports" ADD CONSTRAINT "team_annual_reports_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_annual_reports" ADD CONSTRAINT "team_annual_reports_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_annual_reports" ADD CONSTRAINT "team_annual_reports_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_annual_reports" ADD CONSTRAINT "dept_annual_reports_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_annual_reports" ADD CONSTRAINT "dept_annual_reports_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
