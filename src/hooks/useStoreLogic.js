import { useState, useMemo, useCallback } from 'react';
import { ALL_PRODUCTS } from '../data/products';

export const useStoreLogic = () => {
  const [filter, setFilter] = useState([]);
  const [limit, setLimit] = useState(6);

 
  const categories = [
    "Bread & Bakery", 
    "Baking Needs", 
    "Cooking", 
    "Snacks", 
    "Beverages", 
    "Vegetables"
  ];


  const handleFilterChange = useCallback((cat) => {
    setFilter(prev => {
      const newFilter = prev.includes(cat) 
        ? prev.filter(x => x !== cat) 
        : [...prev, cat];
      return newFilter;
    });
    
  }, []);


  const filteredDataResult = useMemo(() => {
    return filter.length === 0 
      ? ALL_PRODUCTS 
      : ALL_PRODUCTS.filter(p => filter.includes(p.category));
  }, [filter]);


  const loadMore = () => setLimit(prev => prev + 3);

  const clearFilter = () => {
    setFilter([]);
    setLimit(6);
  };

  return {
    filter,
    categories,
    filteredData: filteredDataResult.slice(0, limit), 
    totalCount: filteredDataResult.length, 
    currentLimit: limit,
    handleFilterChange,
    loadMore,
    clearFilter
  };
};  