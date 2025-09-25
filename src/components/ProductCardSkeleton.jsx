// ProductCardSkeleton.jsx
"use client";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full bg-white rounded-none sm:rounded-sm overflow-hidden p-0 sm:p-2">
      <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] md:aspect-[3/4] bg-gray-200 rounded-none sm:rounded-sm"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-5 bg-gray-200 rounded w-12"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
