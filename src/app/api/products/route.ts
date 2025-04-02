import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET all products
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Get filters from query params
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const section = searchParams.get('section');
    
    // Build query
    const query: any = { active: true };
    if (categoryId) {
      query.categoryId = categoryId;
    }
    if (section) {
      query['category.section'] = section;
    }
    
    // Find products in MongoDB with populated category
    const products = await Product.find(query)
      .populate('categoryId', 'name slug section')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await verifyAuth(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized or insufficient permissions' }, { status: 401 });
    }
    
    // Connect to MongoDB
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: "Name, price, and category are required" },
        { status: 400 }
      );
    }
    
    // Create product using MongoDB
    const product = await Product.create({
      ...body,
      slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Populate category before returning
    await product.populate('categoryId', 'name slug section');
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
} 