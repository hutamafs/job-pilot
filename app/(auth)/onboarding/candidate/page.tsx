"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface FileProps {
  profilePicture: File | string;
  resumeUrl: File | string;
}

const CandidateOnboarding = () => {
  const { user } = useUser(); // Get Clerk user data

  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    name: "",
    role: "candidate",
    bio: "",
    dob: "",
    nationality: "",
    maritalStatus: "",
    gender: "",
    experience: "",
    education: "",
    linkedin: "",
    facebook: "",
    location: "",
    website: "",
    phone: "",
    resumeUrl: "",
    profilePicture: "",
  });
  const [selectedFile, setSelectedFile] = useState<FileProps>({
    profilePicture: "",
    resumeUrl: "",
  });
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setSelectedFile((prev) => ({ ...prev, [name]: file }));
  }

  useEffect(() => {
    console.log(user, 32);
    console.log(user?.unsafeMetadata?.role);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || "",
        phone: user.primaryPhoneNumber?.phoneNumber || "",
        profilePicture: user?.imageUrl, // Prefill profile image from Clerk
      }));
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/onboarding/candidate", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      alert("Failed to register candidate");
      return;
    }

    alert("Candidate registered successfully!");
    window.location.href = "/dashboard/candidate";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
      <label htmlFor="profile-upload" className="cursor-pointer">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 flex items-center justify-center">
          {selectedFile.profilePicture ? (
            <Image
              src={selectedFile.profilePicture as string}
              width={96}
              height={96}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Upload</span>
          )}
        </div>
      </label>
      <input
        type="file"
        id="profile-upload"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "profilePicture")}
      />
    </div>

          {/* Name */}
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded-md w-full" />

          {/* Email (Disabled) */}
          <input type="email" name="email" placeholder="Email" value={formData.email} disabled className="border p-2 rounded-md w-full bg-gray-200 cursor-not-allowed" />

          {/* Phone */}
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Bio */}
          <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} className="border p-2 rounded-md w-full h-20" />

          {/* Date of Birth */}
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Nationality */}
          <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Gender */}
          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded-md w-full">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Marital Status */}
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="border p-2 rounded-md w-full">
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>

          {/* Experience */}
          <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Education */}
          <input type="text" name="education" placeholder="Education" value={formData.education} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Location */}
          <input type="text" name="location" placeholder="Current Location" value={formData.location} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Website */}
          <input type="text" name="website" placeholder="Personal Website (Optional)" value={formData.website} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Social Links */}
          <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="border p-2 rounded-md w-full" />
          <input type="text" name="facebook" placeholder="Facebook Profile" value={formData.facebook} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Resume Upload */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Upload Resume</label>
            <input type="file" name="resumeUrl" accept="application/pdf" 
            onChange={(e) => handleFileUpload(e, "resumeUrl")} className="mt-1" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Complete Onboarding</button>
        </form>
      </div>
    </div>
  );
};

export default CandidateOnboarding;
