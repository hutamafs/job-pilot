import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
const PAGE_SIZE = 21;

export async function GET(req: Request) {
  try {
    const id = req.headers.get("authorization")!;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const company = searchParams.get("company") || "";
    const salary = Number(searchParams.get("salary")) || 0;
    const industry = searchParams.getAll("industry") || null;
    const jobType = searchParams.getAll("jobType") || null;


    const user = await prisma.user.findUnique({
      where: { id },
    });

    const candidate = await prisma.candidate.findUnique({
      where: { userId: user?.id },
    });

    const skip = (page - 1) * PAGE_SIZE;

    const jobs = await prisma.job.findMany({
      skip,
      take: PAGE_SIZE,
      where: {
        ...(company && { companyId: company }),
        ...(industry.length > 0 && {
          company: {
            industry: { in: industry },
          },
        }),
        ...(jobType.length > 0 && { jobType: { in: jobType } }),
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
        ...(salary > 0 && { salary: { gte: salary } }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        company: true,
        savedJobs: {
          where: {
            candidateId: candidate?.id,
          },
        },
      },
    });

    const totalJobs = await prisma.job.count({
      where: {
        ...(company && { companyId: company }),
        ...(industry.length > 0 && {
          company: {
            industry: { in: industry },
          },
        }),
        location: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
        jobType: jobType.length > 0 ? { in: jobType } : undefined,
        salary: salary > 0 ? { gte: salary } : undefined,
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    return NextResponse.json({
      data: jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / PAGE_SIZE),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
