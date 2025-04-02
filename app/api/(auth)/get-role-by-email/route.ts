import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email");
  const user = await prisma.user.findUnique({
    where: { email: email! },
  });

  if (!user) {
    return NextResponse.json(
      { message: "you have not logged in or user not found" },
      { status: 404 }
    );
  }

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ data: user.role });
}
