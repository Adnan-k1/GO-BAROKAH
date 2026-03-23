import { useState, useMemo } from 'react';
import { ALL_PRODUCTS } from '../data/products';

export const useStoreLogic = () => {
  const [filter, setFilter] = useState([]);
  const [limit, setLimit] = useState(6);

  const categories = ["Bread & Bakery", "Baking Needs", "Cooking", "Snacks", "Beverages", "Vegetables"];

  const handleFilterChange = (cat) => {
    setFilter(prev => 
      prev.includes(cat) ? prev.filter(x => x !== cat) : [...prev, cat]
    );
    setLimit(6);
  };

  const filteredData = useMemo(() => {
    return filter.length === 0 
      ? ALL_PRODUCTS 
      : ALL_PRODUCTS.filter(p => filter.includes(p.category));
  }, [filter]);

  const loadMore = () => setLimit(prev => prev + 3);
  const clearFilter = () => setFilter([]);

  return {
    filter,
    categories,
    filteredData: filteredData.slice(0, limit),
    totalCount: filteredData.length,
    currentLimit: limit,
    handleFilterChange,
    loadMore,
    clearFilter
  };
};