import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth();

  // 🔹 Normalize cart
  const normalizeCart = (cart) =>
    cart.items.map((i) => ({
     id: i.item._id,           // for React keys
    _id: i.item._id,          // for API calls
    name: i.item.name,
    image: i.item.imageUrl || i.item.image,
    category: i.item.category,
    description: i.item.description,
    price: i.item.price,
    quantity: i.quantity,
    }));

  // 🔹 Fetch Cart (reusable)
  const fetchCart = useCallback(async () => {
    if (!user || !token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(normalizeCart(res.data));
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
    }
  }, [user, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 🔹 Add to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { itemId: product._id || product.id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update immediately
      setCartItems(normalizeCart(res.data.cart));
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(normalizeCart(res.data.cart));
    } catch (err) {
      console.error("Error updating cart:", err.response?.data || err.message);
    }
  };

  // 🔹 Remove item
  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(normalizeCart(res.data.cart));
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
    }
  };

  // 🔹 Clear cart
  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map((item) => removeFromCart(item._id || item.id)));
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err.message);
    }
  };

  // 🔹 Helpers
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    fetchCart, // ✅ make it callable in CartPage
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
