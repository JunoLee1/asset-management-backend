-- AlterEnum
ALTER TYPE "LoanStatus" ADD VALUE 'PENDING_RETURN_DEPT';

-- AlterEnum
ALTER TYPE "MaintenanceStatus" ADD VALUE 'PENDING_DEPT';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'LOAN_PENDING_DEPT';
ALTER TYPE "NotificationType" ADD VALUE 'LOAN_PENDING_RETURN_DEPT';
ALTER TYPE "NotificationType" ADD VALUE 'MAINTENANCE_PENDING_DEPT';

-- AlterTable
ALTER TABLE "loan_returns" ADD COLUMN     "deptReturnApprovedAt" TIMESTAMP(3),
ADD COLUMN     "deptReturnApprovedById" TEXT;

-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "deptApprovedAt" TIMESTAMP(3),
ADD COLUMN     "deptApprovedById" TEXT;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_deptApprovedById_fkey" FOREIGN KEY ("deptApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_returns" ADD CONSTRAINT "loan_returns_deptReturnApprovedById_fkey" FOREIGN KEY ("deptReturnApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
