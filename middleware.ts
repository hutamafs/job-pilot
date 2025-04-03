export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { SessionData } from "@/app/types";

async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  return session;
}

export default async function middleware(request: NextRequest) {
  const { user } = await getSession();
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
    "/dashboard/:path*",
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

  if (!user && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", urlOrigin);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // protected route for company

  // Define route access by user type
  const routeAccessMap = {
    COMPANY: ["/dashboard/company", "/candidates"],
    CANDIDATE: ["/dashboard/candidate", "/companies"],
  };

  // Check if user is trying to access a route they don't have permission for
  if (user) {
    const userType = user.type;

    // Get all route patterns the current user shouldn't access
    const forbiddenRoutes = Object.entries(routeAccessMap)
      .filter(([type]) => type !== userType)
      .flatMap(([, routes]) => routes);

    // Check if current path starts with any forbidden route pattern
    const isAccessingForbiddenRoute = forbiddenRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAccessingForbiddenRoute) {
      const redirectUrl = new URL("/", urlOrigin);
      redirectUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // User is signed in and trying to access sign-in or sign-up
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();

    url.pathname = "/";
    return NextResponse.redirect(new URL("/", urlOrigin));
  }

  if (!user) {
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
