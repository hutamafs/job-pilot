import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

const PAGE_SIZE = 21;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;

    const skip = (page - 1) * PAGE_SIZE;

    const jobs = await prisma.job.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        company: true,
      },
    });

    const totalJobs = await prisma.job.count();

    return NextResponse.json({ data: jobs, totalJobs, totalPages: Math.ceil(totalJobs / PAGE_SIZE) });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
