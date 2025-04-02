"use client";

import { useState, useEffect } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  CheckCircle, 
  XCircle, 
  Save,
  X,
  Filter,
  Loader,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/lib/toastContext';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { CategoryImage } from '@/components/ui/CategoryImage';

// Define category interface
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  section: 'men' | 'women' | 'kids' | 'accessories';
  featured: boolean;
  imageUrl?: string;
  productCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
    section: 'men',
    featured: false,
    imageUrl: '',
    productCount: 0
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  // Demo categories data
  const demoCategories: Category[] = [
    {
      id: '1',
      name: 'T-Shirts',
      slug: 't-shirts',
      description: 'Classic and comfortable t-shirts for everyday wear',
      section: 'men',
      featured: true,
      imageUrl: 'https://via.placeholder.com/80x80.png?text=T-Shirts',
      productCount: 24
    },
    {
      id: '2',
      name: 'Jeans',
      slug: 'jeans',
      description: 'Stylish jeans for men in various cuts and washes',
      section: 'men',
      featured: true,
      imageUrl: 'https://via.placeholder.com/80x80.png?text=Jeans',
      productCount: 18
    },
    {
      id: '3',
      name: 'Dresses',
      slug: 'dresses',
      description: 'Beautiful dresses for every occasion',
      section: 'women',
      featured: true,
      imageUrl: 'https://via.placeholder.com/80x80.png?text=Dresses',
      productCount: 32
    },
    {
      id: '4',
      name: 'Blouses',
      slug: 'blouses',
      description: 'Elegant blouses and tops for women',
      section: 'women',
      featured: false,
      imageUrl: 'https://via.placeholder.com/80x80.png?text=Blouses',
      productCount: 15
    },
    {
      id: '5',
      name: 'Accessories',
      slug: 'accessories',
      description: 'Finishing touches to complete your outfit',
      section: 'accessories',
      featured: false,
      imageUrl: 'https://via.placeholder.com/80x80.png?text=Accessories',
      productCount: 12
    }
  ];

  // Load categories on component mount
  useEffect(() => {
    // Simulate API call with demo data
    const loadCategories = () => {
      setLoading(true);
      setTimeout(() => {
        setCategories(demoCategories);
        setLoading(false);
      }, 800);
    };

    loadCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Auto-generate slug from name if in create mode
    if (formMode === 'create' && name === 'name') {
      setFormData({
        ...formData,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      });
    }
  };

  // Open form for creating a new category
  const openCreateForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      section: 'men',
      featured: false,
      imageUrl: '',
      productCount: 0
    });
    setFormMode('create');
    setIsFormOpen(true);
  };

  // Open form for editing an existing category
  const openEditForm = (categoryId: string) => {
    setSelectedCategory(null); // Close the dropdown
    const categoryToEdit = categories.find(cat => cat.id === categoryId);
    if (categoryToEdit) {
      setFormData({ ...categoryToEdit });
      setFormMode('edit');
      setIsFormOpen(true);
    }
  };

  // Close the form
  const closeForm = () => {
    setIsFormOpen(false);
    setFormError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.slug || !formData.section) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setIsSaving(true);
    setFormError(null);
    
    // Simulate API call
    setTimeout(() => {
      if (formMode === 'create') {
        const newCategory: Category = {
          ...formData as any,
          id: `new-${Date.now()}`,
        };
        setCategories([...categories, newCategory]);
        showToast('Category created successfully!', 'success');
      } else {
        setCategories(categories.map(cat => 
          cat.id === formData.id ? { ...cat, ...formData as any } : cat
        ));
        showToast('Category updated successfully!', 'success');
      }
      
      setIsSaving(false);
      closeForm();
    }, 800);
  };

  // Handle category deletion
  const handleDelete = (categoryId: string) => {
    setSelectedCategory(null); // Close the dropdown
    
    if (!confirm('Are you sure you want to delete this category? This might affect products in this category.')) {
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      showToast('Category deleted successfully!', 'success');
    }, 500);
  };

  // Filter categories based on search query and active filter
  const filteredCategories = categories.filter(category => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'featured') return matchesSearch && category.featured;
    return matchesSearch && category.section === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Store Categories</h1>
        </div>
        <button
          onClick={openCreateForm}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('men')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              activeFilter === 'men'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => setActiveFilter('women')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              activeFilter === 'women'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              activeFilter === 'featured'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Layers className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No categories found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery 
                ? 'Try adjusting your search query' 
                : activeFilter !== 'all' 
                  ? `No categories in the "${activeFilter}" section`
                  : 'Start by adding your first category'}
            </p>
            {!searchQuery && activeFilter === 'all' && (
              <button
                onClick={openCreateForm}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredCategories.map((category) => (
              <div 
                key={category.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 bg-gray-100 dark:bg-gray-700">
                  <CategoryImage
                    src={category.imageUrl}
                    alt={category.name}
                    size="lg"
                    className="w-full h-full"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {category.featured && (
                      <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs px-2 py-1 rounded-md font-medium">
                        Featured
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-md font-medium
                      ${category.section === 'men' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : category.section === 'women'
                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      }
                    `}>
                      {category.section}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/admin/products?category=${category.slug}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Products
                    </Link>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditForm(category.id)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formMode === 'create' ? 'Add New Category' : 'Edit Category'}
                </h2>
                <button 
                  onClick={closeForm}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {formError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-400">{formError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Slug*
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      URL-friendly version of the name. Used in URLs like /categories/mens-t-shirts
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Section*
                    </label>
                    <select
                      name="section"
                      value={formData.section || 'men'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Featured Category (appears on homepage)
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {formData.imageUrl && (
                    <div className="mt-2">
                      <div className="w-full h-40 relative rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                        <CategoryImage
                          src={formData.imageUrl}
                          alt="Category preview"
                          size="lg"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {formMode === 'create' ? 'Create Category' : 'Update Category'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 