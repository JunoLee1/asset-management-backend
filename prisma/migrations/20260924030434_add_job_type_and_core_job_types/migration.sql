-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('DEVELOPER', 'DESIGNER', 'SALES', 'FINANCE', 'HR', 'SECURITY', 'OPERATIONS');

-- AlterTable
ALTER TABLE "licenses" ADD COLUMN     "coreJobTypes" "JobType"[] DEFAULT ARRAY[]::"JobType"[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "jobType" "JobType";
