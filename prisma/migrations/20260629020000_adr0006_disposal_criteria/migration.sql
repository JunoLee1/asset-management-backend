-- ADR 0006: Disposal 신청 시 폐기 판단 기준 체크리스트
-- shape (Json): { lowBookValue: bool, severeDamage: bool, supportEnded: bool, noAlternative: bool }
-- Branch: feat/disposal-criteria-checklist

-- AlterTable
ALTER TABLE "disposals" ADD COLUMN "criteria" JSONB;
