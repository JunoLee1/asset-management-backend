-- Phase I — 이메일 outbox 채널 (R2 방어)
-- Notification 에 email* 4개 컬럼 + emailStatus index 추가

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN "emailAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "emailLastError" TEXT,
ADD COLUMN "emailSentAt" TIMESTAMP(3),
ADD COLUMN "emailStatus" "NotificationChannelStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "notifications_emailStatus_createdAt_idx" ON "notifications"("emailStatus", "createdAt");
