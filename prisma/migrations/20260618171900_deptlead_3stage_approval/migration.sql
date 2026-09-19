-- ADR 0003 — 부서장(DEPT_LEAD) role 신설 + 3단계 결재 흐름

-- 1) Role enum 에 DEPT_LEAD 추가
ALTER TYPE "Role" ADD VALUE 'DEPT_LEAD';

-- 2) LoanStatus enum 에 PENDING_DEPT 추가 (PENDING_MANAGER 다음 단계)
ALTER TYPE "LoanStatus" ADD VALUE 'PENDING_DEPT' AFTER 'PENDING_MANAGER';

-- 3) departments.leaderId 컬럼 + FK (nullable: 부서장 미배정 가능)
ALTER TABLE "departments" ADD COLUMN "leaderId" TEXT;
ALTER TABLE "departments"
  ADD CONSTRAINT "departments_leaderId_fkey"
  FOREIGN KEY ("leaderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
