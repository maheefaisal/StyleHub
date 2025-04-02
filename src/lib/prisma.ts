// Mock Prisma client for development
// In a real app, you'd use PrismaClient properly

// Creating a mock object that won't throw errors when imported
const mockPrismaClient = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({})
  },
  product: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({})
  },
  category: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({})
  },
  order: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({})
  },
  orderItem: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({})
  }
};

// Create a persistent products array to store all products
let products = [
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-t-shirt',
    description: 'A comfortable, classic white t-shirt made from premium cotton. Perfect for everyday wear.',
    shortDescription: 'Premium cotton classic white tee',
    price: 24.99,
    compareAtPrice: 29.99,
    categoryId: '1',
    category: 'T-Shirts',
    categoryName: 'T-Shirts',
    section: 'men',
    featured: true,
    new: true,
    bestSeller: true,
    inStock: true,
    inventory: 100,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop"
    ],
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: 'p2',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'Modern slim fit jeans in a versatile dark wash. These jeans offer the perfect balance of style and comfort.',
    shortDescription: 'Modern slim fit jeans in dark wash',
    price: 59.99,
    categoryId: '2',
    category: 'Jeans',
    categoryName: 'Jeans',
    section: 'men',
    featured: true,
    bestSeller: true,
    inStock: true,
    inventory: 50,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop"
    ],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-05-18')
  },
  {
    id: 'p3',
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description: 'A beautiful floral dress perfect for summer days. Made from lightweight fabric with a flattering silhouette.',
    shortDescription: 'Lightweight floral print summer dress',
    price: 49.99,
    compareAtPrice: 65.99,
    categoryId: '3',
    category: 'Dresses',
    categoryName: 'Dresses',
    section: 'women',
    featured: true,
    new: true,
    inStock: true,
    inventory: 30,
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop"
    ],
    createdAt: new Date('2023-04-22'),
    updatedAt: new Date('2023-05-19')
  },
  {
    id: 'p4',
    name: 'Leather Watch',
    slug: 'leather-watch',
    description: 'Elegant leather watch with a classic design that complements any outfit.',
    shortDescription: 'Classic leather wristwatch',
    price: 129.99,
    categoryId: '4',
    category: 'Accessories',
    categoryName: 'Accessories',
    section: 'accessories',
    featured: true,
    new: false,
    bestSeller: true,
    inStock: true,
    inventory: 25,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format&fit=crop"
    ],
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'p5',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Performance running shoes designed for comfort and speed.',
    shortDescription: 'High-performance running shoes',
    price: 89.99,
    compareAtPrice: 110.99,
    categoryId: '5',
    category: 'Footwear',
    categoryName: 'Footwear',
    section: 'sports',
    featured: true,
    new: true,
    bestSeller: false,
    inStock: true,
    inventory: 40,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop"
    ],
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-05-10')
  }
];

