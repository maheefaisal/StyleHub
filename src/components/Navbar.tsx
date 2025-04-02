'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useTheme } from '@/lib/themeContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Debug theme state
  useEffect(() => {
    console.log('Current theme:', darkMode ? 'dark' : 'light');
    console.log('Document classes:', document.documentElement.classList);
  }, [darkMode]);

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked');
    toggleDarkMode();
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md' 
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className={`text-xl font-bold text-gray-800 dark:text-white transition-transform duration-300 ${scrolled ? 'scale-95' : 'scale-100'}`}
            >
              <span className="text-blue-600 dark:text-blue-400">Style</span>Hub
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                Home
              </Link>
              <Link href="/category/men" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                Men
              </Link>
              <Link href="/category/women" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                Women
              </Link>
              <Link href="/fashion-trends" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                Trends
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                Contact
              </Link>
            </div>
          </div>

          {/* Cart, Dark mode toggle, and Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <motion.button
              onClick={handleThemeToggle}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {/* Cart */}
            <Link 
              href="/cart"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white relative transition-transform hover:scale-110"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-pop">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fadeInDown">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/category/men" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50" onClick={() => setIsMenuOpen(false)}>
              Men
            </Link>
            <Link href="/category/women" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50" onClick={() => setIsMenuOpen(false)}>
              Women
            </Link>
            <Link href="/fashion-trends" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50" onClick={() => setIsMenuOpen(false)}>
              Trends
            </Link>
            <Link href="/about" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 