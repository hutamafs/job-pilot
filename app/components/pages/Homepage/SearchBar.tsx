'use client'
import { useState } from "react";
import Link from "next/link";

import Container from "../../Container";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <div className="flex w-full justify-between items-center">
        <form className="w-[350px]" action="">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for job, company, or candidate"
            className="w-full border border-gray-300 rounded-lg p-4"
          />
        </form>
        <div>
          <Link
            className="mr-4 px-5 py-3 min-h-[50px] border border-primary500 text-primary500 font-medium rounded-md hover:bg-primary500 hover:text-white transition"
            href="/signin"
          >
            Sign In
          </Link>
          <Link
            className="px-5 py-3 h-[50px] bg-primary500 text-white font-medium rounded-md hover:bg-primary500/80 transition"
            href="/post-job"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </Container>
  )
};

export default SearchBar;
