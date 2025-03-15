"use client";
import { useEffect, useRef, useState } from "react";
import { Job as JobType } from "@/app/types";
import { useRouter } from "next/navigation";

interface PostedJobCardType {
  jobs: JobType[];
}

const PostedJobs = ({ jobs }: PostedJobCardType) => {
  const hasExpired = (job: JobType) => {
    const today = new Date();
    const expiredAt = new Date(job.expiredAt);
    return expiredAt < today;
  };

  return (
    <div className="space-y-4">
      {/* ✅ Desktop-style Table Header */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-2 text-gray-600 uppercase text-xs border-b bg-gray-100 rounded-md">
        <div>Job</div>
        <div className="text-center">Status</div>
        <div className="text-center">Applications</div>
        <div className="text-center">Action</div>
      </div>

      {jobs.map((job) => (
        <div
          key={job.id}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 px-4 py-3 bg-white rounded-lg shadow-sm border text-sm"
        >
          {/* 🧩 Job Info */}
          <div>
            <h3 className="text-sm font-semibold">{job.title}</h3>
            <p className="text-gray-500 text-s">
              {job.jobType} • expires at{" "}
              {new Date(job.expiredAt).toLocaleDateString()}
            </p>
          </div>

          {/* 🟢 Status */}
          <div className="text-left md:text-center">
            <span
              className={`px-2 py-0.5 rounded-full text-sm ${
                hasExpired(job)
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {hasExpired(job) ? "Expired" : "Active"}
            </span>
          </div>
          {/* 📄 Applications */}
          <div className="text-left md:text-center text-sm">
            {job.applications?.length ?? 0} Applications
          </div>
          <div className="flex flex-col items-center text-center w-full gap-1">
            <DropdownActions job={job} />
          </div>
        </div>
      ))}
    </div>
  );
};

const DropdownActions = ({ job }: { job: JobType }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewJob = () => {
    router.push(`/jobs/${job.id}`);
    setOpen(false);
  };

  const handleViewCandidates = () => {
    router.push(`/dashboard/company/jobs/${job.id}/candidates`);
    setOpen(false);
  };

  const handleMarkExpired = async () => {
    try {
      await fetch(`/api/jobs/${job.id}/expire`, { method: "PATCH" });
      router.refresh(); // or mutate if you're using TanStack
    } catch (err) {
      console.error("Failed to mark as expired:", err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm w-full text-blue-600 border border-blue-600 p-2 rounded-md hover:bg-blue-50 transition"
      >
        View Applications
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute md:right-30 mt-2 bg-white shadow-md rounded-md z-50 w-48 border"
        >
          <div className="py-1">
            <button
              onClick={handleViewJob}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              View Job
            </button>
            <button
              onClick={handleViewCandidates}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              View Candidates
            </button>
            <button
              onClick={handleMarkExpired}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Mark as Expired
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
