-- CreateTable
CREATE TABLE "repair_completion_reports" (
    "id" TEXT NOT NULL,
    "maintenanceId" TEXT NOT NULL,
    "summaryText" TEXT NOT NULL,
    "laborHours" DOUBLE PRECISION,
    "technicianName" TEXT,
    "fileUrl" TEXT,
    "submittedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repair_completion_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair_completion_parts" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,

    CONSTRAINT "repair_completion_parts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repair_completion_reports_maintenanceId_key" ON "repair_completion_reports"("maintenanceId");

-- AddForeignKey
ALTER TABLE "repair_completion_reports" ADD CONSTRAINT "repair_completion_reports_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair_completion_reports" ADD CONSTRAINT "repair_completion_reports_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair_completion_parts" ADD CONSTRAINT "repair_completion_parts_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "repair_completion_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
