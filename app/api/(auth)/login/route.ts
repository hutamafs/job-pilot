import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { prisma } from "@/app/utils/prisma";
import { sessionOptions } from "@/app/lib/session";
import { SessionData, Company, Candidate } from "@/app/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, type } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  if (user.role !== type) {
    return NextResponse.json(
      { message: `you do not have access to ${type} portal` },
      { status: 401 }
    );
  }
  let userData = {} as Candidate | Company;

  if (user.role === "CANDIDATE") {
    const candidate = await prisma.candidate.findUnique({
      where: { userId: user.id },
    });
    if (!candidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }
    userData = {
      ...candidate,
    } as unknown as Candidate;
  } else if (user.role === "COMPANY") {
    const company = await prisma.company.findUnique({
      where: { userId: user.id },
    });
    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }
    userData = {
      ...company,
    } as Company;
  }

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  session.user = {
    ...userData,
    type: user.role,
  };
  await session.save();

  return NextResponse.json({
    message: "Logged in successfully",
    user: session.user,
  });
}
