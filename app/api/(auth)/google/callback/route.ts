// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { createUserSession } from "@/app/lib";
import { Candidate, Company } from "@/app/types";

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const stateParam = url.searchParams.get("state");
  let role = "candidate";
  let callbackUrl = "/";

  if (stateParam) {
    try {
      const stateObj = JSON.parse(stateParam);
      role = stateObj.role || role;
      callbackUrl = stateObj.callbackUrl || callbackUrl;
    } catch (error) {
      console.error("Failed to parse state parameter:", error);
    }
  }
  // const role = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!code)
    return NextResponse.redirect("/auth/sign-in?error=OAuthCodeMissing");

  // 1. Exchange code for token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });
  const { access_token } = await tokenRes.json();

  // 2. Get user info
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const googleUser = await userRes.json();

  let user = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: googleUser.email,
        authProvider: "GOOGLE",
        image: googleUser.picture,
        password: "",
        role: role === "company" ? "COMPANY" : "CANDIDATE",
      },
    });
    return NextResponse.redirect(
      new URL(
        role === "COMPANY"
          ? `/company/sign-up?email=${encodeURIComponent(googleUser.email)}&image=${encodeURIComponent(googleUser.picture)}`
          : `/candidate/sign-up?email=${encodeURIComponent(googleUser.email)}&name=${encodeURIComponent(googleUser.name)}&image=${encodeURIComponent(googleUser.picture)}`,
        req.url
      )
    );
  } else {
    const expectedRole = role === "COMPANY" ? "COMPANY" : "CANDIDATE";

    if (user.role !== expectedRole) {
      return NextResponse.redirect(
        new URL(
          `/?error=you do not have access as a ${expectedRole}, please re-sign in at ${user.role} portal`,
          req.url
        )
      );
    }
    const userData =
      user.role === "CANDIDATE"
        ? ((await prisma.candidate.findUnique({
            where: { userId: user.id },
          })) as unknown as Candidate)
        : ((await prisma.company.findUnique({
            where: { userId: user.id },
          })) as unknown as Company);
    if (!userData) {
      return NextResponse.redirect(
        new URL(
          user.role === "COMPANY"
            ? `/company/sign-up?email=${encodeURIComponent(googleUser.email)}&image=${encodeURIComponent(googleUser.picture)}`
            : `/candidate/sign-up?email=${encodeURIComponent(googleUser.email)}&name=${encodeURIComponent(googleUser.name)}&image=${encodeURIComponent(googleUser.picture)}`,
          req.url
        )
      );
    }
    const { origin } = req.nextUrl;
    const redirectUrl = new URL(callbackUrl, origin);
    await createUserSession(userData as Candidate | Company, user.role);

    return NextResponse.redirect(redirectUrl);
    // return NextResponse.redirect(
    //   callbackUrl.startsWith("/") ? callbackUrl : `/${callbackUrl}`
    // );
  }
}
