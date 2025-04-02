'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import Image from 'next/image';

export default function CartPage() {
  const { items, addToCart, removeFromCart, getCartTotal } = useCart();
  const cartIsEmpty = items.length === 0;
  const cartTotal = getCartTotal();
  const router = useRouter();

  // Handle checkout button click
  const handleCheckout = () => {
    router.push('/payment-options');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        {/* Page header */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              Your Shopping Cart
            </h1>
          </div>
        </div>
        
        {/* Cart content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {cartIsEmpty ? (
              <div className="text-center py-12">
                <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link 
                  href="/" 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors inline-block"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Cart Items ({items.length})
                  </h2>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item) => (
                      <div key={item.product.id} className="py-6 flex flex-wrap md:flex-nowrap">
                        {/* Product Image */}
                        <div className="w-full md:w-24 h-24 relative mb-4 md:mb-0">
                          <div className="absolute inset-0 image-placeholder flex items-center justify-center rounded-md overflow-hidden">
                            <span className="text-gray-400 dark:text-gray-500 text-lg font-medium">
                              {item.product.name[0]}
                            </span>
                          </div>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="md:ml-6 flex-grow">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            ${item.product.price.toFixed(2)} each
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Category: <span className="capitalize">{item.product.category}</span>
                          </p>
                          
                          <div className="mt-4 flex items-center space-x-4">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                              <button 
                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    // We would need to add a function to decrease quantity
                                    // For simplicity, just remove the item for now
                                    removeFromCart(item.product.id);
                                    addToCart(item.product);
                                  }
                                }}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
                                {item.quantity}
                              </span>
                              <button 
                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => addToCart(item.product)}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button
                              className="text-red-500 hover:text-red-700 flex items-center"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash size={16} className="mr-1" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Product Price */}
                        <div className="mt-4 md:mt-0 w-full md:w-auto md:ml-6 text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cart Summary */}
                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">Subtotal</span>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Shipping and taxes calculated at checkout
                    </p>
                    
                    <div className="mt-8 space-y-4">
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </button>
                      <Link 
                        href="/"
                        className="w-full block text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 