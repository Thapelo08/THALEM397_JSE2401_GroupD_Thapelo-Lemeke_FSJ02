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

    }