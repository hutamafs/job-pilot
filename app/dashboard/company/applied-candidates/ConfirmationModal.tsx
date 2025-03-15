"use client";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/components";
import { useNotif } from "@/app/context/NotificationProvider";
import { JobApplication } from "@/app/types";
import { updateApplicationStatus } from "@/app/utils/company/query";

interface PendingMove {
  item: JobApplication;
  to: string;
}

interface ConfirmationModalProps {
  setIsOpen: (isOpen: boolean) => void;
  pendingMove: PendingMove;
  setPendingMove: (pendingMove: PendingMove | null) => void;
  backupColumnsRef: React.MutableRefObject<Record<string, JobApplication[]>>;
  previousStatus: string | null;
  setColumns: (columns: Record<string, JobApplication[]>) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  setIsOpen,
  pendingMove,
  setPendingMove,
  previousStatus,
  setColumns,
  backupColumnsRef,
}) => {
  const router = useRouter();
  const { setNotif } = useNotif();

  const handleUpdateStatus = async () => {
    try {
      if (pendingMove) {
        const { item, to } = pendingMove;
        const { success, error } = await updateApplicationStatus(item.id, to);
        if (success) {
          router.refresh();
          setNotif(
            "success",
            `Job Application ${item.job.title} for ${item.candidate.name} has been updated to ${to}`
          );
        } else {
          throw new Error(error);
        }
      }
    } catch (error) {
      setColumns(backupColumnsRef.current);
      setNotif("error", (error as Error).message);
    } finally {
      setIsOpen(false);
      setPendingMove(null);
    }
  };

  const handleRollbackStatus = async () => {
    setColumns(backupColumnsRef.current);
    setPendingMove(null);
    setIsOpen(false);
  };

  return (
    <Modal closeModal={() => setIsOpen(false)}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Confirmation</h2>
        <p className="text-gray-700 text-center mb-6">
          {`Are you sure to move ${pendingMove.item.candidate.name} from ${previousStatus} to ${pendingMove.to}?`}
        </p>
        <div className="flex gap-x-4">
          <button
            onClick={handleUpdateStatus}
            className="w-24 py-2 bg-primary500 text-white rounded-md hover:bg-primary600 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={handleRollbackStatus}
            className="w-24 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
