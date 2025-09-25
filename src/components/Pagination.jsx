import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Pagination = ({ currentPage, totalCount, perPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / perPage);

  if (totalPages <= 1) return null;

  // const handleClick = (page) => {
  //   if (page >= 1 && page <= totalPages && page !== currentPage) {
  //     onPageChange(page);
  //   }
  // };

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);

      // Scroll to top smoothly after page change
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    range.forEach((page, index) => {
      if (page === "...") {
        pageNumbers.push(
          <li
            key={`ellipsis-${index}`}
            className="hidden sm:flex w-9 h-9 items-center justify-center text-gray-400 select-none"          >
            ...
          </li>
        );
      } else {
        pageNumbers.push(
          <li key={page}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick(Number(page));
              }}
              className={`w-9 h-9 flex items-center justify-center rounded-md border text-sm font-medium transition-colors
                ${currentPage === page
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                }`}
            >
              {page}
            </Link>
          </li>
        );
      }
    });

    return pageNumbers;
  };

  return (
    <div className="flex justify-center py-6">
      <ul className="flex items-center gap-2 flex-wrap md:flex-nowrap overflow-x-auto scrollbar-hide max-w-full">
        <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick(currentPage - 1);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors
              ${currentPage === 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-gray-700 border-gray-300 hover:bg-black hover:text-white hover:border-black"
              }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </li>
        {renderPageNumbers()}
        <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick(currentPage + 1);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors
              ${currentPage === totalPages
                ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-gray-700 border-gray-300 hover:bg-black hover:text-white hover:border-black"
              }`}
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
