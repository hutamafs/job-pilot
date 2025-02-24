'use client'
import { usePathname } from "next/navigation";

import { FiBookmark } from "react-icons/fi";

// complete action here later when wiring

const ActionComponent = () => {
  const pathname = usePathname();
  console.log(pathname, 10);
  const handleSaveJob = () => {
    console.log('save job')
  }

  const handleApplyNow = () => {
    console.group('applying')
  }

  return (
    <div className="flex justify-end gap-4">
      {
        pathname.includes('/jobs') && (
          <button
            onClick={handleSaveJob}
            className="flex items-center justify-center bg-gray-100 text-primary500 px-4 py-2 rounded-lg">
              <FiBookmark size={20} />
          </button>
        )
      }
      <button
        onClick={handleApplyNow}
        className="w-full bg-blue-600 text-white p-2 md:p-4 rounded-lg hover:bg-blue-700 transition">
        { pathname.includes('/jobs') ? 'Apply Now →' : 'View Open Positions' }
      </button>
    </div>
  )
};

export default ActionComponent;
