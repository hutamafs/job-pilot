"use client";

import { SetStateAction, Dispatch } from "react";
import { FiSearch, FiMapPin, FiSliders } from "react-icons/fi";
import Container from "../../common/Container";
import { JobSearchQuery } from "@/app/types";
import { countryOptions } from "@/app/options";
interface JobSearchBarProps {
  query: JobSearchQuery;
  setQuery: React.Dispatch<SetStateAction<JobSearchQuery>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmitFilter: (e: React.FormEvent<HTMLFormElement>) => void;
}

const JobSearchBar = ({
  query,
  setQuery,
  handleSubmitFilter,
  setIsOpen,
}: JobSearchBarProps) => {
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="py-3">
      <form
        onSubmit={handleSubmitFilter}
        className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-2 items-center"
      >
        <div className="sm:col-span-5 flex items-center border border-gray-300 rounded-md px-3 py-3 sm:py-4">
          <FiSearch className="w-5 h-5 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full outline-none px-2 text-sm text-gray-700"
            placeholder="Search by: Job title, Position, Keyword..."
            value={query.search}
            name="search"
            onChange={handleInputChange}
          />
        </div>
        <div className="sm:col-span-3 flex items-center border border-gray-300 rounded-md px-3 py-3 sm:py-4">
          <FiMapPin className="w-5 h-5 text-blue-500" size={20} />
          <select
            className="w-full outline-none px-2 text-sm text-gray-700 bg-white"
            value={query?.location}
            name="location"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a location
            </option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className="sm:col-span-2 flex items-center justify-center border border-gray-300 rounded-md px-4 py-3 sm:py-4 text-sm text-gray-600 hover:bg-gray-100 transition"
        >
          <FiSliders className="w-5 h-5 mr-2" size={20} />
          Filters
        </button>
        <button
          type="submit"
          className="sm:col-span-2 bg-blue-600 text-white font-medium px-4 py-3 sm:py-4 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Find Job
        </button>
      </form>
    </Container>
  );
};

export default JobSearchBar;
