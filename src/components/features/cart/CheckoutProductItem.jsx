import React, { useEffect, useState } from "react";
import { Minus, Package, Plus } from "lucide-react";
import { formatIDR } from "../../../utils/formatCurrency";

const CheckoutProductItem = ({ item, isUpdating, onIncrease, onDecrease, onQuantityChange }) => {
  const quantity = item.quantity || 0;
  const price = item.price || item.unitPrice || 0;
  const originalPrice = item.original_price || price;
  const [inputQuantity, setInputQuantity] = useState(String(quantity));

  useEffect(() => {
    setInputQuantity(String(quantity));
  }, [quantity]);

  const commitQuantity = async () => {
    const nextQuantity = Number(inputQuantity);
    if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
      setInputQuantity(String(quantity));
      return;
    }

    if (nextQuantity !== quantity) {
      try {
        await onQuantityChange(nextQuantity);
      } catch {
        setInputQuantity(String(quantity));
      }
    }
  };

  return (
    <div className="flex gap-3 items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {item.image || item.productImageUrl || item.image_url ? (
          <img
            src={item.image || item.productImageUrl || item.image_url}
            alt={item.name || item.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package size={20} className="text-gray-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[11px] font-black text-gray-900 truncate">
          {item.name || item.productName}
        </h4>
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={onDecrease}
            disabled={isUpdating || quantity <= 1}
            aria-label={`Kurangi ${item.name || item.productName}`}
            className="w-6 h-6 rounded-lg border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus size={11} strokeWidth={3} />
          </button>
          {isUpdating ? (
            <span className="min-w-5 text-center text-[10px] font-black text-gray-800">...</span>
          ) : (
            <input
              type="number"
              min="1"
              inputMode="numeric"
              value={inputQuantity}
              onChange={(event) => setInputQuantity(event.target.value.replace(/\D/g, ""))}
              onBlur={commitQuantity}
              onKeyDown={(event) => {
                if (event.key === "Enter") event.currentTarget.blur();
              }}
              aria-label={`Jumlah ${item.name || item.productName}`}
              className="w-8 bg-transparent text-center text-[10px] font-black text-gray-800 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
          )}
          <button
            type="button"
            onClick={onIncrease}
            disabled={isUpdating}
            aria-label={`Tambah ${item.name || item.productName}`}
            className="w-6 h-6 rounded-lg border border-emerald-100 text-[#2D5A43] flex items-center justify-center hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus size={11} strokeWidth={3} />
          </button>
        </div>
      </div>
      <div className="text-[11px] font-black text-gray-700 shrink-0">
        {formatIDR(originalPrice)}
      </div>
    </div>
  );
};

export default CheckoutProductItem;
