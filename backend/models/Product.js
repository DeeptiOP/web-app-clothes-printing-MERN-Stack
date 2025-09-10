import mongoose from "mongoose";
import { generateProductId, generateSKU } from "../utils/idGenerator.js";

// Cloudinary base URL (can adjust based on your account setup)
const CLOUDINARY_BASE = "https://res.cloudinary.com/CLOUDINARY_CLOUD_NAME/image/upload/";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      maxlength: [100, "Product name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: ["Men", "Women", "Kids", "Accessories"],
      default: "Men",
    },
    subcategory: {
      type: String,
      enum: ["T-Shirts", "Hoodies", "Shirts", "Tank Tops", "Full Sleeve", "Oversized"],
      default: "T-Shirts",
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
        width: Number,
        height: Number,
        format: String,
      },
    ],
    models: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          default: "3D Model",
        },
        format: String,
        size: Number,
      },
    ],
    colors: [
      {
        name: String,
        code: String, // hex or rgb
        image: String, // cloudinary link
      },
    ],
    sizes: [
      {
        name: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        },
        stock: {
          type: Number,
          default: 0,
          min: [0, "Stock cannot be negative"],
        },
      },
    ],
    material: {
      type: String,
      default: "Cotton",
    },
    features: [String],
    tags: [String],
    isCustomizable: {
      type: Boolean,
      default: true,
    },
    customizationOptions: {
      allowText: { type: Boolean, default: true },
      allowImages: { type: Boolean, default: true },
      allowDesigns: { type: Boolean, default: true },
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be less than 0"],
        max: [5, "Rating cannot be more than 5"],
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    totalStock: {
      type: Number,
      default: 0,
      min: [0, "Total stock cannot be negative"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      slug: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Auto-calculate total stock
productSchema.pre("save", function (next) {
  if (this.sizes && this.sizes.length > 0) {
    this.totalStock = this.sizes.reduce((total, size) => total + size.stock, 0);
  }
  next();
});

// ✅ Auto-generate slug
productSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.seo?.slug) {
    this.seo = this.seo || {};
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

// ✅ Generate productId & SKU
productSchema.pre("save", function (next) {
  if (this.isNew) {
    if (!this.productId) {
      this.productId = generateProductId();
    }
    if (!this.sku) {
      this.sku = generateSKU(this.category, this.subcategory);
    }
  }
  next();
});

// ✅ Ensure Cloudinary URLs are always returned
productSchema.methods.getCloudinaryImages = function () {
  return this.images.map((img) => ({
    ...img._doc,
    url: img.url.startsWith("http") ? img.url : `${CLOUDINARY_BASE}${img.publicId}`,
  }));
};
productSchema.methods.getCloudinaryModels = function () {
  return this.models.map((mdl) => ({
    ...mdl._doc,
    url: mdl.url.startsWith("http") ? mdl.url : `${CLOUDINARY_BASE}${mdl.publicId}`,
  }));
};

// ✅ Static method for filters
productSchema.statics.filterProducts = async function (filters = {}) {
  const query = {};

  if (filters.category) query.category = filters.category;
  if (filters.subcategory) query.subcategory = filters.subcategory;
  if (filters.color) query["colors.name"] = filters.color;
  if (filters.size) query["sizes.name"] = filters.size;
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }

  return this.find(query);
};

// ✅ Indexes
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ "rating.average": -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1 });

export default mongoose.model("Product", productSchema);
