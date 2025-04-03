import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import bcrypt from "bcrypt";
import { apiResponse } from "@/app/lib";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      role,
      bio,
      dob,
      nationality,
      maritalStatus,
      gender,
      experience,
      education,
      linkedin,
      facebook,
      location,
      website,
      phone,
      resumeUrl,
      profilePicture,
      skills,
    } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      user = await prisma.user.create({
        data: {
          email,
          authProvider: "CREDENTIAL",
          password: hashedPassword,
          role,
        },
      });
    } else if (existingUser && existingUser.authProvider === "GOOGLE") {
      user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } else {
      user = existingUser;
    }

    const candidate = await prisma.candidate.create({
      data: {
        userId: user.id,
        name,
        role,
        bio,
        dob: new Date(dob).toISOString(),
        nationality,
        maritalStatus,
        gender,
        experience,
        education,
        linkedin,
        facebook,
        location,
        website,
        phone,
        resumeUrl,
        profilePicture,
        skills,
        email,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Candidate signed up successfully",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          candidateId: candidate.id,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse({
        success: false,
        message: `Failed to sign up candidate`,
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
