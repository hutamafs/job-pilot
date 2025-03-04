"use client";
import { SettingsProps } from "@/app/types";

export const getCandidateDetails = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates/2`
  );
  if (!response.ok) throw new Error("Failed to fetch candidate details");
  const { data } = await response.json();
  return data;
};

export const updateCandidateDetails = async (
  updatedData: Partial<SettingsProps>
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates/2`,
    {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch candidate details");
  const { data } = await response.json();
  return data;
};
