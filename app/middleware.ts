import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("userRole")?.value || "CANDIDATE";
  const url = req.nextUrl.clone();

  const allowedOrigins = [
    "https://job-pilot.vercel.app",
    "https://job-pilot-git-develop-hutamafs-projects.vercel.app",
    "http://localhost:3000",
  ];

  if (allowedOrigins.includes(req.nextUrl.origin)) {
    req.headers.set("Access-Control-Allow-Origin", req.nextUrl.origin);
  } else {
    req.headers.set("Access-Control-Allow-Origin", "https://job-pilot.vercel.app");
  }

  req.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  req.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

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

export const config = {
  matcher: ["/dashboard/:path*"],
};
