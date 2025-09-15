import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api("/orders", { auth: true });
        setOrders(data); // update state with fetched orders
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">My Dashboard</h2>
      <p className="mt-2">Track orders, manage address (extend as needed).</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">My Orders</h3>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && orders.length === 0 && <p>No orders found.</p>}

        {!loading && !error && orders.length > 0 && (
          <ul className="mt-4 space-y-2">
            {orders.map((order) => (
              <li key={order._id} className="border p-2 rounded">
                <p>Order ID: {order._id}</p>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
