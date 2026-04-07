import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Tambah / Update Quantity
  const addToCart = (product, quantity = 1) => {
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

  // Kurangi 1 Quantity (untuk tombol minus di Cart)
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        return prevItems.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      // Jika quantity 1, biarkan saja atau hapus (sesuai selera)
      return prevItems;
    });
  };

  // Hapus total 1 baris produk
  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Kosongkan Keranjang
  const clearCart = () => setCartItems([]);

  // Logika: Hanya hitung jumlah jenis barang (Unique)
  const totalItems = cartItems.length;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      removeItem, 
      clearCart, 
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);