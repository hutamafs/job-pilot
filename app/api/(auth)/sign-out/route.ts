import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
  await supabase.auth.signOut();
  const response = new NextResponse(JSON.stringify({ message: "Logged out" }), {
    status: 200,
  });

  response.cookies.set("sb-access-token", "", { maxAge: 0 });
  response.cookies.set("sb-refresh-token", "", { maxAge: 0 });

  return response;
}
