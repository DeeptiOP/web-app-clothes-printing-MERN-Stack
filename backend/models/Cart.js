import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      max: [10, 'Quantity cannot exceed 10']
    },
    size: {
      type: String,
      required: false,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      default: 'M'
    },
    color: {
      name: {
        type: String,
        required: false,
        default: 'default'
      },
      code: {
        type: String,
        required: false,
        default: '#000000'
      }
    },
    customization: {
      hasCustomization: {
        type: Boolean,
        default: false
      },
      text: String,
      textColor: {
        type: String,
        default: '#000000'
      },
      textFont: {
        type: String,
        default: 'Arial'
      },
      textPosition: {
        type: String,
        enum: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
        default: 'center'
      },
      uploadedImage: String, // URL to uploaded image
      selectedDesign: String, // URL to pre-designed graphics
      additionalNotes: String
    },
    price: {
      type: Number,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalItems: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  this.lastModified = new Date();
  next();
});

// Remove empty carts after some time (cleanup)
cartSchema.index({ lastModified: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 }); // 30 days
cartSchema.index({ user: 1 });

// Method to add item to cart
cartSchema.methods.addItem = function(itemData) {
  const existingItemIndex = this.items.findIndex(item => 
    item.product.toString() === itemData.product.toString() &&
    item.size === itemData.size &&
    item.color.code === itemData.color.code &&
    JSON.stringify(item.customization) === JSON.stringify(itemData.customization)
  );

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    this.items[existingItemIndex].quantity += itemData.quantity;
    if (this.items[existingItemIndex].quantity > 10) {
      this.items[existingItemIndex].quantity = 10;
    }
  } else {
    // Add new item
    this.items.push(itemData);
  }
  
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function(itemId, quantity) {
  const item = this.items.id(itemId);
  if (item) {
    if (quantity <= 0) {
      this.items.pull(itemId);
    } else {
      item.quantity = Math.min(quantity, 10);
    }
  }
  return this.save();
};

// Method to remove item
cartSchema.methods.removeItem = function(itemId) {
  this.items.pull(itemId);
  return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  return this.save();
};

export default mongoose.model('Cart', cartSchema);
