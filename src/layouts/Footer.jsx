import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#2D5A43] text-white pt-16 md:pt-24 pb-10 md:pb-12 w-full mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 mb-14 md:mb-20">

          {/* Brand */}
          <div className="space-y-4 md:space-y-6 sm:col-span-2 md:col-span-1">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
              UD. <br />BAROKAH.
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed max-w-xs">
              Penyedia bahan pangan segar kualitas unggulan langsung dari distributor terpercaya.
            </p>
          </div>

          {/* Kontak */}
          <div className="space-y-3 md:space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Kontak Kami</p>
            <ul className="space-y-2 text-[14px] md:text-[15px] font-medium">
              <li>Pangkalan Bun, Kalimantan Tengah</li>
              <li>customerservice@udbarokah.com</li>
              <li>+62 812 3456 7890</li>
            </ul>
          </div>

          {/* Navigasi */}
          <div className="space-y-3 md:space-y-4 md:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Navigasi</p>
            <ul className="space-y-2 text-[14px] md:text-[15px] font-medium uppercase tracking-tighter">
              <li className="hover:text-white/60 cursor-pointer transition-all">Beranda</li>
              <li className="hover:text-white/60 cursor-pointer transition-all">Produk</li>
              <li className="hover:text-white/60 cursor-pointer transition-all">Tentang Kami</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">
            © {currentYear} UD BAROKAH. All Rights Reserved.
          </p>
          <div className="flex gap-6 md:gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
            <span className="hover:text-white cursor-pointer transition-all">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-all">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;