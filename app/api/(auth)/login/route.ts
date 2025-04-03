import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/utils/prisma";
import { Candidate, Company } from "@/app/types";
import { createUserSession, apiResponse } from "@/app/lib";

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
      apiResponse({
        success: false,
        message: "Invalid credentials",
      }),
      { status: 401 }
    );
  }
  if (user.role !== type) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: `you do not have access to ${type} portal`,
      }),
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
        apiResponse({
          success: false,
          message: "Candidate not found",
        }),
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
        apiResponse({
          success: false,
          message: "Company not found",
        }),
        { status: 404 }
      );
    }
    userData = {
      ...company,
    } as unknown as Company;
  }

  const session = await createUserSession(userData, user.role);

  return NextResponse.json(
    apiResponse({
      success: true,
      message: "Logged in successfully",
      data: session.user,
    }),
    { status: 200 }
  );
}
