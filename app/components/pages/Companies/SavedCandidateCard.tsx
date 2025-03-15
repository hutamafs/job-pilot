"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  FaEllipsisV,
  FaEnvelope,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
// import LoadingSpinner from "../../LoadingSpinner";
import { useNotif } from "@/app/context/NotificationProvider";
import { unsaveCandidate } from "@/app/utils/candidates/query";

interface CandidateCardProps {
  c: {
    id: string;
    name: string;
    role: string;
    profilePicture: string;
    resumeUrl: string;
    email: string;
  };
}

const SavedCandidateCard = ({ c }: CandidateCardProps) => {
  const { setNotif } = useNotif();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveCandidate = async () => {
    try {
      // setIsLoading(true);
      await unsaveCandidate(c.id);
      setNotif("success", "candidate has successfully been unsaved");
      router.refresh();
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Image
          src={c.profilePicture}
          alt={c.name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm md:text-base">{c.name}</h3>
          <p className="text-gray-500 text-sm">{c.role}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-between gap-3 mt-4 sm:gap-4">
        {/* Save Candidate Button */}
        <button
          onClick={handleSaveCandidate}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Save Candidate"
        >
          <BsBookmarkFill className="text-blue-600" />
        </button>

        {/* View Profile Button */}
        <button
          type="button"
          onClick={() => setDropdownOpen(false)}
          className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium px-3 py-1.5 text-sm rounded-md transition whitespace-nowrap"
        >
          View Profile
          <FaArrowRight className="text-sm" />
        </button>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full"
            aria-label="More Actions"
          >
            <FaEllipsisV />
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-10 z-50 w-40 bg-white border rounded-md shadow-lg py-1"
            >
              <button
                // onClick={onSendEmail}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                <FaEnvelope className="text-blue-500" />
                Send Email
              </button>
              <button
                // onClick={onDownloadCV}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                <FaDownload className="text-blue-500" />
                Download CV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCandidateCard;
