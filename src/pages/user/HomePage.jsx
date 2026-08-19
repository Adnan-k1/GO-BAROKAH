import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategorySection from '../../components/features/CategorySection';
import DiscountSection from '../../components/features/DiscountSection';
import ProductSection from '../../components/features/ProductSection';
import ProductCardSkeleton from '../../components/common/ProductCardSkeleton';
import { useHomeLogic } from "../../hooks/user/useHomeLogic";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const pendingPayment = localStorage.getItem('pendingPayment');
    if (pendingPayment) {
      localStorage.removeItem('pendingPayment');
      setTimeout(() => {
        navigate("/profile/orders", { replace: true });
      }, 100);
    }
  }, [navigate]);
  const { 
    loading, 
    categories, 
    activeFilters, 
    setActiveFilters, 
    toggleFilter, 
    filteredProducts 
  } = useHomeLogic();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] py-10 md:py-14" aria-busy="true">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-7 w-40 rounded-full bg-gray-200 animate-pulse mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, index) => (
              <ProductCardSkeleton key={index} compact />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">

      
      <CategorySection 
        categories={categories}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        setActiveFilters={setActiveFilters}
      />
      
      <DiscountSection filteredProducts={filteredProducts} />
      <ProductSection filteredProducts={filteredProducts} />
    </div>
  );
};

export default HomePage;
