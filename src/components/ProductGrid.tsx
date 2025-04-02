'use client';

import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  isAnimated?: boolean;
}

export default function ProductGrid({ products, title, isAnimated = false }: ProductGridProps) {
  // Animation delays for staggered effect (100ms intervals)
  const animationDelays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600', 'delay-700', 'delay-800'];

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`${isAnimated ? 'animate-fadeInUp ' + animationDelays[index % animationDelays.length] : ''}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
} 