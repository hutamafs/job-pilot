'use client'
 
import { createContext, useContext, useState } from 'react'
 
export const UserContext = createContext({})
type UserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";
 
export function UserProvider({
  children,
  initialRole
}: {
  children: React.ReactNode,
  initialRole: UserRole
}) {
  const [role] = useState<UserRole>(initialRole);
  return <UserContext.Provider value={role}>{children}</UserContext.Provider>
}

export function useUserRole() {
  return useContext(UserContext)
}
