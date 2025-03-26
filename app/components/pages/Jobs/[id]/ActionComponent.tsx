"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import ApplyJobModal from "../../Candidates/FavoriteJobCard/ApplyJobModal";
import { useNotif } from "@/app/context/NotificationProvider";
import { FaSpinner, FaBookmark } from "react-icons/fa";
import { unsaveJob, saveJob } from "@/app/utils/jobs/query";

const ActionComponent = ({
  id,
  name,
  data,
}: {
  id: string;
  name: string;
  data: {
    savedJobs: {
      length: number;
    };
    applications: {
      length: number;
    };
  };
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(data.savedJobs.length > 0);
  const [isApplied, setIsApplied] = useState<boolean>(
    data.applications.length > 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setNotif } = useNotif();

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

  const handleApplyNow = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="flex justify-end gap-4">
        {pathname.includes("/jobs") && (
          <button
            onClick={isSaved ? handleDeleteJob : handleSaveJob}
            className={`flex items-center justify-center bg-gray-100 text-primary500 px-4 py-2 rounded-lg ${isLoading ? "cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : isSaved ? (
              <FaBookmark size={20} />
            ) : (
              <FiBookmark size={20} />
            )}
          </button>
        )}
        <button
          onClick={handleApplyNow}
          className={`w-full p-2 md:p-4 rounded-lg transition ${isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          {isApplied ? "Applied" : "Apply Now →"}
        </button>
      </div>
      <ApplyJobModal
        name={name}
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsApplied={setIsApplied}
      />
    </>
  );
};

export default ActionComponent;
