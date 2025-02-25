import { Container } from '@/app/components';
import { CandidateCard } from '@/app/components';
import { Candidate as CandidateType } from '@/app/types';
import { Pagination } from '@/app/components';

interface CandidateProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

const Candidates = async ({ searchParams }: CandidateProps) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidates?page=${currentPage}`);
    const { data, totalPages } = await response.json();

  if (!data) {
    return null;
  }
  try {
    return (
      <Container width='w-1/2'>
        <div className="flex flex-col items-center justify-center">
          {
            data.map((d: CandidateType) => (
              <CandidateCard key={d.id} {...d} />
            ))
          }
        </div>
      <Pagination totalPages={totalPages} />
    </Container>
    )
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return <div>Error loading candidates</div>;
    
  }
};

export default Candidates;
