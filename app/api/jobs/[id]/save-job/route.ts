import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getUser } from "@/app/utils/supabase/getUser";

async function getUserAndJob(jobId: string) {
  const u = await getUser();
  const user = await prisma.user.findUnique({
    where: { id: u?.id },
  });
  const candidate = await prisma.candidate.findUnique({
    where: { userId: user?.id },
  });

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  return { candidate, job };
}

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { candidate, job } = await getUserAndJob(id);

  const foundJob = await prisma.savedJob.findFirst({
    where: {
      AND: [{ candidateId: candidate!.id }, { jobId: id }],
    },
  });

  if (!foundJob) {
    await prisma.savedJob.create({
      data: {
        candidateId: candidate!.id,
        jobId: id,
      },
    });

    return NextResponse.json(
      { message: `Job ${job?.title} has been saved successfully` },
      { status: 201 }
    );
  }
  return NextResponse.json({ message: "already saved" }, { status: 400 });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { candidate, job } = await getUserAndJob(id);

  const foundJob = await prisma.savedJob.findFirst({
    where: {
      AND: [{ candidateId: candidate!.id }, { jobId: id }],
    },
  });

  if (foundJob) {
    await prisma.savedJob.delete({
      where: {
        id: foundJob!.id,
      },
    });

    return NextResponse.json(
      { message: `Job ${job?.title} has been unsaved` },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: "already unsaved" }, { status: 400 });
}
