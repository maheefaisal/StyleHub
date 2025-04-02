'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: "The quality of the clothes is amazing! I love how the fabrics feel and the designs are so unique. Will definitely shop here again.",
    image: '/testimonials/avatar-1.jpg',
    title: 'Fashion Enthusiast'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 4,
    comment: "Great selection of styles for every occasion. The shipping was fast and the customer service was very helpful when I needed to exchange sizes.",
    image: '/testimonials/avatar-2.jpg',
    title: 'Regular Customer'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    rating: 5,
    comment: "I'm obsessed with the summer collection! The dresses fit perfectly and the colors are vibrant. Can't wait to see what they release next.",
    image: '/testimonials/avatar-3.jpg',
    title: 'Style Blogger'
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use intersection observer to detect when section is in view
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  // Set up auto-rotation of testimonials
  useEffect(() => {
    if (inView && isAutoPlaying) {
      // Clear any existing interval
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      // Set new interval
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
      }, 5000); // Change testimonial every 5 seconds
    } else if (autoPlayRef.current) {
      // Clear interval when not in view
      clearInterval(autoPlayRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [inView, isAutoPlaying]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    // Pause auto-rotation for a moment when user interacts
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const goToPrevSlide = () => {
    const newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    goToSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    goToSlide(newIndex);
  };

  return (
    <section 
      ref={ref}
      className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-500 transform
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            What Our Customers Say
          </h2>
          <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-500 delay-200 transform
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Read about the experiences our customers have had shopping with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial slider */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 p-4"
                >
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-700 transform
                    ${inView && index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="flex items-center mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                        {testimonial.image ? (
                          <Image 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            {testimonial.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < testimonial.rating ? "#F59E0B" : "none"} 
                              stroke={i < testimonial.rating ? "#F59E0B" : "#9CA3AF"}
                              className="mr-1"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">"{testimonial.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={goToPrevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md flex items-center justify-center text-blue-600 transition-opacity duration-300
              ${inView ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md flex items-center justify-center text-blue-600 transition-opacity duration-300
              ${inView ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Navigation dots */}
          <div className={`flex justify-center mt-8 transition-all duration-500 
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 