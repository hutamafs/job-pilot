"use client";

import { SettingsProps } from "@/app/types";
import { JSX } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

interface SocialLinkItemProps {
  icon: JSX.Element;
  platform: string;
  placeholder: string;
  data: Partial<SettingsProps>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SettingsProps>>>;
}

interface SocialLinkProps {
  data: Partial<SettingsProps>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SettingsProps>>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SocialLinks:React.FC<SocialLinkProps> = ({ data, setFormData, handleSubmit }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Social Links</h2>

      <div className="space-y-4">
        <SocialLinkItem
          icon={<FaFacebook className="text-blue-600" />}
          platform="Facebook"
          placeholder="Profile link/url..."
          data={data}
          setFormData={setFormData}
        />

        <SocialLinkItem
          icon={<FaInstagram className="text-pink-500" />}
          platform="Instagram"
          placeholder="Profile link/url..."
          data={data}
          setFormData={setFormData}
        />

        <SocialLinkItem
          icon={<FaLinkedin className="text-blue-700" />}
          platform="LinkedIn"
          placeholder="Profile link/url..."
          data={data}
          setFormData={setFormData}
        />
      </div>

      <button type="button" onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold">
        Save Changes
      </button>
    </div>
  );
};

export default SocialLinks;


const SocialLinkItem: React.FC<SocialLinkItemProps> = ({ icon, platform, data, setFormData }) => {
  return (
    <div className="flex items-center border rounded-lg p-3 gap-3 w-full bg-gray-100">
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{platform}</span>
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg bg-white"
        value={data[platform.toLowerCase() as keyof SettingsProps] || ""}
        onChange={(e) => setFormData({ ...data, [platform.toLowerCase()]: e.target.value })}
      />
    </div>
  );
};
