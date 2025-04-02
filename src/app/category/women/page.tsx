'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import PriceRangeFilter from '@/components/PriceRangeFilter';
import AnimatedSection from '@/components/AnimatedSection';

// Sample product data
const womenProducts = [
  {
    id: 1,
    name: 'Floral Summer Dress',
    price: 39.99,
    image: '/products/women-dress-1.jpg',
    category: 'Dresses'
  },
  {
    id: 2,
    name: 'Casual Blouse',
    price: 29.99,
    image: '/products/women-blouse-1.jpg',
    category: 'Tops'
  },
  {
    id: 3,
    name: 'A-Line Skirt',
    price: 34.99,
    image: '/products/women-skirt-1.jpg',
    category: 'Skirts'
  },
  {
    id: 4,
    name: 'Skinny Jeans',
    price: 49.99,
    image: '/products/women-jeans-1.jpg',
    category: 'Jeans'
  },
  {
    id: 5,
    name: 'Elegant Dress',
    price: 59.99,
    image: '/products/women-dress-2.jpg',
    category: 'Dresses'
  },
  {
    id: 6,
    name: 'Casual Cardigan',
    price: 44.99,
    image: '/products/women-cardigan-1.jpg',
    category: 'Sweaters'
  },
  {
    id: 7,
    name: 'Cropped T-Shirt',
    price: 19.99,
    image: '/products/women-tshirt-1.jpg',
    category: 'Tops'
  },
  {
    id: 8,
    name: 'Winter Coat',
    price: 89.99,
    image: '/products/women-coat-1.jpg',
    category: 'Outerwear'
  }
];

export default function WomenPage() {
  // Calculate the min and max prices from products
  const allPrices = womenProducts.map(product => product.price);
  const minProductPrice = Math.floor(Math.min(...allPrices));
  const maxProductPrice = Math.ceil(Math.max(...allPrices));

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState(womenProducts);
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>([
    minProductPrice,
    maxProductPrice
  ]);
  const [isResetActive, setIsResetActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products by price
  const filterByPrice = (min: number, max: number) => {
    const filtered = womenProducts.filter(
      product => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
    setCurrentPriceRange([min, max]);
    setIsResetActive(min !== minProductPrice || max !== maxProductPrice);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilteredProducts(womenProducts);
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
                Women's Collection
              </h1>
              <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our range of women's clothing, from casual everyday wear to elegant dresses.
                Quality fabrics and stylish designs for the modern woman.
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
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
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
                            {womenProducts.filter(p => p.price < 30).length} items
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Mid-range ($30 - $60)</span>
                          <span className="text-gray-900 dark:text-white">
                            {womenProducts.filter(p => p.price >= 30 && p.price <= 60).length} items
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Premium ($60 - $100)</span>
                          <span className="text-gray-900 dark:text-white">
                            {womenProducts.filter(p => p.price > 60 && p.price <= 100).length} items
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Luxury (Over $100)</span>
                          <span className="text-gray-900 dark:text-white">
                            {womenProducts.filter(p => p.price > 100).length} items
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
                    Showing <span className="font-medium text-gray-900 dark:text-white">{filteredProducts.length}</span> of {womenProducts.length} products
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