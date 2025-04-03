import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { apiResponse } from "@/app/lib";

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
        apiResponse({
          success: false,
          message: `Candidate not found`,
          error: "Candidate not found",
        }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      apiResponse({
        success: true,
        message: `Candidates fetched successfully`,
        data,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: `Internal Server Error`,
        error: (error as Error).message,
      }),
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
        apiResponse({
          success: false,
          message: "Candidate ID is required",
          error: "Candidate ID is required",
        }),
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

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Candidate updated successfully",
        data: updatedCandidate,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to update candidate details",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
