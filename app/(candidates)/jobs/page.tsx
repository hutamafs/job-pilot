export const dynamic = "force-dynamic";
import { Container, JobCard, EmptyState } from "@/app/components";
import { Job as JobType, JobSearchQuery } from "@/app/types";
import { Pagination } from "@/app/components";
import { SearchFilterWrapper } from "@/app/components/pages/Jobs";
import { stringifyQuery } from "@/app/utils";
import { getUser } from "@/app/utils/supabase/getUser";

interface JobsProps {
  searchParams?: Promise<JobSearchQuery>;
}

const Jobs = async ({ searchParams }: JobsProps) => {
  try {
    const user = await getUser();
    const resolvedParams = await searchParams;
    const industryParam = resolvedParams?.industry as string[] | undefined;
    const jobTypeParam = resolvedParams?.jobType as string[] | undefined;
    const query: JobSearchQuery = {
      search: resolvedParams?.search ?? "",
      location: resolvedParams?.location ?? "",
      company: resolvedParams?.company ?? "",
      industry: industryParam ?? [],
      jobType: jobTypeParam ?? [],
      salary: resolvedParams?.salary ? Number(resolvedParams.salary) : 0,
      page: resolvedParams?.page ? Number(resolvedParams.page) : 1,
    };
    const params = stringifyQuery(query);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${params.toString()}`,
      {
        headers: {
          Authorization: `${user?.id}`,
        },
      }
    );
    const { data, totalPages } = await response.json();

    return (
      <div className="relative">
        <SearchFilterWrapper query={query} />
        <Container className="py-8">
          {!data || data.length === 0 ? (
            <EmptyState description="No jobs found, please adjust your filter" />
          ) : (
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
                {data?.map((d: JobType) => <JobCard key={d.id} {...d} />)}
              </div>
              <Pagination totalPages={totalPages} />
            </>
          )}
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <div>Error loading jobs</div>;
  }
};

export default Jobs;
