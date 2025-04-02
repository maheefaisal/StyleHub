'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

const trendingCategories = [
  {
    id: 1,
    title: 'Summer Essentials',
    description: 'Lightweight fabrics for warmer days',
    image: '/images/men/99f66dfd-2cff-4156-8576-e08dffb21bb0.webp',
    link: '/category/men'
  },
  {
    id: 2,
    title: 'Casual Chic',
    description: 'Effortlessly stylish everyday wear',
    image: '/images/women/c0a32fd9-95eb-4525-9815-fccae4db51bc.webp',
    link: '/category/women'
  },
  {
    id: 3,
    title: 'Office Attire',
    description: 'Professional looks for the workplace',
    image: '/images/men/ea9d492f-6df2-40a9-849d-8eb2fbfe9956.webp',
    link: '/category/men'
  }
];

export default function TrendingStyles() {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection 
          animation="fadeInBlur" 
          className="text-center mb-12" 
          delay={0.1}
          threshold={0.3}
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Trending Styles
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Discover the latest fashion trends and elevate your style
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingCategories.map((category, index) => (
            <AnimatedSection
              key={category.id}
              animation={index % 2 === 0 ? "slideInUp" : "zoomIn"}
              delay={0.1 + (index * 0.2)}
              threshold={0.1}
              rootMargin="-50px 0px"
              className="group relative rounded-lg overflow-hidden h-96 shadow-lg transition-transform hover:scale-102 duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60 z-10 transition-opacity group-hover:opacity-70"></div>
              
              {/* Image placeholder in case of error */}
              <div className="absolute inset-0 image-placeholder flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <span className="text-2xl font-medium text-gray-500 dark:text-gray-300">
                  {category.title.charAt(0)}
                </span>
              </div>
              
              {!imageErrors[index] && (
                <div className="relative h-full w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={() => handleImageError(index)}
                    priority
                  />
                </div>
              )}
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-2 transform transition-transform group-hover:translate-y-[-0.25rem] duration-300">
                  {category.title}
                </h3>
                <p className="text-white text-opacity-80 mb-6 group-hover:text-opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <Link 
                  href={category.link}
                  className="inline-flex items-center text-sm font-medium border-b border-transparent group-hover:border-white whitespace-nowrap transition-all duration-300"
                >
                  <span className="mr-2">Explore Collection</span>
                  <svg 
                    className="h-4 w-4 transform transition-transform group-hover:translate-x-2 duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection animation="slideInUp" delay={0.6} className="mt-12 text-center">
          <Link
            href="/category/all"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors transform hover:scale-105 active:scale-95 duration-200"
          >
            View All Collections
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
} 