import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { apiResponse } from "@/app/lib";

const PAGE_SIZE = 21;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams?.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";

    const skip = (page - 1) * PAGE_SIZE;

    const companies = await prisma.company.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        jobs: true,
      },
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { industry: { contains: search, mode: "insensitive" } },
        ],
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
      },
    });

    const totalCompanies = await prisma.company.count({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { industry: { contains: search, mode: "insensitive" } },
        ],
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Companies fetched successfully",
        data: {
          companies,
          totalCompanies,
          totalPages: Math.ceil(totalCompanies / PAGE_SIZE),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to fetch companies",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
