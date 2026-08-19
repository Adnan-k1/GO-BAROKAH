import React from "react";
import {
  ChevronLeft, ChevronRight, Loader2, Pencil, Trash2,
  Tag, Image as ImageIcon, Eye, EyeOff,
} from "lucide-react";
import { formatRupiah } from "../../../utils/formatters";

const PER_PAGE = 10;

const COLUMN_HEADERS = ["Produk", "Kategori", "Stok", "Harga", "Aksi"];

const LoadingState = () => (
  <tr>
    <td colSpan={5} className="py-24 text-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Loading...</p>
    </td>
  </tr>
);

const EmptyState = () => (
  <tr>
    <td colSpan={5} className="py-24 text-center uppercase tracking-widest text-slate-300 font-black text-[10px]">
      Kosong
    </td>
  </tr>
);

const ProductImage = ({ product }) => (
  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative">
    {!product.is_active && (
      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center z-10">
        <EyeOff size={16} className="text-white" />
      </div>
    )}
    {product.image_url || product.image ? (
      <img
        src={product.image_url || product.image}
        alt={product.name}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = "https://placehold.co/400x400/FBFBFB/3A5A4D?text=No+Image"; }}
      />
    ) : (
      <ImageIcon size={18} className="text-slate-300" />
    )}
  </div>
);

const PriceCell = ({ product }) => {
  const hasDiscount = product.discount_amount > 0 && product.final_price > 0 && product.final_price !== product.price;

  return (
    <div className="flex flex-col gap-0.5">
      {hasDiscount ? (
        <>
          <span className="text-red-400 text-[10px] font-bold line-through leading-none">
            {formatRupiah(product.price)}
          </span>
          <span className="font-black text-xs text-slate-900">
            {formatRupiah(product.final_price)}
          </span>
          <span className="flex items-center gap-1 mt-0.5">
            <Tag size={9} className="text-emerald-500" />
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wider">
              Diskon {product.discount_amount}%
            </span>
          </span>
        </>
      ) : (
        <span className="font-black text-slate-900 text-xs">
          {formatRupiah(product.price)}
        </span>
      )}
      <span className="text-[9px] text-slate-400 font-bold  mt-1">
        HPP/Harga Pokok Produk: {formatRupiah(product.cost || 0)}
      </span>
    </div>
  );
};

const ActionButtons = ({ product, onToggleActive, onEdit, onDelete }) => (
  <div className="flex justify-end gap-2">
    <button
      onClick={() => onToggleActive(product.id)}
      className={`p-2.5 rounded-xl active:scale-90 transition-all ${
        product.is_active
          ? "bg-slate-50 text-slate-400 hover:text-orange-500"
          : "bg-orange-50 text-orange-500 hover:text-orange-600"
      }`}
      title={product.is_active ? "Sembunyikan Produk" : "Tampilkan Produk"}
    >
      {product.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
    </button>
    <button onClick={() => onEdit(product)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 rounded-xl active:scale-90 transition-all">
      <Pencil size={14} />
    </button>
    <button onClick={() => onDelete(product)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl active:scale-90 transition-all">
      <Trash2 size={14} />
    </button>
  </div>
);

const ProductRow = ({ product, onToggleActive, onEdit, onDelete }) => (
  <tr key={product.id} className={`hover:bg-slate-50/50 h-[73px] transition-colors ${!product.is_active ? "opacity-50 grayscale" : ""}`}>
    <td className="px-4 py-4">
      <div className="flex items-center gap-4">
        <ProductImage product={product} />
        <div className="flex flex-col min-w-0">
          <p className="font-bold text-slate-900 text-xs uppercase truncate">{product.name}</p>
          <p className="text-[9px] text-slate-400 font-medium truncate w-40">{product.description || "No description available"}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-4">
        <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
        {product.category?.name || product.category}
      </span>
    </td>
    <td className="px-4 py-4">
      <div className="flex flex-col">
        <span className={`font-black text-xs ${Number(product.stock) <= 5 ? "text-red-500" : "text-slate-700"}`}>{product.stock}</span>
      </div>
    </td>
    <td className="px-4 py-4">
      <PriceCell product={product} />
    </td>
    <td className="px-4 py-4 text-right">
      <ActionButtons
        product={product}
        onToggleActive={onToggleActive}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </td>
  </tr>
);

const PaginationFooter = ({ page, totalPages, onPageChange }) => (
  <footer className="px-4 md:px-8 py-4 border-t border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white flex-shrink-0">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Page {page} of {totalPages}</p>
    <div className="flex gap-1.5">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 disabled:opacity-20 active:scale-95 transition-all">
        <ChevronLeft size={16} />
      </button>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 disabled:opacity-20 active:scale-95 transition-all">
        <ChevronRight size={16} />
      </button>
    </div>
  </footer>
);

const ProductTable = ({
  products,
  isLoading,
  tableScrollRef,
  onToggleActive,
  onEdit,
  onDelete,
  page,
  totalPages,
  onPageChange,
}) => (
  <>
    <div className="flex-1 overflow-auto custom-scrollbar" ref={tableScrollRef}>
      <table className="w-full border-collapse min-h-full min-w-[700px]">
        <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-100">
          <tr>
            {COLUMN_HEADERS.map((h) => (
              <th key={h} className={`px-4 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ${h === 'Aksi' ? 'text-right' : 'text-left'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {isLoading ? (
            <LoadingState />
          ) : products.length > 0 ? (
            <>
              {products.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  onToggleActive={onToggleActive}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              {products.length < PER_PAGE && (
                <tr style={{ height: `${(PER_PAGE - products.length) * 73}px` }}>
                  <td colSpan={4} />
                </tr>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </tbody>
      </table>
    </div>
    <PaginationFooter page={page} totalPages={totalPages} onPageChange={onPageChange} />
  </>
);

export default ProductTable;
