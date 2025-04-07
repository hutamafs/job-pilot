import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { apiResponse } from "@/app/lib";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;

    const skip = (page - 1) * PAGE_SIZE;

    const candidates = await prisma.candidate.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        savedByCompanies: true,
      },
    });

    const totalCandidates = await prisma.candidate.count();

    return NextResponse.json(
      apiResponse({
        success: true,
        message: `Candidates fetched successfully`,
        data: {
          candidates,
          totalCandidates,
          totalPages: Math.ceil(totalCandidates / PAGE_SIZE),
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to fetch candidates",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
