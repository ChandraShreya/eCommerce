"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { store } from "../store/store";
import { setCartFromStorage } from "../slice/cartSlice/cartSlice";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
      useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      store.dispatch(setCartFromStorage(cartData.items || []));
    }
  }, []);
  return (
    <Provider store={store}>{children}</Provider>
  );
}
