import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Helper to safely access localStorage (only in browser context)
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Authentication service
export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      safeLocalStorage.setItem('auth_token', data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const token = safeLocalStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('/api/auth/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Authentication check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Auth check error:', error);
      throw error;
    }
  },

  logout: () => {
    safeLocalStorage.removeItem('auth_token');
  },
};

export const products = {
  getAll: async (params?: any) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Re-throw the error for the UI to handle
      throw new Error('Failed to fetch products');
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error('Failed to fetch product details');
    }
  },
  
  create: async (data: any) => {
    try {
      // Ensure auth token is included in the request
      const token = safeLocalStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await api.post('/products', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  },
  
  update: async (id: string, data: any) => {
    try {
      // Ensure auth token is included in the request
      const token = safeLocalStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await api.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw new Error('Failed to update product');
    }
  },
  
  delete: async (id: string) => {
    try {
      // Ensure auth token is included in the request
      const token = safeLocalStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw new Error('Failed to delete product');
    }
  },
};

export const orders = {
  getAll: async (params?: any) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export const customers = {
  getAll: async (params?: any) => {
    const response = await api.get('/customers', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  },
};

// Analytics service
export const analytics = {
  getStats: async (timeRange: string) => {
    try {
      // For demo purposes, return mock data
      return [
        {
          name: 'Total Revenue',
          value: '$124,500',
          change: '+12.5%',
          trend: 'up',
          icon: 'DollarSign',
        },
        {
          name: 'Total Orders',
          value: '1,234',
          change: '+8.2%',
          trend: 'up',
          icon: 'ShoppingCart',
        },
        {
          name: 'New Customers',
          value: '856',
          change: '+15.3%',
          trend: 'up',
          icon: 'Users',
        },
        {
          name: 'Average Order Value',
          value: '$101.25',
          change: '+4.1%',
          trend: 'up',
          icon: 'TrendingUp',
        },
      ];
    } catch (error) {
      console.error('Stats fetch error:', error);
      throw error;
    }
  },

  getSalesTrend: async (timeRange: string) => {
    try {
      // Mock data for sales trend
      return [
        { date: 'Jan', sales: 4000 },
        { date: 'Feb', sales: 3000 },
        { date: 'Mar', sales: 5000 },
        { date: 'Apr', sales: 2780 },
        { date: 'May', sales: 1890 },
        { date: 'Jun', sales: 2390 },
        { date: 'Jul', sales: 3490 },
      ];
    } catch (error) {
      console.error('Sales trend fetch error:', error);
      throw error;
    }
  },

  getCategoryDistribution: async (timeRange: string) => {
    try {
      // Mock data for category distribution
      return [
        { category: 'Men', sales: 45 },
        { category: 'Women', sales: 35 },
        { category: 'Kids', sales: 20 },
      ];
    } catch (error) {
      console.error('Category distribution fetch error:', error);
      throw error;
    }
  },

  getTopProducts: async (timeRange: string) => {
    try {
      // Mock data for top products
      return [
        { name: 'Classic T-Shirt', sales: 245, revenue: '$7,347.55' },
        { name: 'Denim Jeans', sales: 189, revenue: '$15,118.11' },
        { name: 'Running Shoes', sales: 156, revenue: '$20,277.44' },
        { name: 'Hoodie', sales: 134, revenue: '$4,020.00' },
        { name: 'Socks', sales: 98, revenue: '$1,470.00' },
      ];
    } catch (error) {
      console.error('Top products fetch error:', error);
      throw error;
    }
  },
}; 