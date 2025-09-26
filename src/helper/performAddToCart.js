import { addToCartProduct, getCartItems } from "@/services/cartService";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { openCart } from "@/store/slice/MiniCartSlice";

export const performAddToCart = async (
  finalCartData,
  userId,
  dispatch,
  setLoading = () => {},
  setError = () => {}
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await addToCartProduct({
      ...finalCartData,
      user_id: userId,
    });

    if (response?.isSuccess) {
      const fetchCartData = await getCartItems(userId);
      dispatch(setCartItems(fetchCartData));
      dispatch(openCart());
    } 
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong while adding to cart.");
  } finally {
    setLoading(false);
  }
};

