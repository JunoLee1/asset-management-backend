-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LicenseRequestStatus" ADD VALUE 'PENDING_MANAGER';
ALTER TYPE "LicenseRequestStatus" ADD VALUE 'PENDING_DEPT';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'LICENSE_PENDING_MANAGER';
ALTER TYPE "NotificationType" ADD VALUE 'LICENSE_PENDING_DEPT';

-- AlterTable
ALTER TABLE "license_requests" ADD COLUMN     "deptApprovedAt" TIMESTAMP(3),
ADD COLUMN     "deptApprovedById" TEXT,
ADD COLUMN     "managerApprovedAt" TIMESTAMP(3),
ADD COLUMN     "managerApprovedById" TEXT,
ALTER COLUMN "status" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_managerApprovedById_fkey" FOREIGN KEY ("managerApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_deptApprovedById_fkey" FOREIGN KEY ("deptApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
