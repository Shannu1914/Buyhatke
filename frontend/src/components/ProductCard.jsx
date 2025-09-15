import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <Link to={`/product/${p.slug || p._id}`} className="block border rounded p-3">
      <img
        src={p.image || "https://via.placeholder.com/400x300?text=Candle"}
        alt={p.name}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-2">
        <h3 className="font-semibold">{p.name}</h3>
        <p className="text-sm opacity-70">{p.description}</p>
        <div className="mt-1 font-bold">₹{p.price}</div>
      </div>
    </Link>
  );
}
