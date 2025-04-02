export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  color?: string;
  size?: string;
  weight?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  categoryId?: string;
  categoryName?: string;
  section?: 'men' | 'women' | 'kids' | 'accessories';
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  inStock: boolean;
  images: ProductImage[];
  variants?: ProductVariant[];
  tags: string[];
  attributes?: Record<string, string>;
  relatedProducts?: string[];
  createdAt: string;
  updatedAt: string;
}

// Demo products data
export const demoProducts: Product[] = [
  {
    id: 'p1',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-t-shirt',
    description: 'A comfortable, classic white t-shirt made from premium cotton. Perfect for everyday wear.',
    shortDescription: 'Premium cotton classic white tee',
    price: 24.99,
    compareAtPrice: 29.99,
    categoryId: '1',
    categoryName: 'T-Shirts',
    section: 'men',
    featured: true,
    new: true,
    bestSeller: true,
    inStock: true,
    images: [
      { id: 'img1', url: '/images/products/tshirt-white-1.jpg', alt: 'Classic white t-shirt front', isPrimary: true },
      { id: 'img2', url: '/images/products/tshirt-white-2.jpg', alt: 'Classic white t-shirt back', isPrimary: false }
    ],
    variants: [
      { id: 'v1', name: 'Small', sku: 'WT-S', price: 24.99, inventory: 25, size: 'S' },
      { id: 'v2', name: 'Medium', sku: 'WT-M', price: 24.99, inventory: 35, size: 'M' },
      { id: 'v3', name: 'Large', sku: 'WT-L', price: 24.99, inventory: 20, size: 'L' }
    ],
    tags: ['basics', 'cotton', 'summer'],
    attributes: {
      material: '100% Cotton',
      fit: 'Regular',
      care: 'Machine wash cold'
    },
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-05-20T14:22:00Z'
  },
  {
    id: 'p2',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'Modern slim fit jeans in a versatile dark wash. These jeans offer the perfect balance of style and comfort.',
    shortDescription: 'Modern slim fit jeans in dark wash',
    price: 59.99,
    categoryId: '2',
    categoryName: 'Jeans',
    section: 'men',
    featured: true,
    bestSeller: true,
    inStock: true,
    images: [
      { id: 'img3', url: '/images/products/jeans-slim-1.jpg', alt: 'Slim fit jeans front', isPrimary: true },
      { id: 'img4', url: '/images/products/jeans-slim-2.jpg', alt: 'Slim fit jeans back', isPrimary: false }
    ],
    variants: [
      { id: 'v4', name: '30x30', sku: 'SJ-3030', price: 59.99, inventory: 15, size: '30x30' },
      { id: 'v5', name: '32x32', sku: 'SJ-3232', price: 59.99, inventory: 20, size: '32x32' },
      { id: 'v6', name: '34x34', sku: 'SJ-3434', price: 59.99, inventory: 12, size: '34x34' }
    ],
    tags: ['denim', 'slim fit', 'casual'],
    attributes: {
      material: '98% Cotton, 2% Elastane',
      fit: 'Slim',
      care: 'Machine wash cold, tumble dry low'
    },
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-05-18T11:42:00Z'
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
    categoryName: 'Dresses',
    section: 'women',
    featured: true,
    new: true,
    inStock: true,
    images: [
      { id: 'img5', url: '/images/products/dress-floral-1.jpg', alt: 'Floral summer dress front', isPrimary: true },
      { id: 'img6', url: '/images/products/dress-floral-2.jpg', alt: 'Floral summer dress side', isPrimary: false }
    ],
    variants: [
      { id: 'v7', name: 'Small', sku: 'FD-S', price: 49.99, inventory: 18, size: 'S' },
      { id: 'v8', name: 'Medium', sku: 'FD-M', price: 49.99, inventory: 22, size: 'M' },
      { id: 'v9', name: 'Large', sku: 'FD-L', price: 49.99, inventory: 15, size: 'L' }
    ],
    tags: ['dress', 'floral', 'summer'],
    attributes: {
      material: '100% Rayon',
      fit: 'Regular',
      length: 'Midi',
      care: 'Hand wash cold, line dry'
    },
    createdAt: '2023-04-22T13:45:00Z',
    updatedAt: '2023-05-19T10:30:00Z'
  },
  {
    id: 'p4',
    name: 'Silk Blouse',
    slug: 'silk-blouse',
    description: 'An elegant silk blouse that transitions seamlessly from office to evening. Features a classic collar and button-front design.',
    shortDescription: 'Elegant silk blouse with classic design',
    price: 89.99,
    categoryId: '4',
    categoryName: 'Blouses',
    section: 'women',
    bestSeller: true,
    inStock: true,
    images: [
      { id: 'img7', url: '/images/products/blouse-silk-1.jpg', alt: 'Silk blouse front', isPrimary: true },
      { id: 'img8', url: '/images/products/blouse-silk-2.jpg', alt: 'Silk blouse detail', isPrimary: false }
    ],
    variants: [
      { id: 'v10', name: 'Small', sku: 'SB-S', price: 89.99, inventory: 10, size: 'S' },
      { id: 'v11', name: 'Medium', sku: 'SB-M', price: 89.99, inventory: 12, size: 'M' },
      { id: 'v12', name: 'Large', sku: 'SB-L', price: 89.99, inventory: 8, size: 'L' }
    ],
    tags: ['blouse', 'silk', 'elegant', 'office'],
    attributes: {
      material: '100% Silk',
      fit: 'Regular',
      care: 'Dry clean only'
    },
    createdAt: '2023-02-28T15:20:00Z',
    updatedAt: '2023-05-15T09:10:00Z'
  },
  {
    id: 'p5',
    name: 'Leather Watch',
    slug: 'leather-watch',
    description: 'A classic timepiece with a genuine leather strap and minimalist dial. Water-resistant up to 30 meters.',
    shortDescription: 'Classic leather watch with minimalist design',
    price: 129.99,
    compareAtPrice: 159.99,
    categoryId: '5',
    categoryName: 'Accessories',
    section: 'accessories',
    featured: true,
    inStock: true,
    images: [
      { id: 'img9', url: '/images/products/watch-leather-1.jpg', alt: 'Leather watch front', isPrimary: true },
      { id: 'img10', url: '/images/products/watch-leather-2.jpg', alt: 'Leather watch side', isPrimary: false }
    ],
    variants: [
      { id: 'v13', name: 'Brown', sku: 'LW-BR', price: 129.99, inventory: 15, color: 'Brown' },
      { id: 'v14', name: 'Black', sku: 'LW-BK', price: 129.99, inventory: 18, color: 'Black' }
    ],
    tags: ['watch', 'leather', 'accessories'],
    attributes: {
      material: 'Stainless Steel, Genuine Leather',
      waterResistance: '30m',
      warranty: '2 years'
    },
    createdAt: '2023-01-15T11:30:00Z',
    updatedAt: '2023-05-12T16:40:00Z'
  }
];

// Function to get all products
export async function getAllProducts(): Promise<Product[]> {
  // In a real app, this would be a database call
  return Promise.resolve(demoProducts);
}

// Function to get products by section (men, women, etc.)
export async function getProductsBySection(section: string): Promise<Product[]> {
  return Promise.resolve(demoProducts.filter(product => product.section === section));
}

// Function to get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return Promise.resolve(demoProducts.filter(product => product.categoryId === categoryId));
}

// Function to get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  return Promise.resolve(demoProducts.filter(product => product.featured));
}

// Function to get a product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const product = demoProducts.find(p => p.id === id);
  return Promise.resolve(product || null);
}

// Function to get a product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = demoProducts.find(p => p.slug === slug);
  return Promise.resolve(product || null);
}

// Function to search products
export async function searchProducts(query: string): Promise<Product[]> {
  const lowerQuery = query.toLowerCase();
  return Promise.resolve(
    demoProducts.filter(
      product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  );
} 