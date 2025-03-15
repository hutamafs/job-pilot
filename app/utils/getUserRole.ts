"use server";
import { getUser } from "./supabase/getUser";

export const getUserRole = async () => {
  const user = await getUser();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`, {
    headers: {
      Authorization: `${user?.id}`,
    },
  });
  if (!res.ok) {
    return { data: null, role: null };
  }
  const { data, role } = await res.json();
  return { data, role };
};
