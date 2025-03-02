import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

const PAGE_SIZE = 10;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || PAGE_SIZE;

    const skip = (page - 1) * PAGE_SIZE;

    const jobs = await prisma.jobApplication.findMany({
      skip,
      take: limit,
      where: {
        candidateId: id
      },
      include: {
        job: {
          include: {
            company: true
          }
        }
      }
    });

    const totalJobs = await prisma.jobApplication.count({
      where: {
        candidateId: id
      }
    });

    return NextResponse.json({ data: jobs, totalJobs, totalPages: Math.ceil(totalJobs / PAGE_SIZE) });
  } catch (error) {
    console.error("Error fetching jobs for candidate:", error);
    return NextResponse.json({ error: "Failed to fetch jobs for candidate" }, { status: 500 });
  }
}
