import Product from "../models/Product.js";
import slugify from "slugify";

// 📌 List products (with search)
export const listProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q
      ? { name: { $regex: q, $options: "i" }, active: true }
      : { active: true };

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get single product
export const getProduct = async (req, res) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug, active: true });
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Admin: Create product
export const adminCreateProduct = async (req, res) => {
  try {
    const { name, description, price, image, scentNotes, stock } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const slug = slugify(name, { lower: true, strict: true });
    const exists = await Product.findOne({ slug });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Product with similar name already exists" });
    }

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      image,
      scentNotes,
      stock,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Admin: Update product
export const adminUpdateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.name) {
      updates.slug = slugify(updates.name, { lower: true, strict: true });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Admin: Delete product (soft delete = active:false)
export const adminDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.active = false; // ✅ Soft delete
    await product.save();

    res.json({ message: "Product deleted (soft delete)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
