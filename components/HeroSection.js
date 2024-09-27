import React from 'react';
import { ShoppingCart } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-red-700 text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8">
              Find the best deals on high-quality items from our wide range of products.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300 flex items-center">
              <ShoppingCart className="mr-2" />
              Start Shopping
            </button>
          </div>
          <div className="hidden lg:block">
            <img 
              src="/api/placeholder/600/400" 
              alt="Featured Products" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;