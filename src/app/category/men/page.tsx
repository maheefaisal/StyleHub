'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import PriceRangeFilter from '@/components/PriceRangeFilter';
import AnimatedSection from '@/components/AnimatedSection';
import { Filter } from 'lucide-react';

// Sample product data
const menProducts = [
  {
    id: 1,
    name: 'Classic Fit T-Shirt',
    price: 29.99,
    image: '/products/men-tshirt-1.jpg',
    category: 'T-Shirts'
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 59.99,
    image: '/products/men-jeans-1.jpg',
    category: 'Jeans'
  },
  {
    id: 3,
    name: 'Cotton Hoodie',
    price: 49.99,
    image: '/products/men-hoodie-1.jpg',
    category: 'Hoodies'
  },
  {
    id: 4,
    name: 'Dress Shirt',
    price: 45.99,
    image: '/products/men-shirt-1.jpg',
    category: 'Shirts'
  },
  {
    id: 5,
    name: 'Cargo Shorts',
    price: 34.99,
    image: '/products/men-shorts-1.jpg',
    category: 'Shorts'
  },
  {
    id: 6,
    name: 'Leather Jacket',
    price: 199.99,
    image: '/products/men-jacket-1.jpg',
    category: 'Jackets'
  },
  {
    id: 7,
    name: 'Sport T-Shirt',
    price: 24.99,
    image: '/products/men-tshirt-2.jpg',
    category: 'T-Shirts'
  },
  {
    id: 8,
    name: 'Winter Coat',
    price: 129.99,
    image: '/products/men-coat-1.jpg',
    category: 'Coats'
  }
];

export default function MenPage() {
  // Calculate the min and max prices from products
  const allPrices = menProducts.map(product => product.price);
  const minProductPrice = Math.floor(Math.min(...allPrices));
  const maxProductPrice = Math.ceil(Math.max(...allPrices));

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState(menProducts);
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>([
    minProductPrice,
    maxProductPrice
  ]);
  const [isResetActive, setIsResetActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products by price
  const filterByPrice = (min: number, max: number) => {
    const filtered = menProducts.filter(
      product => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
    setCurrentPriceRange([min, max]);
    setIsResetActive(min !== minProductPrice || max !== maxProductPrice);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilteredProducts(menProducts);
    setCurrentPriceRange([minProductPrice, maxProductPrice]);
    setIsResetActive(false);
  };

  // Handle price range changes
  const handlePriceChange = (min: number, max: number) => {
    filterByPrice(min, max);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        {/* Page header */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInBlur" threshold={0.3}>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                Men's Collection
              </h1>
              <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our range of men's clothing, from casual everyday wear to formal attire.
                Quality materials and comfortable designs for the modern man.
              </p>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Products section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar with filters */}
              <div className="lg:w-1/4">
                <div className="lg:hidden mb-4">
                  <button
                    className="flex items-center justify-between w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <span className="flex items-center text-gray-800 dark:text-white font-medium">
                      <Filter className="w-5 h-5 mr-2" />
                      Filters
                    </span>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      {filteredProducts.length} items
                    </span>
                  </button>
                </div>
                
                <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                  <div className="sticky top-24">
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Filters</h2>
                      <button
                        onClick={resetFilters}
                        className={`text-sm ${
                          isResetActive
                            ? 'text-blue-600 hover:text-blue-800'
                            : 'text-gray-400 cursor-not-allowed'
                        } mb-4`}
                        disabled={!isResetActive}
                      >
                        Reset All Filters
                      </button>
                    </div>

                    <PriceRangeFilter
                      minPrice={minProductPrice}
                      maxPrice={maxProductPrice}
                      onPriceChange={handlePriceChange}
                      currentMin={currentPriceRange[0]}
                      currentMax={currentPriceRange[1]}
                    />

                    {/* Price breakdown */}
                    <AnimatedSection 
                      animation="fadeInUp" 
                      delay={0.2} 
                      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Price Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Budget (Under $30)</span>
                          <span className="text-gray-900 dark:text-white">
                            {menProducts.filter(p => p.price < 30).length} items
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Mid-range ($30 - $60)</span>
                          <span className="text-gray-900 dark:text-white">
                            {menProducts.filter(p => p.price >= 30 && p.price <= 60).length} items
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Premium ($60 - $100)</span>
                          <span className="text-gray-900 dark:text-white">
                            {menProducts.filter(p => p.price > 60 && p.price <= 100).length} items
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Luxury (Over $100)</span>
                          <span className="text-gray-900 dark:text-white">
                            {menProducts.filter(p => p.price > 100).length} items
                          </span>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
              
              {/* Products grid */}
              <div className="lg:w-3/4">
                <AnimatedSection 
                  animation="fadeInUp" 
                  delay={0.2}
                  className="mb-4 flex justify-between items-center"
                >
                  <div className="text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium text-gray-900 dark:text-white">{filteredProducts.length}</span> of {menProducts.length} products
                  </div>
                </AnimatedSection>
                
                <AnimatedSection 
                  animation="slideInUp" 
                  delay={0.2}
                  threshold={0.1}
                  staggerChildren={true}
                  staggerDelay={0.1}
                >
                  {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} isAnimated={true} />
                  ) : (
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        No products match your selected price range.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 