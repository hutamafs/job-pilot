import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getServerSession, apiResponse } from "@/app/lib";

async function getCandidate() {
  const session = await getServerSession();
  const candidate = session.user;

  return { candidate };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { candidate } = await getCandidate();
  const { coverLetter } = await req.json();
  const { id } = await params;

  if (!candidate?.id) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Candidate not found",
        error: "Candidate not found",
      }),
      { status: 404 }
    );
  }

  const foundJob = await prisma.jobApplication.findFirst({
    where: {
      AND: [{ candidateId: candidate.id }, { jobId: id }],
    },
  });

  if (!foundJob) {
    const job = await prisma.jobApplication.create({
      data: {
        candidateId: candidate.id,
        jobId: id,
        coverLetter,
      },
      include: {
        job: true,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: `Job ${job.job.title} applied successfully`,
        data: job,
      }),
      { status: 201 }
    );
  }
  return NextResponse.json(
    apiResponse({
      success: true,
      message: "Job already applied",
      error: "Job already applied",
    }),
    { status: 400 }
  );
}
