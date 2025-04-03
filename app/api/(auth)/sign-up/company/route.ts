import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { supabase } from "@/app/utils/supabase";
import { hashPassword } from "@/app/utils/auth";
import { Prisma } from "@prisma/client";
import { apiResponse } from "@/app/lib";

export async function POST(req: Request) {
  try {
    const {
      name,
      password,
      banner,
      logo,
      founded,
      description,
      benefits,
      industry,
      phone,
      teamSize,
      vision,
      email,
      website,
      location,
      facebook,
      twitter,
      instagram,
      youtube,
      organizationType,
    } = await req.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}?email_confirmed=true&role=COMPANY`,
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
        role: "COMPANY",
        password: hashedPassword,
        authProvider: "CREDENTIAL",
      },
    });

    const compData = {
      userId: user.id,
      name,
      logo,
      banner,
      founded: new Date(founded).toISOString(),
      description,
      benefits,
      industry,
      phone,
      teamSize,
      vision,
      facebook,
      location,
      website,
      email,
      twitter,
      instagram,
      youtube,
      organizationType,
    };

    // Create candidate
    const company = await prisma.company.create({
      data: compData,
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        message: "Company signed up successfully",
        data: {
          user,
          company,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const targetField = error.meta?.target;

        return NextResponse.json(
          apiResponse({
            success: false,
            message: `Failed to create company`,
            error: `The ${targetField} is already in use.`,
          }),
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      apiResponse({
        success: false,
        message: `Failed to sign up company`,
        error: `Failed to sign up company`,
      }),
      { status: 500 }
    );
  }
}
