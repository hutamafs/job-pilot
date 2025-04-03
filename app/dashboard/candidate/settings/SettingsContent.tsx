"use client";
import { useState, useEffect } from "react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaUser, FaGlobe, FaLink } from "react-icons/fa";

import { getCandidateDetails, updateCandidateDetails } from "./query";
import PersonalPage from "./Personal";
import ProfilePage from "./Profile";
import { SettingsProps } from "@/app/types";
import { MutationStatus } from "@/app/components";
import SocialLinks from "./SocialLink";
import { useUser } from "../../DashboardProvider";

const tabs = [
  { id: "personal", label: "Personal", icon: <FaUser /> },
  { id: "profile", label: "Profile", icon: <FaGlobe /> },
  { id: "social", label: "Social Links", icon: <FaLink /> },
];

const SettingsContent = () => {
  const user = useUser() as { id: string } | null;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<Partial<SettingsProps>>({
    profilePicture: "",
    name: "",
    role: "",
    experience: "",
    education: "",
    website: "",
    resumeUrl: "",
    nationality: "",
    dob: new Date().toISOString().split("T")[0],
    gender: "",
    maritalStatus: "",
    bio: "",
    facebook: "",
    linkedin: "",
    phone: "",
    email: "",
  });
  const { data } = useSuspenseQuery({
    queryKey: ["candidateDetails"],
    queryFn: () =>
      user && user.id
        ? getCandidateDetails(user.id)
        : Promise.reject("User ID is missing"),
  });

  const { isIdle, isPending, isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (updatedData: Partial<SettingsProps>) => {
      if (!user || !user.id) throw new Error("User ID is missing");

      const result = await updateCandidateDetails(user.id, updatedData);

      if (result.error) throw new Error(result.error);

      if (!result.error) return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidateDetails"] });
    },
    onError: (error) => {
      console.log("Error updating candidate details:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(formData);
  };

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data.data }));
    }
  }, [data]);

  return (
    <div className="px-0 py-4 md:p-6 max-w-5xl mx-auto">
      {/* Make tabs scrollable on small screens */}
      <div className="flex overflow-x-auto whitespace-nowrap border-b mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      <MutationStatus status={{ isPending, isError, isSuccess, isIdle }} />
      {activeTab === "personal" && (
        <PersonalPage
          data={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
      {activeTab === "profile" && (
        <ProfilePage
          data={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
      {activeTab === "social" && (
        <SocialLinks
          data={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default SettingsContent;
