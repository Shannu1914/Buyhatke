import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    scentNotes: "",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Helper to reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      scentNotes: "",
      stock: "",
    });
    setEditingId(null);
  };

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const data = await api("/products");
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setMessage({ text: "❌ Failed to load products", type: "error" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Create or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        scentNotes: form.scentNotes
          ? form.scentNotes.split(",").map((s) => s.trim())
          : [],
      };

      if (editingId) {
        await api(`/products/${editingId}`, { method: "PUT", body });
        setMessage({ text: "✅ Product updated successfully", type: "success" });
      } else {
        await api("/products", { method: "POST", body });
        setMessage({ text: "✅ Product added successfully", type: "success" });
      }

      resetForm();
      fetchProducts();

      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      console.error("❌ Error saving product:", err);
      setMessage({ text: "❌ Failed to save product", type: "error" });
    }
  };

  // ✅ Edit product
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      scentNotes: p.scentNotes?.join(", "),
      stock: p.stock,
    });
    setEditingId(p._id);
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api(`/products/${id}`, { method: "DELETE" });
      setMessage({ text: "✅ Product deleted", type: "success" });
      fetchProducts();
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      setMessage({ text: "❌ Failed to delete product", type: "error" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin – Manage Products</h2>

      {message.text && (
        <p
          className={`mb-4 font-semibold ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Scent notes (comma separated)"
          className="border p-2 rounded"
          value={form.scentNotes}
          onChange={(e) => setForm({ ...form, scentNotes: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <h3 className="text-xl font-semibold mt-6 mb-3">All Products</h3>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border p-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
