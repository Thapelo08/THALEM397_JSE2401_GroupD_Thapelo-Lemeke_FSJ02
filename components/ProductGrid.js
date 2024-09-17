import ProductCard from './ProductCard';

/**
 * ProductGrid component displays a grid of product cards.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object[]} props.products - An array of product objects to display.
 * @param {string} props.products[].id - The unique identifier of the product.
 * @param {string} props.products[].title - The title of the product.
 * @param {string} props.products[].description - A brief description of the product.
 * @param {string[]} props.products[].images - Array of image URLs for the product.
 * @param {number} props.products[].price - The price of the product.
 * @param {number} props.products[].rating - The rating of the product out of 5.
 * @param {string} props.products[].category - The category of the product.
 * @param {number} props.products[].stock - The stock count of the product.
 *
 * @returns {JSX.Element} The rendered ProductGrid component with a grid of product cards.
 *
 * @example
 * const products = [
 *   {
 *     id: '1',
 *     title: 'Product 1',
 *     description: 'Description of product 1',
 *     images: ['image1.jpg'],
 *     price: 29.99,
 *     rating: 4.5,
 *     category: 'Electronics',
 *     stock: 10
 *   },
 *   {
 *     id: '2',
 *     title: 'Product 2',
 *     description: 'Description of product 2',
 *     images: ['image2.jpg'],
 *     price: 49.99,
 *     rating: 4.0,
 *     category: 'Home',
 *     stock: 5
 *   }
 * ];
 * return <ProductGrid products={products} />;
 */
export default function ProductGrid({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
