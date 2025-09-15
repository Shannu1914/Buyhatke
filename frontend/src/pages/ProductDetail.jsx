import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const { setItem } = useCart();

  useEffect(() => { api(`/products/${slug}`).then(setP); }, [slug]);

  if (!p) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={p.image || 'https://via.placeholder.com/600x450?text=Candle'} className="w-full rounded" />
      <div>
        <h2 className="text-2xl font-bold">{p.name}</h2>
        <div className="mt-2 opacity-70">{p.description}</div>
        <div className="mt-2 font-bold text-xl">₹{p.price}</div>
        <div className="flex items-center gap-2 mt-4">
          <input type="number" min="1" value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="border p-2 w-20" />
          <button className="btn btn-primary" onClick={()=>setItem(p._id, qty)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
