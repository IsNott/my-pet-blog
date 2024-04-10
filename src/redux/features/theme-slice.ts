import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    change: (state) => {
      return state === initialState ? !initialState : initialState;
    },
  },
});

export const { change } = theme.actions;
export default theme.reducer;
