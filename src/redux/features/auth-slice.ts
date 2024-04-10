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
    // 登出函数
    logOut: () => {
      return initialState;
    },
  },
});
