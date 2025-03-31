import { Company } from "@/app/types";

export const getCompanyDetails = async (id: string) => {
  try {
    const userRes = await fetch(`/api/users/${id}`);
    const { data: user } = await userRes.json();
    const res = await fetch(`/api/companies/${user?.id}`, {
      method: "GET",
    });
    const { data } = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { data, success: true };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const updateCompanyDetails = async (
  id: string,
  updatedData: Partial<Company>
) => {
  const userRes = await fetch(`/api/users/${id}`);
  const { data: user } = await userRes.json();
  const res = await fetch(`/api/companies/${user?.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
  const { data } = await res.json();
  if (!res.ok) throw new Error(data);
  return data;
};
