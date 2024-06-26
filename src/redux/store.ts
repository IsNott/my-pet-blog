// 容纳所有store、变量等
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme-slice";
import plogPageReducer from "./features/page-slice";
import plogImgReducer from "./features/plog-img-slice";
import authReducer from "./features/auth-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  // reducer：函数 接收一个action state的先前状态
  // 对状态进行变更后返回
  reducer: {
    themeReducer,
    plogPageReducer,
    plogImgReducer,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
