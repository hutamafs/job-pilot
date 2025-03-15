import { Container } from "@/app/components";
import { CandidateCard } from "@/app/components";
import { Candidate as CandidateType } from "@/app/types";
import { Pagination } from "@/app/components";
import { getUserRole } from "@/app/utils/getUserRole";
import { SavedCandidate } from "@/app/types";
interface CandidateProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

const Candidates = async ({ searchParams }: CandidateProps) => {
  const { data: userData } = await getUserRole();
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates?page=${currentPage}`
  );
  const { data, totalPages } = await response.json();

  const savedCandidateIds = new Set(
    data
      .filter((c: CandidateType) =>
        c.savedByCompanies.some(
          (s: SavedCandidate) => s.companyId === userData.id
        )
      )
      .map((c: CandidateType) => c.id)
  );

  if (!data) {
    return null;
  }
  try {
    return (
      <Container width="w-full md:w-1/2">
        <div className="flex flex-col items-center justify-center">
          {data.map((d: CandidateType) => (
            <CandidateCard
              key={d.id}
              {...d}
              isSaved={savedCandidateIds.has(d.id)}
            />
          ))}
        </div>
        <Pagination totalPages={totalPages} />
      </Container>
    );
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return <div>Error loading candidates</div>;
  }
};

export default Candidates;
