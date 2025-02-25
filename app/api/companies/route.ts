import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

const PAGE_SIZE = 21;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams?.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || PAGE_SIZE;

    const skip = (page - 1) * PAGE_SIZE;

    const companies = await prisma.company.findMany({
      skip,
      take: limit,
      include: {
        jobs: true,
      },
    });

    const totalCompanies = await prisma.company.count();

    return NextResponse.json({ data: companies, totalCompanies, totalPages: Math.ceil(totalCompanies / PAGE_SIZE) });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}
