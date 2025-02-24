"use client";

import { useState } from "react";
import { FiSearch, FiMapPin, FiSliders } from "react-icons/fi";
import Container from "../../Container";

const JobSearchBar = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Container className="py-3">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-2 items-center">
        <div className="sm:col-span-5 flex items-center border border-gray-300 rounded-md px-3 py-3 sm:py-4">
          <FiSearch className="w-5 h-5 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full outline-none px-2 text-sm text-gray-700"
            placeholder="Search by: Job title, Position, Keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="sm:col-span-3 flex items-center border border-gray-300 rounded-md px-3 py-3 sm:py-4">
          <FiMapPin className="w-5 h-5 text-blue-500" size={20} />
          <input
            type="text"
            className="w-full outline-none px-2 text-sm text-gray-700"
            placeholder="City, state or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button className="sm:col-span-2 flex items-center justify-center border border-gray-300 rounded-md px-4 py-3 sm:py-4 text-sm text-gray-600 hover:bg-gray-100 transition">
          <FiSliders className="w-5 h-5 mr-2" size={20} />
          Filters
        </button>
        <button className="sm:col-span-2 bg-blue-600 text-white font-medium px-4 py-3 sm:py-4 rounded-md text-sm hover:bg-blue-700 transition">
          Find Job
        </button>
      </div>
    </Container>
  );
};

export default JobSearchBar;
