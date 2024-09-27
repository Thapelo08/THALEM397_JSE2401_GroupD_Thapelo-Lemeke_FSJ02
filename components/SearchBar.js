'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar({ initialSearch = '' }) {
    const [search, setSearch] = useState(initialSearch);
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        updateURL({ search });
    };

    const updateURL = (params) => {
        const currentParams = new URLSearchParams(window.location.search);
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                currentParams.set(key, value);
            } else {
                currentParams.delete(key);
            }
        });
        router.push(`/?${currentParams.toString()}`, undefined, { shallow: true });
    };
  
    return (
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 pr-16 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400"
                > 
                    Search
                </button>
            </div>
        </form>
    );
}