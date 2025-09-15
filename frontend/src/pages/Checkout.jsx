import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [addr, setAddr] = useState({ fullName: '', address1: '', address2: '', city: '', state: '', postalCode: '', country: 'India' });
  const nav = useNavigate();

  const placeOrder = async () => {
    const order = await api('/orders/checkout', { method: 'POST', body: { shippingAddress: addr } });
    nav('/dashboard', { state: { placed: order._id } });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.keys(addr).map(k=>(
          <input key={k} className="border p-2" placeholder={k} value={addr[k]} onChange={e=>setAddr(prev=>({...prev,[k]:e.target.value}))}/>
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={placeOrder}>Place Order</button>
    </div>
  );
}
