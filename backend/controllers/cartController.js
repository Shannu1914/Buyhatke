import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

export const getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
};

export const setItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.active) return res.status(404).json({ message: 'Product not found' });
  let cart = await getOrCreateCart(req.user._id);
  const idx = cart.items.findIndex((i) => i.product.equals(productId));
  if (quantity <= 0) {
    if (idx >= 0) cart.items.splice(idx, 1);
  } else {
    if (idx >= 0) cart.items[idx].quantity = quantity;
    else cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  cart = await Cart.findById(cart._id).populate('items.product');
  res.json(cart);
};

export const clearCart = async (req, res) => {
  const cart = await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }, { new: true });
  res.json(cart);
};
