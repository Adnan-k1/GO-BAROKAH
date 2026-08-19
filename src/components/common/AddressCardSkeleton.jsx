import React from "react";

const AddressCardSkeleton = () => (
  <div aria-hidden="true" className="animate-pulse border border-gray-100 rounded-[24px] p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-gray-200" />
      <div className="h-3 w-24 rounded-full bg-gray-200" />
    </div>

    <div className="px-1 py-2 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 rounded-full bg-gray-200" />
        <div className="h-4 w-40 rounded-full bg-gray-200" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 rounded-full bg-gray-200" />
        <div className="h-3 w-32 rounded-full bg-gray-200" />
      </div>
      <div className="flex items-start gap-4">
        <div className="w-4 h-4 rounded-full bg-gray-200 mt-1" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-full rounded-full bg-gray-200" />
          <div className="h-3 w-4/5 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-5 mt-4 border-t border-gray-100">
      <div className="h-3 w-24 rounded-full bg-gray-200" />
      <div className="flex gap-2">
        <div className="w-9 h-9 rounded-xl bg-gray-200" />
        <div className="w-9 h-9 rounded-xl bg-gray-200" />
      </div>
    </div>
  </div>
);

export default AddressCardSkeleton;
