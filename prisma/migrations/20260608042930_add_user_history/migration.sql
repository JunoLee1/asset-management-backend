-- CreateEnum
CREATE TYPE "UserHistoryAction" AS ENUM ('ROLE_CHANGED', 'DEACTIVATED', 'ACTIVATED', 'REINVITED', 'PROFILE_UPDATED');

-- CreateTable
CREATE TABLE "user_histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "performedById" TEXT NOT NULL,
    "action" "UserHistoryAction" NOT NULL,
    "reason" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_histories_userId_createdAt_idx" ON "user_histories"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "user_histories_performedById_idx" ON "user_histories"("performedById");

-- AddForeignKey
ALTER TABLE "user_histories" ADD CONSTRAINT "user_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_histories" ADD CONSTRAINT "user_histories_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
