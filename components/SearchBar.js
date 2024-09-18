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
            
        })
    }

    }