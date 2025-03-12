// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { HiArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { Job as JobType } from "@/app/types";

interface FavoriteJobCardType {
  id: string;
  job: JobType;
  appliedAt: string;
  status: string;
}

const FavoriteJobCard = ({ job }: FavoriteJobCardType) => {
  return (
    <div className="flex items-center bg-white shadow-sm rounded-lg p-4 md:p-6 border border-gray-200 hover:shadow-md transition">
      {/* Logo */}
      <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
        <Image
          src={job.company.profilePicture || ""}
          width={50}
          height={50}
          className="rounded-md"
          alt={job.company.name}
        />
      </div>

      {/* Job Info */}
      <div className="flex flex-col flex-grow px-4">
        <h3 className="text-sm md:text-lg font-semibold text-gray-800">
          {job.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-500">{job.location}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-xs md:text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {job.jobType}
          </span>
          <span className="text-xs md:text-sm text-gray-600">{job.salary}</span>
          {/* {!isExpired && (
            <span className="text-xs md:text-sm text-gray-500">{remainingDays} Days Remaining</span>
          )}
          {isExpired && <span className="text-xs text-red-500">Job Expired</span>} */}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Bookmark */}
        <button className="text-gray-400 hover:text-blue-500 transition">
          {/* {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />} */}
        </button>

        {/* Apply Now */}
        <span>deadline expired</span>
        {/* {!isExpired ? (
          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-3 py-2 rounded-md transition">
            Apply Now <HiArrowRight />
          </button>
        ) : (
          <span className="text-gray-400 text-xs md:text-sm">Deadline Expired</span>
        )} */}
      </div>
    </div>
  );
};

export default FavoriteJobCard;
