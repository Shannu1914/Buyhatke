import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const stats = async (_req, res) => {
  const [users, products, orders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments()
  ]);
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);
  res.json({ users, products, orders, recentOrders });
};

export const allOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};
