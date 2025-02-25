import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("userRole")?.value || "CANDIDATE";

  const url = req.nextUrl.clone();

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
