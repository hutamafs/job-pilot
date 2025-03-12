// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import { prisma } from "@/app/utils/prisma";
// import type { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   // Create a Supabase client using SSR, passing in the request cookies.
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: request.cookies }
//   );

//   // Extract tokens from the request cookies.
//   const token = request.cookies.get("sb-access-token")?.value;
//   const refreshToken = request.cookies.get("sb-refresh-token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Retrieve the user based on the current token.
//   const { data: userData, error } = await supabase.auth.getUser(token);

//   // If the token is invalid/expired, attempt to refresh it using the refresh token.
//   if (error || !userData?.user) {
//     if (refreshToken) {
//       const { data: refreshData, error: refreshError } =
//         await supabase.auth.refreshSession({ refresh_token: refreshToken });

//       if (refreshError || !refreshData?.session) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//       }

//       // Update the token with the refreshed access token.
//       const newToken = refreshData.session.access_token;

//       // Create a response to update cookies with the refreshed tokens.
//       const response = NextResponse.next();
//       response.cookies.set("sb-access-token", newToken, {
//         path: "/",
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         maxAge: refreshData.session.expires_in,
//       });
//       response.cookies.set(
//         "sb-refresh-token",
//         refreshData.session.refresh_token,
//         {
//           path: "/",
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "lax",
//           maxAge: 60 * 60 * 24 * 7, // 7 days
//         }
//       );

//       // Return early; the client should re-request user details with the new token.
//       return response;
//     }
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Fetch full user details from your database.
//   const user = await prisma.user.findUnique({
//     where: { id: userData.user.id },
//   });

//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   // If the user has a "CANDIDATE" role, fetch additional candidate details.
//   let candidate = null;
//   if (user.role === "CANDIDATE") {
//     candidate = await prisma.candidate.findUnique({
//       where: { userId: user.id },
//       include: {
//         appliedJobs: true,
//         savedJobs: true,
//       },
//     });
//   }

//   // Return the candidate data (if available) along with the user's role.
//   return NextResponse.json({ data: candidate, role: user.role });
// }

import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { prisma } from "@/app/utils/prisma";
import { cookies } from "next/headers";

export async function GET() {
  let token = (await cookies()).get("sb-access-token")?.value;
  const refreshToken = (await cookies()).get("sb-refresh-token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
        savedJobs: true,
      },
    });
  }

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ data: candidate, role: user.role });
}
