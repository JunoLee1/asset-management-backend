-- CreateTable: teams (Team 모델 — init에서 누락됨)
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "departmentId" TEXT NOT NULL,
    "teamLeadId" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_code_key" ON "teams"("code");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_departmentId_fkey"
    FOREIGN KEY ("departmentId") REFERENCES "departments"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_teamLeadId_fkey"
    FOREIGN KEY ("teamLeadId") REFERENCES "users"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey (users.teamId)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "teamId" TEXT;
ALTER TABLE "users" ADD CONSTRAINT "users_teamId_fkey"
    FOREIGN KEY ("teamId") REFERENCES "teams"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
