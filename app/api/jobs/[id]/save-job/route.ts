import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { prisma } from "@/app/utils/prisma";
import { cookies } from "next/headers";

async function getUserAndJob(token: string | undefined, jobId: string) {
  if (!token) return { error: "Unauthorized", status: 401 };

  const supabaseUser = await supabase.auth.getUser(token);
  if (!supabaseUser.data.user?.id)
    return { error: "User not found", status: 404 };

  const user = await prisma.candidate.findUnique({
    where: { userId: supabaseUser.data.user.id },
  });
  if (!user) return { error: "Candidate profile not found", status: 404 };

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });
  if (!job) return { error: "Job not found", status: 404 };

  return { user, job };
}

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = (await cookies()).get("sb-access-token")?.value;
  const { id } = await params;
  const { user, job } = await getUserAndJob(token, id);

  const foundJob = await prisma.savedJob.findFirst({
    where: {
      AND: [{ candidateId: user!.id }, { jobId: id }],
    },
  });

  if (!foundJob) {
    await prisma.savedJob.create({
      data: {
        candidateId: user!.id,
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
  const token = (await cookies()).get("sb-access-token")?.value;
  const { id } = await params;
  const { user, job } = await getUserAndJob(token, id);

  const foundJob = await prisma.savedJob.findFirst({
    where: {
      AND: [{ candidateId: user!.id }, { jobId: id }],
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
