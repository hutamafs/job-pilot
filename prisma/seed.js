import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const convertToString = (arr) => {
  return arr.map((item) => ({
    ...item,
    id: String(item.id),
    ...(item.createdAt
      ? { createdAt: new Date(item.createdAt).toISOString() }
      : {}),
    ...(item.companyId ? { companyId: String(item.companyId) } : {}),
    ...(item.candidateId ? { candidateId: String(item.candidateId) } : {}),
    ...(item.jobId ? { jobId: String(item.jobId) } : {}),
    ...(item.experience ? { experience: String(item.experience) } : {}),
    ...(item.salary ? { salary: Number(item.salary) } : {}),
  }));
};

async function main() {
  try {
    // ✅ Load JSON Data (Assuming JSON file is in `/prisma/mockData.json`)
    const jobsData = JSON.parse(fs.readFileSync("prisma/jobs.json", "utf-8"));
    const candidatesData = JSON.parse(
      fs.readFileSync("prisma/candidates.json", "utf-8")
    );
    const companiesData = JSON.parse(
      fs.readFileSync("prisma/companies.json", "utf-8")
    );
    const usersData = JSON.parse(fs.readFileSync("prisma/users.json", "utf-8"));
    const appliedJobsData = JSON.parse(
      fs.readFileSync("prisma/applied_jobs.json", "utf-8")
    );

    console.log("🌱 Seeding database...");
    await prisma.jobApplication.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.job.deleteMany();
    await prisma.company.deleteMany();
    await prisma.user.deleteMany();

    // ✅ Insert Companies First (since Jobs depend on them)
    await prisma.company.createMany({ data: convertToString(companiesData) });

    // ✅ Insert Candidates
    await prisma.candidate.createMany({
      data: convertToString(candidatesData),
    });
    await prisma.job.createMany({ data: convertToString(jobsData) });

    for (const user of usersData) {
      const isCandidate = user.id % 2 === 0; // Even = Candidate, Odd = Company

      await prisma.user.create({
        data: {
          id: String(user.id),
          email: user.email,
          password: user.password,
          role: isCandidate ? "CANDIDATE" : "COMPANY",
          ...(isCandidate
            ? { candidate: { connect: { id: String(user.id) } } } // Connect to Candidate
            : { company: { connect: { id: String(user.id) } } }), // Connect to Company
        },
      });
    }

    // ✅ Insert Jobs
    await prisma.job.createMany({ data: convertToString(jobsData) });
    // await prisma.jobApplication.createMany({
    //   data: convertToString(appliedJobsData),
    // });

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding
main();
