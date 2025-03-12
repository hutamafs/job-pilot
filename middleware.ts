import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { pathname, origin: urlOrigin } = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ✅ CORS Allowed Origins
  const allowedOrigins = [
    "https://job-pilot.vercel.app",
    "https://job-pilot-git-develop-hutamafs-projects.vercel.app",
    "https://job-pilot-git-auth-hutamafs-projects.vercel.app",
    "https://job-pilot-git-main-hutamafs-projects.vercel.app",
    "http://localhost:3000",
  ];
  const origin = request.headers.get("origin") || "";
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
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  // ✅ Extract Token from Cookies
  const token = request.cookies.get("sb-access-token")?.value;

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

  // User is not signed in and trying to access a protected route
  if (!token && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", urlOrigin);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // User is signed in and trying to access sign-in or sign-up
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", urlOrigin));
  }

  // Verify Token with Supabase
  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      const signInUrl = new URL("/sign-in", urlOrigin);
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
      return NextResponse.redirect(signInUrl);
    }
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
