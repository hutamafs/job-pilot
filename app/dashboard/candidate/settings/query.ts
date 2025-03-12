import { SettingsProps } from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T }> => {
  const response = await fetch(`${BASE_URL}api${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`API Error: ${errorMessage}`);
  }

  const { data } = await response.json();
  return { data };
};

export const getCandidateDetails = async (id: string) => {
  const { data } = await apiRequest<SettingsProps>(`/candidates/${id}`);
  return data;
};

export const updateCandidateDetails = async (
  id: string,
  updatedData: Partial<SettingsProps>
) => {
  const { data } = await apiRequest<SettingsProps>(`/candidates/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
  return data;
};
