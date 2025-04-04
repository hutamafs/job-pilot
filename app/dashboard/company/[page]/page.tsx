import Link from "next/link";
import { FaStar, FaBriefcase } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import { Pagination, PostedJobs } from "@/app/components";
import { SavedCandidate } from "@/app/types";
import { EmptyState } from "@/app/components";
import SavedCandidateCard from "@/app/components/pages/Companies/SavedCandidateCard";
import { getServerSession } from "@/app/lib";

interface CompanyPageProps {
  params: Promise<{ page: string }>;
  searchParams?: Promise<{ page?: string }>;
}

const CompanyPage = async ({ params, searchParams }: CompanyPageProps) => {
  const session = await getServerSession();
  const user = session?.user;
  const { page } = await params;
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  let data;

  const fetchData = async (url: string, qs: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${url}/${user?.id}?${qs}`
    );
    const { data } = await res.json();
    return data;
  };

  switch (page) {
    case "overview":
      data = await fetchData("posted-jobs", "limit=5");
      break;
    case "saved-candidates":
      data = await fetchData("saved-candidate", `page=${currentPage}`);
      break;
    default:
      data = await fetchData("posted-jobs", `page=${currentPage}`);
      break;
  }
  const { totalPages } = data;

  if (!data) {
    return <div>Loading...</div>;
  }

  const titleToDisplay = () => {
    if (page === "saved-candidates") {
      return "Saved Candidates";
    }
    if (page === "overview") {
      return "Recently Posted Jobs";
    }
    if (page === "applied-jobs") {
      return "Applied Jobs";
    }
    return "My Jobs";
  };

  return (
    <div className="md:px-4 w-full">
      {/* Candidate Greeting Section */}
      {page === "overview" && (
        <div className="bg-white rounded-lg">
          <h2 className="text-xl text-black font-semibold">
            {/* Hello, {userData?.name} */}
          </h2>
          <p className="text-gray-500">
            Here is your daily activities and job alerts
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4 mb-12">
            <StatCard
              icon={<FaBriefcase />}
              label="Saved Candidates"
              count={data.totalSavedCandidates}
              color="blue"
            />
            <StatCard
              icon={<FaStar />}
              label="Jobs Posted"
              count={data.totalJobs}
              color="yellow"
            />
          </div>
        </div>
      )}

      {/* Recently Applied Jobs */}
      {data.totalCandidates === 0 && page === "saved-candidates" ? (
        <EmptyState
          description={`You have not ${page === "saved-candidates" ? "saved any candidates" : "posted any job"} yet`}
        />
      ) : (
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">{titleToDisplay()}</h3>
            {page === "overview" && (
              <Link
                href="/dashboard/company/my-jobs"
                className="text-blue-500 flex items-center"
              >
                View All <HiArrowRight className="ml-2" />
              </Link>
            )}
          </div>
          {(page === "my-jobs" || page === "overview") && (
            <PostedJobs
              jobs={page === "my-jobs" ? data.jobs : data.jobs.slice(0, 5)}
            />
          )}
          {page === "saved-candidates" &&
            data.candidates.map((c: SavedCandidate) => (
              <SavedCandidateCard c={c.candidate} key={c.id} />
            ))}
          {page === "my-jobs" &&
            (data.jobs.length > 0 ? (
              <Pagination totalPages={totalPages} />
            ) : (
              <></>
            ))}
          {page === "saved-candidates" &&
            (data.candidates.length > 0 ? (
              <Pagination totalPages={totalPages} />
            ) : (
              <></>
            ))}
        </div>
      )}
    </div>
  );
};

type colorType = "blue" | "yellow";

// Reusable Stat Card Component
function StatCard({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  color: colorType;
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div
      className={`p-4 rounded-lg flex flex-col md:flex-row-reverse items-center justify-between ${colorClasses[color]} shadow-sm`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="flex flex-row items-center gap-x-2">
        <p className="text-lg font-bold">{count}</p>
        <p className="text-[14px]">{label}</p>
      </div>
    </div>
  );
}

export default CompanyPage;
