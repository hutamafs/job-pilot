-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "teamSize" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "expiredAt" SET DEFAULT now() + interval '7 days';
