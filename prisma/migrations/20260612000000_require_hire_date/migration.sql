-- AlterTable: hireDate을 NOT NULL로 변경 (backfill 완료 후 적용)
ALTER TABLE "users" ALTER COLUMN "hireDate" SET NOT NULL;
