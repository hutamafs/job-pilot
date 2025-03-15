-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "expiredAt" SET DEFAULT now() + interval '7 days';
