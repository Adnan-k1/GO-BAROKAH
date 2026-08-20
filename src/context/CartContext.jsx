import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { cartService } from "../services/user/cartService";
import { productService } from "../services/user/productService";
import { buildImageUrl } from "../utils/imageUrl";
import toast from "react-hot-toast";

const CartContext = createContext();
const getCartSelectionKey = (user) => {
  const userKey = user?.id || user?._id || user?.email;
  return userKey ? `cart_selection_${userKey}` : null;
};

const readCartSelection = (storageKey) => {
  if (!storageKey) return [];
  try {
    const storedSelection = sessionStorage.getItem(storageKey);
    const parsedSelection = storedSelection ? JSON.parse(storedSelection) : [];
    return Array.isArray(parsedSelection) ? parsedSelection : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState([]);
  const [isSelectionHydrated, setIsSelectionHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const selectionStorageKey = getCartSelectionKey(user);

  useEffect(() => {
    setIsSelectionHydrated(false);
    setSelectedCartItemIds(readCartSelection(selectionStorageKey));
    setIsSelectionHydrated(true);
  }, [selectionStorageKey]);

  useEffect(() => {
    if (!isSelectionHydrated || !selectionStorageKey) return;
    sessionStorage.setItem(selectionStorageKey, JSON.stringify(selectedCartItemIds));
  }, [isSelectionHydrated, selectedCartItemIds, selectionStorageKey]);
  
  useEffect(() => {
    productService.getAllProducts()
      .then(res => {
        const data = res?.data?.data || res?.data || res || [];
        setAllProducts(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (allProducts.length > 0 && cartItems.length > 0) {
      setCartItems(prev => {
        let hasChanges = false;
        const next = prev.map(item => {
          const p = allProducts.find(prod => String(prod.id || prod._id) === String(item.id));
          if (p && p.min_order_quantity !== item.min_order_quantity) {
            hasChanges = true;
            return { ...item, min_order_quantity: p.min_order_quantity };
          }
          return item;
        });
        return hasChanges ? next : prev;
      });
    }
  }, [allProducts, cartItems.length]);

  const mapItems = (items = []) =>
    items.map((item) => {
      const p = allProducts.find(prod => String(prod.id || prod._id) === String(item.product_id));
      return {
        id: item.product_id,
        cartItemId: item.id,
        name: item.name,
        image_url: buildImageUrl(item.image_url),
        price: Number(item.final_price ?? item.price) || 0,
        original_price: Number(item.price) || 0,
        discount_amount: Number(item.discount_amount) || 0,
        quantity: Number(item.quantity) || 0,
        stock: item.stock,
        category: item.category ?? "",
        min_order_quantity: item.min_order_quantity || item.product?.min_order_quantity || p?.min_order_quantity || 1,
      };
    });

  const syncCart = (data) => {
    if (Array.isArray(data?.items)) {
      const nextItems = mapItems(data.items);
      setCartItems(nextItems);
      setSelectedCartItemIds((previousIds) =>
        previousIds.filter((selectedId) =>
          nextItems.some((item) => String(item.cartItemId) === String(selectedId)),
        ),
      );
    }
    if (data?.summary) setCartSummary(data.summary);
  };

  const loadCart = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await cartService.getCart();
      syncCart(res.data);
    } catch (err) {
      console.error("Load cart error:", err);
      toast.error("Gagal memuat keranjang");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
      setCartSummary(null);
      setSelectedCartItemIds([]);
      setIsLoading(false);
    }
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) return;
    const existing = cartItems.find((i) => i.id === product.id);
    const requestedQuantity = (existing?.quantity || 0) + quantity;
    const stock = Number(product.stock);
    const criticalStock = Number(product.critical_stock);

    if (
      Number.isFinite(stock) &&
      Number.isFinite(criticalStock) &&
      stock - requestedQuantity <= criticalStock
    ) {
      const message = "Produk tidak dapat dipesan karena sudah mencapai batas stok minimum.";
      toast.error(message);
      throw new Error(message);
    }

    try {
      const res = existing
        ? await cartService.updateItem(product.id, existing.quantity + quantity)
        : await cartService.addItem(product.id, quantity);
      syncCart(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambah ke keranjang");
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    const existing = cartItems.find((i) => i.id === productId);
    if (!existing) return;
    try {
      const res = existing.quantity <= 1
        ? await cartService.deleteItem(productId)
        : await cartService.updateItem(productId, existing.quantity - 1);
      syncCart(res.data);
    } catch {
      toast.error("Gagal update keranjang");
    }
  };

  const removeItem = async (productId) => {
    if (!user) return;
    try {
      const res = await cartService.deleteItem(productId);
      syncCart(res.data);
    } catch {
      toast.error("Gagal menghapus item");
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (!user) return;
    try {
      const res = await cartService.updateItem(productId, Math.max(1, newQty));
      syncCart(res.data);
    } catch (err) {
      let errMsg = err.response?.data?.message || "Gagal update quantity";
      
      // Translate common backend errors to Indonesian
      const lowerErr = errMsg.toLowerCase();
      if (lowerErr.includes("stock") || lowerErr.includes("quantity")) {
        errMsg = "Stok barang tidak mencukupi";
      } else if (lowerErr.includes("not found")) {
        errMsg = "Produk tidak ditemukan";
      } else if (lowerErr.includes("unauthorized") || lowerErr.includes("login")) {
        errMsg = "Sesi telah habis, silakan login kembali";
      }
      
      toast.error(errMsg);
      throw err;
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await cartService.clearCart();
      setCartItems([]);
      setCartSummary(null);
      setSelectedCartItemIds([]);
    } catch {
      toast.error("Gagal mengosongkan keranjang");
    }
  };

  const toggleCartItemSelection = (cartItemId) => {
    setSelectedCartItemIds((previousIds) =>
      previousIds.some((id) => String(id) === String(cartItemId))
        ? previousIds.filter((id) => String(id) !== String(cartItemId))
        : [...previousIds, cartItemId],
    );
  };

  const selectAllCartItems = () => {
    setSelectedCartItemIds(cartItems.map((item) => item.cartItemId));
  };

  const clearSelectedCartItems = () => setSelectedCartItemIds([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSummary,
        selectedCartItemIds,
        isSelectionHydrated,
        isLoading,
        addToCart,
        removeFromCart,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCartItemSelection,
        selectAllCartItems,
        clearSelectedCartItems,
        totalItems: cartItems.length,
        totalQuantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
