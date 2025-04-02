import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Admin user created/updated:', admin.email);

  // Create categories
  const categories = [
    {
      name: 'T-Shirts',
      slug: 't-shirts',
      description: 'Classic and comfortable t-shirts for everyday wear',
      section: 'men',
      image: '/images/categories/t-shirts.jpg'
    },
    {
      name: 'Jeans',
      slug: 'jeans',
      description: 'Stylish jeans for men in various cuts and washes',
      section: 'men',
      image: '/images/categories/jeans-men.jpg'
    },
    {
      name: 'Dresses',
      slug: 'dresses',
      description: 'Beautiful dresses for every occasion',
      section: 'women',
      image: '/images/categories/dresses.jpg'
    },
    {
      name: 'Blouses',
      slug: 'blouses',
      description: 'Elegant blouses and tops for women',
      section: 'women',
      image: '/images/categories/blouses.jpg'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Finishing touches to complete your outfit',
      section: 'accessories',
      image: '/images/categories/accessories.jpg'
    }
  ];

  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.log(`Category created/updated: ${result.name}`);
  }

  // Create some demo products
  const products = [
    {
      name: 'Classic White T-Shirt',
      slug: 'classic-white-t-shirt',
      description: 'A comfortable, classic white t-shirt made from premium cotton.',
      shortDescription: 'Premium cotton classic white tee',
      price: 24.99,
      compareAtPrice: 29.99,
      categoryId: '1', // This will be updated below
      section: 'men',
      featured: true,
      new: true,
      bestSeller: true,
      inStock: true,
      images: JSON.stringify([
        { id: 'img1', url: '/images/products/tshirt-white-1.jpg', alt: 'White t-shirt front', isPrimary: true },
        { id: 'img2', url: '/images/products/tshirt-white-2.jpg', alt: 'White t-shirt back', isPrimary: false },
      ]),
      variants: JSON.stringify([
        { id: 'v1', name: 'Small', sku: 'WT-S', price: 24.99, inventory: 25, size: 'S' },
        { id: 'v2', name: 'Medium', sku: 'WT-M', price: 24.99, inventory: 35, size: 'M' },
        { id: 'v3', name: 'Large', sku: 'WT-L', price: 24.99, inventory: 20, size: 'L' },
      ]),
      tags: JSON.stringify(['basics', 'cotton', 'summer']),
      attributes: JSON.stringify({
        material: '100% Cotton',
        fit: 'Regular',
        care: 'Machine wash cold',
      }),
    },
    {
      name: 'Floral Summer Dress',
      slug: 'floral-summer-dress',
      description: 'A beautiful floral dress perfect for summer days.',
      shortDescription: 'Lightweight floral print summer dress',
      price: 49.99,
      compareAtPrice: 65.99,
      categoryId: '3', // This will be updated below
      section: 'women',
      featured: true,
      new: true,
      bestSeller: false,
      inStock: true,
      images: JSON.stringify([
        { id: 'img5', url: '/images/products/dress-floral-1.jpg', alt: 'Floral dress front', isPrimary: true },
        { id: 'img6', url: '/images/products/dress-floral-2.jpg', alt: 'Floral dress side', isPrimary: false },
      ]),
      variants: JSON.stringify([
        { id: 'v7', name: 'Small', sku: 'FD-S', price: 49.99, inventory: 18, size: 'S' },
        { id: 'v8', name: 'Medium', sku: 'FD-M', price: 49.99, inventory: 22, size: 'M' },
        { id: 'v9', name: 'Large', sku: 'FD-L', price: 49.99, inventory: 15, size: 'L' },
      ]),
      tags: JSON.stringify(['dress', 'floral', 'summer']),
      attributes: JSON.stringify({
        material: '100% Rayon',
        fit: 'Regular',
        length: 'Midi',
        care: 'Hand wash cold, line dry',
      }),
    },
  ];

  // Get the actual category IDs from the database
  const tshirtCategory = await prisma.category.findUnique({ where: { slug: 't-shirts' } });
  const dressCategory = await prisma.category.findUnique({ where: { slug: 'dresses' } });

  if (tshirtCategory) products[0].categoryId = tshirtCategory.id;
  if (dressCategory) products[1].categoryId = dressCategory.id;

  for (const product of products) {
    const result = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...product,
        categoryName: product.categoryId === tshirtCategory?.id ? 'T-Shirts' : 'Dresses',
      },
      create: {
        ...product,
        categoryName: product.categoryId === tshirtCategory?.id ? 'T-Shirts' : 'Dresses',
      },
    });
    console.log(`Product created/updated: ${result.name}`);
  }

  console.log('Database seeding completed!');
}

main()
  .catch(e => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 