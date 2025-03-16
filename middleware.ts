import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const response = NextResponse.next({ request });
  const { pathname, origin: urlOrigin } = request.nextUrl;
  // const cookieStore = (await cookies()).getAll();
  // console.log(cookieStore, 9999);

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
  const { data: user, error } = await supabase.auth.getUser();
  if (!user.user && isProtectedRoute) {
    const signInUrl = new URL("/sign-in", urlOrigin);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // User is signed in and trying to access sign-in or sign-up
  if (user.user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", urlOrigin));
  }

  // Verify Token with Supabase

  if (error || !user.user) {
    // const signInUrl = new URL("/sign-in", urlOrigin);
    // signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.rewrite(url);
    // return NextResponse.redirect(signInUrl);
    // return NextResponse.redirect("/sign-in");
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

// import { createServerClient } from "@supabase/ssr";

// const supabase = createServerClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   {
//     cookies: {
//       getAll() {
//         return request.cookies.getAll();
//       },
//       setAll(cookiesToSet) {
//         cookiesToSet.forEach(({ name, value }) =>
//           request.cookies.set(name, value)
//         );
//         response = NextResponse.next({
//           request,
//         });
//         cookiesToSet.forEach(({ name, value, options }) =>
//           response.cookies.set(name, value, options)
//         );
//       },
//     },
//   }
// );
