import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

export const useAddressLogic = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authService.getAddresses();
      setAddresses(response.data || []);
    } catch (err) {
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSaveAddress = async (formData, editId) => {

    if (!formData.label || !formData.recipient_name || !formData.recipient_phone || !formData.address_detail) {
      toast.error("Semua field wajib diisi");
      return false;
    }

    const payload = {
  label: formData.label.trim(),
  recipient_name: formData.recipient_name.trim(),
  recipient_phone: formData.recipient_phone.trim(),
  address_detail: formData.address_detail.trim(),
  isDefault: true
};

    console.log("🚀 PAYLOAD:", payload);

    try {
      if (editId) {
        await authService.updateAddress(editId, payload);
        toast.success('Alamat diperbarui');
      } else {
        await authService.createAddress(payload);
        toast.success('Alamat berhasil ditambahkan');
      }
      await fetchAddresses();
      return true;
    } catch (err) {
      console.log("❌ FULL ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Terjadi kesalahan");
      return false;
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await authService.deleteAddress(id);
      toast.success('Alamat dihapus');
      await fetchAddresses();
    } catch (err) {
      toast.error('Gagal menghapus');
    }
  };

  return {
    addresses,
    isLoading,
    handleSaveAddress,
    handleDeleteAddress
  };
};