import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🍃 Connected to MongoDB');

    // Backfill productId
    const products = await Product.find({ $or: [{ productId: { $exists: false } }, { productId: null }, { productId: '' }] });
    let productUpdated = 0;
    for (const p of products) {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 5).toUpperCase();
      p.productId = `PROD-${timestamp}-${random}`.toUpperCase();
      await p.save();
      productUpdated++;
    }
    console.log(`✅ Backfilled productId for ${productUpdated} products`);

    // Backfill orderId from orderNumber
    const orders = await Order.find({ $or: [{ orderId: { $exists: false } }, { orderId: null }, { orderId: '' }] });
    let orderUpdated = 0;
    for (const o of orders) {
      if (o.orderNumber) {
        o.orderId = o.orderNumber;
      } else {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        o.orderNumber = `ORD-${timestamp}-${random}`.toUpperCase();
        o.orderId = o.orderNumber;
      }
      await o.save();
      orderUpdated++;
    }
    console.log(`✅ Backfilled orderId for ${orderUpdated} orders`);

    console.log('🎉 Backfill complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Backfill failed:', err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

run();


