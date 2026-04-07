import Hero from '../components/features/Hero';
import ProductSection from '../components/features/ProductSection';

const Home = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <ProductSection />
    </div>
  );
};

export default Home;