'use client'

import { usePagination } from "@/app/hooks/usePagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

export default function PaginationComponent() {
  const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } = 
    usePagination({ data: items, itemsPerPage: 5 });

  return (
    <div className="p-4 flex flex-col items-center">
      {/* <ul className="mb-4 space-y-2">
        {currentData.map((item, index) => (
          <li key={index} className="border p-2">{item}</li>
        ))}
      </ul> */}

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all"
        >
          <FaChevronLeft className="text-gray-500" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center text-sm rounded-full 
              ${currentPage === i + 1 ? "bg-blue-600 text-white font-bold" : "bg-gray-100 text-gray-600"}
              hover:bg-gray-200 transition-all`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-all"
        >
          <FaChevronRight className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
