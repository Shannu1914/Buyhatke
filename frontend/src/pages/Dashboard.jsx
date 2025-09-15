import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ api('/orders/mine').then(setOrders).catch(()=>{}); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <p className="mb-4">Welcome, {user?.name}! ({user?.role})</p>
      {user?.role === 'admin' ? (
        <Link className="btn btn-primary" to="/admin">Go to Admin Dashboard</Link>
      ) : (
        <Link className="btn btn-primary" to="/user">Go to My Dashboard</Link>
      )}
      <h3 className="text-xl font-semibold mt-6 mb-2">My Orders</h3>
      <ul className="space-y-2">
        {orders.map(o=>(
          <li key={o._id} className="border p-3 rounded flex items-center justify-between">
            <div>#{o._id.slice(-6)} — {o.items?.length} items — ₹{o.total}</div>
            <div className="text-sm">{o.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
