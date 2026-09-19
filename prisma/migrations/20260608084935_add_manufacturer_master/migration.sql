-- AlterTable
ALTER TABLE "asset_catalogs" ADD COLUMN     "manufacturerId" TEXT;

-- CreateTable
CREATE TABLE "manufacturers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_name_key" ON "manufacturers"("name");

-- CreateIndex
CREATE INDEX "asset_catalogs_manufacturerId_idx" ON "asset_catalogs"("manufacturerId");

-- AddForeignKey
ALTER TABLE "asset_catalogs" ADD CONSTRAINT "asset_catalogs_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ─────────────────────────────────────────────────────────────
-- 시드 INSERT (canonical + aliases) — backlog 별칭 시드 17종
-- ─────────────────────────────────────────────────────────────
INSERT INTO "manufacturers" ("id", "name", "aliases", "isActive", "createdAt", "updatedAt") VALUES
  ('mfg_samsung',   'Samsung',   ARRAY['삼성','삼성전자','SAMSUNG','SEC','Samsung Electronics'], true, NOW(), NOW()),
  ('mfg_lg',        'LG',        ARRAY['엘지','LG전자','LG Electronics'], true, NOW(), NOW()),
  ('mfg_apple',     'Apple',     ARRAY['애플'], true, NOW(), NOW()),
  ('mfg_dell',      'Dell',      ARRAY['델','Dell Technologies'], true, NOW(), NOW()),
  ('mfg_hp',        'HP',        ARRAY['Hewlett-Packard','Hewlett Packard','HP Inc.','에이치피'], true, NOW(), NOW()),
  ('mfg_lenovo',    'Lenovo',    ARRAY['레노버'], true, NOW(), NOW()),
  ('mfg_microsoft', 'Microsoft', ARRAY['마이크로소프트','MS','MSFT'], true, NOW(), NOW()),
  ('mfg_asus',      'ASUS',      ARRAY['에이수스','Asus'], true, NOW(), NOW()),
  ('mfg_acer',      'Acer',      ARRAY['에이서'], true, NOW(), NOW()),
  ('mfg_logitech',  'Logitech',  ARRAY['로지텍'], true, NOW(), NOW()),
  ('mfg_sony',      'Sony',      ARRAY['소니'], true, NOW(), NOW()),
  ('mfg_canon',     'Canon',     ARRAY['캐논'], true, NOW(), NOW()),
  ('mfg_epson',     'Epson',     ARRAY['엡손'], true, NOW(), NOW()),
  ('mfg_adobe',     'Adobe',     ARRAY['어도비'], true, NOW(), NOW()),
  ('mfg_anker',     'Anker',     ARRAY['앵커'], true, NOW(), NOW()),
  ('mfg_atlassian', 'Atlassian', ARRAY['아틀라시안'], true, NOW(), NOW()),
  ('mfg_jetbrains', 'JetBrains', ARRAY['젯브레인즈','JB'], true, NOW(), NOW());

-- ─────────────────────────────────────────────────────────────
-- 백필 1: 기존 asset_catalogs.manufacturer → manufacturerId 매칭
-- 정규화: trim + 연속공백 1칸 + 소문자화 → canonical/aliases case-insensitive 비교
-- ─────────────────────────────────────────────────────────────
UPDATE "asset_catalogs" ac
SET "manufacturerId" = m.id
FROM "manufacturers" m
WHERE ac.manufacturer IS NOT NULL
  AND (
    LOWER(BTRIM(REGEXP_REPLACE(ac.manufacturer, '\s+', ' ', 'g'))) = LOWER(m.name)
    OR EXISTS (
      SELECT 1 FROM unnest(m.aliases) AS a
      WHERE LOWER(a) = LOWER(BTRIM(REGEXP_REPLACE(ac.manufacturer, '\s+', ' ', 'g')))
    )
  );

-- ─────────────────────────────────────────────────────────────
-- 백필 2: 매칭 실패 → 그 값을 canonical 로 자동 등록 + 연결
-- (id 충돌 회피 위해 sha256 hash 사용)
-- ─────────────────────────────────────────────────────────────
INSERT INTO "manufacturers" ("id", "name", "aliases", "isActive", "createdAt", "updatedAt")
SELECT
  'mfg_auto_' || ENCODE(SHA256(ac.manufacturer::BYTEA), 'hex'),
  ac.manufacturer,
  ARRAY[]::TEXT[],
  true,
  NOW(),
  NOW()
FROM "asset_catalogs" ac
WHERE ac.manufacturer IS NOT NULL AND ac."manufacturerId" IS NULL
GROUP BY ac.manufacturer
ON CONFLICT (name) DO NOTHING;

UPDATE "asset_catalogs" ac
SET "manufacturerId" = m.id
FROM "manufacturers" m
WHERE ac.manufacturer IS NOT NULL
  AND ac."manufacturerId" IS NULL
  AND ac.manufacturer = m.name;
