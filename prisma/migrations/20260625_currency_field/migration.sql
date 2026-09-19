-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('KRW', 'USD', 'EUR', 'GBP', 'JPY');

-- AlterTable: License
ALTER TABLE "licenses" ADD COLUMN "currency" "Currency" NOT NULL DEFAULT 'KRW';

-- AlterTable: Asset
ALTER TABLE "assets" ADD COLUMN "purchaseCurrency" "Currency" NOT NULL DEFAULT 'KRW';
