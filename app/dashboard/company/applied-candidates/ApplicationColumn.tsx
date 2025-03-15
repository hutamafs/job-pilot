"use client";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { JobApplication } from "@/app/types";
import SortableApplicationCard from "./ApplicationCard";

const ApplicationColumn = ({
  id,
  applications,
}: {
  id: string;
  applications: JobApplication[];
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-full min-w-[225px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
        {id} ({applications.length})
      </h2>
      <SortableContext
        items={applications.map((app) => app.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-4">
          {applications.map((app) => (
            <SortableApplicationCard key={app.id} application={app} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default ApplicationColumn;
