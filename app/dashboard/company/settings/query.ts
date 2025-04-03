import { Company } from "@/app/types";

export const getCompanyDetails = async (id: string) => {
  try {
    const res = await fetch(`/api/companies/${id}`, {
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
  const res = await fetch(`/api/companies/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
  const { data } = await res.json();
  if (!res.ok) throw new Error(data);
  return data;
};
