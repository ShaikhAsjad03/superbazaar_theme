"use client";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { updateCartQuantity, deleteCartProduct, getCartItems } from "@/services/cartService";
export const useCartActions = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loadingIds, setLoadingIds] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const updateQuantity = async (item, newQty) => {
    setLoadingIds((prev) => [...prev, item.id]);
    try {
      const freshCart = await updateCartQuantity(item, newQty, session?.user?.id);
      dispatch(setCartItems(freshCart));
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  const incrementQuantity = (item) => updateQuantity(item, item.quantity + 1);
  const decrementQuantity = (item) =>
    item.quantity > 1 ? updateQuantity(item, item.quantity - 1) : null;

  const removeItem = async (id) => {
    try {
      setDeleteLoading(id);
      const response = await deleteCartProduct(id);
      if (response.isSuccess) {
        const cartItems = await getCartItems(session?.user?.id);
        dispatch(setCartItems(cartItems));
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  return {
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    loadingIds,
    deleteLoading,
  };
};
