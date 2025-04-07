import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { SessionData } from "@/app/types";
import { apiResponse } from "@/app/lib";

export async function GET(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    apiResponse({
      success: true,
      message: "User detail fetched successfully",
      data: { user: session.user, role: session.user.type },
    }),

    { status: 200 }
  );
}
