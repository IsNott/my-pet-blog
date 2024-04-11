"use client";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "@/redux/features/auth-slice";

export default function storgeAuth(username: string, id: string) {
  console.log("user", username, id);

  const dispatch = useDispatch<AppDispatch>();
  const data = {
    value: {
      isAuth: true,
      username,
      uid: id,
    },
  };
  dispatch(logIn(data));
}

export function clearAuth() {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(logOut());
}
