import { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { formatIDR } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

export const useCartLogic = () => {
  const {
    cartItems,
    selectedCartItemIds,
    toggleCartItemSelection,
    selectAllCartItems,
    clearSelectedCartItems,
    addToCart,
    removeFromCart,
    removeItem,
    clearCart,
    updateQuantity,
  } = useCart();

  const handleIncrement = (item) => addToCart(item);
  const handleDecrement = (item) => removeFromCart(item.id);
  const handleQuantityChange = (itemId, newQty) =>
    updateQuantity(itemId, newQty);
  const handleRemove = async (itemId) => {
    await removeItem(itemId);
    toast.success("Item dihapus dari keranjang");
  };

  const selectedItems = useMemo(
    () => cartItems.filter((item) =>
      selectedCartItemIds.some((id) => String(id) === String(item.cartItemId)),
    ),
    [cartItems, selectedCartItemIds],
  );
  const selectedNormalSubtotal = selectedItems.reduce(
    (acc, item) => acc + (item.original_price || item.price) * item.quantity,
    0,
  );
  const selectedSubtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const selectedDiscountTotal = selectedNormalSubtotal - selectedSubtotal;
  const selectedTotalQuantity = selectedItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const hasDiscount = selectedDiscountTotal > 0;

  return {
    cartItems,
    selectedItems,
    selectedCartItemIds,
    selectedTotalQuantity,
    subtotal: formatIDR(selectedSubtotal),
    total: formatIDR(selectedSubtotal),
    normalSubtotal: formatIDR(selectedNormalSubtotal),
    discountTotal: formatIDR(selectedDiscountTotal),
    hasDiscount,
    handleIncrement,
    handleDecrement,
    handleQuantityChange,
    handleRemove,
    clearCart,
    toggleCartItemSelection,
    selectAllCartItems,
    clearSelectedCartItems,
    hasSelectedItems: selectedCartItemIds.length > 0,
    isEmpty: cartItems.length === 0,
  };
};
