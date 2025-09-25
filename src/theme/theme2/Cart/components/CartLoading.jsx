"use client";
import React from "react";

const CartLoading = () => {
  return (
    <div className="mx-auto mt-7  
        w-full 
        sm:max-w-[540px] 
        md:max-w-[720px] 
        lg:max-w-[960px] 
        xl:max-w-[1140px] 
        2xl:max-w-[1320px] px-4 py-8
        animate-pulse ">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex gap-4 border-b border-gray-200 pb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default CartLoading;
