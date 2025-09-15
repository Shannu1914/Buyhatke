import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { cart, setItem, clear } = useCart();
  const total = cart.items?.reduce((s,i)=>s + i.product.price * i.quantity, 0) || 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items?.length ? (
        <>
          <ul className="space-y-3">
            {cart.items.map((i)=>(
              <li key={i.product._id} className="flex items-center justify-between border p-3 rounded">
                <div>
                  <div className="font-semibold">{i.product.name}</div>
                  <div className="text-sm opacity-70">₹{i.product.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" value={i.quantity}
                    onChange={(e)=>setItem(i.product._id, parseInt(e.target.value)||1)}
                    className="border p-1 w-16"/>
                  <button className="btn" onClick={()=>setItem(i.product._id, 0)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-4">
            <div className="text-xl font-bold">Total: ₹{total}</div>
            <div className="flex gap-2">
              <button className="btn" onClick={clear}>Clear</button>
              <Link className="btn btn-primary" to="/checkout">Checkout</Link>
            </div>
          </div>
        </>
      ) : <p>Your cart is empty.</p>}
    </div>
  );
}
