import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar({ initialSearch = ''}) {
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
        <form onSubmit={handleSearch} className="mb-4">
            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
        </form>
     )

    }