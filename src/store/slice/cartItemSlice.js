import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    CartData: {}
}
const CartItemSlice = createSlice({
    name: "cartItemSlice",
    initialState: initialState,
    reducers: {
        setCartItems: (state, action) => { state.CartData = action.payload}
    }
})

export const { setCartItems } = CartItemSlice.actions;
export default CartItemSlice.reducer