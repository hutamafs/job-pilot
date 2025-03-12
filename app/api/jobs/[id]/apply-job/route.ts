import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { prisma } from "@/app/utils/prisma";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { coverLetter } = await req.json();
  const token = (await cookies()).get("sb-access-token")?.value;
  const { id } = await params;
  const supabaseUser = await supabase.auth.getUser(token);
  const user = await prisma.candidate.findUnique({
    where: { userId: supabaseUser.data.user?.id },
  });

  const foundJob = await prisma.jobApplication.findFirst({
    where: {
      AND: [{ candidateId: user!.id }, { jobId: id }],
    },
  });

  if (!foundJob) {
    const job = await prisma.jobApplication.create({
      data: {
        candidateId: user!.id,
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
