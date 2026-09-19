-- CreateEnum
CREATE TYPE "loan_extension_status" AS ENUM ('PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "loan_extensions" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "status" "loan_extension_status" NOT NULL DEFAULT 'PENDING_MANAGER',
    "days" INTEGER NOT NULL,
    "requestedById" TEXT NOT NULL,
    "managerApprovedAt" TIMESTAMP(3),
    "managerApprovedById" TEXT,
    "adminApprovedAt" TIMESTAMP(3),
    "adminApprovedById" TEXT,
    "rejectionNote" TEXT,
    "rejectedAt" TIMESTAMP(3),
    "rejectedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loan_extensions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "loan_extensions" ADD CONSTRAINT "loan_extensions_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_extensions" ADD CONSTRAINT "loan_extensions_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_extensions" ADD CONSTRAINT "loan_extensions_managerApprovedById_fkey" FOREIGN KEY ("managerApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_extensions" ADD CONSTRAINT "loan_extensions_adminApprovedById_fkey" FOREIGN KEY ("adminApprovedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_extensions" ADD CONSTRAINT "loan_extensions_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

