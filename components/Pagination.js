'use client';

import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, hasMore = true }) {
const generatePageLink = (page) => `/page=${page}`;

    return (
        <div className="flex justify-center items-center space-x-4 my-12">
            {currentPage > 1 && (
                <Link 
                    href={generatePageLink(currentPage - 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                    Previous
                </Link>
            )}
            <span className="text-lg font-medium">Page {currentPage}</span>
            {( currentPage < totalPages || hasMore) && (
                <Link 
                    href={generatePageLink(currentPage + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                    Next
                </Link>
            )}
        </div>
    );
}