import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: {}
}
const WishlistSlice = createSlice({
    name: "WishlistSlice",
    initialState,
    reducers: {
        setWishlistData: (state, action) => {
            state.list = action.payload;
        }
    }

})

export const { setWishlistData } = WishlistSlice.actions
export default WishlistSlice.reducer