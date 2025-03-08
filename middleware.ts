import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/app/utils/supabase";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const { pathname, origin: urlOrigin } = req.nextUrl;

  // ✅ CORS Allowed Origins
  const allowedOrigins = [
    "https://job-pilot.vercel.app",
    "https://job-pilot-git-develop-hutamafs-projects.vercel.app",
    "https://job-pilot-git-auth-hutamafs-projects.vercel.app",
    "https://job-pilot-git-main-hutamafs-projects.vercel.app",
    "http://localhost:3000",
  ];
  const origin = req.headers.get("origin") || "";
  response.headers.set(
    "Access-Control-Allow-Origin",
    allowedOrigins.includes(origin) ? origin : "https://job-pilot.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // ✅ Handle Preflight Requests (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  // ✅ Extract Token from Cookies
  const token = req.cookies.get("sb-access-token")?.value;

  // ✅ Define Protected & Auth Routes
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/companies",
    "/jobs",
    "/candidates",
  ];
  const authRoutes = ["/sign-in", "/candidate/sign-up"];

  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  // ❌ User is not signed in and trying to access a protected route
  if (!token && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", urlOrigin);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // ✅ User is signed in and trying to access sign-in or sign-up
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", urlOrigin));
  }

  // ✅ Verify Token with Supabase
  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      const signInUrl = new URL("/sign-in", urlOrigin);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(signInUrl);
    }

    // // ✅ Prevent Signed-in Users from Visiting `/sign-in` and `/sign-up`
    // if (isAuthRoute) {
    //   return NextResponse.redirect(
    //     new URL("/dashboard/candidate/overview", req.url)
    //   );
    // }
  }

  return response;
}

// ✅ Apply middleware to relevant paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/companies/:path*",
    "/jobs/:path*",
    "/sign-in",
    "/sign-up",
    "/candidate/sign-up",
  ],
};
