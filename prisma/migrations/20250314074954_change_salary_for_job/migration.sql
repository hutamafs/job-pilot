/*
  Warnings:

  - The `salary` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL DEFAULT 1000,
ALTER COLUMN "expiredAt" SET DEFAULT now() + interval '7 days';
