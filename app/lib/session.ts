// lib/session.ts
import { SessionOptions } from "iron-session";
import { User } from "@/app/types";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "jobpilot_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
