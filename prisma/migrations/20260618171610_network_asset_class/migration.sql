-- AlterEnum
ALTER TYPE "AssetClass" ADD VALUE 'NETWORK_ASSET';

-- CreateTable
CREATE TABLE "network_assets" (
    "assetId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "macAddress" TEXT,
    "vlan" TEXT,
    "port" TEXT,

    CONSTRAINT "network_assets_pkey" PRIMARY KEY ("assetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "network_assets_macAddress_key" ON "network_assets"("macAddress");

-- CreateIndex
CREATE INDEX "network_assets_ipAddress_idx" ON "network_assets"("ipAddress");

-- AddForeignKey
ALTER TABLE "network_assets" ADD CONSTRAINT "network_assets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

