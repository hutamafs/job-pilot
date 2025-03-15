"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import {
  companyBenefitsOptions,
  countryOptions,
  educationOptions,
  experienceOptions,
  jobLevelOptions,
  jobTypeOptions,
  cityOptions,
  jobRequirementOptions,
} from "@/app/options";
import { useNotif } from "@/app/context/NotificationProvider";
import { jobSchema } from "@/app/utils/validation";
import { LoadingSpinner } from "@/app/components";
import { useAuth } from "@/app/context/AuthProvider";

const customStyles: StylesConfig<{ label: string; value: string }, true> = {
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#E8F0FB",
    color: "0A65CC",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#0A65CC",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#0A65CC",
    ":hover": {
      backgroundColor: "#E8F0FB",
      color: "red",
    },
  }),
};

const JobForm = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const page = pathname.split("/").pop();
  const router = useRouter();
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const { setNotif } = useNotif();
  const [jobName, setJobName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    jobTags: "",
    salary: 0,
    jobType: "",
    education: "",
    experience: "",
    expiredAt: "",
    jobLevel: "",
    country: "",
    city: "",
    benefits: [] as string[],
    requirements: [] as string[],
    description: "",
  });

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/jobs/${page}`);
        const { data } = await res.json();
        setJobName(data.title);
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      } catch {
        setNotif("error", "Failed to fetch job details");
      } finally {
        setIsLoading(false);
      }
    };
    if (page !== "post-job") {
      fetchJobDetail();
    }
  }, [setNotif, page]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? +value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = jobSchema.safeParse(formData);

      if (!result.success) {
        const formattedErrors: Record<string, string> = {};

        result.error.errors.forEach((err) => {
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
          errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
          (errorElement as HTMLElement)?.focus();
        }
        return;
      }
      setIsLoading(true);
      let res;

      if (page === "post-job") {
        res = await fetch(`/api/posted-jobs/${user?.id}`, {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            jobTags: formData.jobTags.split(",").map((tag) => tag.trim()),
          }),
        });
      } else {
        res = await fetch(`/api/posted-jobs/${page}`, {
          method: "PUT",
          body: JSON.stringify({
            ...formData,
          }),
        });
      }
      const { data, message } = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      setNotif("success", message);
      router.push("/dashboard/company/overview");
    } catch (error) {
      setNotif("error", (error as Error).message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 p-4  rounded-lg "
    >
      <h1 className="text-2xl font-bold">
        {page === "post-job" ? "Post a Job" : `Edit job ${jobName}`}
      </h1>
      <div>
        <label className="block text-sm font-semibold">Job Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          placeholder="e.g. Software Engineer"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold">Tags</label>
          <input
            name="jobTags"
            value={formData.jobTags}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="e.g. frontend, remote"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold">Yearly Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold">Expiration Date</label>
          <input
            type="date"
            name="expiredAt"
            value={formData.expiredAt?.split("T")[0]}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          >
            <option value="" disabled>
              Choose your job type
            </option>
            {jobTypeOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
        </div>
        <div className="flex-1">
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="" disabled>
              Choose your country
            </option>
            {countryOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="" disabled>
              Choose your city
            </option>
            {cityOptions[formData.country as keyof typeof cityOptions]?.map(
              ({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>
        </div>
        <div className="flex-1">
          <select
            name="jobLevel"
            value={formData.jobLevel}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="" disabled>
              Choose your job level
            </option>
            {jobLevelOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Benefits</label>
        <Select
          value={formData.benefits?.map((benefit) => ({
            label: benefit,
            value: benefit,
          }))}
          options={companyBenefitsOptions}
          isMulti
          styles={customStyles}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              benefits: e.map((option) => option.value),
            }));
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Requirements</label>
        <Select
          value={formData.requirements?.map((requirement) => ({
            label: requirement,
            value: requirement,
          }))}
          options={jobRequirementOptions}
          isMulti
          styles={customStyles}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              requirements: e.map((option) => option.value),
            }));
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Job Description</label>
        <div className="flex-1">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full h-full border p-2 rounded-md"
            placeholder="Enter job description here..."
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 w-full rounded-md hover:bg-blue-700"
      >
        {page === "post-job" ? "Post Job" : "Update Job"}
      </button>
    </form>
  );
};

export default JobForm;
