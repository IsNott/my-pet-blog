import { PayloadAction, createSlice } from "@reduxjs/toolkit";

let initialState: string[] = [];

export const plogImg = createSlice({
  name: "plogImg",
  initialState: initialState,
  reducers: {
    setImgs: (state, action: PayloadAction<string[]>) => {
      return (initialState = action.payload);
    },
    getImgs: (state) => {
      return state;
    },
  },
});

export const { setImgs, getImgs } = plogImg.actions;
export default plogImg.reducer;
