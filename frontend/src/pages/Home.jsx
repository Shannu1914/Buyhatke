import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../services/api";  // ✅ import your API helper
import ProductCard from "../components/ProductCard";
import homeBg from "../assets/home-bg.jpg";
import brand from "../assets/brand-banner.jpg";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api("/api/products")
      .then(setProducts)
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  const handleAction = (action, product) => {
    if (!user) {
      navigate("/login"); // redirect non-logged in users
      return;
    }
    if (action === "cart") {
      console.log("Add to cart:", product);
    } else {
      console.log("Buy now:", product);
    }
  };

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] w-full flex flex-col p-6"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full p-6">
        {/* Hero Section */}
        <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-md">
          <h1 className="text-4xl font-bold text-white">Hand-poured Candles</h1>
          <p className="mt-3 text-lg text-gray-200">
            Small-batch, eco-friendly, delightful scents.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg font-medium hover:bg-yellow-600 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Product Showcase */}
        <div className="mt-12 flex bg-white/10 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
          {/* Left Fixed Image */}
          <div className="w-1/3 flex items-center justify-center p-4">
            <img
              src={brand}
              alt="Brand"
              className="w-56 h-56 md:h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right Scrollable Products */}
          <div className="w-2/3 p-6 overflow-x-auto flex gap-6 snap-x snap-mandatory">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-lg shadow-md p-3 text-center hover:shadow-lg transition min-w-[160px]"
                >
                  <img
                    src={p.image || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="w-28 h-28 object-cover mx-auto mb-3 rounded-lg"
                  />
                  <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
                  <p className="text-gray-600 text-sm">₹{p.price}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAction("cart", p)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleAction("buy", p)}
                      className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition text-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">Loading products...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
