"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyInfo, FoundingInfo, SocialMedia } from "./index";
import { Company } from "@/app/types";
import { companyInfoSchema, companyFoundingSchema } from "@/app/utils";
import { useNotif } from "@/app/context/NotificationProvider";
import { z } from "zod";
import { LoadingSpinner } from "@/app/components";
const steps = ["Company Info", "Founding Info", "Social Media"];

export interface StepProps {
  data: Partial<Company>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Company>>>;
}

export default function SignupForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { setNotif } = useNotif();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
    email: "",
    password: "",
    website: "",
    location: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    jobs: [],
    organizationType: "",
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
      const errorElement = formRef.current?.querySelector(
        `[name="${firstErrorField}"]`
      );
      setNotif("error", formattedErrors[firstErrorField]);
      errorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      (errorElement as HTMLElement)?.focus();
    }
    return;
  };

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
    let validatedFields;
    if (currentStep < steps.length) {
      if (currentStep === 0) {
        validatedFields = companyInfoSchema.safeParse(formData);
      } else if (currentStep === 1) {
        validatedFields = companyFoundingSchema.safeParse(formData);
      } else if (currentStep === 2) {
        handleSubmit(e);
      }
      if (validatedFields && !validatedFields?.success) {
        handleError(validatedFields.error);
        return;
      }
      console.log("✅ Validation passed, moving to step:", currentStep + 1);
    }
    setCurrentStep(currentStep + 1);
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
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
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
              onClick={(e) => nextStep(e)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Save & Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
