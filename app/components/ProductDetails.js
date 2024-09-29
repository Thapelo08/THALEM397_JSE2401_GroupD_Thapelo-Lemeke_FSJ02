"use client";

import { useState, useEffect } from 'react';

/**
 * Navigate back to the previous page.
 */
function goBack() {
  window.history.back();
}

/**
 * ProductDetail component to display detailed information about a specific product.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.product - The product object containing its details.
 * 
 * @returns {JSX.Element} The rendered ProductDetail component.
 */
export function ProductDetail({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reviewSort, setReviewSort] = useState('date-desc');

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  /**
   * Change to the previous image in the product gallery.
   */
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  /**
   * Change to the next image in the product gallery.
   */
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Set the current image index when an image thumbnail is clicked.
   * 
   * @param {number} index - The index of the image to display.
   */
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  /**
   * Render star ratings based on the product's rating.
   * 
   * @param {number} rating - The rating of the product.
   * @returns {JSX.Element[]} An array of JSX elements representing stars.
   */
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-400">&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i} className="text-gray-300">&#9733;</span>); // Empty star
      }
    }
    return stars;
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const sortedReviews = product.reviews.slice().sort((a, b) => {
    switch (reviewSort) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'rating-desc':
        return b.rating - a.rating;
      case 'rating-asc':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={goBack}
          className="bg-gradient-to-r from-pink-500 to-red-700 text-white inline-block px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-200 mb-8"
        >
          ← Back to Products
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.images[currentImageIndex]}
              className="w-full h-full object-cover"
              alt={`Image of ${product.title}`}
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={handlePrevImage}
                  className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                  aria-label="Next image"
                >
                  &gt;
                </button>
              </div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`h-16 w-16 object-cover cursor-pointer ${currentImageIndex === index ? 'border-2 border-pink-600' : 'border'}`}
                  onClick={() => handleImageClick(index)}
                  alt={`Thumbnail of ${product.title} image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{product.title}</h1>
            <p className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">R{product.price.toFixed(2)}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Category: {product.category}
            </p>
            <div className="flex items-center mb-4">
              <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">Rating:</span>
              <div className="flex items-center">{renderStars(product.rating)}</div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Stock: {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400 ml-2">{product.stock} available</span>
              ) : (
                <span className="text-red-600 dark:text-red-400 ml-2">Out of Stock</span>
              )}
            </p>
            <button
              className="bg-gradient-to-r from-pink-500 to-red-700 text-white px-6 py-3 rounded-full transition-colors duration-200"
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Customer Reviews</h2>
          <select
            value={reviewSort}
            onChange={(e) => setReviewSort(e.target.value)}
            className="bg-gradient-to-r from-pink-500 to-red-700 text-white px-4 py-2 rounded-full"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="rating-desc">Highest Rating First</option>
            <option value="rating-asc">Lowest Rating First</option>
          </select>
          <div className="mt-6 space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mr-2">{review.author}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
