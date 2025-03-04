"use client";
import { FC, useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";

interface MutationStatusProps {
  status: {
    isIdle: boolean;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  message?: string;
}

const MutationStatus: FC<MutationStatusProps> = ({ status, message }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayStatus, setDisplayStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);

  useEffect(() => {
    if (status.isPending) {
      setIsVisible(true);
      setDisplayStatus("pending");

      const timer = setTimeout(() => {
        if (status.isSuccess) {
          setDisplayStatus("success");
        } else if (status.isError) {
          setDisplayStatus("error");
        }
      }, 500);

      return () => clearTimeout(timer);
    }

    if (status.isSuccess || status.isError) {
      setDisplayStatus(status.isSuccess ? "success" : "error");

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!isVisible || !displayStatus) return null;
  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-md text-white transition-transform transform-gpu duration-300 ${
        displayStatus === "success"
          ? "bg-green-500"
          : displayStatus === "error"
            ? "bg-red-500"
            : "bg-yellow-500"
      }`}
    >
      {displayStatus === "pending" && (
        <div className="flex items-center gap-2">
          <FaSpinner className="animate-spin" />
          <span>Updating profile...</span>
        </div>
      )}

      {displayStatus === "success" && (
        <div className="flex items-center gap-2">
          <FaCheckCircle />
          <span>{message || "Profile updated successfully!"}</span>
        </div>
      )}

      {displayStatus === "error" && (
        <div className="flex items-center gap-2">
          <FaExclamationTriangle />
          <span>{message || "Profile update failed. Try again."}</span>
        </div>
      )}
    </div>
  );
};

export default MutationStatus;
