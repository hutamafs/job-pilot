export const dynamic = 'force-dynamic';
import { Container, JobCard } from '@/app/components';
import { SearchJob } from '@/app/components/pages/Jobs';
import { Job as JobType } from '@/app/types';
import { Pagination } from '@/app/components';

interface JobsProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

const Jobs = async ({ searchParams }: JobsProps) => {
  try {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams?.page) || 1;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?page=${currentPage}`);
    const { data, totalPages } = await response.json();

    if (!data) {
      return null;
    }

    return (
      <>
        <SearchJob />
        <Container className="py-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
            {data.map((d: JobType) => (
              <JobCard key={d.id} {...d} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </Container>
      </>
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <div>Error loading jobs</div>;
  }
};

export default Jobs;
