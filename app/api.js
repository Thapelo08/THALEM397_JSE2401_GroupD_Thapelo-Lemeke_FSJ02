import { cache } from 'react';

const API_BASE_URL = 'https://next-ecommerce-api.vercel.app';

/**
 * Fetch a list of products from the API with optional parameters.
 * 
 * @param {Object} params - The parameters for fetching products.
 * @param {number} [params.page=1] - The page number for pagination.
 * @param {number} [params.limit=20] - The number of products per page.
 * @param {string} [params.search=''] - The search query for filtering products.
 * @param {string} [params.category=''] - The category for filtering products.
 * @param {string} [params.sortBy='price'] - The field to sort by.
 * @param {string} [params.sortOrder='asc'] - The order of sorting ('asc' or 'desc').
 * @returns {Promise<Object>} An object containing the products, total pages, and total products.
 */
export const fetchProducts = cache(async (params = {}) => {
  const {
    page = 1,
    limit = 20,
    search = '',
    category = '',
    sortBy = 'price',
    sortOrder = 'asc',
  } = params;

  const skip = (page - 1) * limit;
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    search,
    category,
    sortBy,
    order: sortOrder,
  });

  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
    next: { revalidate: 60 }, 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return {
    products: data || [],
    totalPages: data.totalPages || 1,
    totalProducts: data.totalProducts || 0,
  };
});

/**
 * Fetch a single product by its ID from the API.
 * 
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} The product data.
 */
export const fetchProductById = cache(async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
});

/**
 * Fetch the list of product categories from the API.
 * 
 * @returns {Promise<Array>} An array of categories.
 */
export const fetchCategories = cache(async () => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 86400 }, 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
});
