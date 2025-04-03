"use server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { SessionData, Company, Candidate } from "@/app/types";

const createUserSession = async (
  userData: Candidate | Company,
  role: "CANDIDATE" | "COMPANY" | "ADMIN"
) => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  session.user = {
    ...userData,
    type: role,
  };
  await session.save();
  return session;
};

export default createUserSession;
