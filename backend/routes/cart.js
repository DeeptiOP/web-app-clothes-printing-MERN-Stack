import express from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name price images category subcategory totalStock isActive'
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Filter out inactive products
    cart.items = cart.items.filter(item => item.product && item.product.isActive);

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
router.post('/add', protect, async (req, res, next) => {
  try {
    const {
      productId,
      quantity = 1,
      size,
      color,
      customization
    } = req.body;

    // Validate required fields
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check if product exists and is active (accept Mongo _id or custom productId)
    let product = null;
    if (mongoose.isValidObjectId(productId)) {
      product = await Product.findById(productId);
    }
    if (!product) {
      product = await Product.findOne({ productId: productId });
    }
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validate quantity
    if (quantity < 1 || quantity > 10) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 10'
      });
    }

    // Check stock if size is provided
    if (size) {
      const sizeStock = product.sizes.find(s => s.name === size);
      if (!sizeStock || sizeStock.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock for selected size'
        });
      }
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Normalize color for comparison (supports string or object with code)
    const normalizeColor = (c) => {
      if (!c) return '';
      if (typeof c === 'string') return c;
      if (typeof c === 'object') return c.code || c.name || '';
      return '';
    };

    const normalizedColor = normalizeColor(color);
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item =>
      item.product.toString() === product._id.toString() &&
      item.size === size &&
      normalizeColor(item.color) === normalizedColor &&
      JSON.stringify(item.customization) === JSON.stringify(customization)
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (newQuantity > 10) {
        return res.status(400).json({
          success: false,
          message: 'Cannot add more than 10 items of the same product'
        });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: product._id,
        quantity,
        price: product.price,
        size,
        color,
        customization: customization || {
          hasCustomization: false
        }
      });
    }

    await cart.save();

    // Populate and return updated cart
    await cart.populate({
      path: 'items.product',
      select: 'name price images category subcategory totalStock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update item quantity in cart
// @route   PUT /api/cart/update/:itemId
// @access  Private
router.put('/update/:itemId', protect, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (!quantity || quantity < 1 || quantity > 10) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 10'
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.quantity = quantity;
    await cart.save();

    // Populate and return updated cart
    await cart.populate({
      path: 'items.product',
      select: 'name price images category subcategory totalStock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
router.delete('/remove/:itemId', protect, async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items.pull(itemId);
    await cart.save();

    // Populate and return updated cart
    await cart.populate({
      path: 'items.product',
      select: 'name price images category subcategory totalStock isActive'
    });

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
router.delete('/clear', protect, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get cart item count
// @route   GET /api/cart/count
// @access  Private
router.get('/count', protect, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    const count = cart ? cart.totalItems : 0;

    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    next(error);
  }
});

export default router;
