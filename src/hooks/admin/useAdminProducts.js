import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/admin/productService";

const normalizeProduct = (p) => {
  return { 
    ...p, 
    id: String(p?.id || p?._id || Math.random()) 
  };
};

const getErrorMessage = (err, fallback) => 
  err?.response?.data?.message || err?.message || fallback;

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProducts = useCallback(async (isInitial = false) => {
    if (isInitial) setIsLoading(true);
    try {
      const response = await getAllProducts();
      const rawData = response?.data || response?.products || (Array.isArray(response) ? response : []);
      setProducts(rawData.map(normalizeProduct));
    } catch (err) {
      toast.error(getErrorMessage(err, "Gagal memuat daftar produk"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  const handleCreate = async (productData) => {
  setActionLoading(true);
  try {
    const response = await createProduct(productData);
    const newProduct = response?.data?.data || response?.data || response;
    
    await fetchProducts(); 
    
    toast.success("Produk baru berhasil ditambahkan");
    return { success: true };
  } catch (err) {
    const msg = getErrorMessage(err, "Gagal menambah produk");
    toast.error(msg);
    return { success: false, message: msg };
  } finally {
    setActionLoading(false); 
  }
};

  const handleUpdate = async (id, productData) => {
    setActionLoading(true);
    try {
      const response = await updateProduct(id, productData);
      const updated = response?.data || response;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? normalizeProduct(updated) : p))
      );
      toast.success("Data produk berhasil diperbarui");
      return { success: true };
    } catch (err) {
      const msg = getErrorMessage(err, "Gagal memperbarui produk");
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Produk telah dihapus secara permanen");
      return { success: true };
    } catch (err) {
      const msg = getErrorMessage(err, "Gagal menghapus produk");
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoading(false);
    }
  };

  return {
    products,
    isLoading,
    actionLoading,
    fetchProducts,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};