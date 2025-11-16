import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/apiSlice";   // ← FIXED PATH

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
