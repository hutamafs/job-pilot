"use client";
import React, { createContext, useContext } from "react";
import { SessionData } from "../types";

const UserContext = createContext<SessionData | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

export const UserProvider = ({
  user,
  children,
}: {
  user: SessionData;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
