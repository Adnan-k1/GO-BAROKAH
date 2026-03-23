import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import petaniImg from '../assets/img/petani.jpg'; 

const Hero = () => {
  const navigate = useNavigate(); 

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
    
      <div 
        className="w-full h-full"
        style={{ 
          backgroundImage: `url(${petaniImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center' 
        }}
      >
        
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Get the best quality <br />
              products at the <span className="text-yellow-400">affordable prices</span>
            </h1>
            
            <p className="text-lg text-gray-200 max-w-lg leading-relaxed">
              We have prepared a special price for your budget to buy the best products.
            </p>

            
            <button 
              onClick={() => navigate('/store')}
              className="bg-white text-black px-10 py-3 rounded-md font-bold text-sm hover:bg-[#2D5A43] hover:text-white transition-all active:scale-95 shadow-lg"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-8 left-10 flex gap-2">
        <div className="w-12 h-1 bg-yellow-400 rounded-full"></div>
        <div className="w-4 h-1 bg-white/30 rounded-full"></div>
        <div className="w-4 h-1 bg-white/30 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;