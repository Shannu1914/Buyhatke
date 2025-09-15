import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const checkout = async (req, res) => {
  const { shippingAddress } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const items = cart.items.map((i) => ({
    product: i.product._id,
    name: i.product.name,
    price: i.product.price,
    quantity: i.quantity
  }));
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await Order.create({ user: req.user._id, items, total, shippingAddress, status: 'pending' });
  // (Integrate payment gateway later)
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};
