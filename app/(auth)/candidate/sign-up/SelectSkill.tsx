import { useState } from "react";
import { skillOptions } from "@/app/options";
import { Candidate } from "@/app/types";

interface SkillsMultiSelectProps {
  formData: Partial<Candidate> & { skills: string[] };
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<Candidate> & { skills: string[] }>
  >;
}

const SkillsMultiSelect: React.FC<SkillsMultiSelectProps> = ({
  formData,
  setFormData,
}) => {
  const [search, setSearch] = useState("");

  // Filter skills based on search input
  const filteredSkills = skillOptions.filter((skill) =>
    skill.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prev) => {
      // Create a Set to ensure uniqueness and avoid duplicates
      const updatedSkills = new Set([...prev.skills, ...selectedValues]);
      return { ...prev, skills: Array.from(updatedSkills) };
    });
  };

  // Remove a selected skill
  const removeSkill = (skill: string) => {
    const updatedSkills = formData.skills.filter((s) => s !== skill);
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        Select Skills
      </label>

      {/* 🔍 Search Box for Filtering Skills */}
      <input
        type="text"
        placeholder="Search skills..."
        className="w-full border p-2 rounded-md mt-1 focus:ring focus:ring-blue-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 Multi-Select Dropdown */}
      <select
        multiple
        value={formData.skills}
        onChange={handleSelectChange}
        className="w-full mt-2 border p-2 rounded-md bg-white focus:ring focus:border-blue-500"
      >
        {filteredSkills.map((skill) => (
          <option key={skill.value} value={skill.value} className="p-2">
            {skill.label}
          </option>
        ))}
      </select>

      {/* ✅ Selected Skills as Badges */}
      {formData.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 text-white hover:text-gray-300 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsMultiSelect;
