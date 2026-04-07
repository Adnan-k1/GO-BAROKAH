import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/formatCurrency';

export const useCartLogic = () => {
  const { cartItems, addToCart, removeFromCart, removeItem, clearCart } = useCart();

  // Hanya menghitung subtotal barang
  const rawSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Total sama dengan subtotal karena biaya kirim belum dihitung
  const rawTotal = rawSubtotal;

  const handleIncrement = (item) => addToCart(item);
  const handleDecrement = (item) => removeFromCart(item.id);
  const handleRemove = (itemId) => {
    if (window.confirm("Hapus produk ini dari keranjang?")) {
      removeItem(itemId);
    }
  };

  return {
    cartItems,
    subtotal: formatIDR(rawSubtotal),
    total: formatIDR(rawTotal), // Total sekarang hanya harga barang
    handleIncrement,
    handleDecrement,
    handleRemove,
    clearCart,
    isEmpty: cartItems.length === 0
  };
};