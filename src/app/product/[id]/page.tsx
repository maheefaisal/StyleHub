'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '@/lib/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cartContext';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  // Handle product not found scenario
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The product you are looking for does not exist.
            </p>
            <Link 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumb navigation */}
        <div className="bg-gray-100 dark:bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Home
              </Link>
              <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
              <Link href={`/category/${product.category}`} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 capitalize">
                {product.category}
              </Link>
              <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white">{product.name}</span>
            </nav>
          </div>
        </div>
        
        {/* Product details */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product image */}
              <div className="relative h-96 md:h-full overflow-hidden rounded-lg">
                {/* Placeholder for image errors */}
                <div className="absolute inset-0 image-placeholder flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-2xl font-medium">
                    Product Image
                  </span>
                </div>
                
                {!imageError && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    priority
                  />
                )}
              </div>
              
              {/* Product info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                
                <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  ${product.price.toFixed(2)}
                </div>
                
                <div className="prose prose-sm text-gray-500 dark:text-gray-300 mb-8">
                  <p>{product.description}</p>
                </div>
                
                {/* Product options */}
                <div className="mb-8">
                  {/* Size selector */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                            ${selectedSize === size 
                              ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Color selector */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                            ${selectedColor === color 
                              ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                
                {/* Additional info */}
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p className="mb-2">• Free shipping on orders over $100</p>
                    <p className="mb-2">• 30-day return policy</p>
                    <p>• Product ID: {product.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 