"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiMapPin } from "react-icons/fi";
import Container from "../../Container";
import { CompanySearchQuery } from "@/app/types";
import { countryOptions } from "@/app/options";
import { stringifyQuery } from "@/app/utils";

interface CompanySearchProps {
  query: CompanySearchQuery;
}

const CompanySearchBar = ({ query }: CompanySearchProps) => {
  const router = useRouter();
  const [q, setQuery] = useState<CompanySearchQuery>({
    search: "",
    location: "",
    page: 1,
  });

  const handleSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/companies?${stringifyQuery(q)}`);
  };

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      search: query.search,
      location: query.location,
    }));
  }, [query]);

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
            placeholder="Search by: Company name, Position, Keyword..."
            value={q.search}
            name="search"
            onChange={handleInputChange}
          />
        </div>
        <div className="sm:col-span-3 flex items-center border border-gray-300 rounded-md px-3 py-3 sm:py-4">
          <FiMapPin className="w-5 h-5 text-blue-500" size={20} />
          <select
            className="w-full outline-none px-2 text-sm text-gray-700 bg-white"
            value={q.location}
            name="location"
            onChange={handleInputChange}
          >
            <option value="">Select a location</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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

export default CompanySearchBar;
