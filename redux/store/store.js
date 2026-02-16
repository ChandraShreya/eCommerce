import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slice/productSlice/productSlice";
import cartReducer from "../slice/cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
