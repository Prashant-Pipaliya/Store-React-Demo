import React from "react";

const Pagination = ({ page, totalCount, onPageChange, limit }) => {
  const totalPages = Math.ceil(totalCount / limit);
  const visiblePages = 3;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, page + Math.floor(visiblePages / 2));

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-end mb-4">
      <div className="pagination flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded-md text-sm"
        >
          Prev
        </button>

        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof number === "number") {
                onPageChange(number);
              }
            }}
            className={`px-3 py-1 border rounded-md text-sm ${
              number === page
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded-md text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
