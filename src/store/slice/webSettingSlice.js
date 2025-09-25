import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    webSetting: {},
};
const WebSettingSlice = createSlice({
    name: "webSettingSlice",
    initialState,
    reducers: {
        setWebSetting: (state, action) => {
            state.webSetting = action.payload;
        },
    }
})
export const { setWebSetting } = WebSettingSlice.actions;
export default WebSettingSlice.reducer;
