"use client";
import Select from "react-select";

import { StepProps } from "@/app/types";
import {
  industries,
  teamSizeOptions,
  companyBenefitsOptions,
  organizationTypeOptions,
} from "@/app/options";

export default function FoundingInfo({ data, setFormData }: StepProps) {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-md font-medium text-gray-700">
            Organization Type
          </label>
          <select
            className="w-full border p-2 rounded-md"
            name="organizationType"
            onChange={handleChange}
            value={data.organizationType}
          >
            <option disabled value="">
              Select Organization Type
            </option>
            {organizationTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Industry type
          </label>
          <select
            className="w-full border p-2 rounded-md"
            name="industry"
            onChange={handleChange}
            value={data.industry}
          >
            <option disabled value="">
              Select Industry
            </option>
            {industries.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Company Size
          </label>
          <select
            className="w-full border p-2 rounded-md"
            name="teamSize"
            onChange={handleChange}
            value={data.teamSize}
          >
            <option disabled value="">
              Select Team Size
            </option>
            {teamSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 md:col-span-3">
          <label className="block text-md font-medium text-gray-700">
            Benefits
          </label>
          <Select
            options={companyBenefitsOptions}
            isMulti
            value={data?.benefits?.map((benefit) => ({
              label: benefit.split("_").join(" "),
              value: benefit,
            }))}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                benefits: e.map((option) => option.value),
              }));
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-md font-medium text-gray-700">
          Founded
        </label>
        <input
          type="date"
          placeholder="Founding Date"
          className="w-full border p-2 rounded-md"
          name="founded"
          value={data.founded}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-md font-medium text-gray-700">
          Company Website
        </label>
        <input
          type="string"
          placeholder="Company Website"
          className="w-full border p-2 rounded-md"
          name="website"
          value={data.website}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-md font-medium text-gray-700">
          Company Vision
        </label>
        <textarea
          placeholder="Company Vision"
          className="w-full border p-2 rounded-md h-48"
          name="vision"
          value={data.vision}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
