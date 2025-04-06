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

    return NextResponse.json({
      data: {
        candidates,
        totalCandidates: totalCandidates,
        totalPages: Math.ceil(totalCandidates / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error("Error fetching saved candidates for company:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved candidates for company" },
      { status: 500 }
    );
  }
}
