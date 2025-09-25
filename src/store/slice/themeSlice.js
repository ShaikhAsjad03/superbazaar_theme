import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    config: {},
}
const ThemeSlice = createSlice({
  name: "ThemeSlice",
  initialState: initialState,
  reducers: {
     setTheme: (state, action) => {
      state.name = action.payload.name;
      state.config = action.payload.config;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
