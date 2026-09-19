-- CreateEnum
CREATE TYPE "payment_direction" AS ENUM ('VENDOR_PAYMENT', 'USER_COLLECTION');

-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceServiceType_new" AS ENUM ('PAID_REPAIR', 'FREE_REPAIR', 'REPLACEMENT', 'RETURN');
ALTER TABLE "maintenances" ALTER COLUMN "serviceType" TYPE "MaintenanceServiceType_new" USING ("serviceType"::text::"MaintenanceServiceType_new");
ALTER TYPE "MaintenanceServiceType" RENAME TO "MaintenanceServiceType_old";
ALTER TYPE "MaintenanceServiceType_new" RENAME TO "MaintenanceServiceType";
DROP TYPE "public"."MaintenanceServiceType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'MAINTENANCE_CHARGE';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'TEAM_LEAD', 'USER', 'ASSET_MANAGER', 'REPAIR_OWNER', 'REPAIR_TECH', 'AP_USER', 'APPROVER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_departmentId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "maintenance_payments" (
    "id" TEXT NOT NULL,
    "maintenanceId" TEXT NOT NULL,
    "direction" "payment_direction" NOT NULL,
    "amount" DECIMAL(15,2),
    "paidAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "paidById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maintenance_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_payments_maintenanceId_direction_key" ON "maintenance_payments"("maintenanceId", "direction");

-- AddForeignKey
ALTER TABLE "maintenance_payments" ADD CONSTRAINT "maintenance_payments_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_payments" ADD CONSTRAINT "maintenance_payments_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
