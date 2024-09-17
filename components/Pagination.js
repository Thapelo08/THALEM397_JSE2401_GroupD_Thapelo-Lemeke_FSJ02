'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Pagination component that provides navigation links for paging through content.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number to display and use for navigation.
 * 
 * @returns {JSX.Element} The rendered Pagination component with navigation links.
 *
 * @example
 * // Example usage:
 * const currentPage = 2;
 * return <Pagination currentPage={currentPage} />;
 */
export default function Pagination({ currentPage }) {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center space-x-4 my-12">
            {currentPage > 1 && (
                <Link href={`/?page=${currentPage - 1}`} className="btn btn-secondary">
                    Previous
                </Link>
            )}
            <span className="text-lg font-medium">Page {currentPage}</span>
            <Link href={`/?page=${currentPage + 1}`} className="btn btn-secondary">
                Next
            </Link>
        </div>
    );
}
