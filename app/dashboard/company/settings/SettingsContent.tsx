"use client";
import { useState, useEffect, useRef } from "react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaUser, FaGlobe } from "react-icons/fa";

import { getCompanyDetails, updateCompanyDetails } from "./query";
import { Company } from "@/app/types";
import { MutationStatus } from "@/app/components";
import CompanyInfo from "@/app/components/pages/Companies/CompanyInfo";
import FoundingInfo from "@/app/components/pages/Companies/FoundingInfo";
import { z } from "zod";
import { companyInfoSchema, companyFoundingSchema } from "@/app/utils";
import { useNotif } from "@/app/context/NotificationProvider";
import { useAuth } from "@/app/context/AuthProvider";

const tabs = [
  { id: "companyInfo", label: "Company Info", icon: <FaUser /> },
  { id: "foundingInfo", label: "FoundingInfo", icon: <FaGlobe /> },
  // { id: "social", label: "Social Links", icon: <FaLink /> },
  // { id: "account", label: "Account Setting", icon: <FaCog /> },
];

const Settings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const { setNotif } = useNotif();
  const [activeTab, setActiveTab] = useState("companyInfo");
  const [formData, setFormData] = useState<Partial<Company>>({
    name: "",
    banner: "",
    logo: "",
    founded: new Date(),
    description: "",
    benefits: [],
    industry: "",
    phone: "",
    teamSize: "",
    vision: "",
    website: "",
    location: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    organizationType: "",
  });
  const { data } = useSuspenseQuery({
    queryKey: ["companyDetails"],
    queryFn: () => getCompanyDetails(user?.id ?? ""),
  });

  const { isIdle, isPending, isError, isSuccess, mutate, error } = useMutation({
    mutationFn: (updatedData: Partial<Company>) =>
      updateCompanyDetails(user?.id ?? "", updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyDetails"] });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleError = (errors: z.ZodError) => {
    const formattedErrors: Record<string, string> = {};

    errors.errors.forEach((err: z.ZodIssue) => {
      if (err.path) {
        formattedErrors[err.path[0]] = err.message;
      }
    });

    const firstErrorField = Object.keys(formattedErrors)[0];
    if (firstErrorField) {
      // 💡 Define where each field lives
      const fieldToTabMap: Record<string, string> = {
        name: "companyInfo",
        description: "companyInfo",
        logo: "companyInfo",
        banner: "companyInfo",
        location: "companyInfo",
        phone: "companyInfo",
        organizationType: "foundingInfo",
        industry: "foundingInfo",
        teamSize: "foundingInfo",
        benefits: "foundingInfo",
        founded: "foundingInfo",
        website: "foundingInfo",
        vision: "foundingInfo",
      };

      const tabForField = fieldToTabMap[firstErrorField];
      if (tabForField && tabForField !== activeTab) {
        setActiveTab(tabForField);

        setTimeout(() => {
          const errorElement = formRef.current?.querySelector(
            `[name="${firstErrorField}"]`
          );
          setNotif("error", formattedErrors[firstErrorField]);
          errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
          (errorElement as HTMLElement)?.focus();
        }, 100);
      } else {
        const errorElement = formRef.current?.querySelector(
          `[name="${firstErrorField}"]`
        );
        setNotif("error", formattedErrors[firstErrorField]);
        errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement)?.focus();
      }
    }

    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const combinedSchema = z
        .object({
          ...companyInfoSchema.shape,
          ...companyFoundingSchema.shape,
        })
        .omit({ email: true, password: true });

      const validatedFields = combinedSchema.safeParse(formData);
      if (validatedFields && !validatedFields?.success) {
        handleError(validatedFields.error);
        return;
      }
      mutate(formData);
    } catch (error) {
      console.log("Failed to update company profile:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const fetchedData = data.data;
      setFormData((prev) => ({ ...prev, ...fetchedData }));
    }
  }, [data]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="px-0 py-4 md:p-6 max-w-5xl mx-auto"
    >
      {/* Make tabs scrollable on small screens */}
      <div className="flex overflow-x-auto whitespace-nowrap border-b mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            type="button"
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
      <MutationStatus
        status={{ isPending, isError, isSuccess, isIdle }}
        message={error?.message}
      />
      {activeTab === "companyInfo" && (
        <CompanyInfo data={formData} setFormData={setFormData} />
      )}
      {activeTab === "foundingInfo" && (
        <FoundingInfo data={formData} setFormData={setFormData} />
      )}
      {/* {activeTab === "social" && (
        <SocialMedia
          data={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )} */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Settings;
