// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import blogReducer from "./RTKQuery/BlogList.reducer";
// import { blogApi } from "./Redux2/blog.service";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { rtkQueryErrorLogger } from "./Middleware";

// export const store = configureStore({
//   reducer: {
//     blog: blogReducer,
//     [blogApi.reducerPath]: blogApi.reducer, // thêm reducer được tạo từ api slice
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger),
// });
// setupListeners(store.dispatch); 
// // lấy rootState và AppDispath từ store
// export type RooteState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
import React from 'react'

export const Store = () => {
  return (
    <div>Store</div>
  )
}
