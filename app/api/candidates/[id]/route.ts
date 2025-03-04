import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "candidate ID is required" },
        { status: 400 }
      );
    }

    const data = await prisma.candidate.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json(
        { error: "candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "candidate ID is required" },
        { status: 400 }
      );
    }
    const candidateData = await req.json();
    delete(candidateData.userId)
    const data = await prisma.candidate.update({
      where: {
        id,
      },
      data: candidateData,
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}