// Export the mock client
export const prisma = {
  product: {
    findMany: async () => {
      return products;
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return products.find(p => p.id === where.id) || null;
    },
    create: async ({ data }: { data: any }) => {
      // Ensure all required fields are present and properly formatted
      const newProduct = {
        id: `p${Date.now()}`,
        name: data.name || '',
        slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-') || '',
        description: data.description || '',
        shortDescription: data.shortDescription || '',
        price: Number(data.price) || 0,
        compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
        categoryId: data.categoryId || '',
        category: data.category || '',
        categoryName: data.categoryName || '',
        section: data.section || 'men',
        featured: Boolean(data.featured),
        new: Boolean(data.new),
        bestSeller: Boolean(data.bestSeller),
        inStock: Boolean(data.inStock),
        inventory: Number(data.inventory) || 0,
        images: Array.isArray(data.images) ? data.images : [],
        variants: Array.isArray(data.variants) ? data.variants : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        attributes: typeof data.attributes === 'object' ? data.attributes : {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Add the new product to the products array
      products.push(newProduct);
      
      return newProduct;
    },
    update: async ({ where, data }: { where: { id: string }, data: any }) => {
      const index = products.findIndex(p => p.id === where.id);
      
      if (index === -1) return null;
      
      const updatedProduct = {
        ...products[index],
        ...data,
        updatedAt: new Date()
      };
      
      // Update the product in the array
      products[index] = updatedProduct;
      
      return updatedProduct;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const index = products.findIndex(p => p.id === where.id);
      
      if (index === -1) return null;
      
      // Remove the product from the array
      const deletedProduct = products[index];
      products = products.filter(p => p.id !== where.id);
      
      return deletedProduct;
    }
  },
  
  user: {
    findUnique: async ({ where }: { where: { email: string } }) => {
      // Mock admin user for testing
      if (where.email === "admin@example.com") {
        return {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          password: "$2a$10$GQH8DVsNfvP3aH.8XwnO8uQRZ1VdGDaUwjyqbIqY9W5V.qVe9MjNm", // hashed "password123"
          role: "admin",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        };
      }
      
      return null;
    },
    findMany: async () => {
      return [
        {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        },
        {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "user",
          createdAt: new Date("2023-02-15"),
          updatedAt: new Date("2023-02-15")
        },
        {
          id: "3",
          email: "jane@example.com",
          name: "Jane Smith",
          role: "user",
          createdAt: new Date("2023-03-10"),
          updatedAt: new Date("2023-03-10")
        }
      ];
    }
  },
  
  category: {
    findMany: async () => {
      return [
        {
          id: "1",
          name: "T-Shirts",
          slug: "t-shirts",
          description: "Comfortable t-shirts for everyday wear",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        },
        {
          id: "2",
          name: "Jeans",
          slug: "jeans",
          description: "Stylish jeans for all occasions",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        },
        {
          id: "3",
          name: "Dresses",
          slug: "dresses",
          description: "Beautiful dresses for special occasions",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        },
        {
          id: "4",
          name: "Accessories",
          slug: "accessories",
          description: "Complete your look with our accessories",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        },
        {
          id: "5",
          name: "Footwear",
          slug: "footwear",
          description: "Comfortable and stylish footwear",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-01-01")
        }
      ];
    }
  },
  
  order: {
    findMany: async () => {
      return [
        {
          id: "ord1",
          userId: "2",
          total: 299.99,
          status: "completed",
          createdAt: new Date(Date.now() - 86400000 * 2),
          updatedAt: new Date(Date.now() - 86400000 * 2),
          items: [
            {
              id: "item1",
              orderId: "ord1",
              productId: "p1",
              quantity: 2,
              price: 24.99
            },
            {
              id: "item2",
              orderId: "ord1",
              productId: "p4",
              quantity: 1,
              price: 129.99
            }
          ],
          customer: {
            name: "Regular User"
          }
        },
        {
          id: "ord2",
          userId: "3",
          total: 199.99,
          status: "pending",
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 86400000),
          items: [
            {
              id: "item3",
              orderId: "ord2",
              productId: "p2",
              quantity: 1,
              price: 59.99
            },
            {
              id: "item4",
              orderId: "ord2",
              productId: "p5",
              quantity: 1,
              price: 89.99
            }
          ],
          customer: {
            name: "Jane Smith"
          }
        },
        {
          id: "ord3",
          userId: "2",
          total: 399.99,
          status: "processing",
          createdAt: new Date(Date.now() - 172800000),
          updatedAt: new Date(Date.now() - 172800000),
          items: [
            {
              id: "item5",
              orderId: "ord3",
              productId: "p3",
              quantity: 2,
              price: 49.99
            },
            {
              id: "item6",
              orderId: "ord3",
              productId: "p4",
              quantity: 1,
              price: 129.99
            },
            {
              id: "item7",
              orderId: "ord3",
              productId: "p5",
              quantity: 1,
              price: 89.99
            }
          ],
          customer: {
            name: "Regular User"
          }
        }
      ];
    }
  }
}; 