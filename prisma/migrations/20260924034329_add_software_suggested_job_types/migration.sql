-- AlterTable
ALTER TABLE "software" ADD COLUMN     "suggestedJobTypes" "JobType"[] DEFAULT ARRAY[]::"JobType"[];
