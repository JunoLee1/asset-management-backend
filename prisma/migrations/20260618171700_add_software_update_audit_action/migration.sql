-- ADR 0002 후속 — Software 카탈로그 메타 변경 audit 추가
-- AuditAction enum 에 SOFTWARE_UPDATE 값 1개 추가

ALTER TYPE "AuditAction" ADD VALUE 'SOFTWARE_UPDATE';
