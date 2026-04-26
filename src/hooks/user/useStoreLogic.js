import { useState, useMemo, useCallback, useEffect } from 'react';
import { productService } from '../../services/user/productService';

const API_URL = import.meta.env.VITE_API_URL;

export const useStoreLogic = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [limit, setLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await productService.getAllProducts();
      const rawData = response.data || response;

      const sanitizedData = Array.isArray(rawData) ? rawData.map(p => {
        const imagePath = p.image_url || p.image || p.img || '';
        
        const cleanBaseUrl = API_URL?.replace(/\/$/, '') || ''; 
        const cleanImagePath = imagePath.replace(/^\//, ''); 
        const finalImgUrl = imagePath.startsWith('http') 
               ? imagePath 
               : imagePath === '' 
                 ? ''
                 : `${cleanBaseUrl}/${cleanImagePath}`;

        return {
          ...p,
          id: p._id || p.id,
          img: finalImgUrl
        };
      }) : [];

      console.log("Data Produk Matang (Ready):", sanitizedData);
      setProducts(sanitizedData);
    } catch (err) {
      console.error("Gagal sanitasi produk:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ["Bread & Bakery", "Baking Needs", "Cooking", "Snacks", "Beverages", "Vegetables"];

  const handleFilterChange = useCallback((cat) => {
    setFilter(prev => prev.includes(cat) ? prev.filter(x => x !== cat) : [...prev, cat]);
  }, []);

  const filteredDataResult = useMemo(() => {
    return filter.length === 0 
      ? products 
      : products.filter(p => filter.includes(p.category));
  }, [filter, products]);

  return {
    filter,
    categories,
    isLoading,
    filteredData: filteredDataResult.slice(0, limit),
    totalCount: filteredDataResult.length,
    currentLimit: limit,
    handleFilterChange,
    loadMore: () => setLimit(prev => prev + 3),
    clearFilter: () => { setFilter([]); setLimit(6); },
    refreshProducts: fetchProducts
  };
};