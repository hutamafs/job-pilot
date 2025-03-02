import Link from 'next/link';
import Image from 'next/image';
import { Job as JobType } from "@/app/types";

interface DashboardJobCardType {
  id: string;
  job: JobType;
  appliedAt: string;
  status: string;
}

const DashboardJobCard = ({id, job, appliedAt, status}: DashboardJobCardType) => {
  return (
    <tr key={id} className="grid grid-cols-1 md:table-row md:border-b border-gray-200">
      <td className="py-3 px-6 text-left flex items-center gap-3">
        <Image src={job.company.profilePicture || ''} width={50} height={50} className="rounded-md" alt={job.company.name} />
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{job.title}</h2>
          <p className="text-xs text-gray-500">{job.company.name}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-left">{job.location}</td>
      <td className="py-3 px-6 text-left font-semibold">${job.salary}</td>
      <td className="py-3 px-6 text-left">{new Date(appliedAt).toLocaleDateString()}</td>
      <td className="py-3 px-6 text-left">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          status === "pending" ? "bg-yellow-100 text-yellow-600" :
          status === "approved" ? "bg-green-100 text-green-600" :
          "bg-red-100 text-red-600"
        }`}>
          {status}
        </span>
      </td>
      <td className="py-3 px-6 text-right">
        <Link href={`/jobs/${job.id}`} className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600">
          View Details
        </Link>
      </td>
    </tr>
  )
};

export default DashboardJobCard;
