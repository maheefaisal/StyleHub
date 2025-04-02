'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setIsError(true);
      return;
    }
    
    // In a real application, you would send this to your API
    console.log('Subscribing email:', email);
    setIsSubmitted(true);
    setIsError(false);
    setEmail('');
    
    // Reset submission state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <svg className="absolute left-0 top-0 h-full" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center">
            <div className={`md:w-1/2 md:pr-12 mb-8 md:mb-0 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mb-6">
                <Mail size={24} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Subscribe to Our Newsletter
              </h2>
              <div className="w-16 h-1 bg-blue-600 my-4"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Be the first to know about new collections, special offers, and exclusive style tips tailored just for you.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Exclusive discounts for subscribers
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Early access to new arrivals
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Seasonal style guides and tips
                </li>
              </ul>
            </div>
            
            <div className={`md:w-1/2 w-full ${isVisible ? 'animate-fadeInRight delay-300' : 'opacity-0'}`}>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-inner">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (isError) setIsError(false);
                        }}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isError 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                        } dark:bg-gray-700 dark:text-white`}
                        required
                      />
                      {isError && (
                        <p className="mt-1 text-sm text-red-500">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 active:scale-95"
                      >
                        Subscribe Now
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300 mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      Thanks for subscribing!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We've sent a confirmation to your email inbox.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 