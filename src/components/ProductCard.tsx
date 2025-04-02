'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/lib/products';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // To fix the hydration error, we'll initialize these states only on the client side
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  // Wait until component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickAdd = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset the "Added" indicator after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        {/* Placeholder image with gradient background when no image is available or image fails to load */}
        <div className="absolute inset-0 image-placeholder flex items-center justify-center">
          {/* Only render this content when mounted to avoid hydration mismatch */}
          {mounted && (
            <span className="text-gray-400 dark:text-gray-500 text-lg font-medium">
              {product.name[0]}
            </span>
          )}
        </div>
        {(!imageError && mounted) && (
          <div className={`relative h-full w-full transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority
            />
          </div>
        )}
        
        {/* Quick add to cart button */}
        <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 px-4 transition-all duration-300 flex justify-center ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button 
            onClick={handleQuickAdd}
            className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-300 focus:outline-none"
          >
            {isAdded ? (
              <>
                <Check size={16} className="text-green-400 animate-pop" />
                <span className="text-green-400">Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} className={isHovered ? "animate-pop" : ""} />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <p className={`text-lg font-semibold text-gray-900 dark:text-white ${isHovered ? 'text-blue-600 dark:text-blue-400' : ''} transition-colors duration-300`}>
            ${product.price.toFixed(2)}
          </p>
          
          <span className={`text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full capitalize transition-all duration-300 ${isHovered ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : ''}`}>
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
} 