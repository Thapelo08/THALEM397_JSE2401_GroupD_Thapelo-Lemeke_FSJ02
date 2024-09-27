import { Suspense } from 'react';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import FilterSort from './FilterSort';

async function getServerSideProducts(searchParams) {
  const { search, category, order, page = 1 } = searchParams;
  const limit = 20;
  const skip = (page - 1) * limit;
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    ...(search && { search }),
    ...(category && { category }),
    ...(order && { order }),
  });

  const res = await fetch(`https://next-ecommerce-api.vercel.app/products?${queryParams}`, {
    next: { revalidate: 60 }, // Cache the result for 60 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function ProductHome({ searchParams }) {
  const products = await getServerSideProducts(searchParams);
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = 10; // You might want to calculate this based on total products

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Explore Our Products</h2>
        <Suspense fallback={<div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
          <SearchBar initialSearch={searchParams.search} />
          <FilterSort
            initialCategory={searchParams.category}
            initialSort={searchParams.order}
          />
          <ProductGrid products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            products={products}
          />
        </Suspense>
      </div>
    </div>
  );
}