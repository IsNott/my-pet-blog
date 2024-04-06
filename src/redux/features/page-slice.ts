import {PayloadAction, createSlice} from "@reduxjs/toolkit"

let initialState = '1'

export const plogPage = createSlice({
  name:"plogPage",
  initialState:initialState,
  reducers:{
    setPage: (state,action:PayloadAction<string>) => {
      return initialState = action.payload
    }
  }
})

export const { setPage } = plogPage.actions
export default plogPage.reducer