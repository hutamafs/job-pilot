/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "profilePicture",
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "expiredAt" SET DEFAULT now() + interval '7 days';
