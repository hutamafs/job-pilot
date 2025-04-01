import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function GET(req: Request) {
  try {
    const id = req.headers.get("authorization")!;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return NextResponse.json({
      data: {
        user,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user detial" },
      { status: 500 }
    );
  }
}
