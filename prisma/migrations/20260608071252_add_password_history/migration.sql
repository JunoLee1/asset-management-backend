-- CreateTable
CREATE TABLE "password_histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "password_histories_userId_createdAt_idx" ON "password_histories"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "password_histories" ADD CONSTRAINT "password_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: 기존 user.password 를 PasswordHistory 1행씩 적재 (가정 ①)
-- 6개월 정책 일관성 — "현재 비밀번호 = 새 비밀번호" 변경 차단을 위해 필요
-- id = 'seed_' || user.id (cuid 와 prefix 다름 + user.id 유일성 승계 → unique 보장)
-- createdAt = NOW()  → 마이그레이션 시점부터 6개월간 현 비밀번호 재사용 차단
INSERT INTO "password_histories" ("id", "userId", "passwordHash", "createdAt")
SELECT
    'seed_' || "id",
    "id",
    "password",
    NOW()
FROM "users"
WHERE "password" IS NOT NULL;
