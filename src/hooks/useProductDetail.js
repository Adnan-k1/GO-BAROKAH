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
      document.title = `${product.name} | UD Barokah`;
    }
  }, [product]);

  const increase = () => setQuantity(prev => (prev === '' ? 1 : prev + 1));
  const decrease = () => setQuantity(prev => Math.max(1, (prev === '' ? 1 : prev - 1)));

  // Logika Input Manual
  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      setQuantity(Math.max(1, num));
    }
  };

  
  const handleBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  const onAddToCart = () => {
    if (!product || quantity === '') return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success(`${quantity} ${product.name} masuk keranjang!`, {
      style: {
        borderRadius: '12px',
        background: '#2D5A43',
        color: '#fff',
      },
    });
  };

  return {
    product,
    quantity,
    increase,
    decrease,
    handleQuantityChange,
    handleBlur,
    onAddToCart,
    goBack: () => navigate(-1)
  };
};