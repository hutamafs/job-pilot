import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import bcrypt from "bcrypt";

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

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    const candidate = await prisma.candidate.create({
      data: {
        userId: newUser.id,
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
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          candidateId: candidate.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
