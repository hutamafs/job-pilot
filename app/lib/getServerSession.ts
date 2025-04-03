"use server";

import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { SessionData } from "@/app/types";
import { cookies } from "next/headers";

const getServerSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  return session;
};

export default getServerSession;
