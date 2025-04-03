import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getServerSession } from "@/app/lib";

async function getCompany() {
  const session = await getServerSession();
  const company = session.user;

  return { company };
}

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { company } = await getCompany();

  const foundCandidate = await prisma.savedCandidate.findFirst({
    where: {
      AND: [{ companyId: company!.id }, { candidateId: id }],
    },
  });

  if (!foundCandidate) {
    await prisma.savedCandidate.create({
      data: {
        companyId: company!.id,
        candidateId: id,
      },
    });

    return NextResponse.json(
      { message: `Candidate has been saved successfully` },
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
  const { company } = await getCompany();

  const foundCandidate = await prisma.savedCandidate.findFirst({
    where: {
      AND: [{ companyId: company!.id }, { candidateId: id }],
    },
  });

  if (foundCandidate) {
    await prisma.savedCandidate.delete({
      where: {
        id: foundCandidate!.id,
      },
    });

    return NextResponse.json(
      { message: `Candidate has been unsaved` },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: "already unsaved" }, { status: 400 });
}
