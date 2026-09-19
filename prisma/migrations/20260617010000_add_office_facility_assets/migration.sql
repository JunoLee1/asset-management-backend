-- OfficeAsset: 사무 자산 전용 상세 (모델명 필수)
CREATE TABLE "office_assets" (
  "assetId"   TEXT NOT NULL,
  "modelName" TEXT NOT NULL,
  CONSTRAINT "office_assets_pkey" PRIMARY KEY ("assetId")
);
ALTER TABLE "office_assets"
  ADD CONSTRAINT "office_assets_assetId_fkey"
  FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- FacilityAsset: 시설 자산 전용 상세 (법정 점검 추적)
CREATE TABLE "facility_assets" (
  "assetId"               TEXT      NOT NULL,
  "installLocationDetail" TEXT      NOT NULL,
  "installDate"           TIMESTAMP NOT NULL,
  "inspectionCycleMonths" INTEGER   NOT NULL,
  "nextInspectionDate"    TIMESTAMP NOT NULL,
  CONSTRAINT "facility_assets_pkey" PRIMARY KEY ("assetId")
);
ALTER TABLE "facility_assets"
  ADD CONSTRAINT "facility_assets_assetId_fkey"
  FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
