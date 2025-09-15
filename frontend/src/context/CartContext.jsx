import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  const refresh = async () => {
    if (!user) return setCart({ items: [] });
    const d = await api('/cart');
    setCart(d);
  };

  useEffect(() => { refresh(); }, [user]);

  const setItem = async (productId, quantity) => {
    const d = await api('/cart/item', { method: 'POST', body: { productId, quantity } });
    setCart(d);
  };

  const clear = async () => {
    const d = await api('/cart', { method: 'DELETE' });
    setCart(d);
  };

  return <CartContext.Provider value={{ cart, refresh, setItem, clear }}>{children}</CartContext.Provider>;
}
