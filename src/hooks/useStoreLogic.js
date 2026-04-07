import { useState, useMemo, useCallback } from 'react';
import { ALL_PRODUCTS } from '../data/products';

export const useStoreLogic = () => {
  const [filter, setFilter] = useState([]);
  const [limit, setLimit] = useState(6);

  // Daftar kategori yang tersedia di UD Barokah
  const categories = [
    "Bread & Bakery", 
    "Baking Needs", 
    "Cooking", 
    "Snacks", 
    "Beverages", 
    "Vegetables"
  ];

  // Fungsi untuk menambah/menghapus filter kategori
  const handleFilterChange = useCallback((cat) => {
    setFilter(prev => {
      const newFilter = prev.includes(cat) 
        ? prev.filter(x => x !== cat) 
        : [...prev, cat];
      return newFilter;
    });
    // Reset limit ke awal setiap kali filter berubah agar user mulai dari atas lagi
    setLimit(6);
  }, []);

  // Memproses data berdasarkan filter (Optimized dengan useMemo)
  const filteredDataResult = useMemo(() => {
    return filter.length === 0 
      ? ALL_PRODUCTS 
      : ALL_PRODUCTS.filter(p => filter.includes(p.category));
  }, [filter]);

  // Fungsi Load More
  const loadMore = () => setLimit(prev => prev + 3);

  // Fungsi Reset Semua Filter
  const clearFilter = () => {
    setFilter([]);
    setLimit(6);
  };

  return {
    filter,
    categories,
    // Data yang sudah difilter DAN dipotong sesuai limit untuk tampilan
    filteredData: filteredDataResult.slice(0, limit), 
    // Jumlah total produk yang lolos filter (sebelum di-slice)
    totalCount: filteredDataResult.length, 
    currentLimit: limit,
    handleFilterChange,
    loadMore,
    clearFilter
  };
};  