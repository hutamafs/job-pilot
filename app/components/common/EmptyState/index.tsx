import { FaInbox } from "react-icons/fa";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "Nothing to show",
  description = "You don’t have any data yet.",
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center text-center py-16 text-gray-500">
    <FaInbox className="text-4xl mb-4 text-gray-400" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm mt-2 max-w-xs">{description}</p>
  </div>
);

export default EmptyState;
