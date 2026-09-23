-- AlterTable
ALTER TABLE "licenses" ADD COLUMN     "coreDepartmentIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
