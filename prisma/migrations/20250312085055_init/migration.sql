/*
  Warnings:

  - You are about to drop the column `coverLetter` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "coverLetter";

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "coverLetter" TEXT;
