import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const response = NextResponse.next({ request });
  const { pathname, origin: urlOrigin } = request.nextUrl;

  response.headers.set(
    "Access-Control-Allow-Origin",
    `${process.env.NEXT_PUBLIC_BASE_URL}`
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
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  // ✅ Define Protected & Auth Routes
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/companies",
    "/jobs",
    "/candidates",
  ];
  const authRoutes = ["/sign-in", "/candidate/sign-up", "/company/sign-up"];

  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  // User is not signed in and trying to access a protected route
  const { data: user, error } = await supabase.auth.getUser();
  if (!user.user && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", urlOrigin);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // User is signed in and trying to access sign-in or sign-up
  if (user.user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(new URL("/", urlOrigin));
  }

  // Verify Token with Supabase

  if (error || !user.user) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.rewrite(url);
  }
  return response;
}

// Apply middleware to relevant paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/companies/:path*",
    "/jobs/:path*",
    "/sign-in",
  ],
};
