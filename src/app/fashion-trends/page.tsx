'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FashionTrendCard from '@/components/FashionTrendCard';
import { ArrowUpCircle, Sun, Moon } from 'lucide-react';

// Types for fashion trends data
interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface FashionTrendsData {
  status: string;
  totalResults: number;
  articles: Article[];
}

export default function FashionTrendsPage() {
  const [trendsData, setTrendsData] = useState<FashionTrendsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { ref: scrollTopRef, inView: scrollTopInView } = useInView({
    threshold: 0,
  });

  // Initialize dark mode from localStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) {
        setDarkMode(savedMode === 'true');
      }
    }
  }, []);

  // Update body class and localStorage when dark mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save preference to localStorage
      localStorage.setItem('darkMode', darkMode.toString());
      
      // Apply dark mode class to document body
      if (darkMode) {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark');
      } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Fetch fashion trends data
  useEffect(() => {
    const fetchFashionTrends = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/fashion-trends');
        
        if (!response.ok) {
          throw new Error('Failed to fetch fashion trends');
        }
        
        const data = await response.json();
        setTrendsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching fashion trends:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFashionTrends();
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={toggleDarkMode}
          className={`fixed top-24 right-8 p-3 rounded-full shadow-lg z-50 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-white text-gray-700'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>

        {/* Title Section - Adjusted to ensure visibility */}
        <div className="pt-20 pb-8" ref={headerRef}>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fashion Trends
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Stay updated with the latest fashion news, trends, and insights from around the world.
            </p>
          </motion.div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${darkMode ? 'border-white' : 'border-gray-900'}`}></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className={`border px-4 py-3 rounded relative mb-6 ${darkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'}`} role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Fashion trends grid */}
        {trendsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendsData.articles.map((article, index) => (
              <FashionTrendCard 
                key={index} 
                article={article} 
                index={index} 
                darkMode={darkMode}
              />
            ))}
          </div>
        )}

        {/* Scroll to top button */}
        <div ref={scrollTopRef} className="hidden">
          {/* This is just a marker for the intersection observer */}
        </div>
        
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-50 ${darkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: !scrollTopInView ? 1 : 0,
            scale: !scrollTopInView ? 1 : 0.8,
            pointerEvents: !scrollTopInView ? 'auto' : 'none'
          }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
        >
          <ArrowUpCircle size={24} />
        </motion.button>
      </main>
      
      <Footer />
    </div>
  );
} 