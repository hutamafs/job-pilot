"use client";
import { StepProps } from "./page";
import uploadFile from "@/app/utils/fileUpload";
import { UploadContainer } from "@/app/components";
import { countryOptions } from "@/app/options";

export default function CompanyInfo({ data, setFormData }: StepProps) {
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await uploadFile(file, name);
    if (res?.status) {
      setFormData((prev) => ({
        ...prev,
        [name]: res.url,
      }));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <UploadContainer
          source={data.logo || ""}
          label="Company Logo"
          handleFileUpload={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileUpload(e, "logo")
          }
        />
        <UploadContainer
          source={data.banner || ""}
          label="Company Banner"
          handleFileUpload={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileUpload(e, "banner")
          }
        />
      </div>

      {/* Company Details */}
      <input
        type="text"
        placeholder="Company Name"
        value={data.name}
        onChange={handleChange}
        name="name"
        className="w-full border p-2 rounded-md"
      />
      <textarea
        placeholder="About Us"
        className="w-full border p-2 rounded-md h-24"
        value={data.description}
        onChange={handleChange}
        name="description"
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-2 rounded-md"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        className="border p-2 rounded-md w-full"
      />
      <select
        className="w-full border p-2 rounded-md"
        name="location"
        value={data.location}
        onChange={handleChange}
      >
        <option disabled value="">
          Select Country
        </option>
        {countryOptions.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border p-2 rounded-md"
        name="phone"
        value={data.phone}
        onChange={handleChange}
      />
    </div>
  );
}
