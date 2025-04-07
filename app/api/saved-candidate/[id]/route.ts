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
    const candidates = await prisma.savedCandidate.findMany({
      skip,
      take: limit,
      where: {
        companyId: id,
      },
      include: {
        candidate: true,
      },
    });

    const totalCandidates = await prisma.savedCandidate.count({
      where: {
        companyId: id,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Job updated successfully",
        data: {
          candidates,
          totalCandidates: totalCandidates,
          totalPages: Math.ceil(totalCandidates / PAGE_SIZE),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to fetch saved candidates for company",
        error: (error as Error).message,
      }),

      { status: 500 }
    );
  }
}
