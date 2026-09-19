-- ADR 0003 — 대여 2차 승인(부서장) 컬럼 추가
ALTER TABLE "loans" ADD COLUMN "deptApprovedAt" TIMESTAMP(3);
ALTER TABLE "loans" ADD COLUMN "deptApprovedById" TEXT;

ALTER TABLE "loans"
  ADD CONSTRAINT "loans_deptApprovedById_fkey"
  FOREIGN KEY ("deptApprovedById") REFERENCES "users"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
