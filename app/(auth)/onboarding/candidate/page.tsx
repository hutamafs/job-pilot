"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { FaFileUpload, FaDownload, FaImage } from "react-icons/fa";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import uploadFile from "@/app/utils/fileUpload";
import { experienceOptions, educationOptions, countryOptions } from "@/app/options";

const CandidateOnboarding = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
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
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const res = await uploadFile(file, name);
      if (res?.status) {
        setFormData((prev) => ({ ...prev, [name]: res.url }));
      } else {
        throw new Error("File upload failed.");
      }
    } catch (error) {
      console.error(error, "File upload failed.");
    } finally {
      setIsLoading(false);
    }
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
    console.log(formData, 84);

    // const res = await fetch("/api/onboarding/candidate", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: { "Content-Type": "application/json" },
    // });

    // if (!res.ok) {
    //   alert("Failed to register candidate");
    //   return;
    // }

    // window.location.href = "/dashboard/candidate";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray400 flex items-center justify-center">
                {
                  isLoading ? (
                    <LoadingSpinner />
                  ) : formData.profilePicture ? (
                    <Image
                      src={typeof formData.profilePicture === "string"
                        ? formData.profilePicture
                        : URL.createObjectURL(formData.profilePicture)}
                      width={120}
                      height={120}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaImage className="text-gray-400 text-4xl mb-2" />
                  )
                }
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
          
          {/* Location */}
          <input type="text" name="location" placeholder="Current Location" value={formData.location} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Website */}
          <input type="text" name="website" placeholder="Personal Website (Optional)" value={formData.website} onChange={handleChange} className="border p-2 rounded-md w-full" />

          {/* Social Links */}
          <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="border p-2 rounded-md w-full" />
          <input type="text" name="facebook" placeholder="Facebook Profile" value={formData.facebook} onChange={handleChange} className="border p-2 rounded-md w-full" />

          <div className="flex justify-center mt-4">
        {/* Resume Upload */}
        <label className="border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer w-full h-[50vh] text-gray-600 hover:border-blue-500 transition relative">
          {
            isLoading ? (
              <LoadingSpinner />
            ) :formData.resumeUrl ? (
              <div className="flex flex-col items-center justify-center w-full">
                {/* ✅ PDF Preview */}
                <iframe
                  src={formData.resumeUrl}
                  className="w-full h-[40vh] rounded-md border mb-2" 
                />
  
                {/* ✅ Filename with Download Button */}
                <div className="flex items-center gap-2">
                  <p className="text-sm text-center break-all max-w-[200px]">
                    {formData.resumeUrl.split("/").pop()}
                  </p>
                  <a
                    href={formData.resumeUrl}
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
            )
          }
          {/* Hidden file input */}
          <input
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, "resumeUrl")}
          />
        </label>
      </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Complete Onboarding</button>
        </form>
      </div>
    </div>
  );
};

export default CandidateOnboarding;
