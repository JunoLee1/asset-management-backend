-- AssetStatus enum 확장: 정비 승인됨(작업 시작 전) 상태 추가
-- maintenance APPROVED 시점에 즉시 잠금 + 운영 분석에 반영
ALTER TYPE "AssetStatus" ADD VALUE IF NOT EXISTS 'PENDING_MAINTENANCE' BEFORE 'UNDER_MAINTENANCE';
