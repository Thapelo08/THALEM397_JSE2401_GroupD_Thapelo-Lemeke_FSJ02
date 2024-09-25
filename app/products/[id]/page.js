"use client";

import {  useEffect, useState } from 'react';
import {  useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import getProduct from '../../api'; // Assuming this is your product fetching API.


export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [sortReviewsBy, setSortReviewsBy] = useState('date');

  // If fetching params.id from the client side
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Oops! Something went wrong.</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">We couldn't load the product you requested. Please try again later.</p>
        <button
          onClick={handleBackToProducts}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 dark:text-gray-300">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBackToProducts}
        className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200 mb-8"
      >
        ← Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
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
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
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
          <p className="mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Category:</span> <span className="text-gray-600 dark:text-gray-300">{product.category}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Rating:</span> <span className="text-gray-600 dark:text-gray-300">{product.rating}/5</span>
          </p>
          <p className="mb-4">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Stock:</span>
            <span
              className={`ml-2 ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </p>
          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
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
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Reviews</h2>
            <select
              value={sortReviewsBy}
              onChange={(e) => setSortReviewsBy(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
          {sortedReviews && sortedReviews.length > 0 ? (
            sortedReviews.map((review, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{review.author}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                <p className="font-semibold text-green-600 dark:text-green-400 mt-2">Rating: {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
