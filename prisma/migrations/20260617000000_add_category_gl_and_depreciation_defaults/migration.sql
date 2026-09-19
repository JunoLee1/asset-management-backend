-- AssetCategory: GL 계정과목 + 카테고리별 감가상각 기본값 추가
-- 모두 nullable — 기존 데이터 영향 없음 (자동 매핑은 신규 자산 등록 시점에만 적용)
ALTER TABLE "asset_categories"
  ADD COLUMN "glAccountCode"             TEXT,
  ADD COLUMN "glAccountName"             TEXT,
  ADD COLUMN "defaultDepreciationMethod" "DepreciationMethod",
  ADD COLUMN "defaultUsefulLifeYears"    INTEGER,
  ADD COLUMN "defaultSalvageValueRatio"  DECIMAL(5, 4);
