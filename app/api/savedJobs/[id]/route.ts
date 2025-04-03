import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { apiResponse } from "@/app/lib";

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

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Applied Job fetched successfully",
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
        message: "Failed to fetch favorite jobs for candidate",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
