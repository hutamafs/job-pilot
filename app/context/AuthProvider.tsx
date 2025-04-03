"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Candidate, Company } from "../types";
import { getSupabaseClient } from "@/app/utils/supabase/browserClient";
import { fetchUser } from "../utils/supabase/getUserAfterSignIn";

// Define User Context Type
interface UserContextType {
  user: Candidate | Company | null;
  setUser: (user: Candidate | Company | null) => void;
  role: string;
  setRole: (role: string) => void;
}

// Create Context
const AuthContext = createContext<UserContextType | null>(null);

// ✅ Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Candidate | Company | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [role, setRole] = useState<string>("");
  const supabase = getSupabaseClient();

  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: user } = await fetchUser(data.user.id);
        setUser(user);
        setRole(user?.role);
      }
      setIsHydrated(true);
    };
    restoreSession();
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      {isHydrated ? children : null}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to use Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
