import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getServerSession, apiResponse } from "@/app/lib";

async function getCompany() {
  const session = await getServerSession();
  const company = session.user;

  return { company };
}

export async function GET() {
  try {
    const { company } = await getCompany();

    const jobApplications = await prisma.jobApplication.findMany({
      where: {
        job: {
          companyId: company?.id,
        },
      },
      include: {
        job: true,
        candidate: true,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Job applications fetched successfully",
        data: jobApplications,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to fetch all job applications",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    const jobApplications = await prisma.jobApplication.update({
      where: {
        id,
      },
      include: {
        job: true,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Companies fetched successfully",
        data: jobApplications.job.title,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Companies fetched successfully",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
