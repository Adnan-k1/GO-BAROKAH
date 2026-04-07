import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    setSearchTerm(params.get('search') || '');
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/store'); 
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex-1 max-w-2xl relative group ${className}`}
    >
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#2D5A43] transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Cari produk organik..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-[#F3F5F7] border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#2D5A43]/20 transition-all outline-none font-medium"
      />
    </form>
  );
};

export default SearchBar;