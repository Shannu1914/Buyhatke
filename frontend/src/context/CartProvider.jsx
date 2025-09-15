import { useEffect, useState, useCallback } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  const refresh = useCallback(async () => {
    if (!user) return setCart({ items: [] });
    try {
      const d = await api("/cart");
      setCart(d);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const setItem = async (productId, quantity) => {
    try {
      const d = await api("/cart/item", { method: "POST", body: { productId, quantity } });
      setCart(d);
    } catch (err) {
      console.error("Failed to set item:", err);
    }
  };

  const clear = async () => {
    try {
      const d = await api("/cart", { method: "DELETE" });
      setCart(d);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, refresh, setItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}
