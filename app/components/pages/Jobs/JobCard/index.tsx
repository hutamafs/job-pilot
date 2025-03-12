"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { Job as JobCardProps } from "@/app/types";
import { unsaveJob, saveJob } from "../query";
import { useNotif } from "@/app/context/NotificationProvider";
import { useRouter } from "next/navigation";
import { FaBookmark, FaSpinner } from "react-icons/fa";

const JobCard: React.FC<JobCardProps> = (props) => {
  const { setNotif } = useNotif();
  const [isSaved, setIsSaved] = useState(
    props.savedJobs && props.savedJobs.length > 0
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = props;

  const handleDeleteJob = async () => {
    try {
      setIsLoading(true);
      const { data, success } = await unsaveJob(id);
      if (!success) throw new Error(data.message);
      setIsSaved(false);
      router.refresh();
      setNotif("success", data.message);
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveJob = async () => {
    try {
      setIsLoading(true);
      const { data, success } = await saveJob(id);
      if (!success) throw new Error(data.message);
      setIsSaved(true);
      setNotif("success", data.message);
      router.refresh();
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      key={props.id}
      className="flex flex-col bg-gray-50 shadow-md p-5 rounded-lg"
      href={`/jobs/${props.id}`}
    >
      <span className="text-gray-900 text-lg font-semibold">{props.title}</span>
      <div className="flex flex-col relative">
        <div className="flex items-center">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold uppercase mr-2 text-green-700 ring-1 ring-green-600/20 ring-inset">
            {props.jobType}
          </span>
          <span className="text-gray-600 text-[14px] lg:text-base">
            ${props.salary?.toLocaleString() || ""}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <Image
              width={48}
              height={48}
              src={props.company.profilePicture}
              alt={props.title}
              className="w-16 h-16 mr-2 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">
                {props.company.name}
              </span>
              <span className="text-gray-600">📍{props.location}</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isSaved) {
                handleDeleteJob();
              } else {
                handleSaveJob();
              }
            }}
            className="flex items-center absolute bottom-5 -right-5 text-primary500 px-4 py-2 rounded-lg"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : isSaved ? (
              <FaBookmark size={20} />
            ) : (
              <FiBookmark size={20} />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
