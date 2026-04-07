const CATEGORIES = [
  { id: 1, name: "Baking Needs", image: "src/assets/img/baking.svg" },
  { id: 2, name: "Cooking", image: "src/assets/img/cooking.png" },
  { id: 3, name: "Beverages", image: "src/assets/img/beverages.png" },
  { id: 4, name: "Diabetic Food", image: "src/assets/img/diabetic.png" },
  { id: 5, name: "Dish Detergents", image: "src/assets/img/detergents.png" },
  { id: 6, name: "Bread & Bakery", image: "src/assets/img/bread-bakery.png" },
  { id: 7, name: "Snacks", image: "src/assets/img/snacks.png" },
  { id: 8, name: "Beauty & Health", image: "src/assets/img/beauty-health.png" },
  { id: 9, name: "Oil", image: "src/assets/img/oil.png" },
  { id: 10, name: "Fresh Vegetables", image: "src/assets/img/fresh-vegetables.png" },
];

const PRODUCTS = [
  { id: 1, name: "Gula Merah", price: 15000, image: "src/assets/img/gula merah.png" },
  { id: 2, name: "Beras Mawar", price: 75000, image: "src/assets/img/mawar.jpg" },
  { id: 3, name: "Beras Lutino", price: 82000, image: "src/assets/img/lutino.png" },
];

const ProductSection = () => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-white font-sans">
      
      
      <section className="max-w-7xl mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">Categories</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-10">
          Pilih kategori produk organik dan segar untuk kebutuhan dapur Anda sehari-hari.
        </p>
        <button className="border border-black px-10 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all mb-16">
          Shop All
        </button>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className="group p-8 rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all bg-white border border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-md"
            >
              <div className="w-24 h-24 mb-5 transition-transform group-hover:scale-110">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight text-gray-800 text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto py-20 px-6 text-center border-t border-gray-50">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">Our Products</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-14">
          Produk pilihan langsung dari petani dengan kualitas terbaik dan harga terjangkau.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {PRODUCTS.map((prod) => (
            <div key={prod.id} className="group cursor-pointer">
              <div className="bg-white border border-gray-50 aspect-square flex items-center justify-center p-10 mb-6 overflow-hidden transition-all hover:shadow-md">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{prod.name}</h3>
              <p className="text-[#2D5A43] font-extrabold text-lg">
                {formatRupiah(prod.price)}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-20 border border-black px-12 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
          Shop All
        </button>
      </section>
      
    </div>
  );
};

export default ProductSection; 