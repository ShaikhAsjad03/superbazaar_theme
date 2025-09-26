import { createSlice } from "@reduxjs/toolkit";

const pendingActionSlice = createSlice({
  name: "pendingAction",
  initialState: null,
  reducers: {
    setPendingAction: (_, action) => action.payload,
    clearPendingAction: () => null,
  },
});

export const { setPendingAction, clearPendingAction } = pendingActionSlice.actions;
export default pendingActionSlice.reducer;
