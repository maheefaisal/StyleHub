'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the animations after the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 overflow-hidden">
      {/* Background pattern with animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"></div>
      </div>
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedSection animation="slideInLeft" delay={0.2} className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Summer Collection 2024
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover the latest trends in fashion for both men and women. Refresh your wardrobe with our curated selection of premium clothing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/category/men" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors transform hover:scale-105 active:scale-95 duration-200"
              >
                Shop Men
              </Link>
              <Link 
                href="/category/women" 
                className="bg-transparent hover:bg-blue-700 border border-white px-6 py-3 rounded-md font-medium transition-colors transform hover:scale-105 active:scale-95 duration-200"
              >
                Shop Women
              </Link>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="zoomIn" delay={0.4} className="hidden md:block relative">
            <div className="aspect-[4/3] bg-white/10 rounded-lg p-8 backdrop-blur-sm transform rotate-3 shadow-xl hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-center">
                  <span className="inline-block animate-pop">Up to 40% Off</span><br />
                  <span className="text-3xl animate-fadeInUp" style={{ animationDelay: '0.7s' }}>Summer Sale</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Animated background shapes */}
      <div className="hidden md:block">
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-8 right-16 w-32 h-32 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 -left-8 w-24 h-24 rounded-full bg-white/5 animate-float" style={{ animationDelay: '0.7s' }}></div>
      </div>
    </div>
  );
} 