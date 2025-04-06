"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  CompanyCard,
  EmptyState,
  LoadingSpinner,
} from "@/app/components";
import SearchCompany from "@/app/components/pages/Companies/SearchCompany";
import { Pagination } from "@/app/components";
import { Company as CompanyType } from "@/app/types";
import { stringifyQuery } from "@/app/utils";
import { CompanySearchQuery } from "@/app/types";
import { getClientSession } from "@/app/lib";

const Companies = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{ id: string }>({
    id: "",
  });

  const [countries, setCountries] = useState([]);
  const query: CompanySearchQuery = {
    search: searchParams.get("search") ?? "",
    location: searchParams.get("location") ?? "",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  };
  const params = stringifyQuery(query);

  useEffect(() => {
    const getCountries = async () => {
      const url = `https://country-state-city-search-rest-api.p.rapidapi.com/allcountries`;
      const res = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
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

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getClientSession();
      if (session?.user) {
        setUser(session.user.id);
      }
    };
    fetchUser();
  }, []);

  const fetchCompanies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/companies?${params}`,
      {
        headers: {
          Authorization: user?.id || "",
        },
      }
    );
    const { data, totalPages } = await response.json();
    return { data, totalPages };
  };

  const { data: queryResult, isLoading } = useQuery({
    queryKey: ["companies", params, user?.id],
    queryFn: fetchCompanies,
    enabled: !!user,
  });

  const data = queryResult?.data || [];
  console.log(data?.companies?.[0]);

  return (
    <>
      <SearchCompany countries={countries} query={query} />
      <Container className="py-8">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {!data || data.companies.length === 0 ? (
              <EmptyState description="No companies found" />
            ) : (
              <>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
                  {data.companies.map((d: CompanyType) => (
                    <CompanyCard key={d.id} {...d} />
                  ))}
                </div>
                <Pagination totalPages={data.totalPages || 0} />
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Companies;
