import React from "react";

const OrderCardSkeleton = () => (
  <div aria-hidden="true" className="animate-pulse border border-gray-100 rounded-[20px] overflow-hidden">
    <div className="px-5 py-4 flex items-center justify-between bg-[#F8FAF9]/60 border-b border-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-full bg-gray-200" />
          <div className="h-2 w-32 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="h-6 w-20 rounded-xl bg-gray-200" />
    </div>
    <div className="px-5 py-4 space-y-3">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
            <div className="h-3 rounded-full bg-gray-200 w-3/5" />
            <div className="h-2 rounded-full bg-gray-200 w-8" />
          </div>
          <div className="h-3 w-20 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
    <div className="px-5 py-4 bg-[#F8FAF9]/40 border-t border-gray-50 flex items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="h-2 w-20 rounded-full bg-gray-200" />
        <div className="h-5 w-28 rounded-full bg-gray-200" />
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-20 rounded-xl bg-gray-200" />
        <div className="h-9 w-20 rounded-xl bg-gray-200" />
      </div>
    </div>
  </div>
);

export default OrderCardSkeleton;
