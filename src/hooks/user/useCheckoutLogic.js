import { useState, useEffect, useCallback, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../auth/useAuth';
import { addressService } from '../../services/user/addressService'; 
import orderService from '../../services/user/orderService'; 
import { formatIDR } from '../../utils/formatCurrency';
import toast from 'react-hot-toast';

export const useCheckoutLogic = () => {
  const {
    cartItems,
    selectedCartItemIds,
    isSelectionHydrated,
    isLoading: isCartLoading,
    updateQuantity,
  } = useCart();
  const { user } = useAuth(); 
  
  const [isPickup, setIsPickup] = useState(false);
  const [namaPenerima, setNamaPenerima] = useState('');
  const [alamatDetail, setAlamatDetail] = useState('');

  const [rawShipping, setRawShipping] = useState(0);
  const [rawTotal, setRawTotal] = useState(0);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  const selectedItems = useMemo(
    () => cartItems.filter((item) =>
      selectedCartItemIds.some((id) => String(id) === String(item.cartItemId)),
    ),
    [cartItems, selectedCartItemIds],
  );
  const rawSubtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (user && user.username) {
      setNamaPenerima(user.username);
    }
    const isMounted = { current: true };
    const loadDefaultAddress = async () => {
      try {
        const response = await addressService.getAddresses();
        if (!isMounted.current) return;
        const addresses = response?.data || response;
        const defaultAddr = addresses.find(addr => addr.isDefault || addr.is_default);
        
        if (defaultAddr) {
          setAlamatDetail(defaultAddr.addressDetail || defaultAddr.address_detail || "");
        }
      } catch (err) {
        if (isMounted.current) console.error("Gagal ambil alamat otomatis:", err);
      }
    };

    if (user) loadDefaultAddress();
    return () => { isMounted.current = false; };
  }, [user]);

  useEffect(() => {
    if (isPickup) {
      setRawShipping(0);
      setRawTotal(rawSubtotal);
    }
  }, [isPickup, rawSubtotal]);

  const hitungOngkir = useCallback(async (
    addressId,
    isMounted = { current: true },
    cartItemIds = selectedCartItemIds,
  ) => {
    if (!addressId || isPickup) {
      setRawShipping(0);
      setRawTotal(rawSubtotal);
      return;
    }

    try {
      setIsLoadingShipping(true);
      const response = await orderService.calculateShippingFee(addressId, cartItemIds);
      if (!isMounted.current) return;
      
      const shippingData = response?.data?.data || response?.data || response || {};
      const shippingFee = shippingData.shippingFee ?? shippingData.shipping_fee;
      const grandTotal = shippingData.grandTotal ?? shippingData.grand_total;

      if (shippingFee !== undefined && grandTotal !== undefined) {
        setRawShipping(Number(shippingFee) || 0);
        setRawTotal(Number(grandTotal) || rawSubtotal);
      } else {
        throw new Error('Response ongkir tidak memiliki shippingFee atau grandTotal');
      }
    } catch (error) {
      if (isMounted.current) {
        console.error("Gagal kalkulasi ongkos kirim:", error);
        setRawShipping(0);
        setRawTotal(rawSubtotal);
        const errorMessage = error.response?.data?.message || "";
        if (errorMessage.toLowerCase() !== "jumlah pesanan tidak valid") {
          toast.error(errorMessage || "Gagal menghitung ongkos kirim");
        }
      }
    } finally {
      if (isMounted.current) setIsLoadingShipping(false);
    }
  }, [isPickup, rawSubtotal, selectedCartItemIds]);

  return {
    cartItems,
    selectedItems,
    selectedCartItemIds,
    isSelectionHydrated,
    updateQuantity,
    isCartLoading,
    isPickup,         
    setIsPickup,      
    namaPenerima, 
    setNamaPenerima,
    alamatDetail, 
    setAlamatDetail,
    subtotal: formatIDR(rawSubtotal),
    shippingFee: formatIDR(rawShipping),
    total: formatIDR(rawTotal),
    hitungOngkir,
    isLoadingShipping
  };
};
