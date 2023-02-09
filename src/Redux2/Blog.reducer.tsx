// import { Post } from "../@type/Blog";
// import { initalPostList } from "../constants/blog";
// import {
//   createAsyncThunk,
//   createReducer,
//   nanoid,
//   createSlice,
//   createAction,
//   PayloadAction,
//   AsyncThunk,
//   current,
// }
//  from "@reduxjs/toolkit";
// import { https } from "../utils/https";
// interface BlogState {
//   PostList: Post[];
//   editingPost: Post | null;
//   loading: boolean;
//   currentID: undefined | string;
// }

// const initialState: BlogState = {
//   PostList: [],
//   editingPost: null,
//   loading: false,
//   currentID: undefined,
// };

// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
// type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
// type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
// type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

// // createAction(type , payload ?)
// // export const addPost = createAction(
// //   "blog/addPost",
// //   function (post: Omit<Post, "id">) {
// //     return {
// //       payload: {
// //         ...post,
// //         id: nanoid(),
// //       },
// //     };
// //   }
// // );

// export const addPost = createAsyncThunk("blog/addPost", async (_, thunkAPI) => {
//   const response = await https.get<Post[]>("/posts", {
//     signal: thunkAPI.signal,
//   });
//   return response.data;
// });

// export const getPost = createAsyncThunk(
//   "blog/getPost",
//   async (body: Omit<Post, "id">, thunkAPI) => {
//     const response = await https.post<Post>("/posts", body, {
//       signal: thunkAPI.signal,
//     });
//     return response.data;
//   }
// );

// export const deletePost = createAsyncThunk(
//   "blog/deletePost",
//   async (body: string, thunkAPI) => {
//     const response = await https.delete<string>(`/posts/${body}`, {
//       signal: thunkAPI.signal,
//     });
//     return response.data;
//   }
// );
// export const finishEditingPost = createAsyncThunk(
//   "blog/finishEditingPost",
//   async ({ body, postID }: { body: Post; postID: string }, thunkAPI) => {
//     const response = await https.put<Post>(`/posts/${postID}`,body, {
//       signal: thunkAPI.signal,
//     });
//     return response.data;
//   }
// );

// const blogSlice = createSlice({
//   name: "blog",
//   initialState: initialState,
//   reducers: {
//     startEditingPost(state, action: PayloadAction<string>) {
//       const findPost =
//         state.PostList.find((post) => post.id === action.payload) || null;
//       state.editingPost = findPost;
//     },
//     cancelEditingPost(state) {
//       state.editingPost = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addPost.fulfilled, (state, action) => {
//         state.PostList = action.payload;
//       })
//       .addCase(getPost.fulfilled, (state, action) => {
//         state.PostList.push(action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         const postID = action.meta.arg;
//         const findIndex = state.PostList.findIndex(
//           (post) => post.id === postID
//         );
//         if (findIndex !== -1) {
//           state.PostList.splice(findIndex, 1);
//         }
//       })
//       .addCase(finishEditingPost.fulfilled, (state, action) => {
//         state.PostList.some((post, index) => {
//           if (post.id === action.meta.arg.postID) {
//             state.PostList[index] = action.meta.arg.body;
//             return true;
//           }
//           return false;
//         });
//         state.editingPost = null;
//       })
//       .addMatcher<PendingAction>(
//         (action) => action.type.endsWith("/pending"),
//         (state, action) => {
//           state.loading=true
//           state.currentID = action.meta.requestId;
//         }
//       )

//       .addMatcher<FulfilledAction>(
//         (action) => action.type.endsWith("/fulfilled"),
//         (state, action) => {
//           if (state.loading && state.currentID === action.meta.requestId) {
//             state.loading = false
//             state.currentID = undefined;
//           }
//         }
//       )

//       .addMatcher<RejectedAction>(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => {
//           if (state.loading && state.currentID === action.meta.requestId) {
//             state.loading = false;
//             state.currentID = undefined;
//           }
//         }
//       )
//       .addDefaultCase((state, action) => {
//         console.log(state);
//       });
//   },
// });

// export const {
//   startEditingPost,
//   cancelEditingPost,
//   // finishEditingPost
// } = blogSlice.actions;

// export const blogSlices = blogSlice.reducer;
// // khi gọi createAnycThunk thì sẽ sinh ra
// // requestId  duy nhất không trùng nhau


import React from 'react'

export const reducer = () => {
  return (
    <div>Blog.reducer</div>
  )
}

