import React, { Dispatch } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-3 text-stone-800 font-medium">
      {/* Previous Button */}
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border transition ${
          currentPage === 1
            ? "border-stone-300 text-stone-400 cursor-not-allowed"
            : "border-red-500 hover:bg-red-100"
        }`}
      >
        ← 
      </button>

      {/* Page Info */}
      <span
        className="px-4 py-1 bg-white
       border-red-800 border-[1px] rounded-md"
      >
        {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border transition ${
          currentPage === totalPages
            ? "border-stone-300 text-stone-400 cursor-not-allowed"
            : "border-red-500 hover:bg-red-100"
        }`}
      >
         →
      </button>
    </div>
  );
}
