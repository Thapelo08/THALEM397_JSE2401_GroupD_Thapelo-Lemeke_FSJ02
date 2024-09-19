"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import FilterSort from '../components/FilterSort';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '',
    page: Number(searchParams.get('page')) || 1
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { search, category, sort, page } = filters;
      const limit = 20;
      const skip = (page - 1) * limit;
      const queryParams = new URLSearchParams({
        limit,
        skip,
        ...(search && { search }),
        ...(category && { category }),
        ...(sort && { sort })
      });

      const response = await fetch(`https://next-ecommerce-api.vercel.app/products?${queryParams}`, { cache: 'no-store' });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    updateURL(newFilters);
  };

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`/?${newParams.toString()}`, undefined, { shallow: true });
  };

  const resetFilters = () => {
    setFilters({ search: '', category: '', sort: '', page: 1 });
    router.push('/', undefined, { shallow: true });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Discover Our Products</h1>
      <SearchBar initialSearch={filters.search} onSearch={(search) => updateFilters({ search })} />
      <FilterSort 
        initialCategory={filters.category}
        initialSort={filters.sort}
        onCategoryChange={(category) => updateFilters({ category })}
        onSortChange={(sort) => updateFilters({ sort })}
      />
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-4"
      >
        Reset Filters
      </button>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination 
            currentPage={filters.page} 
            totalPages={totalPages} 
            onPageChange={(page) => updateFilters({ page })} 
          />
        </>
      )}
    </div>
  );
}