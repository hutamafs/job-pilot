import Link from "next/link";
import { FaStar, FaBriefcase } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi2";

export default function CandidateDashboard() {
  return (
    <div className="md:px-4 w-full">
      {/* Candidate Greeting Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl text-black font-semibold">Hello, Esther Howard</h2>
        <p className="text-gray-500">Here is your daily activities and job alerts</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <StatCard icon={<FaBriefcase />} label="Applied Jobs" count="589" color="blue" />
          <StatCard icon={<FaStar />} label="Favorite Jobs" count="238" color="yellow" />
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
          <Link href="/dashboard/candidate/applied-job" className="text-blue-500 flex items-center">View All <HiArrowRight className="ml-2" /></Link>
        </div>

        <div className="space-y-4">
          <JobItem
            logo="🟢"
            title="Networking Engineer"
            location="Washington"
            salary="$50k-$60k/month"
            status="Active"
          />
          <JobItem
            logo="🟣"
            title="Product Designer"
            location="Omaha"
            salary="$55k-$60k/year"
            status="Active"
          />
          <JobItem
            logo="⚫"
            title="Junior Graphic Designer"
            location="Temporary"
            salary="$50k-$55k/year"
            status="Active"
          />
          <JobItem
            logo="🔵"
            title="Visual Designer"
            location="Wisconsin"
            salary="$55k-$60k/year"
            status="Active"
          />
        </div>
      </div>
    </div>
  );
}

type colorType = "blue" | "yellow";

// Reusable Stat Card Component
function StatCard({ icon, label, count, color }: { icon: React.ReactNode; label: string; count: string; color: colorType }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className={`p-4 rounded-lg flex flex-col md:flex-row-reverse items-center justify-between ${colorClasses[color]} shadow-sm`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="flex flex-row items-center gap-x-2">
        <p className="text-lg font-bold">{count}</p>
        <p className="text-[14px]">{label}</p>
      </div>
    </div>
  );
}

// Reusable Job Item Component
function JobItem({ logo, title, location, salary }: { logo: string; title: string; location: string; salary: string; status: string }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <span className="text-3xl">{logo}</span>
        <div className="ml-4">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-gray-500 text-sm">{location} • {salary}</p>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">View Details</button>
    </div>
  );
}
