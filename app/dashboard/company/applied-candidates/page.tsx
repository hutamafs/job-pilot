"use client";
import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import ApplicationColumn from "./ApplicationColumn";
import ApplicationCard from "./ApplicationCard";
import { getAllJobApplications } from "@/app/utils/company/query";
import { JobApplication } from "@/app/types";
import ConfirmationModal from "./ConfirmationModal";
import { LoadingSpinner } from "@/app/components";

const ApplicationsBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState<Record<string, JobApplication[]>>({
    applied: [],
    interviewed: [],
    rejected: [],
    shortlisted: [],
  });
  const backupColumnsRef = useRef<Record<string, JobApplication[]>>(columns);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingMove, setPendingMove] = useState<{
    item: JobApplication;
    to: string;
  } | null>(null);
  const [previousStatus, setPreviousStatus] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllJobApplications();
        const jobApplications = data || [];

        const grouped = jobApplications.reduce(
          (acc: Record<string, JobApplication[]>, app: JobApplication) => {
            const status: string = app.status.toLowerCase();
            acc[status] = acc[status] ? [...acc[status], app] : [app];
            return acc;
          },
          {
            applied: [],
            interviewed: [],
            rejected: [],
            shortlisted: [],
          } as Record<string, JobApplication[]>
        );

        setColumns(grouped);
        backupColumnsRef.current = grouped;
      } catch (error) {
        console.error("Failed to fetch job applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // only start dragging if pointer moves 8+ pixels
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string) => {
    return Object.keys(columns).find((key) =>
      columns[key].some((app) => app.id === id)
    );
  };

  const findStatus = (id: string) => {
    Object.keys(columns).forEach((key) => {
      const app = columns[key].find((app) => app.id === id);
      if (app) {
        setPreviousStatus(key);
      }
    });
  };

  const activeApp =
    Object.values(columns)
      .flat()
      .find((app) => app.id === activeId) || null;

  return isLoading ? (
    <LoadingSpinner />
  ) : isMobile ? (
    <div className="space-y-6 pb-6">
      {Object.entries(columns).map(([status, apps]) => (
        <div key={status} className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
            {status} ({apps.length})
          </h2>
          <div className="space-y-4">
            {apps.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={({ active }) => {
        setActiveId(active.id as string);
        if (active) {
          findStatus(active.id as string);
        }
      }}
      onDragOver={({ active, over }) => {
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId) || overId; // fallback if overId is a container itself
        if (
          !activeContainer ||
          !overContainer ||
          activeContainer === overContainer
        ) {
          return;
        }

        setColumns((prev) => {
          const activeItem = prev[activeContainer].find(
            (item) => item.id === activeId
          );
          if (!activeItem) return prev;

          const newSource = prev[activeContainer].filter(
            (item) => item.id !== activeId
          );
          const overItems = prev[overContainer];
          const overIndex = overItems.findIndex((item) => item.id === overId);

          const isOverContainerItself = overIndex === -1;
          const insertIndex = isOverContainerItself
            ? overItems.length
            : overIndex;

          const newTarget = [...overItems];
          newTarget.splice(insertIndex, 0, {
            ...activeItem,
            status: overContainer,
          });

          setPendingMove({
            item: activeItem,
            to: overContainer,
          });

          return {
            ...prev,
            [activeContainer]: newSource,
            [overContainer]: newTarget,
          };
        });
      }}
      onDragEnd={() => {
        if (previousStatus !== pendingMove?.to) {
          setIsOpen(true);
        }
        setActiveId(null);
      }}
    >
      <div className="flex gap-4 overflow-x-auto px-4 pb-6">
        {Object.entries(columns).map(([status, apps]) => (
          <ApplicationColumn key={status} id={status} applications={apps} />
        ))}
      </div>
      {isOpen && pendingMove && (
        <ConfirmationModal
          setIsOpen={setIsOpen}
          pendingMove={pendingMove}
          setPendingMove={setPendingMove}
          backupColumnsRef={backupColumnsRef}
          setColumns={setColumns}
          previousStatus={previousStatus}
        />
      )}
      <DragOverlay>
        {activeApp ? <ApplicationCard application={activeApp} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ApplicationsBoard;
