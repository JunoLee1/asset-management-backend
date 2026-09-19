-- CreateEnum
CREATE TYPE "SecurityReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'ACKED');

-- CreateTable
CREATE TABLE "security_reports" (
    "id" TEXT NOT NULL,
    "status" "SecurityReportStatus" NOT NULL DEFAULT 'DRAFT',
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT,
    "authorId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "ackedAt" TIMESTAMP(3),
    "ackedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "security_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "security_reports_year_month_idx" ON "security_reports"("year", "month");

-- CreateIndex
CREATE INDEX "security_reports_authorId_idx" ON "security_reports"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "security_reports_year_month_authorId_key" ON "security_reports"("year", "month", "authorId");

-- AddForeignKey
ALTER TABLE "security_reports" ADD CONSTRAINT "security_reports_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_reports" ADD CONSTRAINT "security_reports_ackedById_fkey" FOREIGN KEY ("ackedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
