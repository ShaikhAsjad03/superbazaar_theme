"use client";
import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-50 shadow-inner">
        <ShoppingBag className="w-16 h-16 text-indigo-600" />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full shadow-lg">
          0
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8">
        Oops! Your Cart is Empty
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you haven’t added anything yet.  
        Let’s find something amazing for you.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition"
      >
        🛍️ Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
