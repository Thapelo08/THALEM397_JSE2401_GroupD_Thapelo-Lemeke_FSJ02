/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import getProduct from '../../api';



/**
 * ProductPage component that displays detailed information about a single product.
 * 
 * @component
 * @example
 * return (
 *   <ProductPage />
 * )
 */
export default function ProductPage() {
    /**
     * State for holding the product details.
     * @type {Object}
     */
    const [singleProduct, setSingleProduct] = useState({});

    /**
     * State for handling errors during data fetching.
     * @type {string|null}
     */
    const [error, setError] = useState(null);

    /**
     * State for managing the loading state of the product data.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(false);

    /**
     * State for managing the index of the currently displayed image.
     * @type {number}
     */
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    /**
     * State for handling image loading errors.
     * @type {boolean}
     */
    const [imageError, setImageError] = useState(false);

    /**
     * Extracts the product ID from the URL parameters.
     * @type {string}
     */
    const { id } = useParams();
    const paramid = id;

    /**
     * Fetches the product data when the component mounts or when the product ID changes.
     */
    useEffect(() => {
        if (!paramid) {
            console.error("ID is missing.");
            return;
        }

        /**
         * Asynchronously fetches the product data and handles errors.
         */
        const fetchData = async () => {
            setLoading(true);
            try {
                const product = await getProduct(paramid);
                if (product.error) {
                    setError(product.error);
                } else {
                    setSingleProduct(product);
                }
            } catch (err) {
                console.error("Fetch failed:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [paramid]);

    /**
     * Array of image URLs to display, with a placeholder image if there is an error or no images are available.
     * @type {string[]}
     */
    const images = !imageError && singleProduct.images && singleProduct.images.length > 0 
        ? singleProduct.images 
        : ['/placeholder-image.jpg'];

    /**
     * Advances to the next image in the image array.
     */
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1 
        );
    };

    /**
     * Moves to the previous image in the image array.
     */
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1 
        );
    };

    // Render error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Oops! Something went wrong.</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">We couldn't load the product you requested. Please try again later.</p>
                <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                    Back to Products
                </Link>
            </div>
        );
    }

    // Render loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-gray-600 dark:text-gray-300">Loading product details...</p>
            </div>
        );
    }

    // Render product details
    return ( 
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200 mb-8">
                ← Back to Products
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image 
                        src={images[currentImageIndex]} 
                        alt={singleProduct.title}
                        fill
                        style={{ objectFit: 'contain' }}
                        onError={() => setImageError(true)}
                    />
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                            <button onClick={prevImage} className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button onClick={nextImage} className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{singleProduct.title}</h1>
                    <p className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">${singleProduct.price?.toFixed(2)}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{singleProduct.description}</p>
                    <p className="mb-2"><span className="font-semibold text-gray-700 dark:text-gray-200">Category:</span> <span className="text-gray-600 dark:text-gray-300">{singleProduct.category}</span></p>
                    <p className="mb-2"><span className="font-semibold text-gray-700 dark:text-gray-200">Rating:</span> <span className="text-gray-600 dark:text-gray-300">{singleProduct.rating}/5</span></p>
                    <p className="mb-4">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Stock:</span> 
                        <span className={`ml-2 ${singleProduct.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {singleProduct.stock > 0 ? `${singleProduct.stock} available` : 'Out of stock'}
                        </span>
                    </p>
                    <div className="mb-6">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Tags:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {singleProduct.tags && singleProduct.tags.length > 0 ? (
                            singleProduct.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))
                           ) : (
                            <p className="text-gray-500 dark:text-gray-400">No tags available</p>
                           )}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Reviews</h2>
                    {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
                        singleProduct.reviews.map((review, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{review.reviewerName}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                                <p><span className="font-semibold text-gray-700 dark:text-gray-200">Rating:</span> <span className="text-yellow-500">{review.rating}/5</span></p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No reviews available</p> 
                    )}
                </div>
            </div>
        </div>
    );
}
