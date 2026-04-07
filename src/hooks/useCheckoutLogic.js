import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/formatCurrency';

export const useCheckoutLogic = () => {
  const { cartItems } = useCart();
  const [selectedLocation, setSelectedLocation] = useState('');
  
 
  const [isPickup, setIsPickup] = useState(false);

 
  const zones = [
    { name: 'Pangkalan Bun (Kota)', dist: 5, rate: 0 },
    { name: 'Kumai', dist: 15, rate: 0 },
    { name: 'Pangkalan Lada', dist: 45, rate: 0.015 }, 
    { name: 'Pangkalan Banteng', dist: 65, rate: 0.015 }, 
    { name: 'Sukamandang', dist: 110, rate: 0.025 },   
    { name: 'Sukamara', dist: 90, rate: 0.025 },        
    { name: 'Lamandau', dist: 120, rate: 0.025 },       
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const activeZone = zones.find(z => z.name === selectedLocation);
  

  const rawShipping = isPickup ? 0 : (activeZone ? subtotal * activeZone.rate : 0);
  
  const total = subtotal + rawShipping;

  return {
    cartItems,
    zones,
    selectedLocation,
    setSelectedLocation,
    isPickup,         
    setIsPickup,      
    subtotal: formatIDR(subtotal),
    shippingFee: formatIDR(rawShipping),
    total: formatIDR(total),
    activeZone,
    rawShipping
  };
};