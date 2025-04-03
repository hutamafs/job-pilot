// app/utils/getSessionUser.ts
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { SessionData } from "@/app/types";

export async function getSessionUser(): Promise<SessionData["user"] | null> {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  return session.user || null;
}
