import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { getServerSession, apiResponse } from "@/app/lib";

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
    const candidate = await prisma.savedCandidate.create({
      data: {
        companyId: company!.id,
        candidateId: id,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Candidate has been saved successfully",
        data: candidate,
      }),
      { status: 201 }
    );
  }
  return NextResponse.json(
    apiResponse({
      success: false,
      message: "Candidate already saved",
      error: "Candidate already saved",
    }),
    { status: 400 }
  );
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
      apiResponse({
        success: true,
        message: "Candidate has been unsaved",
        error: "Candidate has been unsaved",
      }),
      { status: 200 }
    );
  }
  return NextResponse.json(
    apiResponse({
      success: false,
      message: "already unsaved",
      error: "already unsaved",
    }),
    { status: 400 }
  );
}
