-- maintenances 누락 컬럼 (serviceType, isUserFault)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'MaintenanceServiceType') THEN
    CREATE TYPE "MaintenanceServiceType" AS ENUM ('WARRANTY', 'PAID', 'INTERNAL');
  END IF;
END $$;

ALTER TABLE "maintenances" ADD COLUMN IF NOT EXISTS "serviceType" "MaintenanceServiceType";
ALTER TABLE "maintenances" ADD COLUMN IF NOT EXISTS "isUserFault" BOOLEAN;
ALTER TABLE "maintenances" ADD COLUMN IF NOT EXISTS "status" "MaintenanceStatus" NOT NULL DEFAULT 'PENDING_MANAGER'::"MaintenanceStatus";
