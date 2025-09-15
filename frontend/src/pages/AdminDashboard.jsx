import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";   // ✅ import Link

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // product form
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    scentNotes: "",
    stock: "",
  });

  const refresh = async () => {
    const s = await api("/admin/stats");
    const o = await api("/admin/orders");
    const p = await api("/products");
    setStats(s);
    setOrders(o);
    setProducts(Array.isArray(p) ? p : p.products || []);
  };

  useEffect(() => {
    refresh();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    const body = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image: form.image,
      scentNotes: form.scentNotes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      stock: Number(form.stock),
    };

    await api("/products", { method: "POST", body });
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      scentNotes: "",
      stock: "",
    });
    refresh();
  };

  const setStatus = async (id, status) => {
    await api(`/admin/orders/${id}/status`, {
      method: "PUT",
      body: { status },
    });
    refresh();
  };

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Stats + Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          {/* ✅ Manage Products Link */}
          <Link
            to="/admin/products"
            className="text-blue-600 hover:underline"
          >
            Manage Products
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="border p-3 rounded">
            Users <div className="text-2xl font-bold">{stats.users}</div>
          </div>
          <div className="border p-3 rounded">
            Products <div className="text-2xl font-bold">{stats.products}</div>
          </div>
          <div className="border p-3 rounded">
            Orders <div className="text-2xl font-bold">{stats.orders}</div>
          </div>
        </div>

        {/* Recent Orders */}
        <h3 className="mt-6 font-semibold">Recent Orders</h3>
        <ul className="space-y-2 mt-2">
          {stats.recentOrders.map((o) => (
            <li
              key={o._id}
              className="border rounded p-2 flex items-center justify-between"
            >
              <div>
                #{o._id.slice(-6)} — ₹{o.total} — {o.status}
              </div>
              <select
                className="border p-1"
                defaultValue={o.status}
                onChange={(e) => setStatus(o._id, e.target.value)}
              >
                {[
                  "pending",
                  "paid",
                  "shipped",
                  "completed",
                  "cancelled",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Management (still here for now) */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Add New Product</h3>
        <form onSubmit={createProduct} className="space-y-3">
          <input
            className="border p-2 w-full"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            className="border p-2 w-full"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />
          <input
            className="border p-2 w-full"
            placeholder="Scent Notes (comma separated)"
            value={form.scentNotes}
            onChange={(e) => setForm({ ...form, scentNotes: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Add Product
          </button>
        </form>

        {/* All Products List */}
        <h3 className="text-xl font-semibold mt-6 mb-3">All Products</h3>
        <ul className="space-y-2 max-h-64 overflow-y-auto border p-3 rounded">
          {products.map((p) => (
            <li key={p._id} className="border p-2 rounded bg-white/70">
              <div className="flex items-center gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <h4 className="font-semibold">{p.name}</h4>
                  <p className="text-sm text-gray-600">₹{p.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
