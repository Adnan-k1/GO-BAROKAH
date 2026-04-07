import { useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/products';

export const useStoreLogic = () => {
  const [filter, setFilter] = useState([]);
  const [limit, setLimit] = useState(6);
  
  const { search } = useLocation();
  const searchQuery = useMemo(() => {
    return new URLSearchParams(search).get('search') || '';
  }, [search]);

  const categories = [
    "Bread & Bakery", "Baking Needs", "Cooking", 
    "Snacks", "Beverages", "Vegetables"
  ];

  const handleFilterChange = useCallback((cat) => {
    setFilter(prev => {
      const newFilter = prev.includes(cat) 
        ? prev.filter(x => x !== cat) 
        : [...prev, cat];
      return newFilter;
    });
    setLimit(6);
  }, []);
  
  const filteredDataResult = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesSearch = searchQuery 
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;

      const matchesCategory = filter.length === 0 
        ? true 
        : filter.includes(product.category);

      return matchesSearch && matchesCategory;
    });
  }, [filter, searchQuery]);

  const loadMore = () => setLimit(prev => prev + 3);

  const clearFilter = () => {
    setFilter([]);
    setLimit(6);
  };

  return {
    filter,
    categories,
    searchQuery,
    filteredData: filteredDataResult.slice(0, limit), 
    totalCount: filteredDataResult.length, 
    currentLimit: limit,
    handleFilterChange,
    loadMore,
    clearFilter
  };
};