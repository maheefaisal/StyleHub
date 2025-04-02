"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  CheckCircle, 
  XCircle, 
  Filter as FilterIcon,
  Tag,
  Layers
} from 'lucide-react';
import { useToast } from '@/lib/toastContext';
import { useAuth } from '@/lib/authContext';
import { Product } from '@/lib/models/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sectionFilter, setSectionFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { showToast } = useToast();
  const { token } = useAuth();

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        // Fetch all categories
        const categoriesResponse = await fetch('/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const categoriesData = await categoriesResponse.json();
        
        // Fetch all products or filtered products
        const productsUrl = new URL('/api/products', window.location.origin);
        
        // Check URL params for category filter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
          const category = categoriesData.categories.find((c: any) => c.slug === categoryParam);
          if (category) {
            setCategoryFilter(category.id);
            productsUrl.searchParams.append('categoryId', category.id);
          }
        }
        
        const productsResponse = await fetch(productsUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        
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
  }, [token]);
  
  // Apply filters when changed
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const url = new URL('/api/products', window.location.origin);
        
        if (categoryFilter) {
          url.searchParams.append('categoryId', categoryFilter);
        } else if (sectionFilter) {
          url.searchParams.append('section', sectionFilter);
        }
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch filtered products');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error applying filters:', err);
        setError('Failed to apply filters. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if filters are explicitly set (not on initial load)
    if (categoryFilter !== null || sectionFilter !== null) {
      fetchFilteredProducts();
    }
  }, [categoryFilter, sectionFilter, token]);

  // Handle product deletion
  const handleDeleteProduct = async (productId: string) => {
    if (!token) return;
    
    setSelectedProduct(null); // Close the dropdown
    
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Update the products list
      setProducts(products.filter(product => product.id !== productId));
      showToast('Product deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Failed to delete product. Please try again.', 'error');
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Reset all filters
  const resetFilters = async () => {
    if (!token) return;
    
    setCategoryFilter(null);
    setSectionFilter(null);
    
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset filters');
      }
      
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error resetting filters:', err);
      setError('Failed to reset filters. Please try again.');
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Please log in to access this page</h2>
          <Link
            href="/admin/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex-shrink-0">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FilterIcon className="w-4 h-4" />
            <span>Filter</span>
            {(categoryFilter || sectionFilter) && (
              <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-medium rounded-full">
                {(categoryFilter ? 1 : 0) + (sectionFilter ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 space-y-5">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
            <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
            {(categoryFilter || sectionFilter) && (
              <button 
                onClick={resetFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                Category
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                <div 
                  onClick={() => setCategoryFilter(null)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                    !categoryFilter 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  All Categories
                </div>
                
                {categories.map(category => (
                  <div 
                    key={category.id}
                    onClick={() => {
                      setCategoryFilter(category.id);
                      // Clear section filter when category is selected
                      setSectionFilter(null);
                    }}
                    className={`px-3 py-2 rounded-md cursor-pointer text-sm flex justify-between items-center ${
                      categoryFilter === category.id 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      category.section === 'men' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : category.section === 'women'
                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {category.section}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Section Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                Section
              </h4>
              <div className="space-y-2">
                <div 
                  onClick={() => setSectionFilter(null)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                    !sectionFilter 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  All Sections
                </div>
                
                {['men', 'women'].map(section => (
                  <div 
                    key={section}
                    onClick={() => {
                      setSectionFilter(section);
                      // Clear category filter when section is selected
                      setCategoryFilter(null);
                    }}
                    className={`px-3 py-2 rounded-md cursor-pointer text-sm capitalize ${
                      sectionFilter === section 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {section}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Products List */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-square">
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Box className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  {selectedProduct === product.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.categoryName}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.inStock ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 