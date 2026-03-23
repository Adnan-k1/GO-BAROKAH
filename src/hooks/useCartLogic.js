import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/formatCurrency';

export const useCartLogic = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  
  const shipping = cartItems.length > 0 ? 15000 : 0;
  

  const total = subtotal + shipping;

  const handleIncrement = (item) => addToCart(item);
  const handleDecrement = (item) => removeFromCart(item.id);
  const handleRemoveAll = (itemId) => {
  
  };

  return {
    cartItems,
    subtotal: formatIDR(subtotal),
    shipping: formatIDR(shipping),
    total: formatIDR(total),
    handleIncrement,
    handleDecrement,
    clearCart,
    isEmpty: cartItems.length === 0
  };
};