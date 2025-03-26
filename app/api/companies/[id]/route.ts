import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );
    }
    const company = await prisma.user.findUnique({
      where: { id },
    });

    const data = await prisma.company.findUnique({
      where: { userId: company?.id },
    });
    if (!data) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error, "error fetching company details");
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
        { error: "Company ID is required" },
        { status: 400 }
      );
    }

    const company = await prisma.company.findUnique({
      where: { userId: id },
    });

    const body = await req.json();

    const updatedCompany = await prisma.company.update({
      where: { id: company?.id },
      data: body,
    });

    return NextResponse.json({ data: updatedCompany }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
