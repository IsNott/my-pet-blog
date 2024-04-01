import {createSlice,PayloadAction} from "@reduxjs/toolkit"



const initialState = 'dark'

export const themeSlice = createSlice({
  name:"theme",
  initialState,
  reducers:{
    change: (state,payload:PayloadAction<string>) => {
      return state === initialState ? 'light' : 'dark'
    }
  }
})

export const { change } = theme.actions
export default theme.reducer