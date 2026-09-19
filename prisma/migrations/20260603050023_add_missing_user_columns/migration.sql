-- users 테이블 누락 컬럼 추가
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "isOutOfOffice" BOOLEAN NOT NULL DEFAULT false;
