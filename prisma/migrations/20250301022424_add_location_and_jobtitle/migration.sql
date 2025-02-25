/*
  Warnings:

  - Added the required column `location` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "name" TEXT NOT NULL;
