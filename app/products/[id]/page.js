"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import getProduct from '../../api'; // Assuming this is your product fetching API.

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [sortReviewsBy, setSortReviewsBy] = useState('date');

  const { id } = params || useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!id) {
      console.error("ID is missing.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await getProduct(id);
        if (fetchedProduct.error) {
          setError(fetchedProduct.error);
        } else {
          setProduct(fetchedProduct);
        }
      } catch (err) {
        console.error("Fetch failed:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const images = !imageError && product?.images && product.images.length > 0
    ? product.images
    : ['/placeholder-image.jpg'];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const sortedReviews = product?.reviews
    ? [...product.reviews].sort((a, b) => {
        if (sortReviewsBy === 'date') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortReviewsBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      })
    : [];

  const handleBackToProducts = () => {
    const currentParams = new URLSearchParams(searchParams);
    router.push(`/?${currentParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBackToProducts}
          className="bg-gradient-to-r from-pink-500 to-red-700 text-white inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 mb-8"
        >
          ← Back to Products
        </button>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Oops! Something went wrong.</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">We couldn't load the product you requested. Please try again later.</p>
            <button
              onClick={handleBackToProducts}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={images[currentImageIndex]}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
                onError={() => setImageError(true)}
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <button
                    onClick={prevImage}
                    className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{product.title}</h1>
              <p className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">${product.price?.toFixed(2)}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">Rating:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">{product.rating}/5</span>
                </div>
              </div>
              <p className="mb-4">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Category:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">{product.category}</span>
              </p>
              <p className="mb-6">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Stock:</span>
                <span
                  className={`ml-2 ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </p>
              <button
                className="flex items-center bg-gradient-to-r from-pink-500 to-red-700 text-white justify-center w-full  text-white px-6 py-3 rounded-full  transition-colors duration-200"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {product?.reviews?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Customer Reviews</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700 dark:text-gray-700">
                {product.reviews.length} review(s)
              </span>
              <select
                value={sortReviewsBy}
                onChange={(e) => setSortReviewsBy(e.target.value)}
                className="bg-gradient-to-r from-pink-500 to-red-700 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full"
              >
                <option value="date">Sort by Date</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <div key={review.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mr-2">{review.author}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
