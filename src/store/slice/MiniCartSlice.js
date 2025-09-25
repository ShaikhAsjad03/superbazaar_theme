import { createSlice } from "@reduxjs/toolkit";

const MiniCartSlice = createSlice({
  name: "MiniCartSlice",
  initialState: {
    isCartOpen: false,
  },
  reducers: {
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { openCart, closeCart, toggleCart } = MiniCartSlice.actions;
export default MiniCartSlice.reducer;
