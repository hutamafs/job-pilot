import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const jobs = [
    {
      title: "Machine learning Engineer",
      description: "qwerwrqrqw",
      requirements: [
        "Cybersecurity Knowledge",
        "Git Version Control",
        "Python Programming",
      ],
      desirable: [],
      benefits: [
        "paid_time_off",
        "retirement_plan",
        "gym_membership",
        "tuition_reimbursement",
      ],
      jobType: "full-time",
      jobLevel: "Manager",
      experience: ">5",
      education: "PhD",
      jobTags: ["ai", "remote", "ml"],
      salary: 80000,
      country: "Australia",
      city: "Melbourne",
      companyId: "34ccde90-38ed-420e-a910-8d0b7b482efb",
    },
    {
      title: "Software Engineer",
      description: "qwewqr",
      requirements: [
        "professional_certification",
        "typescript",
        "1_3_years_experience",
      ],
      desirable: [],
      benefits: [
        "health_insurance",
        "flexible_schedule",
        "parental_leave",
        "life_insurance",
      ],
      jobType: "part-time",
      jobLevel: "Manager",
      experience: "3-5 years",
      education: "Master Degree",
      jobTags: ["typescript", "frontend", "remote"],
      salary: 50000,
      country: "Singapore",
      city: "Central Region",
      companyId: "34ccde90-38ed-420e-a910-8d0b7b482efb",
    },
  ];
  // Seed 100 jobs by repeating the above with some variations
  for (let i = 0; i < 50; i++) {
    for (const job of jobs) {
      await prisma.job.create({
        data: {
          ...job,
          title: `${job.title} #${i + 1}`,
        },
      });
    }
  }

  console.log("Seeded 100 jobs!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
