/**
 * Fetches product details from the API based on the provided product ID.
 *
 * @async
 * @function getProduct
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the product data or an error object.
 * @throws {Error} - Throws an error if the fetch operation fails or if the response is not OK.
 *
 * @example
 * const product = await getProduct('12345');
 * console.log(product);
 */
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
