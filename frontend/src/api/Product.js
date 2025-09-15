import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [API]);

  return (
    <div>
      <h2>Our Products</h2>
      {products.length > 0 ? (
        products.map((p) => <div key={p._id}>{p.name}</div>)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Products;
