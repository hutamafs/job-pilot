import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

const PAGE_SIZE = 10;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || PAGE_SIZE;

    const skip = (page - 1) * PAGE_SIZE;

    const jobs = await prisma.savedJob.findMany({
      skip,
      take: limit,
      where: {
        candidateId: id,
      },
      include: {
        job: {
          include: {
            company: true,
            applications: true,
          },
        },
      },
    });

    const totalJobs = await prisma.savedJob.count({
      where: {
        candidateId: id,
      },
    });

    return NextResponse.json({
      data: {
        jobs,
        totalJobs,
        totalPages: Math.ceil(totalJobs / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error("Error fetch favorite jobs for candidate:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorite jobs for candidate" },
      { status: 500 }
    );
  }
}
