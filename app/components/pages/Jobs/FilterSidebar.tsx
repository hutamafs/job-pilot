"use client";

import React, { useEffect, useRef, SetStateAction } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { jobTypeOptions, industries } from "@/app/options";
import { JobSearchQuery } from "@/app/types";

const Pill = ({ str, onClick }: { str: string; onClick: () => void }) => (
  <div className="flex items-center bg-gray-200 rounded-md px-3 py-1 text-sm">
    <span>{str}</span>
    <button
      onClick={onClick}
      type="button"
      className="ml-2 text-gray-500 hover:text-red-600"
    >
      ✕
    </button>
  </div>
);

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  query: JobSearchQuery;
  setQuery: React.Dispatch<SetStateAction<JobSearchQuery>>;
  handleSubmitFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleResetFilter: () => void;
}

const FilterSidebar = ({
  isOpen,
  setIsOpen,
  query,
  setQuery,
  handleSubmitFilter,
  handleResetFilter,
}: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, setIsOpen]);

  const handlePillChange = (name: string, value: string) => {
    setQuery((prev) => {
      const updatedArray = (
        prev[name as keyof JobSearchQuery] as string[]
      ).filter((item: string) => item !== value);
      return { ...prev, [name]: updatedArray };
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setQuery((prev) => {
      if (name === "industry" || name === "jobType") {
        const updatedArray = checked
          ? [...(prev[name] as string[]), value]
          : (prev[name] as string[]).filter((item) => item !== value);
        return { ...prev, [name]: updatedArray };
      }
      return {
        ...prev,
        [name]: name === "salary" ? Number(value) : value,
      };
    });
  };

  return (
    <>
      {/* 🔹 Background Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40"></div>}

      {/* 🔹 Sidebar */}
      <motion.div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        ref={sidebarRef}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-0 left-0 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto w-full sm:w-80"
      >
        {/* 🔹 Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={20} />
        </button>

        {/* 🔹 Filter Title */}
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <p className="mt-2 mb-1">Active filters:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(query).flatMap(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0))
              return [];
            if (key === "industry" || key === "jobType") {
              if (Array.isArray(value)) {
                return value.map((el) => (
                  <Pill
                    key={el}
                    onClick={() => handlePillChange(key, el)}
                    str={el}
                  />
                ));
              }
              return (
                <Pill
                  key={value}
                  onClick={() => handlePillChange(key, value)}
                  str={value}
                />
              );
            }
            if (key === "salary") {
              return (
                <Pill onClick={() => {}} key={key} str={`${key}: $${+value}`} />
              );
            }
            if (key === "search" || key === "location") {
              return (
                <Pill onClick={() => {}} key={key} str={`${key}: ${value}`} />
              );
            }
          })}
        </div>
        {/* 🔹 Individual Filter Components */}
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Industry</h3>
          <div className="space-y-2">
            {industries.map((industry) => (
              <label key={industry} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  name="industry"
                  value={industry}
                  onChange={handleInputChange}
                  checked={query.industry?.includes(industry)}
                />
                <span>{industry}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Job Type</h3>
          <div className="space-y-2">
            {jobTypeOptions.map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  name="jobType"
                  value={value}
                  onChange={handleInputChange}
                  checked={query.jobType?.includes(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Salary (Yearly in AUD)</h3>
          <input
            type="range"
            min="50000"
            max="150000"
            value={query.salary}
            onChange={handleInputChange}
            className="w-full"
            name="salary"
          />
          <p className="text-sm text-gray-600 mt-1">
            Selected: ${query.salary?.toLocaleString()}
          </p>
        </div>

        {/* 🔹 Apply Button */}
        <button
          onClick={handleSubmitFilter}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
        >
          Apply Filters
        </button>
        {/* 🔹 Reset Button */}
        <button
          onClick={handleResetFilter}
          className="w-full bg-gray-600 text-white py-2 rounded-md mt-2 hover:bg-gray-700"
        >
          Reset Filters
        </button>
      </motion.div>
    </>
  );
};

export default FilterSidebar;
