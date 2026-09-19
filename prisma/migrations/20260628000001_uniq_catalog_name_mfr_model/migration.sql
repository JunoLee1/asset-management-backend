-- 카탈로그 중복 등록 방지: (name, manufacturerId, modelCode) functional unique.
-- COALESCE 로 NULL → '' 치환해서 NULL 끼리도 충돌로 인식. (가정: modelCode/manufacturerId 가 의도적인 빈 문자열인 row 는 없음.)
-- 사전조건: 기존 중복이 있으면 이 마이그레이션은 실패. 현재 DB 에서 중복 0건 확인됨 (2026-06-28).

CREATE UNIQUE INDEX "uniq_catalog_name_mfr_model"
  ON "asset_catalogs" (name, COALESCE("manufacturerId", ''), COALESCE("modelCode", ''));
