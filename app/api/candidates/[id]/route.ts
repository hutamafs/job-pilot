import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma";

const setCorsHeaders = (res: NextResponse) => {
  res.headers.set(
    "Access-Control-Allow-Origin",
    process.env.NEXT_PUBLIC_BASE_URL || "*"
  );
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return setCorsHeaders(
        NextResponse.json({ error: "Candidate ID is required" }, { status: 400 })
      );
    }

    const data = await prisma.candidate.findUnique({ where: { id } });
    if (!data) {
      return setCorsHeaders(
        NextResponse.json({ error: "Candidate not found" }, { status: 404 })
      );
    }

    return setCorsHeaders(NextResponse.json({ data }));
  } catch (error) {
    console.error(error, "error fetching candidate details");
    return setCorsHeaders(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
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
      return setCorsHeaders(
        NextResponse.json({ error: "Candidate ID is required" }, { status: 400 })
      );
    }

    const body = await req.json();
    delete body.userId;

    const updatedCandidate = await prisma.candidate.update({
      where: { id },
      data: body,
    });

    return setCorsHeaders(NextResponse.json({ data: updatedCandidate }));
  } catch (error) {
    console.error(error, "error updating candidate details");
    return setCorsHeaders(
      NextResponse.json({ error: "Failed to update candidate details" }, { status: 500 })
    );
  }
}
