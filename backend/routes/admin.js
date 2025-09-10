import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// Admin dashboard stats
router.get('/dashboard', protect, isAdmin, async (req, res) => {
  try {
    // Get counts from database
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    // Calculate total revenue
    const orders = await Order.find({ status: 'delivered' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get all users with pagination and filtering
router.get('/users', protect, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build filter object
    const filter = { role: { $ne: 'admin' } };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      filter.role = role;
    }
    
    if (status) {
      if (status === 'verified') {
        filter.isVerified = true;
      } else if (status === 'unverified') {
        filter.isVerified = false;
      } else if (status === 'active') {
        filter.isActive = true;
      } else if (status === 'inactive') {
        filter.isActive = false;
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get users with pagination
    const users = await User.find(filter)
      .select('-password')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);
    
    res.json({
      success: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get single user by ID
router.get('/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user
router.put('/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const { name, email, role, isVerified, isActive, phone, address } = req.body;
    
    // Check if email is being changed and if it already exists
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (typeof isVerified === 'boolean') updateData.isVerified = isVerified;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete user
router.delete('/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Bulk operations on users
router.post('/users/bulk', protect, isAdmin, async (req, res) => {
  try {
    const { action, userIds, data } = req.body;
    
    if (!action || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data'
      });
    }
    
    let result;
    
    switch (action) {
      case 'delete':
        // Prevent deleting admin users
        const adminUsers = await User.find({ 
          _id: { $in: userIds }, 
          role: 'admin' 
        });
        
        if (adminUsers.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Cannot delete admin users'
          });
        }
        
        result = await User.deleteMany({ _id: { $in: userIds } });
        break;
        
      case 'activate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { isActive: true }
        );
        break;
        
      case 'deactivate':
        // Prevent deactivating admin users
        const adminUsersToDeactivate = await User.find({ 
          _id: { $in: userIds }, 
          role: 'admin' 
        });
        
        if (adminUsersToDeactivate.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Cannot deactivate admin users'
          });
        }
        
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { isActive: false }
        );
        break;
        
      case 'verify':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { isVerified: true }
        );
        break;
        
      case 'unverify':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { isVerified: false }
        );
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }
    
    res.json({
      success: true,
      message: `Bulk ${action} completed successfully`,
      modifiedCount: result.modifiedCount || result.deletedCount
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get all orders
router.get('/orders', protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get all products
router.get('/products', protect, isAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
