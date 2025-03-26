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
    const jobs = await prisma.job.findMany({
      skip,
      take: limit,
      where: {
        companyId: id,
      },
      include: {
        applications: true,
      },
    });

    const totalPostedJobs = await prisma.job.count({
      where: {
        companyId: id,
      },
    });

    const totalSavedCandidates = await prisma.savedCandidate.count({
      where: {
        companyId: id,
      },
    });

    return NextResponse.json({
      data: {
        jobs,
        totalSavedCandidates,
        totalJobs: totalPostedJobs,
        totalPages: Math.ceil(totalPostedJobs / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error("Error fetching jobs for company:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs for company" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const company = await prisma.company.findUnique({
      where: {
        userId: id,
      },
    });

    const body = await req.json();

    const {
      title,
      tags,
      salary,
      jobType,
      education,
      experience,
      expirationDate,
      jobLevel,
      country,
      city,
      benefits,
      requirements,
      description,
    } = body;

    const data = {
      title,
      jobTags: tags
        .trim()
        .split(",")
        .map((tag: string) => tag.trim()),
      salary,
      jobType,
      education,
      experience,
      expiredAt: new Date(expirationDate).toISOString(),
      jobLevel,
      country,
      city,
      benefits,
      requirements,
      description,
      companyId: company!.id,
      desirable: [],
    };

    const job = await prisma.job.create({
      data,
    });

    return NextResponse.json(
      {
        message: "Job posted successfully",
        data: job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error posting job:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to create the job" },
      { status: 500 }
    );
  }
}
