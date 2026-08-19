import React from "react";

const ProductCardSkeleton = ({ compact = false }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse bg-white ${compact ? "p-0" : "p-3 sm:p-5 border-r border-b border-gray-100"}`}
  >
    <div className={`${compact ? "aspect-[4/3] rounded-xl" : "aspect-square rounded-xl sm:rounded-2xl"} bg-gray-200 mb-3 sm:mb-5`} />
    <div className="space-y-2">
      <div className="h-2 w-1/3 rounded-full bg-gray-200" />
      <div className="h-3 w-4/5 rounded-full bg-gray-200" />
      <div className="h-3 w-2/5 rounded-full bg-gray-200" />
    </div>
    {!compact && <div className="h-10 w-10 ml-auto mt-10 rounded-xl bg-gray-200" />}
  </div>
);

export default ProductCardSkeleton;
