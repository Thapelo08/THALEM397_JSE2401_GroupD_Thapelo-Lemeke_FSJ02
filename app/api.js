
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