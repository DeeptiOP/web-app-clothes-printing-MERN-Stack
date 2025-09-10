import express from 'express';
import Product from '../models/Product.js';
import { protect, restrictTo, optionalAuth } from '../middleware/auth.js';
import { uploadProductAssets, handleMulterError } from '../middleware/upload.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

const router = express.Router();

/**
 * ---------------------------
 * PUBLIC ROUTES
 * ---------------------------
 */

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
router.get('/search', optionalAuth, async (req, res, next) => {
  try {
    const { q, page = 1, limit = 12, sort } = req.query;

    if (!q) return res.status(400).json({ success: false, message: 'Query parameter is required' });

    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = getSortOptions(sort);

    const query = { $text: { $search: q }, isActive: true };

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Product.countDocuments(query);
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

router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { page = 1, limit = 12, sort } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = getSortOptions(sort);

    const query = { isActive: true };
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Product.countDocuments(query);
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
// @desc    Get product categories & subcategories
// @route   GET /api/products/categories/list
// @access  Public
router.get('/categories/list', async (req, res, next) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    const subcategories = await Product.distinct('subcategory', { isActive: true });

    res.status(200).json({
      success: true,
      data: { categories, subcategories }
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
    const products = await Product.find({ isActive: true, isFeatured: true })
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
// @route   GET /api/products/by-category/:category
// @access  Public
router.get('/by-category/:category', optionalAuth, async (req, res, next) => {
  try {
    const { page = 1, limit = 12, sort } = req.query;
    const { category } = req.params;

    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = getSortOptions(sort);

    const query = { category, isActive: true };

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Product.countDocuments(query);
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

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

/**
 * ---------------------------
 * ADMIN ROUTES
 * ---------------------------
 */

// @desc    Create new product with files
// @route   POST /api/products/with-files
// @access  Admin
router.post('/with-files', protect, restrictTo('admin'), uploadProductAssets, handleMulterError, async (req, res, next) => {
  try {
    const productData = JSON.parse(req.body.productData || '{}');

    // Upload images, models, colorImages if present
    if (req.files.images) productData.images = await uploadFiles(req.files.images, 'products/images');
    if (req.files.models) productData.models = await uploadFiles(req.files.models, 'products/models');
    if (req.files.colorImages && productData.colors) {
      const uploadedColors = await uploadFiles(req.files.colorImages, 'products/colors');
      productData.colors.forEach((color, index) => {
        if (uploadedColors[index]) color.image = uploadedColors[index].url;
      });
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, message: 'Product created successfully with files', data: product });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new product (without files)
// @route   POST /api/products
// @access  Admin
router.post('/', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error) {
    next(error);
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
router.put('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Admin
router.delete('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.isActive = false;
    await product.save();

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * ---------------------------
 * HELPER FUNCTIONS
 * ---------------------------
 */

const getSortOptions = (sort) => {
  switch (sort) {
    case 'price-low': return { price: 1 };
    case 'price-high': return { price: -1 };
    case 'rating': return { 'rating.average': -1 };
    case 'newest': return { createdAt: -1 };
    case 'popular': return { sold: -1 };
    default: return { createdAt: -1 };
  }
};

const uploadFiles = async (files, folder) => {
  const promises = files.map(async (file, index) => {
    const filename = `${folder.replace('/', '_')}_${Date.now()}_${index}`;
    const result = await uploadBufferToCloudinary(file.buffer, folder, filename);
    return { url: result.url, publicId: result.publicId };
  });
  return Promise.all(promises);
};

export default router;
