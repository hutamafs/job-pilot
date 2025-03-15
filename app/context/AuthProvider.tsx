// "use client";

// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";
// import { Candidate, Company } from "../types";

// // Define User Context Type
// interface UserContextType {
//   user: Candidate | Company | null;
//   loading: boolean;
//   fetchUser: () => Promise<void>;
//   signOut: () => Promise<void>;
//   role: string;
// }

// // Create Context
// const AuthContext = createContext<UserContextType | null>(null);

// // ✅ Provider Component
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<Candidate | Company | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const [role, setRole] = useState<string>("CANDIDATE");
//   // Fetch User on Load
//   const fetchUser = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/get-user", {
//         method: "GET",
//         credentials: "include",
//       });

//       const { data, role } = await res.json();
//       if (res.ok) {
//         setUser(data);
//         setRole(role);
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.log("Error fetching user:", (error as Error).message);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sign Out Function
//   const signOut = async () => {
//     await fetch("/api/sign-out", {
//       method: "GET",
//       credentials: "include",
//     });
//     setUser(null);
//     router.push("/sign-in");
//   };

//   useEffect(() => {
//     fetchUser(); // Fetch user on load
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, fetchUser, signOut, role }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom Hook to use Auth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
