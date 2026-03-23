import React from 'react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';

const Home = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <ProductSection />
    </div>
  );
};

export default Home;