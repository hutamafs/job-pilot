"use client";
import { IoIosLink } from "react-icons/io";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ShareJob = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const currentUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-4 border-t">
      <h3 className="text-lg font-semibold mb-2 text-black">Share this job:</h3>
      <div className="flex space-x-4 items-center">
        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center font-semibold text-primary500 bg-gray-100 px-3 py-2 rounded-md"
        >
          <IoIosLink className="mr-2" />
          {copied ? "Copied!" : "Copy Link"}
        </button>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-blue-600 text-xl hover:opacity-80 transition cursor-pointer" />
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=Check out this job!&body=Hey, check out this job I found: ${encodeURIComponent(currentUrl)}`}
          className="text-gray-500"
        >
          <FaEnvelope className="text-xl hover:opacity-80 transition cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default ShareJob;
