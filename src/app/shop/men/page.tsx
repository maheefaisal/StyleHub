"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Filter, 
  ArrowDownUp, 
  Grid, 
  ListFilter,
  Loader,
  Heart,
  ShoppingCart,
  Tag
} from 'lucide-react';
import { Product } from '@/lib/models/product';

export default function MensStorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>('newest');
  
  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch men's categories
        const categoriesResponse = await fetch('/api/categories?section=men');
        const categoriesData = await categoriesResponse.json();
        
        // Fetch men's products
        const productsResponse = await fetch('/api/products?section=men');
        const productsData = await productsResponse.json();
        
        setCategories(categoriesData.categories || []);
        setProducts(productsData.products || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Fetch products by category if selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchProductsByCategory = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/products?categoryId=${selectedCategory}`);
          const data = await response.json();
          setProducts(data.products || []);
        } catch (err) {
          console.error('Error fetching products by category:', err);
          setError('Failed to load products. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProductsByCategory();
    }
  }, [selectedCategory]);
  
  // Sort and filter products
  const filteredAndSortedProducts = () => {
    return [...products]
      // Filter by price range
      .filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      // Sort products
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  };
  
  const displayedProducts = filteredAndSortedProducts();

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-8">
        <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Men's Collection</h1>
            <p className="text-lg md:text-xl max-w-md mb-6">Discover our latest men's fashion collection with high-quality clothing designed for style and comfort.</p>
            <div>
              <button className="px-6 py-3 bg-white text-blue-800 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ListFilter className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Categories
            </h3>
            <div className="space-y-2">
              <div 
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                  !selectedCategory 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All Categories
              </div>
              
              {categories.map(category => (
                <div 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                    selectedCategory === category.id 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-blue-600"
              />
              
              <div className="flex justify-between items-center space-x-4">
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value <= priceRange[1]) {
                      setPriceRange([value, priceRange[1]]);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min={priceRange[0]}
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= priceRange[0]) {
                      setPriceRange([priceRange[0], value]);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="lg:w-3/4 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <p className="text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{displayedProducts.length}</span> products
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 dark:bg-gray-700 pl-10 pr-8 py-2 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <ArrowDownUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              
              <div className="hidden sm:flex items-center space-x-2">
                <button className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No products found matching your criteria</p>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange([0, 200]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Product Tags */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.new && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">New</span>
                      )}
                      {product.bestSeller && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">Best Seller</span>
                      )}
                      {product.compareAtPrice && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                          Sale {Math.round((1 - (product.price / product.compareAtPrice)) * 100)}% Off
                        </span>
                      )}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Heart className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </button>
                      <button className="bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <Link 
                      href={`/product/${product.slug}`}
                      className="text-lg font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {product.shortDescription || product.description}
                    </p>
                    
                    <div className="mt-3 flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              ${product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {product.variants ? `${product.variants.length} variants available` : 'One size'}
                        </div>
                      </div>
                      
                      <Link 
                        href={`/product/${product.slug}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 