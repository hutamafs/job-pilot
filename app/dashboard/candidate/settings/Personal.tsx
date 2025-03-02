"use client";

import { useState } from "react";
import { FaFileUpload, FaLink, FaEdit, FaTrash } from "react-icons/fa";

const PersonalPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* File Upload */}
        <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
          <label className="cursor-pointer w-full h-32 flex flex-col items-center justify-center border border-dashed rounded-lg text-gray-400">
            <FaFileUpload size={20} />
            <span className="text-sm">Browse photo or drop here</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          {selectedFile && <p className="mt-2 text-xs">{selectedFile.name}</p>}
        </div>

        {/* Inputs */}
        <div className="md:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Title/headline"
            className="w-full border p-2 rounded-lg"
          />
          <select className="w-full border p-2 rounded-lg">
            <option>Select Experience</option>
          </select>
          <select className="w-full border p-2 rounded-lg">
            <option>Select Education</option>
          </select>
          <div className="flex items-center border p-2 rounded-lg">
            <FaLink className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Website URL"
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Save Changes
      </button>

      {/* Resume Upload Section */}
      <h2 className="text-lg font-semibold mt-6">Your CV/Resume</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Resume Cards */}
        {["Professional Resume", "Product Designer"].map((file, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold">{file}</p>
              <p className="text-xs text-gray-500">
                {(Math.random() * 5 + 1).toFixed(1)} MB
              </p>
            </div>
            <div className="relative group">
              <button className="text-gray-500 group-hover:text-blue-600">
                <FaEdit />
              </button>
              <button className="text-gray-500 group-hover:text-red-600 ml-2">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {/* Upload New Resume */}
        <div className="border border-dashed p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer">
          <FaFileUpload size={20} className="text-gray-400" />
          <p className="text-xs text-gray-500">Add CV/Resume</p>
          <input type="file" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
