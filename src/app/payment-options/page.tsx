'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cartContext';
import { CreditCard, Landmark, Banknote, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PaymentOptionsPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const cartTotal = getCartTotal();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Handle payment method selection
  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };

  // Handle payment submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingComplete(true);
      setShowSuccessPopup(true);
      
      // Clear the cart and redirect after showing popup
      setTimeout(() => {
        clearCart();
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('orderComplete', 'true');
        }
        router.push('/order-confirmation');
      }, 2000);
    }, 2000);
  };

  // Calculate order summary
  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Page header */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              Payment Options
            </h1>
          </div>
        </div>
        
        {/* Payment content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Payment methods section */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Select Payment Method
                  </h2>
                  
                  {/* Payment method options */}
                  <div className="space-y-4 mb-8">
                    <div 
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        selectedPayment === 'credit-card' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handlePaymentSelect('credit-card')}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          selectedPayment === 'credit-card' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedPayment === 'credit-card' && <Check size={14} className="text-white" />}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="mr-2 text-gray-600 dark:text-gray-300" size={20} />
                          <span className="font-medium text-gray-900 dark:text-white">Credit / Debit Card</span>
                        </div>
                      </div>
                      
                      {selectedPayment === 'credit-card' && (
                        <div className="mt-4 grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Card Number
                            </label>
                            <input 
                              type="text" 
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Expiration Date
                              </label>
                              <input 
                                type="text" 
                                placeholder="MM / YY"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CVC
                              </label>
                              <input 
                                type="text" 
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        selectedPayment === 'bank-transfer' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handlePaymentSelect('bank-transfer')}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          selectedPayment === 'bank-transfer' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedPayment === 'bank-transfer' && <Check size={14} className="text-white" />}
                        </div>
                        <div className="flex items-center">
                          <Landmark className="mr-2 text-gray-600 dark:text-gray-300" size={20} />
                          <span className="font-medium text-gray-900 dark:text-white">Bank Transfer</span>
                        </div>
                      </div>
                      
                      {selectedPayment === 'bank-transfer' && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Make a direct bank transfer to our account:
                          </p>
                          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
                            <p className="mb-1"><span className="font-medium">Bank:</span> Example Bank</p>
                            <p className="mb-1"><span className="font-medium">Account Name:</span> Fashion Store Inc.</p>
                            <p className="mb-1"><span className="font-medium">Account Number:</span> 1234567890</p>
                            <p><span className="font-medium">Routing:</span> 987654321</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        selectedPayment === 'cash-on-delivery' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => handlePaymentSelect('cash-on-delivery')}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                          selectedPayment === 'cash-on-delivery' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedPayment === 'cash-on-delivery' && <Check size={14} className="text-white" />}
                        </div>
                        <div className="flex items-center">
                          <Banknote className="mr-2 text-gray-600 dark:text-gray-300" size={20} />
                          <span className="font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
                        </div>
                      </div>
                      
                      {selectedPayment === 'cash-on-delivery' && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Pay with cash when your order is delivered. An additional fee of $5 will be added.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Billing address (simplified) */}
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Billing Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Zip Code
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Country
                      </label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order summary section */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                      <span className="text-gray-900 dark:text-white">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tax (7%)</span>
                      <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-lg text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing || processingComplete}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                      isProcessing 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : processingComplete 
                        ? 'bg-green-500 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isProcessing 
                      ? 'Processing...' 
                      : processingComplete 
                      ? 'Payment Complete!' 
                      : 'Complete Payment'}
                  </button>
                  
                  <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <p className="mb-2">• All transactions are secure and encrypted</p>
                    <p className="mb-2">• Free shipping on orders over $100</p>
                    <p>• 30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-green-500" />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Payment Successful!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-300 mb-6"
              >
                Your order has been confirmed. Redirecting to order confirmation...
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'linear' }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 