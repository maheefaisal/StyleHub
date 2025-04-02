'use client';

import { products } from '@/lib/products';
import ProductGrid from './ProductGrid';
import AnimatedSection from './AnimatedSection';

export default function FeaturedProducts() {
  // Get 4 random products to display as featured products
  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection 
          animation="fadeInBlur" 
          className="text-center mb-12"
          threshold={0.3}
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Discover our handpicked selection of trending items for this season. Quality clothing for men and women, designed for style and comfort.
          </p>
        </AnimatedSection>

        <AnimatedSection 
          animation="slideInUp" 
          delay={0.2}
          threshold={0.1}
          staggerChildren={true}
          staggerDelay={0.15}
        >
          <ProductGrid products={featuredProducts} isAnimated={true} />
        </AnimatedSection>
      </div>
    </div>
  );
} 