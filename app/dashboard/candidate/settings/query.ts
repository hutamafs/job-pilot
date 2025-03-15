import { SettingsProps } from "@/app/types";

export const getCandidateDetails = async (id: string) => {
  try {
    const res = await fetch(`/api/candidates/${id}`);
    const { data } = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { data, success: true };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const updateCandidateDetails = async (
  id: string,
  updatedData: Partial<SettingsProps>
) => {
  try {
    const res = await fetch(`/api/candidates/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
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
