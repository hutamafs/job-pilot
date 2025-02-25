import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const convertToString = (arr) => {
  return arr.map((item) => ({
    ...item,
    id: String(item.id),
    createdAt: new Date(item.createdAt).toISOString(),
    ...(item.companyId ? { companyId: String(item.companyId) } : {}),
  }));
}

async function main() {
  try {
    // ✅ Load JSON Data (Assuming JSON file is in `/prisma/mockData.json`)
    const jobsData = JSON.parse(fs.readFileSync("prisma/jobs.json", "utf-8"));
    const candidatesData = JSON.parse(fs.readFileSync("prisma/candidates.json", "utf-8"));
    const companiesData = JSON.parse(fs.readFileSync("prisma/companies.json", "utf-8"));
    const usersData = JSON.parse(fs.readFileSync("prisma/users.json", "utf-8"));

    console.log("🌱 Seeding database...");
    await prisma.job.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.company.deleteMany();
    await prisma.user.deleteMany();

    // ✅ Insert Companies First (since Jobs depend on them)
    await prisma.company.createMany({ data: convertToString(companiesData) });

    // ✅ Insert Candidates
    await prisma.candidate.createMany({ data: convertToString(candidatesData) });

    for (const user of usersData) {
      const isCandidate = user.id % 2 === 0; // Even = Candidate, Odd = Company
  
      await prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          role: isCandidate ? "CANDIDATE" : "EMPLOYER",
          ...(isCandidate
            ? { candidate: { connect: { id: String(user.id) } } } // Connect to Candidate
            : { company: { connect: { id: String(user.id) } } }), // Connect to Company
        },
      });
    }

    // ✅ Insert Jobs
    await prisma.job.createMany({ data: convertToString(jobsData) });

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding
main();
