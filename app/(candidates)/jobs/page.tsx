export const dynamic = "force-dynamic";
import { Container, JobCard } from "@/app/components";
import { Job as JobType, JobSearchQuery } from "@/app/types";
import { Pagination } from "@/app/components";
import { cookies } from "next/headers";
import { SearchFilterWrapper } from "@/app/components/pages/Jobs";
import { stringifyQuery } from "@/app/utils";
interface JobsProps {
  searchParams?: Promise<JobSearchQuery>;
}

const Jobs = async ({ searchParams }: JobsProps) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("sb-access-token")?.value;
    const resolvedParams = await searchParams;
    const industryParam = resolvedParams?.industry as string | undefined;
    const jobTypeParam = resolvedParams?.jobType as string | undefined;
    const query: JobSearchQuery = {
      search: resolvedParams?.search ?? "",
      location: resolvedParams?.location ?? "",
      company: resolvedParams?.company ?? "",
      industry: industryParam ? industryParam.split(",") : [],
      jobType: jobTypeParam ? jobTypeParam.split(",") : [],
      salary: resolvedParams?.salary ? Number(resolvedParams.salary) : 0,
      page: resolvedParams?.page ? Number(resolvedParams.page) : 1,
    };
    const params = stringifyQuery(query);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const { data, totalPages } = await response.json();

    if (!data) {
      return null;
    }

    return (
      <div className="relative">
        <SearchFilterWrapper query={query} />
        <Container className="py-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
            {data.map((d: JobType) => (
              <JobCard key={d.id} {...d} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <div>Error loading jobs</div>;
  }
};

export default Jobs;
