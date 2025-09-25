import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  signup: false,
  forget: false,
  otp: false,
  confirmPassword: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const modalName = action.payload;
      state[modalName] = true;
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      state[modalName] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state).forEach(key => state[key] = false);
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
