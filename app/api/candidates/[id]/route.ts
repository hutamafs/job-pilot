import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Candidate ID is required" },
        { status: 400 }
      );
    }

    const data = await prisma.candidate.findUnique({
      where: { id },
      include: {
        savedJobs: {
          include: {
            job: true,
          },
        },
        appliedJobs: {
          include: {
            job: true,
          },
        },
      },
    });
    if (!data) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error, "error fetching candidate details");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Candidate ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    delete body.userId;
    delete body.savedJobs;
    delete body.appliedJobs;

    const updatedCandidate = await prisma.candidate.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ data: updatedCandidate });
  } catch (error) {
    console.error(error, "error updating candidate details");
    return NextResponse.json(
      { error: "Failed to update candidate details" },
      { status: 500 }
    );
  }
}
