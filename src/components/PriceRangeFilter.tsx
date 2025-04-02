'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  className?: string;
  currentMin?: number;
  currentMax?: number;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
  className = '',
  currentMin,
  currentMax,
}) => {
  // Initialize state with currentMin/Max if provided, otherwise use minPrice/maxPrice
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMin !== undefined ? currentMin : minPrice, 
    currentMax !== undefined ? currentMax : maxPrice
  ]);
  const step = 5; // Price increment step (e.g., $5)

  // Update internal state when min/max price props change
  useEffect(() => {
    // Only update if the values actually changed to prevent infinite loops
    if (minPrice !== priceRange[0] || maxPrice !== priceRange[1]) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  // Update internal state when external price range changes (like when reset button is clicked)
  useEffect(() => {
    if (currentMin !== undefined && currentMax !== undefined) {
      setPriceRange([currentMin, currentMax]);
    }
  }, [currentMin, currentMax]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(event.target.value);
    if (newMinPrice <= priceRange[1]) {
      setPriceRange([newMinPrice, priceRange[1]]);
      onPriceChange(newMinPrice, priceRange[1]);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(event.target.value);
    if (newMaxPrice >= priceRange[0]) {
      setPriceRange([priceRange[0], newMaxPrice]);
      onPriceChange(priceRange[0], newMaxPrice);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Calculate the percentage position for the track highlight
  const minPercentage = ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercentage = ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <AnimatedSection 
      animation="fadeInUp" 
      delay={0.1} 
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 ${className}`}
    >
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Price Range</h3>
      </div>
      
      <div className="relative mb-8 mt-12 px-2">
        {/* Track */}
        <div className="absolute h-1 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        
        {/* Active track highlight */}
        <div
          className="absolute h-1 bg-blue-600 rounded"
          style={{
            left: `${Math.max(0, minPercentage)}%`,
            width: `${Math.max(0, Math.min(100, maxPercentage - minPercentage))}%`,
          }}
        ></div>
        
        {/* Min thumb */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={step}
          value={priceRange[0]}
          onChange={handleMinPriceChange}
          className="absolute w-full appearance-none bg-transparent z-20"
        />
        
        {/* Max thumb */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={step}
          value={priceRange[1]}
          onChange={handleMaxPriceChange}
          className="absolute w-full appearance-none bg-transparent z-10"
        />
      </div>
      
      {/* Price display */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">Min</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(priceRange[0])}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 dark:text-gray-400">Max</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      
      {/* Price input fields for direct entry */}
      <div className="flex justify-between mt-4">
        <div className="w-[45%]">
          <label htmlFor="minPrice" className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
            Min Price
          </label>
          <input
            id="minPrice"
            type="number"
            min={minPrice}
            max={priceRange[1]}
            step={step}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="w-[45%]">
          <label htmlFor="maxPrice" className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            min={priceRange[0]}
            max={maxPrice}
            step={step}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PriceRangeFilter; 