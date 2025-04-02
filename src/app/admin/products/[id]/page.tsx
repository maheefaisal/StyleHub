"use client";

import { useState, useEffect, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save,
  Trash,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Layers,
  Loader,
  Plus,
  Edit
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/lib/toastContext';
import { Product } from '@/lib/models/product';
import { useAuth } from '@/lib/authContext';

export default function ProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token } = useAuth();
  const productId = params.id;
  const isEditMode = productId !== 'new';
  
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 0,
    compareAtPrice: undefined,
    categoryId: '',
    section: 'men',
    featured: false,
    new: false,
    bestSeller: false,
    inStock: true,
    images: [],
    variants: [],
    tags: [],
    attributes: {}
  });
  
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Add new state for image upload
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          
          if (!response.ok) {
            throw new Error('Product not found');
          }
          
          const data = await response.json();
          setProduct(data.product || {});
        } catch (err) {
          console.error('Error fetching product:', err);
          setError('Failed to load product. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [isEditMode, productId]);
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setProduct({
        ...product,
        [name]: checkbox.checked
      });
    } else if (type === 'number') {
      setProduct({
        ...product,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
    
    // Auto-generate slug if name changes and slug is empty or matches the previous auto-generated value
    if (name === 'name' && (!product.slug || product.slug === slugify(product.name || ''))) {
      setProduct(prev => ({
        ...prev,
        slug: slugify(value)
      }));
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    
    setProduct({
      ...product,
      categoryId,
      categoryName: selectedCategory ? selectedCategory.name : '',
      section: selectedCategory ? selectedCategory.section : product.section
    });
  };
  
  // Slugify text for URL-friendly strings
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // Add image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setImageUploading(true);
    try {
      // For demo purposes, we'll create a fake image URL
      const newImages = Array.from(files).map((file, index) => ({
        id: `img_${Date.now()}_${index}`,
        url: URL.createObjectURL(file),
        alt: file.name,
        isPrimary: index === 0
      }));

      setProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newImages]
      }));

      showToast('Images uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading images:', error);
      showToast('Failed to upload images. Please try again.', 'error');
    } finally {
      setImageUploading(false);
    }
  };

  // Add image removal handler
  const handleRemoveImage = (imageId: string) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images?.filter(img => img.id !== imageId) || []
    }));
  };

  // Add set primary image handler
  const handleSetPrimaryImage = (imageId: string) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images?.map(img => ({
        ...img,
        isPrimary: img.id === imageId
      })) || []
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!product.name || !product.price || !product.categoryId) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    
    setSaving(true);
    
    try {
      // Format the product data before sending
      const productData = {
        ...product,
        price: Number(product.price),
        compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
        featured: Boolean(product.featured),
        new: Boolean(product.new),
        bestSeller: Boolean(product.bestSeller),
        inStock: Boolean(product.inStock),
        images: Array.isArray(product.images) ? product.images : [],
        variants: Array.isArray(product.variants) ? product.variants : [],
        tags: Array.isArray(product.tags) ? product.tags : [],
        attributes: typeof product.attributes === 'object' ? product.attributes : {}
      };

      if (isEditMode) {
        // Update existing product
        const response = await fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update product');
        }
        
        showToast('Product updated successfully!', 'success');
      } else {
        // Create new product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create product');
        }
        
        showToast('Product created successfully!', 'success');
      }
      
      router.push('/admin/products');
    } catch (error: any) {
      console.error('Error saving product:', error);
      showToast(error.message || 'Failed to save product. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/products"
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {isEditMode ? 'Edit Product' : 'New Product'}
          </h1>
        </div>
        
        <div className="flex space-x-3">
          {isEditMode && (
            <button 
              type="button"
              onClick={async () => {
                if (confirm('Are you sure you want to delete this product?')) {
                  try {
                    const response = await fetch(`/api/products/${productId}`, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    });
                    
                    if (!response.ok) {
                      const errorData = await response.json();
                      throw new Error(errorData.error || 'Failed to delete product');
                    }
                    
                    showToast('Product deleted successfully!', 'success');
                    router.push('/admin/products');
                  } catch (error: any) {
                    console.error('Error deleting product:', error);
                    showToast(error.message || 'Failed to delete product. Please try again.', 'error');
                  }
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
          
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Form */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="slug">
                    Slug *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                      /product/
                    </span>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={product.slug || ''}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    The URL-friendly version of the name. Used in the product URL.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="shortDescription">
                    Short Description
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={product.shortDescription || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    A brief summary shown in product listings.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">
                    Full Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description || ''}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="categoryId">
                      Category *
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={product.categoryId || ''}
                      onChange={handleCategoryChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.section})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="section">
                      Section *
                    </label>
                    <select
                      id="section"
                      name="section"
                      value={product.section || 'men'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="men">Men's</option>
                      <option value="women">Women's</option>
                      <option value="kids">Kids</option>
                      <option value="accessories">Accessories</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Determines which store section this product belongs to.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Pricing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="price">
                        Price *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={product.price === 0 && product.price !== '' ? '' : product.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="compareAtPrice">
                        Compare At Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="compareAtPrice"
                          name="compareAtPrice"
                          value={product.compareAtPrice === 0 ? '' : product.compareAtPrice}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Original price, shown as a strikethrough.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Tags & Attributes</h3>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="featured"
                        checked={product.featured || false}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</span>
                    </label>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="new"
                        checked={product.new || false}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">New</span>
                    </label>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="bestSeller"
                        checked={product.bestSeller || false}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Best Seller</span>
                    </label>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="inStock"
                        checked={product.inStock || false}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">In Stock</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="tags">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={product.tags?.join(', ') || ''}
                      onChange={(e) => {
                        const tagsValue = e.target.value;
                        const tagsArray = tagsValue
                          .split(',')
                          .map(tag => tag.trim())
                          .filter(tag => tag.length > 0);
                        
                        setProduct({
                          ...product,
                          tags: tagsArray
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Helps customers find your product through search and filtering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Product Images
              </h3>
              
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {imageUploading ? 'Uploading...' : 'Drag and drop image files here, or click to select files'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">PNG, JPG or GIF up to 5MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Select Files
                    </button>
                  </div>
                </div>
                
                {/* Images Preview */}
                {product.images && product.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {product.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <img 
                            src={image.url} 
                            alt={image.alt || product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-md">
                          <button 
                            type="button" 
                            className="p-1 bg-white rounded-full text-gray-700 hover:text-red-500 mr-2"
                            onClick={() => handleRemoveImage(image.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                          {!image.isPrimary && (
                            <button 
                              type="button" 
                              className="p-1 bg-white rounded-full text-gray-700 hover:text-blue-500"
                              onClick={() => handleSetPrimaryImage(image.id)}
                              title="Set as main image"
                            >
                              <Tag className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {image.isPrimary && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No images yet. Add some to showcase your product.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Status</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="status">
                    Visibility
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      // Preview logic
                      window.open(`/product/${product.slug}`, '_blank');
                    }}
                  >
                    Preview Product
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Variants Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Variants
              </h3>
              
              {product.variants && product.variants.length > 0 ? (
                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <div 
                      key={variant.id} 
                      className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {variant.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: {variant.sku} | ${variant.price.toFixed(2)} | Stock: {variant.inventory}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add Variant
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No variants yet. Add variants for different sizes, colors, etc.
                  </p>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add Variants
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Products Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Related Products</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Products that will be shown in the "You may also like" section.
              </p>
              
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Related Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 