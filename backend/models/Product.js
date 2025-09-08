import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    enum: ['Men', 'Women', 'Kids', 'Accessories'],
    default: 'Men'
  },
  subcategory: {
    type: String,
    enum: ['T-Shirts', 'Hoodies', 'Shirts', 'Tank Tops', 'Full Sleeve', 'Oversized'],
    default: 'T-Shirts'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: Number,
    height: Number,
    format: String
  }],
  models: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: '3D Model'
    },
    format: String,
    size: Number // File size in bytes
  }],
  colors: [{
    name: String,
    code: String,
    image: String
  }],
  sizes: [{
    name: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  }],
  material: {
    type: String,
    default: 'Cotton'
  },
  features: [String],
  tags: [String],
  isCustomizable: {
    type: Boolean,
    default: true
  },
  customizationOptions: {
    allowText: {
      type: Boolean,
      default: true
    },
    allowImages: {
      type: Boolean,
      default: true
    },
    allowDesigns: {
      type: Boolean,
      default: true
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  totalStock: {
    type: Number,
    default: 0,
    min: [0, 'Total stock cannot be negative']
  },
  sold: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    slug: String
  }
}, {
  timestamps: true
});

// Calculate total stock from sizes
productSchema.pre('save', function(next) {
  // Generate human-friendly productId if missing
  if (!this.productId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    this.productId = `PROD-${timestamp}-${random}`.toUpperCase();
  }
  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((total, size) => total + size.stock, 0);
  }
  next();
});

// Create slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo?.slug) {
    this.seo = this.seo || {};
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1 });

export default mongoose.model('Product', productSchema);
