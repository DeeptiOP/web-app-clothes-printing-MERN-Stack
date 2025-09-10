import express from 'express';
import Product from '../models/Product.js';
import { protect, restrictTo, optionalAuth } from '../middleware/auth.js';
import { uploadProductAssets, handleMulterError } from '../middleware/upload.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const {
      category,
      subcategory,
      minPrice,
      maxPrice,
      search,
      sort,
      page = 1,
      limit = 12,
      featured,
      inStock
    } = req.query;

    // Build query object
    let query = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Subcategory filter
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // In stock filter
    if (inStock === 'true') {
      query.totalStock = { $gt: 0 };
    }

    // Sort options
    let sortOptions = {};
    switch (sort) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'rating':
        sortOptions['rating.average'] = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'popular':
        sortOptions.sold = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    // Text search score for relevance
    if (search) {
      sortOptions.score = { $meta: 'textScore' };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / Number(limit));
    const hasNextPage = Number(page) < totalPages;
    const hasPrevPage = Number(page) > 1;

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pagination: {
        currentPage: Number(page),
        totalPages,
        hasNextPage,
        hasPrevPage,
        limit: Number(limit)
      },
      data: products
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new product with files
// @route   POST /api/products/with-files
// @access  Private/Admin
router.post('/with-files', protect, restrictTo('admin'), uploadProductAssets, handleMulterError, async (req, res, next) => {
  try {
    const productData = JSON.parse(req.body.productData || '{}');
    
    // Upload images if provided
    if (req.files.images) {
      const imagePromises = req.files.images.map(async (file, index) => {
        const filename = `product_image_${Date.now()}_${index}`;
        const result = await uploadBufferToCloudinary(file.buffer, 'products/images', filename);
        return {
          url: result.url,
          publicId: result.publicId,
          alt: `Product image ${index + 1}`,
          width: result.width,
          height: result.height,
          format: result.format
        };
      });
      productData.images = await Promise.all(imagePromises);
    }

    // Upload 3D models if provided
    if (req.files.models) {
      const modelPromises = req.files.models.map(async (file, index) => {
        const filename = `model_${Date.now()}_${index}`;
        const result = await uploadBufferToCloudinary(file.buffer, 'products/models', filename);
        return {
          url: result.url,
          publicId: result.publicId,
          name: file.originalname,
          format: result.format,
          size: file.size
        };
      });
      productData.models = await Promise.all(modelPromises);
    }

    // Upload color images if provided
    if (req.files.colorImages) {
      const colorImagePromises = req.files.colorImages.map(async (file, index) => {
        const filename = `color_image_${Date.now()}_${index}`;
        const result = await uploadBufferToCloudinary(file.buffer, 'products/colors', filename);
        return {
          url: result.url,
          publicId: result.publicId,
          alt: `Color variant ${index + 1}`,
          width: result.width,
          height: result.height,
          format: result.format
        };
      });
      
      // Update colors array with uploaded images
      if (productData.colors && productData.colors.length > 0) {
        productData.colors.forEach((color, index) => {
          if (colorImagePromises[index]) {
            color.image = colorImagePromises[index].url;
          }
        });
      }
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully with files',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new product (without files)
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete - set isActive to false
    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get product categories
// @route   GET /api/products/categories/list
// @access  Public
router.get('/categories/list', async (req, res, next) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    const subcategories = await Product.distinct('subcategory', { isActive: true });

    res.status(200).json({
      success: true,
      data: {
        categories,
        subcategories
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get featured products
// @route   GET /api/products/featured/list
// @access  Public
router.get('/featured/list', async (req, res, next) => {
  try {
    const products = await Product.find({
      isActive: true,
      isFeatured: true
    })
      .sort({ createdAt: -1 })
      .limit(8)
      .select('-__v');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
router.get('/category/:category', optionalAuth, async (req, res, next) => {
  try {
    const { page = 1, limit = 12, sort } = req.query;
    const { category } = req.params;

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { price: 1 };
    if (sort === 'price-high') sortOptions = { price: -1 };
    if (sort === 'rating') sortOptions = { 'rating.average': -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find({
      category: category,
      isActive: true
    })
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Product.countDocuments({
      category: category,
      isActive: true
    });

    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pagination: {
        currentPage: Number(page),
        totalPages,
        hasNextPage: Number(page) < totalPages,
        hasPrevPage: Number(page) > 1,
        limit: Number(limit)
      },
      data: products
    });
  } catch (error) {
    next(error);
  }
});

export default router;
