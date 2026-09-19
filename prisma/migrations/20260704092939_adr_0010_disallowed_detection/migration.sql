-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'DISALLOWED_APP_DETECTED';

-- CreateTable
CREATE TABLE "disallowed_detections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disallowed_detections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "disallowed_detections_userId_idx" ON "disallowed_detections"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "disallowed_detections_userId_softwareId_key" ON "disallowed_detections"("userId", "softwareId");

-- AddForeignKey
ALTER TABLE "disallowed_detections" ADD CONSTRAINT "disallowed_detections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disallowed_detections" ADD CONSTRAINT "disallowed_detections_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE CASCADE;
