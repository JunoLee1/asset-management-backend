-- CreateEnum
CREATE TYPE "vendor_type" AS ENUM ('REPAIR', 'SOFTWARE');

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN "type" "vendor_type" NOT NULL DEFAULT 'REPAIR';

-- Update data: REPAIR if supportedClasses is not empty, SOFTWARE if empty
UPDATE "vendors"
SET "type" = CASE
  WHEN "supportedClasses"::text != '{}' THEN 'REPAIR'::vendor_type
  ELSE 'SOFTWARE'::vendor_type
END;

-- Remove default after data is updated
ALTER TABLE "vendors" ALTER COLUMN "type" DROP DEFAULT;
