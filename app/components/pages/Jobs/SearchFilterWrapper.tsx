"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchJob from "./SearchJob";
import FilterSidebar from "./FilterSidebar";
import { JobSearchQuery } from "@/app/types";
import { stringifyQuery } from "@/app/utils";

const JobSearchWrapper = ({ query }: { query: JobSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [q, setQuery] = useState<JobSearchQuery>({
    search: query.search ?? "",
    location: query.location ?? "",
    industry: query.industry,
    jobType: query.jobType,
    salary: query.salary ?? 0,
    company: query.company ?? "",
  });

  useEffect(() => {
    if (query) {
      setQuery((prev) => ({
        ...prev,
        search: query.search ?? prev.search,
        location: query.location ?? prev.location,
        industry: query.industry ?? prev.industry,
        jobType: query.jobType ?? prev.jobType,
        salary: query.salary ?? prev.salary,
        company: query.company ?? prev.company,
      }));
    }
  }, [query]);

  const handleSubmitFilter = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // Object.entries(q).forEach(([key, value]) => {
    //   if (value) {
    //     params.set(key, value);
    //   }
    // });
    // Object.entries(query).forEach(([key, value]) => {
    // if (value) {
    //   if (key === "industry" || key === "jobType") {
    //     if (Array.isArray(value) && value.length) {
    //       value.forEach((v: string) => {
    //         params.append(key, v);
    //       });
    //     }
    //   } else {
    //     params.set(key, value);
    //   }
    // }
    // });
    router.push(`/jobs?${stringifyQuery(q)}`);
  };

  return (
    <>
      <SearchJob
        query={q}
        setQuery={setQuery}
        handleSubmitFilter={handleSubmitFilter}
        setIsOpen={setIsOpen}
      />
      <FilterSidebar
        query={q}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setQuery={setQuery}
        handleSubmitFilter={handleSubmitFilter}
      />
    </>
  );
};

export default JobSearchWrapper;
