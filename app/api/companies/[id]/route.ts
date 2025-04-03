import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { apiResponse } from "@/app/lib";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        apiResponse({
          success: false,
          message: "Company ID is required",
          error: "Company ID is required",
        }),
        { status: 400 }
      );
    }

    const data = await prisma.company.findUnique({
      where: { id },
    });
    if (!data) {
      return NextResponse.json(
        apiResponse({
          success: false,
          message: "Company not found",
          error: "Company not found",
        }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Company not found",
        data,
      }),

      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: "error fetching company details",
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
          message: "Company ID is required",
          error: "Company ID is required",
        }),
        { status: 400 }
      );
    }
    const body = await req.json();

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "company updated successfully",
        data: updatedCompany,
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
