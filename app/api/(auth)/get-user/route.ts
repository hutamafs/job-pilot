import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(req: Request) {
  const user = await prisma.user.findUnique({
    where: { id: req.headers.get("authorization")! },
  });

  if (!user) {
    return NextResponse.json(
      { message: "you have not logged in or user not found" },
      { status: 404 }
    );
  }
  let userData = null;

  if (user?.role === "CANDIDATE") {
    userData = await prisma.candidate.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        appliedJobs: true,
        savedJobs: true,
      },
    });
  } else {
    userData = await prisma.company.findUnique({
      where: {
        userId: user?.id,
      },
    });
  }

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ data: userData, role: user.role });
}
