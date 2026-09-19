-- ADR 0002 후속 — Software 수동 카탈로그 등록 audit
-- AuditAction enum 에 SOFTWARE_CREATED 값 1개 추가

ALTER TYPE "AuditAction" ADD VALUE 'SOFTWARE_CREATED';
