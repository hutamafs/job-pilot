"use client";
import { usePathname } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { StepProps } from "@/app/types";
import uploadFile from "@/app/utils/fileUpload";
import { UploadContainer } from "@/app/components";
import { getCountries } from "@/app/lib";

export default function CompanyInfo({ data, setFormData }: StepProps) {
  const pathname = usePathname();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAndProcessCountries = async () => {
      const countryList = await getCountries();
      const countries = countryList.map((country: { name: string }) => ({
        label: country.name,
        value: country.name,
      }));
      setCountries(countries);
    };
    fetchAndProcessCountries();
  }, []);

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

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmedPassword: false,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };
  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div></div>
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
      <div>
        <label className="block text-md font-medium text-gray-700">
          Company name
        </label>
        <input
          type="text"
          placeholder="Company Name"
          value={data.name}
          onChange={handleChange}
          name="name"
          className="w-full border p-2 rounded-md"
        />
      </div>
      <div>
        <label className="block text-md font-medium text-gray-700">
          Company desription
        </label>
        <textarea
          placeholder="About Us"
          className="w-full border p-2 rounded-md h-24"
          value={data.description}
          onChange={handleChange}
          name="description"
        />
      </div>
      {pathname !== "/dashboard/company/settings" && (
        <>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded-md"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="border p-2 rounded-md w-full pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !showPassword.password,
                }))
              }
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword.confirmedPassword ? "text" : "password"}
              name="confirmedPassword"
              placeholder="Confirm Password"
              value={data.confirmedPassword}
              onChange={handleChange}
              className="border p-2 rounded-md w-full pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmedPassword: !showPassword.confirmedPassword,
                }))
              }
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword.confirmedPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </>
      )}
      <div>
        <label className="block text-md font-medium text-gray-700">
          Country
        </label>
        <select
          className="w-full border p-2 rounded-md"
          name="location"
          value={data.location}
          onChange={handleChange}
        >
          <option disabled value="">
            Select Country
          </option>
          {countries.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-md font-medium text-gray-700">
          Phone number
        </label>
        <input
          type="tel"
          placeholder="Phone Number"
          inputMode="numeric"
          className="w-full border p-2 rounded-md"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
