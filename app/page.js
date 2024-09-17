import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

/**
 * Home component that fetches and displays a paginated list of products.
 *
 * @async
 * @function Home
 * @param {Object} props - The component props.
 * @param {Object} props.searchParams - The search parameters used for pagination.
 * @param {string} props.searchParams.page - The current page number from the URL search parameters.
 * 
 * @returns {Promise<JSX.Element>} The rendered Home component with a list of products and pagination controls.
 * 
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not OK.
 * 
 * @example
 * // Example usage:
 * const searchParams = { page: '2' };
 * return <Home searchParams={searchParams} />;
 */
export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const response = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const products = await response.json();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Discover Our Products</h1>
      <ProductGrid products={products} />
      <Pagination currentPage={page} />
    </div>
  );
}
