'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const orderNumber = `ORD-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`;
  
  // Redirect to home if page is accessed directly (without going through checkout)
  useEffect(() => {
    const isRedirected = sessionStorage.getItem('orderComplete');
    if (!isRedirected) {
      router.push('/');
    } else {
      // Clear the flag
      sessionStorage.removeItem('orderComplete');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
              </motion.div>
              
              <motion.h1 
                className="mt-6 text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Order Confirmed!
              </motion.h1>
              
              <motion.p 
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Thank you for your purchase. Your order has been successfully placed.
              </motion.p>
              
              <motion.div
                className="mt-6 text-gray-600 dark:text-gray-300 border-t border-b border-gray-200 dark:border-gray-700 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="font-medium">Order Number:</p>
                <p className="text-xl text-gray-900 dark:text-white font-semibold mt-1">{orderNumber}</p>
              </motion.div>
              
              <motion.div 
                className="mt-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-gray-600 dark:text-gray-300">
                  A confirmation email has been sent to your email address with the order details.
                </p>
                
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="mb-2">• Your items will be shipped within 2-3 business days</p>
                  <p className="mb-2">• You can track your order in the account section</p>
                  <p>• For any questions, please contact our customer support</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center justify-center transition-colors"
                >
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/account/orders"
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-md flex items-center justify-center transition-colors"
                >
                  View Order Status
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 