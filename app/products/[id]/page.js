import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, ShoppingCart } from 'lucide-react';
import getProduct from '../../api';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold mb-4 text-green-600">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="font-semibold mr-2">Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-gray-600">{product.rating}/5</span>
            </div>
          </div>
          <p className="mb-4">
            <span className="font-semibold">Category:</span>
            <span className="ml-2">{product.category}</span>
          </p>
          <p className="mb-6">
            <span className="font-semibold">Stock:</span>
            <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </p>
          <button
            className="flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-red-700 text-white px-6 py-3 rounded-full transition-colors duration-200"
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="mr-2" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}