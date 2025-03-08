import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔹 Sign in the user with Supabase
    const { data: supabaseData, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status || 400 }
      );
    }

    // ✅ Create Redirect Response
    const response = NextResponse.json({
      message: "Sign in successful",
      user: supabaseData.user,
    });

    // ✅ Set Cookies (for authentication)
    response.cookies.set(
      "sb-access-token",
      supabaseData.session?.access_token || "",
      {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: supabaseData.session?.expires_in, // Token expiration
      }
    );

    response.cookies.set(
      "sb-refresh-token",
      supabaseData.session?.refresh_token || "",
      {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    );
    response.headers.append(
      "Set-Cookie",
      `sb-access-token=${supabaseData.session?.access_token || ""}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${supabaseData.session?.expires_in};sb-refresh-token=${supabaseData.session?.refresh_token || ""};`
    );
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
