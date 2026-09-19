-- ADR 0005: Disposal 2-stage approval
-- Branch: feat/disposal-improvements

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.

ALTER TYPE "disposal_status" ADD VALUE 'PENDING_MANAGER';
ALTER TYPE "disposal_status" ADD VALUE 'PENDING_ADMIN';

-- AlterTable: 1차 승인 (ASSET_MANAGER) 기록 컬럼
ALTER TABLE "disposals" ADD COLUMN "managerApprovedAt" TIMESTAMP(3);
ALTER TABLE "disposals" ADD COLUMN "managerApprovedById" TEXT;

-- AddForeignKey
ALTER TABLE "disposals"
  ADD CONSTRAINT "disposals_managerApprovedById_fkey"
  FOREIGN KEY ("managerApprovedById") REFERENCES "users"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "disposals_managerApprovedById_idx" ON "disposals"("managerApprovedById");

-- 데이터 마이그레이션: 기존 PENDING 신청을 PENDING_MANAGER 로 이관
UPDATE "disposals" SET "status" = 'PENDING_MANAGER' WHERE "status" = 'PENDING';

-- 신규 신청의 기본 상태 변경
ALTER TABLE "disposals" ALTER COLUMN "status" SET DEFAULT 'PENDING_MANAGER';
