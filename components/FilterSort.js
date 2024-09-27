import { useState, useEffect } from 'react';

export default function FilterSort({ initialCategory = '', initialSort = '', onCategoryChange, onSortChange }) {
    const [categories, setCategories] = useState([]);
    

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://next-ecommerce-api.vercel.app/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <select
                value={initialCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-4 py-2 border rounded-md"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <select
                value={initialSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-4 py-2 border rounded-md"
            >
                <option value="">Sort by</option>
                
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    );
}