import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getUser } from "@/app/utils/supabase/getUser";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { coverLetter } = await req.json();
  const { id } = await params;
  const u = await getUser();
  const user = await prisma.user.findUnique({
    where: { id: u?.id },
  });
  const candidate = await prisma.candidate.findUnique({
    where: { userId: user?.id },
  });

  const foundJob = await prisma.jobApplication.findFirst({
    where: {
      AND: [{ candidateId: candidate!.id }, { jobId: id }],
    },
  });

  if (!foundJob) {
    const job = await prisma.jobApplication.create({
      data: {
        candidateId: candidate!.id,
        jobId: id,
        coverLetter,
      },
    });

    return NextResponse.json(
      { message: `Job with id ${job.id} applied to successfully` },
      { status: 201 }
    );
  }
  return NextResponse.json({ message: "already applied" }, { status: 400 });
}
