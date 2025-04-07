import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getServerSession, apiResponse } from "@/app/lib";

const PAGE_SIZE = 21;

async function getCandidate() {
  const session = await getServerSession();
  const candidate = session.user;

  return { candidate };
}

export async function GET(req: Request) {
  try {
    const { candidate } = await getCandidate();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const company = searchParams.get("company") || "";
    const salary = Number(searchParams.get("salary")) || 0;
    const industry = searchParams.getAll("industry") || null;
    const jobType = searchParams.getAll("jobType") || null;

    const skip = (page - 1) * PAGE_SIZE;

    const jobs = await prisma.job.findMany({
      skip,
      take: PAGE_SIZE,
      where: {
        ...(company && {
          company: {
            name: company,
          },
        }),
        ...(industry.length > 0 && {
          company: {
            industry: { in: industry },
          },
        }),
        ...(jobType.length > 0 && { jobType: { in: jobType } }),
        ...(location && {
          country: { contains: location, mode: "insensitive" },
        }),
        ...(salary > 0 && { salary: { gte: salary } }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { company: { name: { contains: search, mode: "insensitive" } } },
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
        ...(company && {
          company: {
            name: company,
          },
        }),
        ...(industry.length > 0 && {
          company: {
            industry: { in: industry },
          },
        }),
        ...(location && {
          country: { contains: location, mode: "insensitive" },
        }),
        jobType: jobType.length > 0 ? { in: jobType } : undefined,
        salary: salary > 0 ? { gte: salary } : undefined,
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { company: { name: { contains: search, mode: "insensitive" } } },
        ],
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Jobs fetched successfully",
        data: {
          jobs,
          totalJobs,
          totalPages: Math.ceil(totalJobs / PAGE_SIZE),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "failed to fetch jobs",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
