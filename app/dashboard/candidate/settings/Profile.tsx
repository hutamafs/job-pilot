"use client";

import { SettingsProps } from "@/app/types";
import { countryOptions } from "@/app/options";

interface ProfileTabProps {
  data: Partial<SettingsProps>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SettingsProps>>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileForm: React.FC<ProfileTabProps> = ({  data, setFormData, handleSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nationality */}
      <div>
        <label className="block text-sm font-medium">Nationality</label>
        <select name="nationality" value={data.nationality} onChange={handleChange} className="w-full border p-2 rounded-md">
        <option value="" disabled>
              Choose your nationality
            </option>
          {countryOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input type="date" name="dob" value={data.dob?.split("T")[0] || ""} onChange={handleChange} className="w-full border p-2 rounded-md" />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select name="gender" value={data.gender} onChange={handleChange} className="w-full border p-2 rounded-md">
        <option value="" disabled>
              Choose your gender
            </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Marital Status */}
      <div>
        <label className="block text-sm font-medium">Marital Status</label>
        <select name="maritalStatus" value={data.maritalStatus} onChange={handleChange} className="w-full border p-2 rounded-md">
          <option value="" disabled>
              Choose your marital status
            </option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>

      {/* Biography (WYSIWYG to be added later) */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium">Biography</label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded-md h-32"
          placeholder="Write down your biography here..."
        />
      </div>

      {/* Save Changes Button */}
      <div className="md:col-span-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
