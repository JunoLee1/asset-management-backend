-- ADR 0005: Disposal notifications fan-out (5종)
-- Branch: feat/disposal-retire-and-notifications

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.

ALTER TYPE "NotificationType" ADD VALUE 'DISPOSAL_PENDING_MANAGER';
ALTER TYPE "NotificationType" ADD VALUE 'DISPOSAL_PENDING_ADMIN';
ALTER TYPE "NotificationType" ADD VALUE 'DISPOSAL_APPROVED';
ALTER TYPE "NotificationType" ADD VALUE 'DISPOSAL_REJECTED';
ALTER TYPE "NotificationType" ADD VALUE 'DISPOSAL_COMPLETED';
