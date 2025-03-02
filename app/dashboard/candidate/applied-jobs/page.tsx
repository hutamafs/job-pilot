import { JobApplication as JobAppType } from "@/app/types";
import { Pagination, DashboardJobCard } from '@/app/components';

interface AppliedJobsProps {
  searchParams?: Promise<{ page?: string }>;
}

const AppliedJobs = async ({ searchParams }: AppliedJobsProps) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appliedJobs/2?page=${currentPage}`);
  const { data, totalPages } = await response.json();
  return (
    <div>
      <h1>Applied Jobs</h1>
      <div className="md:overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px] md:min-w-full">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm leading-normal">
            <tr className="hidden md:table-row">
              <th className="py-3 px-6 text-left">Job</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Salary</th>
              <th className="py-3 px-6 text-left">Date Applied</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-xs md:text-sm">
            {data.map((d: JobAppType) => (
              <DashboardJobCard key={d.id} {...d} />
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
};

export default AppliedJobs;
