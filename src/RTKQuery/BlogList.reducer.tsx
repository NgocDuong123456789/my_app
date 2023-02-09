// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Post } from "../@type/Blog";
// interface BlogState {
//   postId: string;
// }

// const intialState: BlogState = {
//   postId: "",
// };

// const blogSlice = createSlice({
//   name: "blog",
//   initialState: intialState,

//   reducers: {
//     startEditingPost: (state, action: PayloadAction<string>) => {
//       state.postId = action.payload;
//     },
//     cancelEditPost: (state) => {
//       state.postId = "";
//     },
   
//   },
// });

// const blogReducer = blogSlice.reducer;
// export default blogReducer;


// export const { startEditingPost, cancelEditPost } = blogSlice.actions;
import React from 'react'

export const BlogLists = () => {
  return (
    <div>BlogList.reducer</div>
  )
}
