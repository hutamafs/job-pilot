"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  JobCard,
  EmptyState,
  LoadingSpinner,
} from "@/app/components";
import { Job as JobType, JobSearchQuery } from "@/app/types";
import { Pagination } from "@/app/components";
import { SearchFilterWrapper } from "@/app/components/pages/Jobs";
import { stringifyQuery } from "@/app/utils";
import { getClientSession } from "@/app/lib/";

const Jobs = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState("");
  const [countries, setCountries] = useState([]);
  const query: JobSearchQuery = {
    search: searchParams.get("search") ?? "",
    location: searchParams.get("location") ?? "",
    company: searchParams.get("company") ?? "",
    industry: searchParams.getAll("industry") ?? [],
    jobType: searchParams.getAll("jobType") ?? [],
    salary: searchParams.get("salary") ? Number(searchParams.get("salary")) : 0,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  };
  const params = stringifyQuery(query);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getClientSession();
      if (session?.user) {
        setUser(session.user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      const url = `https://country-state-city-search-rest-api.p.rapidapi.com/allcountries`;
      const res = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data;
    };

    const fetchAndProcessCountries = async () => {
      const countryList = await getCountries();
      const countries = countryList.map((country: { name: string }) => ({
        label: country.name,
        value: country.name,
      }));
      setCountries(countries);
    };

    fetchAndProcessCountries();
  }, []);

  const fetchJobs = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${params}`,
      {
        headers: {
          Authorization: user || "",
        },
      }
    );
    const { data, totalPages } = await response.json();
    return { data, totalPages };
  };

  const { data: queryResult, isLoading } = useQuery({
    queryKey: ["jobs", params, user],
    queryFn: fetchJobs,
    enabled: !!user,
  });

  const data = queryResult?.data || [];
  const totalPages = queryResult?.totalPages || 0;

  return (
    <div className="relative">
      <SearchFilterWrapper countries={countries} query={query} />
      <Container className="py-8 relative">
        {/* Full loading state when no data */}
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {!data || data?.length === 0 ? (
              <EmptyState description="No jobs found, please adjust your filter" />
            ) : (
              <>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
                  {data.map((d: JobType) => (
                    <JobCard key={d.id} {...d} />
                  ))}
                </div>

                <Pagination totalPages={totalPages} />
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Jobs;
