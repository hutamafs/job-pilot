"use client";
import { useState, useEffect } from "react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaUser, FaGlobe, FaCog, FaLink } from "react-icons/fa";

import { getCandidateDetails, updateCandidateDetails } from "./query";
import PersonalPage from "./Personal";
import ProfilePage from "./Profile";
import { SettingsProps } from "@/app/types";
import { MutationStatus } from "@/app/components";
import SocialLinks from "./SocialLink";

const tabs = [
  { id: "personal", label: "Personal", icon: <FaUser /> },
  { id: "profile", label: "Profile", icon: <FaGlobe /> },
  { id: "social", label: "Social Links", icon: <FaLink /> },
  { id: "account", label: "Account Setting", icon: <FaCog /> },
];

const SettingsContent = () => {
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
    queryFn: getCandidateDetails,
  });

  const { isIdle, isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: updateCandidateDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidateDetails"] });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate(formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
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
