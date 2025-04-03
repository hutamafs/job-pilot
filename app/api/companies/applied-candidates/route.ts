import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getServerSession } from "@/app/lib";

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

    return NextResponse.json({ jobApplications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch all job applications" },
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
      { data: jobApplications.job.title },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job Application has been updated", error);
    return NextResponse.json(
      { error: "Failed to update job application" },
      { status: 500 }
    );
  }
}
