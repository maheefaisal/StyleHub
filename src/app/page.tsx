'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import PromoSection from '@/components/PromoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TrendingStyles from '@/components/TrendingStyles';
import Newsletter from '@/components/Newsletter';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [menSectionVisible, setMenSectionVisible] = useState(false);
  const [womenSectionVisible, setWomenSectionVisible] = useState(false);
  const [trendsSectionVisible, setTrendsSectionVisible] = useState(false);
  
  const { ref: menRef, inView: menInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: womenRef, inView: womenInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { ref: trendsRef, inView: trendsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Separate products by category for display
  const mensProducts = products.filter((product) => product.category === 'men');
  const womensProducts = products.filter((product) => product.category === 'women');

  // Set visibility when sections come into view
  useEffect(() => {
    if (menInView) setMenSectionVisible(true);
  }, [menInView]);
  
  useEffect(() => {
    if (womenInView) setWomenSectionVisible(true);
  }, [womenInView]);
  
  useEffect(() => {
    if (trendsInView) setTrendsSectionVisible(true);
  }, [trendsInView]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        {/* Hero Banner */}
        <Banner />
        
        {/* PromoSection with special offers */}
        <PromoSection />
        
        {/* Featured Products Section */}
        <FeaturedProducts />
        
        {/* Fashion Trends Section */}
        <section ref={trendsRef} className="py-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 
                  className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: trendsInView ? 1 : 0, y: trendsInView ? 0 : 20 }}
                  transition={{ duration: 0.6 }}
                >
                  Stay Updated with the Latest <span className="text-indigo-600 dark:text-indigo-400">Fashion Trends</span>
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: trendsInView ? 1 : 0, y: trendsInView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Discover the latest fashion news, trends, and insights from around the world. Our curated collection of fashion articles keeps you informed about what's happening in the fashion industry.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: trendsInView ? 1 : 0, y: trendsInView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link 
                    href="/fashion-trends" 
                    className="inline-flex items-center px-6 py-3 rounded-md bg-black text-white font-medium transition-all hover:bg-gray-800 hover:scale-105"
                  >
                    Explore Trends <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: trendsInView ? 1 : 0, scale: trendsInView ? 1 : 0.95 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-8">
                    <img 
                      src="https://picsum.photos/id/237/300/400" 
                      alt="Fashion Trend 1" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://picsum.photos/id/244/300/400" 
                      alt="Fashion Trend 2" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://picsum.photos/id/240/300/400" 
                      alt="Fashion Trend 3" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4">
                    <img 
                      src="https://picsum.photos/id/248/300/400" 
                      alt="Fashion Trend 4" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Trending Styles Section */}
        <TrendingStyles />
        
        {/* Category Section */}
        <CategorySection />
        
        {/* Men's Products Section */}
        <section ref={menRef} className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className={`${menSectionVisible ? 'animate-fadeInDown' : 'opacity-0'} text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-4`}
            >
              Men's Collection
            </h2>
            <div className={`w-16 h-1 bg-blue-600 mx-auto my-4 ${menSectionVisible ? 'animate-fadeIn delay-200' : 'opacity-0'}`}></div>
            <p 
              className={`${menSectionVisible ? 'animate-fadeInUp delay-300' : 'opacity-0'} max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-center mb-10`}
            >
              Discover our premium selection of men's clothing, crafted for style and comfort
            </p>
            <div className={menSectionVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}>
              <ProductGrid products={mensProducts} isAnimated={menSectionVisible} />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Women's Products Section */}
        <section ref={womenRef} className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className={`${womenSectionVisible ? 'animate-fadeInDown' : 'opacity-0'} text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-4`}
            >
              Women's Collection
            </h2>
            <div className={`w-16 h-1 bg-blue-600 mx-auto my-4 ${womenSectionVisible ? 'animate-fadeIn delay-200' : 'opacity-0'}`}></div>
            <p 
              className={`${womenSectionVisible ? 'animate-fadeInUp delay-300' : 'opacity-0'} max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-center mb-10`}
            >
              Elegant and contemporary women's fashion for every occasion
            </p>
            <div className={womenSectionVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}>
              <ProductGrid products={womensProducts} isAnimated={womenSectionVisible} />
            </div>
        </div>
        </section>
        
        {/* Newsletter Subscription */}
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
}
