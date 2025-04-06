-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "expiredAt" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" TEXT,
ADD COLUMN     "image" TEXT;
