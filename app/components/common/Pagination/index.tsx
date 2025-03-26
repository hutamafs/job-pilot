"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HiChevronDoubleLeft, HiChevronLeft, HiChevronRight, HiChevronDoubleRight } from "react-icons/hi2";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getPageNumbers = () => {
    const pages = new Set<number>();
  

    pages.add(currentPage);
  
    if (currentPage + 1 >= totalPages) {
      for (let i = 1; i <= 3; i++) {
        if (currentPage - i > 0) {
          pages.add(currentPage - i);
        }
      }
    }
    for (let i = 1; i <= 3; i++) {
      if (currentPage + i <= totalPages) {
        pages.add(currentPage + i);
      }
    }
  
    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="flex flex-wrap items-center justify-center text-primary500 font-semibold gap-2 mt-4">
      {
        currentPage - 3 > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="hidden sm:flex px-3 py-2 w-[40px] h-[40px] rounded-full bg-gray-200 disabled:opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed items-center justify-center"
          >
            <HiChevronDoubleLeft />
          </button>
            )
      }

      {
        currentPage !== 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 w-[40px] h-[40px] rounded-full bg-gray-200 disabled:opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <HiChevronLeft />
          </button>
        )
      }

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 w-[40px] h-[40px] rounded-full ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {
        currentPage !== totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 w-[40px] h-[40px] rounded-3xl bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 flex items-center justify-center"
          >
            <HiChevronRight />
          </button>
        )
      }

      {
        currentPage + 3 < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="hidden sm:flex px-3 py-2 w-[40px] h-[40px] rounded-full bg-gray-200 disabled:opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed items-center justify-center"
          >
            <HiChevronDoubleRight />
          </button>
        )
      }
    </div>
  );
};

export default Pagination;
