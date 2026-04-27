import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    if (!user) return; 
    
    const qtyToAdd = parseInt(quantity);
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id);
      if (isExist) {
        return prevItems.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + qtyToAdd } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: qtyToAdd }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        return prevItems.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems;
    });
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (!user) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const totalItems = cartItems.length;

  useEffect(() => {
    if (user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      removeItem, 
      updateQuantity,
      clearCart, 
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);