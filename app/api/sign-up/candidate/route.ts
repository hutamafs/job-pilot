import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { supabase } from "@/app/utils/supabase";
import { hashPassword } from "@/app/utils/auth";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const {
      email,
      name,
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
      password,
    } = await req.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}?email_confirmed=true`,
      },
    });
    const hashedPassword = await hashPassword(password);

    if (error) throw new Error(error.message);
    const supabaseUserId = data.user?.id;

    // Create user
    const user = await prisma.user.create({
      data: {
        id: supabaseUserId,
        email,
        role: "CANDIDATE",
        password: hashedPassword,
      },
    });

    // Create candidate
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

    return NextResponse.json({ user, candidate }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const targetField = error.meta?.target;
        console.error(`Unique constraint failed on field: ${targetField}`);

        return NextResponse.json(
          {
            error: `The ${targetField} is already in use.`,
            field: targetField,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
