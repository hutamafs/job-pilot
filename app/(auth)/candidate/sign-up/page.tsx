"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fileUpload, candidateSchema } from "@/app/utils";
import {
  experienceOptions,
  educationOptions,
  countryOptions,
} from "@/app/options";
import { LoadingSpinner } from "@/app/components";
import ResumeUpload from "@/app/components/common/ResumeUpload";
import ProfileUpload from "@/app/components/common/ProfilePictureUploadComponent";
import SelectSkill from "./SelectSkill";
import { Candidate } from "@/app/types";
import { useNotif } from "@/app/context/NotificationProvider";

const CandidateSignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setNotif } = useNotif();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Candidate>>({
    email: "",
    name: "",
    password: "",
    role: "",
    bio: "",
    dob: null,
    nationality: "",
    maritalStatus: "",
    gender: "",
    experience: "",
    education: "",
    linkedin: "",
    facebook: "",
    website: "",
    phone: "",
    resumeUrl: "",
    profilePicture: "",
    skills: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      const res = await fileUpload(file, name);
      if (res?.status) {
        setFormData((prev) => ({ ...prev, [name]: res.url }));
      } else {
        setNotif("error", "File upload failed.");
      }
    } catch (error) {
      console.error(error, "File upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = candidateSchema.safeParse(formData);

      if (!result.success) {
        const formattedErrors: Record<string, string> = {};

        result.error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
        const firstErrorField = Object.keys(formattedErrors)[0];
        if (firstErrorField) {
          const errorElement = formRef.current?.querySelector(
            `[name="${firstErrorField}"]`
          );
          setNotif("error", formattedErrors[firstErrorField]);
          errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
          (errorElement as HTMLElement)?.focus();
        }
        return;
      }
      setIsPageLoading(true);

      const res = await fetch("/api/sign-up/candidate", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          userRole: "CANDIDATE",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) {
        setNotif("error", data.error);
      }
      setNotif(
        "success",
        "Sign up successful. Please check and verify your email first"
      );
      router.push("/sign-in");
    } catch (error) {
      setNotif("error", (error as Error).message);
      console.error(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  return isPageLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Sign up as a candidate
        </h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Profile Picture */}
          <ProfileUpload
            isLoading={isLoading}
            formData={
              formData as Partial<Candidate> & { profilePicture: string | File }
            }
            handleFileUpload={handleFileUpload}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border h-10 p-2 rounded-md w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          {/* Password */}
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          {/* Role */}
          <input
            type="text"
            name="role"
            placeholder="Job Title"
            value={formData.role}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full"
          />
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Brief explanation about yourself"
            value={formData.bio}
            onChange={handleChange}
            className="border p-2 rounded-md w-full h-20"
          />

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob?.toString() ?? ""}
              placeholder="Date of Birth"
              onChange={handleChange}
              className="border p-2 rounded-md w-full bg-transparent"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}

          {/* Marital Status */}
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>

          {/* Experience */}
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="" disabled>
              Choose your experience
            </option>
            {experienceOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}

          {/* Education */}
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="" disabled>
              Choose your education
            </option>
            {educationOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.education && (
            <p className="text-red-500 text-sm mt-1">{errors.education}</p>
          )}

          {/* nationality */}
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="" disabled>
              Choose your nationality
            </option>
            {countryOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.nationality && (
            <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
          )}

          {/* Website */}
          <input
            type="text"
            name="website"
            placeholder="Personal Website (Optional)"
            value={formData.website}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          {/* Social Links */}
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Profile (Optional)"
            value={formData.linkedin}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            name="facebook"
            placeholder="Facebook Profile (Optional)"
            value={formData.facebook}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />

          <div className="flex justify-center mt-4">
            {/* Resume Upload */}
            <ResumeUpload
              isLoading={isLoading}
              formData={formData}
              handleFileUpload={handleFileUpload}
            />
          </div>
          {errors.resumeUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.resumeUrl}</p>
          )}

          <SelectSkill
            formData={formData as Partial<Candidate> & { skills: string[] }}
            setFormData={
              setFormData as React.Dispatch<
                React.SetStateAction<Partial<Candidate> & { skills: string[] }>
              >
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateSignUp;
