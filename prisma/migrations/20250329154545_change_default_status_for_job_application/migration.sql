-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "expiredAt" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "JobApplication" ALTER COLUMN "status" SET DEFAULT 'applied';
