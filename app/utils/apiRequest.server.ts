import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T }> => {
  const token = (await cookies()).get("sb-access-token")?.value;

  const response = await fetch(`${BASE_URL}/api/${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `sb-access-token=${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`API Error: ${errorMessage}`);
  }

  const { data } = await response.json();
  return { data };
};

export default apiRequest;
