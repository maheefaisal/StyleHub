'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Clock, Tag, Truck } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function PromoSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(interval);
          return prev;
        }
        
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes--;
        }
        
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours--;
        }
        
        if (newHours < 0) {
          newHours = 23;
          newDays--;
        }
        
        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Limited Time Offer */}
        <AnimatedSection 
          animation="fadeInBlur" 
          delay={0.2}
          threshold={0.2}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 relative">
              <AnimatedSection animation="slideInLeft" delay={0.3} className="relative z-10 text-white text-center md:text-left md:max-w-lg">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Summer Sale: Up to 40% Off
                </h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Limited time offer on our premium summer collection. Refresh your wardrobe with our hottest styles before they're gone!
                </p>
                
                {/* Countdown timer */}
                <div className="flex justify-center md:justify-start space-x-4 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold">
                      {timeLeft.days}
                    </div>
                    <span className="text-xs mt-1">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold">
                      {timeLeft.hours}
                    </div>
                    <span className="text-xs mt-1">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold">
                      {timeLeft.minutes}
                    </div>
                    <span className="text-xs mt-1">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg h-16 w-16 flex items-center justify-center text-2xl font-bold">
                      {timeLeft.seconds}
                    </div>
                    <span className="text-xs mt-1">Seconds</span>
                  </div>
                </div>
                
                <Link 
                  href="/category/all" 
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium transition-colors transform hover:scale-105 active:scale-95 duration-200"
                >
                  Shop Now
                </Link>
              </AnimatedSection>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-white opacity-10 animate-float"></div>
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 rounded-full bg-white opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Features/Benefits */}
        <AnimatedSection animation="fadeInBlur" delay={0.2} className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Why Shop With Us
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedSection animation="slideInUp" delay={0.3} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center shadow-md transform transition-transform hover:scale-105 duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mb-4">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Free Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy free shipping on all orders over $50. Fast delivery straight to your doorstep.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slideInUp" delay={0.5} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center shadow-md transform transition-transform hover:scale-105 duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mb-4">
              <Tag size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Best Price Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We offer competitive prices on our entire collection. Quality fashion doesn't have to be expensive.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slideInUp" delay={0.7} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center shadow-md transform transition-transform hover:scale-105 duration-300">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our customer service team is available around the clock to assist with any questions or concerns.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
} 