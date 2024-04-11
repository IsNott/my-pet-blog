// 创建登录slice存入登录信息
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  // 初始状态
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<InitialState>) => {
      const logInName = action.payload?.value.username;
      const uid = action.payload?.value.uid;
      initialState.value.uid = uid;
      initialState.value.username = logInName;
      initialState.value.isAuth = true;
      return initialState;
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
