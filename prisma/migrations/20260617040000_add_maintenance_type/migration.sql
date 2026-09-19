-- 정비 유형 enum + maintenances.type 컬럼 추가
-- 기존 모든 maintenance는 REPAIR로 백필 (가장 흔한 케이스)
DO $$ BEGIN
  CREATE TYPE "MaintenanceType" AS ENUM ('REPAIR', 'INSPECTION', 'UPGRADE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "maintenances"
  ADD COLUMN IF NOT EXISTS "type" "MaintenanceType" NOT NULL DEFAULT 'REPAIR';
