// Mock database functions for demo purposes
import { prisma } from './prisma';

export async function getStats(timeRange: string) {
  // Get orders from our mock Prisma client
  const orders = await prisma.order.findMany();
  
  // Filter orders based on time range
  const now = new Date();
  let startDate = new Date();
  
  switch (timeRange) {
    case 'day':
      startDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  const filteredOrders = orders.filter(order => 
    new Date(order.createdAt) >= startDate
  );
  
  // Calculate stats from filtered orders
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = filteredOrders.length;
  
  // Get users
  const users = await prisma.user.findMany();
  const newCustomers = users.filter(user => 
    user.role === 'user' && 
    new Date(user.createdAt) >= startDate
  ).length;
  
  // Calculate average order value
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return [
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      trend: 'up',
      icon: 'DollarSign',
    },
    {
      name: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: 'ShoppingCart',
    },
    {
      name: 'New Customers',
      value: newCustomers.toString(),
      change: '+15.3%',
      trend: 'up',
      icon: 'Users',
    },
    {
      name: 'Average Order Value',
      value: `$${avgOrderValue.toFixed(2)}`,
      change: '+4.1%',
      trend: 'up',
      icon: 'TrendingUp',
    },
  ];
}

export async function getSalesTrend(timeRange: string) {
  // Get orders from our mock Prisma client
  const orders = await prisma.order.findMany();
  
  // Set up date range
  let days = 30;
  
  switch (timeRange) {
    case 'day':
      days = 24; // hours in a day
      break;
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 12; // months in a year
      break;
  }

  // Create date buckets
  const now = new Date();
  const buckets = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    
    if (timeRange === 'day') {
      date.setHours(date.getHours() - i);
      date.setMinutes(0, 0, 0);
    } else if (timeRange === 'week' || timeRange === 'month') {
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
    } else if (timeRange === 'year') {
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
    }
    
    buckets.push({
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime(),
      sales: 0
    });
  }
  
  // Aggregate orders into buckets
  orders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    let bucket;
    
    if (timeRange === 'day') {
      orderDate.setMinutes(0, 0, 0);
      bucket = buckets.find(b => new Date(b.date).getHours() === orderDate.getHours() && 
                                 new Date(b.date).getDay() === orderDate.getDay());
    } else if (timeRange === 'week' || timeRange === 'month') {
      orderDate.setHours(0, 0, 0, 0);
      bucket = buckets.find(b => b.date === orderDate.toISOString().split('T')[0]);
    } else if (timeRange === 'year') {
      orderDate.setDate(1);
      orderDate.setHours(0, 0, 0, 0);
      bucket = buckets.find(b => {
        const bDate = new Date(b.date);
        return bDate.getMonth() === orderDate.getMonth() && 
               bDate.getFullYear() === orderDate.getFullYear();
      });
    }
    
    if (bucket) {
      bucket.sales += order.total;
    }
  });

  return buckets.sort((a, b) => a.timestamp - b.timestamp).map(bucket => ({
    date: bucket.date,
    sales: bucket.sales
  }));
}

export async function getCategoryDistribution(timeRange: string) {
  // Get products and orders from our mock Prisma client
  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany();
  
  // Filter orders based on time range
  const now = new Date();
  let startDate = new Date();
  
  switch (timeRange) {
    case 'day':
      startDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  const filteredOrders = orders.filter(order => 
    new Date(order.createdAt) >= startDate
  );
  
  // Create category sales map
  const categorySales = {};
  
  // Process order items
  filteredOrders.forEach(order => {
    (order.items || []).forEach(item => {
      const product = products.find(p => p.id === item.productId);
      
      if (product) {
        const category = product.category || product.categoryName;
        const sale = item.quantity * item.price;
        
        categorySales[category] = (categorySales[category] || 0) + sale;
      }
    });
  });
  
  // Convert map to array
  return Object.entries(categorySales).map(([category, sales]) => ({
    category,
    sales
  }));
}

export async function getTopProducts(timeRange: string) {
  // Get products and orders from our mock Prisma client
  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany();
  
  // Filter orders based on time range
  const now = new Date();
  let startDate = new Date();
  
  switch (timeRange) {
    case 'day':
      startDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  const filteredOrders = orders.filter(order => 
    new Date(order.createdAt) >= startDate
  );
  
  // Create product sales map
  const productSales = {};
  
  // Process order items
  filteredOrders.forEach(order => {
    (order.items || []).forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          quantity: 0,
          revenue: 0
        };
      }
      
      productSales[item.productId].quantity += item.quantity;
      productSales[item.productId].revenue += item.quantity * item.price;
    });
  });
  
  // Convert map to array and sort by quantity
  const topProducts = Object.entries(productSales)
    .map(([productId, sales]) => {
      const product = products.find(p => p.id === productId);
      return {
        name: product ? product.name : 'Unknown Product',
        sales: sales.quantity,
        revenue: `$${sales.revenue.toFixed(2)}`
      };
    })
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);
  
  // If we don't have enough products with sales, add some from our product catalog
  if (topProducts.length < 5) {
    const remainingProducts = products
      .filter(p => !Object.keys(productSales).includes(p.id))
      .slice(0, 5 - topProducts.length)
      .map(p => ({
        name: p.name,
        sales: 0,
        revenue: '$0.00'
      }));
    
    topProducts.push(...remainingProducts);
  }
  
  return topProducts;
} 