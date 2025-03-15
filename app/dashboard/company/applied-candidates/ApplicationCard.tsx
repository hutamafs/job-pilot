import Image from "next/image";
import Link from "next/link";
import { CSS } from "@dnd-kit/utilities";
import { JobApplication } from "@/app/types";

import { useSortable } from "@dnd-kit/sortable";

const ApplicationCard = ({ application }: { application: JobApplication }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md border border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          width={48}
          height={48}
          src={application.candidate.profilePicture}
          alt={application.candidate.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {application.candidate.name}
          </h3>
          <p className="text-sm text-gray-500">{application.candidate.role}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Experience:</span>{" "}
          {application.candidate.experience} Years
        </p>
        <p>
          <span className="font-medium">Education:</span>{" "}
          {application.candidate.education}
        </p>
        <p>
          <span className="font-medium">Applied:</span>{" "}
          {(new Date(application.appliedAt), "MMM dd, yyyy")}
        </p>
      </div>
      <div className="mt-3">
        <Link
          href={application.candidate.profilePicture}
          className="text-blue-600 text-sm font-medium underline hover:text-red-800 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </Link>
      </div>
    </div>
  );
};

const SortableApplicationCard = ({
  application,
}: {
  application: JobApplication;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
    >
      <ApplicationCard application={application} />
    </div>
  );
};

export default SortableApplicationCard;
