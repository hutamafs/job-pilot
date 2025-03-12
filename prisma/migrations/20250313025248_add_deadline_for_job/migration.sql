-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "expiredAt" TIMESTAMP(3) DEFAULT now() + interval '7 days';
