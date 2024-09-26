// const API_BASE_URL = 'https://next-ecommerce-api.vercel.app';
// export async function fetchProducts(params = {}) {
//   const {
//     page = 1,
//     limit = 200,
//     search = '',
//     category = '',
//     sortBy = 'price',
//     sortOrder = 'asc',
//   } = params;

//   const skip = (page -1) * limit;

//   const queryParams = new URLSearchParams({
//     limit: limit.toString(),
//   skip: skip.toString(),
//   search,
//   category,
//   sortBy,
//   sortOrder,    
//   });

//   const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);

//   if (!response.ok) {
//     throw new Error('Failed to fetch products');
//   }

//   const data = await response.json();
//   return {
//     products: data || [],
//     totalPages: data.totalPages || 1,
//     totalProducts: data.totalProducts || 0,
//   };
// }

// export async function fetchProductById(productId) {
//   const response = await fetch(`${API_BASE_URL}/products/${productId}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch product');
//   }
//   return response.json();
// }

// export async function fetchCategories() {
//   const response = await fetch(`${API_BASE_URL}/categories`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch product');
//   }
//   return response.json();
// }



























export default async function getProduct(productId) {
    try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${productId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error in getProduct:", error);
        return {error};
    }
}


export async function generateMetadata({ params }) {
    const product = await getProduct(params.id);
  
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }
  
    return {
      title: product.title,
      description: product.description,
    };
  }