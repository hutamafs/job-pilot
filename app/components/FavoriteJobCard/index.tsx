"use client";
import { HiArrowRight } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { BsBookmarkFill } from "react-icons/bs";
import Image from "next/legacy/image";
import { Job as JobType } from "@/app/types";
import { unsaveJob } from "../pages/Jobs/query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotif } from "@/app/context/NotificationProvider";
import ApplyJobModal from "../pages/Jobs/[id]/ApplyJobModal";

interface FavoriteJobCardType {
  id: string;
  job: JobType;
}

const FavoriteJobCard = ({ job }: FavoriteJobCardType) => {
  const isExpired = job.expiredAt && new Date(job.expiredAt) < new Date();
  const router = useRouter();
  const [, setIsLoading] = useState(false);
  const { setNotif } = useNotif();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(
    job.applications && job.applications.length > 0
  );

  const handleDeleteJob = async () => {
    try {
      setIsLoading(true);
      const { data, success } = await unsaveJob(job.id);
      if (!success) throw new Error(data.message);
      router.refresh();
      setNotif("success", data.message);
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyNow = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-lg px-4 md:px-6 py-4 mb-6 hover:cursor-pointer border border-gray-200 hover:shadow-md transition">
      {/* Left: Logo & Job Info */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
          <Image
            src={job.company.logo || "/default-company.png"}
            width={125}
            height={125}
            className="rounded-md object-cover"
            alt={job.company.name}
          />
        </div>

        {/* Job Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-sm md:text-lg font-semibold text-gray-800">
              {job.title}
            </h3>
            <span className="text-xs md:text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-md capitalize">
              {job.jobType}
            </span>
          </div>
          <div className="flex items-center gap-x-4 justify-between mt-1">
            <div className="flex items-center gap-1">
              <IoLocationOutline className="text-gray-400 w-5 h-5" />
              <p className="text-xs md:text-sm text-gray-500">{job.location}</p>
            </div>
            <div className="flex items-center">
              <MdAttachMoney className="text-gray-500 w-5 h-5" />
              <span className="text-sm text-gray-600">{job.salary}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {!isExpired ? (
                <span className="text-xs md:text-sm text-gray-500">
                  {(() => {
                    const today = new Date();
                    const expiredAt = new Date(job.expiredAt);
                    const timeDiff = expiredAt.getTime() - today.getTime();
                    const daysRemaining = Math.ceil(
                      timeDiff / (1000 * 3600 * 24)
                    );

                    if (daysRemaining > 0 && daysRemaining <= 14) {
                      return `${daysRemaining} days remaining`;
                    } else {
                      return expiredAt.toLocaleDateString();
                    }
                  })()}
                </span>
              ) : (
                <span className="text-xs text-red-500 font-semibold">
                  Job Expired
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Bookmark Button */}
        <button
          className="text-gray-400 hover:text-blue-500 transition"
          onClick={handleDeleteJob}
        >
          <BsBookmarkFill size={18} />
        </button>

        {/* Apply Now / Expired */}
        {!isExpired ? (
          isApplied ? (
            <span className="text-gray-400 text-xs cursor-not-allowed md:text-sm font-medium">
              Applied
            </span>
          ) : (
            <button
              onClick={handleApplyNow}
              className="text-gray-400 transition transform hover:scale-105 flex items-center gap-1 bg-primary500 text-white px-3 py-2 rounded-md"
            >
              Apply Now
              <HiArrowRight />
            </button>
          )
        ) : (
          <span className="text-gray-400 text-xs md:text-sm font-medium">
            Deadline Expired
          </span>
        )}
      </div>
      <ApplyJobModal
        name={job.title}
        id={job.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsApplied={setIsApplied}
      />
    </div>
  );
};

export default FavoriteJobCard;
