-- AlterTable
ALTER TABLE "departments" ADD COLUMN "locationId" TEXT;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN "locationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "departments_locationId_key" ON "departments"("locationId");

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
