import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  // Run Clerk's middleware first
  const clerkResponse = await clerkMiddleware()(req, event);
  if (clerkResponse) return clerkResponse;

  // Extract user role from cookies
  const role = req.cookies.get("userRole")?.value || "CANDIDATE";
  const url = req.nextUrl.clone();

  // CORS Handling
  const allowedOrigins = [
    "https://job-pilot.vercel.app",
    "https://job-pilot-git-develop-hutamafs-projects.vercel.app",
    "http://localhost:3000",
  ];

  const origin = req.headers.get("origin") || "";
  if (allowedOrigins.includes(origin)) {
    req.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    req.headers.set(
      "Access-Control-Allow-Origin",
      "https://job-pilot.vercel.app"
    );
  }

  req.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  req.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle Preflight (OPTIONS request)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  // Role-based redirection
  if (role === "EMPLOYER" && url.pathname.startsWith("/dashboard/candidate")) {
    url.pathname = "/dashboard/employer";
    return NextResponse.redirect(url);
  }

  if (role === "CANDIDATE" && url.pathname.startsWith("/dashboard/employer")) {
    url.pathname = "/dashboard/candidate";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Match API routes & all other dynamic routes while ignoring Next.js internals
export const config = {
  matcher: [
    "/:path*",
    "/(api|trpc)(.*)",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
