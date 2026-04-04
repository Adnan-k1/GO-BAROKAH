import { Star, ShoppingBag, Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { formatIDR } from '../utils/formatCurrency';
import { useProductDetail } from '../hooks/useProductDetail';

const ProductDetail = () => {
  const { product, quantity, increase, decrease, onAddToCart, goBack } = useProductDetail();

  if (!product) return <NotFoundState />;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 animate-in fade-in duration-500">
      <BackButton onClick={goBack} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        <ProductImage src={product.img} name={product.name} sale={product.sale} />

       
        <div className="flex flex-col justify-center">
          <ProductInfo 
            category={product.category} 
            name={product.name} 
            price={product.price} 
            oldPrice={product.oldPrice} 
          />

          <p className="text-gray-500 text-sm leading-relaxed mb-10 border-b pb-10">
            Produk berkualitas tinggi yang dipilih langsung dari petani lokal kami. Segar, organik, 
            dan diproses dengan standar kebersihan tertinggi.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <QuantityControl qty={quantity} onPlus={increase} onMinus={decrease} />
            <BuyButton onClick={onAddToCart} />
            <WishlistButton />
          </div>
        </div>
      </div>
    </div>
  );
};



const BackButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 text-sm font-medium transition-colors group">
    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Toko
  </button>
);

const ProductImage = ({ src, name, sale }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden group shadow-sm">
    {sale && <span className="absolute top-6 left-6 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">Sale {sale}</span>}
    <img src={src} alt={name} className="max-h-[400px] md:max-h-[450px] object-contain transform group-hover:scale-105 transition-transform duration-500" />
  </div>
);

const ProductInfo = ({ category, name, price, oldPrice }) => (
  <header className="mb-6">
    <span className="text-[#2D5A43] font-bold text-xs uppercase tracking-[0.2em] mb-2 block">{category}</span>
    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{name}</h1>
    <div className="flex items-center gap-4 mb-4">
      <div className="flex text-orange-400">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <span className="text-gray-400 text-xs border-l pl-4 font-medium">(4.0) 12 Reviews</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-3xl font-bold text-[#2D5A43]">{formatIDR(price)}</span>
      {oldPrice && <span className="text-xl text-gray-300 line-through font-medium">{formatIDR(oldPrice)}</span>}
    </div>
  </header>
);

const QuantityControl = ({ qty, onPlus, onMinus }) => (
  <div className="flex items-center border-2 border-gray-100 rounded-full p-1 bg-gray-50 w-full sm:w-auto justify-between">
    <button onClick={onMinus} className="p-2 hover:bg-white rounded-full transition-colors active:scale-90"><Minus className="w-4 h-4" /></button>
    <span className="w-12 text-center font-bold text-sm">{qty}</span>
    <button onClick={onPlus} className="p-2 hover:bg-white rounded-full transition-colors active:scale-90"><Plus className="w-4 h-4" /></button>
  </div>
);

const BuyButton = ({ onClick }) => (
  <button onClick={onClick} className="flex-1 w-full bg-[#2D5A43] text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#234735] transition-all shadow-lg shadow-green-900/10 active:scale-95">
    <ShoppingBag className="w-5 h-5" /> Tambah ke Keranjang
  </button>
);

const WishlistButton = () => (
  <button className="p-4 border-2 border-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 shadow-sm">
    <Heart className="w-5 h-5" />
  </button>
);

const NotFoundState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <p className="text-gray-500 mb-4 font-medium">Wah, produknya ga ada di rak nih.</p>
    <Link to="/" className="text-[#2D5A43] font-bold hover:underline">Balik ke Depan Yuk</Link>
  </div>
);

export default ProductDetail;