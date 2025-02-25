import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;

    const skip = (page - 1) * PAGE_SIZE;

    const candidates = await prisma.candidate.findMany({
      skip,
      take: PAGE_SIZE,
    });

    const totalCandidates = await prisma.candidate.count();

    return NextResponse.json({ data: candidates, totalCandidates, totalPages: Math.ceil(totalCandidates / PAGE_SIZE) });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
  }
}
