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

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Saved candidates fetched successfully",
        data: {
          jobs,
          totalSavedCandidates,
          totalJobs: totalPostedJobs,
          totalPages: Math.ceil(totalPostedJobs / PAGE_SIZE),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to fetch jobs for company",
        error: (error as Error).message,
      }),
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
    const body = await req.json();

    const {
      title,
      jobTags,
      salary,
      jobType,
      education,
      experience,
      expiredAt,
      jobLevel,
      country,
      city,
      benefits,
      requirements,
      description,
    } = body;

    const data = {
      title,
      jobTags,
      salary,
      jobType,
      education,
      experience,
      expiredAt: new Date(expiredAt).toISOString(),
      jobLevel,
      country,
      city,
      benefits,
      requirements,
      description,
      companyId: id,
      desirable: [],
    };

    const job = await prisma.job.create({
      data,
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Job posted successfully",
        data: job,
      }),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to create the job",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();

    const {
      title,
      jobTags,
      salary,
      jobType,
      education,
      experience,
      expiredAt,
      jobLevel,
      country,
      city,
      benefits,
      requirements,
      description,
    } = body;

    const data = {
      title,
      jobTags,
      salary,
      jobType,
      education,
      experience,
      expiredAt: new Date(expiredAt).toISOString(),
      jobLevel,
      country,
      city,
      benefits,
      requirements,
      description,
      desirable: [],
    };

    const job = await prisma.job.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Job updated successfully",
        data: job,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to update the job",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
