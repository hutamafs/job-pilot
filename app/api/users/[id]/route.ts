import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  let data = null;

  if (user?.role === "CANDIDATE") {
    data = await prisma.candidate.findUnique({
      where: {
        userId: user.id,
      },
    });
  } else {
    data = await prisma.company.findUnique({
      where: {
        userId: user?.id,
      },
    });
  }

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ data });
}
