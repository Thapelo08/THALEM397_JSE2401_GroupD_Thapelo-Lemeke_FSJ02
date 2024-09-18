"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: '',
    page: 1
  });

  useEffect(() => {
    const { search, category, sort, page } = router.query;
    setFilters({
      search: search || '',
      category: category || '',
      sort: sort || '',
      page: Number(page) || 1
    });
  }, [router.query]);

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
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    const queryParams = new URLSearchParams(newFilters);
    router.push(`/?${queryParams.toString()}`, undefined, { shallow: true });
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
      <div className="mb-4 flex justify-between items-center">
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {/* Add category options dynamically */}
        </select>
        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset Filters
        </button>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={(page) => updateFilters({ page })} />
        </>
      )}
    </div>
  );
}