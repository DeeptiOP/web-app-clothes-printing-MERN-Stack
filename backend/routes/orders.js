import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { generateOrderId, generateTransactionId, generateTrackingNumber, validateIdFormat } from '../utils/idGenerator.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      pricing
    } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required'
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    // Validate items and check stock
    const validatedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.name} is no longer available`
        });
      }

      // Check stock
      const sizeStock = product.sizes.find(s => s.name === item.size);
      if (!sizeStock || sizeStock.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name} in size ${item.size}`
        });
      }

      validatedItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url || '',
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        customization: item.customization || { hasCustomization: false }
      });

      subtotal += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: validatedItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      pricing: {
        subtotal,
        shipping: pricing?.shipping || 0,
        tax: pricing?.tax || 0,
        discount: pricing?.discount || 0,
        total: pricing?.total || subtotal
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'cod' ? 'pending' : 'pending'
      }
    });

    // Update product stock
    for (const item of validatedItems) {
      const product = await Product.findById(item.product);
      const sizeIndex = product.sizes.findIndex(s => s.name === item.size);
      if (sizeIndex > -1) {
        product.sizes[sizeIndex].stock -= item.quantity;
        product.sold += item.quantity;
        await product.save();
      }
    }

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalItems: 0, totalPrice: 0 }
    );

    // Populate order with user details
    await order.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!validateIdFormat(id, 'order') && !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }

    const order = await Order.findOne({
      $or: [
        { _id: id },
        { orderNumber: id }
      ]
    }).populate('user', 'name email phone').populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = { user: req.user._id };
    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'name email phone');

    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      pagination: {
        currentPage: Number(page),
        totalPages,
        hasNextPage: Number(page) < totalPages,
        hasPrevPage: Number(page) > 1,
        limit: Number(limit)
      },
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin only)
router.put('/:id/status', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber, carrier, notes } = req.body;

    // Validate ID format
    if (!validateIdFormat(id, 'order') && !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }

    const order = await Order.findOne({
      $or: [
        { _id: id },
        { orderNumber: id }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    order.status = status;
    
    if (status === 'shipped' && trackingNumber) {
      order.tracking.trackingNumber = trackingNumber;
      order.tracking.carrier = carrier || 'Standard Shipping';
      order.tracking.trackingUrl = `https://tracking.example.com/${trackingNumber}`;
    }

    if (notes) {
      order.notes.admin = notes;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req, res, next) => {
  try {
    const { reason } = req.body;
    
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order in current status'
      });
    }

    // Update order status
    order.status = 'cancelled';
    order.notes.customer = reason || 'Cancelled by customer';
    
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        const sizeIndex = product.sizes.findIndex(s => s.name === item.size);
        if (sizeIndex > -1) {
          product.sizes[sizeIndex].stock += item.quantity;
          product.sold -= item.quantity;
          await product.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
router.get('/admin/all', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let query = {};

    // Status filter
    if (status) {
      query.status = status;
    }

    // Search by order number or user email
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'shippingAddress.email': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const orders = await Order.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'name email phone');

    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      pagination: {
        currentPage: Number(page),
        totalPages,
        hasNextPage: Number(page) < totalPages,
        hasPrevPage: Number(page) > 1,
        limit: Number(limit)
      },
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const { status, notes, tracking } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    order.status = status;
    
    if (notes) {
      order.notes.admin = notes;
    }

    if (tracking) {
      order.tracking = { ...order.tracking, ...tracking };
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
});

export default router;
