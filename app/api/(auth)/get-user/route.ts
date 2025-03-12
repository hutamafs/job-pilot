import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { prisma } from "@/app/utils/prisma";
import { cookies } from "next/headers";

export async function GET() {
  let token = (await cookies()).get("sb-access-token")?.value;
  const refreshToken = (await cookies()).get("sb-refresh-token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorizedd" }, { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    if (refreshToken) {
      // ✅ Try Refreshing the Token if Expired
      const { data: refreshData, error: refreshError } =
        await supabase.auth.refreshSession({ refresh_token: refreshToken });

      if (refreshError || !refreshData.session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // ✅ Update token with refreshed token
      token = refreshData.session.access_token;

      // ✅ Set new tokens in cookies
      const response = NextResponse.next();
      response.cookies.set("sb-access-token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: refreshData.session.expires_in, // Token expiration
      });
      response.cookies.set(
        "sb-refresh-token",
        refreshData.session.refresh_token,
        {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }
      );

      return response;
    }

    return NextResponse.json({ message: "Unauthorizeddd" }, { status: 401 });
  }

  // Fetch full user details
  const user = await prisma.user.findUnique({
    where: { id: data.user.id },
  });
  let candidate = null;

  if (user?.role === "CANDIDATE") {
    candidate = await prisma.candidate.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        appliedJobs: true,
        favoriteJobs: true,
        savedJobs: true,
      },
    });
  }

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ data: candidate, role: user.role });
}
