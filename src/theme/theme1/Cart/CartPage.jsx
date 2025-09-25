"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import CartLoading from "./components/CartLoading";
import EmptyCart from "./components/EmptyCart";
import CartItems from "./CartItems";

const CartPageTheme1 = () => {
  const { CartData } = useSelector((state) => state.cartItem);
  const [cartItems, setCartItemsState] = useState([]);
  useEffect(() => {
    setCartItemsState(CartData || []);
  }, [CartData]);
  return (
    <div className="w-full">
        <div className="w-full h-[200px] flex justify-center items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <h1 className="text-4xl font-medium">Shopping Cart</h1>
      </div>
      {Object.keys(CartData)?.length === 0 ? (
        <CartLoading />
      ) : cartItems?.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartItems
          CartData={cartItems}
        />
      )}
    </div>
  );
};

export default CartPageTheme1;
