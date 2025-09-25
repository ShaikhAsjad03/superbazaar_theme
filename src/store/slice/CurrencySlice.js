import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selected: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyData: (state, action) => {
      state.list = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selected = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCurrency", JSON.stringify(action.payload));
      }
    },
    loadSelectedCurrency: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("selectedCurrency");
        if (stored) {
          state.selected = JSON.parse(stored);
        }
      }
    },
  },
});

export const {
  setCurrencyData,
  setSelectedCurrency,
  loadSelectedCurrency,
} = currencySlice.actions;

export default currencySlice.reducer;
