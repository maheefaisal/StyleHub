'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CategorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Set visibility when the section comes into view
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className={`${isVisible ? 'animate-fadeInDown' : 'opacity-0'} text-3xl font-bold text-center text-gray-900 dark:text-white mb-12`}
        >
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Category */}
          <div 
            className={`${isVisible ? 'animate-fadeInLeft delay-200' : 'opacity-0'} relative overflow-hidden rounded-lg shadow-lg group h-80`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full p-8 flex flex-col justify-center items-center text-white z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 transform group-hover:scale-105 transition-transform duration-300">
                Men's Collection
              </h3>
              <p className="text-center mb-6 max-w-md group-hover:opacity-90 transition-opacity duration-300">
                Discover stylish and comfortable clothing for men. From casual to formal, we have everything you need.
              </p>
              <Link 
                href="/category/men" 
                className="border border-white hover:bg-white hover:text-blue-600 px-6 py-2 rounded-md font-medium transition-all duration-300 transform group-hover:translate-y-0 translate-y-0 hover:scale-105 active:scale-95"
              >
                Shop Men
              </Link>
            </div>
            {/* Animated overlay effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform scale-0 group-hover:scale-100"></div>
          </div>

          {/* Women's Category */}
          <div 
            className={`${isVisible ? 'animate-fadeInRight delay-300' : 'opacity-0'} relative overflow-hidden rounded-lg shadow-lg group h-80`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full p-8 flex flex-col justify-center items-center text-white z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 transform group-hover:scale-105 transition-transform duration-300">
                Women's Collection
              </h3>
              <p className="text-center mb-6 max-w-md group-hover:opacity-90 transition-opacity duration-300">
                Explore our stunning collection of women's clothing. From elegant dresses to everyday essentials.
              </p>
              <Link 
                href="/category/women" 
                className="border border-white hover:bg-white hover:text-pink-600 px-6 py-2 rounded-md font-medium transition-all duration-300 transform group-hover:translate-y-0 translate-y-0 hover:scale-105 active:scale-95"
              >
                Shop Women
              </Link>
            </div>
            {/* Animated overlay effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform scale-0 group-hover:scale-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 