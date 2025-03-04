"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFileUpload, FaLink, FaEdit, FaDownload } from "react-icons/fa";

import { SettingsProps } from "@/app/types";
import { experienceOptions, educationOptions } from "@/app/options";
interface PersonalPageProps {
  data: Partial<SettingsProps>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SettingsProps>>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface FileProps {
  profilePicture: File | string;
  resumeUrl: File | string;
}

const PersonalPage: React.FC<PersonalPageProps> = ({
  data,
  setFormData,
  handleSubmit,
}) => {
  const [selectedFile, setSelectedFile] = useState<FileProps>({
    profilePicture: "",
    resumeUrl: "",
  });

  useEffect(() => {
    setSelectedFile({
      profilePicture: data.profilePicture || "",
      resumeUrl: data.resumeUrl || "",
    });
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setSelectedFile((prev) => ({ ...prev, [name]: file }));

    // 1️⃣ Get a signed URL from our API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        folder: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { url } = await res.json();

    // 2️⃣ Upload file to S3 using the signed URL
    const uploadRes = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (uploadRes.ok) {
      setFormData((prev) => ({
        ...prev,
        [name]: url.split("?")[0],
      }));
    } else {
      console.error("File upload failed.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* File Upload */}
        {data.profilePicture ? (
          <div className="relative border rounded-lg p-4 flex flex-col items-center justify-center w-full min-h-[300px] md:min-h-[400px]">
            {/* Profile Image */}
            <Image
              src={
                typeof data.profilePicture === "string"
                  ? data.profilePicture
                  : URL.createObjectURL(data.profilePicture)
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full min-h-sceen md:min-h-0 h-full object-cover"
              alt={"profile picture"}
            />

            {/* Edit (Pencil) Icon - Click to Upload */}
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
              onClick={() => document.getElementById("fileInput")?.click()} // Triggers file upload
            >
              <FaEdit size={16} className="text-gray-600" />
            </button>

            {/* Hidden File Input */}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "profilePicture")}
            />
          </div>
        ) : (
          /* Default Upload Box */
          <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
            <label className="cursor-pointer w-full h-32 flex flex-col items-center justify-center border border-dashed rounded-lg text-gray-400">
              <FaFileUpload size={20} />
              <span className="text-sm">Browse photo or drop here</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "profilePicture")}
              />
            </label>
            {selectedFile.profilePicture instanceof File && (
              <p className="mt-2 text-xs">{selectedFile.profilePicture.name}</p>
            )}
          </div>
        )}

        {/* Inputs */}
        <div className="md:col-span-2 space-y-4">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="text"
            name="role"
            value={data.role}
            onChange={handleChange}
            placeholder="Title/headline"
            className="w-full border p-2 rounded-lg"
          />
          <select
            name="experience"
            value={data.experience}
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
          <select
            name="education"
            value={data.education}
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
          <div className="flex items-center border p-2 rounded-lg">
            <FaLink className="text-gray-400 mr-2" />
            <input
              type="text"
              value={data.website}
              name="website"
              onChange={handleChange}
              placeholder="Website URL"
              className="w-full outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Resume Upload Section */}
      <h2 className="text-lg font-semibold mt-6">Your CV/Resume</h2>
      <div className="flex justify-center mt-4">
        {/* Resume Upload */}
        <label className="border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer w-full h-40 text-gray-600 hover:border-blue-500 transition relative">
          {data.resumeUrl ? (
            <div className="flex flex-col items-center w-full">
              {/* ✅ PDF Preview */}
              <iframe
                src={data.resumeUrl}
                className="w-full h-24 rounded-md border mb-2"
              />

              {/* ✅ Filename with Download Button */}
              <div className="flex items-center gap-2">
                <p className="text-sm text-center break-all max-w-[200px]">
                  {data.resumeUrl.split("/").pop()}
                </p>
                <a
                  href={data.resumeUrl}
                  download
                  className="text-gray-500 hover:text-blue-500 transition"
                >
                  <FaDownload size={16} />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaFileUpload className="text-gray-400 text-4xl mb-2" />
              <span className="text-sm">Add CV/Resume (PDF only)</span>
            </div>
          )}
          {/* Hidden file input */}
          <input
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, "resumeUrl")}
          />
        </label>
      </div>
    </div>
  );
};

export default PersonalPage;
