-- Add GENERAL to AssetClass enum
ALTER TYPE "AssetClass" ADD VALUE IF NOT EXISTS 'GENERAL';

-- Make asset_catalogs.categoryId NOT NULL (backfill done before this migration)
ALTER TABLE "asset_catalogs" ALTER COLUMN "categoryId" SET NOT NULL;
