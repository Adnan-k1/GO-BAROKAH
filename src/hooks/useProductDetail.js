import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';
import toast from 'react-hot-toast';
export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id));

 
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Toko Organik`;
    }
  }, [product]);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => Math.max(1, prev - 1));

  const onAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`${quantity} ${product.name} berhasil ditambahkan!`, {
      icon: '🛒',
      duration: 3000,
      style: {
        borderRadius: '16px',
        background: '#2D5A43', 
        color: '#fff',
        fontWeight: 'bold',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#2D5A43',
      },
    });
  };

  return {
    product,
    quantity,
    increase,
    decrease,
    onAddToCart,
    goBack: () => navigate(-1)
  };
};