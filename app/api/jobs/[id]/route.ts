import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getUserRole } from "@/app/utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { data: user } = await getUserRole();
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const data = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        applications: {
          where: {
            candidateId: user?.id,
          },
        },
        savedJobs: {
          where: {
            candidateId: user?.id,
          },
        },
      },
    });
    if (!data) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}
