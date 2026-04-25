import { useState, useEffect, useCallback } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/admin/productService";

// Normalisasi ID biar konsisten
const normalizeProduct = (p) => ({
  ...p,
  id: p.id || p._id,
});

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH DATA
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAllProducts();

      const finalData = Array.isArray(data)
        ? data
        : data?.data || data?.products || [];

      setProducts(finalData.map(normalizeProduct));
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();

        const finalData = Array.isArray(data)
          ? data
          : data?.data || data?.products || [];

        if (isMounted) {
          setProducts(finalData.map(normalizeProduct));
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Terjadi kesalahan");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  // CREATE
  const handleCreate = async (formData) => {
    try {
      setActionLoading(true);

      const newProduct = await createProduct(formData);

      setProducts((prev) => [
        normalizeProduct(newProduct),
        ...prev,
      ]);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.message || "Gagal menambah produk",
      };
    } finally {
      setActionLoading(false);
    }
  };

  // UPDATE
  const handleUpdate = async (id, formData) => {
    try {
      setActionLoading(true);

      const updated = await updateProduct(id, formData);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? normalizeProduct(updated) : p
        )
      );

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.message || "Gagal update produk",
      };
    } finally {
      setActionLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      setActionLoading(true);

      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.message || "Gagal hapus produk",
      };
    } finally {
      setActionLoading(false);
    }
  };

  return {
    products,
    isLoading,
    actionLoading,
    error,
    fetchProducts, // optional kalau mau manual refresh
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};