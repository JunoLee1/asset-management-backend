-- ADR 0009: REPAIR_OWNER 역할 정의 및 수리 보고서 흐름

-- 1. RepairReportStatus enum 재생성 (PUBLISHED → SUBMITTED, FINALIZED 추가)
--    TEXT cast → 값 변환 → DROP/CREATE enum → cast back 순서
ALTER TABLE "repair_reports" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "repair_reports"
  ALTER COLUMN "status" TYPE TEXT USING "status"::TEXT;

DROP TYPE IF EXISTS "RepairReportStatus";

UPDATE "repair_reports" SET status = 'SUBMITTED' WHERE status = 'PUBLISHED';

CREATE TYPE "RepairReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'FINALIZED');

ALTER TABLE "repair_reports"
  ALTER COLUMN "status" TYPE "RepairReportStatus"
    USING "status"::"RepairReportStatus";

ALTER TABLE "repair_reports"
  ALTER COLUMN "status" SET DEFAULT 'DRAFT'::"RepairReportStatus";

-- 2. repair_reports: publishedAt 제거 + submittedAt / ack 필드 추가
ALTER TABLE "repair_reports" DROP COLUMN IF EXISTS "publishedAt";

ALTER TABLE "repair_reports"
  ADD COLUMN IF NOT EXISTS "submittedAt"          TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "adminAckedAt"         TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "adminAckedById"       TEXT,
  ADD COLUMN IF NOT EXISTS "assetManagerAckedAt"  TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "assetManagerAckedById" TEXT;

ALTER TABLE "repair_reports"
  ADD CONSTRAINT "repair_reports_adminAckedById_fkey"
    FOREIGN KEY ("adminAckedById") REFERENCES "users"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "repair_reports"
  ADD CONSTRAINT "repair_reports_assetManagerAckedById_fkey"
    FOREIGN KEY ("assetManagerAckedById") REFERENCES "users"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- 3. RepairCompletionReport: technician(사내) / vendor(외부) 필드 추가
ALTER TABLE "repair_completion_reports"
  ADD COLUMN IF NOT EXISTS "technicianId" TEXT,
  ADD COLUMN IF NOT EXISTS "vendorId"     TEXT;

ALTER TABLE "repair_completion_reports"
  ADD CONSTRAINT "repair_completion_reports_technicianId_fkey"
    FOREIGN KEY ("technicianId") REFERENCES "users"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "repair_completion_reports"
  ADD CONSTRAINT "repair_completion_reports_vendorId_fkey"
    FOREIGN KEY ("vendorId") REFERENCES "vendors"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
