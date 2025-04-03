import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { apiResponse } from "@/app/lib";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get("authorization")! || "";
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        apiResponse({
          success: false,
          message: "Job ID is required",
          error: "Job ID is required",
        }),
        { status: 400 }
      );
    }

    const data = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        applications: {
          where: {
            candidateId: userId,
          },
        },
        savedJobs: {
          where: {
            candidateId: userId,
          },
        },
      },
    });
    if (!data) {
      return NextResponse.json(
        apiResponse({
          success: false,
          message: "Job not found",
          error: "Job not found",
        }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Company fetched successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "Failed to fetch job",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
