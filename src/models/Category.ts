import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  section: {
    type: String,
    enum: ['men', 'women', 'accessories'],
    default: 'men'
  },
  image: {
    url: String,
    alt: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better query performance
categorySchema.index({ name: 'text', description: 'text' });
categorySchema.index({ section: 1 });
categorySchema.index({ slug: 1 }, { unique: true });

// Add virtual populate for products
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categoryId'
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema); 