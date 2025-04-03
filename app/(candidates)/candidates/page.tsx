"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/app/components";
import { CandidateCard, LoadingSpinner, EmptyState } from "@/app/components";
import { Candidate as CandidateType } from "@/app/types";
import { Pagination } from "@/app/components";
import { stringifyQuery } from "@/app/utils";
import { SavedCandidate, CandidateSearchQuery } from "@/app/types";
import { getClientSession } from "@/app/lib/";

const Candidates = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState("");
  const query: CandidateSearchQuery = {
    search: searchParams.get("search") ?? "",
    location: searchParams.get("location") ?? "",
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

  const fetchCandidates = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates?${params}`
    );
    const { data } = await response.json();
    const { candidates, totalCandidates, totalPages } = data;
    return { candidates, totalCandidates, totalPages };
  };

  const {
    data: queryResult,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["candidates", params, user],
    queryFn: fetchCandidates,
    enabled: !!user,
  });
  const data = queryResult?.candidates || [];
  const totalPages = queryResult?.totalPages || 0;

  const savedCandidateIds = new Set(
    data
      .filter((c: CandidateType) =>
        c.savedByCompanies.some((s: SavedCandidate) => s.companyId === user)
      )
      .map((c: CandidateType) => c.id)
  );

  if (!data) {
    return null;
  }
  try {
    return (
      <Container width="w-full lg:w-1/2">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {!data || data.length === 0 ? (
              <EmptyState description="No jobs found, please adjust your filter" />
            ) : (
              <>
                <div
                  className={`flex flex-col items-center justify-center transition-opacity duration-300 ${
                    isFetching ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {data.map((d: CandidateType) => (
                    <CandidateCard
                      key={d.id}
                      {...d}
                      isSaved={savedCandidateIds.has(d.id)}
                    />
                  ))}
                </div>
                <Pagination totalPages={totalPages} />
              </>
            )}
          </>
        )}
      </Container>
    );
  } catch {
    return <div>Error loading candidates</div>;
  }
};

export default Candidates;
