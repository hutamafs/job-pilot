"use client";

import { useState } from "react";
import { FaUser, FaGlobe, FaCog, FaLink } from "react-icons/fa";
import PersonalPage from "./Personal";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap border-b mb-6">
        {[
          { id: "personal", label: "Personal", icon: <FaUser /> },
          { id: "profile", label: "Profile", icon: <FaGlobe /> },
          { id: "social", label: "Social Links", icon: <FaLink /> },
          { id: "account", label: "Account Setting", icon: <FaCog /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold ${
              activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Personal Information */}
      {activeTab === "personal" && <PersonalPage />}

      {/* Profile Section */}
      {activeTab === "profile" && (
        <div>
          <h2 className="text-lg font-semibold">Profile Section</h2>
          <p className="text-gray-500">Profile settings content...</p>
        </div>
      )}

      {/* Social Links Section */}
      {activeTab === "social" && (
        <div>
          <h2 className="text-lg font-semibold">Social Links</h2>
          <p className="text-gray-500">Social links settings content...</p>
        </div>
      )}

      {/* Account Settings Section */}
      {activeTab === "account" && (
        <div>
          <h2 className="text-lg font-semibold">Account Settings</h2>
          <p className="text-gray-500">Account settings content...</p>
        </div>
      )}
    </div>
  );
};

export default Settings;