import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get("authorization")!;
    const id = (await params).id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const candidate = await prisma.candidate.findUnique({
      where: { userId: user?.id },
    });

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
            candidateId: candidate?.id,
          },
        },
        savedJobs: {
          where: {
            candidateId: candidate?.id,
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
