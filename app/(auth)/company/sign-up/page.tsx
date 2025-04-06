"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SocialMedia from "./SocialMedia";
import CompanyInfo from "@/app/components/pages/Companies/CompanyInfo";
import FoundingInfo from "@/app/components/pages/Companies/FoundingInfo";
import { Company } from "@/app/types";
import { companyInfoSchema, companyFoundingSchema } from "@/app/utils";
import { useNotif } from "@/app/context/NotificationProvider";
import { LoadingSpinner } from "@/app/components";
const steps = ["Company Info", "Founding Info", "Social Media"];

export default function SignupForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { setNotif } = useNotif();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<
    Partial<Company & { confirmedPassword?: string }>
  >({
    name: "",
    banner: "",
    logo: "",
    founded: new Date().toISOString().split("T")[0],
    description: "",
    benefits: [],
    industry: "",
    phone: "",
    teamSize: "",
    vision: "",
    email: "",
    password: "",
    confirmedPassword: "",
    website: "",
    location: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    jobs: [],
    organizationType: "",
  });
  const [isStepValid, setIsStepValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const validateStep = () => {
        if (currentStep === 0) {
          return companyInfoSchema.safeParse(formData).success;
        } else if (currentStep === 1) {
          return companyFoundingSchema.safeParse(formData).success;
        }
        return true;
      };

      setIsStepValid(validateStep());
    }, 200);

    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/sign-up/company", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setNotif(
        "success",
        "Company created successfully, please check your email inbox to confirm"
      );
      router.push("/sign-in?role=COMPANY");
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (formData.password !== formData.confirmedPassword) {
      setNotif("error", "Passwords do not match");
      return;
    }
    if (currentStep === 2) {
      handleSubmit(e);
    }
    setCurrentStep(currentStep + 1);
    return false;
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all"
            style={{
              width: `${Math.min(((currentStep + 1) / steps.length) * 100, 100)}%`,
            }}
          />
        </div>

        {/* Step Titles */}
        <h2 className="text-xl font-semibold text-center mb-4">
          {steps[currentStep]}
        </h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Step Component */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {currentStep === 0 && (
                <CompanyInfo data={formData} setFormData={setFormData} />
              )}
              {currentStep === 1 && (
                <FoundingInfo data={formData} setFormData={setFormData} />
              )}
              {/* {currentStep === 2 && (
                <ContactInfo data={formData} setFormData={setFormData} />
              )} */}
              {currentStep === 2 && <SocialMedia />}
            </>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!isStepValid || isLoading}
              onClick={(e) => nextStep(e)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Save & Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
