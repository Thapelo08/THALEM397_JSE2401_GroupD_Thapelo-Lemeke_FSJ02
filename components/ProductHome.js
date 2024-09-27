"use client";
import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import FilterSort from './FilterSort';

// Fetch products server-side
async function getServerSideProducts(searchParams) {
  const { search, category, order, page } = searchParams;
  const limit = 20;
  const skip = (page - 1) * limit;
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    ...(search && { search }),
    ...(category && { category }),
    ...(order && { order }),
  });

  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?${queryParams}&skip=${skip}&limit=${limit}`, {
    next: { revalidate: 60 }, // Cache the result for 60 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default function ProductHome() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const totalPages = 10;

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('order') || '',
    page: currentPage,
  });

  // Fetch products whenever filters or page changes
  useEffect(() => {
    const fetchClientSideProducts = async () => {
      setLoading(true);
      try {
        const { search, category, sort, page } = filters;
        const limit = 20;
        const skip = (page - 1) * limit;
        const queryParams = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
          ...(search && { search }),
          ...(category && { category }),
          ...(sort && { sort }),
        });

        const response = await fetch(`https://next-ecommerce-api.vercel.app/products?${queryParams}&skip=${skip}&limit=${limit}`, { cache: 'no-store' });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSideProducts();
  }, [filters, currentPage]);

  // Function to update filters and URL parameters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
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

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the state
    updateFilters({ page });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ search: '', category: '', sort: '', page: 1 });
    router.push('/', undefined, { shallow: true });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Explore Our Products</h2>
        <Suspense fallback={<div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
          <SearchBar initialSearch={filters.search} onSearch={(search) => updateFilters({ search })} />
          <FilterSort
            initialCategory={filters.category}
            initialSort={filters.sort}
            onCategoryChange={(category) => updateFilters({ category })}
            onSortChange={(sort) => updateFilters({ sort })}
          />
          <button
            onClick={resetFilters}
            className="bg-gradient-to-r from-pink-500 to-red-700 text-white px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 mt-4"
          >
            Reset Filters
          </button>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                loading={loading}
                products={products}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}
