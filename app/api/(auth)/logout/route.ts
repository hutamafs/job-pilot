import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData } from "@/app/types";
import { sessionOptions } from "@/app/lib/session";

export async function POST() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.destroy();

  return NextResponse.json({
    message: "Logged out successfully",
  });
}
