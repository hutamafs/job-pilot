"use client";

import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";
import { useNotif } from "@/app/context/NotificationProvider";
import { saveCandidate, unsaveCandidate } from "@/app/utils/candidates/query";
import ProfileModal from "./ProfileModal";
import { Candidate as CandidateType } from "@/app/types";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

const CandidateCard: React.FC<CandidateType & { isSaved: boolean }> = (d) => {
  const [isSaved, setIsSaved] = useState(d.isSaved);
  const [isOpen, setIsOpen] = useState(false);
  const { setNotif } = useNotif();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleSaveCandidate = async () => {
    try {
      setIsLoading(true);
      if (isSaved) {
        await unsaveCandidate(d.id);
        setNotif("success", "candidate has successfully been unsaved");
      } else {
        await saveCandidate(d.id);
        setNotif("success", "candidate has successfully been saved");
      }
      setIsSaved(!isSaved);
      router.refresh();
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(d);

  return (
    <>
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between p-4 mb-3 border rounded-lg transition-all w-full relative
        }`}
      >
        <div className="flex md:items-center gap-4">
          <Image
            width={60}
            height={60}
            src={d.profilePicture || ""}
            alt={d.name}
            className="rounded-sm object-cover"
          />
          <div>
            <h2 className={`text-sm text-black font-semibold`}>{d.name}</h2>
            <p className="text-xs text-black">{d.role}</p>
            <div className="flex flex-col md:flex-row md:items-center mt-1 md:mt-0 gap-1 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{d.location}</span>
              </div>
              <div className="flex items-center gap-x-1">
                <FaWallet className="text-gray-400" />
                <span>{d.experience} years</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSaveCandidate}
          className="text-gray-400 hover:text-gray-600 absolute top-5 right-5 md:top-2 transition"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : isSaved ? (
            <BsBookmarkFill className="text-blue-600" />
          ) : (
            <BsBookmark />
          )}
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center text-primary500 bg-blue-50 justify-center gap-2 px-3 py-1.5 mt-2 md:mt-4 rounded-md text-sm font-semibold transition-all`}
        >
          View Profile <HiArrowRight />
        </button>
      </div>
      <ProfileModal
        profile={d}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isSaved={isSaved}
        handleSaveCandidate={handleSaveCandidate}
      />
    </>
  );
};

export default CandidateCard;
