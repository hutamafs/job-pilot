"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Candidate, Company } from "../types";

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

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/me");
      if (res.ok) {
        const { user, role } = await res.json();
        setUser(user);
        setRole(role);
      } else if (res.status === 401) {
        setUser(null);
        setRole("");
      }

      setIsHydrated(true);
    };

    fetchSession();
  }, []);

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
