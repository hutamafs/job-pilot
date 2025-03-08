// import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaStar, FaBriefcase } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi2";
import { JobApplication as JobAppType } from "@/app/types";

const CandidateOverview = async () => {
  try {
    // const session = await getServerSession(authOptions);
    // const userId = session?.user.id || 2;
    // const resolvedParams = await params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/appliedJobs/2?limit=3`
    );
    const { data } = await response.json();
    return (
      <div className="md:px-4 w-full">
        {/* Candidate Greeting Section */}
        <div className="bg-white rounded-lg">
          <h2 className="text-xl text-black font-semibold">
            Hello, Esther Howard
          </h2>
          <p className="text-gray-500">
            Here is your daily activities and job alerts
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <StatCard
              icon={<FaBriefcase />}
              label="Applied Jobs"
              count="589"
              color="blue"
            />
            <StatCard
              icon={<FaStar />}
              label="Favorite Jobs"
              count="238"
              color="yellow"
            />
          </div>

          {/* Profile Incomplete Warning */}
          <div className="bg-red-100 text-red-600 p-4 mt-6 rounded-lg flex items-center justify-between">
            <span>Your profile editing is not completed.</span>
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg">
              <MdEdit className="mr-2" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Recently Applied Jobs */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">Recently Applied</h3>
            <Link
              href="/dashboard/candidate/applied-job"
              className="text-blue-500 flex items-center"
            >
              View All <HiArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px] md:min-w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm leading-normal">
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Job</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">
                    Location
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">
                    Salary
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">
                    Date Applied
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">
                    Status
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="text-gray-700 text-xs md:text-sm">
                {data.map((d: JobAppType) => (
                  <tr
                    key={d.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-3 md:py-3 md:px-6">{d.job.title}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">
                      {d.job.location}
                    </td>
                    <td className="py-2 px-3 md:py-3 md:px-6">
                      {d.job.salary}
                    </td>
                    <td className="py-2 px-3 md:py-3 md:px-6">
                      {d.appliedAt
                        ? new Date(d.appliedAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td
                      className={`py-2 px-3 md:py-3 md:px-6 ${d.status === "rejected" ? "text-red-500" : "text-green-500"} font-medium`}
                    >
                      {d.status}
                    </td>
                    <td className="py-2 px-3 md:py-3 md:px-6 text-right">
                      <Link
                        href={`/jobs/${d.job.id}`}
                        className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch {
    return <div>error return candidate aplied jobs</div>;
  }
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
  count: string;
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

export default CandidateOverview;
