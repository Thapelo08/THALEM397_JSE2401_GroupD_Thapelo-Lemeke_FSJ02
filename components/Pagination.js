'use client';

import { useState, useEffect } from 'react';

export default function Pagination({ currentPage, totalPages, loading, products = [], onPageChange }) {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);  // Trigger page change in the parent component
  };

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={() => handlePagination(Math.max(1, page - 1))}
        disabled={page === 1 || loading}
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Previous"}
      </button>
      <span className="font-semibold text-gray-700">Page {page}</span>
      <button
        onClick={() => handlePagination(page + 1)}
        disabled={page >= totalPages || loading}
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Next"}
      </button>
    </div>
  );
}
